$(document).ready(function () {
    getResource(compareInit);
});
function compareInit() {
    var urlCategory = commonGetParameterByName("category");
    if (commonIsEmpty(urlCategory) != "") {
        var urlDraw = commonGetParameterByName("draw");
        var urlOrderId = commonGetParameterByName("id");
        var kenoType=commonGetParameterByName("keno");
        if (urlCategory == 5 || urlCategory == 15) { // 3D, 3D+ dung chung ket qua
            urlCategory = 4;
        }

        compareGetDataVietlott(urlCategory, urlDraw);
        compareBuildHtmlInfoByOrderId(urlOrderId,kenoType);
    }
}

function compareBackHis() {
    var urlId = commonGetParameterByName("id");
    var kenoType=commonGetParameterByName("keno");
    var orderIdMask=commonGetParameterByName("idMask");
    if (commonIsEmpty(urlId) != "") {
        var urlType = commonGetParameterByName("type");
        window.location.href = requestUrl + "/history/detail?id=" + urlId + "&type=" + urlType + "&idMask="+orderIdMask + "&keno="+kenoType;
    }
}

function compareGetDataVietlott(urlCategory, urlDraw) {
    var urlInfo = "/action/common/getDataVietlottByDraw";
    var obj = {
        category: urlCategory + "",
        draw: urlDraw + ""
    };

  //  console.log(obj);

    commonRunWaitMe($(".noselect-body"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".noselect-body"));
        var dataAll = new Array();
        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

     //   console.log(result);
     //   console.log(urlCategory);
        if (result != null) {
            dataAll = result.data;
            if (dataAll.length > 0) {
                compareBuildHtmlLogo(dataAll[0]);
                if (urlCategory == 2) {
                    compareBuildNumberHtmlMax4D(dataAll[0].listNumber);
                } else if (urlCategory == 3) {
                    compareBuildNumberHtmlPower655(dataAll[0].listNumber);
                } else if (urlCategory == 1) {
                    compareBuildNumberHtmlMega645(dataAll[0].listNumber);
                } else if (urlCategory == 4 || urlCategory == 5 || urlCategory == 15) {
                    compareBuildNumberHtmlMax3DCommon(dataAll[0].listNumber);
                } else if (urlCategory == 6) {
                    compareBuildNumberHtmlKeno(dataAll[0].listNumber);
                }
            } else {
                $("#compareBuildPriceMoney").text('');
                $("#compareBuildPriceMoneyBonus").html('');
            }
        }
    });
}

function compareBuildTextNotiCate(key) {
    var html = '';
    if (key == 3) {
        html = "KẾT QUẢ POWER 6/55";
    } else if (key == 1) {
        html = "KẾT QUẢ MEGA 6/45";
    } else if (key == 2) {
        html = "KẾT QUẢ MAX4D";
    } else if (key == 4) {
        html = "KẾT QUẢ MAX3D";
    } else if (key == 5) {
        html = "KẾT QUẢ MAX3D+";
    } else if (key == 15) {
        html = "KẾT QUẢ ÔM MAX3D+";
    } else if (key == 6) {
        html = "KẾT QUẢ KENO";
    }

    return html;
}

function compareBuildHtmlLogo(data) {
    var html = '';
 //   console.log(data);
    if (commonIsEmpty(data) != "") {
        var category = data.category;
        var drawCode = data.drawCode;
        var openDate = data.openDate;
        html = '<div class="form-row" style="border-bottom: 1px solid #cccccc; padding-bottom: 10px;">' +
                '    <div class="col-md-3">' +
                '        <img src="' + commonBuildLogoTicker(category) + '" width="80px" height="auto">' +
                '    </div>' +
                '    <div class="col text-center">' +
                '        <p style="color: red; font-weight: bold;margin-bottom: 0; font-size: 16px; padding-top: 8px;">' + compareBuildTextNotiCate(category) + '</p>' +
                '        <span style="font-size: 12px; opacity: 0.6; font-weight: bold;">Ngày ' + moment(openDate, 'DD/MM/YYYY h:mm:ss').format('DD/MM/YYYY') + ' - Kỳ ' + drawCode + '</span>' +
                '    </div>' +
                '</div>';
    }

    $("#historyBodyBuildType").html(html);
}

function compareBuildNumberNho0(num) {
    if (num < 10) {
        num = "0" + num;
    }

    return num;
}
function compareBuildNumberHtmlKeno(data) {
    var numEven =0;
    var numOdd =0;
    var numUpper =0;
    var numLower =0;
    var arrData = data.split(',');
    
  //  console.log(data);
    var html = '';
    if (commonIsEmpty(data) != "") {
        var arrData = data.split(',');
        
            for (var kk = 0; kk < 20; kk++) {
            var number = arrData[kk];
            var checkEvenOdd=number%2;
         //   console.log('number:'+number+'match:' +checkEvenOdd);
            
            if ( checkEvenOdd === 0) {
                numEven = numEven +1;
            } else if( checkEvenOdd === 1){
                numOdd= numOdd + 1;
            }
            
            if(number >0 && number <=40 ) {
                numLower = numLower+1;
            } else if (number >0 && number >40){
               numUpper = numUpper +1; 
            }
            }
            
        //    console.log('numEven:'+numEven);
         //   console.log('numOdd:'+numOdd);
         //   console.log('numUpper:'+numUpper);
          //  console.log('numLower:'+numLower);
            
        html = '<div class="form-group" style="border-bottom: 1px solid #cccccc; padding-bottom: 8px; padding-top: 8px;">' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[0]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[1]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[2]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[3]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[4]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[5]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[6]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[7]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[8]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[9]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[10]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[11]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[12]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[13]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[14]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[15]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[16]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[17]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[18]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[19]) + '</span>' +
                '     <span class="step" '+ buildKenoTaiXiu(3,numUpper) + '>LỚN: ' + numUpper + '</span>' +
                '     <span class="step" '+ buildKenoTaiXiu(4,numLower) + '>NHỎ: ' + numLower + '</span>' +
                 '    <span >|</span>' +
                '     <span class="step" '+ buildKenoTaiXiu(1,numEven) + '>CHẴN: ' + numEven + '</span>' +
                '     <span class="step" '+ buildKenoTaiXiu(2,numOdd) + '>LẺ: ' + numOdd + '</span>' +
                
                ' </div>';
    }

    $("#historyBodyBuildNumber").html(html);
}

function compareBuildNumberMax4DNho4(num) {
    if ((num.length + "") == 1) {
        num = "000" + num;
    } else if (num.length == 2) {
        num = "00" + num;
    } else if (num.length == 3) {
        num = "0" + num;
    }

    return num + "";
}
function compareBuildNumberHtmlPower655(data) {
    var html = '';
    if (commonIsEmpty(data) != "") {
        var arrData = data.split(',');
        html = '<div class="form-group" style="border-bottom: 1px solid #cccccc; padding-bottom: 10px; padding-top: 10px;">' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[0]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[1]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[2]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[3]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[4]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[5]) + '</span>' +
                '     <span class="step_ora">' + compareBuildNumberNho0(arrData[6]) + '</span>' +
                ' </div>';
    }

    $("#historyBodyBuildNumber").html(html);
}

function compareBuildNumberHtmlMega645(data) {
    var html = '';
    if (commonIsEmpty(data) != "") {
        var arrData = data.split(',');
        html = '<div class="form-group" style="border-bottom: 1px solid #cccccc; padding-bottom: 10px; padding-top: 10px;">' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[0]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[1]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[2]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[3]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[4]) + '</span>' +
                '     <span class="step">' + compareBuildNumberNho0(arrData[5]) + '</span>' +
                ' </div>';
    }

    $("#historyBodyBuildNumber").html(html);
}

function compareBuildNumberMax4DNho4(num) {
    if ((num.length + "") == 1) {
        num = "000" + num;
    } else if (num.length == 2) {
        num = "00" + num;
    } else if (num.length == 3) {
        num = "0" + num;
    }

    return num + "";
}

function compareBuildNumberHtmlMax4D(num) {
    var html = '';
    var arrData = num.split(',');

    html = '<div class="form-group" style="border-bottom: 1px solid #cccccc; padding-bottom: 10px;">';
    for (var k = 0; k < arrData.length; k++) {
        var numberOne = compareBuildNumberMax4DNho4(arrData[k]);
        var numOne1 = numberOne.slice(0, 1);
        var numOne2 = numberOne.slice(1, 2);
        var numOne3 = numberOne.slice(2, 3);
        var numOne4 = numberOne.slice(3, 4);
        if (k == 0) {
            html += '<p style="font-weight: bold; opacity: 0.7">Giải nhất</p>' +
                    '<span class="step">' + numOne1 + '</span>' +
                    '<span class="step">' + numOne2 + '</span>' +
                    '<span class="step">' + numOne3 + '</span>' +
                    '<span class="step">' + numOne4 + '</span>';
        } else if (k == 1) {
            html += '<p style="font-weight: bold; opacity: 0.7">Giải nhì</p>' +
                    '<span class="step step_gn1">' + numOne1 + '</span>' +
                    '<span class="step step_gn1">' + numOne2 + '</span>' +
                    '<span class="step step_gn1">' + numOne3 + '</span>' +
                    '<span class="step step_gn1">' + numOne4 + '</span>' +
                    '<span>|</span>';
        } else if (k == 2) {
            html += '<span class="step step_gn2" style="margin-left: 5px;">' + numOne1 + '</span>' +
                    '<span class="step step_gn2">' + numOne2 + '</span>' +
                    '<span class="step step_gn2">' + numOne3 + '</span>' +
                    '<span class="step step_gn2">' + numOne4 + '</span>';
        } else if (k == 3) {
            html += '<p style="font-weight: bold; opacity: 0.7">Giải ba</p>' +
                    '<span class="step step_gb1">' + numOne1 + '</span>' +
                    '<span class="step step_gb1">' + numOne2 + '</span>' +
                    '<span class="step step_gb1">' + numOne3 + '</span>' +
                    '<span class="step step_gb1">' + numOne4 + '</span>' +
                    '<p></p>';
        } else if (k == 4) {
            html += '<span class="step step_gb2">' + numOne1 + '</span>' +
                    '<span class="step step_gb2">' + numOne2 + '</span>' +
                    '<span class="step step_gb2">' + numOne3 + '</span>' +
                    '<span class="step step_gb2">' + numOne4 + '</span>' +
                    '<span>|</span>';
        } else if (k == 5) {
            html += '<span class="step step_gb3" style="margin-left: 5px;">' + numOne1 + '</span>' +
                    '<span class="step step_gb3">' + numOne2 + '</span>' +
                    '<span class="step step_gb3">' + numOne3 + '</span>' +
                    '<span class="step step_gb3">' + numOne4 + '</span>';
        }
    }

    var numberOne = compareBuildNumberMax4DNho4(arrData[0]);
    var numOne1 = numberOne.slice(0, 1);
    var numOne2 = numberOne.slice(1, 2);
    var numOne3 = numberOne.slice(2, 3);
    var numOne4 = numberOne.slice(3, 4);

    html += '<p></p><p style="float: left; font-weight: bold; opacity: 0.7">Giải khuyến khích 1</p>' +
            '<p style="float: right; font-weight: bold; opacity: 0.7">Giải khuyến khích 2</p>' +
            '<p></p><br><br>' +
            '<span class="step step_kk">x</span>' +
            '<span class="step step_kk">' + numOne2 + '</span>' +
            '<span class="step step_kk">' + numOne3 + '</span>' +
            '<span class="step step_kk">' + numOne4 + '</span>' +
            '<span>|</span>' +
            '<span class="step step_kk" style="margin-left: 5px;">x</span>' +
            '<span class="step step_kk">x</span>' +
            '<span class="step step_kk">' + numOne3 + '</span>' +
            '<span class="step step_kk">' + numOne4 + '</span>';


    html += '</div>';

    $("#historyBodyBuildNumber").html(html);
}

function compareBuildNumberMax3DNho3(num) {
    if ((num.length + "") == 1) {
        num = "00" + num;
    } else if (num.length == 2) {
        num = "0" + num;
    }

    return num + "";
}

function compareBuildDataArrToObjMax3DCommon(arrData) {
    var obj = {};

    if (arrData != null && arrData.length > 0) {
        obj = {
            giainhat: [arrData[0], arrData[1]],
            giainhi: [arrData[2], arrData[3], arrData[4], arrData[5]],
            giaiba: [arrData[6], arrData[7], arrData[8], arrData[9], arrData[10], arrData[11]],
            giaikhuyenkhich: [arrData[12], arrData[13], arrData[14], arrData[15], arrData[16], arrData[17], arrData[18], arrData[19]]
        };
    }

    return obj;
}

function compareBuildNumberHtmlMax3DCommon(num) {
    var html = '';
    var arrData = num.split(',');
    var objFinal = compareBuildDataArrToObjMax3DCommon(arrData);

 //   console.log(objFinal);

    var arrGiainhat = objFinal.giainhat;
    var arrGiainhi = objFinal.giainhi;
    var arrGiaiba = objFinal.giaiba;
    var arrGiaikhuyenkhich = objFinal.giaikhuyenkhich;

    html = '<div class="form-group" style="border-bottom: 1px solid #cccccc; padding-bottom: 10px;">';

    // giai nhat
    html += '<p style="font-weight: bold; opacity: 0.7; margin-bottom: 5px;">Giải nhất</p>' +
            '<span class="step3D">' + compareBuildNumberMax3DNho3(arrGiainhat[0]).slice(0, 1) + '</span>' +
            '<span class="step3D">' + compareBuildNumberMax3DNho3(arrGiainhat[0]).slice(1, 2) + '</span>' +
            '<span class="step3D">' + compareBuildNumberMax3DNho3(arrGiainhat[0]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiainhat[1]).slice(0, 1) + '</span>' +
            '<span class="step3D">' + compareBuildNumberMax3DNho3(arrGiainhat[1]).slice(1, 2) + '</span>' +
            '<span class="step3D" style="margin-right: 0;">' + compareBuildNumberMax3DNho3(arrGiainhat[1]).slice(2, 3) + '</span>';

    // giai nhi
    html += '<p style="font-weight: bold; opacity: 0.7; margin-bottom: 5px; margin-top: 5px;">Giải nhì</p>' +
            '<span class="step3D step_gn2">' + compareBuildNumberMax3DNho3(arrGiainhi[0]).slice(0, 1) + '</span>' +
            '<span class="step3D step_gn2">' + compareBuildNumberMax3DNho3(arrGiainhi[0]).slice(1, 2) + '</span>' +
            '<span class="step3D step_gn2">' + compareBuildNumberMax3DNho3(arrGiainhi[0]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_gn2" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiainhi[1]).slice(0, 1) + '</span>' +
            '<span class="step3D step_gn2">' + compareBuildNumberMax3DNho3(arrGiainhi[1]).slice(1, 2) + '</span>' +
            '<span class="step3D step_gn2">' + compareBuildNumberMax3DNho3(arrGiainhi[1]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_gn2" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiainhi[2]).slice(0, 1) + '</span>' +
            '<span class="step3D step_gn2">' + compareBuildNumberMax3DNho3(arrGiainhi[2]).slice(1, 2) + '</span>' +
            '<span class="step3D step_gn2">' + compareBuildNumberMax3DNho3(arrGiainhi[2]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_gn2" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiainhi[3]).slice(0, 1) + '</span>' +
            '<span class="step3D step_gn2">' + compareBuildNumberMax3DNho3(arrGiainhi[3]).slice(1, 2) + '</span>' +
            '<span class="step3D step_gn2" style="margin-right: 0;">' + compareBuildNumberMax3DNho3(arrGiainhi[3]).slice(2, 3) + '</span>';

    // giai ba
    html += '<p style="font-weight: bold; opacity: 0.7; margin-bottom: 5px; margin-top: 5px;">Giải ba</p>' +
            '<span class="step3D step_gb1">' + compareBuildNumberMax3DNho3(arrGiaiba[0]).slice(0, 1) + '</span>' +
            '<span class="step3D step_gb1">' + compareBuildNumberMax3DNho3(arrGiaiba[0]).slice(1, 2) + '</span>' +
            '<span class="step3D step_gb1">' + compareBuildNumberMax3DNho3(arrGiaiba[0]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_gb1" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiaiba[1]).slice(0, 1) + '</span>' +
            '<span class="step3D step_gb1">' + compareBuildNumberMax3DNho3(arrGiaiba[1]).slice(1, 2) + '</span>' +
            '<span class="step3D step_gb1">' + compareBuildNumberMax3DNho3(arrGiaiba[1]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_gb1" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiaiba[2]).slice(0, 1) + '</span>' +
            '<span class="step3D step_gb1">' + compareBuildNumberMax3DNho3(arrGiaiba[2]).slice(1, 2) + '</span>' +
            '<span class="step3D step_gb1" style="margin-right: 0;">' + compareBuildNumberMax3DNho3(arrGiaiba[2]).slice(2, 3) + '</span>' +
            '<p></p>';

    html += '<span class="step3D step_gb1" style="margin-left: 0;">' + compareBuildNumberMax3DNho3(arrGiaiba[3]).slice(0, 1) + '</span>' +
            '<span class="step3D step_gb1">' + compareBuildNumberMax3DNho3(arrGiaiba[3]).slice(1, 2) + '</span>' +
            '<span class="step3D step_gb1">' + compareBuildNumberMax3DNho3(arrGiaiba[3]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_gb1" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiaiba[4]).slice(0, 1) + '</span>' +
            '<span class="step3D step_gb1">' + compareBuildNumberMax3DNho3(arrGiaiba[4]).slice(1, 2) + '</span>' +
            '<span class="step3D step_gb1">' + compareBuildNumberMax3DNho3(arrGiaiba[4]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_gb1" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiaiba[5]).slice(0, 1) + '</span>' +
            '<span class="step3D step_gb1">' + compareBuildNumberMax3DNho3(arrGiaiba[5]).slice(1, 2) + '</span>' +
            '<span class="step3D step_gb1" style="margin-right: 0;">' + compareBuildNumberMax3DNho3(arrGiaiba[5]).slice(2, 3) + '</span>';

    // giai khuyen khich
    html += '<p style="font-weight: bold; opacity: 0.7; margin-bottom: 5px; margin-top: 5px;">Giải khuyến khích</p>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[0]).slice(0, 1) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[0]).slice(1, 2) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[0]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_kk" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[1]).slice(0, 1) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[1]).slice(1, 2) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[1]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_kk" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[2]).slice(0, 1) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[2]).slice(1, 2) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[2]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_kk" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[3]).slice(0, 1) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[3]).slice(1, 2) + '</span>' +
            '<span class="step3D step_kk" style="margin-right: 0;">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[3]).slice(2, 3) + '</span>' +
            '<p></p>';

    html += '<span class="step3D step_kk" style="margin-left: 0;">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[4]).slice(0, 1) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[4]).slice(1, 2) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[4]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_kk" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[5]).slice(0, 1) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[5]).slice(1, 2) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[5]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_kk" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[6]).slice(0, 1) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[6]).slice(1, 2) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[6]).slice(2, 3) + '</span>' +
            '<span>|</span>';

    html += '<span class="step3D step_kk" style="margin-left: 1px;">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[7]).slice(0, 1) + '</span>' +
            '<span class="step3D step_kk">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[7]).slice(1, 2) + '</span>' +
            '<span class="step3D step_kk" style="margin-right: 0;">' + compareBuildNumberMax3DNho3(arrGiaikhuyenkhich[7]).slice(2, 3) + '</span>';

    html += '</div>';

    $("#historyBodyBuildNumber").html(html);
}

function compareBuildHtmlInfoByOrderId(orderId,kenoType) {
    if (kenoType==0){
    var urlInfo = "/action/common/getDataVietlottByOrderId";
    } else if (kenoType==1) {
    var urlInfo = "/action/common/getDataKenoByOrderId";
    }
    var obj = {
        orderId: orderId
    };
    commonRunWaitMe($(".noselect-body"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".noselect-body"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

  //      console.log(result);
        if (result != null) {
            var objInfo = result.object;

            if (objInfo != null && objInfo != "" && objInfo != undefined) {

                var paperTicketId = commonGetParameterByName("paperTicketId");
                var orderIdInfo = objInfo.orderIdInfo;
                var paperTicketInfos = objInfo.paperTicketInfos;
                var blacklistInfos = paperTicketInfos[0].blacklistInfos;


                var objOneByDraw = paperTicketInfos.filter(obj => {
                    return obj.paperTicketId == paperTicketId;
                });

                //console.log(objOneByDraw);

                if (objOneByDraw != null && objOneByDraw.length == 1) {
                    var category = objOneByDraw[0].category;
                    var group = objOneByDraw[0].group;
                    var numberInfoV2s = objOneByDraw[0].numberInfoV2s;


                    $("#historyCPIdMark").text("#" + orderIdInfo.orderIdMask);

                    var html = '';

                    html += '<table style="width: 100%">' +
                            '    <tbody>';

                    html += compareBuildNumberChecked(numberInfoV2s, category, group);
                    html += historyCompareGenBlackList(category, blacklistInfos);
                    html += '     </tbody>' +
                            '</table>';

                    $("#historyBodyBuildNumberDetail").html(html);

                    compareBuildPriceMoneyBonus(numberInfoV2s, category, group);
                    compareBuildPriceMoney(numberInfoV2s, category);
                }
            }
        }
    });
}

function compareBuildNumberChecked(numberInfoV2s, category, group) {
    var html = '';

    if (numberInfoV2s != null && numberInfoV2s != "" && numberInfoV2s.length > 0) {
        for (var ck = 0; ck < numberInfoV2s.length; ck++) {
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
              //  console.log(dataVal[ckc]);
                oneNumber = commonAllBuildNumberView(category, group, oneNumber);
                
                var styleNumber = '';
                if (colorVal != 0) {
                    styleNumber = 'style="color: red"';
                }
                if (category == 15 && ckc == 1) {
                    html += '                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="step_not"  ' + styleNumber + '>' + oneNumber + '</span>';
                    html += '                                           <span class="step_not" style="margin-right: 0px;"' + styleNumber + '> &#8764 </span>';
                } else if(category == 6) {
                       if (group <=10){
                           html += '                                    <span class="step_not" ' + styleNumber + '>' + oneNumber + '</span>';
                       } else if (group ==11) {
                           if (dataVal[ckc].number==3) {
                               html += '                                <span class="step_not" ' + styleNumber + '>Lớn</span>';
                           } else if (dataVal[ckc].number==4){
                               html += '                                <span class="step_not" ' + styleNumber + '>Nhỏ</span>';
                           } else if (dataVal[ckc].number==1){
                               html += '                                <span class="step_not" ' + styleNumber + '>Chẵn</span>';
                           } else if (dataVal[ckc].number==2){
                               html += '                                <span class="step_not" ' + styleNumber + '>Lẻ</span>';
                           } 
                       }
                } else {
                    html += '                                           <span class="step_not" ' + styleNumber + '>' + oneNumber + '</span>';
                }
            }
            html += '                                 </td>';

            html += '<td style="padding-bottom: 10px; color: orange">' +
                    commonMax4DBuildToHopByGroup(category, group, dataVal[0].number) +
                    commonMax3DBuildToHopByGroup(category, group, dataVal[0].number) +
                    commonMax3DPlusBuildToHopByGroup(category, group, dataVal[0], 1) +
                    '</td>';
            html += commonMax4DBuildMoney(category, priceUnit);
            html += commonMax3DBuildMoney(category, priceUnit);
            html += commonMax3DPlusBuildMoney(category, priceUnit);
            html += commonKenoBuildMoney(category, priceUnit);

            html += '                             </tr>';
        }
    }

    return html;
}

function historyCompareGenBlackList(category, blacklistInfos) {
    var html = ''
    if (category == 15 && commonIsEmpty(blacklistInfos) != "") {
        html += '<table ><tr> <text  style="font-weight: bold;">Bộ số đã hết trong giải số ÔM: </text></tr>';
        for (var i = 0; i < blacklistInfos.length; i++) {
            var numbers = blacklistInfos[i].numbers;
            var priceUnit = blacklistInfos[i].priceUnit;
            var imageUrl = blacklistInfos[i].imageUrl;
            html += '<tr class="blackListRow"><td style="font-weight: bold;width: 5%;" class="">' + (i + 1) + '.</td>' +
                    '<td style="font-weight: bold;width: 10%;">' +
                    commonFormatNumberOmMax3D(numbers[0] + '') + '</td><td style="font-weight: bold;width: 10%;">' +
                    commonFormatNumberOmMax3D(numbers[1] + '') + '</td><td style="font-weight: bold;width: 10%;"><text style="color:red;font-weight: initial ">' + commonFormatNumber(Number(priceUnit) * 10000) + 'đ</text></td>' +
                    '<td style="font-weight: bold;width: 10%;"> <i class="fa fa-image" onclick="historyCompareShowBlackListImg(\'' + imageUrl + '\','
                    + commonFormatNumberOmMax3D(numbers[0] + '') + ','
                    + commonFormatNumberOmMax3D(numbers[1] + '') + ')" style="font-size:20px;color:red"></i></td></tr>';
        }

        html += '</table>';

    }
    return html;
}

function historyCompareShowBlackListImg(url, num1, num2) {
//    var url=blacklistInfos[i].imageUrl;
    var html = "";
    var listImg = url.split(",");
    $("#historyCompareModalBlackListImg").modal("show");
    html += '<table><tr>'
    for (var i = 0; i < listImg.length; i++) {
        html += '<td style="padding: 5px;"><img class="img-responsive" src="' + listImg[i] + '"></td>';
    }
    html += '</table></tr>';
    html += '<span>Bộ số không tính thưởng:</span><br>' +
            '<span>' + commonFormatNumberOmMax3D(num1+'') + ' &nbsp;&nbsp;&nbsp;' + commonFormatNumberOmMax3D(num2+'') + '</span>'
    $("#historyCompareModalBlackListImgBody").html(html);

}

function compareBuildPriceMoneyBonus(numberInfoV2s, category, group) {
    var html = '';
    var statusVal = 0;
    var prizeAmount1 = 0;
    if (numberInfoV2s != null && numberInfoV2s != "" && numberInfoV2s.length > 0) {
        for (var ck = 0; ck < numberInfoV2s.length; ck++) {
            var dataVal = numberInfoV2s[ck].numbers;
            var oneDate = numberInfoV2s[ck];
            var prize = oneDate.prize;
            var prizeAmount = oneDate.prizeAmount;
            var key = commonBuildABCAll(ck);
            
            if(prizeAmount >0){
               prizeAmount1 = prizeAmount;
            }
           
           for (var ckc = 0; ckc < dataVal.length; ckc++) {
                if(dataVal[ckc].status ==1){
                var statusVal = 1;
                };
            }

            if (category == 1) {
                if (group == 6) {
                    if (prize == 6) {
                        html += '<p>' + key + ' - Jackpot </p>';
                    } else if (prize == 5) {
                        html += '<p>' + key + ' - Giải nhất </p>';
                    } else if (prize == 4) {
                        html += '<p>' + key + ' - Giải nhì </p>';
                    } else if (prize == 3) {
                        html += '<p>' + key + ' - Giải ba </p>';
                    }
                } else {
                    if (prize != 0) {
                        html += '<p>' + key + ' - Bao ' + group + ' trùng ' + prize + ' số </p>';
                    }
                }
            } else if (category == 3) {
                if (group == 6) {
                    if (prize == 6 && prizeAmount == -1) {
                        html += '<p>' + key + ' - Jackpot 1 </p>';
                    } else if (prize == 6 && prizeAmount == -2) {
                        html += '<p>' + key + ' - Jackpot 2 </p>';
                    } else if (prize == 6 && prizeAmount == -3) {
                        html += '<p>' + key + ' - Jackpot 1 và Jackpot 2 </p>';
                    } else if (prize == 5) {
                        html += '<p>' + key + ' - Giải nhất </p>';
                    } else if (prize == 4) {
                        html += '<p>' + key + ' - Giải nhì </p>';
                    } else if (prize == 3) {
                        html += '<p>' + key + ' - Giải ba </p>';
                    }
                } else {
                    if (prize != 0) {
                        html += '<p>' + key + ' - Bao ' + group + ' trùng ' + prize + ' số </p>';
                    }
                }
            } else if (category == 2) {
                if (prize == -2) {
                    html += '<p>' + key + ' - Giải gộp </p>';
                } else if (prize == 1) {
                    html += '<p>' + key + ' - Giải nhất </p>';
                } else if (prize == 2) {
                    html += '<p>' + key + ' - Giải nhì </p>';
                } else if (prize == 3) {
                    html += '<p>' + key + ' - Giải ba </p>';
                } else if (prize == 4) {
                    html += '<p>' + key + ' - Khuyến khích 1 </p>';
                } else if (prize == 5) {
                    html += '<p>' + key + ' - Khuyến khích 2 </p>';
                }
            } else if (category == 4) {
                if (prize == -2) {
                    html += '<p>' + key + ' - Giải gộp </p>';
                } else if (prize == 1) {
                    html += '<p>' + key + ' - Giải nhất </p>';
                } else if (prize == 2) {
                    html += '<p>' + key + ' - Giải nhì </p>';
                } else if (prize == 3) {
                    html += '<p>' + key + ' - Giải ba </p>';
                } else if (prize == 4) {
                    html += '<p>' + key + ' - Khuyến khích </p>';
                }
            } else if (category == 5 || category == 15) {
                if (prize == -2) {
                    html += '<p>' + key + ' - Giải gộp </p>';
                } else if (prize == 1) {
                    html += '<p>' + key + ' - Giải đặc biệt </p>';
                } else if (prize == 2) {
                    html += '<p>' + key + ' - Giải nhì </p>';
                } else if (prize == 3) {
                    html += '<p>' + key + ' - Giải ba </p>';
                } else if (prize == 4) {
                    html += '<p>' + key + ' - Giải tư </p>';
                } else if (prize == 5) {
                    html += '<p>' + key + ' - Giải năm </p>';
                } else if (prize == 6) {
                    html += '<p>' + key + ' - Giải sáu </p>';
                } else if (prize == 7) {
                    html += '<p>' + key + ' - Giải bảy </p>';
                }
            } else if (category == 6 && prizeAmount >0 ) {
                if(group <=10) {
                  html += '<p>' + key + ' - Bậc ' + group + ' trùng ' + prize + ' số - '+ common_format_number((parseInt(prizeAmount)) + "", "") +'đ </p>'  
                } else if (group ==11) {
                    if (dataVal[0].number==3) {
                        html += '<p>' + key + ' - Lớn - '+ common_format_number((parseInt(prizeAmount)) + "", "") +'đ </p>'  
                    } else if(dataVal[0].number==4){
                        html += '<p>' + key + ' - Nhỏ - '+ common_format_number((parseInt(prizeAmount)) + "", "") +'đ </p>'  
                    } else if(dataVal[0].number==1){
                        html += '<p>' + key + ' - Chẵn - '+ common_format_number((parseInt(prizeAmount)) + "", "") +'đ </p>'  
                    } else if(dataVal[0].number==2){
                        html += '<p>' + key + ' - Lẻ - '+ common_format_number((parseInt(prizeAmount)) + "", "") +'đ </p>'  
                    } 
                }
                 
            }
        }
    }  
    if ( statusVal == 1 && prizeAmount1 ==0) {
                 html += '<p>'+ 'Bạn suýt trúng rồi </p>'
            }

    if (html != '') {
        $("#compareBuildPriceMoneyBonus").html(html);
    }

}

function compareBuildPriceMoney(numberInfoV2s, category) {
    var html = '';
    var prizeAmountAll = 0;
    var flagMega645 = false;
    var flagPower655T1 = false;
    var flagPower655T2 = false;
    var flagPower655T3 = false;
    if (numberInfoV2s != null && numberInfoV2s != "" && numberInfoV2s.length > 0) {
        for (var ck = 0; ck < numberInfoV2s.length; ck++) {
            var oneDate = numberInfoV2s[ck];
            var prizeAmount = oneDate.prizeAmount;

            if (category == 1) {
                if (prizeAmount == -1 && flagMega645 == false) {
                    html = 'Jackpot';
                    flagMega645 = true;
                }
            } else if (category == 3) {
                if (prizeAmount == -1 && flagPower655T3 == false && flagPower655T1 == false) {
                    if (flagPower655T2) {
                        html = 'Jackpot 1 và Jackpot 2';
                    } else {
                        html = 'Jackpot 1';
                    }

                    flagPower655T1 = true;
                } else if (prizeAmount == -2 && flagPower655T3 == false && flagPower655T2 == false) {
                    if (flagPower655T1) {
                        html = 'Jackpot 1 và Jackpot 2';
                    } else {
                        html = 'Jackpot 2';
                    }

                    flagPower655T2 = true;
                } else if (prizeAmount == -3 && flagPower655T3 == false) {
                    html = 'Jackpot 1 và Jackpot 2';
                    flagPower655T3 = true;
                }
            }

            if (prizeAmount > 0) {
                prizeAmountAll = prizeAmountAll + prizeAmount;
            }
        }
    }

    if (prizeAmountAll > 0) {
        if (html != '') {
            html = html + " + " + common_format_number(prizeAmountAll + "", "") + "đ";
        } else {
            html = common_format_number(prizeAmountAll + "", "") + "đ";
        }
    }

    if (html != '') {
        $("#compareBuildPriceMoney").text(html);
    }
}

function buildKenoTaiXiu(key,number){
   var html='';
    if(key ==1 && number >=13){
      html='style="width: 6.4em; height: 2.2em;margin-right:2px; font-size:12px; border: #00A651 solid 2px; background-color:white; color: #00A651;"';  
    } else if (key ==1 && number <13) {
      html='style="width: 6.4em; height: 2.2em;margin-right:2px; font-size:12px; border: #848484 solid 2px; background-color:white; color: #848484;"';   
    }
    
    if(key ==3 && number >=13){
      html='style="width: 6.4em; height: 2.2em;margin-right:2px; font-size:12px; border: #BE1E2D solid 2px; background-color:white; color: #BE1E2D;"';  
    } else if (key ==3 && number <13) {
      html='style="width: 6.4em; height: 2.2em;margin-right:2px; font-size:12px; border: #848484 solid 2px;background-color:white; color: #848484;"';   
    }
    
    if(key ==2 && number >=13){
      html='style="width: 6.4em; height: 2.2em;margin-right:2px; font-size:12px; border: #DD5536 solid 2px; background-color: white; color: #DD5536;"';  
    } else if (key ==2 && number <13) {
      html='style="width: 6.4em; height: 2.2em;margin-right:2px; font-size:12px;border: #848484 solid 2px;background-color:white; color: #848484;"';   
    }
    
    if(key ==4 && number >=13){
      html='style="width: 6.4em; height: 2.2em;margin-right:2px; font-size:12px; border: #27AAE1 solid 2px; background-color: white; color: #27AAE1;"';  
    } else if (key ==4 && number <13) {
      html='style="width: 6.4em; height: 2.2em;margin-right:2px; font-size:12px; border: #848484 solid 2px; background-color:white; color: #848484;"';   
    }
    
    return html;
}