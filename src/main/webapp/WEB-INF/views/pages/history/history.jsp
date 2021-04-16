<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Lịch sử mua vé</title>
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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/history/history.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/bootbox.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>        
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/history/history.js?v=${COMMON_SYSDATE}"></script>
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
                    <div class="panel-heading text-center">
                        <i onclick="historyBackHis();" class="fa fa-chevron-circle-left" style="padding-top: 10px; font-size: 35px; color: white; float: left; cursor: pointer; line-height: 25px"></i>
                        <span style="font-size: 18px; color:white; font-weight: bold">Lịch sử mua vé</span>
                        <p style="color: white; margin: 0">(${sessionScope.msisdn})</p>
                    </div>
                    <div class="panel-body">
                        <div class="tab" role="tabpanel">
                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" class="active"><a href="#historyBodyWaiting" aria-controls="home" role="tab" data-toggle="tab">Đang chờ</a></li>
                                <li role="presentation"><a href="#historyBodyBuyDone" aria-controls="profile" role="tab" data-toggle="tab">Đã mua</a></li>
                                <li role="presentation"><a href="#historyBodyBuyCancel" aria-controls="messages" role="tab" data-toggle="tab">Đã hủy</a></li>
                            </ul>
                            <!-- Tab panes -->
                            <div class="tab-content tabs">
                                <div role="tabpanel" class="tab-pane fade in active" id="historyBodyWaiting"></div>
                                <div role="tabpanel" class="tab-pane fade" id="historyBodyBuyDone"></div>
                                <div role="tabpanel" class="tab-pane fade" id="historyBodyBuyCancel"></div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    </body>
</html>
