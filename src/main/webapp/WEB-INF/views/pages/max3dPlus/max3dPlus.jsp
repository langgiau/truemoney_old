<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Max 3D+</title>
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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/max3dPlus/max3dPlus.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.sumoselect.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/checkbox2button.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/max3dPlus/max3dPlus.js?v=${COMMON_SYSDATE}"></script>
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
                        <div class="max3dPlusDivLogo">
                            <div class="luckeybets">
                                <img onclick="window.location.href = '<%=request.getContextPath()%>/home'" style="cursor: pointer" src="${pageContext.request.contextPath}/static/img/common/logo.png" width="auto" height="53px">
                            </div>
                            <div class="max3dPlus">
                                <img src="${pageContext.request.contextPath}/static/img/common/max3dPlus_logo_border.png" width="auto" height="53px">
                            </div>
                        </div>
                    </div>
                    <div class="panel-body" style="position: relative">
                        <div class="max3dPlusMuabaoBasket" onclick="max3dPlusMuabaoBasketBack();">
                            <img src="${pageContext.request.contextPath}/static/img/common/red-shopping-cart.png" width="30px" height="auto" />
                            <span id="max3dPlusMuabaoBasketNumberTotal" class="step-basket">0</span>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col">
                                    <label for="max3dPlusMuabao">Loại vé</label>
                                    <select onchange="max3dPlusSelectBao();" id="max3dPlusMuabao" class="form-control input-sm">
                                        <option value="1">Thường</option>
                                        <!--<option value="2">Tổ hợp</option>-->
                                        <!--<option value="3">Bao</option>-->
                                        <!--<option value="4">Cuộn 1</option>-->
                                        <!--<option value="5">Cuộn 4</option>-->
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="max3dPlusKymua">Kỳ quay</label>
                                    <select onchange="max3dPlusSelectKymuaChange();" id="max3dPlusKymua" multiple="multiple" placeholder="Chọn kỳ" class="form-control input-sm">                                        
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="max3dPlusBodyAllBao"></div>
                        <div class="form-group">
                            <div class="max3dPlusCircle text-right">
                                <strong>Tạm tính :</strong> <strong style="color: red"><span id="max3dPlusCountAllMoney">0</span>đ</strong>
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="button" onclick="max3dPlusBtnToChonnhanh();" class="btn btn-warning btn-block btn-md">CHỌN NHANH</button>
                        </div>
                        <div>
                            <div class="form-row">
                                <div class="col">
                                    <button type="button" onclick="max3dPlusBtnAddBasket();" class="btn btn-primary btn-block btn-md">THÊM VÀO GIỎ</button>
                                </div>
                                <div class="col">
                                    <button type="button" onclick="max3dPlusBtnBuyNow();" class="btn btn-danger btn-block btn-md">XEM GIỎ HÀNG</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
            <div class="modal modal-alert fade" id="max3dPlusModelNumber" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">
                                <span id="max3dPlusModelNumberRowKey" style="padding-right: 10px; color: #ffe003; font-weight: bold;"></span>
                                <span id="max3dPlusModelNumberMuabaoName"></span>
                            </h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="max3dPlusModelKeybaoHidden" value=""/>
                            <div id="max3dPlusModelMainBuildNumber" class="max3dPlusCircleModal">
                                <div class="form-row">
                                    <div class="col-sm-9">
                                        <div id="max3dPlusModelMainBuildNumberOtron"></div>
                                    </div>
                                    <div class="col">
                                        <div class="form-row text-right">
                                            <div class="col">
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max3dPlusBuildBodyMainChonSoClickMoneyBtn_1" onclick="max3dPlusBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 65px" type="button" class="max3dPlusModelNumberRadioMoney btn btn-danger btn-sm">10K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max3dPlusBuildBodyMainChonSoClickMoneyBtn_2" onclick="max3dPlusBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 65px" type="button" class="max3dPlusModelNumberRadioMoney btn btn-default btn-sm">20K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max3dPlusBuildBodyMainChonSoClickMoneyBtn_5" onclick="max3dPlusBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 65px" type="button" class="max3dPlusModelNumberRadioMoney btn btn-default btn-sm">50K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max3dPlusBuildBodyMainChonSoClickMoneyBtn_10" onclick="max3dPlusBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 65px" type="button" class="max3dPlusModelNumberRadioMoney btn btn-default btn-sm">100K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="max3dPlusBuildBodyMainChonSoClickMoneyBtn_20" onclick="max3dPlusBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 65px" type="button" class="max3dPlusModelNumberRadioMoney btn btn-default btn-sm">200K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px; display: none">
                                                    <button id="max3dPlusBuildBodyMainChonSoClickMoneyBtn_50" onclick="max3dPlusBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 65px" type="button" class="max3dPlusModelNumberRadioMoney btn btn-default btn-sm">500K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px; display: none">
                                                    <button id="max3dPlusBuildBodyMainChonSoClickMoneyBtn_100" onclick="max3dPlusBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 65px" type="button" class="max3dPlusModelNumberRadioMoney btn btn-default btn-sm">1000K</button>
                                                </div>
                                                <br>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button onclick="max3dPlusBtnOnclickRandomModalAll();" style="width: 65px" type="button" class="btn btn-warning btn-sm">TC</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 0">
                                                    <button onclick="max3dPlusBtnOnclickRandomModalDel();" style="width: 65px" type="button" class="btn btn-warning btn-sm">Hủy</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="text-center" style="padding: 0 15px 15px 15px">
                                <button onclick="max3dPlusModalBtnChonsoSubmit();" type="button" class="btn btn-danger btn-md btn-block">Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>