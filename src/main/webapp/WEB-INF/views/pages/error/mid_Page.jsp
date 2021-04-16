<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <title>Phiên bản lỗi thời</title>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Expires" content="0"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/bootstrap/css/bootstrap.min.css">
    <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/roboto.css">

    <style>
        code {
            font-family: monospace;
        }
    </style>
    <script>
        function tiepTucMuaVe() {
            window.open(href="${pageContext.request.contextPath}/home", "_self");
        }

    </script>
</head>
<body>
<div class="col-md-12">
    <div class="text-center">
        <div class="row">
            <div class="col-sm-12">
                <%--                        <img src="${pageContext.request.contextPath}/static/img/common/not_error_500.png" class="img-rounded" width="300px" height="auto">--%>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 text-center">
                <h3>

                    <p><code style="font-size: 2vh;">Phiên làm việc hết hạn vui lòng truy cập LuckyBest từ ứng dụng TrueMoney để mua vé!</code></p>

                </h3>
                <br>
<%--                <button class="" onclick="tiepTucMuaVe();">Tiếp tục sử dụng</button>--%>

                <%--                        <p>--%>
                <%--                            <a class="btn btn-primary" href="${pageContext.request.contextPath}/home">Quay lại trang chủ</a>--%>
                <%--                        </p>--%>
            </div>
        </div>
    </div>
</div>
</body>
</html>
