<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Mua Lì Xì</title>
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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/common/radioCss.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/common/common.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/bulk/bulk.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.sumoselect.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/checkbox2button.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/bulk/bulk.js?v=${COMMON_SYSDATE}"></script>
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
                        <div class="bulkDivLogo">
                            <div class="luckeybets">
                                <img onclick="window.location.href = '<%=request.getContextPath()%>/home'" style="cursor: pointer" src="${pageContext.request.contextPath}/static/img/common/logo.png" width="auto" height="53px">
                            </div>
                            <div class="bulk">
                                <img src="${pageContext.request.contextPath}/static/img/common/bulk_logo.png" width="auto" height="53px">
                            </div>
                        </div>
                    </div>
                    <div class="panel-body" style="position: relative">
                        <div class="bulkMuabaoBasket" onclick="bulkMuabaoBasketBack();">
                            <img src="${pageContext.request.contextPath}/static/img/common/red-shopping-cart.png" width="30px" height="auto" />
                            <span id="bulkMuabaoBasketNumberTotal" class="step-basket">0</span>
                        </div>
                        <div class="form-group" style="margin-bottom: 5px;">
                            <span style="font-weight: bold">SẢN PHẨM</span>
                        </div>
                        <div class="form-group" style="margin-bottom: 5px">
                            <label class="bulkOptRadioSelected">
                                <img class="logoTicherBulk" src="${pageContext.request.contextPath}/static/img/common/power655_logo.png" width="auto" height="35px">
                                <span class="textBulk" style="color: #e30922">
                                    Power 6/55
                                </span>
                                <div class="buttonRight">
                                    <input onclick="bulkOptRadioSelectedChecked(this);" value="13" class="option-input radio" type="radio" name="bulkTypeLoaibaoOptradio" checked>
                                </div>
                            </label>
                        </div>
                        <div class="form-group" style="margin-bottom: 5px">
                            <label class="bulkOptRadioSelected">
                                <img class="logoTicherBulk" src="${pageContext.request.contextPath}/static/img/common/mega645_logo.png" width="auto" height="35px">
                                <span class="textBulk" style="color: #2164b2">
                                    Mega 6/45
                                </span>
                                <div class="buttonRight">
                                    <input onclick="bulkOptRadioSelectedChecked(this);" value="11" class="option-input radio" type="radio" name="bulkTypeLoaibaoOptradio">
                                </div>
                            </label>
                        </div>
                        <div class="form-group">
                            <label class="bulkOptRadioSelected">
                                <img class="logoTicherBulk" style="top: 0" src="${pageContext.request.contextPath}/static/img/common/max4d_logo.png" width="auto" height="35px">
                                <span class="textBulk" style="color: #81005d">
                                    Max 4D
                                </span>
                                <div class="buttonRight">
                                    <input onclick="bulkOptRadioSelectedChecked(this);" value="12" class="option-input radio" type="radio" name="bulkTypeLoaibaoOptradio">
                                </div>
                            </label>
                        </div>
                        <div class="form-group">
                            <label for="bulkSelectCountTicker">CHỌN SỐ VÉ</label>
                            <button onclick="bulkSelectCountTickerFun();" id="bulkSelectCountTicker" type="button" class="btn btn-block bulkButtonCustom btn-default btn-md">0 Vé/ 1 kỳ quay</button>
                            <input type="hidden" id="bulkSelectCountTickerFunHidden" value="0" >
                            <input type="hidden" id="bulkSelectCountTickerFunSokhacHidden" value="0" >
                        </div>
                        <div id="bulkSelectMax4dMoneyDivForm" style="display: none" class="form-group">
                            <div class="form-row">
                                <div class="col">
                                    <label for="bulkSelectMax4dType">CÁCH CHƠI</label>
                                    <select id="bulkSelectMax4dType" class="form-control input-md">
                                        <option value="1">Thường</option>
                                        <option value="2">Tổ hợp</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="bulkSelectMax4dMoney">GIÁ TIỀN 1 BỘ SỐ</label>
                                    <select onchange="bulkSelectMax4dMoneyChange();" id="bulkSelectMax4dMoney" class="form-control input-md">
                                        <option value="1">10.000đ</option>
                                        <option value="2">20.000đ</option>
                                        <option value="5">50.000đ</option>
                                        <option value="10">100.000đ</option>
                                        <option value="20">200.000đ</option>
                                        <option value="50">500.000đ</option>
                                        <option value="100">1.000.000đ</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="bulkKymua">KỲ QUAY</label>
                            <select onchange="bulkSelectKymuaChange();" id="bulkKymua" multiple="multiple" placeholder="Chọn kỳ" class="form-control input-sm">                                        
                            </select>
                        </div>
                        <div class="form-group">
                            <div class="bulkCircle text-right">
                                <strong>Tạm tính :</strong> <strong style="color: red"><span id="bulkCountAllMoney">0</span>đ</strong>
                            </div>
                        </div>
                        <div>
                            <div class="form-row">
                                <div class="col">
                                    <button type="button" onclick="bulkBtnAddBasket();" class="btn btn-primary btn-block btn-md">THÊM VÀO GIỎ</button>
                                </div>
                                <div class="col">
                                    <button type="button" onclick="bulkBtnBuyNow();" class="btn btn-danger btn-block btn-md">XEM GIỎ HÀNG</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
            <div class="modal modal-alert fade" id="bulkModelSelectMoneyForm" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title text-center">
                                <span style="font-weight: bold">SỐ LƯỢNG VÉ GIẤY</span>
                            </h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <div class="form-row">
                                    <div class="col">
                                        <label class="radioCss text-right">
                                            <span style="color: black; font-weight: bold; font-size: 16px; float: left; padding-left: 15px">50 VÉ </span>
                                            <input onclick="bulkModalMoneyOptRadioSelectedChecked(this);" value="50" class="option-input radio" type="radio" name="bulkModelSelectMoneyFormOptradio" checked>
                                        </label>
                                    </div>
                                    <div class="col">
                                        <label class="radioCss text-right">
                                            <span style="color: black; font-weight: bold; font-size: 16px; float: left; padding-left: 15px">100 VÉ </span>
                                            <input onclick="bulkModalMoneyOptRadioSelectedChecked(this);" value="100" class="option-input radio" type="radio" name="bulkModelSelectMoneyFormOptradio">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-row">
                                    <div class="col">
                                        <label class="radioCss text-right">
                                            <span style="color: black; font-weight: bold; font-size: 16px; float: left; padding-left: 15px">200 VÉ </span>
                                            <input onclick="bulkModalMoneyOptRadioSelectedChecked(this);" value="200" class="option-input radio" type="radio" name="bulkModelSelectMoneyFormOptradio">
                                        </label>
                                    </div>
                                    <div class="col">
                                        <label class="radioCss text-right">
                                            <span style="color: black; font-weight: bold; font-size: 16px; float: left; padding-left: 15px">500 VÉ </span>
                                            <input onclick="bulkModalMoneyOptRadioSelectedChecked(this);" value="500" class="option-input radio" type="radio" name="bulkModelSelectMoneyFormOptradio">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-row">
                                    <div class="col">
                                        <label class="radioCss text-right">
                                            <span style="color: black; font-weight: bold; font-size: 16px; float: left; padding-left: 15px">1000 VÉ </span>
                                            <input onclick="bulkModalMoneyOptRadioSelectedChecked(this);" value="1000" class="option-input radio" type="radio" name="bulkModelSelectMoneyFormOptradio">
                                        </label>
                                    </div>
                                    <div class="col">
                                        <label class="radioCss text-right">
                                            <span class="labelSokhacCss">SỐ KHÁC </span>
                                            <input onclick="bulkModalMoneyOptRadioSelectedChecked(this);" value="9999999" class="option-input radio" type="radio" name="bulkModelSelectMoneyFormOptradio">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div id="bulkModelSelectMoneyFormDivCustomMoney" class="form-group" style="display: none">
                                <input id="bulkModelSelectMoneyFormInputTextMoney" placeholder="Nhập số vé..." maxlength="5" type="tel" class="form-control input-lg">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="form-row" style="padding: 0 15px 15px 15px">
                                <div class="col">
                                    <button type="button" data-dismiss="modal" class="btn btn-default btn-md btn-block">ĐÓNG</button>
                                </div>
                                <div class="col">
                                    <button onclick="bulkModelSelectMoneyFormSubmit();" type="button" class="btn btn-success btn-md btn-block">HOÀN TẤT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal modal-alert fade" id="bulkModelFormInfoNote" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title text-center">
                                <span style="font-weight: bold">THÔNG BÁO</span>
                            </h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group" style="margin-bottom: 0">
                                <h4><strong>Quý khách xin lưu ý:</strong></h4>
                                <ul>
                                    <li><strong>Các bộ số trong vé Giỏ Lì Xì sẽ do hệ thống Vietlott chọn ngẫu nhiên</strong></li>
                                    <li><strong>Giỏ Lì Xì chỉ phục vụ ship (Miễn phí ship thường cho đơn hàng từ 2 triệu)</strong></li>
                                    <li><strong>Tặng kèm phong bao Lì xì siêu đẹp</strong></li>
                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="form-row" style="padding: 0 15px 15px 15px">
                                <div class="col">
                                    <button type="button" data-dismiss="modal" class="btn btn-success btn-md btn-block">ĐỒNG Ý</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>