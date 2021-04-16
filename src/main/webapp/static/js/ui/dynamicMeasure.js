
OpenLayers.Control.DynamicMeasure = OpenLayers.Class(OpenLayers.Control.Measure, {
    accuracy: 5,
    persist: true,
    styles: null,
    positions: null,
    maxSegments: 1,
    maxHeadings: 1,
    layerSegmentsOptions: undefined,
    layerHeadingOptions: null,
    layerLengthOptions: undefined,
    layerAreaOptions: undefined,
    drawingLayer: null,
    multi: false,
    layerSegments: null,
    layerLength: null,
    layerArea: null,
    dynamicObj: null,
    isArea: null,

    initialize: function (handler, options) {


        options = options || {};
        options.handlerOptions = OpenLayers.Util.extend(
            { persist: !options.drawingLayer }, options.handlerOptions
        );
        if (options.drawingLayer && !('multi' in options.handlerOptions)) {
            options.handlerOptions.multi = options.multi;
        }

        // * styles option
        if (options.drawingLayer) {
            var sketchStyle = options.drawingLayer.styleMap &&
                                 options.drawingLayer.styleMap.styles.temporary;
            if (sketchStyle) {
                options.handlerOptions
                                  .layerOptions = OpenLayers.Util.applyDefaults(
                    options.handlerOptions.layerOptions, {
                        styleMap: new OpenLayers.StyleMap({
                            'default': sketchStyle
                        })
                    }
                );
            }
        }
        var optionsStyles = options.styles || {};
        options.styles = optionsStyles;
        var defaultStyles = OpenLayers.Control.DynamicMeasure.styles;
        // * * styles for handler layer.
        if (!options.handlerOptions.layerOptions ||
            !options.handlerOptions.layerOptions.styleMap) {
            // use the style option for layerOptions of the handler.
            var style = new OpenLayers.Style(null, { rules: [
                new OpenLayers.Rule({ symbolizer: {
                    'Point': OpenLayers.Util.applyDefaults(
                                optionsStyles.Point, defaultStyles.Point),
                    'Line': OpenLayers.Util.applyDefaults(
                                optionsStyles.Line, defaultStyles.Line),
                    'Polygon': OpenLayers.Util.applyDefaults(
                                optionsStyles.Polygon, defaultStyles.Polygon)
                }
                })
            ]
            });
            options.handlerOptions = options.handlerOptions || {};
            options.handlerOptions.layerOptions =
                                      options.handlerOptions.layerOptions || {};
            options.handlerOptions.layerOptions.styleMap =
                                    new OpenLayers.StyleMap({ 'default': style });
        }

        // * positions option
        options.positions = OpenLayers.Util.applyDefaults(
            options.positions,
            OpenLayers.Control.DynamicMeasure.positions
        );

        // force some handler options
        options.callbacks = options.callbacks || {};
        if (options.drawingLayer) {
            OpenLayers.Util.applyDefaults(options.callbacks, {
                create: function (vertex, feature) {
                    this.callbackCreate(vertex, feature);
                    this.drawingLayer.events.triggerEvent(
                        'sketchstarted', { vertex: vertex, feature: feature }
                    );
                },
                modify: function (vertex, feature) {
                    this.callbackModify(vertex, feature);
                    this.drawingLayer.events.triggerEvent(
                        'sketchmodified', { vertex: vertex, feature: feature }
                    );
                },
                done: function (geometry) {
                    this.callbackDone(geometry);
                    this.drawFeature(geometry);
                }
            });
        }
        OpenLayers.Util.applyDefaults(options.callbacks, {
            create: this.callbackCreate,
            point: this.callbackPoint,
            cancel: this.callbackCancel,
            done: this.callbackDone,
            modify: this.callbackModify,
            redo: this.callbackRedo,
            undo: this.callbackUndo
        });

        // do a trick with the handler to avoid blue background in freehand.
        var _self = this;
        var oldOnselectstart = document.onselectstart ?
                              document.onselectstart : OpenLayers.Function.True;
        var handlerTuned = OpenLayers.Class(handler, {
            down: function (evt) {
                document.onselectstart = OpenLayers.Function.False;
                return handler.prototype.down.apply(this, arguments);
            },
            up: function (evt) {
                document.onselectstart = oldOnselectstart;
                return handler.prototype.up.apply(this, arguments);
            },
            move: function (evt) {
                if (!this.mouseDown) {
                    document.onselectstart = oldOnselectstart;
                }
                return handler.prototype.move.apply(this, arguments);
            },
            mouseout: function (evt) {
                if (OpenLayers.Util.mouseLeft(evt, this.map.viewPortDiv)) {
                    if (this.mouseDown) {
                        document.onselectstart = oldOnselectstart;
                    }
                }
                return handler.prototype.mouseout.apply(this, arguments);
            },
            finalize: function () {
                document.onselectstart = oldOnselectstart;
                handler.prototype.finalize.apply(this, arguments);
            }
        }, {
            undo: function () {
                var undone = handler.prototype.undo.call(this);
                if (undone) {
                    this.callback('undo',
                                 [this.point.geometry, this.getSketch(), true]);
                }
                return undone;
            },
            redo: function () {
                var redone = handler.prototype.redo.call(this);
                if (redone) {
                    this.callback('redo',
                                 [this.point.geometry, this.getSketch(), true]);
                }
                return redone;
            }
        });
        // ... and call the constructor
        OpenLayers.Control.Measure.prototype.initialize.call(
                                                   this, handlerTuned, options);

        this.isArea = handler.prototype.polygon !== undefined; // duck typing
    },

    destroy: function () {
        this.deactivate();
        OpenLayers.Control.Measure.prototype.destroy.apply(this, arguments);
    },

    draw: function () { },

    activate: function () {
        var response = OpenLayers.Control.Measure.prototype.activate.apply(
                                                               this, arguments);
        if (response) {
            // Create dynamicObj
            this.dynamicObj = {};
            // Create layers
            var _optionsStyles = this.styles || {},
                _defaultStyles = OpenLayers.Control.DynamicMeasure.styles,
                _self = this;
            var _create = function (styleName, initialOptions) {
                if (initialOptions === null) {
                    return null;
                }
                var options = OpenLayers.Util.extend({
                    displayInLayerSwitcher: false,
                    calculateInRange: OpenLayers.Function.True
                    // ?? ,wrapDateLine: this.citeCompliant
                }, initialOptions);
                if (!options.styleMap) {
                    var style = _optionsStyles[styleName];

                    options.styleMap = new OpenLayers.StyleMap({
                        'default': OpenLayers.Util.applyDefaults(style,
                                                      _defaultStyles[styleName])
                    });
                }
                var layer = new OpenLayers.Layer.Vector(
                                   _self.CLASS_NAME + ' ' + styleName, options);
                _self.map.addLayer(layer);
                return layer;
            };
            this.layerSegments =
                            _create('labelSegments', this.layerSegmentsOptions);
            this.layerHeading =
                            _create('labelHeading', this.layerHeadingOptions);
            this.layerLength = _create('labelLength', this.layerLengthOptions);
            if (this.isArea) {
                this.layerArea = _create('labelArea', this.layerAreaOptions);
            }
        }
        return response;
    },

    deactivate: function () {
        var response = OpenLayers.Control.Measure.prototype.deactivate.apply(
                                                               this, arguments);
        if (response) {
            this.layerSegments && this.layerSegments.destroy();
            this.layerLength && this.layerLength.destroy();
            this.layerHeading && this.layerHeading.destroy();
            this.layerArea && this.layerArea.destroy();
            this.dynamicObj = null;
            this.layerSegments = null;
            this.layerLength = null;
            this.layerHeading = null;
            this.layerArea = null;
        }
        return response;
    },

    setImmediate: function (immediate) {
        this.immediate = immediate;
    },

    callbackCreate: function () {
        var dynamicObj = this.dynamicObj;
        dynamicObj.drawing = false;
        dynamicObj.freehand = false;
        dynamicObj.fromIndex = 0;
        dynamicObj.countSegments = 0;
    },

    callbackCancel: function () {
        this.destroyLabels();
    },

    callbackDone: function (geometry) {
        this.measureComplete(geometry);
        if (!this.persist) {
            this.destroyLabels();
        }
    },

    drawFeature: function (geometry) {
        var feature = new OpenLayers.Feature.Vector(geometry);
        var proceed = this.drawingLayer.events.triggerEvent(
            'sketchcomplete', { feature: feature }
        );
        if (proceed !== false) {
            feature.state = OpenLayers.State.INSERT;
            this.drawingLayer.addFeatures([feature]);
            this.featureAdded && this.featureAdded(feature); // for compatibility
            this.events.triggerEvent('featureadded', { feature: feature });
        }
    },

    destroyLabels: function () {
        this.layerSegments && this.layerSegments.destroyFeatures(
                                                          null, { silent: true });
        this.layerLength && this.layerLength.destroyFeatures(
                                                          null, { silent: true });
        this.layerHeading && this.layerHeading.destroyFeatures(
                                                          null, { silent: true });
        this.layerArea && this.layerArea.destroyFeatures(null, { silent: true });
    },

    callbackPoint: function (point, geometry) {
        var dynamicObj = this.dynamicObj;
        if (!dynamicObj.drawing) {
            this.destroyLabels();
        }
        if (!this.handler.freehandMode(this.handler.evt)) {
            dynamicObj.fromIndex = this.handler.getCurrentPointIndex() - 1;
            dynamicObj.freehand = false;
            dynamicObj.countSegments++;
        } else if (!dynamicObj.freehand) {
            // freehand has started
            dynamicObj.fromIndex = this.handler.getCurrentPointIndex() - 1;
            dynamicObj.freehand = true;
            dynamicObj.countSegments++;
        }

        this.measurePartial(point, geometry);
        dynamicObj.drawing = true;
    },

    callbackUndo: function (point, feature) {
        var _self = this,
            undoLabel = function (layer) {
                if (layer) {
                    var features = layer.features,
                        lastSegmentIndex = features.length - 1,
                        lastSegment = features[lastSegmentIndex],
                        lastSegmentFromIndex = lastSegment.attributes.from,
                        lastPointIndex = _self.handler.getCurrentPointIndex();
                    if (lastSegmentFromIndex >= lastPointIndex) {
                        var dynamicObj = _self.dynamicObj;
                        layer.destroyFeatures(lastSegment);
                        lastSegment = features[lastSegmentIndex - 1];
                        dynamicObj.fromIndex = lastSegment.attributes.from;
                        dynamicObj.countSegments = features.length;
                    }
                }
            };
        undoLabel(this.layerSegments);
        undoLabel(this.layerHeading);
        this.callbackModify(point, feature, true);
    },

    callbackRedo: function (point, feature) {
        var line = this.handler.line.geometry,
            currIndex = this.handler.getCurrentPointIndex();
        var dynamicObj = this.dynamicObj;
        this.showLabelSegment(
            dynamicObj.countSegments,
            dynamicObj.fromIndex,
            line.components.slice(dynamicObj.fromIndex, currIndex)
        );
        dynamicObj.fromIndex = this.handler.getCurrentPointIndex() - 1;
        dynamicObj.countSegments++;
        this.callbackModify(point, feature, true);
    },

    callbackModify: function (point, feature, drawing) {
        if (this.immediate) {
            this.measureImmediate(point, feature, drawing);
        }

        var dynamicObj = this.dynamicObj;
        if (dynamicObj.drawing === false) {
            return;
        }

        var line = this.handler.line.geometry,
            currIndex = this.handler.getCurrentPointIndex();
        if (!this.handler.freehandMode(this.handler.evt) &&
                                                          dynamicObj.freehand) {
            // freehand has stopped
            dynamicObj.fromIndex = currIndex - 1;
            dynamicObj.freehand = false;
            dynamicObj.countSegments++;
        }

        // total measure
        var totalLength = this.getBestLength(line);
        if (!totalLength[0]) {
            return;
        }
        var positions = this.positions,
            positionGet = {
                center: function () {
                    var center = feature.geometry.getBounds().clone();
                    center.extend(point);
                    center = center.getCenterLonLat();
                    return [center.lon, center.lat];
                },
                initial: function () {
                    var initial = line.components[0];
                    return [initial.x, initial.y];
                },
                start: function () {
                    var start = line.components[dynamicObj.fromIndex];
                    return [start.x, start.y];
                },
                middle: function () {
                    var start = line.components[dynamicObj.fromIndex];
                    return [(start.x + point.x) / 2, (start.y + point.y) / 2];
                },
                end: function () {
                    return [point.x, point.y];
                }
            };
        if (this.layerLength) {
            this.showLabel(
                        this.layerLength, 1, 0, totalLength,
                        positionGet[positions['labelLength']](), 1);
        }
        if (this.isArea) {
            if (this.layerArea) {
                this.showLabel(this.layerArea, 1, 0,
                     this.getBestArea(feature.geometry),
                     positionGet[positions['labelArea']](), 1);
            }
            if (this.showLabelSegment(
                      1, 0, [line.components[0], line.components[currIndex]])) {
                dynamicObj.countSegments++;
            }
        }
        this.showLabelSegment(
            dynamicObj.countSegments,
            dynamicObj.fromIndex,
            line.components.slice(dynamicObj.fromIndex, currIndex + 1)
        );
    },

    showLabelSegment: function (labelsNumber, fromIndex, _points) {
        var layerSegments = this.layerSegments,
            layerHeading = this.layerHeading;
        if (!layerSegments && !layerHeading) {
            return false;
        }
        // clone points
        var points = [],
            pointsLen = _points.length;
        for (var i = 0; i < pointsLen; i++) {
            points.push(_points[i].clone());
        }
        var from = points[0],
            to = points[pointsLen - 1],
            segmentLength =
                 this.getBestLength(new OpenLayers.Geometry.LineString(points)),
            positions = this.positions,
            positionGet = {
                start: function () {
                    return [from.x, from.y];
                },
                middle: function () {
                    return [(from.x + to.x) / 2, (from.y + to.y) / 2];
                },
                end: function () {
                    return [to.x, to.y];
                }
            },
            created = false;
        if (layerSegments) {
            created = this.showLabel(layerSegments, labelsNumber, fromIndex,
                            segmentLength,
                            positionGet[positions['labelSegments']](),
                            this.maxSegments);
        }
        if (layerHeading && segmentLength[0] > 0) {
            var heading = Math.atan2(to.y - from.y, to.x - from.x),
                bearing = 90 - heading * 180 / Math.PI;
            if (bearing < 0) {
                bearing += 360;
            }
            created = created || this.showLabel(layerHeading,
                            labelsNumber, fromIndex,
                            [bearing, '°'],
                            positionGet[positions['labelHeading']](),
                            this.maxHeadings);
        }
        return created;
    },

    showLabel: function (
                     layer, labelsNumber, fromIndex, measure, xy, maxSegments) {
        var featureLabel, featureAux,
            features = layer.features;
        if (features.length < labelsNumber) {
            // add a label
            if (measure[0] === 0) {
                return false;
            }
            featureLabel = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(xy[0], xy[1]),
                { from: fromIndex }
            );
            this.setMesureAttributes(featureLabel.attributes, measure);
            layer.addFeatures([featureLabel]);
            if (maxSegments !== null) {
                var hide = (features.length - maxSegments) - 1;
                if (hide >= 0) {
                    featureAux = features[hide];
                    featureAux.style = { display: 'none' };
                    layer.drawFeature(featureAux);
                }
            }
            return true;
        } else {
            // update a label
            featureLabel = features[labelsNumber - 1];
            var geometry = featureLabel.geometry;
            geometry.x = xy[0];
            geometry.y = xy[1];
            geometry.clearBounds();
            this.setMesureAttributes(featureLabel.attributes, measure);
            layer.drawFeature(featureLabel);
            if (maxSegments !== null) {
                var show = (features.length - maxSegments);
                if (show >= 0) {
                    featureAux = features[show];
                    if (featureAux.style) {
                        delete featureAux.style;
                        layer.drawFeature(featureAux);
                    }
                }
            }
            return false;
        }
    },

    setMesureAttributes: function (attributes, measure) {

        var toHaily = parseFloat(measure[0]) * 0.539956803;
        var toFixHl = OpenLayers.Number.format(
                           Number(toHaily.toPrecision(this.accuracy)), null);

        attributes.measure = OpenLayers.Number.format(
                           Number(measure[0].toPrecision(this.accuracy)), null);

        attributes.units = measure[1] + " (" + toFixHl + " hải lý)";
    },

    CLASS_NAME: 'OpenLayers.Control.DynamicMeasure'
});

OpenLayers.Control.DynamicMeasure.styles = {
    'Point': {
        pointRadius: 4,
        graphicName: 'square',
        fillColor: 'white',
        fillOpacity: 1,
        strokeWidth: 1,
        strokeOpacity: 1,
        strokeColor: '#333333'
    },
    'Line': {
        strokeWidth: 2,
        strokeOpacity: 1,
        strokeColor: 'yellow',
        strokeDashstyle: 'solid'
    },
    'Polygon': {
        strokeWidth: 2,
        strokeOpacity: 1,
        strokeColor: '#666666',
        strokeDashstyle: 'solid',
        fillColor: 'white',
        fillOpacity: 0.3
    },
    labelSegments: {
        label: '${measure} ${units}',
        fontSize: '11px',
        fontColor: '#800517',
        fontFamily: 'Verdana',
        labelOutlineColor: '#dddddd',
        labelAlign: 'cm',
        labelOutlineWidth: 2
    },
    labelLength: {
        label: '${measure} ${units}\n',
        fontSize: '11px',
        fontWeight: 'bold',
        fontColor: 'red',
        fontFamily: 'Verdana',
        labelOutlineColor: '#dddddd',
        labelAlign: 'lb',
        labelOutlineWidth: 3
    },
    labelArea: {
        label: '${measure}\n${units}²\n',
        fontSize: '11px',
        fontWeight: 'bold',
        fontColor: '#800517',
        fontFamily: 'Verdana',
        labelOutlineColor: '#dddddd',
        labelAlign: 'cm',
        labelOutlineWidth: 3
    },
    labelHeading: {
        label: '${measure} ${units}',
        fontSize: '11px',
        fontColor: '#800517',
        fontFamily: 'Verdana',
        labelOutlineColor: '#dddddd',
        labelAlign: 'cm',
        labelOutlineWidth: 3
    }
};

OpenLayers.Control.DynamicMeasure.positions = {
    labelSegments: 'middle',
    labelLength: 'end',
    labelArea: 'center',
    labelHeading: 'start'
};