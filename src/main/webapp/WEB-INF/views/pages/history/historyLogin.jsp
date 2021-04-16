<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Xác thực số điện thoại</title>
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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/history/historyLogin.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>        
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/history/historyLogin.js?v=${COMMON_SYSDATE}"></script>
        <script>
            var requestUrl = "${pageContext.request.contextPath}";
            setTimeout(function () {
                window.history.forward();
            }, 10);
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
        <script type=text/javascript src="https://sdk.accountkit.com/vi_VN/sdk.js"></script>
        <script type="text/javascript">
            AccountKit_OnInteractive = function () {
                AccountKit.init(
                        {
                            appId: "969326589900284",
                            state: "88dcb615ee66843facaee589420ef516",
                            version: "v1.1",
                            display: "modal"
                        }
                );
            };
        </script>        
    </head>
    <body class="noselect-body">
        <div id="notifications"></div>
        <div class="container">
            <div class="panel-group">
                <div class="panel panel-danger">
                    <div class="panel-heading text-center">
                        <img onclick="window.location.href = '<%=request.getContextPath()%>/home'" style="cursor: pointer" src="${pageContext.request.contextPath}/static/img/common/logo.png" width="auto" height="53px">
                    </div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label for="loginMsisdn">Số điện thoại</label>
                            <input id="loginMsisdn" type="tel" class="form-control input-lg" maxlength="15">
                        </div>
                        <div class="form-group">
                            <button onclick="loginSmsLogin();" type="button" class="btn btn-danger btn-block btn-lg" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Đang xử lý...">
                                TIẾP THEO
                            </button>
                        </div>
                    </div>
                </div>        
            </div>
            <!-- The Modal -->
            <div class="modal" id="loginModalUserLogin" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <strong style="font-size: 17px">Nhập mật khẩu</strong>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <input type="password" id="loginModalUserLoginPW" class="form-control input-md" placeholder="Mật khẩu đăng nhập ứng dụng LuckyBest" autofocus />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="form-row text-center" style="padding: 0 15px 15px 15px">
                                <div class="col">
                                    <button onclick="loginOpenModalResetPw();" type="button" class="btn btn-warning btn-block btn-md">Quên mật khẩu</button>
                                </div>
                                <div class="col">
                                    <button onclick="loginSubmitLoginBuy();" type="button" class="btn btn-success btn-block btn-md">Tiếp tục</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- The Modal -->
            <div class="modal" id="loginModalUserResetPw" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <strong style="font-size: 17px">Thiết lập mật khẩu mới</strong>
                        </div>
                        <div class="modal-body">
                            <input id="loginModalUserResetPwToken" type="hidden" value="" />
                            <div class="form-group">
                                <input type="password" id="loginModalUserResetPwNewPass" class="form-control input-md" placeholder="Nhập mật khẩu mới..." />
                            </div>
                            <div class="form-group">
                                <input type="password" id="loginModalUserResetPwNewPassConfirm" class="form-control input-md" placeholder="Nhập lại mật khẩu mới..." />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="form-group text-center" style="padding: 0 15px 0 15px">
                                <button onclick="loginSubmitModalResetPw();" type="button" class="btn btn-success btn-block btn-md">Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>