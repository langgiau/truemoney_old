$(document).ready(function () {
    getResource(bulkInit);
});

function bulkInit() {
    $('#bulkSelectMax4dType').SumoSelect({csvDispCount: 1});
    $('#bulkSelectMax4dType')[0].sumo.selectItem(0);

    $('#bulkSelectMax4dMoney').SumoSelect({csvDispCount: 1});
    $('#bulkSelectMax4dMoney')[0].sumo.selectItem(0);

    $('#bulkKymua').SumoSelect({csvDispCount: 1});

    bulkbuildKymuaService(13);
    bulkViewAllBasket();

    $('#bulkModelSelectMoneyFormInputTextMoney').keyup(function (e) {
        if (e.keyCode == 13) {
            bulkModelSelectMoneyFormSubmit();
        }
    });

    $("#bulkModelFormInfoNote").modal("show");
}

function bulkMuabaoBasketBack() {
    window.location.href = requestUrl + '/basket?back=bulk';
}

var bulkArrKymuaService = new Array();
function bulkbuildKymuaService(categoryOption) {
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
                bulkArrKymuaService = new Array();
                bulkArrKymuaService = result.data;


                $('#bulkKymua').html('');
                $('#bulkKymua')[0].sumo.reload();
                $('#bulkKymua')[0].sumo.unload();

                var countSelChecked = -1;
                var x = document.getElementById("bulkKymua");
                for (var k = 0; k < bulkArrKymuaService.length; k++) {
                    var obj = bulkArrKymuaService[k];
                    if (obj.category == categoryOption) {
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

                $('#bulkKymua').SumoSelect({csvDispCount: 1});

                bulkCountMoneyAllTicker();
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}

function bulkViewAllBasket() {
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

    $("#bulkMuabaoBasketNumberTotal").text(allSizeBasket);

    return allSizeBasket;
}

function bulkCountMoneyAllTicker() {
    var giaFinal = 0;

    var arrKymuaSel = $('#bulkKymua').val();
    if (arrKymuaSel == null) {
        arrKymuaSel = new Array();
    }

    var typeTicker = $('input[name=bulkTypeLoaibaoOptradio]:checked').val();
    var tongSoVe = $('#bulkSelectCountTickerFunHidden').val();

    if (typeTicker == 11) {
        var giaTriVe = 10000;
        giaFinal = arrKymuaSel.length * (tongSoVe * giaTriVe);
    } else if (typeTicker == 13) {
        var giaTriVe = 10000;
        giaFinal = arrKymuaSel.length * (tongSoVe * giaTriVe);
    } else if (typeTicker == 12) {
        var giatien1BosoMax4d = $('#bulkSelectMax4dMoney').val();
        giaFinal = arrKymuaSel.length * (tongSoVe * giatien1BosoMax4d * 10000);
    }

    $("#bulkCountAllMoney").text(common_format_number(giaFinal + "", ""));
}

function bulkSelectKymuaChange() {
    bulkCountMoneyAllTicker();
}

function bulkSelectMax4dMoneyChange() {
    bulkCountMoneyAllTicker();
}

function bulkOptRadioSelectedChecked(doc) {
    var optionChecked = $(doc).val();

    if (optionChecked == 13) {
        bulkbuildKymuaService(13);
        $("#bulkSelectMax4dMoneyDivForm").hide();
    } else if (optionChecked == 12) {
        bulkbuildKymuaService(12);
        $("#bulkSelectMax4dMoneyDivForm").show();
    } else if (optionChecked == 11) {
        bulkbuildKymuaService(11);
        $("#bulkSelectMax4dMoneyDivForm").hide();
    }
}

function bulkModalMoneyOptRadioSelectedChecked(doc) {
    var optionChecked = $(doc).val();
    if (optionChecked == 9999999) {
        $("#bulkModelSelectMoneyFormInputTextMoney").val('');
        $("#bulkModelSelectMoneyFormDivCustomMoney").show();
    } else {
        $("#bulkModelSelectMoneyFormDivCustomMoney").hide();
    }
}

function bulkSelectCountTickerFun() {
    var countCheckedSokhac = $("#bulkSelectCountTickerFunSokhacHidden").val();
    var countSoveHid = $("#bulkSelectCountTickerFunHidden").val();

    if (countCheckedSokhac == 0) {
        if (countSoveHid == 0) {
            $("input[name='bulkModelSelectMoneyFormOptradio'][value='50']").prop('checked', true);
            $("#bulkModelSelectMoneyFormDivCustomMoney").hide();
        } else {
            $("input[name='bulkModelSelectMoneyFormOptradio'][value='" + countSoveHid + "']").prop('checked', true);
            $("#bulkModelSelectMoneyFormDivCustomMoney").hide();
        }
    } else if (countCheckedSokhac == 1) {
        $("input[name='bulkModelSelectMoneyFormOptradio'][value='9999999']").prop('checked', true);
        $("#bulkModelSelectMoneyFormDivCustomMoney").show();
        $("#bulkModelSelectMoneyFormInputTextMoney").val(countSoveHid);
    }

    $("#bulkModelSelectMoneyForm").modal('show');
}

function bulkModelSelectMoneyFormSubmit() {
    var optionChecked = $("input[name='bulkModelSelectMoneyFormOptradio']:checked").val();
    if (optionChecked == 9999999) {
        var inputText = $("#bulkModelSelectMoneyFormInputTextMoney").val();
        if (commonIsEmpty(inputText) == "") {
            commonShowMessage('Bạn chưa nhập số vé', 'error');
            return;
        }
        if (isNaN(commonStrimData(inputText))) {
            commonShowMessage('Nhập số vé không hợp lệ', 'error');
            return;
        }
        if (commonStrimData(inputText) > 10000) {
            commonShowMessage('Tối đa 10000 vé', 'error');
            return;
        }
        if (commonStrimData(inputText) < 50) {
            commonShowMessage('Tối thiểu 50 vé', 'error');
            return;
        }

        inputText = parseInt(inputText);

        $("#bulkSelectCountTickerFunHidden").val(inputText);
        $("#bulkSelectCountTickerFunSokhacHidden").val(1); // neu chon so khac thi fill = 1

        $("#bulkSelectCountTicker").text(inputText + " Vé/ 1 kỳ quay");

        $("#bulkModelSelectMoneyFormInputTextMoney").val(inputText);
    } else {
        $("#bulkSelectCountTickerFunHidden").val(optionChecked);
        $("#bulkSelectCountTickerFunSokhacHidden").val(0); // neu khong chon so khac thi fill = 0

        $("#bulkSelectCountTicker").text(optionChecked + " Vé/ 1 kỳ quay");
    }

    $("#bulkModelSelectMoneyForm").modal('hide');
    bulkCountMoneyAllTicker();
}

function bulkCommonAddBaoCookie() {
    var max_key = 0;

    var arrBulk = commonGetCookie("LUCKYBEST_Bulk");
    if (arrBulk != null && arrBulk != "" && arrBulk != undefined) {
        arrBulk = JSON.parse(arrBulk);

        jQuery.map(arrBulk, function (obj) {
            if (obj.don_hang > max_key)
                max_key = obj.don_hang;
        });
    } else {
        arrBulk = new Array();
    }

    console.log(arrBulk);


    var giaFinal = 0;

    var arrKymuaSel = $('#bulkKymua').val();
    if (arrKymuaSel == null) {
        commonShowMessage('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }

    var categoryOption = 3;
    var typeTicker = $('input[name=bulkTypeLoaibaoOptradio]:checked').val();

    var tongSoVe = $('#bulkSelectCountTickerFunHidden').val();
    if (tongSoVe == 0) {
        commonShowMessage('Bạn chưa chọn số vé', 'error');
        return false;
    }

    var cachchoiMax4d = $('#bulkSelectMax4dType').val();

    var giatien1BosoMax4d = 1;
    if (typeTicker == 11) {
        categoryOption = 1;
        var giaTriVe = 10000;
        giaFinal = arrKymuaSel.length * (tongSoVe * giaTriVe);
    } else if (typeTicker == 13) {
        categoryOption = 3;
        var giaTriVe = 10000;
        giaFinal = arrKymuaSel.length * (tongSoVe * giaTriVe);
    } else if (typeTicker == 12) {
        categoryOption = 2;
        giatien1BosoMax4d = $('#bulkSelectMax4dMoney').val();
        giaFinal = arrKymuaSel.length * (tongSoVe * giatien1BosoMax4d * 10000);
    }

    var arrSelDataKymua = bulkArrKymuaService.filter(function (obj) {
        var checkF = jQuery.inArray(obj.drawCode, arrKymuaSel);
        if (checkF != -1 && obj.category == categoryOption) {
            return obj;
        }
    });

    console.log(arrSelDataKymua);

    var bulkObjDetailData = {
        s_l_ve: tongSoVe,
        s_l_bs_1_ve: 1,
        giatien_all: giaFinal,
        giatien_1_ve: giatien1BosoMax4d,
        cachchoi_max4d: cachchoiMax4d
    };

    var obj_donhang = {
        don_hang: (max_key + 1),
        loai_ve: typeTicker,
        arr_ky_mua: arrSelDataKymua,
        data: bulkObjDetailData
    };

    console.log(obj_donhang);

    arrBulk.push(obj_donhang);
    commonSetCookie("LUCKYBEST_Bulk", JSON.stringify(arrBulk));

    bulkViewAllBasket();

    return true;
}

function bulkBtnAddBasket() {
    var sizeAllBasketBefore = bulkViewAllBasket();
    var flagErr = bulkCommonAddBaoCookie();
    var sizeAllBasketAfter = bulkViewAllBasket();

    if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
        commonShowMessage('Thêm vào giỏ hàng thành công', 'success');

        $("#bulkSelectCountTickerFunHidden").val(0);
        $("#bulkSelectCountTickerFunSokhacHidden").val(0);
        $("#bulkSelectCountTicker").text("0 Vé/ 1 kỳ quay");

        $("#bulkModelSelectMoneyFormInputTextMoney").val('');
        $("#bulkModelSelectMoneyFormDivCustomMoney").hide();

        $("input[name='bulkModelSelectMoneyFormOptradio'][value='50']").prop('checked', true);

        bulkCountMoneyAllTicker();
    } else if (flagErr && (sizeAllBasketAfter == sizeAllBasketBefore)) {
        commonShowMessage('Giỏ hàng đã đầy, vui lòng thanh toán', 'error');
    }
}

function bulkBtnBuyNow() {
    window.location.href = requestUrl + '/basket?back=bulk';
}