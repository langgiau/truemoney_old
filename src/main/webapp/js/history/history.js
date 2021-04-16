$(document).ready(function () {
    getResource(historyInit);
});

var historyTabEventClick = 0;
var historyCountPageIndex = 1;
var historyPageLoadingKey = true;
function historyInit() {
    
    $(window).scroll(function () {
        if (($(window).scrollTop() + $(window).height()) >= ($(document).height() - 100)) {
            if (historyPageLoadingKey) {
                historyPageLoadingKey = false;
                
                var urlType = commonGetParameterByName("type");
                if (commonIsEmpty(urlType) != "") {
                    if (urlType == 1) {
                        historyGetDataBuyDone("#historyBodyBuyDone");
                    } else if (urlType == 2) {
                        historyGetDataBuyCancel("#historyBodyBuyCancel");
                    }
                }
            }
        }
    });
    
    var urlType = commonGetParameterByName("type");
    if (commonIsEmpty(urlType) != "") {
        var tabSelected = "historyBodyWaiting";
        if (urlType == 0) {
            tabSelected = "historyBodyWaiting";
        } else if (urlType == 1) {
            tabSelected = "historyBodyBuyDone";
        } else if (urlType == 2) {
            tabSelected = "historyBodyBuyCancel";
        }
        
        $('a[href="#' + tabSelected + '"]').trigger('click');
    }
    
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href"); // activated tab
        if (target == "#historyBodyWaiting") {
            historyCountPageIndex = 1;
            historyTabEventClick = 0;
            
            historySetGetParam("type", 0);
            $("#historyBodyWaiting").html('');
            historyGetDataWaiting(target);
        } else if (target == "#historyBodyBuyDone") {
            historyCountPageIndex = 1;
            historyTabEventClick = 1;
            
            historySetGetParam("type", 1);
            $("#historyBodyBuyDone").html('');
            historyGetDataBuyDone(target);
        } else if (target == "#historyBodyBuyCancel") {
            historyCountPageIndex = 1;
            historyTabEventClick = 2;
            
            historySetGetParam("type", 2);
            $("#historyBodyBuyCancel").html('');
            historyGetDataBuyCancel(target);
        }
    });
    
    historyGetDataWaiting("#historyBodyWaiting");
    $("#homeMuabaoBasketNumberTotal").text(commonGetCookie("numberOfTiket"));
}

function historyBackHis() {
    window.location.href = requestUrl + "/home";
}

function historyGetDataWaiting(idTab) {
    var urlInfo = "/action/history/getHistoryWaiting";
    var obj = {};
    
    commonRunWaitMe($(".panel-body"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-body"));
        
        var dataAll = new Array();
        
        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }
     //   console.log(dataAll);
        if (result != null) {
            dataAll = result.data;
            historyGroupTimeDateDataAll(idTab, dataAll);
        }
    });
}

function historyGetDataBuyDone(idTab) {
    var urlInfo = "/action/history/getHistoryTransDone";
    var obj = {
        page_index: historyCountPageIndex + "",
        optStatus: "3"
    };
    
    commonRunWaitMe($(".panel-body"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-body"));
        historyPageLoadingKey = true;
        
        var dataAll = new Array();
        
        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }
        
        if (result != null) {
            dataAll = result.data;
        //    console.log(dataAll);
            
            if (dataAll != null && dataAll.length > 0) {
                historyCountPageIndex = historyCountPageIndex + 1;
            }
            historyGroupTimeDateDataAll(idTab, dataAll);
        }
    });
}

function historyGetDataBuyCancel(idTab) {
    var urlInfo = "/action/history/getHistoryTransDone";
    var obj = {
        page_index: historyCountPageIndex + "",
        optStatus: "13"
    };
    
    commonRunWaitMe($(".panel-body"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-body"));
        historyPageLoadingKey = true;
        
        var dataAll = new Array();
        
        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }
        
        if (result != null) {
            dataAll = result.data;
          //  console.log(dataAll);
            
            if (dataAll != null && dataAll.length > 0) {
                historyCountPageIndex = historyCountPageIndex + 1;
            }
          //  console.log(dataAll);
            historyGroupTimeDateDataAll(idTab, dataAll);
        }
    });
}

function historyGroupTimeDateDataAll(idTab, myArray) {
    var groups = {};
    for (var i = 0; i < myArray.length; i++) {
        var groupName = moment(myArray[i].orderTime, 'DD/MM/YYYY h:mm:ss').format('DD/MM/YYYY');
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(myArray[i]);
    }
    
    myArray = [];
    for (var groupName in groups) {
        myArray.push({groupOrderTime: groupName, groupOrderData: groups[groupName]});
    }
    
    myArray.sort(function (a, b) {
        return commonDDMMYYYYToLong(b.groupOrderTime) - commonDDMMYYYYToLong(a.groupOrderTime);
    });
    
    //console.log(myArray);
    historyBuildHtmlBodyTab(idTab, myArray);
}

function historyBuildHtmlBodyTab(idTab, data) {
    var html = '';
  //  console.log(data);
    for (var k = 0; k < data.length; k++) {
        var dataOne = data[k];
        var orderData = dataOne.groupOrderData;
        var orderTime = dataOne.groupOrderTime;
        
        html += '<span style="padding-left: 5px; font-weight: bold; font-size: 15px; color: black">' + orderTime + '</span>';
        
        if (orderData != null && orderData.length > 0) {
            orderData.sort(function (a, b) {
                var longB = moment(b.orderTime, 'DD/MM/YYYY h:mm:ss').valueOf();
                var longA = moment(a.orderTime, 'DD/MM/YYYY h:mm:ss').valueOf();
                
                return longB - longA;
            });
        }
        
        for (var kk = 0; kk < orderData.length; kk++) {
            var receiverInfo = orderData[kk].receiverInfo;
            var orderIdInfo = orderData[kk].orderIdInfo;
            var paperTicketInfos = orderData[kk].paperTicketInfos;
           console.log(commonGetKyQuay(paperTicketInfos));
           console.log(commonGetNgayQuay(paperTicketInfos));
            var deliveryType = orderData[kk].deliveryType;
            var orderStatus = orderData[kk].orderStatus;
            var htmlTextNameTicker = historyInnerHtmlTickerType(paperTicketInfos);
            var orderStatusText = historyOrderInfoStatus(orderStatus);
            var totalMoney = orderData[kk].totalMoney;
            var paymentVendor = orderData[kk].paymentVendor;
            
            // var textLogoMoney = '<i class="fa fa-circle" style="color: orange"></i>';
            var textLogoMoney = '';
            if (paymentVendor == 3 || paymentVendor == 30 ||paymentVendor == 31 || paymentVendor == 32) {
                textLogoMoney = '<img src="' + requestUrl + '/static/img/common/logo-momo.png" width="15px" height="15px" />';
            }
            
            html += '<div onclick="historyOpenLinkDetailById(' + orderIdInfo.orderId + ',' + orderIdInfo.orderIdMask + ');" class="form-group historyBodyOne"> ' +
                    '    <div class="form-row" style="position: relative"> ' +
                    '        <div class="col-sm-8 text-left"> ' +
                    '            <strong>Nhận: ' + commonHtmlEntities(receiverInfo.name) + '</strong> ' +
                    '        </div> ' +
                    '        <div class="col text-right"> ' +
                    '             <span style="">#' + orderIdInfo.orderIdMask + '</span> ' +
                    '        </div> ' +
                    '    </div> ' +
                    '    <div class="form-row" style="font-size: 12px"> ' +
                    '        <div class="col-sm-8 text-left"> ' +
                    '            ' + historyCheckDeliveryType(deliveryType) + ': ' + htmlTextNameTicker + ' ' +
                    '        </div> ' +
                    '        <div class="col text-right"> ' +
                    // '            ' + textLogoMoney + ' <strong><span id="basketBodyDataTotalMoney" style="vertical-align: middle; color: red">' + common_format_number(totalMoney + "", "") + 'đ </span></strong> ' +
                    '        </div> ' +
                    '    </div> ' +
                    '    <div class="form-row"> ' +
                    '        <div class="col-sm-12 text-left"> ' +
                    '          ' + historyOrderInfoStatusPriceIcon(paperTicketInfos,orderStatusText)  +
                    '        </div> ' +
                    '    </div> ' +

                    '    <div class="form-row" style="font-size: 12px"> ' +
                    '        <div class="col-sm-8 text-left" style="color:#DA7545;"> ' +
                    '            <span style="font-weight: bold">Kỳ:</span> ' +commonGetKyQuay(paperTicketInfos)+ ' - '+commonGetNgayQuay(paperTicketInfos)+
                    '        </div> ' +
                    '        <div class="col text-right"> ' +
                    '            ' + textLogoMoney + ' <strong><span id="basketBodyDataTotalMoney" style="vertical-align: middle; color: #DD0E11">' + common_format_number(totalMoney + "", "") + 'đ </span></strong> ' +
                    '        </div> ' +
                    '    </div> '+

                    '</div>';
        }
    }
    
    if (html == '') {
        if (historyCountPageIndex == 1) {
            $(idTab).html('');
            html = '<div style="text-align: center; color: red; font-weight: bold;"><br><br>Danh sách trống</div>';
        }
    }
    
    $(idTab).append(html);
}



function historyCheckDeliveryType(key) {
    var html = 'GIỮ HỘ';
    if (key == 1) {
        html = 'SHIP VÉ';
    }
    
    return html;
}

function historyOrderInfoStatus(key) {
    var html = '<i class="fa fa-check-circle-o" style="color: orange"> Đang chờ</i>';
    if (key == 0) {
        html = '<i class="fa fa-check-circle-o" style="color: #59c406"> Đang check, chưa sẵn sàng</i>';
    } else if (key == 3) {
        html = '<i class="fa fa-check-circle-o" style="color: #59c406"> Đã bán</i>';
    } else if (key == 30) {
        html = '<i class="fa fa-check-circle-o" style="color: red"> Chờ đại lý gửi lại vé</i>';
    } else if (key == 1) {
        html = '<i class="fa fa-check-circle-o" style="color: orange"> Đợi đại lý giữ</i>';
    } else if (key == 2) {
        html = '<i class="fa fa-check-circle-o" style="color: orange"> Đại lý đã giữ</i>';
    } else if (key == 4) {
        html = '<i class="fa fa-check-circle-o" style="color: #59c406"> <span style="font-family: Roboto;font-size: small;">Hoàn tất</span></i>';
    } else if (key == 10) {
        html = '<i class="fa fa-check-circle-o" style="color: red"><span style="font-family: Roboto;font-size: small;"> Đại lý nhả vé</span></i>';
    } else if (key == 13) {
        html = '<i class="fa fa-check-circle-o" style="color: #59c406"><span style="font-family: Roboto;font-size: small;"> Đã bị hủy</span></i>';
    }
    
    return html;
}

function historyOrderInfoStatusPriceIcon(data,orderStatusText) {
    var html = '';
    
    for (var k = 0; k < data.length; k++) {
        var drawInfo = data[k].drawInfo;
        var dateOpenQuay = moment(drawInfo.openDate, 'DD/MM/YYYY h:mm:ss').format('DD/MM/YYYY');
        var dateToday = moment().format('DD/MM/YYYY');
        var dateTimeToday = moment().format('h:mm');
        
        var frDateOpenQuay = moment(dateOpenQuay, 'DD/MM/YYYY');
        var frDateToday = moment(dateToday, 'DD/MM/YYYY');
        
        if (frDateOpenQuay < frDateToday) {
            // html = '<i style="color: red" class="fa fa-desktop"></i>';
            html=orderStatusText;

        } else if (frDateOpenQuay == frDateToday) {
            var frBeginningTime = moment(dateTimeToday, 'h:mm');
            var frEndTime = moment('18:20', 'h:mm');
            var flagDaQuay = frBeginningTime.isBefore(frEndTime);
            
            if (flagDaQuay == false) {
                // html = '<i style="color: red" class="fa fa-desktop"></i>';
                html=orderStatusText;
            }
        }
        
        var numberInfoV2s = data[k].numberInfoV2s;
        if (!Array.isArray(numberInfoV2s)) {
            break;
        } else {
            for (var kk = 0; kk < numberInfoV2s.length; kk++) {
                var status = numberInfoV2s[kk].status;
                if (status == 1) {
                    return '<i style="color: #BA0062; font-size: 15px" class="fa fa-trophy"><span style="font-family: Roboto;font-size: small"> Trúng thưởng</i>';
                }
            }
        }
    }
    
    return html;
}

function historyInnerHtmlTickerType(data) {
    var html = "";
    var flagMAX4D = false;
    var flagMAX3D = false;
    var flagMAX3DPlus = false;
    var flagOMMAX3DPlus = false;
    var flagPOWER655 = false;
    var flagMEGA645 = false;
    var flagBULK = false;
    var flagKeno = false;
    for (var k = 0; k < data.length; k++) {
        var category = data[k].category;
        
        if (category == 1 && flagMEGA645 == false) {
            if (k > 0) {
                html += ", ";
            }
            html += "<span style='color: BLACK'>MEGA 6/45</span>";
            flagMEGA645 = true;
        } else if (category == 4 && flagMAX3D == false) {
            if (k > 0) {
                html += ", ";
            }
            html += "<span style='color: BLACK'>MAX 3D</span>";
            flagMAX3D = true;
        } else if (category == 5 && flagMAX3DPlus == false) {
            if (k > 0) {
                html += ", ";
            }
            html += "<span style='color: BLACK'>MAX 3D+</span>";
            flagMAX3DPlus = true;
        } else if (category == 15 && flagOMMAX3DPlus == false) {
            if (k > 0) {
                html += ", ";
            }
            html += "<span style='color: BLACK'>ÔM 3D+</span>";
            flagOMMAX3DPlus = true;
        } else if (category == 2 && flagMAX4D == false) {
            if (k > 0) {
                html += ", ";
            }
            html += "<span style='color: BLACK'>MAX 4D</span>";
            flagMAX4D = true;
        } else if (category == 3 && flagPOWER655 == false) {
            if (k > 0) {
                html += ", ";
            }
            html += "<span style='color: BLACK'>POWER 6/55</span>";
            flagPOWER655 = true;
        } else if (category == 6 && flagKeno == false) {
            if (k > 0) {
                html += ", ";
            }
            html += "<span style='color: BLACK'>KENO</span>";
            flagKeno = true;
        } else if ((category == 11 || category == 12 || category == 13) && flagBULK == false) {
            if (k > 0) {
                html += ", ";
            }
            html += "<span style='color: BLACK'>GIỎ LÌ XÌ</span>";
            flagBULK = true;
        }
    }
    
    return html;
}

function historyOpenLinkDetailById(orderId,orderIdMask) {
    window.location.href = requestUrl + "/history/detail?id=" + orderId + "&type=" + historyTabEventClick+"&idMask="+orderIdMask +"&keno="+0;
}

function historySetGetParam(key, value) {
    if (history.pushState) {
        var params = new URLSearchParams(window.location.search);
        params.set(key, value);
        var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString();
        window.history.pushState({path: newUrl}, '', newUrl);
    }
}

function historyChk_scroll(e) {
    var elem = $(e.currentTarget);
   // console.log("bottom");
    if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight())
    {
     //   console.log("bottom");
    }
    
}
