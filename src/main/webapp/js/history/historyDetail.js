$(document).ready(function () {
    getResource(detailInit);
});

function detailInit() {
    var urlId = commonGetParameterByName("id");
    var urlIdMask = commonGetParameterByName("idMask");
    var kenoType = commonGetParameterByName("keno");
    if (commonIsEmpty(urlId) != "") {
        var urlType = commonGetParameterByName("type");
        if (urlType == 0) {
            detailGetDataWaiting(urlId,kenoType);
        } else if (urlType == 1) {
            detailGetDataBuyDone(urlId,kenoType);
        } else if (urlType == 2) {
            detailGetDataBuyCancel(urlId,kenoType);
        }
    }
    $("#historyDetailNameTicket").text("Đơn " + urlIdMask);
}

function detailBackHis() {
    var urlType = commonGetParameterByName("type");
    var kenoType = commonGetParameterByName("keno");
    if(kenoType==0){
    window.location.href = requestUrl + "/history?type=" + urlType;
    } else if (kenoType==1){
    window.location.href = requestUrl + "/history_keno?type=" + urlType;
    }
}

function detailGetDataWaiting(urlId,kenoType) {
//    var kenoType = commonGetParameterByName("keno");
    if(kenoType==0){
        var urlInfo = "/action/history/getHistoryWaiting";
        var obj = {};

        commonRunWaitMe($(".noselect-body"));
        commonAjaxJson(urlInfo, obj, function (xhr, status) {
            commonStopWaitMe($(".noselect-body"));

            var dataAll = new Array();

            var result = null;
            if (status == 'success') {
                result = xhr.responseJSON;
            }

            if (result != null) {
                dataAll = result.data;

                var objOne = dataAll.filter(obj => {
                        return obj.orderIdInfo.orderId == urlId;
                    })
                ;

                if (objOne != null && objOne.length == 1) {
                    //    console.log(objOne[0]);
                    detailGetDataByGet(objOne[0]);
                }
            }
        });
    } else if (kenoType==1){
        var urlInfo = "/action/common/getDataKenoByOrderId";
        var obj = {
            orderId: urlId + ""
        };

        commonRunWaitMe($(".noselect-body"));
        commonAjaxJson(urlInfo, obj, function (xhr, status) {
            commonStopWaitMe($(".noselect-body"));

            var result = null;
            if (status == 'success') {
                result = xhr.responseJSON;
            }

            if (result != null) {
                var objInfo = result.object;
                //   console.log(result);
                if (objInfo != null && objInfo != "" && objInfo != undefined) {
                    detailGetDataByGet(objInfo);
                }
            }
        });
    }
}

function detailGetDataBuyDone(urlId,kenoType) {
  //  var kenoType = commonGetParameterByName("keno");
    if(kenoType==0){
    var urlInfo = "/action/common/getDataVietlottByOrderId";
    } else if (kenoType==1){
        var urlInfo = "/action/common/getDataKenoByOrderId";
    }
    var obj = {
        orderId: urlId + ""
    }
    commonRunWaitMe($(".noselect-body"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".noselect-body"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

        if (result != null) {
            var objInfo = result.object;
            //   console.log(result);
            if (objInfo != null && objInfo != "" && objInfo != undefined) {
                detailGetDataByGet(objInfo);
            }
        }
    });
}

function detailGetDataBuyCancel(urlId,kenoType) {
 //   var kenoType = commonGetParameterByName("keno");
    if(kenoType==0){
        var urlInfo = "/action/common/getDataVietlottByOrderId";
    } else if (kenoType==1){
        var urlInfo = "/action/common/getDataKenoByOrderId";
    }
    var obj = {
        orderId: urlId + ""
    };

    commonRunWaitMe($(".noselect-body"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".noselect-body"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

        if (result != null) {
            var objInfo = result.object;
            console.log(result);
            if (objInfo != null && objInfo != "" && objInfo != undefined) {
                //console.log(objInfo);
                detailGetDataByGet(objInfo);
            }
        }
    });
}

function detailGetDataByGet(objOne) {
    if (objOne != null) {
        var infoUser = objOne.receiverInfo;
        var paperTicketInfos = objOne.paperTicketInfos;
        var agentInfo = objOne.agentInfo;
        var deliveryType = objOne.deliveryType;
        var orderStatus = objOne.orderStatus;
        var orderIdInfo = objOne.orderIdInfo;
        var orderTime = objOne.orderTime;
        var totalMoney = objOne.totalMoney;

        // $("#detailOrderIdMark").text("#" + orderIdInfo.orderIdMask);
        $("#detailTimeOrder").text("Giờ đặt: " + orderTime);
        $("#detailOrderMoneyTotal").text(common_format_number(totalMoney + "", "") + "đ");

        $("#detailFullname").html(commonHtmlEntities(infoUser.name));
        $("#detailAddress").html(commonHtmlEntities(infoUser.address));
        $("#detailPhoneNumber").text(infoUser.phone);

        if (deliveryType == 2) {
            $("#detailAddressTextLabel").text("CMND/CCCD");
            $("#detailAddress").html(commonHtmlEntities(infoUser.cmnd));
        }

        if (agentInfo != null) {
            $("#detailShopOnelineBuy").show();
            $("#detailUserOnlineName").html(commonHtmlEntities(agentInfo.name));
            $("#detailUserOnlinePhone").text(agentInfo.phone);
            $("#detailUserOnlineAddress").html(commonHtmlEntities(agentInfo.address));
        } else {
            $("#detailShopOnelineBuy").hide();
        }

        historyBuildSlideImage(orderStatus, paperTicketInfos);
    }
}

function historyBuildSlideImage(orderStatus, lAll) {
    var html = '';

    if (lAll == null || lAll.length == 0) {
        return html;
    }

    // html += '<div id="detailMyCarousel" class="carousel slide" data-ride="carousel">' +
    //         '  <ol class="carousel-indicators">';
    //
    // for (var k = 0; k < lAll.length; k++) {
    //     if (k == 0) {
    //         html += '	    <li data-target="#detailMyCarousel" data-slide-to="' + k + '" class="active"></li>';
    //     } else {
    //         html += '	    <li data-target="#detailMyCarousel" data-slide-to="' + k + '"></li>';
    //     }
    // }
    //
    // html += '  </ol>' +
    //         '  <div class="carousel-inner">';
    for (var n = 0; n < lAll.length; n++) {
        var itemActive = "";
        if (n == 0) {
            itemActive = "active";
        }

        var objTickerOne = lAll[n];

        var paperTicketPictureInfos = objTickerOne.paperTicketPictureInfos;
        var drawInfo = objTickerOne.drawInfo;
        var status = objTickerOne.status;
        var paperTicketId = objTickerOne.paperTicketId;
        var category = objTickerOne.category;

        // var totalMoney = objTickerOne.totalMoney;


        html += '    <div class="item ' + itemActive + '">' +
            detailBuildBtnNotiErrorImageTicker(orderStatus, drawInfo, paperTicketId, status, category) +
            detailBuildInfoTicker(objTickerOne) +
            detailBuildInfoImageTicker(paperTicketPictureInfos, (n + 1), objTickerOne) +
            '    </div>' +
            '    </div>' +
            '    </div>' +
            '    </div>';
    }

    // html += '  </div>'
    // '  <a class="left carousel-control" href="#detailMyCarousel" data-slide="prev">' +
    // '    <span class="glyphicon glyphicon-chevron-left"></span>' +
    // '    <span class="sr-only">Previous</span>' +
    // '  </a>' +
    // '  <a class="right carousel-control" href="#detailMyCarousel" data-slide="next">' +
    // '    <span class="glyphicon glyphicon-chevron-right"></span>' +
    // '    <span class="sr-only">Next</span>' +
    // '  </a>' +
    // '</div>'
    ;

    $("#detailBodyBuildHtml").html(html);
}

function detailBuildInfoImageTicker(paperTicketPictureInfos, numberCountVe, objTickerOne) {
    let totalMoney = objTickerOne.totalMoney;
    let category = objTickerOne.category;
    var kenoType = commonGetParameterByName("keno");
    var html = '';
    if (paperTicketPictureInfos != null && paperTicketPictureInfos.length >= 1) {
        if(kenoType==0) {
        html += '   <div class="form-group" style="margin: 5px 0px 0px 0; box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;padding: 4px 0 0;">   ' +
            '       <div class="form-row" >' +
            '            <div class="col" style="padding-right: 1px">' +
            '                <div class="image">' +
            '                    <img onclick="detailClickImageViewModal(this.src);" class="object-fit_cover" src="' + paperTicketPictureInfos[0].pictureUrl + '" width="100%" height="160px" />' +
            // '                    <img onclick="detailClickImageViewModal(this.src);" class="object-fit_cover" src="http://localhost:8081/mom/static/img/common/img-not-found.png" width="100%" height="160px" />' +
            '             ' +
            '                   </div>' +
            '            </div>' +
            '            <div class="col" style="padding-left: 1px">' +
            '                <div class="image">' +
            '                    <img onclick="detailClickImageViewModal(this.src);" class="object-fit_cover" src="' + paperTicketPictureInfos[1].pictureUrl + '" width="100%" height="160px" />' +
            // '                    <img onclick="detailClickImageViewModal(this.src);" class="object-fit_cover" src="http://localhost:8081/mom/static/img/common/img-not-found.png" width="100%" height="160px" />' +
            '                </div>' +
            '            </div>' +
            '       </div>' +
            '       </div>' +
            '       <div class="form-group" style="margin-top: 3px;padding: 5px 3px;box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;">' +
            '           <strong style="margin: 0 0 0 5px;"># ' + numberCountVe + ': <span style="color: red">' + common_format_number(totalMoney + "", "") + 'đ</span></strong>' ;
            } else if (kenoType==1){
        html += '   <div class="form-group" style="margin: 5px 0px 0px 0; box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;padding: 4px 0 0;">   ' +
            '       <div class="form-row" >' +
            '            <div class="col" style="padding-right: 1px">' +
            '                <div class="image">' +
            '                    <img onclick="detailClickImageViewModal(this.src);" class="object-fit_cover" src="' + paperTicketPictureInfos[0].pictureUrl + '" width="100%" height="160px" />' +
            // '                    <img onclick="detailClickImageViewModal(this.src);" class="object-fit_cover" src="http://localhost:8081/mom/static/img/common/img-not-found.png" width="100%" height="160px" />' +
            '             ' +
            '                   </div>' +
            '            </div>' +
            '<div class="col" style="padding-left: 1px">' +
            '                <div class="image">' +
            '                    <img onclick="detailClickImageViewModal(this.src);" class="object-fit_cover" src="' + paperTicketPictureInfos[0].pictureUrl + '" width="100%" height="160px" />' +
            // '                    <img onclick="detailClickImageViewModal(this.src);" class="object-fit_cover" src="http://localhost:8081/mom/static/img/common/img-not-found.png" width="100%" height="160px" />' +
            '                </div>' +
            '            </div>' +
            '       </div>' +
            '       </div>' +
            '       <div class="form-group" style="margin-top: 3px;padding: 5px 3px;box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;">' +
            '           <strong style="margin: 0 0 0 5px;"># ' + numberCountVe + ': <span style="color: red">' + common_format_number(totalMoney + "", "") + 'đ</span></strong>' ;        
            }
            if (category == 11 || category == 12 || category == 13) {
            } else {
                html += detailBuildButtonAndText(objTickerOne);
            }
        html+=
            '   </div>';


    }

    return html;
}

function detailBuildBtnNotiErrorImageTicker(orderStatus, drawInfo, paperTicketId, status, category) {
    var html = '';

    if (category != 11 && category != 12 && category != 13) {
        if (orderStatus == 3 || orderStatus == 30 ||orderStatus == 4 || orderStatus == 41) {
            if (status == 1) {
                var dateOpenQuay = moment(drawInfo.openDate, 'DD/MM/YYYY h:mm:ss').format('DD/MM/YYYY');
                var dateToday = moment().format('DD/MM/YYYY');
                var dateTimeToday = moment().format('h:mm');

                var frDateOpenQuay = moment(dateOpenQuay, 'DD/MM/YYYY');
                var frDateToday = moment(dateToday, 'DD/MM/YYYY');
                var isAfterOrSame = frDateOpenQuay.isSameOrAfter(frDateToday);

                if (isAfterOrSame) {
                    var frBeginningTime = moment(dateTimeToday, 'h:mm');
                    var frEndTime = moment('16:00', 'h:mm');
                    var flagDaQuay = frBeginningTime.isBefore(frEndTime);

                    if (flagDaQuay) {
                        html = '        <div class="text-center" style="padding-top: 8px;">' +
                            '                <button onclick="detailSubmitTickerErrReportBtnOpen(\'' + paperTicketId + '\');" type="button" class="btn btn-xs btn-warning">Báo khi lỗi vé</button>' +
                            '        </div>';
                    }
                }
            } else {
                html = '        <div class="text-center" style="padding-top: 8px;">' +
                    '                <button type="button" class="btn btn-xs btn-danger disabled">Đã báo lỗi</button>' +
                    '        </div>';
            }
        }
    }

    return html;
}

function detailBuildInfoTicker(objTickerOne) {
    var html = '';
    //   console.log(objTickerOne);
    var drawInfo = objTickerOne.drawInfo;
    var category = objTickerOne.category;
    var numberInfoV2s = objTickerOne.numberInfoV2s;
    var numberInfos = objTickerOne.numberInfos;
    var group = objTickerOne.group;
    var blacklistInfos = objTickerOne.blacklistInfos;

    var titleTenbao = "Thường";
    var textCachchoi = "Thường";
    if (category == 2) {
        if (group == 2) {
            titleTenbao = "Tổ hợp";
        } else if (group == 3) {
            titleTenbao = "Bao";
        } else if (group == 4) {
            titleTenbao = "Cuộn 1";
        } else if (group == 5) {
            titleTenbao = "Cuộn 4";
        }
    } else if (category == 4) {
        if (group == 2) {
            titleTenbao = "Tổ hợp";
        } else if (group == 3) {
            titleTenbao = "Bao";
        } else if (group == 4) {
            titleTenbao = "Cuộn 1";
        } else if (group == 5) {
            titleTenbao = "Cuộn 3";
        }
    } else if (category == 5) {
        if (group == 1 || group == 6) {
            titleTenbao = "Max3D+";
        } else if (group == 2) {
            titleTenbao = "Max3D+ Tổ hợp";
        } else if (group == 3) {
            titleTenbao = "Max3D+ Bao";
        } else if (group == 4) {
            titleTenbao = "Max3D+ Cuộn 1";
        } else if (group == 5) {
            titleTenbao = "Max3D+ Cuộn 3";
        }
    } else if (category == 15) {
        titleTenbao = "Ôm Max3D+";
    } else if (category == 1 || category == 3) {
        if (group != 0 && group != 6) {
            titleTenbao = "Bao " + group;
        }
    } else if (category == 13) {
        titleTenbao = "GIỎ LÌ XÌ POWER 6/55";
    } else if (category == 12) {
        titleTenbao = "GIỎ LÌ XÌ MAX 4D";
        if (group == 2) {
            textCachchoi = "Tổ hợp";
        }
    } else if (category == 11) {
        titleTenbao = "GIỎ LÌ XÌ MEGA 6/45";
    } else if (category == 6) { //Keno
        if (group <= 10) {
            titleTenbao = "Keno - Bậc " + group;
            textCachchoi = "Bậc " + group;
        } else if (group == 11) {
            titleTenbao = "Keno - Lớn Nhỏ - Chẵn Lẻ";
            textCachchoi = "Lớn Nhỏ - Chẵn Lẻ";
        }
    }

    html += '<div class="form-group" style="padding: 0px 0px 0 0px; margin-bottom: 0">' +
        '     <div id="detailBodyDataAllBao">' +
        '         <div class="form-group">   ' +
        '             <div class="detail-group-baobao">  ' +
        '                 <img src="' + detailBuildLogoTicker(category) + '" width="auto" height="45px">            ' +
        '                 <div class="form-group text-center"> ' +
        '                     <p style="padding-top: 10px"></p><h4><strong>' + titleTenbao + '</strong></h4><p></p>  ' +
        '                 </div>' +
        '                 <div id="power655CircleOrderBao6A" class="detailCircle">' +
        '                     <table style="width: 100%">' +
        '                         <tbody>';


    if (category == 11 || category == 12 || category == 13) {
        html += detailBuildNumberCheckedBulk(numberInfoV2s, numberInfos, textCachchoi);
    } else {
        html += detailBuildNumberChecked(numberInfoV2s, numberInfos, category, group);
    }
    html += historyDetailGenBlackList(category, blacklistInfos);
    html += '                         </tbody>' +
        '                     </table>' +
        '                 </div><br>';

    html += '                 <div class="form-row basket-font-size-ky">' +
        '                       <div class="col-sm-5">' +
        '                           <p><strong>Kỳ:</strong> #' + drawInfo.drawId + '</p>' +
        '                       </div>' +
        '                       <div class="col">' +
        '                           <p><strong>Ngày:</strong> ' + moment(drawInfo.openDate, 'DD/MM/YYYY').locale('vi').format('llll') + '</p>' +
        '                       </div>' +
        '                 </div>';


    html += '             </div>';
    // '         </div>' ;
    // '     </div>' ;
    // ' </div>';

    return html;
}

function historyDetailGenBlackList(category, blacklistInfos) {
    var html = ''
    if (category == 15 && commonIsEmpty(blacklistInfos) != "") {
        html += '<table ><tr style="font-weight: bold;"><text  style="font-weight: bold;">Bộ số đã hết trong giải số ÔM: </text></tr>';
        for (var i = 0; i < blacklistInfos.length; i++) {
            var numbers = blacklistInfos[i].numbers;
            var priceUnit = blacklistInfos[i].priceUnit;
            var imageUrl = blacklistInfos[i].imageUrl;
            html += '<tr class="blackListRow"><td style="font-weight: bold;width: 5%;" class="">' + (i + 1) + '.</td>' +
                '<td style="font-weight: bold;width: 10%;">' +
                commonFormatNumberOmMax3D(numbers[0] + '') + '</td><td style="font-weight: bold;width: 10%;">' +
                commonFormatNumberOmMax3D(numbers[1] + '') + '</td><td style="font-weight: bold;width: 10%;"><text style="color:red;font-weight: initial ">' + commonFormatNumber(Number(priceUnit) * 10000) + 'đ</text></td>' +
                '<td style="font-weight: bold;width: 10%;"> <i class="fa fa-image" onclick="historyDetailShowBlackListImg(\'' + imageUrl + '\','
                + commonFormatNumberOmMax3D(numbers[0] + '') + ','
                + commonFormatNumberOmMax3D(numbers[1] + '') + ')" style="font-size:20px;color:red"></i></td></tr>';
        }

        html += '</table>';

    }
    return html;
}

function historyDetailShowBlackListImg(url, num1, num2) {
//    var url=blacklistInfos[i].imageUrl;
    var html = "";
    var listImg = url.split(",");
    $("#historyDetailModalBlackListImg").modal("show");
    html += '<table><tr>'
    for (var i = 0; i < listImg.length; i++) {
        html += '<td style="padding: 5px;"><img class="img-responsive" src="' + listImg[i] + '"></td>';
    }
    html += '</table></tr>';
    html += '<span>Bộ số không tính thưởng:</span><br>' +
        '<span>' + commonFormatNumberOmMax3D(num1 + '') + ' &nbsp;&nbsp;&nbsp;' + commonFormatNumberOmMax3D(num2 + '') + '</span>'
    $("#historyDetailModalBlackListImgBody").html(html);

}

function detailBuildNumberChecked(numberInfoV2s, numberInfos, category, group) {
    var html = '';

    if (numberInfoV2s != null && numberInfoV2s != "" && numberInfoV2s.length > 0) {
        //   console.log(category);

        for (var ck = 0; ck < numberInfoV2s.length; ck++) {
            //   console.log(numberInfoV2s);
            var dataVal = numberInfoV2s[ck].numbers;
            var priceUnit = numberInfoV2s[ck].priceUnit;

            html += '                             <tr>' +
                '                                 <td style="width: 10%; padding-bottom: 8px;">' +
                '                                     <span class="key">' + commonBuildABCAll(ck) + '</span>   ' +
                '                                 </td>' +
                '                                 <td style="max-width: 70%; padding-bottom: 10px;"> ';

            for (var ckc = 0; ckc < dataVal.length; ckc++) {

                var oneNumber = dataVal[ckc].number;

                var colorVal = dataVal[ckc].status;
                //   console.log('test: '+ dataVal[ckc].number);
                oneNumber = commonAllBuildNumberView(category, group, oneNumber);

                var styleNumber = '';
                if (colorVal != 0) {
                    styleNumber = 'style="color: red"';
                }
                if (category == 15 && ckc == 1) {

                    html += '                                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="step"  ' + styleNumber + '>' + oneNumber + '</span>';
                    html += '                                           <span class="step" style="margin-right: 0px;"' + '> &#8764; </span>';
                } else if (category == 6) { //Keno
                    if (group <= 10) {
                        html += '                                    <span class="step" ' + styleNumber + '>' + oneNumber + '</span>';
                    } else if (group == 11) {
                        if (dataVal[ckc].number == 3) {
                            html += '                                <span class="step" ' + styleNumber + '>Lớn</span>';
                        } else if (dataVal[ckc].number == 4) {
                            html += '                                <span class="step" ' + styleNumber + '>Nhỏ</span>';
                        } else if (dataVal[ckc].number == 1) {
                            html += '                                <span class="step" ' + styleNumber + '>Chẵn</span>';
                        } else if (dataVal[ckc].number == 2) {
                            html += '                                <span class="step" ' + styleNumber + '>Lẻ</span>';
                        }
                    }
                } else {
                    html += '                                           <span class="step" ' + styleNumber + '>' + oneNumber + '</span>';
                }
            }

            html += '                                 </td>'
//                    +historyDetailGenBlackList(category)
            ;

            var textCountNhanType = '';

            textCountNhanType += commonMax4DBuildToHopByGroup(category, group, dataVal[0].number);
            textCountNhanType += commonMax3DBuildToHopByGroup(category, group, dataVal[0].number);
            textCountNhanType += commonMax3DPlusBuildToHopByGroup(category, group, dataVal, 1);

            html += '<td class="abcd" style="padding-bottom: 10px; color: orange">' + textCountNhanType + '</td>';

            html += commonMax4DBuildMoney(category, priceUnit);
            html += commonMax3DBuildMoney(category, priceUnit);
            html += commonMax3DPlusBuildMoney(category, priceUnit);
            html += commonKenoBuildMoney(category, priceUnit);

            html += '                             </tr>';
        }
    } else {
        // console.log(category);
        for (var ck = 0; ck < numberInfos.length; ck++) {
            var dataVal = numberInfos[ck].numbers;
            var priceUnit = numberInfos[ck].priceUnit;

            html += '                             <tr>' +
                '                                 <td style="width: 10%; padding-bottom: 8px;">' +
                '                                     <span class="key">' + commonBuildABCAll(ck) + '</span>   ' +
                '                                 </td>' +
                '                                 <td style="max-width: 70%; padding-bottom: 10px;"> ';

            for (var ckc = 0; ckc < dataVal.length; ckc++) {
                //  console.log('group:' + group);
                //  console.log('test: '+ dataVal[ckc]);
                var oneNumber = dataVal[ckc];
                oneNumber = commonAllBuildNumberView(category, group, oneNumber);
                if (category == 15 && ckc == 1) {

                    html += '                                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="step"  ' + styleNumber + '>' + oneNumber + '</span>';
                    html += '                                           <span class="step" style="margin-right: 0px;"' + styleNumber + '> &#8764; </span>';
                } else if (category == 6) {
                    if (group <= 10) {
                        html += '                                    <span class="step">' + oneNumber + '</span>';
                    } else if (group == 11) {
                        if (dataVal[ckc] == 3) {
                            html += '                                <span class="step">Lớn</span>';
                        } else if (dataVal[ckc] == 4) {
                            html += '                                <span class="step">Nhỏ</span>';
                        } else if (dataVal[ckc] == 1) {
                            html += '                                <span class="step">Chẵn</span>';
                        } else if (dataVal[ckc] == 2) {
                            html += '                                <span class="step">Lẻ</span>';
                        }
                    }
                } else {
                    html += '                                           <span class="step">' + oneNumber + '</span>';
                }
            }
            html += '                                 </td>';

            var textCountNhanTypeV1 = '';
            textCountNhanTypeV1 += commonMax4DBuildToHopByGroup(category, group, dataVal[0]);
            textCountNhanTypeV1 += commonMax3DBuildToHopByGroup(category, group, dataVal[0]);
            textCountNhanTypeV1 += commonMax3DPlusBuildToHopByGroup(category, group, dataVal, 2);

            html += '<td style="padding-bottom: 10px; color: orange">' + textCountNhanTypeV1 + '</td>';

            html += commonMax4DBuildMoney(category, priceUnit);
            html += commonMax3DBuildMoney(category, priceUnit);
            html += commonMax3DPlusBuildMoney(category, priceUnit);
            html += commonKenoBuildMoney(category, priceUnit);
            html += '                             </tr>';
        }
    }

    return html;
}

function detailBuildNumberCheckedBulk(numberInfoV2s, numberInfos, textCachchoi) {
    var html = '';

    if (numberInfoV2s != null && numberInfoV2s != "" && numberInfoV2s.length > 0) {
        for (var ck = 0; ck < numberInfoV2s.length; ck++) {
            var dataVal = numberInfoV2s[ck].numbers;
            var priceUnit = numberInfoV2s[ck].priceUnit;

            var sove1kyquay = dataVal[0].number;
            var soboso1ve = dataVal[1].number;

            html += '                       <tr>' +
                '                           <td style="width: 100%">' +
                '                               <p>Cách chơi: <strong>' + textCachchoi + '</strong></p>' +
                '                               <p>Số vé/1 kỳ quay: <strong>' + sove1kyquay + ' vé</strong></p>' +
                '                               <p>Số bộ số/1 vé: <strong>' + soboso1ve + '  bộ số</strong></p>' +
                '                               <p>Giá tiền 1 bộ số: <strong>' + common_format_number((priceUnit * 10000) + "", "") + 'đ</strong></p>' +
                '                           </td>' +
                '                       </tr>';
        }
    } else {
        for (var ck = 0; ck < numberInfos.length; ck++) {
            var dataVal = numberInfos[ck].numbers;
            var priceUnit = numberInfos[ck].priceUnit;

            var sove1kyquay = dataVal[0];
            var soboso1ve = dataVal[0];

            html += '                       <tr>' +
                '                           <td style="width: 100%">' +
                '                               <p>Cách chơi: <strong>' + textCachchoi + '</strong></p>' +
                '                               <p>Số vé/1 kỳ quay: <strong>' + sove1kyquay + ' vé</strong></p>' +
                '                               <p>Số bộ số/1 vé: <strong>' + soboso1ve + '  bộ số</strong></p>' +
                '                               <p>Giá tiền 1 bộ số: <strong>' + common_format_number((priceUnit * 10000) + "", "") + 'đ</strong></p>' +
                '                           </td>' +
                '                       </tr>';
        }
    }

    return html;
}

function detailBuildLogoTicker(key) {
    var html = '';

    if (key == 3) {
        html = requestUrl + "/static/img/common/power655_logo.png";
    } else if (key == 1) {
        html = requestUrl + "/static/img/common/mega645_logo.png";
    } else if (key == 2) {
        html = requestUrl + "/static/img/common/max4d_logo.png";
    } else if (key == 4) {
        html = requestUrl + "/static/img/common/max3d_logo.png";
    } else if (key == 5) {
        html = requestUrl + "/static/img/common/max3dPlus_logo.png";
    } else if (key == 15) {
        html = requestUrl + "/static/img/common/logo_max3d_dam.png";
    } else if (key == 11 || key == 12 || key == 13) {
        html = requestUrl + "/static/img/common/bulk_logo.png";
    } else if (key == 6) {
        html = requestUrl + "/static/img/common/logo_keno_dam.png";
    }

    return html;
}

function detailClickImageViewModal(link) {
    var html = '<img src="' + link + '" width="100%" height="auto" />   <div id="power655CircleOrderBao6AOnImg" class="detailCircle"></div> ';
    $("#detailModalViewImageBody").html(html);
    $("#detailModalViewImageBody").attr("style","min-width: 300px; min-height: 300px;");
    $("#power655CircleOrderBao6AOnImg").html($("#power655CircleOrderBao6A").html());
    $("#power655CircleOrderBao6AOnImg").attr("style","position: fixed;    width: 89%; bottom: 62px;");

    $("#detailModalViewImage").modal("show");

}

function detailViewWinText(data) {
    var html = "<span style='color: red; '>&nbsp;</span>";

    var numberInfoV2s = data.numberInfoV2s;
    if (Array.isArray(numberInfoV2s)) {
        for (var kk = 0; kk < numberInfoV2s.length; kk++) {
            var status = numberInfoV2s[kk].status;
            if (status == 1) {
                if (data.statusPrize == 0) {
                    html = "<span style='color: red;  font-size: 12px'>Chưa trả thưởng</span>";
                } else if (data.statusPrize == 1) {
                    html = "<span style='color: orange;  font-size: 12px'>Đang trả thưởng</span>";
                } else if (data.statusPrize == 2) {
                    html = "<span style='color: green;  font-size: 12px'>Đã trả thưởng</span>";
                }

                return html;
            }
        }
    }

    return html;
}

function detailViewButtonIcon(data) {
    var count = 0;

    var numberInfoV2s = data.numberInfoV2s;
    if (Array.isArray(numberInfoV2s)) {
        for (var kk = 0; kk < numberInfoV2s.length; kk++) {
            var status = numberInfoV2s[kk].status;
            if (status == 1) {
                return 1;
            }
        }
    }

    return count;
}

function detailBuildButtonAndText(objTickerOne) {
    var html = '';

    var historyTabEventClick = commonGetParameterByName("type");
    if (historyTabEventClick == 1) {
        var orderId = commonGetParameterByName("id");
        var category = objTickerOne.category;
        var drawInfo = objTickerOne.drawInfo;
        var paperTicketId = objTickerOne.paperTicketId;

        var dateOpenQuay = moment(drawInfo.openDate, 'DD/MM/YYYY h:mm:ss').format('DD/MM/YYYY');
        var dateToday = moment().format('DD/MM/YYYY');
        var dateTimeToday = moment().format('h:mm');

        var frDateOpenQuay = moment(dateOpenQuay, 'DD/MM/YYYY');
        var frDateToday = moment(dateToday, 'DD/MM/YYYY');
        var isAfterOrSame = frDateOpenQuay.isSameOrAfter(frDateToday);

        if (category == 6) {
            var htmlButton = '<button style="float: right; margin: -3px 5px 0px 0px;" onclick="detailBuildButtonOpenLinkRs(\'' + orderId + '\',\'' + historyTabEventClick + '\',\'' + category + '\',\'' + drawInfo.drawId + '\',\'' + paperTicketId + '\');" type="button" class="btn btn-xs btn-info"> So kết quả</button>';
            var htmlTextAlarm = '';

            var statusWin = detailViewButtonIcon(objTickerOne);
            if (statusWin == 1) {
                htmlButton = '<button style="float: right; margin: -3px 5px 0px 0px;" onclick="detailBuildButtonOpenLinkRs(\'' + orderId + '\',\'' + historyTabEventClick + '\',\'' + category + '\',\'' + drawInfo.drawId + '\',\'' + paperTicketId + '\');"' +
                    ' type="button" class="btn btn-xs btn-danger"><i style="color: violet;" class="fa fa-trophy"></i> Trúng thưởng </button>';
                htmlTextAlarm = '<div style="float: right;">' + detailViewWinText(objTickerOne) + ' </div>';
            }

            html += '' + htmlButton + htmlTextAlarm + '';
        } else {
            if (isAfterOrSame) {
                var frBeginningTime = moment(dateTimeToday, 'h:mm');
                var frEndTime = moment('18:19', 'h:mm');
                var flagDaQuay = frBeginningTime.isAfter(frEndTime);

                if (flagDaQuay) {
                    var htmlButton = '<button style="float: right; margin: -3px 5px 0px 0px;" onclick="detailBuildButtonOpenLinkRs(\'' + orderId + '\',\'' + historyTabEventClick + '\',\'' + category + '\',\'' + drawInfo.drawId + '\',\'' + paperTicketId + '\');" type="button" class="btn btn-xs btn-info"> So kết quả</button>';
                    var htmlTextAlarm = '';

                    var statusWin = detailViewButtonIcon(objTickerOne);
                    if (statusWin == 1) {
                        htmlButton = '<button style="float: right; margin: -3px 5px 0px 0px;" onclick="detailBuildButtonOpenLinkRs(\'' + orderId + '\',\'' + historyTabEventClick + '\',\'' + category + '\',\'' + drawInfo.drawId + '\',\'' + paperTicketId + '\');" type="button" class="btn btn-xs btn-danger"><i style="color: violet;" class="fa fa-trophy"></i> Trúng thưởng</button>';
                        htmlTextAlarm = '<div style="float: right;">' + detailViewWinText(objTickerOne) + ' </div>';
                    }

                    html += '' + htmlButton + htmlTextAlarm + '';
                }
            } else {
                var htmlButton = '<button style="float: right; margin: -3px 5px 0px 0px;" onclick="detailBuildButtonOpenLinkRs(\'' + orderId + '\',\'' + historyTabEventClick + '\',\'' + category + '\',\'' + drawInfo.drawId + '\',\'' + paperTicketId + '\');" type="button" class="btn btn-xs btn-info"> So kết quả</button>';
                var htmlTextAlarm = '';

                var statusWin = detailViewButtonIcon(objTickerOne);
                if (statusWin == 1) {
                    htmlButton = '<button style="float: right; margin: -3px 5px 0px 0px;" onclick="detailBuildButtonOpenLinkRs(\'' + orderId + '\',\'' + historyTabEventClick + '\',\'' + category + '\',\'' + drawInfo.drawId + '\',\'' + paperTicketId + '\');" type="button" class="btn btn-xs btn-danger"><i style="color: violet;" class="fa fa-trophy"></i> Trúng thưởng</button>';
                    htmlTextAlarm = '<div style="float: right;">' + detailViewWinText(objTickerOne) + ' </div>';
                }

                html += '' + htmlButton + htmlTextAlarm + '';
            }
        }
    }
    return html;
}

function detailSubmitTickerErrReportBtnOpen(paperTicketId) {
    $("#receiveTickerModalPaperTicketId").val(paperTicketId);
    $("#receiveTickerModalReportErr").modal("show");
}

function detailSubmitTickerErrReport() {
    var textRp = $("#receiveTickerModalReportTextIp").val();
    var paperTicketId = $("#receiveTickerModalPaperTicketId").val();

    if (commonIsEmpty(textRp) == '') {
        commonShowMessage('Bạn chưa nhập lý do', 'error');
        return;
    }

    if (commonIsEmpty(paperTicketId) == -1) {
        commonShowMessage('Dữ liệu không hợp lệ', 'error');
        return;
    }

    var urlInfo = "/action/history/detail/reportTickerErr";
    var obj = {
        paperTicketId: paperTicketId + "",
        message: textRp + ""
    };

    commonRunWaitMe($("#receiveTickerModalReportErr"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($("#receiveTickerModalReportErr"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

        if (result != null) {
            if (result.code == 0) {
                $("#receiveTickerModalReportTextIp").val('');
                $("#receiveTickerModalPaperTicketId").val('-1');
                $("#receiveTickerModalReportErr").modal("hide");
                commonShowMessage('Thông báo thành công', 'success');

                var urlId = commonGetParameterByName("id");
                if (commonIsEmpty(urlId) != "") {
                    detailGetDataBuyDone(urlId);
                }
            } else {
                commonShowMessage(jQuery.i18n.prop('common_system_busy'), 'error');
            }
        }
    });
}

function detailBuildButtonOpenLinkRs(orderId, historyTabEventClick, category, draw, paperTicketId) {
     var kenoType = commonGetParameterByName("keno");
     var orderIdMask = commonGetParameterByName("idMask");
    window.location.href = requestUrl + "/history/compare?id=" + orderId + "&type=" + historyTabEventClick + "&category=" + category + "&draw=" + draw + "&paperTicketId=" + paperTicketId +"&idMask="+orderIdMask + "&keno="+kenoType;
}