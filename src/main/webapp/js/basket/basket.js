$(document).ready(function () {
    getResource(basketInit);
});

function basketInit() {
    basketBuildDataCookie();
}

function basketBackHis() {
    var urlBack = "";//commonGetParameterByName("back");
    if (commonIsEmpty(urlBack) != "") {
        if (urlBack == 'mega645' || urlBack == 'power655' || urlBack == 'max4d' || urlBack == 'bulk' || urlBack == 'max3d' || urlBack == 'max3dplus' ||urlBack == 'keno') {
            window.location.href = requestUrl + "/" + urlBack;
        } else {
            window.location.href = requestUrl + "/home";
        }
    } else {
        window.location.href = requestUrl + "/home";
    }
}

var basketCountAllMoneyTotalCheck = 0;
function basketBuildDataCookie() {
    var arrPower655 = commonGetCookie("LUCKYBEST_Power655");
    var arrMega645 = commonGetCookie("LUCKYBEST_Mega645");
    var arrMax4D = commonGetCookie("LUCKYBEST_Max4D");
    var arrBulk = commonGetCookie("LUCKYBEST_Bulk");
    var arrMax3D = commonGetCookie("LUCKYBEST_Max3D");
    var arrMax3DPlus = commonGetCookie("LUCKYBEST_Max3DPlus");
    var arrOmMax3DPlus = commonGetCookie("LUCKYBEST_OmMax3DPlus");
    
    var basketCountTickerAllType = 0;
    var basketMoneyTotalCount = 0;
    $("#basketBodyDataAllBao").empty();
    
    if (arrPower655 != null && arrPower655 != "" && arrPower655 != undefined) {
        arrPower655 = JSON.parse(arrPower655);
        
        var basketMoneyTotalCountPower655 = basketBuildHtmlPower655(basketCountTickerAllType, arrPower655);
        basketCountTickerAllType += arrPower655.length;
        
        basketMoneyTotalCount = basketMoneyTotalCount + basketMoneyTotalCountPower655;
    }
    
    if (arrMega645 != null && arrMega645 != "" && arrMega645 != undefined) {
        arrMega645 = JSON.parse(arrMega645);
        
        var basketMoneyTotalCountMega645 = basketBuildHtmlMega645(basketCountTickerAllType, arrMega645);
        basketCountTickerAllType += arrMega645.length;
        
        basketMoneyTotalCount = basketMoneyTotalCount + basketMoneyTotalCountMega645;
    }
    
    if (arrMax4D != null && arrMax4D != "" && arrMax4D != undefined) {
        arrMax4D = JSON.parse(arrMax4D);
        
        var basketMoneyTotalCountMax4D = basketBuildHtmlMax4D(basketCountTickerAllType, arrMax4D);
        basketCountTickerAllType += arrMax4D.length;
        
        basketMoneyTotalCount = basketMoneyTotalCount + basketMoneyTotalCountMax4D;
    }
    
    if (arrBulk != null && arrBulk != "" && arrBulk != undefined) {
        arrBulk = JSON.parse(arrBulk);
        
        var basketMoneyTotalCountBulk = basketBuildHtmlBulk(basketCountTickerAllType, arrBulk);
        
        basketMoneyTotalCount = basketMoneyTotalCount + basketMoneyTotalCountBulk;
    }
    
    if (arrMax3D != null && arrMax3D != "" && arrMax3D != undefined) {
        arrMax3D = JSON.parse(arrMax3D);
        
        var basketMoneyTotalCountMax3D = basketBuildHtmlMax3D(basketCountTickerAllType, arrMax3D);
        basketCountTickerAllType += arrMax3D.length;
        
        basketMoneyTotalCount = basketMoneyTotalCount + basketMoneyTotalCountMax3D;
    }
    
    if (arrMax3DPlus != null && arrMax3DPlus != "" && arrMax3DPlus != undefined) {
        arrMax3DPlus = JSON.parse(arrMax3DPlus);
        
        var basketMoneyTotalCountMax3DPlus = basketBuildHtmlMax3DPlus(basketCountTickerAllType, arrMax3DPlus);
        basketCountTickerAllType += arrMax3DPlus.length;
        
        basketMoneyTotalCount = basketMoneyTotalCount + basketMoneyTotalCountMax3DPlus;
    }
    
    if (arrOmMax3DPlus != null && arrOmMax3DPlus != "" && arrOmMax3DPlus != undefined) {
        arrOmMax3DPlus = JSON.parse(arrOmMax3DPlus);
        var basketMoneyTotalCountOmMax3DPlus = basketBuildHtmlOmMax3DPlus(basketCountTickerAllType, arrOmMax3DPlus);
        basketCountTickerAllType += arrOmMax3DPlus.length;
        
        basketMoneyTotalCount = basketMoneyTotalCount + basketMoneyTotalCountOmMax3DPlus;
    }
    
    basketCountAllMoneyTotalCheck = basketMoneyTotalCount;
    
    $("#basketBodyDataTotalMoney").text(common_format_number(basketMoneyTotalCount + "", "") + "đ");
    
    if (basketMoneyTotalCount == 0) {
        $("#basketBtnContinueOK").prop("disabled", true);
    } else {
        $("#basketBtnContinueOK").prop("disabled", false);
    }
    return [basketMoneyTotalCount, basketCountTickerAllType];
}

function basketBtnClickOrderContinue() {
//    if (basketCountAllMoneyTotalCheck >= 20000) {
        window.location.href = requestUrl + '/receive';
//    } else {
//        commonShowMessage("Vui lòng mua thêm, đơn hàng tối thiểu 20.000đ", 'error');
//    }
}
//
// start build html power655
//
function basketBuildHtmlPower655(basketCountTickerAllType, dataAll) {
    var basketMoneyTotalCountPower655 = 0;
    var html = '';
    
    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;
        var numberTickerOne = basketCountTickerAllType + (k + 1);
        
        var titleTenbao = "Vé thường";
        if (oneDonhang.loai_bao != 6) {
            titleTenbao = "Bao " + oneDonhang.loai_bao;
        }
        
        var giaveBao = commonPower655DefaultMoneyBao(oneDonhang.loai_bao);
        var countTicker = arr_data_ve.length;
        var giaFinal = arr_ky_mua.length * (giaveBao * countTicker);
        
        basketMoneyTotalCountPower655 = basketMoneyTotalCountPower655 + giaFinal;
        
        html += '<div class="form-group">' +
                '    <div class="basket-group-baobao">' +
                '            <img src="' + requestUrl + '/static/img/common/power655_logo.png" width="80px" height="auto" />' +
                '            <div class="form-group text-center">' +
                '                    <p style="padding-top: 10px"><h4><strong>' + titleTenbao + '</strong></h4></p>' +
                '            </div>' +
                '            <div class="basketCircle">' +
                '                    <table style="width: 100%">' +
                '                            <tbody>';
        
        for (var bok = 0; bok < arr_data_ve.length; bok++) {
            var oneRow = arr_data_ve[bok];
            var dataKey = oneRow.key;
            var dataVal = oneRow.value;
            var nameBao = commonBuildABCAll(bok);
            var textNumberView = "";
            
            html += '                                    <tr>' +
                    '                                            <td style="width: 10%">' +
                    '                                                    <span class="key">' + nameBao + '</span>' +
                    '                                            </td>' +
                    '                                            <td style="width: 70%">';
            for (var ck = 0; ck < dataVal.length; ck++) {
                var oneNumber = dataVal[ck];
                if (oneNumber < 10) {
                    oneNumber = "0" + oneNumber;
                }
                
                textNumberView += oneNumber + " ";
                
                html += '                                           <span class="step">' + oneNumber + '</span>';
            }
            
            
            html += '                                            </td>' +
                    '                                            <td style="text-align: right; padding-right: 10px">' +
                    '                                                    <span class="step_btn" onclick="basketPower655CancelDaysoByDonhangOne(\'' + nameBao + " " + textNumberView + '\',\'' + dataKey + '\',\'' + oneDonhang.don_hang + '\');">' +
                    '                                                            <i class="fa fa-trash-o"></i>' +
                    '                                                    </span>' +
                    '                                            </td>' +
                    '                                    </tr>';
        }
        
        html += '                            </tbody>' +
                '                    </table>' +
                '            </div>' +
                '            <br>';
        
        for (var kk = 0; kk < arr_ky_mua.length; kk++) {
            html += '        <div class="form-row basket-font-size-ky">' +
                    '           <div class="col-sm-5">' +
                    '               <p><strong>Kỳ :</strong> #' + arr_ky_mua[kk].drawCode + '</p>' +
                    '           </div>' +
                    '           <div class="col">' +
                    '               <p><strong>Ngày :</strong> ' + moment(arr_ky_mua[kk].openDate, 'DD/MM/YYYY').locale('vi').format('llll') + '</p>' +
                    '           </div>' +
                    '        </div>';
        }
        
        html += '            <div class="form-group basket-border-top">' +
                '                    <div class="form-row basket-font-size-money">' +
                '                            <div class="col-sm-8 text-left">' +
                '                                    <strong>VÉ ' + numberTickerOne + ' : <span style="color: red">' + common_format_number(giaFinal + "", "") + 'đ</span></strong>' +
                '                            </div>' +
                '                            <div class="col text-right">' +
                '                               <a onclick="basketPower655CancelDonhangOne(' + oneDonhang.don_hang + ',' + numberTickerOne + ');" href="javascript:void(0)" >' +
                '                                    <i class="fa fa-trash-o" style="color: red; font-size: 14px"></i> <strong>HỦY VÉ</strong>' +
                '                               </a>' +
                '                            </div>' +
                '                    </div>' +
                '            </div>' +
                '    </div>' +
                '</div>';
    }
    
    $("#basketBodyDataAllBao").append(html);
    
    return basketMoneyTotalCountPower655;
}

function basketPower655CancelDonhangOne(idDon, tickerNo) {
    bootbox.confirm("Bạn muốn xóa vé " + tickerNo + " ?", function (result) {
        if (result) {
            var arrPower655 = commonGetCookie("LUCKYBEST_Power655");
            
            if (arrPower655 != null && arrPower655 != "" && arrPower655 != undefined) {
                arrPower655 = JSON.parse(arrPower655);
                
                var objIndex = arrPower655.findIndex((o => o.don_hang == idDon));
                arrPower655.splice(objIndex, 1);
                
                commonSetCookie("LUCKYBEST_Power655", JSON.stringify(arrPower655));
                basketBuildDataCookie();
            }
        }
    });
}

function basketPower655CancelDaysoByDonhangOne(textNumber, keyVal, idDon) {
    bootbox.confirm("Xóa : " + textNumber + " ?", function (result) {
        if (result) {
            var arrPower655 = commonGetCookie("LUCKYBEST_Power655");
            
            if (arrPower655 != null && arrPower655 != "" && arrPower655 != undefined) {
                arrPower655 = JSON.parse(arrPower655);
                
                var dataFind = arrPower655.find(x => x.don_hang == idDon).data;
                if (dataFind != null && dataFind.length <= 1) {
                    var objIndex = arrPower655.findIndex((o => o.don_hang == idDon));
                    arrPower655.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_Power655", JSON.stringify(arrPower655));
                    basketBuildDataCookie();
                } else {
                    var objIndex = dataFind.findIndex((o => o.key == keyVal));
                    dataFind.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_Power655", JSON.stringify(arrPower655));
                    basketBuildDataCookie();
                }
            }
        }
    });
}
//
// end build html power655
//
// start build html mega645
//
function basketBuildHtmlMega645(basketCountTickerAllType, dataAll) {
    var basketMoneyTotalCountMega645 = 0;
    var html = '';
    
    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;
        var numberTickerOne = basketCountTickerAllType + (k + 1);
        
        var titleTenbao = "Vé thường";
        if (oneDonhang.loai_bao != 6) {
            titleTenbao = "Bao " + oneDonhang.loai_bao;
        }
        
        var giaveBao = commonMega645DefaultMoneyBao(oneDonhang.loai_bao);
        var countTicker = arr_data_ve.length;
        var giaFinal = arr_ky_mua.length * (giaveBao * countTicker);
        
        basketMoneyTotalCountMega645 = basketMoneyTotalCountMega645 + giaFinal;
        
        html += '<div class="form-group">' +
                '    <div class="basket-group-baobao">' +
                '            <img src="' + requestUrl + '/static/img/common/mega645_logo.png" width="80px" height="auto" />' +
                '            <div class="form-group text-center">' +
                '                    <p style="padding-top: 10px"><h4><strong>' + titleTenbao + '</strong></h4></p>' +
                '            </div>' +
                '            <div class="basketCircle">' +
                '                    <table style="width: 100%">' +
                '                            <tbody>';
        
        for (var bok = 0; bok < arr_data_ve.length; bok++) {
            var oneRow = arr_data_ve[bok];
            var dataKey = oneRow.key;
            var dataVal = oneRow.value;
            var nameBao = commonBuildABCAll(bok);
            var textNumberView = "";
            
            html += '                                    <tr>' +
                    '                                            <td style="width: 10%">' +
                    '                                                    <span class="key">' + nameBao + '</span>' +
                    '                                            </td>' +
                    '                                            <td style="width: 70%">';
            for (var ck = 0; ck < dataVal.length; ck++) {
                var oneNumber = dataVal[ck];
                if (oneNumber < 10) {
                    oneNumber = "0" + oneNumber;
                }
                
                textNumberView += oneNumber + " ";
                
                html += '                                           <span class="step">' + oneNumber + '</span>';
            }
            
            
            html += '                                            </td>' +
                    '                                            <td style="text-align: right; padding-right: 10px">' +
                    '                                                    <span class="step_btn" onclick="basketMega645CancelDaysoByDonhangOne(\'' + nameBao + " " + textNumberView + '\',\'' + dataKey + '\',\'' + oneDonhang.don_hang + '\');">' +
                    '                                                            <i class="fa fa-trash-o"></i>' +
                    '                                                    </span>' +
                    '                                            </td>' +
                    '                                    </tr>';
        }
        
        html += '                            </tbody>' +
                '                    </table>' +
                '            </div>' +
                '            <br>';
        
        for (var kk = 0; kk < arr_ky_mua.length; kk++) {
            html += '        <div class="form-row basket-font-size-ky">' +
                    '           <div class="col-sm-5">' +
                    '               <p><strong>Kỳ :</strong> #' + arr_ky_mua[kk].drawCode + '</p>' +
                    '           </div>' +
                    '           <div class="col">' +
                    '               <p><strong>Ngày :</strong> ' + moment(arr_ky_mua[kk].openDate, 'DD/MM/YYYY').locale('vi').format('llll') + '</p>' +
                    '           </div>' +
                    '        </div>';
        }
        
        html += '            <div class="form-group basket-border-top">' +
                '                    <div class="form-row basket-font-size-money">' +
                '                            <div class="col-sm-8 text-left">' +
                '                                    <strong>VÉ ' + numberTickerOne + ' : <span style="color: red">' + common_format_number(giaFinal + "", "") + 'đ</span></strong>' +
                '                            </div>' +
                '                            <div class="col text-right">' +
                '                               <a onclick="basketMega645CancelDonhangOne(' + oneDonhang.don_hang + ',' + numberTickerOne + ');" href="javascript:void(0)" >' +
                '                                    <i class="fa fa-trash-o" style="color: red; font-size: 14px"></i> <strong>HỦY VÉ</strong>' +
                '                               </a>' +
                '                            </div>' +
                '                    </div>' +
                '            </div>' +
                '    </div>' +
                '</div>';
    }
    
    $("#basketBodyDataAllBao").append(html);
    
    return basketMoneyTotalCountMega645;
}

function basketMega645CancelDonhangOne(idDon, tickerNo) {
    bootbox.confirm("Bạn muốn xóa vé " + tickerNo + " ?", function (result) {
        if (result) {
            var arrMega645 = commonGetCookie("LUCKYBEST_Mega645");
            
            if (arrMega645 != null && arrMega645 != "" && arrMega645 != undefined) {
                arrMega645 = JSON.parse(arrMega645);
                
                var objIndex = arrMega645.findIndex((o => o.don_hang == idDon));
                arrMega645.splice(objIndex, 1);
                
                commonSetCookie("LUCKYBEST_Mega645", JSON.stringify(arrMega645));
                basketBuildDataCookie();
            }
        }
    });
}

function basketMega645CancelDaysoByDonhangOne(textNumber, keyVal, idDon) {
    bootbox.confirm("Xóa : " + textNumber + " ?", function (result) {
        if (result) {
            var arrMega645 = commonGetCookie("LUCKYBEST_Mega645");
            
            if (arrMega645 != null && arrMega645 != "" && arrMega645 != undefined) {
                arrMega645 = JSON.parse(arrMega645);
                
                var dataFind = arrMega645.find(x => x.don_hang == idDon).data;
                if (dataFind != null && dataFind.length <= 1) {
                    var objIndex = arrMega645.findIndex((o => o.don_hang == idDon));
                    arrMega645.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_Mega645", JSON.stringify(arrMega645));
                    basketBuildDataCookie();
                } else {
                    var objIndex = dataFind.findIndex((o => o.key == keyVal));
                    dataFind.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_Mega645", JSON.stringify(arrMega645));
                    basketBuildDataCookie();
                }
            }
        }
    });
}
//
// end build html mega645
//
// start build html max4D
//
function basketBuildHtmlMax4D(basketCountTickerAllType, dataAll) {
    var basketMoneyTotalCountMax4D = 0;
    var html = '';
    
    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;
        var numberTickerOne = basketCountTickerAllType + (k + 1);
        
        var titleTenbao = "4D Thường";
        if (oneDonhang.loai_bao == 2) {
            titleTenbao = "4D Tổ hợp";
        } else if (oneDonhang.loai_bao == 3) {
            titleTenbao = "4D Bao";
        } else if (oneDonhang.loai_bao == 4) {
            titleTenbao = "4D Cuộn 1";
        } else if (oneDonhang.loai_bao == 5) {
            titleTenbao = "4D Cuộn 4";
        }
        
        var giaFinal = 0;
        
        for (var ace = 0; ace < arr_data_ve.length; ace++) {
            var oneRow = arr_data_ve[ace];
            
            var giaveBao = commonMax4dDefaultMoneyBao(oneDonhang.loai_bao, oneRow.value);
            var giaveOne = arr_ky_mua.length * (giaveBao * oneRow.money);
            
            giaFinal = giaFinal + giaveOne;
            basketMoneyTotalCountMax4D = basketMoneyTotalCountMax4D + giaveOne;
        }
        
        html += '<div class="form-group">' +
                '    <div class="basket-group-baobao">' +
                '            <img src="' + requestUrl + '/static/img/common/max4d_logo.png" width="80px" height="auto" />' +
                '            <div class="form-group text-center">' +
                '                    <p style="padding-top: 10px"><h4><strong>' + titleTenbao + '</strong></h4></p>' +
                '            </div>' +
                '            <div class="basketCircle">' +
                '                    <table style="width: 100%">' +
                '                            <tbody>';
        
        for (var bok = 0; bok < arr_data_ve.length; bok++) {
            var oneRow = arr_data_ve[bok];
            var dataKey = oneRow.key;
            var dataMoney = oneRow.money;
            var dataVal = oneRow.value;
            var nameBao = commonBuildABCAll(bok);
            var textNumberView = "";
            
            html += '                                    <tr>' +
                    '                                            <td style="width: 10%">' +
                    '                                                    <span class="key">' + nameBao + '</span>' +
                    '                                            </td>' +
                    '                                            <td style="width: 30%">';
            for (var ck = 0; ck < dataVal.length; ck++) {
                var oneNumber = dataVal[ck];
                
                if (oneDonhang.loai_bao == 4) {
                    if (ck > 0) {
                        textNumberView += oneNumber + "";
                    } else {
                        textNumberView += "*";
                    }
                } else if (oneDonhang.loai_bao == 5) {
                    if (ck < 3) {
                        textNumberView += oneNumber + "";
                    } else {
                        textNumberView += "*";
                    }
                } else {
                    textNumberView += oneNumber + "";
                }
            }
            
            html += '                                               <span style="font-weight: bold;">' + textNumberView + '</span>';
            
            if (oneDonhang.loai_bao == 2) {
                html += '                                           <span>&emsp;</span>';
                html += '                                           <span style="color: orange"><i>' + commonMax4DBuildToHopByGroup(oneDonhang.loai_bao, 2, textNumberView) + '</i></span>';
            } else if (oneDonhang.loai_bao == 3) {
                html += '                                           <span>&emsp;</span>';
                html += '                                           <span style="color: orange"><i>' + commonMax4DBuildToHopByGroup(oneDonhang.loai_bao, 3, textNumberView) + '</i></span>';
            } else if (oneDonhang.loai_bao == 4 || oneDonhang.loai_bao == 5) {
                html += '                                           <span>&emsp;</span>';
                html += '                                           <span style="color: orange"><i>x10</i></span>';
            }
            
            html += '                                            </td>';
            
            
            
            html += '                                            <td style="width: 40%; color : red">' + common_format_number((dataMoney * 10000) + "", "") + 'đ</td>';
            
            
            html += '                                            <td style="text-align: right; padding-right: 10px">' +
                    '                                                    <span class="step_btn" onclick="basketMax4DCancelDaysoByDonhangOne(\'' + nameBao + " " + textNumberView + '\',\'' + dataKey + '\',\'' + oneDonhang.don_hang + '\');">' +
                    '                                                            <i class="fa fa-trash-o"></i>' +
                    '                                                    </span>' +
                    '                                            </td>' +
                    '                                    </tr>';
        }
        
        html += '                            </tbody>' +
                '                    </table>' +
                '            </div>' +
                '            <br>';
        
        for (var kk = 0; kk < arr_ky_mua.length; kk++) {
            html += '        <div class="form-row basket-font-size-ky">' +
                    '           <div class="col-sm-5">' +
                    '               <p><strong>Kỳ :</strong> #' + arr_ky_mua[kk].drawCode + '</p>' +
                    '           </div>' +
                    '           <div class="col">' +
                    '               <p><strong>Ngày :</strong> ' + moment(arr_ky_mua[kk].openDate, 'DD/MM/YYYY').locale('vi').format('llll') + '</p>' +
                    '           </div>' +
                    '        </div>';
        }
        
        html += '            <div class="form-group basket-border-top">' +
                '                    <div class="form-row basket-font-size-money">' +
                '                            <div class="col-sm-8 text-left">' +
                '                                    <strong>VÉ ' + numberTickerOne + ' : <span style="color: red">' + common_format_number(giaFinal + "", "") + 'đ</span></strong>' +
                '                            </div>' +
                '                            <div class="col text-right">' +
                '                               <a onclick="basketMax4DCancelDonhangOne(' + oneDonhang.don_hang + ',' + numberTickerOne + ');" href="javascript:void(0)" >' +
                '                                    <i class="fa fa-trash-o" style="color: red; font-size: 14px"></i> <strong>HỦY VÉ</strong>' +
                '                               </a>' +
                '                            </div>' +
                '                    </div>' +
                '            </div>' +
                '    </div>' +
                '</div>';
    }
    
    $("#basketBodyDataAllBao").append(html);
    
    return basketMoneyTotalCountMax4D;
}

function basketMax4DCancelDonhangOne(idDon, tickerNo) {
    bootbox.confirm("Bạn muốn xóa vé " + tickerNo + " ?", function (result) {
        if (result) {
            var arrMax4D = commonGetCookie("LUCKYBEST_Max4D");
            
            if (arrMax4D != null && arrMax4D != "" && arrMax4D != undefined) {
                arrMax4D = JSON.parse(arrMax4D);
                
                var objIndex = arrMax4D.findIndex((o => o.don_hang == idDon));
                arrMax4D.splice(objIndex, 1);
                
                commonSetCookie("LUCKYBEST_Max4D", JSON.stringify(arrMax4D));
                basketBuildDataCookie();
            }
        }
    });
}

function basketMax4DCancelDaysoByDonhangOne(textNumber, keyVal, idDon) {
    bootbox.confirm("Xóa : " + textNumber + " ?", function (result) {
        if (result) {
            var arrMax4D = commonGetCookie("LUCKYBEST_Max4D");
            
            if (arrMax4D != null && arrMax4D != "" && arrMax4D != undefined) {
                arrMax4D = JSON.parse(arrMax4D);
                
                var dataFind = arrMax4D.find(x => x.don_hang == idDon).data;
                if (dataFind != null && dataFind.length <= 1) {
                    var objIndex = arrMax4D.findIndex((o => o.don_hang == idDon));
                    arrMax4D.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_Max4D", JSON.stringify(arrMax4D));
                    basketBuildDataCookie();
                } else {
                    var objIndex = dataFind.findIndex((o => o.key == keyVal));
                    dataFind.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_Max4D", JSON.stringify(arrMax4D));
                    basketBuildDataCookie();
                }
            }
        }
    });
}
//
// end build html max4D
//
// start build html bulk
//
function basketBuildHtmlBulk(basketCountTickerAllType, dataAll) {
    var basketMoneyTotalCountBulk = 0;
    var html = '';
    
    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var obj_data_ve = oneDonhang.data;
        var numberTickerOne = basketCountTickerAllType + (k + 1);
        
        var cachchoi = "Thường";
        var titleTenLoaive = "<span style='color: #e30922'>GIỎ LÌ XÌ POWER 6/55</span>";
        var giatien_1_ve = obj_data_ve.giatien_1_ve * 10000;
        
        if (oneDonhang.loai_ve == 13) {
            titleTenLoaive = "<span style='color: #e30922'>GIỎ LÌ XÌ POWER 6/55</span>";
        } else if (oneDonhang.loai_ve == 12) {
            titleTenLoaive = "<span style='color: #81005d'>GIỎ LÌ XÌ MAX 4D</span>";
            var cachchoi_max4d = obj_data_ve.cachchoi_max4d;
            if (cachchoi_max4d == 2) {
                cachchoi = "Tổ hợp";
            }
        } else if (oneDonhang.loai_ve == 11) {
            titleTenLoaive = "<span style='color: #2164b2'>GIỎ LÌ XÌ MEGA 6/45</span>";
        }
        
        var tongsoluongve = obj_data_ve.s_l_ve;
        var giaFinal = obj_data_ve.giatien_all;
        var sobosotren1ve = obj_data_ve.s_l_bs_1_ve;
        
        basketMoneyTotalCountBulk = basketMoneyTotalCountBulk + giaFinal;
        
        html += '<div class="form-group">' +
                '    <div class="basket-group-baobao">' +
                '            <img src="' + requestUrl + '/static/img/common/bulk_logo.png" width="auto" height="59px" />' +
                '            <div class="form-group text-center">' +
                '               <p style="padding-top: 10px"><h4><strong>' + titleTenLoaive + '</strong></h4></p>' +
                '            </div>' +
                '            <div class="basketCircle">' +
                '               <table style="width: 100%">' +
                '                   <tbody>';
        
        html += '                       <tr>' +
                '                           <td style="width: 100%">' +
                '                               <p>Cách chơi: <strong>' + cachchoi + '</strong></p>' +
                '                               <p>Số vé/1 kỳ quay: <strong>' + tongsoluongve + ' vé</strong></p>' +
                '                               <p>Số bộ số/1 vé: <strong>' + sobosotren1ve + ' bộ số</strong></p>' +
                '                               <p>Giá tiền 1 bộ số: <strong>' + common_format_number(giatien_1_ve + "", "") + 'đ</strong></p>' +
                '                           </td>' +
                '                       </tr>';
        
        html += '                   </tbody>' +
                '               </table>' +
                '            </div>' +
                '            <br>';
        
        for (var kk = 0; kk < arr_ky_mua.length; kk++) {
            html += '        <div class="form-row basket-font-size-ky">' +
                    '           <div class="col-sm-5">' +
                    '               <p><strong>Kỳ :</strong> #' + arr_ky_mua[kk].drawCode + '</p>' +
                    '           </div>' +
                    '           <div class="col">' +
                    '               <p><strong>Ngày :</strong> ' + moment(arr_ky_mua[kk].openDate, 'DD/MM/YYYY').locale('vi').format('llll') + '</p>' +
                    '           </div>' +
                    '        </div>';
        }
        
        html += '            <div class="form-group basket-border-top">' +
                '                    <div class="form-row basket-font-size-money">' +
                '                            <div class="col-sm-8 text-left">' +
                '                                    <strong>VÉ ' + numberTickerOne + ' : <span style="color: red">' + common_format_number(giaFinal + "", "") + 'đ</span></strong>' +
                '                            </div>' +
                '                            <div class="col text-right">' +
                '                               <a onclick="basketBulkCancelDonhangOne(' + oneDonhang.don_hang + ',' + numberTickerOne + ');" href="javascript:void(0)" >' +
                '                                    <i class="fa fa-trash-o" style="color: red; font-size: 14px"></i> <strong>HỦY VÉ</strong>' +
                '                               </a>' +
                '                            </div>' +
                '                    </div>' +
                '            </div>' +
                '    </div>' +
                '</div>';
    }
    
    $("#basketBodyDataAllBao").append(html);
    
    return basketMoneyTotalCountBulk;
}

function basketBulkCancelDonhangOne(idDon, tickerNo) {
    bootbox.confirm("Bạn muốn xóa vé " + tickerNo + " ?", function (result) {
        if (result) {
            var arrBulk = commonGetCookie("LUCKYBEST_Bulk");
            
            if (arrBulk != null && arrBulk != "" && arrBulk != undefined) {
                arrBulk = JSON.parse(arrBulk);
                
                var objIndex = arrBulk.findIndex((o => o.don_hang == idDon));
                arrBulk.splice(objIndex, 1);
                
                commonSetCookie("LUCKYBEST_Bulk", JSON.stringify(arrBulk));
                basketBuildDataCookie();
            }
        }
    });
}
//
// end build html bulk
//
// start build html max3D
//
function basketBuildHtmlMax3D(basketCountTickerAllType, dataAll) {
    var basketMoneyTotalCountMax3D = 0;
    var html = '';
    
    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;
        var numberTickerOne = basketCountTickerAllType + (k + 1);
        
        var titleTenbao = "3D Thường";
        if (oneDonhang.loai_bao == 2) {
            titleTenbao = "3D Tổ hợp";
        } else if (oneDonhang.loai_bao == 3) {
            titleTenbao = "3D Bao";
        } else if (oneDonhang.loai_bao == 4) {
            titleTenbao = "3D Cuộn 1";
        } else if (oneDonhang.loai_bao == 5) {
            titleTenbao = "3D Cuộn 3";
        }
        
        var giaFinal = 0;
        
        for (var ace = 0; ace < arr_data_ve.length; ace++) {
            var oneRow = arr_data_ve[ace];
            
            var giaveBao = commonMax3dDefaultMoneyBao(oneDonhang.loai_bao, oneRow.value);
            var giaveOne = arr_ky_mua.length * (giaveBao * oneRow.money);
            
            giaFinal = giaFinal + giaveOne;
            basketMoneyTotalCountMax3D = basketMoneyTotalCountMax3D + giaveOne;
        }
        
        html += '<div class="form-group">' +
                '    <div class="basket-group-baobao">' +
                '            <img src="' + requestUrl + '/static/img/common/max3d_logo.png" width="80px" height="auto" />' +
                '            <div class="form-group text-center">' +
                '                    <p style="padding-top: 10px"><h4><strong>' + titleTenbao + '</strong></h4></p>' +
                '            </div>' +
                '            <div class="basketCircle">' +
                '                    <table style="width: 100%">' +
                '                            <tbody>';
        
        for (var bok = 0; bok < arr_data_ve.length; bok++) {
            var oneRow = arr_data_ve[bok];
            var dataKey = oneRow.key;
            var dataMoney = oneRow.money;
            var dataVal = oneRow.value;
            var nameBao = commonBuildABCAll(bok);
            var textNumberView = "";
            
            html += '                                    <tr>' +
                    '                                            <td style="width: 10%">' +
                    '                                                    <span class="key">' + nameBao + '</span>' +
                    '                                            </td>' +
                    '                                            <td style="width: 30%">';
            for (var ck = 0; ck < dataVal.length; ck++) {
                var oneNumber = dataVal[ck];
                
                if (oneDonhang.loai_bao == 4) {
                    if (ck > 0) {
                        textNumberView += oneNumber + "";
                    } else {
                        textNumberView += "*";
                    }
                } else if (oneDonhang.loai_bao == 5) {
                    if (ck < 3) {
                        textNumberView += oneNumber + "";
                    } else {
                        textNumberView += "*";
                    }
                } else {
                    textNumberView += oneNumber + "";
                }
            }
            
            html += '                                               <span style="font-weight: bold;">' + textNumberView + '</span>';
            
            if (oneDonhang.loai_bao == 2) {
                html += '                                           <span>&emsp;</span>';
                html += '                                           <span style="color: orange"><i>' + commonMax3DBuildToHopByGroup(oneDonhang.loai_bao, 2, textNumberView) + '</i></span>';
            } else if (oneDonhang.loai_bao == 3) {
                html += '                                           <span>&emsp;</span>';
                html += '                                           <span style="color: orange"><i>' + commonMax3DBuildToHopByGroup(oneDonhang.loai_bao, 3, textNumberView) + '</i></span>';
            } else if (oneDonhang.loai_bao == 4 || oneDonhang.loai_bao == 5) {
                html += '                                           <span>&emsp;</span>';
                html += '                                           <span style="color: orange"><i>x10</i></span>';
            }
            
            html += '                                            </td>';
            
            
            
            html += '                                            <td style="width: 40%; color : red">' + common_format_number((dataMoney * 10000) + "", "") + 'đ</td>';
            
            
            html += '                                            <td style="text-align: right; padding-right: 10px">' +
                    '                                                    <span class="step_btn" onclick="basketMax3DCancelDaysoByDonhangOne(\'' + nameBao + " " + textNumberView + '\',\'' + dataKey + '\',\'' + oneDonhang.don_hang + '\');">' +
                    '                                                            <i class="fa fa-trash-o"></i>' +
                    '                                                    </span>' +
                    '                                            </td>' +
                    '                                    </tr>';
        }
        
        html += '                            </tbody>' +
                '                    </table>' +
                '            </div>' +
                '            <br>';
        
        for (var kk = 0; kk < arr_ky_mua.length; kk++) {
            html += '        <div class="form-row basket-font-size-ky">' +
                    '           <div class="col-sm-5">' +
                    '               <p><strong>Kỳ :</strong> #' + arr_ky_mua[kk].drawCode + '</p>' +
                    '           </div>' +
                    '           <div class="col">' +
                    '               <p><strong>Ngày :</strong> ' + moment(arr_ky_mua[kk].openDate, 'DD/MM/YYYY').locale('vi').format('llll') + '</p>' +
                    '           </div>' +
                    '        </div>';
        }
        
        html += '            <div class="form-group basket-border-top">' +
                '                    <div class="form-row basket-font-size-money">' +
                '                            <div class="col-sm-8 text-left">' +
                '                                    <strong>VÉ ' + numberTickerOne + ' : <span style="color: red">' + common_format_number(giaFinal + "", "") + 'đ</span></strong>' +
                '                            </div>' +
                '                            <div class="col text-right">' +
                '                               <a onclick="basketMax3DCancelDonhangOne(' + oneDonhang.don_hang + ',' + numberTickerOne + ');" href="javascript:void(0)" >' +
                '                                    <i class="fa fa-trash-o" style="color: red; font-size: 14px"></i> <strong>HỦY VÉ</strong>' +
                '                               </a>' +
                '                            </div>' +
                '                    </div>' +
                '            </div>' +
                '    </div>' +
                '</div>';
    }
    
    $("#basketBodyDataAllBao").append(html);
    
    return basketMoneyTotalCountMax3D;
}

function basketMax3DCancelDonhangOne(idDon, tickerNo) {
    bootbox.confirm("Bạn muốn xóa vé " + tickerNo + " ?", function (result) {
        if (result) {
            var arrMax3D = commonGetCookie("LUCKYBEST_Max3D");
            
            if (arrMax3D != null && arrMax3D != "" && arrMax3D != undefined) {
                arrMax3D = JSON.parse(arrMax3D);
                
                var objIndex = arrMax3D.findIndex((o => o.don_hang == idDon));
                arrMax3D.splice(objIndex, 1);
                
                commonSetCookie("LUCKYBEST_Max3D", JSON.stringify(arrMax3D));
                basketBuildDataCookie();
            }
        }
    });
}

function basketMax3DCancelDaysoByDonhangOne(textNumber, keyVal, idDon) {
    bootbox.confirm("Xóa : " + textNumber + " ?", function (result) {
        if (result) {
            var arrMax3D = commonGetCookie("LUCKYBEST_Max3D");
            
            if (arrMax3D != null && arrMax3D != "" && arrMax3D != undefined) {
                arrMax3D = JSON.parse(arrMax3D);
                
                var dataFind = arrMax3D.find(x => x.don_hang == idDon).data;
                if (dataFind != null && dataFind.length <= 1) {
                    var objIndex = arrMax3D.findIndex((o => o.don_hang == idDon));
                    arrMax3D.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_Max3D", JSON.stringify(arrMax3D));
                    basketBuildDataCookie();
                } else {
                    var objIndex = dataFind.findIndex((o => o.key == keyVal));
                    dataFind.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_Max3D", JSON.stringify(arrMax3D));
                    basketBuildDataCookie();
                }
            }
        }
    });
}
//
// end build html max3D
//
// start build html max3DPlus
//
function basketBuildHtmlMax3DPlus(basketCountTickerAllType, dataAll) {
    var basketMoneyTotalCountMax3DPlus = 0;
    var html = '';
    
    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;
        var numberTickerOne = basketCountTickerAllType + (k + 1);
        
        var titleTenbao = "3D+ Cơ bản";
        if (oneDonhang.loai_bao == 2) {
            titleTenbao = "3D+ Tổ hợp";
        } else if (oneDonhang.loai_bao == 3) {
            titleTenbao = "3D+ Bao";
        } else if (oneDonhang.loai_bao == 4) {
            titleTenbao = "3D+ Cuộn 1";
        } else if (oneDonhang.loai_bao == 5) {
            titleTenbao = "3D+ Cuộn 3";
        }
        
        var giaFinal = 0;
        
        for (var ace = 0; ace < arr_data_ve.length; ace++) {
            var oneRow = arr_data_ve[ace];
            
            var giaveBao = commonMax3dPlusDefaultMoneyBao(oneDonhang.loai_bao, oneRow.value);
            var giaveOne = arr_ky_mua.length * (giaveBao * oneRow.money);
            
            giaFinal = giaFinal + giaveOne;
            basketMoneyTotalCountMax3DPlus = basketMoneyTotalCountMax3DPlus + giaveOne;
        }
        
        html += '<div class="form-group">' +
                '    <div class="basket-group-baobao">' +
                '            <img src="' + requestUrl + '/static/img/common/max3dPlus_logo.png" width="80px" height="auto" />' +
                '            <div class="form-group text-center">' +
                '                    <p style="padding-top: 10px"><h4><strong>' + titleTenbao + '</strong></h4></p>' +
                '            </div>' +
                '            <div class="basketCircle">' +
                '                    <table style="width: 100%">' +
                '                            <tbody>';
        
        for (var bok = 0; bok < arr_data_ve.length; bok++) {
            var oneRow = arr_data_ve[bok];
            var dataKey = oneRow.key;
            var dataMoney = oneRow.money;
            var dataVal = oneRow.value;
            var nameBao = commonBuildABCAll(bok);
            var textNumberView = "";
            
            html += '                                    <tr>' +
                    '                                            <td style="width: 10%">' +
                    '                                                    <span class="key">' + nameBao + '</span>' +
                    '                                            </td>' +
                    '                                            <td style="width: 30%">';
            for (var ck = 0; ck < dataVal.length; ck++) {
                var oneNumber = dataVal[ck];
                
                if (oneDonhang.loai_bao == 4) {
                    if (ck > 0) {
                        textNumberView += oneNumber + "";
                    } else {
                        textNumberView += "*";
                    }
                } else if (oneDonhang.loai_bao == 5) {
                    if (ck < 3) {
                        textNumberView += oneNumber + "";
                    } else {
                        textNumberView += "*";
                    }
                } else {
                    textNumberView += oneNumber + "";
                }
                
                if (ck == 2) {
                    textNumberView += "&nbsp;&nbsp;";
                }
            }
            
            var arrayTohopBuild = new Array();
            arrayTohopBuild.push(dataVal[0] + dataVal[1] + dataVal[2]);
            arrayTohopBuild.push(dataVal[3] + dataVal[4] + dataVal[5]);
            
            html += '                                               <span style="font-weight: bold;">' + textNumberView + '</span>';
            
            if (oneDonhang.loai_bao == 2) {
                html += '                                           <span>&emsp;</span>';
                html += '                                           <span style="color: orange"><i>' + commonMax3DPlusBuildToHopByGroup(oneDonhang.loai_bao, 2, arrayTohopBuild, 2) + '</i></span>';
            } else if (oneDonhang.loai_bao == 3) {
                html += '                                           <span>&emsp;</span>';
                html += '                                           <span style="color: orange"><i>' + commonMax3DPlusBuildToHopByGroup(oneDonhang.loai_bao, 3, arrayTohopBuild, 2) + '</i></span>';
            } else if (oneDonhang.loai_bao == 4 || oneDonhang.loai_bao == 5) {
                html += '                                           <span>&emsp;</span>';
                html += '                                           <span style="color: orange"><i>x10</i></span>';
            }
            
            html += '                                            </td>';
            
            
            
            html += '                                            <td style="width: 40%; color : red">' + common_format_number((dataMoney * 10000) + "", "") + 'đ</td>';
            
            
            html += '                                            <td style="text-align: right; padding-right: 10px">' +
                    '                                                    <span class="step_btn" onclick="basketMax3DPlusCancelDaysoByDonhangOne(\'' + nameBao + " " + textNumberView + '\',\'' + dataKey + '\',\'' + oneDonhang.don_hang + '\');">' +
                    '                                                            <i class="fa fa-trash-o"></i>' +
                    '                                                    </span>' +
                    '                                            </td>' +
                    '                                    </tr>';
        }
        
        html += '                            </tbody>' +
                '                    </table>' +
                '            </div>' +
                '            <br>';
        
        for (var kk = 0; kk < arr_ky_mua.length; kk++) {
            html += '        <div class="form-row basket-font-size-ky">' +
                    '           <div class="col-sm-5">' +
                    '               <p><strong>Kỳ :</strong> #' + arr_ky_mua[kk].drawCode + '</p>' +
                    '           </div>' +
                    '           <div class="col">' +
                    '               <p><strong>Ngày :</strong> ' + moment(arr_ky_mua[kk].openDate, 'DD/MM/YYYY').locale('vi').format('llll') + '</p>' +
                    '           </div>' +
                    '        </div>';
        }
        
        html += '            <div class="form-group basket-border-top">' +
                '                    <div class="form-row basket-font-size-money">' +
                '                            <div class="col-sm-8 text-left">' +
                '                                    <strong>VÉ ' + numberTickerOne + ' : <span style="color: red">' + common_format_number(giaFinal + "", "") + 'đ</span></strong>' +
                '                            </div>' +
                '                            <div class="col text-right">' +
                '                               <a onclick="basketMax3DPlusCancelDonhangOne(' + oneDonhang.don_hang + ',' + numberTickerOne + ');" href="javascript:void(0)" >' +
                '                                    <i class="fa fa-trash-o" style="color: red; font-size: 14px"></i> <strong>HỦY VÉ</strong>' +
                '                               </a>' +
                '                            </div>' +
                '                    </div>' +
                '            </div>' +
                '    </div>' +
                '</div>';
    }
    
    $("#basketBodyDataAllBao").append(html);
    
    return basketMoneyTotalCountMax3DPlus;
}

function basketMax3DPlusCancelDonhangOne(idDon, tickerNo) {
    bootbox.confirm("Bạn muốn xóa vé " + tickerNo + " ?", function (result) {
        if (result) {
            var arrMax3DPlus = commonGetCookie("LUCKYBEST_Max3DPlus");
            
            if (arrMax3DPlus != null && arrMax3DPlus != "" && arrMax3DPlus != undefined) {
                arrMax3DPlus = JSON.parse(arrMax3DPlus);
                
                var objIndex = arrMax3DPlus.findIndex((o => o.don_hang == idDon));
                arrMax3DPlus.splice(objIndex, 1);
                
                commonSetCookie("LUCKYBEST_Max3DPlus", JSON.stringify(arrMax3DPlus));
                basketBuildDataCookie();
            }
        }
    });
}

function basketMax3DPlusCancelDaysoByDonhangOne(textNumber, keyVal, idDon) {
    bootbox.confirm("Xóa : " + textNumber + " ?", function (result) {
        if (result) {
            var arrMax3DPlus = commonGetCookie("LUCKYBEST_Max3DPlus");
            
            if (arrMax3DPlus != null && arrMax3DPlus != "" && arrMax3DPlus != undefined) {
                arrMax3DPlus = JSON.parse(arrMax3DPlus);
                
                var dataFind = arrMax3DPlus.find(x => x.don_hang == idDon).data;
                if (dataFind != null && dataFind.length <= 1) {
                    var objIndex = arrMax3DPlus.findIndex((o => o.don_hang == idDon));
                    arrMax3DPlus.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_Max3DPlus", JSON.stringify(arrMax3DPlus));
                    basketBuildDataCookie();
                } else {
                    var objIndex = dataFind.findIndex((o => o.key == keyVal));
                    dataFind.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_Max3DPlus", JSON.stringify(arrMax3DPlus));
                    basketBuildDataCookie();
                }
            }
        }
    });
}
//
// end build html max3DPlus
//
// start build html max3DPlus
//
function basketBuildHtmlOmMax3DPlus(basketCountTickerAllType, dataAll) {
    console.log(dataAll);
    var basketMoneyTotalCountMega645 = 0;
    var html = '';
    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;
        var numberTickerOne = basketCountTickerAllType + (k + 1);
        var titleTenbao = "ÔM Max3D+";
        var totalMoney = oneDonhang.totalMoney;
        basketMoneyTotalCountMega645 = basketMoneyTotalCountMega645 + Number(totalMoney);
        
        var money = "10.000đ";
        if (oneDonhang.loai_bao == 2) {
            money = "20.000đ";
        } else if (oneDonhang.loai_bao == 3) {
            money = "50.000đ";
        } else if (oneDonhang.loai_bao == 4) {
            money = "100.000đ";
        } else if (oneDonhang.loai_bao == 5) {
            money = "200.000đ";
        }
        
        html += '<div class="form-group">' +
                '    <div class="basket-group-baobao">' +
                '            <img src="' + requestUrl + '/static/img/common/ommax3dPlus_logo.jpg" width="80px" height="auto" />' +
                '            <div class="form-group text-center">' +
                '                    <p style="padding-top: 10px"><h4><strong>' + titleTenbao + '</strong></h4></p>' +
                '            </div>' +
                '            <div class="basketCircle">' +
                '                    <table style="width: 100%">' +
                '                            <tbody>';
        
        var oneRow = arr_data_ve;
        var giaiSoFrom = oneRow.giaiSoFrom;
        var giaiSoTo = oneRow.giaiSoTo;
        var soTuChon = oneRow.soTuChon;
        
        html += '                                    <tr>' +
                '                                            <td style="width: 1%">' +
                '                                                    <span class="key">' + "A" + '</span>' +
                '                                            </td>' +
                '                                            <td style="width: 10%">' +
                '                                                       <span class="step">' + soTuChon + '</span>' +
                '                                            </td>' +
                '                                            <td style="width: 1%">' +
                '                                                       <span class="step">' + giaiSoFrom + '</span>' +
                '                                            </td>' +
                '                                            <td style="width: 1%;text-align: center;">' +
                '                                                       <span class="step">' + ' &#8764; ' + '</span>' +
                '                                            </td>' +
                '                                            <td style="width: 10%">' +
                '                                                       <span class="step">' + giaiSoTo + '</span>' +
                '                                            </td>' +
                '                                            <td style="width: 5%;color:red">' + money  +
                '                                            </td>' +
                '                                    </tr>';
        
        html += '                            </tbody>' +
                '                    </table>' +
                '            </div>' +
                '            <br>';
        
        for (var kk = 0; kk < arr_ky_mua.length; kk++) {
            html += '        <div class="form-row basket-font-size-ky">' +
                    '           <div class="col-sm-5">' +
                    '               <p><strong>Kỳ :</strong> #' + arr_ky_mua[kk].drawCode + '</p>' +
                    '           </div>' +
                    '           <div class="col">' +
                    '               <p><strong>Ngày :</strong> ' + moment(arr_ky_mua[kk].openDate, 'DD/MM/YYYY').locale('vi').format('llll') + '</p>' +
                    '           </div>' +
                    '        </div>';
        }
        
        html += '            <div class="form-group basket-border-top">' +
                '                    <div class="form-row basket-font-size-money">' +
                '                            <div class="col-sm-8 text-left">' +
                '                                    <strong>VÉ ' + numberTickerOne + ' : <span style="color: red">' + common_format_number(totalMoney) + 'đ</span></strong>' +
                '                            </div>' +
                '                            <div class="col text-right">' +
                '                               <a onclick="basketOmMax3DPlusCancelDonhangOne(' + oneDonhang.don_hang + ',' + numberTickerOne + ');" href="javascript:void(0)" >' +
                '                                    <i class="fa fa-trash-o" style="color: red; font-size: 14px"></i> <strong>HỦY VÉ</strong>' +
                '                               </a>' +
                '                            </div>' +
                '                    </div>' +
                '            </div>' +
                '    </div>' +
                '</div>';
    }
    
    $("#basketBodyDataAllBao").append(html);
    return basketMoneyTotalCountMega645;
}

function basketOmMax3DPlusCancelDonhangOne(idDon, tickerNo) {
    bootbox.confirm("Bạn muốn xóa vé " + tickerNo + " ?", function (result) {
        if (result) {
            var arrOmMax3DPlus = commonGetCookie("LUCKYBEST_OmMax3DPlus");
            
            if (arrOmMax3DPlus != null && arrOmMax3DPlus != "" && arrOmMax3DPlus != undefined) {
                arrOmMax3DPlus = JSON.parse(arrOmMax3DPlus);
                
                var objIndex = arrOmMax3DPlus.findIndex((o => o.don_hang == idDon));
                arrOmMax3DPlus.splice(objIndex, 1);
                
                commonSetCookie("LUCKYBEST_OmMax3DPlus", JSON.stringify(arrOmMax3DPlus));
                basketBuildDataCookie();
            }
        }
    });
}

function basketOmMax3DPlusCancelDaysoByDonhangOne(textNumber, keyVal, idDon) {
    bootbox.confirm("Xóa : " + textNumber + " ?", function (result) {
        if (result) {
            var arrOmMax3DPlus = commonGetCookie("LUCKYBEST_OmMax3DPlus");
            
            if (arrOmMax3DPlus != null && arrOmMax3DPlus != "" && arrOmMax3DPlus != undefined) {
                arrOmMax3DPlus = JSON.parse(arrOmMax3DPlus);
                
                var dataFind = arrOmMax3DPlus.find(x => x.don_hang == idDon).data;
                if (dataFind != null && dataFind.length <= 1) {
                    var objIndex = arrOmMax3DPlus.findIndex((o => o.don_hang == idDon));
                    arrOmMax3DPlus.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_OmMax3DPlus", JSON.stringify(arrOmMax3DPlus));
                    basketBuildDataCookie();
                } else {
                    var objIndex = dataFind.findIndex((o => o.key == keyVal));
                    dataFind.splice(objIndex, 1);
                    
                    commonSetCookie("LUCKYBEST_OmMax3DPlus", JSON.stringify(arrOmMax3DPlus));
                    basketBuildDataCookie();
                }
            }
        }
    });
}
//
// end build html max3DPlus
//

function basketCheckMaxPriceQuantity(currentBasketPrice) {
    var totalBasketPrice = basketBuildDataCookie()[0];
    var totalNumOfTicket = basketBuildDataCookie()[1];
    console.log("totalBasketPrice: "+totalBasketPrice);
    console.log("totalNumOfTicket: "+totalNumOfTicket);
    console.log("currentBasketPrice: "+currentBasketPrice);
    console.log(totalBasketPrice + currentBasketPrice);
    
    if (totalBasketPrice + currentBasketPrice > 48500000) {
        commonShowMessage('Giá trị giỏ hàng (sau khi cộng thêm phí) không được lớn hơn 50 triệu', 'error');
        return false;
    }
    if (totalNumOfTicket + 1 >= 21) {
        commonShowMessage('Giỏ hàng không được có hơn 20 vé', 'error');
        return false;
    }
    return true;
}