<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Max 4D</title>
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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/common/checkbox2button.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/sumoselect.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/custom.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/style.default.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/common/common.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/max4d/max4d.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.sumoselect.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/checkbox2button.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/max4d/max4d.js?v=${COMMON_SYSDATE}"></script>
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
                        <div class="max4dDivLogo">
                            <div class="luckeybets">
                                <img onclick="window.location.href = '<%=request.getContextPath()%>/home'" style="cursor: pointer" src="${pageContext.request.contextPath}/static/img/common/logo.png" width="auto" height="53px">
                            </div>
                            <div class="max4d">
                                <img src="${pageContext.request.contextPath}/static/img/common/max4d_logo_border.png" width="auto" height="53px">
                            </div>
                        </div>
                    </div>
                    <div class="panel-body" style="position: relative">
                        <div class="max4dMuabaoBasket" onclick="max4dMuabaoBasketBack();">
                            <img src="${pageContext.request.contextPath}/static/img/common/red-shopping-cart.png" width="30px" height="auto" />
                            <span id="max4dMuabaoBasketNumberTotal" class="step-basket">0</span>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col">
                                    <label for="max4dMuabao">Loại vé</label>
                                    <select onchange="max4dSelectBao();" id="max4dMuabao" class="form-control input-sm">
                                        <option value="1">Thường</option>
                                        <option value="2">Tổ hợp</option>
                                        <option value="3">Bao</option>
                                        <option value="4">Cuộn 1</option>
                                        <option value="5">Cuộn 4</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="max4dKymua">Kỳ quay</label>
                                    <select onchange="max4dSelectKymuaChange();" id="max4dKymua" multiple="multiple" placeholder="Chọn kỳ" class="form-control input-sm">                                        
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="max4dBodyAllBao"></div>
                        <div class="form-group">
                            <div class="max4dCircle text-right">
                                <strong>Tạm tính :</strong> <strong style="color: red"><span id="max4dCountAllMoney">0</span>đ</strong>
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="button" onclick="max4dBtnToChonnhanh();" class="btn btn-warning btn-block btn-md">CHỌN NHANH</button>
                        </div>
                        <div>
                            <div class="form-row">
                                <div class="col">
                                    <button type="button" onclick="max4dBtnAddBasket();" class="btn btn-primary btn-block btn-md">THÊM VÀO GIỎ</button>
                                </div>
                                <div class="col">
                                    <button type="button" onclick="max4dBtnBuyNow();" class="btn btn-danger btn-block btn-md">XEM GIỎ HÀNG</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
            <div class="modal modal-alert fade" id="max4dModelNumber" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">
                                <span id="max4dModelNumberRowKey" style="padding-right: 10px; color: #ffe003; font-weight: bold;"></span>
                                <span id="max4dModelNumberMuabaoName"></span>
                            </h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="max4dModelKeybaoHidden" value=""/>
                            <div id="max4dModelMainBuildNumber" class="max4dCircleModal">
                                <div class="form-row">
                                    <div class="col-sm-9">
                                        <div id="max4dModelMainBuildNumberOtron"></div>
                                    </div>
                                    <div class="col">
                                        <div class="form-row text-right">
                                            <div class="col">
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max4dBuildBodyMainChonSoClickMoneyBtn_1" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-danger btn-sm">10K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max4dBuildBodyMainChonSoClickMoneyBtn_2" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">20K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max4dBuildBodyMainChonSoClickMoneyBtn_5" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">50K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max4dBuildBodyMainChonSoClickMoneyBtn_10" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">100K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max4dBuildBodyMainChonSoClickMoneyBtn_20" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">200K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max4dBuildBodyMainChonSoClickMoneyBtn_50" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">500K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max4dBuildBodyMainChonSoClickMoneyBtn_100" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">1000K</button>
                                                </div>
                                                <br>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button onclick="max4dBtnOnclickRandomModalAll();" style="width: 82px" type="button" class="btn btn-warning btn-sm">TC</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 0">
                                                    <button onclick="max4dBtnOnclickRandomModalDel();" style="width: 82px" type="button" class="btn btn-warning btn-sm">Hủy</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="text-center" style="padding: 0 15px 15px 15px">
                                <button onclick="max4dModalBtnChonsoSubmit();" type="button" class="btn btn-danger btn-md btn-block">Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>