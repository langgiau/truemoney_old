<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
    <head>
        <title>404</title>
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/bootstrap/css/bootstrap.min.css">
        <style>
            code {
                font-family: monospace;
            }
        </style>
    </head>
    <body>
        <div class="col-md-12">
            <div class="text-center">
                <div class="row">    
                    <div class="col-sm-12">
                        <img src="${pageContext.request.contextPath}/static/img/common/not_page_404.png" width="200px" height="auto">
                    </div>
                </div>
                <div class="row">    
                    <div class="col-sm-12">
                        <h3>
                            <p><code>Đường dẫn không hợp lệ.</code></p>
                            <p><code>Vui lòng kiểm tra lại đường dẫn trên trình duyệt.</code></p>
                        </h3>
                        <br>
                        <p>
                            <a class="btn btn-primary" href="${pageContext.request.contextPath}/home">Quay lại trang chủ</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>