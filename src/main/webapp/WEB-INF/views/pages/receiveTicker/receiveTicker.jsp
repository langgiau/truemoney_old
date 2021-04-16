<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Hình thức nhận vé</title>
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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/custom.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/style.default.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/common/common.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/receiveTicker/receiveTicker.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/receiveTicker/receiveTicker.js?v=${COMMON_SYSDATE}"></script>
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
<%--        <script type=text/javascript src="https://sdk.accountkit.com/vi_VN/sdk.js"></script>--%>
<%--        <script type="text/javascript">--%>
<%--            AccountKit_OnInteractive = function () {--%>
<%--                AccountKit.init(--%>
<%--                        {--%>
<%--                            appId: "969326589900284",--%>
<%--                            state: "88dcb615ee66843facaee589420ef516",--%>
<%--                            version: "v1.1",--%>
<%--                            display: "modal"--%>
<%--                        }--%>
<%--                );--%>
<%--            };--%>
<%--        </script>--%>
    </head>
    <body class="noselect-body">
        <div id="notifications"></div>
        <div class="container">
            <div class="panel-group">
                <div class="panel panel-danger">
                    <div class="panel-heading text-center">
                        <i onclick="receiveTickerBackHis();" class="fa fa-chevron-circle-left" style="font-size: 35px; color: white; float: left; cursor: pointer; line-height: 25px"></i>
                        <span style="font-size: 18px; color:white; font-weight: bold">Hình thức nhận vé</span>
                    </div>
                    <div class="panel-body">
                        <div class="form-group form-horizontal" style="border: red dotted 2px; background-color: #f5e8e8">
                            <div class="form-row">
                                <label class="control-label col-sm-5" style="font-size: 12px" for="receiveTickerCountMonneyAll">&nbsp;Tiền vé: </label>
                                <div class="col">
                                    <span id="receiveTickerCountMonneyAll" style="color: red"></span>
                                </div>
                            </div>
                            <div class="form-row">
                                <label id="receiveTickerCountMonneyShipLabelText" class="control-label col-sm-5" style="font-size: 12px" for="receiveTickerCountMonneyShip">&nbsp;Phí ship: </label>
                                <div class="col">
                                    <span id="receiveTickerCountMonneyShip" style="color: red"></span>
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="control-label col-sm-5" style="font-size: 12px" for="receiveTickerCountMonneyBonus">&nbsp;Phí giao dịch (3%): </label>
                                <div class="col">
                                    <span id="receiveTickerCountMonneyBonus" style="color: red"></span>
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="control-label col-sm-5" style="font-size: 12px;" for="receiveTickerCountTotalMonneyAll">&nbsp;Tổng tiền: </label>
                                <div class="col">
                                    <span id="receiveTickerCountTotalMonneyAll" style="color: red; font-weight: bold"></span>
                                </div>
                            </div>
                            <div class="form-row text-center" style="display: none">
                                <div class="col">
                                    <label><input value="2" type="radio" name="receiveTickerRadio" checked> Đại lý giữ hộ</label>
                                </div>
                                <div class="col">
                                    <label><input value="1" type="radio" name="receiveTickerRadio"> Ship vé</label>
                                </div>
                            </div>
                        </div>
                        <div id="receiveTickerShowHide">
                            <div class="form-group">
                                <label for="receiveTickerUsername">Họ tên người nhận vé</label>
                                <input id="receiveTickerUsername" type="text" class="form-control" value="">
                            </div>
                            <div class="form-group">
                                <label for="receiveTickerUserPhone">Số điện thoại <span style="color: red"></span></label>
                                <input id="receiveTickerUserPhone" type="tel" disabled="true" class="form-control" value="">
                            </div>
                            <div id="receiveTickerUserFormNotBulk" class="form-group" style="display: none">
                                <label for="receiveTickerUserCMND">Số CMND/CCCD </label>
                                <input id="receiveTickerUserCMND" type="tel" class="form-control" value="">
                            </div>
                            <div id="receiveTickerUserFormBulk" style="display: none">
                                <div class="form-group">
                                    <label for="receiveTickerUserSelectProvince">Tỉnh/ thành phố </label>
                                    <select class="form-control" onchange="receiveTickerGetAllDistrictShipByPro(this.value);" id="receiveTickerUserSelectProvince"></select>
                                </div>
                                <div class="form-group">
                                    <label for="receiveTickerUserSelectDistrict">Quận/ huyện </label>
                                    <select class="form-control" id="receiveTickerUserSelectDistrict"></select>
                                </div>
                                <div class="form-group">
                                    <label for="receiveTickerUserAddress">Địa chỉ </label>
                                    <input id="receiveTickerUserAddress" type="text" class="form-control" placeholder="Số nhà, đường xã...">
                                </div>
                            </div>
                            <div class="form-group text-center">
                                <button data-toggle="modal" data-target="#receiveTickerModalQuyDinh" type="button" class="btn btn-link btn-primary">(Quy định về trả thưởng và giao vé)</button>
                            </div>
                            <div class="form-group text-center">
                                <p style="color: red; font-size: 12px">
                                    Quý khách kiểm tra kỹ và đảm bảo thông tin trên là chính xác.
                                    <span id="receiveAlarmTextShip"> Thông tin này sẽ được ghi vào mặt sau của vé khi vé được in ra.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer text-center">
                        <div class="form-group">
<%--                            <button onclick="receiveTickerSmsLogin();" type="button" class="btn btn-danger btn-block btn-lg" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Đang xử lý...">--%>
                            <button onclick="receiveTickerSubmitLoginBuy();" type="button" class="btn btn-danger btn-block btn-lg" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Đang xử lý...">
                                XÁC NHẬN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- The Modal -->
            <div class="modal" id="receiveTickerModalQuyDinh" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <div id="receiveTickerModalQuyDinhBodyText">
                                    <jsp:include page="../policy/policy.jsp" />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="text-center" style="padding: 0 15px 15px 15px">
                                <button data-dismiss="modal" type="button" class="btn btn-danger btn-block btn-md">Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- The Modal -->
            <div class="modal" id="receiveTickerModalUserLogin" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <strong style="font-size: 17px">Nhập mật khẩu</strong>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <input type="password" id="receiveTickerModalUserLoginPW" class="form-control input-md" placeholder="Mật khẩu đăng nhập ứng dụng LuckyBest" autofocus />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="form-row text-center" style="padding: 0 15px 15px 15px">
                                <div class="col">
                                    <button onclick="receiveTickerOpenModalResetPw();" type="button" class="btn btn-warning btn-block btn-md">Quên mật khẩu</button>
                                </div>
                                <div class="col">
                                    <button onclick="receiveTickerSubmitLoginBuy();" type="button" class="btn btn-success btn-block btn-md">Tiếp tục</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- The Modal -->
            <div class="modal" id="receiveTickerModalUserResetPw" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <strong style="font-size: 17px">Quên mật khẩu</strong>
                        </div>
                        <div class="modal-body">
                            <input id="receiveTickerModalUserResetPwToken" type="hidden" value="" />
                            <div class="form-group">
                                <input type="password" id="receiveTickerModalUserResetPwNewPass" class="form-control input-md" placeholder="Nhập mật khẩu mới..." />
                            </div>
                            <div class="form-group">
                                <input type="password" id="receiveTickerModalUserResetPwNewPassConfirm" class="form-control input-md" placeholder="Nhập lại mật khẩu mới..." />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="form-group text-center" style="padding: 0 15px 0 15px">
                                <button onclick="receiveTickerSubmitModalResetPw();" type="button" class="btn btn-success btn-block btn-md">Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
