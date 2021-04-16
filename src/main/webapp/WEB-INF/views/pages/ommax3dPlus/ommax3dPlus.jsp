<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page session="true"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Ôm Max 3D+</title>
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
        <link type=text/css rel=stylesheet href="${pageContext.request.contextPath}/css/ommax3dPlus/ommax3dPlus.css?v=${COMMON_SYSDATE}">

        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery-1.11.0.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/bootstrap/js/bootstrap.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.sumoselect.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/static/js/ui/jquery.i18n.properties.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/moment_vi.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/waitMe.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/checkbox2button.min.js"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/common/common.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/ommax3dPlus/ommax3dPlus.js?v=${COMMON_SYSDATE}"></script>
        <script type=text/javascript src="${pageContext.request.contextPath}/js/basket/basket.js?v=${COMMON_SYSDATE}"></script>

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
                        <div class="ommax3dPlusDivLogo">
                            <div class="luckeybets">
                                <img onclick="window.location.href = '<%=request.getContextPath()%>/home'" style="cursor: pointer" src="${pageContext.request.contextPath}/static/img/common/logo.png" width="auto" height="53px">
                            </div>
                            <div class="ommax3dPlus">
                                <img src="${pageContext.request.contextPath}/static/img/common/logo_max3d_dam.png" width="auto" height="53px">
                            </div>
                        </div>
                    </div>
                    <div class="panel-body" style="position: relative">
                        <div class="ommax3dPlusMuabaoBasket" onclick="ommax3dPlusMuabaoBasketBack();">
                            <img src="${pageContext.request.contextPath}/static/img/common/red-shopping-cart.png" width="30px" height="auto" />
                            <span id="ommax3dPlusMuabaoBasketNumberTotal" class="step-basket">0</span>
                        </div>
                        <div class="form-group">
                            <div class="form-row">
                                <div class="col">
                                    <label for="ommax3dPlusKymua">Kỳ mua</label>
                                    <select onchange="ommax3dPlusSelectKymuaChange();" id="ommax3dPlusKymua" multiple="multiple" placeholder="Chọn kỳ" class="form-control input-sm">                                        
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="ommax3dPlusDongia">Đơn giá</label>
                                    <select onchange="ommax3dPlusFillNumber();" id="ommax3dPlusDongia" class="form-control input-sm">
                                        <option value="1">10.000đ</option>
                                        <option value="2">20.000đ</option>
                                        <option value="5">50.000đ</option>
                                        <option value="10">100.000đ</option>
                                        <option value="20">200.000đ</option>
                                    </select>
                                </div>

                            </div>
                            <div class="form-row" style="margin-top: 10px;" >
                                <div class="col text-center" >
                                    <label> Số tự chọn</label>
                                    <table style="width: 100%">   
                                        <tr>                
                                            <td><span class="keyStc">A</span></td>
                                            <td style="width: auto ;text-align: center" onclick="ommax3dPlusOpenModalNumberStc();">
                                                <span class="step stepStc" style="margin-right: 0" id="ommax3dPlusStc">&nbsp;</span>
                                                <input type="hidden" id="ommax3dPlusStcHid">
                                            </td>                
                                            <td style="text-align: right; vertical-align: top;">                    
                                                <span class="stepStc_btn" id="" onclick="ommax3dPlusBtnOnclickRandomDel();">
                                                    <i class="fa fa-refresh"></i>                    
                                                </span>                
                                            </td>                
                                        </tr>
                                    </table>
                                </div>
                                <div class="col">
                                    <label for="ommax3dPlusDongia">Ôm giải số</label>
                                    <table style="width: 100%">   
                                        <tr style="text-align: center;">                
                                            <!--<td><span class="keyStc">A</span></td>-->
                                            <td style="width: auto" onclick="ommax3dPlusOpenModalNumber();">
                                                <span class="step stepOgs" id="ommax3dPlusOgsFrom" style="">&nbsp;</span>
                                                &#8594;
                                                <span class="step stepOgs" id="ommax3dPlusOgsTo" style=";margin-right: 0" id="">&nbsp;</span>
                                                <input type="hidden" id="ommax3dPlusOgsFromHid">
                                                <input type="hidden" id="ommax3dPlusOgsToHid">

                                            </td>                

                                        </tr>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <div class="form-group" style="margin-bottom: 10px">
                            <div class="ommax3dPlusCircle text-left">
                                <strong>Tạm tính:</strong> <strong style="color: red"><span id="ommax3dPlusCountAllMoney">0</span>đ</strong>
                                <input type="hidden" id="ommax3dPlusCountAllMoneyHid">
                            </div>
                        </div>
                        <div id="ommax3dPlusBodyAllBao"></div>

                        <!--                        <div class="form-group">
                                                    <button type="button" onclick="ommax3dPlusBtnToChonnhanh();" class="btn btn-warning btn-block btn-md">CHỌN NHANH</button>
                                                </div>-->
                        <div>
                            <div class="form-row">
                                <div class="col">
                                    <button type="button" onclick="ommax3dPlusBtnAddBasket();" class="btn btn-primary btn-block btn-md">THÊM VÀO GIỎ</button>
                                </div>
                                <div class="col">
                                    <button type="button" onclick="ommax3dPlusBtnBuyNow();" class="btn btn-danger btn-block btn-md">XEM GIỎ HÀNG</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
            <div class="modal modal-alert fade" id="ommax3dPlusModelNumber" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">
                                <table style="width: 100%" class="text-center">
                                    <tr>
                                        <td> <span id="ommax3dPlusModelNumberRowKey"  style="color: #ffe003; font-weight: bold;">Số bắt đầu</span></td>
                                        <td> <span id="ommax3dPlusModelNumberRowKey" style="color: #ffe003; font-weight: bold;">Số kết thúc</span></td>
                                    </tr>
                                </table>

                                <span id="ommax3dPlusModelNumberMuabaoName"></span>
                            </h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="ommax3dPlusModelKeybaoHidden" value=""/>
                            <div id="ommax3dPlusModelMainBuildNumber" class="ommax3dPlusCircleModal">
                                <div class="form-row">
                                    <div class="col-12" style="width: 100%">
                                        <div id="ommax3dPlusModelMainBuildNumberOtronOgs"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="text-center" style="padding: 0 15px 15px 15px">
                                <p id="ommax3dPlusModalBtnChonsoSubmitNoti" style="color:red"></p>
                                <button onclick="ommax3dPlusModalBtnChonsoSubmit();" type="button" class="btn btn-danger btn-md btn-block">Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal modal-alert fade" id="ommax3dPlusModelNumberStc" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title text-center">
                                <span id="ommax3dPlusModelNumberRowKey"  style="padding-right: 10px; color: #ffe003; font-weight: bold;">Số tự chọn</span>
                                <span id="ommax3dPlusModelNumberMuabaoName"></span>
                            </h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="ommax3dPlusModelKeybaoHidden" value=""/>
                            <div id="ommax3dPlusModelMainBuildNumberStc" class="ommax3dPlusCircleModal">
                                <div class="form-row  text-center">
                                    <div class="col-12" style="width: 50%;margin: auto;">
                                        <div id="ommax3dPlusModelMainBuildNumberOtronStc" ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="text-center" style="padding: 0 15px 15px 15px">
                                <button onclick="ommax3dPlusModalBtnSubmitStc();" type="button" class="btn btn-danger btn-md btn-block">Đồng ý</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>