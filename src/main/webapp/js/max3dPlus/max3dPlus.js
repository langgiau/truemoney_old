$(document).ready(function () {
    getResource(max3dPlusInit);
});

function max3dPlusInit() {
    $('#max3dPlusMuabao').SumoSelect({csvDispCount: 1});
//    $('#max3dPlusMuabao')[0].sumo.selectItem(0);

    $('#max3dPlusKymua').SumoSelect({csvDispCount: 1});

    max3dPlusBuildKymuaService();
    max3dPlusSelectBao();
    max3dPlusViewAllBasket();
    max3dPlusChangeToBuyNowBtn();
}

function max3dPlusMuabaoBasketBack() {
    window.location.href = requestUrl + '/basket?back=max3dplus';
}

var max3dPlusArrKymuaService = new Array();
function max3dPlusBuildKymuaService() {
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
                max3dPlusArrKymuaService = result.data;

                var countSelChecked = -1;
                var x = document.getElementById("max3dPlusKymua");
                for (var k = 0; k < max3dPlusArrKymuaService.length; k++) {
                    var obj = max3dPlusArrKymuaService[k];
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

                $('#max3dPlusKymua')[0].sumo.reload();
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}

var max3dPlusArrayBaoAll = new Array();
var max3dPlusCurrentOptSelect = 0;
function max3dPlusSelectBao1() {

    var typeBao = $("#max3dPlusMuabao option:selected").val();

    if (typeBao == max3dPlusCurrentOptSelect) {
        // nếu chọn loại bao trùng với loại bao hiện tại thì ko thay đổi gì cả
    } else {
        max3dPlusSelectBao();
    }
}
function max3dPlusSelectBao() {
    var html = '';
    var typeBao = $("#max3dPlusMuabao option:selected").val();
    max3dPlusArrayBaoAll = new Array();
    $("#max3dPlusCountAllMoney").text('0');

    if (typeBao == 1) {
        max3dPlusCurrentOptSelect = 1;
        $("#max3dPlusModelNumberMuabaoName").text("3D+ Cơ bản");
    } else if (typeBao == 2) {
        max3dPlusCurrentOptSelect = 2;
        $("#max3dPlusModelNumberMuabaoName").text("3D+ Tổ hợp");
    } else if (typeBao == 3) {
        max3dPlusCurrentOptSelect = 3;
        $("#max3dPlusModelNumberMuabaoName").text("3D+ Bao");
    } else if (typeBao == 4) {
        max3dPlusCurrentOptSelect = 4;
        $("#max3dPlusModelNumberMuabaoName").text("3D+ Cuộn 1");
    } else if (typeBao == 5) {
        max3dPlusCurrentOptSelect = 5;
        $("#max3dPlusModelNumberMuabaoName").text("3D+ Cuộn 3");
    }

    max3dPlusBuildBodyMainChonSoTo();

    var key = 6;
    html += '<div id="max3dPlusCircleOrderBao' + key + '" class="max3dPlusCircleOrderBao">';
    for (var i = 0; i < 4; i++) {
        var nameBao = commonBuildABCAll(i);
        html += '<div class="form-group">' +
                '    <div id="max3dPlusCircleOrderBao' + key + nameBao + '" class="max3dPlusCircle">' +
                '        <table style="width: 100%">' +
                '            <tr>' +
                '                <td><span class="key">' + nameBao + '</span></td>' +
                '                <td style="width: auto" onclick="max3dPlusOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                '                </td>' +
                '                <td style="text-align: left; vertical-align: top;">' +
                '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="max3dPlusBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                '                        <i class="fa fa-refresh"></i>' +
                '                    </span>' +
                '                </td>' +
                '                <td style="text-align: right; vertical-align: top;">' +
                '                    <select onchange="max3dPlusMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="max3dPlusMuabaoSelMoney_' + key + '_' + nameBao + '" class="max3dPlusMuabaoSelMoney_Bg form-control input-sm">' +
                '                        <option value="1" selected>10K</option>' +
                '                        <option value="2">20K</option>' +
                '                        <option value="5">50K</option>' +
                '                        <option value="10">100K</option>' +
                '                        <option value="20">200K</option>' +
                //'                        <option value="50" hidden>500K</option>' +
                //'                        <option value="100" hidden>1000K</option>' +
                '                    </select>' +
                '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                '                </td>' +
                '            </tr>' +
                '        </table>' +
                '    </div>' +
                '</div>';
    }
    html += '</div>';

    $("#max3dPlusBodyAllBao").html(html);
}

function max3dPlusBtnOnclickRandomDel(num, key_nameBao) {
    var moneyBoso = $("#max3dPlusMuabaoSelMoney_" + key_nameBao).val();
    var flagInputHidden = $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val();
    var typeBao = $("#max3dPlusMuabao option:selected").val();

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

        var numTextView1 = '';
        var numTextView2 = '';
        for (var k = 0; k < num; k++) {
            var numberRd = valArr[k];

            if (k < 3) {
                numTextView1 += numberRd;
            } else {
                numTextView2 += numberRd;
            }
        }

        $('#idSelectedSpanBong_' + key_nameBao + "_1").text(numTextView1);
        $('#idSelectedSpanBong_' + key_nameBao + "_2").text(numTextView2);

        var objNew = {
            key: key_nameBao,
            money: moneyBoso,
            value: valArr
        };

        max3dPlusUpdateDataBaoTicker(objNew, "update");

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

        max3dPlusUpdateDataBaoTicker(objNew, "delete");

        $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val(0);
        $("#idSelectedSpanBong__Key_Btn_" + key_nameBao).html('<i class="fa fa-refresh"></i>');
    }

    max3dPlusCountMoneyBaoTicker();
}

function max3dPlusBtnOnclickRandomModalAll() {
    max3dPlusBtnOnclickRandomModalDel();

    var num = 6;
    var typeBao = $("#max3dPlusMuabao option:selected").val();

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

function max3dPlusBtnOnclickRandomModalDel() {
    for (var kk = 0; kk <= 9; kk++) {
        for (var ky = 1; ky <= 6; ky++) {
            var docId = $("#idModalSelectedSpanBong_All_" + kk + "_" + ky);
            $(docId).removeClass('otron_checked');
            $(docId).css('background-color', 'white');
            $(docId).css('color', 'black');
        }
    }
}

function max3dPlusUpdateDataBaoTicker(obj, flag) {
    if (obj != null) {
        var objIndex = max3dPlusArrayBaoAll.findIndex((o => o.key == obj.key));
        if (flag == 'update') {
            if (objIndex != -1) {
                max3dPlusArrayBaoAll[objIndex].money = obj.money;
                max3dPlusArrayBaoAll[objIndex].value = obj.value;
            } else {
                max3dPlusArrayBaoAll.push(obj);
            }
        } else if (flag == 'delete') {
            var objIndex = max3dPlusArrayBaoAll.findIndex((o => o.key == obj.key));
            max3dPlusArrayBaoAll.splice(objIndex, 1);
        }
    }
}

function max3dPlusCountMoneyBaoTicker() {
    var arrKymuaSel = $('#max3dPlusKymua').val();
    if (arrKymuaSel == null) {
        arrKymuaSel = new Array();
    }

    var typeBao = $("#max3dPlusMuabao option:selected").val();

    var giaFinal = 0;
    for (var k = 0; k < max3dPlusArrayBaoAll.length; k++) {
        var obj = max3dPlusArrayBaoAll[k];
        var giaveBao = commonMax3dPlusDefaultMoneyBao(typeBao, obj.value);
        var giaveOne = arrKymuaSel.length * (giaveBao * obj.money);

        giaFinal = giaFinal + giaveOne;
    }

    $("#max3dPlusCountAllMoney").text(common_format_number(giaFinal + "", ""));
}

function max3dPlusSelectKymuaChange() {
    max3dPlusCountMoneyBaoTicker();
}

function max3dPlusBtnToChonnhanh() {
    var indexOf = 4;
    var key = 6;
    for (var k = 0; k < indexOf; k++) {
        var nameBao = commonBuildABCAll(k);
        var valIdHidden = $("#idSelectedSpanBong__Key_Input_Hidden_" + key + "_" + nameBao).val();
        if (valIdHidden == 0) {
            max3dPlusBtnOnclickRandomDel(key + "", (key + "_" + nameBao));
            break;
        }
    }
}

function max3dPlusBuildBodyMainChonSoTo() {
    var html = '';
    var typeBao = $("#max3dPlusMuabao option:selected").val();

    html += '<div class="form-row" style="padding-bottom: 0;">';
    html += '    <div class="col" style="padding-right: 5px; padding-left: 0; text-align: center;">';

    for (var k = 0; k <= 9; k++) {
        html += '   <div class="form-row" style="padding-bottom: 0;">';

        html += '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="max3dPlusModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_1">' + k + '</span>' +
                '       </div>' +
                '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="max3dPlusModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_2">' + k + '</span>' +
                '       </div>' +
                '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="max3dPlusModalBodyClickOtron(this);" name="' + k + '" class="step_sel" id="idModalSelectedSpanBong_All_' + k + '_3">' + k + '</span>' +
                '       </div>';

        html += '   </div>';
    }

    html += '    </div>';

    html += '    <div class="max3dPlusDivBorderModal"></div>';

    html += '    <div class="col" style="padding-right: 0; padding-left: 10px; text-align: center;">';

    for (var ck = 0; ck <= 9; ck++) {
        html += '   <div class="form-row" style="padding-bottom: 0;">';

        html += '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="max3dPlusModalBodyClickOtron(this);" name="' + ck + '" class="step_sel" id="idModalSelectedSpanBong_All_' + ck + '_4">' + ck + '</span>' +
                '       </div>' +
                '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="max3dPlusModalBodyClickOtron(this);" name="' + ck + '" class="step_sel" id="idModalSelectedSpanBong_All_' + ck + '_5">' + ck + '</span>' +
                '       </div>' +
                '       <div class="col" style="padding-right: 0; padding-left: 0;">' +
                '           <span onclick="max3dPlusModalBodyClickOtron(this);" name="' + ck + '" class="step_sel" id="idModalSelectedSpanBong_All_' + ck + '_6">' + ck + '</span>' +
                '       </div>';

        html += '   </div>';
    }

    html += '    </div>';
    html += '</div>';

    $("#max3dPlusModelMainBuildNumberOtron").html(html);
}

function max3dPlusBuildBodyMainChonSoClickMoneyBtn(doc) {
    if (!$(doc).hasClass('btn-danger')) {
        $(".max3dPlusModelNumberRadioMoney").removeClass('btn-danger');
        $(".max3dPlusModelNumberRadioMoney").addClass('btn-default');

        $(doc).addClass('btn-danger');
    }
}

function max3dPlusOpenModalNumber(key_bao) {
    var typeBao = $("#max3dPlusMuabao option:selected").val();

    $("#max3dPlusModelNumberRowKey").text(key_bao.slice(2, 3));
    $("#max3dPlusModelKeybaoHidden").val(key_bao);
    for (var kk = 1; kk <= 6; kk++) {
        for (var ky = 0; ky <= 9; ky++) {
            var docId = $("#idModalSelectedSpanBong_All_" + ky + "_" + kk);
            $(docId).removeClass('otron_checked');
            $(docId).css('background-color', 'white');
            $(docId).css('color', 'black');
        }
    }

    var flagRandomHid = $("#idSelectedSpanBong__Key_Input_Hidden_" + key_bao).val();
    if (flagRandomHid == 1) {
        var obj = max3dPlusArrayBaoAll.filter(x => x.key == key_bao);
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

    var moneySel = $("#max3dPlusMuabaoSelMoney_" + key_bao + " option:selected").val();
    var btnModalMoney = $("#max3dPlusBuildBodyMainChonSoClickMoneyBtn_" + moneySel);
    max3dPlusBuildBodyMainChonSoClickMoneyBtn(btnModalMoney);

    $("#max3dPlusModelNumber").modal('show');
}

function max3dPlusModalBodyClickOtron(doc) {
    if (!$(doc).hasClass('otron_checked')) {
        var idDoc = $(doc).prop('id');
        var key = idDoc.slice(-1, 31);
        var eleId = idDoc.slice(0, 30);
        var typeBao = $("#max3dPlusMuabao option:selected").val();

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

function max3dPlusMuabaoSelMoneyOnchane(val, key_nameBao) {
    var objIndex = max3dPlusArrayBaoAll.findIndex((o => o.key == key_nameBao));
    if (objIndex != -1) {
        max3dPlusArrayBaoAll[objIndex].money = val;
        max3dPlusCountMoneyBaoTicker();
    }
}

function max3dPlusModalBtnChonsoSubmit() {
    var arrBosoNew = new Array();
    var moneyBoso = 0;
    var typeBao = $("#max3dPlusMuabao option:selected").val();

    for (var kk = 1; kk <= 6; kk++) {
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
        if (arrBosoNew.length != 6) {
            commonShowMessage('Bạn phải chọn đúng 6 số <br> (Bạn đang chọn ' + arrBosoNew.length + ' số)', 'error');
            return;
        }
    }

    console.log(arrBosoNew);

    var keyBaoHid = $("#max3dPlusModelKeybaoHidden").val();

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

    $("#idSelectedSpanBong_" + keyBaoHid + "_1").text(numTextView1);
    $("#idSelectedSpanBong_" + keyBaoHid + "_2").text(numTextView2);

    $(".max3dPlusModelNumberRadioMoney").each(function () {
        if ($(this).hasClass('btn-danger')) {
            var idBtnAct = $(this).prop('id');
            var numMoney = idBtnAct.replace("max3dPlusBuildBodyMainChonSoClickMoneyBtn_", "");
            $("#max3dPlusMuabaoSelMoney_" + keyBaoHid).val(numMoney);
            moneyBoso = numMoney;
        }
    });

    var objNew = {
        key: keyBaoHid,
        money: moneyBoso,
        value: arrBosoNew
    };

    max3dPlusUpdateDataBaoTicker(objNew, "update");
    max3dPlusCountMoneyBaoTicker();

    var flagRandomHid = $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val();
    if (flagRandomHid == 0) {
        $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val(1);
        $("#idSelectedSpanBong__Key_Btn_" + keyBaoHid).html('<i class="fa fa-trash-o"></i>');
    }

    $("#max3dPlusModelNumber").modal('hide');
}

function max3dPlusViewAllBasket() {
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

    $("#max3dPlusMuabaoBasketNumberTotal").text(allSizeBasket);

    return allSizeBasket;
}

function max3dPlusBtnAddBasket() {
    if (max3dPlusArrayBaoAll.length > 0) {
        var sizeAllBasketBefore = max3dPlusViewAllBasket();
        var flagErr = max3dPlusCommonAddBaoCookie();
        var sizeAllBasketAfter = max3dPlusViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');

            max3dPlusChangeToBuyNowBtn();

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

function max3dPlusBtnAddBasketThenPay() {
    var max3dPluscurrentBasketPrice = $("#max3dPlusCountAllMoney").text();
    max3dPluscurrentBasketPrice = Number(max3dPluscurrentBasketPrice.split(".").join(""));
//    if (max3dPluscurrentBasketPrice < 20000) {
//        commonShowMessage('Vui lòng mua thêm, đơn hàng tối thiểu 20.000đ', 'error');
//        return false;
//    }
    if (max3dPlusArrayBaoAll.length > 0) {
        var sizeAllBasketBefore = max3dPlusViewAllBasket();
        var flagErr = max3dPlusCommonAddBaoCookie();
        var sizeAllBasketAfter = max3dPlusViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');

            max3dPlusChangeToBuyNowBtn();

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

function max3dPlusCommonAddBaoCookie() {
    var max_key = 0;

    var arrMax3DPlus = commonGetCookie("LUCKYBEST_Max3DPlus");
    if (arrMax3DPlus != null && arrMax3DPlus != "" && arrMax3DPlus != undefined) {
        arrMax3DPlus = JSON.parse(arrMax3DPlus);

        jQuery.map(arrMax3DPlus, function (obj) {
            if (obj.don_hang > max_key)
                max_key = obj.don_hang;
        });
    } else {
        arrMax3DPlus = new Array();
    }

    var arrKymuaSel = $('#max3dPlusKymua').val();
    if (arrKymuaSel == null) {
        commonShowMessage('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }

    var max3dPlusCurrentBasketPrice = $("#max3dPlusCountAllMoney").text();
    max3dPlusCurrentBasketPrice = Number(max3dPlusCurrentBasketPrice.split(".").join(""));
    if (!basketCheckMaxPriceQuantity(max3dPlusCurrentBasketPrice)) {
        return false;
    }

    var arrSelDataKymua = max3dPlusArrKymuaService.filter(function (obj) {
        var checkF = jQuery.inArray(obj.drawCode, arrKymuaSel);
        if (checkF != -1 && obj.category == 5) {
            return obj;
        }
    });

    var typeBao = $("#max3dPlusMuabao option:selected").val();

    var obj_donhang = {
        don_hang: (max_key + 1),
        loai_bao: typeBao + "",
        arr_ky_mua: arrSelDataKymua,
        data: max3dPlusArrayBaoAll
    };

    arrMax3DPlus.push(obj_donhang);
    console.log(arrMax3DPlus);
    commonSetCookie("LUCKYBEST_Max3DPlus", JSON.stringify(arrMax3DPlus));

    max3dPlusViewAllBasket();

    $('#max3dPlusMuabao')[0].sumo.selectItem(0);
    max3dPlusSelectBao();

    return true;
}

function max3dPlusBtnBuyNow() {
    if ($("#max3dPlusMuabaoBasketNumberTotal").text() == '0') {
        if (max3dPlusBtnAddBasketThenPay()) {
            window.location.href = requestUrl + '/receive';
        }
    } else {
        window.location.href = requestUrl + '/basket?back=max3dplus';
    }
}

function max3dPlusChangeToBuyNowBtn() {
    if ($("#max3dPlusMuabaoBasketNumberTotal").text() == '0') {
        $('button[onclick="max3dPlusBtnBuyNow();"]').text("MUA NGAY");
    } else {
        $('button[onclick="max3dPlusBtnBuyNow();"]').text("XEM GIỎ HÀNG");
    }
}