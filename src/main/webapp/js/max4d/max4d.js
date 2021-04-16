$(document).ready(function () {
    getResource(max4dInit);
});

function max4dInit() {
    $('#max4dMuabao').SumoSelect({csvDispCount: 1});
//    $('#max4dMuabao')[0].sumo.selectItem(0);

    $('#max4dKymua').SumoSelect({csvDispCount: 1});

    max4dBuildKymuaService();
    max4dSelectBao();
    max4dViewAllBasket();
    max4dChangeToBuyNowBtn();
}

function max4dMuabaoBasketBack() {
    window.location.href = requestUrl + '/basket?back=max4d';
}

var max4dArrKymuaService = new Array();
function max4dBuildKymuaService() {
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
                max4dArrKymuaService = result.data;

                var countSelChecked = -1;
                var x = document.getElementById("max4dKymua");
                for (var k = 0; k < max4dArrKymuaService.length; k++) {
                    var obj = max4dArrKymuaService[k];
                    if (obj.category == 2) {
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

                $('#max4dKymua')[0].sumo.reload();
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}

var max4dArrayBaoAll = new Array();
var max4dCurrentOptSelect = 0;
function max4dSelectBao1() {
    var typeBao = $("#max4dMuabao option:selected").val();
    if (typeBao == max4dCurrentOptSelect) {
        // nếu chọn loại bao trùng với loại bao hiện tại thì ko thay đổi gì cả
    } else {
        max4dSelectBao();
    }
}
function max4dSelectBao() {
    var typeBao = $("#max4dMuabao option:selected").val();
    var html = '';

    max4dArrayBaoAll = new Array();
    $("#max4dCountAllMoney").text('0');

    if (typeBao == 1) {
        max4dCurrentOptSelect = 1;
        $("#max4dModelNumberMuabaoName").text("4D Thường");
    } else if (typeBao == 2) {
        max4dCurrentOptSelect = 2;
        $("#max4dModelNumberMuabaoName").text("4D Tổ hợp");
    } else if (typeBao == 3) {
        max4dCurrentOptSelect = 3;
        $("#max4dModelNumberMuabaoName").text("4D Bao");
    } else if (typeBao == 4) {
        max4dCurrentOptSelect = 4;
        $("#max4dModelNumberMuabaoName").text("4D Cuộn 1");
    } else if (typeBao == 5) {
        max4dCurrentOptSelect = 5;
        $("#max4dModelNumberMuabaoName").text("4D Cuộn 4");
    }

    max4dBuildBodyMainChonSoTo();

    var key = 4;
    html += '<div id="max4dCircleOrderBao' + key + '" class="max4dCircleOrderBao">';
    for (var i = 0; i < 6; i++) {
        var nameBao = commonBuildABCAll(i);
        html += '<div class="form-group">' +
                '    <div id="max4dCircleOrderBao' + key + nameBao + '" class="max4dCircle">' +
                '        <table style="width: 100%">' +
                '            <tr>' +
                '                <td><span class="key">' + nameBao + '</span></td>' +
                '                <td style="width: auto" onclick="max4dOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                '                </td>' +
                '                <td style="text-align: left; vertical-align: top;">' +
                '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="max4dBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                '                        <i class="fa fa-refresh"></i>' +
                '                    </span>' +
                '                </td>' +
                '                <td style="text-align: right; vertical-align: top;">' +
                '                    <select onchange="max4dMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="max4dMuabaoSelMoney_' + key + '_' + nameBao + '" class="max4dMuabaoSelMoney_Bg form-control input-sm">' +
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

    $("#max4dBodyAllBao").html(html);
}


function max4dBtnOnclickRandomDel(num, key_nameBao) {
    var moneyBoso = $("#max4dMuabaoSelMoney_" + key_nameBao).val();
    var flagInputHidden = $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val();
    var typeBao = $("#max4dMuabao option:selected").val();

    if (flagInputHidden == 0) {
        var valArr = new Array();

        while (valArr.length < num) {
            var randomnumber = Math.floor(Math.random() * 10);
            if (typeBao == 2 || typeBao == 3) {
                if (valArr.length == 3) {
                    if ((valArr[0] == valArr[1]) && (valArr[0] == valArr[2]) && (valArr[0] == randomnumber)) {
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

        max4dUpdateDataBaoTicker(objNew, "update");

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

        max4dUpdateDataBaoTicker(objNew, "delete");

        $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val(0);
        $("#idSelectedSpanBong__Key_Btn_" + key_nameBao).html('<i class="fa fa-refresh"></i>');
    }

    max4dCountMoneyBaoTicker();
}

function max4dBtnOnclickRandomModalAll() {
    max4dBtnOnclickRandomModalDel();

    var num = 4;
    var typeBao = $("#max4dMuabao option:selected").val();

    var valArr = new Array();
    while (valArr.length < num) {
        var randomnumber = Math.floor(Math.random() * 10);
        if (typeBao == 2 || typeBao == 3) {
            if (valArr.length == 3) {
                if (valArr[0] == valArr[1] == valArr[2] == randomnumber) {
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

function max4dBtnOnclickRandomModalDel() {
    for (var kk = 0; kk <= 9; kk++) {
        for (var ky = 1; ky <= 4; ky++) {
            var docId = $("#idModalSelectedSpanBong_All_" + kk + "_" + ky);
            $(docId).removeClass('otron_checked');
            $(docId).css('background-color', 'white');
            $(docId).css('color', 'black');
        }
    }
}

function max4dUpdateDataBaoTicker(obj, flag) {
    if (obj != null) {
        var objIndex = max4dArrayBaoAll.findIndex((o => o.key == obj.key));
        if (flag == 'update') {
            if (objIndex != -1) {
                max4dArrayBaoAll[objIndex].money = obj.money;
                max4dArrayBaoAll[objIndex].value = obj.value;
            } else {
                max4dArrayBaoAll.push(obj);
            }
        } else if (flag == 'delete') {
            var objIndex = max4dArrayBaoAll.findIndex((o => o.key == obj.key));
            max4dArrayBaoAll.splice(objIndex, 1);
        }
    }
}

function max4dCountMoneyBaoTicker() {
    var arrKymuaSel = $('#max4dKymua').val();
    if (arrKymuaSel == null) {
        arrKymuaSel = new Array();
    }

    var typeBao = $("#max4dMuabao option:selected").val();

    var giaFinal = 0;
    for (var k = 0; k < max4dArrayBaoAll.length; k++) {
        var obj = max4dArrayBaoAll[k];
        var giaveBao = commonMax4dDefaultMoneyBao(typeBao, obj.value);
        var giaveOne = arrKymuaSel.length * (giaveBao * obj.money);

        giaFinal = giaFinal + giaveOne;
    }

    $("#max4dCountAllMoney").text(common_format_number(giaFinal + "", ""));
}

function max4dSelectKymuaChange() {
    max4dCountMoneyBaoTicker();
}

function max4dBtnToChonnhanh() {
    var indexOf = 6;
    var key = 4;
    for (var k = 0; k < indexOf; k++) {
        var nameBao = commonBuildABCAll(k);
        var valIdHidden = $("#idSelectedSpanBong__Key_Input_Hidden_" + key + "_" + nameBao).val();
        if (valIdHidden == 0) {
            max4dBtnOnclickRandomDel(key + "", (key + "_" + nameBao));
            break;
        }
    }
}

function max4dBuildBodyMainChonSoTo() {
    var html = '';
    var typeBao = $("#max4dMuabao option:selected").val();

    for (var k = 0; k <= 9; k++) {
        html += '<div class="form-row">' +
                '    <div class="col">';
        if (typeBao == 4) {
            html += '        <span style="border: #dddddd solid 1px;" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_1">*</span>';
        } else {
            html += '        <span onclick="max4dModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_1">' + k + '</span>';
        }
        html += '    </div>' +
                '    <div class="col">' +
                '        <span onclick="max4dModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_2">' + k + '</span>' +
                '    </div>' +
                '    <div class="col">' +
                '        <span onclick="max4dModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_3">' + k + '</span>' +
                '    </div>' +
                '    <div class="col">';
        if (typeBao == 5) {
            html += '        <span style="border: #dddddd solid 1px;" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_4">*</span>';
        } else {
            html += '        <span onclick="max4dModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_4">' + k + '</span>';
        }
        html += '    </div>' +
                '</div>';
    }

    $("#max4dModelMainBuildNumberOtron").html(html);
}

function max4dBuildBodyMainChonSoClickMoneyBtn(doc) {
    if (!$(doc).hasClass('btn-danger')) {
        $(".max4dModelNumberRadioMoney").removeClass('btn-danger');
        $(".max4dModelNumberRadioMoney").addClass('btn-default');

        $(doc).addClass('btn-danger');
    }
}

function max4dOpenModalNumber(key_bao) {
    var typeBao = $("#max4dMuabao option:selected").val();

    $("#max4dModelNumberRowKey").text(key_bao.slice(2, 3));
    $("#max4dModelKeybaoHidden").val(key_bao);
    for (var kk = 1; kk <= 4; kk++) {
        for (var ky = 0; ky <= 9; ky++) {
            var docId = $("#idModalSelectedSpanBong_All_" + ky + "_" + kk);
            $(docId).removeClass('otron_checked');
            $(docId).css('background-color', 'white');
            $(docId).css('color', 'black');
        }
    }

    var flagRandomHid = $("#idSelectedSpanBong__Key_Input_Hidden_" + key_bao).val();
    if (flagRandomHid == 1) {
        var obj = max4dArrayBaoAll.filter(x => x.key == key_bao);
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

    var moneySel = $("#max4dMuabaoSelMoney_" + key_bao + " option:selected").val();
    var btnModalMoney = $("#max4dBuildBodyMainChonSoClickMoneyBtn_" + moneySel);
    max4dBuildBodyMainChonSoClickMoneyBtn(btnModalMoney);

    $("#max4dModelNumber").modal('show');
}

function max4dModalBodyClickOtron(doc) {
    if (!$(doc).hasClass('otron_checked')) {
        var idDoc = $(doc).prop('id');
        var key = idDoc.slice(-1, 31);
        var eleId = idDoc.slice(0, 30);
        var typeBao = $("#max4dMuabao option:selected").val();

        var flagNextExt = true;
        if (typeBao == 2 || typeBao == 3) {
            for (var ck = 1; ck <= 4; ck++) {
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

function max4dMuabaoSelMoneyOnchane(val, key_nameBao) {
    var objIndex = max4dArrayBaoAll.findIndex((o => o.key == key_nameBao));
    if (objIndex != -1) {
        max4dArrayBaoAll[objIndex].money = val;
        max4dCountMoneyBaoTicker();
    }
}

function max4dModalBtnChonsoSubmit() {
    var arrBosoNew = new Array();
    var moneyBoso = 0;
    var typeBao = $("#max4dMuabao option:selected").val();

    for (var kk = 1; kk <= 4; kk++) {
        for (var ky = 0; ky <= 9; ky++) {
            var docId = $("#idModalSelectedSpanBong_All_" + ky + "_" + kk);
            if ($(docId).hasClass('otron_checked')) {
                arrBosoNew.push(parseInt(docId.attr("name")));
                break;
            }
        }
    }

    if (typeBao == 4) {
        if (arrBosoNew.length < 3) {
            commonShowMessage('Bạn phải chọn đúng 3 số <br> (Bạn đang chọn ' + arrBosoNew.length + ' số)', 'error');
            return;
        } else if (arrBosoNew.length == 3) {
            arrBosoNew.unshift(0);
        }
    } else if (typeBao == 5) {
        if (arrBosoNew.length < 3) {
            commonShowMessage('Bạn phải chọn đúng 3 số <br> (Bạn đang chọn ' + arrBosoNew.length + ' số)', 'error');
            return;
        } else if (arrBosoNew.length == 3) {
            arrBosoNew.push(0);
        }
    } else {
        if (arrBosoNew.length != 4) {
            commonShowMessage('Bạn phải chọn đúng 4 số <br> (Bạn đang chọn ' + arrBosoNew.length + ' số)', 'error');
            return;
        }
    }

    var keyBaoHid = $("#max4dModelKeybaoHidden").val();
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

    $(".max4dModelNumberRadioMoney").each(function () {
        if ($(this).hasClass('btn-danger')) {
            var idBtnAct = $(this).prop('id');
            var numMoney = idBtnAct.replace("max4dBuildBodyMainChonSoClickMoneyBtn_", "");
            $("#max4dMuabaoSelMoney_" + keyBaoHid).val(numMoney);
            moneyBoso = numMoney;
        }
    });

    var objNew = {
        key: keyBaoHid,
        money: moneyBoso,
        value: arrBosoNew
    };

    max4dUpdateDataBaoTicker(objNew, "update");
    max4dCountMoneyBaoTicker();

    var flagRandomHid = $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val();
    if (flagRandomHid == 0) {
        $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val(1);
        $("#idSelectedSpanBong__Key_Btn_" + keyBaoHid).html('<i class="fa fa-trash-o"></i>');
    }

    $("#max4dModelNumber").modal('hide');
}

function max4dViewAllBasket() {
    var allSizeBasket = 0;
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

    var arrBulk = commonGetCookie("LUCKYBEST_Bulk");
    if (arrBulk != null && arrBulk != "" && arrBulk != undefined) {
        arrBulk = JSON.parse(arrBulk);

        allSizeBasket += arrBulk.length;
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

    $("#max4dMuabaoBasketNumberTotal").text(allSizeBasket);

    return allSizeBasket;
}

function max4dBtnAddBasket() {
    if (max4dArrayBaoAll.length > 0) {
        var sizeAllBasketBefore = max4dViewAllBasket();
        var flagErr = max4dCommonAddBaoCookie();
        var sizeAllBasketAfter = max4dViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');
            max4dChangeToBuyNowBtn();
            return true;
        } else if (flagErr && (sizeAllBasketAfter == sizeAllBasketBefore)) {
            commonShowMessage('Giỏ hàng đã đầy, vui lòng thanh toán', 'error');
            return false;
        }
    } else {
        commonShowMessage('Bạn chưa chọn bộ số nào', 'error');
        return false;
    }
}

function max4dBtnAddBasketThenPay() {
    if (max4dArrayBaoAll.length > 0) {
        var max4dcurrentBasketPrice = $("#max4dCountAllMoney").text();
        max4dcurrentBasketPrice = Number(max4dcurrentBasketPrice.split(".").join(""));
//        if (max4dcurrentBasketPrice < 20000) {
//            commonShowMessage('Vui lòng mua thêm, đơn hàng tối thiểu 20.000đ', 'error');
//            return false;
//        }
        var sizeAllBasketBefore = max4dViewAllBasket();
        var flagErr = max4dCommonAddBaoCookie();
        var sizeAllBasketAfter = max4dViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');
            max4dChangeToBuyNowBtn();
            return true;
        } else if (flagErr && (sizeAllBasketAfter == sizeAllBasketBefore)) {
            commonShowMessage('Giỏ hàng đã đầy, vui lòng thanh toán', 'error');
            return false;
        }
    } else {
        commonShowMessage('Bạn chưa chọn bộ số nào', 'error');
        return false;
    }
}

function max4dCommonAddBaoCookie() {
    var max_key = 0;

    var arrMax4D = commonGetCookie("LUCKYBEST_Max4D");
    if (arrMax4D != null && arrMax4D != "" && arrMax4D != undefined) {
        arrMax4D = JSON.parse(arrMax4D);
        console.log(arrMax4D);
        jQuery.map(arrMax4D, function (obj) {
            if (obj.don_hang > max_key)
                max_key = obj.don_hang;
        });
    } else {
        arrMax4D = new Array();
    }

    var arrKymuaSel = $('#max4dKymua').val();
    if (arrKymuaSel == null) {
        commonShowMessage('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }
    
    var max4dCurrentBasketPrice = $("#max4dCountAllMoney").text();
    max4dCurrentBasketPrice = Number(max4dCurrentBasketPrice.split(".").join(""));
    if (!basketCheckMaxPriceQuantity(max4dCurrentBasketPrice)) {
        return false;
    }

    var arrSelDataKymua = max4dArrKymuaService.filter(function (obj) {
        var checkF = jQuery.inArray(obj.drawCode, arrKymuaSel);
        if (checkF != -1 && obj.category == 2) {
            return obj;
        }
    });

    var typeBao = $("#max4dMuabao option:selected").val();

    var obj_donhang = {
        don_hang: (max_key + 1),
        loai_bao: typeBao + "",
        arr_ky_mua: arrSelDataKymua,
        data: max4dArrayBaoAll
    };

    arrMax4D.push(obj_donhang);
    commonSetCookie("LUCKYBEST_Max4D", JSON.stringify(arrMax4D));

    max4dViewAllBasket();

    $('#max4dMuabao')[0].sumo.selectItem(0);
    max4dSelectBao();

    return true;
}


function max4dBtnBuyNow() {

    var arrKymuaSel = $('#max4dKymua').val();
    if (arrKymuaSel == null) {
        commonShowMessage('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }

    if ($("#max4dMuabaoBasketNumberTotal").text() == '0') {
        if (max4dBtnAddBasketThenPay()) {
            window.location.href = requestUrl + '/receive';
        }

    } else {
        window.location.href = requestUrl + '/basket?back=max4d';
    }
}

function max4dChangeToBuyNowBtn() {
    if ($("#max4dMuabaoBasketNumberTotal").text() == '0') {
        $('button[onclick="max4dBtnBuyNow();"]').text("MUA NGAY");
    } else {
        $('button[onclick="max4dBtnBuyNow();"]').text("XEM GIỎ HÀNG");
    }
}