<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Chi tiết giao dịch</title>
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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/style.default.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/custom.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/common/common.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/history/historyDetail.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/bootbox.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>        
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/history/historyDetail.js?v=${COMMON_SYSDATE}"></script>
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
                        try {
                            var sondv = {
                                OK: jQuery.i18n.prop('common_btn_agree') + "",
                                CANCEL: jQuery.i18n.prop('common_btn_cancel') + "",
                                CONFIRM: jQuery.i18n.prop('common_btn_agree') + ""
                            };
                            bootbox.addLocale("sondv", sondv);
                        } catch (err) {
                            console.log(err);
                            console.log('----- Error init lang js----- ');
                        }

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
                    <div id="detailBkgRoot" class="panel-heading text-center">
                        <i onclick="detailBackHis();" class="fa fa-chevron-circle-left" style="padding-top: 10px; font-size: 35px; color: white; float: left; cursor: pointer; line-height: 25px"></i>
                        <span style="font-size: 18px; color:white; font-weight: bold">Chi tiết giao dịch</span>
                        <p style="color: white; margin: 0">(${sessionScope.msisdn})</p>
                    </div>
                    <div class="panel-body">
                        <div id="detailBodyBuildHtml"></div>
                        <div class="form-group" style="padding: 10px">
                            <div id="detailBodyDataInfoRec">
                                <div class="panel panel-success">
                                    <div class="panel-heading"><h4>Thông tin người mua</h></div>
                                    <div class="panel-body">
                                        <div class="form-group" style="margin-bottom: 0">    
                                            <div class="detail-group-baobao">
                                                <div class="form-group" style="border-bottom: 1px solid #cccccc; margin-bottom: 0">
                                                    <div class="form-row">                                                        
                                                        <div class="col" style="padding-top: 5px;">
                                                            <p id="detailOrderIdMark" style="margin-bottom: 5px; opacity: 1;font-size: 15px; font-weight: bold"></p>
                                                            <p id="detailTimeOrder" style="font-size: 15px"></p>
                                                        </div>
                                                        <div class="col-md-4 text-right">
                                                            <label id="detailOrderMoneyTotal" style="font-size: 18px; padding-top: 13px; color: red">
                                                            </label>                                                    
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group" style="border-bottom: 1px solid #cccccc; margin-bottom: 0">
                                                    <div class="form-row">
                                                        <div class="col-md-1 text-center">
                                                            <i style="font-size: 28px; padding-top: 13px; color: #cccccc" class="fa fa-user"></i>                                                    
                                                        </div>
                                                        <div class="col" style="padding-top: 5px;">
                                                            <p style="margin-bottom: 5px; opacity: 1;font-size: 15px; font-weight: bold">Người nhận</p>
                                                            <p id="detailFullname" style="font-size: 15px"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group" style="border-bottom: 1px solid #cccccc; margin-bottom: 0">
                                                    <div class="form-row">
                                                        <div class="col-md-1 text-center">
                                                            <i style="font-size: 28px; padding-top: 13px; color: #cccccc" class="fa fa-map-marker"></i>                                                    
                                                        </div>
                                                        <div class="col" style="padding-top: 5px;">
                                                            <p id="detailAddressTextLabel" style="margin-bottom: 5px; opacity: 1;font-size: 15px; font-weight: bold">Địa chỉ</p>
                                                            <p id="detailAddress" style="font-size: 15px"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 0">
                                                    <div class="form-row">
                                                        <div class="col-md-1 text-center">
                                                            <i style="font-size: 28px; padding-top: 13px; color: #cccccc" class="fa fa-volume-control-phone"></i>                                                    
                                                        </div>
                                                        <div class="col" style="padding-top: 5px;">
                                                            <p style="margin-bottom: 5px; opacity: 1;font-size: 15px; font-weight: bold">Điện thoại</p>
                                                            <p id="detailPhoneNumber" style="font-size: 15px"></p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="detailShopOnelineBuy" style="display: none; padding-top: 10px">
                                    <div class="panel panel-warning">
                                        <div class="panel-heading"><h4>Thông tin điểm bán</h4></div>
                                        <div class="panel-body">
                                            <div class="form-group" style="margin-bottom: 0">    
                                                <div class="detail-group-baobao">
                                                    <div class="form-group" style="border-bottom: 1px solid #cccccc; margin-bottom: 0">
                                                        <div class="form-row">
                                                            <div class="col-md-1 text-center">
                                                                <i style="font-size: 28px; padding-top: 13px; color: #cccccc" class="fa fa-user"></i>                                                    
                                                            </div>
                                                            <div class="col" style="padding-top: 5px;">
                                                                <p style="margin-bottom: 5px; opacity: 1;font-size: 15px; font-weight: bold">Tên điểm bán</p>
                                                                <p id="detailUserOnlineName" style="font-size: 15px"></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group" style="border-bottom: 1px solid #cccccc; margin-bottom: 0">
                                                        <div class="form-row">
                                                            <div class="col-md-1 text-center">
                                                                <i style="font-size: 28px; padding-top: 13px; color: #cccccc" class="fa fa-volume-control-phone"></i>                                                    
                                                            </div>
                                                            <div class="col" style="padding-top: 5px;">
                                                                <p style="margin-bottom: 5px; opacity: 1;font-size: 15px; font-weight: bold">Số điện thoại</p>
                                                                <p id="detailUserOnlinePhone" style="font-size: 15px"></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group" style="margin-bottom: 0">
                                                        <div class="form-row">
                                                            <div class="col-md-1 text-center">
                                                                <i style="font-size: 28px; padding-top: 13px; color: #cccccc" class="fa fa-map-marker"></i>                                                    
                                                            </div>
                                                            <div class="col" style="padding-top: 5px;">
                                                                <p style="margin-bottom: 5px; opacity: 1;font-size: 15px; font-weight: bold">Địa chỉ</p>
                                                                <p id="detailUserOnlineAddress" style="font-size: 15px"></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- The Modal -->
            <div class="modal fade" id="detailModalViewImage" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div id="detailModalViewImageBody"></div>
                        </div>
                        <div class="modal-footer">
                            <div class="form-group" style="margin-right: 15px;">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" id="receiveTickerModalReportErr">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            BÁO VÉ KHÔNG ĐÚNG
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="receiveTickerModalPaperTicketId" value="-1" />
                            <div class="form-group">
                                <textarea id="receiveTickerModalReportTextIp" placeholder="Nhập lý do..." rows="5"></textarea>
                            </div>
                            <p style="color: red">Nếu thông tin vé không đúng, bạn vui lòng thông báo nhanh nhất cho quản trị viên tại đây.</p>
                        </div>
                        <div class="modal-footer" style="padding-top: 10px; padding-bottom: 10px">
                            <div class="form-row text-center">
                                <div class="col">
                                    <button data-dismiss="modal" type="button" class="btn btn-default btn-sm">Đóng</button>
                                    <button onclick="detailSubmitTickerErrReport();" type="button" class="btn btn-danger btn-sm">Thông báo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
