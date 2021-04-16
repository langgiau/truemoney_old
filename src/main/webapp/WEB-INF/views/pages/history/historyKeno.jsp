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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/roboto.css">


        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/bootbox.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>        
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/history/historyKeno.js?v=${COMMON_SYSDATE}"></script>
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

                    <div style="position: fixed;text-align: center;background: #DD0E11;margin: 0 -1px;z-index: 1"
                         class="container">
                        <table style="width: 100%; margin: 5px 0 ">
                            <tr>
                                <td style="color: #FFFFFF ; width: 20%;text-align: left; padding-left: 10px;">
                                    <i class="fa fa-arrow-left" style="font-size: 20px;line-height: 32px;" onclick="historyBackHis();"></i>
                                    <br>

                                </td>
                                <td style="color: #FFFFFF ; width: 60%;font-size:20px;font-weight: 500;"  onclick="window.location.href = '<%=request.getContextPath()%>/home'">
                                    Lịch sử đặt mua
                                  <br>  <p style="color: white;font-size: small; margin: 0">(${sessionScope.msisdn})</p>
                                </td>
                                <td style="color: #FFFFFF ; width: 20%;text-align: right; padding-right: 10px;">
                                    <i class="fa fa-shopping-cart" style="font-size: 20px;" onclick="window.location.href = '<%=request.getContextPath()%>/basket'"></i>	&nbsp;
                                    <span id="homeMuabaoBasketNumberTotal" class="step-basket">0</span>
                                    <i class="fa fa-home" style="font-size: 20px" onclick="window.location.href = '<%=request.getContextPath()%>/home'"></i>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div style="height: 55px"></div>
<%--                    <div class="panel-heading text-center">--%>
<%--                        <i onclick="historyBackHis();" class="fa fa-arrow-left" style="font-size: 20px;line-height: 32px;"></i>--%>
<%--&lt;%&ndash;                        <i onclick="historyBackHis();" class="fa fa-chevron-circle-left" style="padding-top: 10px; font-size: 35px; color: white; float: left; cursor: pointer; line-height: 25px"></i>&ndash;%&gt;--%>
<%--                        <span style="font-size: 18px; color:white; font-weight: bold">Lịch sử mua vé</span>--%>
<%--                        <p style="color: white; margin: 0">(${sessionScope.rootMsisdn})</p>--%>
<%--<!--                        <i class="fa fa-power-off" title="Đăng xuất" onclick="window.location.href = '<%=request.getContextPath()%>/history/logout'" style="margin-top: -35px; font-size: 34px; color: white; float: right; cursor: pointer; line-height: 25px"></i>-->--%>

<%--                    </div>--%>
                    <div class="panel-body">
                        <div class="tab" role="tabpanel">
                            <!-- Nav tabs -->
                            <ul class="nav nav-tabs" role="tablist">
                                <li role="presentation" class="active"><a href="#historyBodyKenoWaiting" aria-controls="home" role="tab" data-toggle="tab">Đang chờ</a></li>
                                <li role="presentation"><a href="#historyBodyKenoBuyDone" aria-controls="profile" role="tab" data-toggle="tab">Đã mua</a></li>
                                <li role="presentation"><a href="#historyBodyKenoBuyCancel" aria-controls="messages" role="tab" data-toggle="tab">Đã hủy</a></li>
                            </ul>
                            <!-- Tab panes -->
                            <div class="tab-content tabs">
                                <div role="tabpanel" class="tab-pane fade in active" id="historyBodyKenoWaiting"></div>
                                <div role="tabpanel" class="tab-pane fade" id="historyBodyKenoBuyDone"></div>
                                <div role="tabpanel" class="tab-pane fade" id="historyBodyKenoBuyCancel"></div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    </body>
</html>
