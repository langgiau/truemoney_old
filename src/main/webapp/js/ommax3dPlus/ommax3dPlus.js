$(document).ready(function () {
    getResource(ommax3dPlusInit);
});

function ommax3dPlusInit() {
    $('#ommax3dPlusMuabao').SumoSelect({csvDispCount: 1});
//    $('#ommax3dPlusMuabao')[0].sumo.selectItem(0);

    $('#ommax3dPlusKymua').SumoSelect({csvDispCount: 1});

    ommax3dPlusBuildKymuaService();
    ommax3dPlusFillNumber();
    ommax3dPlusViewAllBasket();
    ommax3dPlusChangeToBuyNowBtn();
}

function ommax3dPlusMuabaoBasketBack() {
    window.location.href = requestUrl + '/basket?back=ommax3dplus';
}

var ommax3dPlusArrKymuaService = [];

function ommax3dPlusBuildKymuaService() {
    var urlInfo = "/action/common/getConfigQsmtInfos";
    var obj = {};

    commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-group"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

        if (result != null) {
            if (result.code == 0) {
                ommax3dPlusArrKymuaService = result.data;

                var countSelChecked = -1;
                var x = document.getElementById("ommax3dPlusKymua");
                for (var k = 0; k < ommax3dPlusArrKymuaService.length; k++) {
                    var obj = ommax3dPlusArrKymuaService[k];
                    if (obj.category == 5) {
                        countSelChecked++;
                        var option = document.createElement("option");
                        option.value = obj.drawCode;
                        option.text = "Kỳ #" + obj.drawCode + " - " + moment(obj.openDate, 'DD/MM/YYYY').locale('vi').format('llll');

                        if (countSelChecked == 0) {
                            option.selected = true;
                        }
                        x.add(option);
                    }
                }

                $('#ommax3dPlusKymua')[0].sumo.reload();
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}

var ommax3dPlusArrayBaoAll = [];
var ommax3dPlusCurrentOptSelect = 0;

function ommax3dPlusFillNumber1() {

    var typeBao = $("#ommax3dPlusMuabao option:selected").val();

    if (typeBao == ommax3dPlusCurrentOptSelect) {
        // nếu chọn loại bao trùng với loại bao hiện tại thì ko thay đổi gì cả
    } else {
        ommax3dPlusFillNumber();
    }
}

function ommax3dPlusFillNumber(mode) {

    ommax3dPlusBuildBodyMainChonSoTo();
    if (mode == "reset") {
        $("#ommax3dPlusCountAllMoney").text("0");
        $("#ommax3dPlusCountAllMoneyHid").val(0);
        $("#ommax3dPlusCircleOrderBao6").html("");
    } else {
        var stc = $("#ommax3dPlusStcHid").val();
        var OgsFrom = $("#ommax3dPlusOgsFromHid").val();
        var OgsTo = $("#ommax3dPlusOgsToHid").val();

        if (commonIsEmpty(stc).length > 1 && commonIsEmpty(OgsFrom).length > 1 && commonIsEmpty(OgsTo).length > 1) {
            var html = "";
            var key = 6;
            html += '<div id="ommax3dPlusCircleOrderBao' + key + '" class="ommax3dPlusCircleOrderBao">'
                    + '<table style="width:100%" >';

            var numberOfBoSo = Number(OgsTo) - Number(OgsFrom) + 1;

            for (var i = 0; i <= numberOfBoSo; ) {

                html += '<tr>';
                for (var j = 0; j < 4; j++) {
                    var number = Number(OgsFrom) + i;
                    if (number <= OgsTo) {
                        html += '<td class="text-center">' + stc + ' ' + commonFormatNumberOmMax3D(number + "") + '</td>'
                    } else {
                        html += '<td class="text-center"></td>'
                    }
                    i++;
                }
                html += '</tr>'
            }
            html += '</table></div>';
            $("#ommax3dPlusBodyAllBao").html(html);
            ommax3dPlusCountMoney(numberOfBoSo);
        }
    }
}

function ommax3dPlusCountMoney(numberOfBoSo) {
    var totalMoney = 0;
    var arrKymuaSel = $('#ommax3dPlusKymua').val();

    switch ($('#ommax3dPlusDongia').val() + "") {
        case "1":
            totalMoney = numberOfBoSo * 10000;
            break;
        case "2":
            totalMoney = numberOfBoSo * 20000;
            break;
        case "5":
            totalMoney = numberOfBoSo * 50000;
            break;
        case "10":
            totalMoney = numberOfBoSo * 100000;
            break;
        case "20":
            totalMoney = numberOfBoSo * 200000;
            break;
    }
    $("#ommax3dPlusCountAllMoney").text(commonFormatNumberMoney(totalMoney * arrKymuaSel.length));
    $("#ommax3dPlusCountAllMoneyHid").val(totalMoney * arrKymuaSel.length);
}


function ommax3dPlusBtnOnclickRandomDel() {
    var textForStc = Math.floor(Math.random() * 1000) + "";
    console.log(textForStc.length);

    $("#ommax3dPlusStc").text(commonFormatNumberOmMax3D(textForStc));
    $("#ommax3dPlusStcHid").val(commonFormatNumberOmMax3D(textForStc));
    ommax3dPlusFillNumber();
}


function ommax3dPlusUpdateDataBaoTicker(obj, flag) {
    if (obj != null) {
        var objIndex = ommax3dPlusArrayBaoAll.findIndex((o => o.key == obj.key));
        if (flag == 'update') {
            if (objIndex != -1) {
                ommax3dPlusArrayBaoAll[objIndex].money = obj.money;
                ommax3dPlusArrayBaoAll[objIndex].value = obj.value;
            } else {
                ommax3dPlusArrayBaoAll.push(obj);
            }
        } else if (flag == 'delete') {
            var objIndex = ommax3dPlusArrayBaoAll.findIndex((o => o.key == obj.key));
            ommax3dPlusArrayBaoAll.splice(objIndex, 1);
        }
    }
}

function ommax3dPlusCountMoneyBaoTicker() {
    var arrKymuaSel = $('#ommax3dPlusKymua').val();
    if (arrKymuaSel == null) {
        arrKymuaSel = [];
    }

    var typeBao = $("#ommax3dPlusMuabao option:selected").val();

    var giaFinal = 0;
    for (var k = 0; k < ommax3dPlusArrayBaoAll.length; k++) {
        var obj = ommax3dPlusArrayBaoAll[k];
        var giaveBao = commonMax3dPlusDefaultMoneyBao(typeBao, obj.value);
        var giaveOne = arrKymuaSel.length * (giaveBao * obj.money);

        giaFinal = giaFinal + giaveOne;
    }

    $("#ommax3dPlusCountAllMoney").text(common_format_number(giaFinal + "", ""));
    $("#ommax3dPlusCountAllMoneyHid").val(common_format_number(giaFinal + "", ""));
}

function ommax3dPlusSelectKymuaChange() {
    ommax3dPlusCountMoneyBaoTicker();
    ommax3dPlusFillNumber();
}


function ommax3dPlusBuildBodyMainChonSoTo() {
    var html = '';
    var typeBao = $("#ommax3dPlusMuabao option:selected").val();

    html += '<div class="form-row" style="padding-bottom: 0;">';
    html += '    <div class="col" style="padding-right: 5px; padding-left: 0; text-align: center;">';

    for (var k = 0; k <= 9; k++) {
        html += '   <div class="form-row" style="padding-bottom: 0;">';

        html += '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="ommax3dPlusModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_1">' + k + '</span>' +
                '       </div>' +
                '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="ommax3dPlusModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_2">' + k + '</span>' +
                '       </div>' +
                '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="ommax3dPlusModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_3">' + k + '</span>' +
                '       </div>';

        html += '   </div>';
    }

    html += '    </div>';

    var html2 = '    <div class="ommax3dPlusDivBorderModal"></div>';

    html2 += '    <div class="col" style="padding-right: 0; padding-left: 10px; text-align: center;">';

    for (var ck = 0; ck <= 9; ck++) {
        html2 += '   <div class="form-row" style="padding-bottom: 0;">';

        html2 += '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="ommax3dPlusModalBodyClickOtron(this);" name="' + ck + '" class="step_sel" id="idModalSelectedSpanBong_All_' + ck + '_4">' + ck + '</span>' +
                '       </div>' +
                '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="ommax3dPlusModalBodyClickOtron(this);" name="' + ck + '" class="step_sel" id="idModalSelectedSpanBong_All_' + ck + '_5">' + ck + '</span>' +
                '       </div>' +
                '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="ommax3dPlusModalBodyClickOtron(this);" name="' + ck + '" class="step_sel" id="idModalSelectedSpanBong_All_' + ck + '_6">' + ck + '</span>' +
                '       </div>';

        html2 += '   </div>';
    }

    html2 += '    </div>';


    var htmlForOgs = html + html2 + "</div>";
    var htmlForStc = html.replace(/ommax3dPlusModalBodyClickOtron/g, "ommax3dPlusModalBodyClickOtronStc").replace(/idModalSelectedSpanBong/g, "idModalSelectedSpanBongStc") + "</div>";

    $("#ommax3dPlusModelMainBuildNumberOtronStc").html(htmlForStc);

    $("#ommax3dPlusModelMainBuildNumberOtronOgs").html(htmlForOgs);
}


function ommax3dPlusOpenModalNumber() {

    for (var k = 0; k <= 9; k++) {
        for (var key = 1; key <= 6; key++) {
            $("#idModalSelectedSpanBong_All_" + k + "_" + key).removeClass('otron_checked');
            $("#idModalSelectedSpanBong_All_" + k + "_" + key).css('background-color', 'white');
            $("#idModalSelectedSpanBong_All_" + k + "_" + key).css('color', 'black');
        }
    }

    var stFrom = $("#ommax3dPlusOgsFromHid").val();
    var stTo = $("#ommax3dPlusOgsToHid").val();

    $("#idModalSelectedSpanBong_All_" + stFrom.charAt(0) + "_1").addClass('otron_checked').css({
        'color': 'white',
        'background-color': 'red'
    });
    $("#idModalSelectedSpanBong_All_" + stFrom.charAt(1) + "_2").addClass('otron_checked').css({
        'color': 'white',
        'background-color': 'red'
    });
    $("#idModalSelectedSpanBong_All_" + stFrom.charAt(2) + "_3").addClass('otron_checked').css({
        'color': 'white',
        'background-color': 'red'
    });
    $("#idModalSelectedSpanBong_All_" + stTo.charAt(0) + "_4").addClass('otron_checked').css({
        'color': 'white',
        'background-color': 'red'
    });
    $("#idModalSelectedSpanBong_All_" + stTo.charAt(1) + "_5").addClass('otron_checked').css({
        'color': 'white',
        'background-color': 'red'
    });
    $("#idModalSelectedSpanBong_All_" + stTo.charAt(2) + "_6").addClass('otron_checked').css({
        'color': 'white',
        'background-color': 'red'
    });
    $("#ommax3dPlusModelNumber").modal('show');
}


function ommax3dPlusOpenModalNumberStc() {
    for (var k = 0; k <= 9; k++) {
        for (var key = 1; key <= 3; key++) {
            $("#idModalSelectedSpanBongStc_All_" + k + "_" + key).removeClass('otron_checked');
            $("#idModalSelectedSpanBongStc_All_" + k + "_" + key).css('background-color', 'white');
            $("#idModalSelectedSpanBongStc_All_" + k + "_" + key).css('color', 'black');
        }
    }

    var stStc = $("#ommax3dPlusStcHid").val();


    $("#idModalSelectedSpanBongStc_All_" + stStc.charAt(0) + "_1").addClass('otron_checked').css({
        'color': 'white',
        'background-color': 'red'
    });
    $("#idModalSelectedSpanBongStc_All_" + stStc.charAt(1) + "_2").addClass('otron_checked').css({
        'color': 'white',
        'background-color': 'red'
    });
    $("#idModalSelectedSpanBongStc_All_" + stStc.charAt(2) + "_3").addClass('otron_checked').css({
        'color': 'white',
        'background-color': 'red'
    });

    $("#ommax3dPlusModelNumberStc").modal('show');
}

function ommax3dPlusModalBodyClickOtron(doc) {
    if (!$(doc).hasClass('otron_checked')) {
        var idDoc = $(doc).prop('id');
        var key = idDoc.slice(-1, 31);
        var eleId = idDoc.slice(0, 30);
        var typeBao = $("#ommax3dPlusMuabao option:selected").val();
        var flagNextExt = true;
        if (typeBao == 2 || typeBao == 3) {
            for (var ck = 1; ck <= 6; ck++) {
                if (ck != key) {
                    if ($('#' + eleId + ck).hasClass('otron_checked')) {
                        flagNextExt = false;
                    } else {
                        flagNextExt = true;
                        break;
                    }
                }
            }
        }

        if (flagNextExt) {
            for (var k = 0; k <= 9; k++) {
                $("#idModalSelectedSpanBong_All_" + k + "_" + key).removeClass('otron_checked');
                $("#idModalSelectedSpanBong_All_" + k + "_" + key).css('background-color', 'white');
                $("#idModalSelectedSpanBong_All_" + k + "_" + key).css('color', 'black');
            }

            $(doc).addClass('otron_checked');
            $(doc).css('background-color', 'red');
            $(doc).css('color', 'white');
        }
    }
}

function ommax3dPlusModalBodyClickOtronStc(doc) {
    if (!$(doc).hasClass('otron_checked')) {
        var idDoc = $(doc).prop('id');
        var key = idDoc.slice(-1, 34);
        var eleId = idDoc.slice(0, 33);
        var typeBao = $("#ommax3dPlusMuabao option:selected").val();
        var flagNextExt = true;
        if (flagNextExt) {
            for (var k = 0; k <= 9; k++) {
                $("#idModalSelectedSpanBongStc_All_" + k + "_" + key).removeClass('otron_checked');
                $("#idModalSelectedSpanBongStc_All_" + k + "_" + key).css('background-color', 'white');
                $("#idModalSelectedSpanBongStc_All_" + k + "_" + key).css('color', 'black');
            }

            $(doc).addClass('otron_checked');
            $(doc).css('background-color', 'red');
            $(doc).css('color', 'white');
        }
    }
}

function ommax3dPlusModalBtnSubmitStc() {
    var arrBosoNewStc = [];


    for (var kk = 1; kk <= 3; kk++) {
        for (var ky = 0; ky <= 9; ky++) {
            var docId = $("#ommax3dPlusModelMainBuildNumberOtronStc").find("#idModalSelectedSpanBongStc_All_" + ky + "_" + kk);
            if ($(docId).hasClass('otron_checked')) {
                arrBosoNewStc.push(parseInt(docId.attr("name")));
                break;
            }
        }
    }
    if (arrBosoNewStc.length < 3) {
        commonShowMessage('Bạn phải chọn đúng 3 số <br> (Bạn đang chọn ' + arrBosoNewStc.length + ' số)', 'error');
        return;
    } else if (arrBosoNewStc.length == 3) {
        arrBosoNewStc.unshift(0);
    }
    var textForStc = '';
    for (var k = 0; k < arrBosoNewStc.length; k++) {
        var numFor = arrBosoNewStc[k];
        textForStc += numFor;

    }
    $("#ommax3dPlusStc").text(textForStc.slice(1, 4));
    $("#ommax3dPlusStcHid").val(textForStc.slice(1, 4));

    $("#ommax3dPlusModelNumberStc").modal('hide');
    ommax3dPlusFillNumber();

}

function ommax3dPlusModalBtnChonsoSubmit() {
    var arrBosoNew = [];
    for (var kk = 1; kk <= 6; kk++) {
        for (var ky = 0; ky <= 9; ky++) {
            var docId = $("#idModalSelectedSpanBong_All_" + ky + "_" + kk);
            if ($(docId).hasClass('otron_checked')) {
                arrBosoNew.push(parseInt(docId.attr("name")));

                break;
            }
        }
    }
    if (arrBosoNew.length != 6) {
        commonShowMessage('Bạn phải chọn đúng 6 số <br> (Bạn đang chọn ' + arrBosoNew.length + ' số)', 'error');
        return;
    }

    var numTextView1 = '';
    var numTextView2 = '';
    for (var k = 0; k < arrBosoNew.length; k++) {
        var numFor = arrBosoNew[k];

        if (k < 3) {
            numTextView1 += numFor;
        } else {
            numTextView2 += numFor;
        }
    }
    if (Number(numTextView1) + 9 > Number(numTextView2)) {
        $("#ommax3dPlusModalBtnChonsoSubmitNoti").text("Bạn phải đặt tối thiểu 10 vé");
        return;
    } else {
        $("#ommax3dPlusModalBtnChonsoSubmitNoti").text("");
    }

    $("#ommax3dPlusOgsFrom").text(numTextView1);
    $("#ommax3dPlusOgsTo").text(numTextView2);
    $("#ommax3dPlusOgsFromHid").val(numTextView1);
    $("#ommax3dPlusOgsToHid").val(numTextView2);

    $("#ommax3dPlusModelNumber").modal('hide');
    ommax3dPlusFillNumber();
}

function ommax3dPlusViewAllBasket() {
    var allSizeBasket = 0;

    var arrBulk = commonGetCookie("LUCKYBEST_Bulk");
    if (arrBulk != null && arrBulk != "" && arrBulk != undefined) {
        arrBulk = JSON.parse(arrBulk);

        allSizeBasket += arrBulk.length;
    }

    var arrPower655 = commonGetCookie("LUCKYBEST_Power655");
    if (arrPower655 != null && arrPower655 != "" && arrPower655 != undefined) {
        arrPower655 = JSON.parse(arrPower655);

        allSizeBasket += arrPower655.length;
    }

    var arrMega645 = commonGetCookie("LUCKYBEST_Mega645");
    if (arrMega645 != null && arrMega645 != "" && arrMega645 != undefined) {
        arrMega645 = JSON.parse(arrMega645);

        allSizeBasket += arrMega645.length;
    }

    var arrMax4D = commonGetCookie("LUCKYBEST_Max4D");
    if (arrMax4D != null && arrMax4D != "" && arrMax4D != undefined) {
        arrMax4D = JSON.parse(arrMax4D);

        allSizeBasket += arrMax4D.length;
    }

    var arrMax3D = commonGetCookie("LUCKYBEST_Max3D");
    if (arrMax3D != null && arrMax3D != "" && arrMax3D != undefined) {
        arrMax3D = JSON.parse(arrMax3D);

        allSizeBasket += arrMax3D.length;
    }

    var arrMax3DPlus = commonGetCookie("LUCKYBEST_Max3DPlus");
    if (arrMax3DPlus != null && arrMax3DPlus != "" && arrMax3DPlus != undefined) {
        arrMax3DPlus = JSON.parse(arrMax3DPlus);

        allSizeBasket += arrMax3DPlus.length;
    }

    var arrOmMax3DPlus = commonGetCookie("LUCKYBEST_OmMax3DPlus");
    if (arrOmMax3DPlus != null && arrOmMax3DPlus != "" && arrOmMax3DPlus != undefined) {
        arrOmMax3DPlus = JSON.parse(arrOmMax3DPlus);

        allSizeBasket += arrOmMax3DPlus.length;
    }

    $("#ommax3dPlusMuabaoBasketNumberTotal").text(allSizeBasket);

    return allSizeBasket;
}

function ommax3dPlusBtnAddBasket() {
    var stc = $("#ommax3dPlusStcHid").val();
    var OgsFrom = $("#ommax3dPlusOgsFromHid").val();
    var OgsTo = $("#ommax3dPlusOgsToHid").val();
    if (commonIsEmpty(stc).length > 1 && commonIsEmpty(OgsFrom).length > 1 && commonIsEmpty(OgsTo).length > 1) {
        var sizeAllBasketBefore = ommax3dPlusViewAllBasket();
        var flagErr = ommax3dPlusCommonAddBaoCookie();
        var sizeAllBasketAfter = ommax3dPlusViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');

            ommax3dPlusChangeToBuyNowBtn();
            $("#ommax3dPlusStcHid").val("");
            $("#ommax3dPlusOgsFromHid").val("");
            $("#ommax3dPlusOgsToHid").val("");
            $("#ommax3dPlusStc").html("&nbsp;");
            $("#ommax3dPlusOgsFrom").html("&nbsp;");
            $("#ommax3dPlusOgsTo").html("&nbsp;");
            ommax3dPlusFillNumber("reset");
            return true;
        } else if (flagErr && (sizeAllBasketAfter == sizeAllBasketBefore)) {
            commonShowMessage('Giỏ hàng đã đầy, vui lòng thanh toán', 'error');
            return false;
        }
    } else {
        commonShowMessage('Bạn chưa chọn đủ bộ số', 'error');
        return false;
    }


}

function ommax3dPlusBtnAddBasketThenPay() {
    var ommax3dPluscurrentBasketPrice = $("#ommax3dPlusCountAllMoneyHid").val();
    ommax3dPluscurrentBasketPrice = Number(ommax3dPluscurrentBasketPrice.split(".").join(""));
//    if (ommax3dPluscurrentBasketPrice < 20000) {
//        commonShowMessage('Vui lòng mua thêm, đơn hàng tối thiểu 20.000đ', 'error');
//        return false;
//    }
    var stc = $("#ommax3dPlusStcHid").val();
    var OgsFrom = $("#ommax3dPlusOgsFromHid").val();
    var OgsTo = $("#ommax3dPlusOgsToHid").val();
    if (commonIsEmpty(stc).length > 1 && commonIsEmpty(OgsFrom).length > 1 && commonIsEmpty(OgsTo).length > 1) {

        var sizeAllBasketBefore = ommax3dPlusViewAllBasket();
        var flagErr = ommax3dPlusCommonAddBaoCookie();
        var sizeAllBasketAfter = ommax3dPlusViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');

            ommax3dPlusChangeToBuyNowBtn();

            return true;
        } else if (flagErr && (sizeAllBasketAfter == sizeAllBasketBefore)) {
            commonShowMessage('Giỏ hàng đã đầy, vui lòng thanh toán', 'error');
            return false;
        }
    } else {
        commonShowMessage('Bạn chưa chọn đủ bộ số', 'error');
        return false;
    }
}

function ommax3dPlusCommonAddBaoCookie() {
    var max_key = 0;

    var arrOmMax3DPlus = commonGetCookie("LUCKYBEST_OmMax3DPlus");
    if (arrOmMax3DPlus != null && arrOmMax3DPlus != "" && arrOmMax3DPlus != undefined) {
        arrOmMax3DPlus = JSON.parse(arrOmMax3DPlus);

        jQuery.map(arrOmMax3DPlus, function (obj) {
            if (obj.don_hang > max_key)
                max_key = obj.don_hang;
        });
    } else {
        arrOmMax3DPlus = [];
    }

    var arrKymuaSel = $('#ommax3dPlusKymua').val();
    if (arrKymuaSel == null) {
        commonShowMessage('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }

    var ommax3dPlusCurrentBasketPrice = $("#ommax3dPlusCountAllMoneyHid").val();
    ommax3dPlusCurrentBasketPrice = Number(ommax3dPlusCurrentBasketPrice.split(".").join(""));
    if (!basketCheckMaxPriceQuantity(ommax3dPlusCurrentBasketPrice)) {
        return false;
    }

    var arrSelDataKymua = ommax3dPlusArrKymuaService.filter(function (obj) {
        var checkF = jQuery.inArray(obj.drawCode, arrKymuaSel);
        if (checkF != -1 && obj.category == 5) {
            return obj;
        }
    });

    var typeBao = $("#ommax3dPlusDongia option:selected").val();

    var objBoSo = {
        soTuChon: $("#ommax3dPlusStcHid").val(),
        giaiSoFrom: $("#ommax3dPlusOgsFromHid").val(),
        giaiSoTo: $("#ommax3dPlusOgsToHid").val(),
    };

    var obj_donhang = {
        don_hang: (max_key + 1),
        loai_bao: typeBao + "",
        arr_ky_mua: arrSelDataKymua,
        data: objBoSo,
        totalMoney: $("#ommax3dPlusCountAllMoneyHid").val(),
    };

    arrOmMax3DPlus.push(obj_donhang);
    commonSetCookie("LUCKYBEST_OmMax3DPlus", JSON.stringify(arrOmMax3DPlus));
    console.log(JSON.stringify(arrOmMax3DPlus));
    ommax3dPlusViewAllBasket();

//    $('#ommax3dPlusDongia')[0].sumo.selectItem(0);
    ommax3dPlusFillNumber();

    return true;
}

function ommax3dPlusBtnBuyNow() {
    if ($("#ommax3dPlusMuabaoBasketNumberTotal").text() == '0') {
        if (ommax3dPlusBtnAddBasketThenPay()) {
            window.location.href = requestUrl + '/receive';
        }
    } else {
        window.location.href = requestUrl + '/basket?back=ommax3dplus';
    }
}

function ommax3dPlusChangeToBuyNowBtn() {
    if ($("#ommax3dPlusMuabaoBasketNumberTotal").text() == '0') {
        $('button[onclick="ommax3dPlusBtnBuyNow();"]').text("MUA NGAY");
    } else {
        $('button[onclick="ommax3dPlusBtnBuyNow();"]').text("XEM GIỎ HÀNG");
    }
}