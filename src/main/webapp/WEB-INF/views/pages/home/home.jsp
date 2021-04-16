<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Trang chủ</title>
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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/max3d/max3d.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/power655/power655.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/sumoselect.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/mega645/mega645.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/max4d/max4d.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/max3dPlus/max3dPlus.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/home/home.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/keno/keno.css?v=${COMMON_SYSDATE}">


        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/jQuery.countdownTimer.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/max3d/max3d.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/max3dPlus/max3dPlus.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/power655/power655.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.sumoselect.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/mega645/mega645.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/max4d/max4d.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/home/home.js?v=${COMMON_SYSDATE}"></script>
        
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
        <div id="containerMob" class="container">
            <div class="panel-group">
                <div class="panel panel-danger" style="border: none">
                    <div id="homeBannerSlides" style="height: 153px; width: 100%"></div>
                    <div class="panel-body text-center" style="position: relative;height: 100%;">
                        <div class="form-group" style="margin-bottom: 2px">
                            <div class="homeHisDivTicker" onclick="homeOpenHistory();" style="background-color: #f0f8ff">
                                <img class="logoTicherHis"
                                     src="${pageContext.request.contextPath}/static/img/common/history_logo.png" width="36px"
                                     height="auto" style="top:23px">
                                <span class="textHis">
                                            LỊCH SỬ MUA VÉ
                                        <br>TRUYỀN THỐNG
                                        </span>
                                <div class="buttonRight" style="background-color: #febf10;">
                                    <span class="glyphicon glyphicon-chevron-right" style="color: white;;-webkit-text-stroke: 2px #febf10;"></span>
                                </div>
                            </div>

                            <div class="homeHisDivTicker" onclick="homeOpenHistoryKeno();" style="background-color: #f0f8ff">
                                <img class="logoTicherHis"
                                     src="${pageContext.request.contextPath}/static/img/common/history_keno_logo.png" width="36px"
                                     height="auto" style="top:23px">
                                <span class="textHis">
                                            LỊCH SỬ MUA VÉ
                                        <br>KENO
                                        </span>
                                <div class="buttonRight" style="background-color: #cf5f3a;">
                                    <span class="glyphicon glyphicon-chevron-right" style="color: white;;-webkit-text-stroke: 2px #cf5f3a;"></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="homeDivTicker" onclick="homeOpenKeno();">
                                <img class="logoTicher" style="top: 10px" src="${pageContext.request.contextPath}/static/img/common/keno_logo.png" width="73px" height="auto">
                                <span class="text">
                                    <!--  <p style="font-size: 10px; margin-bottom: 0;">Ngày quay: <span id="homeTextKenoDateQuay"></span></p> -->
                                    <p style="font-size: 10px; margin-bottom: 0;">Cả tuần, 10 phút/1 kỳ quay</span></p>
                                    <p style="color: #cf5f3a; margin-bottom: 0; font-weight: bold; font-size: 18px">2.000.000.000đ</p>
                                    <p style="font-size: 12px; margin-bottom:0;">Đánh nhanh, trúng lớn</p>
                                   <!-- <p style="font-size: 10px; margin-bottom: 0;">Tần suất 10 phút/1 kỳ, từ 08:00 - 21:00</p> -->
                                </span>
                                <div class="buttonRight" style="background-color: #cf5f3a;">
                                    <span class="glyphicon glyphicon-chevron-right" style="color: white"></span>
                                </div>
                            </div>
                        </div>
                                
                        <div class="form-group" style="display: none">
                            <div class="homeDivTicker" onclick="homeOpenBulk();">
                                <img class="logoTicherBulk" src="${pageContext.request.contextPath}/static/img/common/bulk_logo.png" width="49px" height="auto">
                                <span class="textBulk">
                                    Mua Giỏ Lì Xì
                                </span>
                                <div class="buttonRight" style="background-color: #f1b344;">
                                    <span class="glyphicon glyphicon-chevron-right" style="color: white"></span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="homeDivTicker" onclick="homeOpenOmMax3DPlus();">
                                <img class="logoTicher" src="${pageContext.request.contextPath}/static/img/common/logo_max3d_dam.png" width="69px" height="auto">
                                <span class="text">
                                    <p style="font-size: 10px; margin-bottom: 0;">Ngày quay: <span id="homeTextOmMax3dPlusDateQuay"></span></p>
                                    <p style="color:  #EA6A28; margin-bottom: 0; font-weight: bold; font-size: 18px">ÔM Max3D+</p>
                                    <p style="font-size: 10px; margin-bottom: 0;">Thời gian còn lại: <span id="homeTextOmMax3dPlusCountDown"></span></p>
                                </span>
                                <div class="buttonRight" style="background-color:  #EA6A28;">
                                    <span class="glyphicon glyphicon-chevron-right" style="color: white"></span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="homeDivTicker" onclick="homeOpenPower655();">
                                <img class="logoTicher" src="${pageContext.request.contextPath}/static/img/common/power655_logo.png" width="69px" height="auto">
                                <span class="text">
                                    <p style="font-size: 10px; margin-bottom: 0;">Ngày quay: <span id="homeTextPower655DateQuay"></span></p>
                                    <p id="homeTextPower655Money" style="color: #e30922; margin-bottom: 0; font-weight: bold; font-size: 18px"></p>
                                    <p style="font-size: 10px; margin-bottom: 0;">Thời gian còn lại: <span id="homeTextPower655CountDown"></span></p>
                                </span>
                                <div class="buttonRight" style="background-color: #e30922;">
                                    <span class="glyphicon glyphicon-chevron-right" style="color: white"></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="homeDivTicker" onclick="homeOpenMega645();">
                                <img class="logoTicher" style="top: 10px" src="${pageContext.request.contextPath}/static/img/common/mega645_logo.png" width="69px" height="auto">
                                <span class="text">
                                    <p style="font-size: 10px; margin-bottom: 0;">Ngày quay: <span id="homeTextMega645DateQuay"></span></p>
                                    <p id="homeTextMega645Money" style="color: #2164b2; margin-bottom: 0; font-weight: bold; font-size: 18px"></p>
                                    <p style="font-size: 10px; margin-bottom: 0;">Thời gian còn lại: <span id="homeTextMega645CountDown"></span></p>
                                </span>
                                <div class="buttonRight" style="background-color: #2164b2;">
                                    <span class="glyphicon glyphicon-chevron-right" style="color: white"></span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="homeDivTicker" onclick="homeOpenMax3DPlus();">
                                <img class="logoTicher" src="${pageContext.request.contextPath}/static/img/common/max3dPlus_logo.png" width="69px" height="auto">
                                <span class="text">
                                    <p style="font-size: 10px; margin-bottom: 0;">Ngày quay: <span id="homeTextMax3dPlusDateQuay"></span></p>
                                    <p style="color:  #39ae41; margin-bottom: 0; font-weight: bold; font-size: 18px">x100,000 lần!</p>
                                    <p style="font-size: 10px; margin-bottom: 0;">Thời gian còn lại: <span id="homeTextMax3dPlusCountDown"></span></p>
                                </span>
                                <div class="buttonRight" style="background-color:  #39ae41;">
                                    <span class="glyphicon glyphicon-chevron-right" style="color: white"></span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="homeDivTicker" onclick="homeOpenMax4D();">
                                <img class="logoTicher" src="${pageContext.request.contextPath}/static/img/common/max4d_logo.png" width="69px" height="auto">
                                <span class="text">
                                    <p style="font-size: 10px; margin-bottom: 0;">Ngày quay: <span id="homeTextMax4dDateQuay"></span></p>
                                    <p style="color: #81005d; margin-bottom: 0; font-weight: bold; font-size: 18px">x1,500 lần!</p>
                                    <p style="font-size: 10px; margin-bottom: 0;">Thời gian còn lại: <span id="homeTextMax4dCountDown"></span></p>
                                </span>
                                <div class="buttonRight" style="background-color: #81005d;">
                                    <span class="glyphicon glyphicon-chevron-right" style="color: white"></span>
                                </div>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="homeDivTicker" onclick="homeOpenMax3D();">
                                <img class="logoTicher" src="${pageContext.request.contextPath}/static/img/common/max3d_logo.png" width="69px" height="auto">
                                <span class="text">
                                    <p style="font-size: 10px; margin-bottom: 0;">Ngày quay: <span id="homeTextMax3dDateQuay"></span></p>
                                    <p style="color: #b21a8f; margin-bottom: 0; font-weight: bold; font-size: 18px">x100 lần!</p>
                                    <p style="font-size: 10px; margin-bottom: 0;">Thời gian còn lại: <span id="homeTextMax3dCountDown"></span></p>
                                </span>
                                <div class="buttonRight" style="background-color: #b21a8f;">
                                    <span class="glyphicon glyphicon-chevron-right" style="color: white"></span>
                                </div>
                            </div>
                        </div>
                        <p style=" bottom: 5%; left: 0; width: 100%; text-align: center">
                            <span style="color: white; font-weight: bold">Vui lòng đọc kỹ</span> 
                            <a href="#" style="color: #e7ea27; font-weight: bold; text-decoration: underline" data-toggle="modal" data-target="#homeDivModalDieukhoan">
                                Điều khoản sử dụng
                            </a>
                            <br>
                            <span style="color: white; font-weight: bold">trước khi đặt vé</span>
                        </p>
                    </div>
                </div>        
            </div>
            <!-- The Modal -->
            <div class="modal" id="homeDivModalDieukhoan" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <div id="homeDivModalDieukhoanBodyText">
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
            <div class="modal modal-alert fade" id="homeModelFormInfoNote" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title text-center">
                                <span style="font-weight: bold">THÔNG BÁO</span>
                            </h4>
                        </div>
                        <div class="modal-body">
                            <div class="form-group" style="margin-bottom: 0; font-weight: bold">
                                <p>Kính gửi Quý khách hàng:</p>
                                <p>Từ 28 âm lịch đến hết mùng 6, nhiều điểm bán trong hệ thống tạm dừng kinh doanh dịp Tết Nguyên Đán, để đảm bảo chất lượng dịch vụ tốt nhất, LuckyBest điều chỉnh giá trị tối thiểu của đơn hàng là 50.000 VNĐ.</p>
                                <p>LuckyBest kính mong nhận được sự ủng hộ và đồng hành của Quý khách.</p>
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


        <div class="modal modal-alert fade" id="mega645ModelNumber" role="dialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title"><span id="mega645ModelNumberTitle" style="padding-right: 10px; color: #ffe003; font-weight: bold;"></span> Chọn số</h4>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="mega645ModelKeybaoHidden" value=""/>
                        <div class="form-group">
                            <div id="mega645ModelMainBuildNumber" class="mega645CircleModal"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="text-center" style="padding: 0 15px 15px 15px">
                            <button onclick="mega645ModalBtnChonsoSubmit();" type="button" class="btn btn-danger btn-md btn-block">Đồng ý</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal modal-alert fade" id="max4dModelNumber" role="dialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">
                            <span id="max4dModelNumberRowKey" style="padding-right: 10px; color: #ffe003; font-weight: bold;"></span>
                            <span id="max4dModelNumberMuabaoName"></span>
                        </h4>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="max4dModelKeybaoHidden" value=""/>
                        <div id="max4dModelMainBuildNumber" class="max4dCircleModal">
                            <div class="form-row">
                                <div class="col-sm-9">
                                    <div id="max4dModelMainBuildNumberOtron"></div>
                                </div>
                                <div class="col">
                                    <div class="form-row text-right">
                                        <div class="col">
                                            <div class="form-group" style="margin-bottom: 10px">
                                                <button id="max4dBuildBodyMainChonSoClickMoneyBtn_1" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-danger btn-sm">10K</button>
                                            </div>
                                            <div class="form-group" style="margin-bottom: 10px">
                                                <button id="max4dBuildBodyMainChonSoClickMoneyBtn_2" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">20K</button>
                                            </div>
                                            <div class="form-group" style="margin-bottom: 10px">
                                                <button id="max4dBuildBodyMainChonSoClickMoneyBtn_5" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">50K</button>
                                            </div>
                                            <div class="form-group" style="margin-bottom: 10px">
                                                <button id="max4dBuildBodyMainChonSoClickMoneyBtn_10" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">100K</button>
                                            </div>
                                            <div class="form-group" style="margin-bottom: 10px">
                                                <button id="max4dBuildBodyMainChonSoClickMoneyBtn_20" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">200K</button>
                                            </div>
                                            <div class="form-group" style="margin-bottom: 10px">
                                                <button id="max4dBuildBodyMainChonSoClickMoneyBtn_50" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">500K</button>
                                            </div>
                                            <div class="form-group" style="margin-bottom: 10px">
                                                <button id="max4dBuildBodyMainChonSoClickMoneyBtn_100" onclick="max4dBuildBodyMainChonSoClickMoneyBtn(this);" style="width: 82px" type="button" class="max4dModelNumberRadioMoney btn btn-default btn-sm">1000K</button>
                                            </div>
                                            <br>
                                            <div class="form-group" style="margin-bottom: 10px">
                                                <button onclick="max4dBtnOnclickRandomModalAll();" style="width: 82px" type="button" class="btn btn-warning btn-sm">TC</button>
                                            </div>
                                            <div class="form-group" style="margin-bottom: 0">
                                                <button onclick="max4dBtnOnclickRandomModalDel();" style="width: 82px" type="button" class="btn btn-warning btn-sm">Hủy</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="text-center" style="padding: 0 15px 15px 15px">
                            <button onclick="max4dModalBtnChonsoSubmit();" type="button" class="btn btn-danger btn-md btn-block">Đồng ý</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal modal-alert fade" id="homeNotificationModal" role="dialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

                    </div>
                    <div class="modal-body">
                        abbdhdjh
                    </div>
                    <!--                    <div class="modal-footer">
                                            <div class="text-center" style="padding: 0 15px 15px 15px">
                                                <button onclick="max4dModalBtnChonsoSubmit();" type="button" class="btn btn-danger btn-md btn-block">Đồng ý</button>
                                            </div>
                                        </div>-->
                </div>
            </div>
        </div>

    </body>
</html>