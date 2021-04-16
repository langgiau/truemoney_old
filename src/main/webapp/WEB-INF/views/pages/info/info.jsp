<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Kết quả</title>
        <meta name="format-detection" content="telephone=no">
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="_csrf" content="${sessionScope.TOKEN}"/>
        <meta name="_csrf_header" content="TOKEN"/>

        <link rel="shortcut icon" href="${pageContext.request.contextPath}/static/img/common/favicon.ico">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/font-awesome.min.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/bootstrap/css/bootstrap.min.css">        
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/info/info.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
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
    <body>
        <div id="notifications"></div>
        <div class="container">
            <div class="infoDivLogo">
                <div class="luckeybets">
                    <img src="${pageContext.request.contextPath}/static/img/common/logo.png" width="auto" height="50px">
                </div>
                <div class="vnpay">
                    <img src="${pageContext.request.contextPath}/static/img/common/momo_logo_info.png" width="auto" height="45px">
                </div>
            </div> 
            <div class="panel-group">
                <div class="panel panel-primary">
                    <div class="panel-heading">Kết quả giao dịch</div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label>Mã đơn hàng:</label>
                            <label class="textColor">${cusTransId}</label>
                        </div>
                        <div class="form-group">
                            <label>Số tiền:</label>
                            <label class="textColor">${cusAmount}</label>
                        </div>  
                        <div class="form-group">
                            <label>Kết quả:</label>
                            <label>${momoResult}</label>                    
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>