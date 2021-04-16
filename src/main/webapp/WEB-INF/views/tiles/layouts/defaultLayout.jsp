<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page isELIgnored="false" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="_csrf" content="${sessionScope.TOKEN}"/>
        <meta name="_csrf_header" content="TOKEN"/>

        <link rel="shortcut icon" href="${pageContext.request.contextPath}/static/img/common/favicon.ico">
        <link type=text/css rel="stylesheet" href="${pageContext.request.contextPath}/static/css/ui/font-awesome.min.css">
        <link type=text/css rel="stylesheet" href="${pageContext.request.contextPath}/static/css/ui/jquery.datetimepicker.css">
        <link type=text/css rel="stylesheet" href="${pageContext.request.contextPath}/static/bootstrap/css/bootstrap.min.css">
        <link type=text/css rel="stylesheet" href="${pageContext.request.contextPath}/static/css/ui/bootstrap-select.min.css">
        <link type=text/css rel="stylesheet" href="${pageContext.request.contextPath}/static/css/ui/ajax-bootstrap-select.min.css">
        <link type=text/css rel="stylesheet" href="${pageContext.request.contextPath}/static/css/ui/dataTables.bootstrap.min.css">
        <link type=text/css rel="stylesheet" href="${pageContext.request.contextPath}/static/css/ui/jasny-bootstrap.min.css">
        <link type=text/css rel="stylesheet" href="${pageContext.request.contextPath}/static/css/ui/navmenu-reveal.css">        
        <link type=text/css rel="stylesheet" href="${pageContext.request.contextPath}/static/css/ui/style.default.css">
        <link type=text/css rel="stylesheet" href="${pageContext.request.contextPath}/static/css/ui/custom.css">
        <link type=text/css rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/roboto.css">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.datetimepicker.full.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-ui.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.dataTables.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/bootstrap-select.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/ajax-bootstrap-select.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/dataTables.bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jasny-bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>        
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/bootbox.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/constants.js"></script>

        <script type="text/javascript">
            var requestUrl = "<%=request.getContextPath()%>";
            function getLocaleContextUtils() {
                return '<%=RequestContextUtils.getLocale(request)%>';
            }
            function getResource(callbackFunction) {
                jQuery.i18n.properties({
                    name: 'JS_Messages',
                    path: '<%=request.getContextPath()%>/static/language/',
                    mode: 'both',
                    language: getLocaleContextUtils(),
                    async: true,
                    callback: function () {
                        try {
                            commonTableLanguage();
                            var sondv = {
                                OK: jQuery.i18n.prop('common_btn_agree') + "",
                                CANCEL: jQuery.i18n.prop('common_btn_cancel') + "",
                                CONFIRM: jQuery.i18n.prop('common_btn_agree') + ""
                            };
                            bootbox.addLocale("sondv", sondv);
                            $.datetimepicker.setLocale(jQuery.i18n.prop('common_datetimepicker_lang'));
                        } catch (err) {
                            console.log(err);
                            console.log('----- Error init lang js----- ');
                        }

                        callbackFunction();
                    }
                });
            }
            function rootClickChangeLang(value) {
                var langPresent = getLocaleContextUtils();
                if (langPresent == value) {
                    return;
                }
                bootbox.confirm(jQuery.i18n.prop('common_change_lang_root'), function (result) {
                    if (result) {
                        window.location.href = requestUrl + "/change-language?lang=" + value;
                    }
                });
            }
        </script>
<%--        <style type="text/css">--%>
<%--        @font-face {font-family: "Roboto";src: url("${pageContext.request.contextPath}/static/css/ui/fonts/Light/Roboto-Light.ttf") format("truetype");}--%>

<%--        </style>--%>
    </head>
    <body>
        <tiles:insertAttribute name="header" />
        <tiles:insertAttribute name="body" />
        <tiles:insertAttribute name="footer" />
    </body>    
</html>