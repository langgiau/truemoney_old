Heatmap = {};

Heatmap.Source = OpenLayers.Class({
    lonlat: null,
    radius: null,
    intensity: null,
    initialize: function(lonlat, radius, intensity) {
        this.lonlat = lonlat;
        this.radius = radius;
        this.intensity = intensity;
    },
    CLASS_NAME: 'Heatmap.Source'
});

Heatmap.Layer = OpenLayers.Class(OpenLayers.Layer, {
    isBaseLayer: false,
    points: null,
    cache: null,
    gradient: null,
    canvas: null,
    defaultRadius: null,
    defaultIntensity: null,
    initialize: function(name, options) {
        OpenLayers.Layer.prototype.initialize.apply(this, arguments);
        this.points = [];
        this.cache = {};
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.defaultRadius = 20;
        this.defaultIntensity = 0.2;
        this.setGradientStops({
            0.00: 0xffffff00,
            0.10: 0x99e9fdff,
            0.20: 0x00c9fcff,
            0.30: 0x00e9fdff,
            0.35: 0x00a5fcff,
            0.40: 0x0078f2ff,
            0.50: 0x0e53e9ff,
            0.60: 0x4a2cd9ff,
            0.70: 0x890bbfff,
            0.80: 0x99019aff,
            0.90: 0x990664ff,
            0.99: 0x660000ff,
            1.00: 0x000000ff
        });

        var sub = document.createElement('div');
        sub.appendChild(this.canvas);
        this.div.appendChild(sub);
    },
    setGradientStops: function(stops) {

        var ctx = document.createElement('canvas').getContext('2d');
        var grd = ctx.createLinearGradient(0, 0, 256, 0);

        for (var i in stops) {
            grd.addColorStop(i, 'rgba(' +
                    ((stops[i] >> 24) & 0xFF) + ',' +
                    ((stops[i] >> 16) & 0xFF) + ',' +
                    ((stops[i] >> 8) & 0xFF) + ',' +
                    ((stops[i] >> 0) & 0xFF) + ')');
        }

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 256, 1);
        this.gradient = ctx.getImageData(0, 0, 256, 1).data;
    },
    addSource: function(source) {
        this.points.push(source);
    },
    removeSource: function(source) {
        if (this.points && this.points.length) {
            OpenLayers.Util.removeItem(this.points, source);
        }
    },
    removeAllSource: function() {
        if (this.points && this.points.length) {
            this.points = new Array();
        }
    },
    moveTo: function(bounds, zoomChanged, dragging) {

        OpenLayers.Layer.prototype.moveTo.apply(this, arguments);

        if (dragging)
            return;

        var someLoc = new OpenLayers.LonLat(0, 0).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
        var offsetX = this.map.getViewPortPxFromLonLat(someLoc).x -
                this.map.getLayerPxFromLonLat(someLoc).x;
        var offsetY = this.map.getViewPortPxFromLonLat(someLoc).y -
                this.map.getLayerPxFromLonLat(someLoc).y;

        this.canvas.width = this.map.getSize().w;
        this.canvas.height = this.map.getSize().h;

        var ctx = this.canvas.getContext('2d');

        ctx.save(); // Workaround for a bug in Google Chrome
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.restore();

        for (var i in this.points) {

            var src = this.points[i];
            var rad = src.radius || this.defaultRadius;
            var int = src.intensity || this.defaultIntensity;

            var lonLatCV = new OpenLayers.LonLat(src.lonlat.lon, src.lonlat.lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
            var pos = this.map.getLayerPxFromLonLat(lonLatCV);

            var x = pos.x - rad + offsetX;
            var y = pos.y - rad + offsetY;

            if (!this.cache[int]) {
                this.cache[int] = {};
            }

            if (!this.cache[int][rad]) {
                var grd = ctx.createRadialGradient(rad, rad, 0, rad, rad, rad);
                grd.addColorStop(0.0, 'rgba(0, 0, 0, ' + int + ')');
                grd.addColorStop(1.0, 'transparent');
                this.cache[int][rad] = grd;
            }

            ctx.fillStyle = this.cache[int][rad];
            ctx.translate(x, y);
            ctx.fillRect(0, 0, 2 * rad, 2 * rad);
            ctx.translate(-x, -y);
        }

        var dat = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var dim = this.canvas.width * this.canvas.height * 4;
        var pix = dat.data;

        for (var p = 0; p < dim; /* */) {
            var a = pix[p + 3] * 4;
            pix[p++] = this.gradient[a++];
            pix[p++] = this.gradient[a++];
            pix[p++] = this.gradient[a++];
            pix[p++] = this.gradient[a++];
        }

        ctx.putImageData(dat, 0, 0);

        this.canvas.style.left = (-offsetX) + 'px';
        this.canvas.style.top = (-offsetY) + 'px';
    },
    getDataExtent: function() {
        var maxExtent = null;

        if (this.points && (this.points.length > 0)) {
            var maxExtent = new OpenLayers.Bounds();
            for (var i = 0, len = this.points.length; i < len; ++i) {
                var point = this.points[i];
                var pointCV = new OpenLayers.Geometry.Point(point.lonlat.lon, point.lonlat.lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
                maxExtent.extend(pointCV);
            }
        }

        return maxExtent;
    },
    CLASS_NAME: 'Heatmap.Layer'

});