$(document).ready(function () {
    getResource(max3dInit);
});

function max3dInit() {
    $('#max3dMuabao').SumoSelect({csvDispCount: 1});
//    $('#max3dMuabao')[0].sumo.selectItem(0);

    $('#max3dKymua').SumoSelect({csvDispCount: 1});

    max3dBuildKymuaService();
    max3dSelectBao();
    max3dViewAllBasket();
    max3dChangeToBuyNowBtn();
}

function max3dMuabaoBasketBack() {
    window.location.href = requestUrl + '/basket?back=max3d';
}

var max3dArrKymuaService = new Array();
function max3dBuildKymuaService() {
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
                max3dArrKymuaService = result.data;

                var countSelChecked = -1;
                var x = document.getElementById("max3dKymua");
                for (var k = 0; k < max3dArrKymuaService.length; k++) {
                    var obj = max3dArrKymuaService[k];
                    if (obj.category == 4) {
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

                $('#max3dKymua')[0].sumo.reload();
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}

var max3dArrayBaoAll = new Array();
var max3dCurrentOptSelect = 0;
function max3dSelectBao1() {

    var typeBao = $("#max3dMuabao option:selected").val();
    if (typeBao == max3dCurrentOptSelect) {
        // nếu chọn loại bao trùng với loại bao hiện tại thì ko thay đổi gì cả
    } else {
        max3dSelectBao();
    }
}

function max3dSelectBao() {
    var html = '';
    var typeBao = $("#max3dMuabao option:selected").val();
    max3dArrayBaoAll = new Array();
    $("#max3dCountAllMoney").text('0');

    if (typeBao == 1) {
        max3dCurrentOptSelect = 1;
        $("#max3dModelNumberMuabaoName").text("3D Thường");
    } else if (typeBao == 2) {
        max3dCurrentOptSelect = 2;
        $("#max3dModelNumberMuabaoName").text("3D Tổ hợp");
    } else if (typeBao == 3) {
        max3dCurrentOptSelect = 3;
        $("#max3dModelNumberMuabaoName").text("3D Bao");
    } else if (typeBao == 4) {
        max3dCurrentOptSelect = 4;
        $("#max3dModelNumberMuabaoName").text("3D Cuộn 1");
    } else if (typeBao == 5) {
        max3dCurrentOptSelect = 5;
        $("#max3dModelNumberMuabaoName").text("3D Cuộn 4");
    }

    max3dBuildBodyMainChonSoTo();

    var key = 3;
    html += '<div id="max3dCircleOrderBao' + key + '" class="max3dCircleOrderBao">';
    for (var i = 0; i < 4; i++) {
        var nameBao = commonBuildABCAll(i);
        html += '<div class="form-group">' +
                '    <div id="max3dCircleOrderBao' + key + nameBao + '" class="max3dCircle">' +
                '        <table style="width: 100%">' +
                '            <tr>' +
                '                <td><span class="key">' + nameBao + '</span></td>' +
                '                <td style="width: auto" onclick="max3dOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                '                </td>' +
                '                <td style="text-align: left; vertical-align: top;">' +
                '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="max3dBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                '                        <i class="fa fa-refresh"></i>' +
                '                    </span>' +
                '                </td>' +
                '                <td style="text-align: right; vertical-align: top;">' +
                '                    <select onchange="max3dMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="max3dMuabaoSelMoney_' + key + '_' + nameBao + '" class="max3dMuabaoSelMoney_Bg form-control input-sm">' +
                '                        <option value="1" selected>10K</option>' +
                '                        <option value="2">20K</option>' +
                '                        <option value="5">50K</option>' +
                '                        <option value="10">100K</option>' +
                '                        <option value="20">200K</option>' +
                '                        <option value="50">500K</option>' +
                '                        <option value="100">1000K</option>' +
                '                    </select>' +
                '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                '                </td>' +
                '            </tr>' +
                '        </table>' +
                '    </div>' +
                '</div>';
    }
    html += '</div>';

    $("#max3dBodyAllBao").html(html);
}

function max3dBtnOnclickRandomDel(num, key_nameBao) {
    var moneyBoso = $("#max3dMuabaoSelMoney_" + key_nameBao).val();
    var flagInputHidden = $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val();
    var typeBao = $("#max3dMuabao option:selected").val();

    if (flagInputHidden == 0) {
        var valArr = new Array();

        while (valArr.length < num) {
            var randomnumber = Math.floor(Math.random() * 10);
            if (typeBao == 2 || typeBao == 3) {
                if (valArr.length == 2) {
                    if ((valArr[0] == valArr[1]) && (valArr[0] == randomnumber)) {
                    } else {
                        valArr[valArr.length] = randomnumber;
                    }
                } else {
                    valArr[valArr.length] = randomnumber;
                }
            } else {
                valArr[valArr.length] = randomnumber;
            }
        }

        //valArr = commonSortNumberArr(valArr);

        for (var k = 0; k < num; k++) {
            var numberRd = valArr[k];

            if (typeBao == 4) {
                if (k > 0) {
                    $('#idSelectedSpanBong_' + key_nameBao + "_" + (k + 1)).text(numberRd);
                } else {
                    $('#idSelectedSpanBong_' + key_nameBao + "_" + (k + 1)).text("*");
                }
            } else if (typeBao == 5) {
                if (k < 3) {
                    $('#idSelectedSpanBong_' + key_nameBao + "_" + (k + 1)).text(numberRd);
                } else {
                    $('#idSelectedSpanBong_' + key_nameBao + "_" + (k + 1)).text("*");
                }
            } else {
                $('#idSelectedSpanBong_' + key_nameBao + "_" + (k + 1)).text(numberRd);
            }
        }

        var objNew = {
            key: key_nameBao,
            money: moneyBoso,
            value: valArr
        };

        max3dUpdateDataBaoTicker(objNew, "update");

        $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val(1);
        $("#idSelectedSpanBong__Key_Btn_" + key_nameBao).html('<i class="fa fa-trash-o"></i>');
    } else {
        for (var k = 0; k < num; k++) {
            $('#idSelectedSpanBong_' + key_nameBao + "_" + (k + 1)).html('&nbsp;');
        }

        var objNew = {
            key: key_nameBao,
            money: moneyBoso,
            value: new Array()
        };

        max3dUpdateDataBaoTicker(objNew, "delete");

        $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val(0);
        $("#idSelectedSpanBong__Key_Btn_" + key_nameBao).html('<i class="fa fa-refresh"></i>');
    }

    max3dCountMoneyBaoTicker();
}

function max3dBtnOnclickRandomModalAll() {
    max3dBtnOnclickRandomModalDel();

    var num = 3;
    var typeBao = $("#max3dMuabao option:selected").val();

    var valArr = new Array();
    while (valArr.length < num) {
        var randomnumber = Math.floor(Math.random() * 10);
        if (typeBao == 2 || typeBao == 3) {
            if (valArr.length == 2) {
                if (valArr[0] == valArr[1] == randomnumber) {
                } else {
                    valArr[valArr.length] = randomnumber;
                }
            } else {
                valArr[valArr.length] = randomnumber;
            }
        } else {
            valArr[valArr.length] = randomnumber;
        }
    }

    //valArr = commonSortNumberArr(valArr);

    for (var k = 0; k < valArr.length; k++) {
        var numberRd = valArr[k];

        var docId = $("#idModalSelectedSpanBong_All_" + numberRd + "_" + (k + 1));
        $(docId).addClass('otron_checked');

        if (typeBao == 4) {
            if (k > 0) {
                $(docId).css('background-color', 'red');
                $(docId).css('color', 'white');
            }
        } else if (typeBao == 5) {
            if (k < 2) {
                $(docId).css('background-color', 'red');
                $(docId).css('color', 'white');
            }
        } else {
            $(docId).css('background-color', 'red');
            $(docId).css('color', 'white');
        }
    }
}

function max3dBtnOnclickRandomModalDel() {
    for (var kk = 0; kk <= 9; kk++) {
        for (var ky = 1; ky <= 3; ky++) {
            var docId = $("#idModalSelectedSpanBong_All_" + kk + "_" + ky);
            $(docId).removeClass('otron_checked');
            $(docId).css('background-color', 'white');
            $(docId).css('color', 'black');
        }
    }
}

function max3dUpdateDataBaoTicker(obj, flag) {
    if (obj != null) {
        var objIndex = max3dArrayBaoAll.findIndex((o => o.key == obj.key));
        if (flag == 'update') {
            if (objIndex != -1) {
                max3dArrayBaoAll[objIndex].money = obj.money;
                max3dArrayBaoAll[objIndex].value = obj.value;
            } else {
                max3dArrayBaoAll.push(obj);
            }
        } else if (flag == 'delete') {
            var objIndex = max3dArrayBaoAll.findIndex((o => o.key == obj.key));
            max3dArrayBaoAll.splice(objIndex, 1);
        }
    }
}

function max3dCountMoneyBaoTicker() {
    var arrKymuaSel = $('#max3dKymua').val();
    if (arrKymuaSel == null) {
        arrKymuaSel = new Array();
    }

    var typeBao = $("#max3dMuabao option:selected").val();

    var giaFinal = 0;
    for (var k = 0; k < max3dArrayBaoAll.length; k++) {
        var obj = max3dArrayBaoAll[k];
        var giaveBao = commonMax3dDefaultMoneyBao(typeBao, obj.value);
        var giaveOne = arrKymuaSel.length * (giaveBao * obj.money);

        giaFinal = giaFinal + giaveOne;
    }

    $("#max3dCountAllMoney").text(common_format_number(giaFinal + "", ""));
}

function max3dSelectKymuaChange() {
    max3dCountMoneyBaoTicker();
}

function max3dBtnToChonnhanh() {
    var indexOf = 4;
    var key = 3;
    for (var k = 0; k < indexOf; k++) {
        var nameBao = commonBuildABCAll(k);
        var valIdHidden = $("#idSelectedSpanBong__Key_Input_Hidden_" + key + "_" + nameBao).val();
        if (valIdHidden == 0) {
            max3dBtnOnclickRandomDel(key + "", (key + "_" + nameBao));
            break;
        }
    }
}

function max3dBuildBodyMainChonSoTo() {
    var html = '';
    var typeBao = $("#max3dMuabao option:selected").val();

    for (var k = 0; k <= 9; k++) {
        html += '<div class="form-row">' +
                '    <div class="col">';
        if (typeBao == 4) {
            html += '        <span style="border: #dddddd solid 1px;" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_1">*</span>';
        } else {
            html += '        <span onclick="max3dModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_1">' + k + '</span>';
        }
        html += '    </div>' +
                '    <div class="col">' +
                '        <span onclick="max3dModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_2">' + k + '</span>' +
                '    </div>' +
                '    <div class="col">';
        if (typeBao == 5) {
            html += '        <span style="border: #dddddd solid 1px;" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_3">*</span>';
        } else {
            html += '        <span onclick="max3dModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_3">' + k + '</span>';
        }
        html += '    </div>' +
                '</div>';
    }

    $("#max3dModelMainBuildNumberOtron").html(html);
}

function max3dBuildBodyMainChonSoClickMoneyBtn(doc) {
    if (!$(doc).hasClass('btn-danger')) {
        $(".max3dModelNumberRadioMoney").removeClass('btn-danger');
        $(".max3dModelNumberRadioMoney").addClass('btn-default');

        $(doc).addClass('btn-danger');
    }
}

function max3dOpenModalNumber(key_bao) {
    var typeBao = $("#max3dMuabao option:selected").val();

    $("#max3dModelNumberRowKey").text(key_bao.slice(2, 3));
    $("#max3dModelKeybaoHidden").val(key_bao);
    for (var kk = 1; kk <= 3; kk++) {
        for (var ky = 0; ky <= 9; ky++) {
            var docId = $("#idModalSelectedSpanBong_All_" + ky + "_" + kk);
            $(docId).removeClass('otron_checked');
            $(docId).css('background-color', 'white');
            $(docId).css('color', 'black');
        }
    }

    var flagRandomHid = $("#idSelectedSpanBong__Key_Input_Hidden_" + key_bao).val();
    if (flagRandomHid == 1) {
        var obj = max3dArrayBaoAll.filter(x => x.key == key_bao);
        if (obj != null && obj.length > 0) {
            var arrVal = obj[0].value;

            for (var k = 0; k < arrVal.length; k++) {
                var numberFor = arrVal[k];

                var docId = $("#idModalSelectedSpanBong_All_" + numberFor + "_" + (k + 1));
                $(docId).addClass('otron_checked');

                if (typeBao == 4) {
                    if (k > 0) {
                        $(docId).css('background-color', 'red');
                        $(docId).css('color', 'white');
                    }
                } else if (typeBao == 5) {
                    if (k < 3) {
                        $(docId).css('background-color', 'red');
                        $(docId).css('color', 'white');
                    }
                } else {
                    $(docId).css('background-color', 'red');
                    $(docId).css('color', 'white');
                }
            }
        }
    }

    var moneySel = $("#max3dMuabaoSelMoney_" + key_bao + " option:selected").val();
    var btnModalMoney = $("#max3dBuildBodyMainChonSoClickMoneyBtn_" + moneySel);
    max3dBuildBodyMainChonSoClickMoneyBtn(btnModalMoney);

    $("#max3dModelNumber").modal('show');
}

function max3dModalBodyClickOtron(doc) {
    if (!$(doc).hasClass('otron_checked')) {
        var idDoc = $(doc).prop('id');
        var key = idDoc.slice(-1, 31);
        var eleId = idDoc.slice(0, 30);
        var typeBao = $("#max3dMuabao option:selected").val();

        var flagNextExt = true;
        if (typeBao == 2 || typeBao == 3) {
            for (var ck = 1; ck <= 3; ck++) {
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

function max3dMuabaoSelMoneyOnchane(val, key_nameBao) {
    var objIndex = max3dArrayBaoAll.findIndex((o => o.key == key_nameBao));
    if (objIndex != -1) {
        max3dArrayBaoAll[objIndex].money = val;
        max3dCountMoneyBaoTicker();
    }
}

function max3dModalBtnChonsoSubmit() {
    var arrBosoNew = new Array();
    var moneyBoso = 0;
    var typeBao = $("#max3dMuabao option:selected").val();

    for (var kk = 1; kk <= 3; kk++) {
        for (var ky = 0; ky <= 9; ky++) {
            var docId = $("#idModalSelectedSpanBong_All_" + ky + "_" + kk);
            if ($(docId).hasClass('otron_checked')) {
                arrBosoNew.push(parseInt(docId.attr("name")));
                break;
            }
        }
    }

    if (typeBao == 4) {
        if (arrBosoNew.length < 2) {
            commonShowMessage('Bạn phải chọn đúng 2 số <br> (Bạn đang chọn ' + arrBosoNew.length + ' số)', 'error');
            return;
        } else if (arrBosoNew.length == 2) {
            arrBosoNew.unshift(0);
        }
    } else if (typeBao == 5) {
        if (arrBosoNew.length < 2) {
            commonShowMessage('Bạn phải chọn đúng 2 số <br> (Bạn đang chọn ' + arrBosoNew.length + ' số)', 'error');
            return;
        } else if (arrBosoNew.length == 2) {
            arrBosoNew.push(0);
        }
    } else {
        if (arrBosoNew.length != 3) {
            commonShowMessage('Bạn phải chọn đúng 3 số <br> (Bạn đang chọn ' + arrBosoNew.length + ' số)', 'error');
            return;
        }
    }

    var keyBaoHid = $("#max3dModelKeybaoHidden").val();
    for (var k = 0; k < arrBosoNew.length; k++) {
        var numFor = arrBosoNew[k];

        if (typeBao == 4) {
            if (k > 0) {
                $("#idSelectedSpanBong_" + keyBaoHid + "_" + (k + 1)).text(numFor);
            } else {
                $("#idSelectedSpanBong_" + keyBaoHid + "_" + (k + 1)).text("*");
            }
        } else if (typeBao == 5) {
            if (k < 3) {
                $("#idSelectedSpanBong_" + keyBaoHid + "_" + (k + 1)).text(numFor);
            } else {
                $("#idSelectedSpanBong_" + keyBaoHid + "_" + (k + 1)).text("*");
            }
        } else {
            $("#idSelectedSpanBong_" + keyBaoHid + "_" + (k + 1)).text(numFor);
        }
    }

    $(".max3dModelNumberRadioMoney").each(function () {
        if ($(this).hasClass('btn-danger')) {
            var idBtnAct = $(this).prop('id');
            var numMoney = idBtnAct.replace("max3dBuildBodyMainChonSoClickMoneyBtn_", "");
            $("#max3dMuabaoSelMoney_" + keyBaoHid).val(numMoney);
            moneyBoso = numMoney;
        }
    });

    var objNew = {
        key: keyBaoHid,
        money: moneyBoso,
        value: arrBosoNew
    };

    max3dUpdateDataBaoTicker(objNew, "update");
    max3dCountMoneyBaoTicker();

    var flagRandomHid = $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val();
    if (flagRandomHid == 0) {
        $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val(1);
        $("#idSelectedSpanBong__Key_Btn_" + keyBaoHid).html('<i class="fa fa-trash-o"></i>');
    }

    $("#max3dModelNumber").modal('hide');
}

function max3dViewAllBasket() {
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

    $("#max3dMuabaoBasketNumberTotal").text(allSizeBasket);

    return allSizeBasket;
}

function max3dBtnAddBasket() {
    if (max3dArrayBaoAll.length > 0) {
        var sizeAllBasketBefore = max3dViewAllBasket();
        var flagErr = max3dCommonAddBaoCookie();
        var sizeAllBasketAfter = max3dViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');
            max3dChangeToBuyNowBtn();
            return true;
        } else if (flagErr && (sizeAllBasketAfter >= sizeAllBasketBefore)) {
            commonShowMessage('Giỏ hàng đã đầy, vui lòng thanh toán', 'error');
            return false;
        }
    } else {
        commonShowMessage('Bạn chưa chọn bộ số nào', 'error');
        return false;
    }
}
function max3dBtnAddBasketThenPay() {
    if (max3dArrayBaoAll.length > 0) {
        var max3dcurrentBasketPrice = $("#max3dCountAllMoney").text();
        max3dcurrentBasketPrice = Number(max3dcurrentBasketPrice.split(".").join(""));
//        if (max3dcurrentBasketPrice < 20000) {
//            commonShowMessage('Vui lòng mua thêm, đơn hàng tối thiểu 20.000đ', 'error');
//            return false;
//        }
        var sizeAllBasketBefore = max3dViewAllBasket();
        var flagErr = max3dCommonAddBaoCookie();
        var sizeAllBasketAfter = max3dViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');
            max3dChangeToBuyNowBtn();
            return true;
        } else if (flagErr && (sizeAllBasketAfter >= sizeAllBasketBefore)) {
            commonShowMessage('Giỏ hàng đã đầy, vui lòng thanh toán', 'error');
            return false;
        }
    } else {
        commonShowMessage('Bạn chưa chọn bộ số nào', 'error');
        return false;
    }
}

function max3dCommonAddBaoCookie() {
    var max_key = 0;

    var arrMax3D = commonGetCookie("LUCKYBEST_Max3D");
    if (arrMax3D != null && arrMax3D != "" && arrMax3D != undefined) {
        arrMax3D = JSON.parse(arrMax3D);

        jQuery.map(arrMax3D, function (obj) {
            if (obj.don_hang > max_key)
                max_key = obj.don_hang;
        });
    } else {
        arrMax3D = new Array();
    }

    var arrKymuaSel = $('#max3dKymua').val();
    if (arrKymuaSel == null) {
        commonShowMessage('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }
    var max3dCurrentBasketPrice = $("#max3dCountAllMoney").text() + '';
//    console.log(max3dCurrentBasketPrice);
    max3dCurrentBasketPrice = Number(max3dCurrentBasketPrice.split(".").join(""));
    if (!basketCheckMaxPriceQuantity(max3dCurrentBasketPrice)) {
        return false;
    }

    var arrSelDataKymua = max3dArrKymuaService.filter(function (obj) {
        var checkF = jQuery.inArray(obj.drawCode, arrKymuaSel);
        if (checkF != -1 && obj.category == 4) {
            return obj;
        }
    });

    var typeBao = $("#max3dMuabao option:selected").val();

    var obj_donhang = {
        don_hang: (max_key + 1),
        loai_bao: typeBao + "",
        arr_ky_mua: arrSelDataKymua,
        data: max3dArrayBaoAll
    };

    arrMax3D.push(obj_donhang);
    commonSetCookie("LUCKYBEST_Max3D", JSON.stringify(arrMax3D));

    max3dViewAllBasket();

    $('#max3dMuabao')[0].sumo.selectItem(0);
    max3dSelectBao();

    return true;
}

function max3dBtnBuyNow() {
    var arrKymuaSel = $('#max3dKymua').val();
    if (arrKymuaSel == null) {
        commonShowMessage('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }

    if ($("#max3dMuabaoBasketNumberTotal").text() == '0') {
        if (max3dBtnAddBasketThenPay()) {
            window.location.href = requestUrl + '/receive';
        }
    } else {
        window.location.href = requestUrl + '/basket?back=max3d';
    }
}

function max3dChangeToBuyNowBtn() {
    if ($("#max3dMuabaoBasketNumberTotal").text() == '0') {
        $('button[onclick="max3dBtnBuyNow();"]').text("MUA NGAY");
    } else {
        $('button[onclick="max3dBtnBuyNow();"]').text("XEM GIỎ HÀNG");
    }
}