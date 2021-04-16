<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Keno</title>
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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/common/checkbox2button.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/sumoselect.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/custom.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/static/css/ui/style.default.css">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/common/common.css?v=${COMMON_SYSDATE}">
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/keno/keno.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.sumoselect.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/checkbox2button.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/keno/keno.js?v=${COMMON_SYSDATE}"></script>
        <%--   <script type=text/javascript src="${pageContext.request.contextPath}/js/basket/basket.js?v=${COMMON_SYSDATE}"></script> --%>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/jQuery.countdownTimer.js"></script>

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
        <div class="container">
            <div class="panel-group">
                <div class="panel panel-danger">
                    <div class="panel-heading">
                        <div class="kenoDivLogo">
                            <div class="luckeybets">
                                <img onclick="window.location.href = '<%=request.getContextPath()%>/home'" style="cursor: pointer" src="${pageContext.request.contextPath}/static/img/common/logo.png" width="auto" height="53px">
                            </div>
                            <div class="keno">
                                <img src="${pageContext.request.contextPath}/static/img/common/keno_logo1.png" width="auto" height="53px">
                            </div>
                        </div>
                    </div>
                    <div class="panel-body" style="position: relative">
                        
                        <%-- <div class="kenoMuabaoBasket" onclick="kenoMuabaoBasketBack();">
                             <img src="${pageContext.request.contextPath}/static/img/common/red-shopping-cart.png" width="30px" height="auto" />
                                  <span id="kenoMuabaoBasketNumberTotal" class="step-basket">0</span> 
                        </div>--%>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col">
                                    <label for="kenoMuabao" >Loại hình</label>
                                    <select style="font-size: 12.5px;" onchange="kenoSelectBao(this.value);" id="kenoMuabao" class="form-control input-sm" >
                                        <option value="2"selected>Bậc 2</option>
                                        <option value="11">Lớn Nhỏ-Chẵn Lẻ</option>   
                                        <option value="1">Bậc 1</option>
                                        <option value="3">Bậc 3</option>
                                        <option value="4">Bậc 4</option>
                                        <option value="5">Bậc 5</option>
                                        <option value="6">Bậc 6</option>
                                        <option value="7">Bậc 7</option>
                                        <option value="8">Bậc 8</option>
                                        <option value="9">Bậc 9</option>
                                        <option value="10">Bậc 10</option>                                                                              
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="kenoKymua">Kỳ quay</label>
                                    <select style="font-size: 12.5px;" onchange="kenoSelectKymuaChange();" id="kenoKymua" <%--multiple="multiple" placeholder="Chọn kỳ"--%> class="form-control input-sm"
                                    >                                        
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="kenoBodyAllBao"></div>
                        <div class="form-group">
                            <div class="kenoCircle text-right">
                                <strong>Tạm tính:</strong> <strong style="color: red"><span id="kenoCountAllMoney">0</span>đ</strong>
                            </div>
                        </div>
                         <div id="kenoBtnMuaNhanh"></div>
                        <!--div class="form-group">
                            <button type="button" onclick="kenoBtnToChonnhanh();" class="btn btn-warning btn-block btn-md">CHỌN NHANH</button>
                        </div-->
                        <div>
                            <div class="form-row">
                                <%--  <div class="col">
                                    <button type="button" onclick="kenoBtnAddBasket();" class="btn btn-primary btn-block btn-md">THÊM VÀO GIỎ</button>
                                </div> --%>
                                <div class="col">
                                    <button type="button" onclick="kenoBtnBuyNow();" class="btn btn-danger btn-block btn-md">MUA NHANH <p style="margin: 0.05px;font-size: 10px;">Thời gian mua còn lại của kỳ <span id="TextKenoDrawCode"></span> :<span id="TextKenoCountDown"></span></p></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
            <div class="modal modal-alert fade" id="kenoModelNumber" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" >
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">
                                <span id="kenoModelNumberRowKey" style="padding-right: 10px; color: #ffe003; font-weight: bold;"></span>
                                <span id="kenoModelNumberMuabaoName"></span>
                            </h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="kenoModelKeybaoHidden" value=""/>
                            <div id="kenoModelMainBuildNumber" class="kenoCircleModal">
                                <div class="form-row">
                                    <div class="kenoCircleModal" style="width:80%">
                                        <div id="kenoModelMainBuildNumberOtron"></div>
                                    </div>
                                    <div class="col">
                                        <div class="form-row text-right">
                                            <div class="col">
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="kenoBuildBodyMainChonSoClickMoneyBtn_1" onclick="kenoBuildBodyMainChonSoClickMoneyBtn(this);" style="width:100%" type="button" class="kenoModelNumberRadioMoney btn btn-default btn-sm">10K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="kenoBuildBodyMainChonSoClickMoneyBtn_2" onclick="kenoBuildBodyMainChonSoClickMoneyBtn(this);" style="width:100%" type="button" class="kenoModelNumberRadioMoney btn btn-default btn-sm">20K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="kenoBuildBodyMainChonSoClickMoneyBtn_5" onclick="kenoBuildBodyMainChonSoClickMoneyBtn(this);" style="width:100%" type="button" class="kenoModelNumberRadioMoney btn btn-default btn-sm">50K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="kenoBuildBodyMainChonSoClickMoneyBtn_10" onclick="kenoBuildBodyMainChonSoClickMoneyBtn(this);" style="width:100%" type="button" class="kenoModelNumberRadioMoney btn btn-default btn-sm">100K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="kenoBuildBodyMainChonSoClickMoneyBtn_20" onclick="kenoBuildBodyMainChonSoClickMoneyBtn(this);" style="width:100%" type="button" class="kenoModelNumberRadioMoney btn btn-default btn-sm">200K</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button id="kenoBuildBodyMainChonSoClickMoneyBtn_50" onclick="kenoBuildBodyMainChonSoClickMoneyBtn(this);" style="width:100%" type="button" class="kenoModelNumberRadioMoney btn btn-default btn-sm">500K</button>
                                                </div>
                                                <br>
                                                <div class="form-group" style="margin-bottom: 10px">
                                                    <button onclick="kenoBtnOnclickRandomModalAll();" style="width:100%" type="button" class="btn btn-warning btn-sm">TC</button>
                                                </div>
                                                <div class="form-group" style="margin-bottom: 0">
                                                    <button onclick="kenoBtnOnclickRandomModalDel();" style="width:100%" type="button" class="btn btn-warning btn-sm">Hủy</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="text-center" style="padding: 0 15px 15px 15px">
                                <button onclick="kenoModalBtnChonsoSubmit();" type="button" class="btn btn-danger btn-md btn-block">Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>