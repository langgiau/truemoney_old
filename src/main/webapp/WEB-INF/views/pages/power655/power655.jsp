<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Power 6/55</title>
        <meta name="format-detection" content="telephone=no">
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="_csrf" content="${sessionScope.TOKEN}"/>
        <meta name="_csrf_header" content="TOKEN"/>

        <link rel="shortcut icon" href="${pageContext.request.contextPath}/static/img/common/favicon.ico">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/font-awesome.min.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/bootstrap/css/bootstrap.min.css">                
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/common/waitMe.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/sumoselect.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/custom.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/style.default.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/common/common.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/power655/power655.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.sumoselect.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/basket/basket.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/power655/power655.js?v=${COMMON_SYSDATE}"></script>
        <script>
            var requestUrl = "${pageContext.request.contextPath}";
            function getResource(callbackFunction) {
                jQuery.i18n.properties({
                    name: 'JS_Messages',
                    path: '<%=request.getContextPath()%>/static/language/',
                    mode: 'both',
                    language: '<%=RequestContextUtils.getLocale(request)%>',
                    async: true,
                    callback: function () {
                        callbackFunction();
                    }
                });
            }
        </script>
    </head>
    <body class="noselect-body">
        <div id="notifications"></div>
        <div class="container">
            <div class="panel-group">
                <div class="panel panel-danger">
                    <div class="panel-heading">
                        <div class="power655DivLogo">
                            <div class="luckeybets">
                                <img onclick="window.location.href = '<%=request.getContextPath()%>/home'" style="cursor: pointer" src="${pageContext.request.contextPath}/static/img/common/logo.png" width="auto" height="53px">
                            </div>
                            <div class="power655">
                                <img src="${pageContext.request.contextPath}/static/img/common/power655_logo.png" width="auto" height="53px">
                            </div>
                        </div>
                    </div>
                    <div class="panel-body" style="position: relative">
                        <div class="power655MuabaoBasket" onclick="power655MuabaoBasketBack();">
                            <img src="${pageContext.request.contextPath}/static/img/common/red-shopping-cart.png" width="30px" height="auto" />
                            <span id="power655MuabaoBasketNumberTotal" class="step-basket">0</span>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col">
                                    <label for="power655Muabao">Mua bao</label>
                                    <select onchange="power655SelectBao(this.value);" id="power655Muabao" class="form-control input-sm">
                                        <option value="6" selected>V?? th?????ng</option>
                                        <option value="5">Bao 5</option>
                                        <option value="7">Bao 7</option>
                                        <option value="8">Bao 8</option>
                                        <option value="9">Bao 9</option>
                                        <option value="10">Bao 10</option>
                                        <option value="11">Bao 11</option>
                                        <option value="12">Bao 12</option>
                                        <option value="13">Bao 13</option>
                                        <option value="14">Bao 14</option>
                                        <option value="15">Bao 15</option>
                                        <option value="18">Bao 18</option>                                        
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="power655Kymua">K??? quay</label>
                                    <select onchange="power655SelectKymuaChange();" id="power655Kymua" multiple="multiple" placeholder="Ch???n k???" class="form-control input-sm">                                        
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="power655BodyAllBao"></div>
                        <div class="form-group">
                            <div class="power655Circle text-right">
                                <strong>T???m t??nh :</strong> <strong style="color: red"><span id="power655CountAllMoney">0</span>??</strong>
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="button" onclick="power655BtnToChonnhanh();" class="btn btn-warning btn-block btn-md">CH???N NHANH</button>
                        </div>
                        <div>
                            <div class="form-row">
                                <div class="col">
                                    <button type="button" onclick="power655BtnAddBasket();" class="btn btn-primary btn-block btn-md">TH??M V??O GI???</button>
                                </div>
                                <div class="col">
                                    <button type="button" onclick="power655BtnBuyNow();" class="btn btn-danger btn-block btn-md">XEM GI??? H??NG</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
            <div class="modal modal-alert fade" id="power655ModelNumber" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title"><span id="power655ModelNumberTitle" style="padding-right: 10px; color: #ffe003; font-weight: bold;"></span> Ch???n s???</h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="power655ModelKeybaoHidden" value=""/>
                            <div class="form-group">
                                <div id="power655ModelMainBuildNumber" class="power655CircleModal"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="text-center" style="padding: 0 15px 15px 15px">
                                <button onclick="power655ModalBtnChonsoSubmit();" type="button" class="btn btn-danger btn-md btn-block">?????ng ??</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>