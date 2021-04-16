<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Mega 6/45</title>
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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/mega645/mega645.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.sumoselect.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/mega645/mega645.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/basket/basket.js?v=${COMMON_SYSDATE}"></script>

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
                        <div class="mega645DivLogo">
                            <div class="luckeybets">
                                <img onclick="window.location.href = '<%=request.getContextPath()%>/home'" style="cursor: pointer" src="${pageContext.request.contextPath}/static/img/common/logo.png" width="auto" height="53px">
                            </div>
                            <div class="mega645">
                                <img src="${pageContext.request.contextPath}/static/img/common/mega645_logo.png" width="auto" height="53px">
                            </div>
                        </div>
                    </div>
                    <div class="panel-body" style="position: relative">
                        <div class="mega645MuabaoBasket" onclick="mega645MuabaoBasketBack();">
                            <img src="${pageContext.request.contextPath}/static/img/common/red-shopping-cart.png" width="30px" height="auto" />
                            <span id="mega645MuabaoBasketNumberTotal" class="step-basket">0</span>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col">
                                    <label for="mega645Muabao">Mua bao</label>
                                    <select onchange="mega645SelectBao(this.value);" id="mega645Muabao" class="form-control input-sm">
                                        <option value="6" selected>Vé thường</option>
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
                                    <label for="mega645Kymua">Kỳ quay</label>
                                    <select onchange="mega645SelectKymuaChange();" id="mega645Kymua" multiple="multiple" placeholder="Chọn kỳ" class="form-control input-sm">                                        
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="mega645BodyAllBao"></div>
                        <div class="form-group">
                            <div class="mega645Circle text-right">
                                <strong>Tạm tính :</strong> <strong style="color: red"><span id="mega645CountAllMoney">0</span>đ</strong>
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="button" onclick="mega645BtnToChonnhanh();" class="btn btn-warning btn-block btn-md">CHỌN NHANH</button>
                        </div>
                        <div>
                            <div class="form-row">
                                <div class="col">
                                    <button type="button" onclick="mega645BtnAddBasket();" class="btn btn-primary btn-block btn-md">THÊM VÀO GIỎ</button>
                                </div>
                                <div class="col">
                                    <button type="button" onclick="mega645BtnBuyNow();" class="btn btn-danger btn-block btn-md">XEM GIỎ HÀNG</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
            <div class="modal modal-alert fade" id="mega645ModelNumber" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title"><span id="mega645ModelNumberTitle" style="padding-right: 10px; color: #ffe003; font-weight: bold;"></span> Chọn số</h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="mega645ModelKeybaoHidden" value=""/>
                            <div class="form-group">
                                <div id="mega645ModelMainBuildNumber" class="mega645CircleModal"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="text-center" style="padding: 0 15px 15px 15px">
                                <button onclick="mega645ModalBtnChonsoSubmit();" type="button" class="btn btn-danger btn-md btn-block">Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>