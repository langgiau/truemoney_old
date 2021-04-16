$(document).ready(function () {
    getResource(receiveTickerInit);
});

function receiveTickerInit() {
    // $("#receiveTickerModalUserRegisterPw").modal("show");
    truemoneyGetConfigFee();
    receiveTickerFillForm();

    $('#receiveTickerUsername').keyup(function (e) {
        if (e.keyCode == 13) {
            receiveTickerSmsLogin();
        }
    });

    $('#receiveTickerUserPhone').keyup(function (e) {
        if (e.keyCode == 13) {
            receiveTickerSmsLogin();
        }
    });

    $('#receiveTickerUserCMND').keyup(function (e) {
        if (e.keyCode == 13) {
            receiveTickerSmsLogin();
        }
    });

    $('#receiveTickerUserAddress').keyup(function (e) {
        if (e.keyCode == 13) {
            receiveTickerSmsLogin();
        }
    });

}

var truemoneyApiFee = 3;
var kenoTruemoneyApiFee = 7;
var truemoneyFee = 3;
var receiveTickerResetPwPlag = "register";


function truemoneyGetConfigFee() {
    var urlInfo = "/action/common/getTruemoneyConfigFee";
    var obj = {};
    commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
            commonStopWaitMe($(".panel-group"));
            var result = null;
            console.log("status: " + status);
            if (status == 'success') {
                result = xhr.responseJSON;
            }
            console.log(xhr.responseJSON);
            if (result != null) {
                if (result.code == 0) {
                    var truemoneyConfigFee = result.data;
                    for (var k = 0; k < truemoneyConfigFee.length; k++) {
                        var oneData = truemoneyConfigFee[k];
                        if (oneData.id == 40) {
                            truemoneyApiFee = oneData.percent_fee_per_order;
                        } else if (oneData.id == 42) {
                            kenoTruemoneyApiFee = oneData.percent_fee_per_order;
                        }
                        var arrKeno = commonGetCookie("LUCKYBEST_Keno");

                        if (arrKeno != null && arrKeno != "" && arrKeno != "[]" && arrKeno != undefined) {
                            truemoneyFee = kenoTruemoneyApiFee;
                        } else {
                            truemoneyFee = truemoneyApiFee;
                        }
                    }
                    receiveTickerDataCookie();
                    $("#TextMomoFee").text(truemoneyFee + "%");
                }
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            } else if (result.code == 998) {
                window.open(href = requestUrl+"/error-mid", "_self");
            }
        }
    );
}

function receiveTickerGetAllProviceShip() {
    var urlInfo = "/action/common/getDataVietlottProvince";
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
                var dataAll = result.data;
                //   console.log(dataAll);

                var idProviceFirt = -1;
                var x = document.getElementById("receiveTickerUserSelectProvince");
                for (var k = 0; k < dataAll.length; k++) {
                    var obj = dataAll[k];

                    if (k == 0) {
                        idProviceFirt = obj.id;
                    }

                    var option = document.createElement("option");
                    option.value = obj.id;
                    option.text = obj.name;

                    x.add(option);
                }

                if (idProviceFirt > -1) {
                    receiveTickerGetAllDistrictShipByPro(idProviceFirt);
                }
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}

function receiveTickerGetAllDistrictShipByPro(idProvice) {
    var urlInfo = "/action/common/getDataVietlottDistrictByPro";
    var obj = {
        idProvice: idProvice + ""
    };

    commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-group"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

        if (result != null) {
            if (result.code == 0) {
                var dataAll = result.data;
                //    console.log(dataAll);

                $("#receiveTickerUserSelectDistrict option").remove();
                var x = document.getElementById("receiveTickerUserSelectDistrict");
                for (var k = 0; k < dataAll.length; k++) {
                    var obj = dataAll[k];
                    var option = document.createElement("option");
                    option.value = obj.latitude + "," + obj.longtitude;
                    option.text = obj.name;

                    x.add(option);
                }
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}

function receiveTickerBuildModalTermHold() {
    var urlInfo = "/action/common/getConfigTermInfo";
    var obj = {};

    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

        if (result != null) {
            if (result.code == 0) {
                var dataHtml = result.object;
                $("#receiveTickerModalQuyDinhBodyText").html(dataHtml.termHoldTicket);
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}

function receiveTickerBackHis() {
    var arrKeno = commonGetCookie("LUCKYBEST_Keno");
    if (arrKeno != null && arrKeno != "" && arrKeno != "[]" && arrKeno != undefined) {
        window.location.href = requestUrl + "/keno";
    } else {
        window.location.href = requestUrl + "/basket";
    }

}

function receiveTickerDataCookie() {
    var arrPower655 = commonGetCookie("LUCKYBEST_Power655");
    var arrMega645 = commonGetCookie("LUCKYBEST_Mega645");
    var arrMax4D = commonGetCookie("LUCKYBEST_Max4D");
    var arrBulk = commonGetCookie("LUCKYBEST_Bulk");
    var arrMax3D = commonGetCookie("LUCKYBEST_Max3D");
    var arrMax3DPlus = commonGetCookie("LUCKYBEST_Max3DPlus");
    var arrOmMax3DPlus = commonGetCookie("LUCKYBEST_OmMax3DPlus");
    var arrKeno = commonGetCookie("LUCKYBEST_Keno");

    //console.log(arrPower655);
    //console.log(arrMega645);
    //console.log(arrMax4D);
    //console.log(arrBulk);
//    console.log(arrMax3D);
//    console.log(arrOmMax3DPlus);

    var receiveTickerMoneyTotalCount = 0;
    if (arrKeno != null && arrKeno != "" && arrKeno != "[]" && arrKeno != undefined) {
        arrKeno = JSON.parse(arrKeno);

        var receiveTickerMoneyKeno = receiveTickerCountTotalMoneyKeno(arrKeno);

        receiveTickerMoneyTotalCount = receiveTickerMoneyTotalCount + receiveTickerMoneyKeno;
    } else {
        if (arrPower655 != null && arrPower655 != "" && arrPower655 != "[]" && arrPower655 != undefined) {
            arrPower655 = JSON.parse(arrPower655);

            var receiveTickerMoneyPower655 = receiveTickerCountTotalMoneyPower655(arrPower655);

            receiveTickerMoneyTotalCount = receiveTickerMoneyTotalCount + receiveTickerMoneyPower655;
        }

        if (arrMega645 != null && arrMega645 != "" && arrMega645 != "[]" && arrMega645 != undefined) {
            arrMega645 = JSON.parse(arrMega645);

            var receiveTickerMoneyMega645 = receiveTickerCountTotalMoneyMega645(arrMega645);

            receiveTickerMoneyTotalCount = receiveTickerMoneyTotalCount + receiveTickerMoneyMega645;
        }

        if (arrMax4D != null && arrMax4D != "" && arrMax4D != "[]" && arrMax4D != undefined) {
            arrMax4D = JSON.parse(arrMax4D);

            var receiveTickerMoneyMax4D = receiveTickerCountTotalMoneyMax4D(arrMax4D);

            receiveTickerMoneyTotalCount = receiveTickerMoneyTotalCount + receiveTickerMoneyMax4D;
        }

        if (arrMax3D != null && arrMax3D != "" && arrMax3D != "[]" && arrMax3D != undefined) {
            arrMax3D = JSON.parse(arrMax3D);

            var receiveTickerMoneyMax3D = receiveTickerCountTotalMoneyMax3D(arrMax3D);

            receiveTickerMoneyTotalCount = receiveTickerMoneyTotalCount + receiveTickerMoneyMax3D;
        }

        if (arrMax3DPlus != null && arrMax3DPlus != "" && arrMax3DPlus != "[]" && arrMax3DPlus != undefined) {
            arrMax3DPlus = JSON.parse(arrMax3DPlus);

            var receiveTickerMoneyMax3DPlus = receiveTickerCountTotalMoneyMax3DPlus(arrMax3DPlus);

            receiveTickerMoneyTotalCount = receiveTickerMoneyTotalCount + receiveTickerMoneyMax3DPlus;
        }
        if (arrOmMax3DPlus != null && arrOmMax3DPlus != "" && arrOmMax3DPlus != "[]" && arrOmMax3DPlus != undefined) {
            arrOmMax3DPlus = JSON.parse(arrOmMax3DPlus);

            var receiveTickerMoneyOmMax3DPlus = receiveTickerCountTotalMoneyOmMax3DPlus(arrOmMax3DPlus);

            receiveTickerMoneyTotalCount = receiveTickerMoneyTotalCount + receiveTickerMoneyOmMax3DPlus;
        }
    }
    var receiveTickerShipBulk = 0;
    var receiveTickerFlagShiper = false;
    if (arrBulk != null && arrBulk != "" && arrBulk != "[]" && arrBulk != undefined) {
        arrBulk = JSON.parse(arrBulk);

        receiveTickerShipBulk = 20000;
        receiveTickerFlagShiper = true;

        $("#receiveTickerUserFormNotBulk").hide();
        $("#receiveTickerUserFormBulk").show();
        $("#receiveAlarmTextShip").html(' LuckyBest sẽ sử dụng thông tin này để vận chuyển và xác minh quyền sở hữu của đơn hàng.');
        $('.panel-body').css('min-height', '585px');

        var receiveTickerMoneyBulk = receiveTickerCountTotalMoneyBulk(arrBulk);

        receiveTickerMoneyTotalCount = receiveTickerMoneyTotalCount + receiveTickerMoneyBulk;

        receiveTickerGetAllProviceShip(); // load du lieu dia chi ship khi co mua gio li xi
    } else {
        $("#receiveTickerUserFormNotBulk").show();
        $("#receiveTickerUserFormBulk").hide();
        $('.panel-body').css('min-height', '445px');
    }

    if (receiveTickerMoneyTotalCount == 0) {
        receiveTickerBackHis();
    } else {
        var receiveTickerShipBulkTextBuild = "Đại lý giữ hộ vé";
        if (receiveTickerFlagShiper) { // neu don hang ship > 2tr thì free ship
            if (receiveTickerMoneyTotalCount >= 2000000) {
                receiveTickerShipBulk = 0;
                receiveTickerShipBulkTextBuild = "Miễn phí";
            } else {
                receiveTickerShipBulkTextBuild = common_format_number(receiveTickerShipBulk + "", "") + "đ";
            }
        } else {
            $("#receiveTickerCountMonneyShipLabelText").html("&nbsp;Hình thức đặt vé: ");
        }

        //phi giao dich 3%
        var receivePhiGD = Math.floor((receiveTickerMoneyTotalCount + receiveTickerShipBulk) * (truemoneyFee / 100));
        var receiveTickerMoneyTotalCountAll = receiveTickerMoneyTotalCount + receivePhiGD + receiveTickerShipBulk;

        $("#receiveTickerCountMonneyAll").text(common_format_number(receiveTickerMoneyTotalCount + "", "") + "đ");
        $("#receiveTickerCountMonneyBonus").text(common_format_number(receivePhiGD + "", "") + "đ");
        $("#receiveTickerCountMonneyShip").text(receiveTickerShipBulkTextBuild);
        $("#receiveTickerCountTotalMonneyAll").text(common_format_number(receiveTickerMoneyTotalCountAll + "", "") + "đ");
    }
}

function receiveTickerCountTotalMoneyKeno(dataAll) {
    var receiveTickerMoneyTotalCountKeno = 0;

    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;

        for (var ace = 0; ace < arr_data_ve.length; ace++) {
            var oneRow = arr_data_ve[ace];

            var giaveBao = 10000; //commonMax3dDefaultMoneyBao(oneDonhang.loai_bao, oneRow.value);
            var giaveOne = arr_ky_mua.length * (giaveBao * oneRow.money);

            receiveTickerMoneyTotalCountKeno = receiveTickerMoneyTotalCountKeno + giaveOne;
        }
    }

    return receiveTickerMoneyTotalCountKeno;
}

function receiveTickerCountTotalMoneyPower655(dataAll) {
    var receiveTickerMoneyTotalCountPower655 = 0;

    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;

        var giaveBao = commonPower655DefaultMoneyBao(oneDonhang.loai_bao);
        var countTicker = arr_data_ve.length;
        var giaFinal = arr_ky_mua.length * (giaveBao * countTicker);

        receiveTickerMoneyTotalCountPower655 = receiveTickerMoneyTotalCountPower655 + giaFinal;
    }

    return receiveTickerMoneyTotalCountPower655;
}

function receiveTickerCountTotalMoneyMega645(dataAll) {
    var receiveTickerMoneyTotalCountMega645 = 0;

    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;

        var giaveBao = commonMega645DefaultMoneyBao(oneDonhang.loai_bao);
        var countTicker = arr_data_ve.length;
        var giaFinal = arr_ky_mua.length * (giaveBao * countTicker);

        receiveTickerMoneyTotalCountMega645 = receiveTickerMoneyTotalCountMega645 + giaFinal;
    }

    return receiveTickerMoneyTotalCountMega645;
}

function receiveTickerCountTotalMoneyMax4D(dataAll) {
    var receiveTickerMoneyTotalCountMax4D = 0;

    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;

        for (var ace = 0; ace < arr_data_ve.length; ace++) {
            var oneRow = arr_data_ve[ace];

            var giaveBao = commonMax4dDefaultMoneyBao(oneDonhang.loai_bao, oneRow.value);
            var giaveOne = arr_ky_mua.length * (giaveBao * oneRow.money);

            receiveTickerMoneyTotalCountMax4D = receiveTickerMoneyTotalCountMax4D + giaveOne;
        }
    }

    return receiveTickerMoneyTotalCountMax4D;
}

function receiveTickerCountTotalMoneyMax3D(dataAll) {
    var receiveTickerMoneyTotalCountMax3D = 0;

    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;

        for (var ace = 0; ace < arr_data_ve.length; ace++) {
            var oneRow = arr_data_ve[ace];

            var giaveBao = commonMax3dDefaultMoneyBao(oneDonhang.loai_bao, oneRow.value);
            var giaveOne = arr_ky_mua.length * (giaveBao * oneRow.money);

            receiveTickerMoneyTotalCountMax3D = receiveTickerMoneyTotalCountMax3D + giaveOne;
        }
    }

    return receiveTickerMoneyTotalCountMax3D;
}

function receiveTickerCountTotalMoneyMax3DPlus(dataAll) {
    var receiveTickerMoneyTotalCountMax3DPlus = 0;

    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;

        for (var ace = 0; ace < arr_data_ve.length; ace++) {
            var oneRow = arr_data_ve[ace];

            var giaveBao = commonMax3dPlusDefaultMoneyBao(oneDonhang.loai_bao, oneRow.value);
            var giaveOne = arr_ky_mua.length * (giaveBao * oneRow.money);

            receiveTickerMoneyTotalCountMax3DPlus = receiveTickerMoneyTotalCountMax3DPlus + giaveOne;
        }
    }

    return receiveTickerMoneyTotalCountMax3DPlus;
}

function receiveTickerCountTotalMoneyOmMax3DPlus(dataAll) {
    var receiveTickerMoneyTotalCountOmMax3DPlus = 0;
    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var arr_ky_mua = oneDonhang.arr_ky_mua;
        var arr_data_ve = oneDonhang.data;
        var from = Number(arr_data_ve.giaiSoFrom);
        var to = Number(arr_data_ve.giaiSoTo);
        var loaibao = oneDonhang.loai_bao + "";
        var dongia = 0;
        switch (loaibao) {
            case "1":
                dongia = 10000;
                break;
            case "2":
                dongia = 20000;
                break;
            case "5":
                dongia = 50000;
                break;
            case "10":
                dongia = 100000;
                break;
            case "20":
                dongia = 200000;
                break;
        }
        var tongcong = (to - from + 1) * dongia * arr_ky_mua.length;
        receiveTickerMoneyTotalCountOmMax3DPlus = receiveTickerMoneyTotalCountOmMax3DPlus + tongcong;
    }
    return receiveTickerMoneyTotalCountOmMax3DPlus;
}

function receiveTickerCountTotalMoneyBulk(dataAll) {
    var receiveTickerMoneyTotalCountBulk = 0;

    for (var k = 0; k < dataAll.length; k++) {
        var oneDonhang = dataAll[k];
        var obj_data_ve = oneDonhang.data;
        var giaFinal = obj_data_ve.giatien_all;

        receiveTickerMoneyTotalCountBulk = receiveTickerMoneyTotalCountBulk + giaFinal;
    }

    return receiveTickerMoneyTotalCountBulk;
}

function receiveClearCookieDone() {
    commonSetCookie("LUCKYBEST_Power655", "");
    commonSetCookie("LUCKYBEST_Mega645", "");
    commonSetCookie("LUCKYBEST_Max4D", "");
    commonSetCookie("LUCKYBEST_Bulk", "");
    commonSetCookie("LUCKYBEST_Max3D", "");
    commonSetCookie("LUCKYBEST_Max3DPlus", "");
    commonSetCookie("LUCKYBEST_OmMax3DPlus", "");
    commonSetCookie("LUCKYBEST_Keno", "");
}

var name = "";
var cmnd = "";
var email = "";
var sdt = "";

function receiveTickerLoginCallback(response) {
    if (response.status === "PARTIALLY_AUTHENTICATED") {
        var faceCode = response.code;
        var faceCsrf = response.state;

        var option = response.option;
        if (option != "pw") {
            option = "pw";
        }


        // var pw = response.pw;
        // if (pw == null) {
        //     pw = "";
        // }
        var userPhone = $("#receiveTickerUserPhone").val();
        var userName = $("#receiveTickerUsername").val();
        var userCMND = $("#receiveTickerUserCMND").val();
        var userAddressDetail = $("#receiveTickerUserAddress").val();


        var receiveTickerUserSelectProvince = $("#receiveTickerUserSelectProvince option:selected").text();

        var receiveTickerUserSelectDistrictValue = $("#receiveTickerUserSelectDistrict option:selected").val();
        var receiveTickerUserSelectDistrictName = $("#receiveTickerUserSelectDistrict option:selected").text();

        var userAddress = "";
        var userLat = "0";
        var userLng = "0";

        var orderArrPower655 = commonGetCookie("LUCKYBEST_Power655");
        var orderArrMega645 = commonGetCookie("LUCKYBEST_Mega645");
        var orderArrMax4D = commonGetCookie("LUCKYBEST_Max4D");
        var orderArrMax3D = commonGetCookie("LUCKYBEST_Max3D");
        var orderArrMax3DPlus = commonGetCookie("LUCKYBEST_Max3DPlus");
        var orderArrOmMax3DPlus = commonGetCookie("LUCKYBEST_OmMax3DPlus");
        var orderArrBulk = commonGetCookie("LUCKYBEST_Bulk");
        var orderArrKeno = commonGetCookie("LUCKYBEST_Keno");
        var flagOrderNull = true;

        if (orderArrKeno != null && orderArrKeno != "" && orderArrKeno != "[]" && orderArrKeno != undefined) {
            flagOrderNull = false;
        } else if (orderArrPower655 != null && orderArrPower655 != "" && orderArrPower655 != "[]" && orderArrPower655 != undefined) {
            flagOrderNull = false;
        } else if (orderArrMega645 != null && orderArrMega645 != "" && orderArrMega645 != "[]" && orderArrMega645 != undefined) {
            flagOrderNull = false;
        } else if (orderArrMax4D != null && orderArrMax4D != "" && orderArrMax4D != "[]" && orderArrMax4D != undefined) {
            flagOrderNull = false;
        } else if (orderArrMax3D != null && orderArrMax3D != "" && orderArrMax3D != "[]" && orderArrMax3D != undefined) {
            flagOrderNull = false;
        } else if (orderArrMax3DPlus != null && orderArrMax3DPlus != "" && orderArrMax3DPlus != "[]" && orderArrMax3DPlus != undefined) {
            flagOrderNull = false;
        } else if (orderArrOmMax3DPlus != null && orderArrOmMax3DPlus != "" && orderArrOmMax3DPlus != "[]" && orderArrOmMax3DPlus != undefined) {
            flagOrderNull = false;
        } else if (orderArrBulk != null && orderArrBulk != "" && orderArrBulk != "[]" && orderArrBulk != undefined) {
            flagOrderNull = false;
        }

        if (flagOrderNull) {
            commonShowMessage('Đơn hàng bị trống', 'error');
            return;
        }

        if (commonIsEmpty(userPhone) == "" || isNaN(userPhone) || convertMsisdn(userPhone, "") == "") {
            commonShowMessage('Số điện thoại không hợp lệ', 'error');
            return;
        }

        if (commonStrimData(userName) == "") {
            commonShowMessage('Bạn chưa nhập họ tên', 'error');
            return;
        }

        if (orderArrBulk != null && orderArrBulk != "" && orderArrBulk != "[]" && orderArrBulk != undefined) {
            if (commonStrimData(userAddressDetail) == "") {
                commonShowMessage('Bạn chưa nhập địa chỉ', 'error');
                return;
            }

            if (receiveTickerUserSelectDistrictValue == null || receiveTickerUserSelectDistrictValue == ',') {
                commonShowMessage('Dữ liệu quận/ huyện không hợp lệ', 'error');
                return;
            }

            var arrLatLotConvert = receiveTickerUserSelectDistrictValue.split(',');

            userAddress = userAddressDetail + ", " + receiveTickerUserSelectDistrictName + ", " + receiveTickerUserSelectProvince; // fill dia chi chi tiet ship o day
            userLat = arrLatLotConvert[0]; // fill lat ship o day
            userLng = arrLatLotConvert[1]; // fill lng ship o day
        } else {
            if (commonStrimData(userCMND) == "") {
                commonShowMessage('Bạn chưa nhập Số CMND hoặc Thẻ căn cước', 'error');
                return;
            }
        }
        var osDevice = navigator.platform;


        var urlInfo = "/action/submit/data";
        var obj = {
            option: option + "",
            userName: commonStrimData(userName) + "",
            userPhone: convertMsisdn(userPhone, "84") + "",
            // pw: pw,
            userCMND: commonStrimData(userCMND) + "",
            userAddress: commonStrimData(userAddress) + "",
            userLat: commonStrimData(userLat) + "",
            userLng: commonStrimData(userLng) + "",
            faceCode: faceCode + "",
            faceCsrf: faceCsrf + "",
            orderArrPower655: orderArrPower655 + "",
            orderArrMega645: orderArrMega645 + "",
            orderArrMax4D: orderArrMax4D + "",
            orderArrMax3D: orderArrMax3D + "",
            orderArrMax3DPlus: orderArrMax3DPlus + "",
            orderArrOmMax3DPlus: orderArrOmMax3DPlus + "",
            orderArrBulk: orderArrBulk + "",
            orderArrKeno: orderArrKeno + "",
            osDevice: osDevice,
            // msisdn:  "",
            deviceId: "truemoney-webview-6699"

        };

        var idQuayquay = ".panel-group";
        if (option == "pw") {
            idQuayquay = "#receiveTickerModalUserLogin";
        }

        commonRunWaitMe($(idQuayquay));
        commonAjaxJson(urlInfo, obj, function (xhr, status) {
            commonStopWaitMe($(idQuayquay));

            var result = null;
            if (status == 'success') {
                result = xhr.responseJSON;
            }

            if (result != null) {
                if (result.code == 0) {
                    // localStorage.setItem("sdt", convertMsisdn(userPhone, "84") + "");
                    // localStorage.setItem("cmnd", commonStrimData(userCMND) + "");
                    // localStorage.setItem("name", commonStrimData(userName) + "");
                    // receiveTickerUpdateAcc();
                    receiveClearCookieDone();
                    window.open(result.data, "_self");
                } else if (result.code == 999) {
                    commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
                } else if (result.code != 33691 || result.code != 33696) {
                    $("#receiveTickerModalUserLogin").modal("hide");
                    commonShowMessage(result.message, 'error');
                    $("#receiveTickerModalUserLoginPW").val("");
                } else {
                    commonShowMessage(result.message, 'error');
                }
            }
        });


    }
}

function receiveTickerSmsLogin() {
    var phoneNumber = $("#receiveTickerUserPhone").val();
    var userName = $("#receiveTickerUsername").val();
    var userCMND = $("#receiveTickerUserCMND").val();
    var userAddressDetail = $("#receiveTickerUserAddress").val();

    var orderArrBulk = commonGetCookie("LUCKYBEST_Bulk");

    if (commonStrimData(userName) == "") {
        commonShowMessage('Bạn chưa nhập họ tên', 'error');
        $("#receiveTickerUsername").focus();
        return;
    }

    if (commonStrimData(phoneNumber) == "") {
        commonShowMessage('Bạn chưa nhập số điện thoại', 'error');
        $("#receiveTickerUserPhone").focus();
        return;
    }

    if (commonIsEmpty(phoneNumber) == "" || isNaN(phoneNumber) || convertMsisdn(phoneNumber, "") == "") {
        commonShowMessage('Số điện thoại không hợp lệ', 'error');
        $("#receiveTickerUserPhone").focus();
        return;
    }

    if (orderArrBulk != null && orderArrBulk != "" && orderArrBulk != "[]" && orderArrBulk != undefined) {
        if (commonStrimData(userAddressDetail) == "") {
            commonShowMessage('Bạn chưa nhập địa chỉ', 'error');
            $("#receiveTickerUserAddress").focus();
            return;
        }
    } else {
        if (commonStrimData(userCMND) == "") {
            commonShowMessage('Bạn chưa nhập Số CMND hoặc Thẻ căn cước', 'error');
            $("#receiveTickerUserCMND").focus();
            return;
        }
    }

    // if (receiveTickerMoneyTotalCountToanCuc < receiveTickerByMin.minNormalWeb) {
    //     commonShowMessage(receiveTickerByMin.messageNormal, 'error');
    //     return;
    // }
    var urlInfo = "/action/common/mshhUserCheckAccount";
    var obj = {
        msisdn: convertMsisdn(phoneNumber, "84") + "",
        deviceId: "momov2-webview-6699"
    };

    commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-group"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

        console.log(result);

        if (result != null) {
            var objOutput = result.object;
            if (objOutput != null) {
                var objResult = objOutput.result;
                if (objResult.code == 0 || objResult.code == 1) {
                    $("#receiveTickerModalUserLogin").modal("show");
                } else {
                    receiveTickerResetPwPlag = "register";
                    receiveTickerSendOtp();
                }
            } else {
                commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
            }
        } else {
            commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
        }
    });
}

function receiveTickerUpdateAcc() {
    var phoneNumber = $("#receiveTickerUserPhone").val();
    var userName = $("#receiveTickerUsername").val();
    var userCMND = $("#receiveTickerUserCMND").val();
    // var userAddressDetail = $("#receiveTickerUserAddress").val();


    // if (receiveTickerMoneyTotalCountToanCuc < receiveTickerByMin.minNormalWeb) {
    //     commonShowMessage(receiveTickerByMin.messageNormal, 'error');
    //     return;
    // }
    var urlInfo = "/action/common/mshhUserUpdate";
    var obj = {
        cmnd: userCMND,
        fullName: userName,
        msisdn: convertMsisdn(phoneNumber, "84") + "",
        deviceId: "truemoney-webview-6699"
    };

    commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-group"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

        console.log(result);

        if (result != null) {
            var objOutput = result.object;
            if (objOutput != null) {
                var objResult = objOutput.result;
                console.log(objResult);
                if (objResult.code == 0 || objResult.code == 1) {
                    // $("#receiveTickerModalUserLogin").modal("show");
                } else {
                }
            } else {
                commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
            }
        } else {
            commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
        }
    });
}

function receiveTickercountdownOtp() {

    let target_date = new Date().getTime() + 60000;

// variables for time units
    let days, hours, minutes, seconds;

// get tag element
    let countdown = document.getElementById('countdown');

// update the tag with id "countdown" every 1 second

    setInterval(function () {
        let current_date = new Date().getTime();

        if (target_date - current_date >= 0) {
            // find the amount of "seconds" between now and target
            let seconds_left = (target_date - current_date) / 1000;

            // do some time calculations
            days = parseInt(seconds_left / 86400);
            seconds_left = seconds_left % 86400;

            hours = parseInt(seconds_left / 3600);
            seconds_left = seconds_left % 3600;

            minutes = parseInt(seconds_left / 60);
            seconds = parseInt(seconds_left % 60);

            // format countdown string + set tag value
            // countdown.innerHTML = '<span class="days">' + days + ' <label>Days</label></span> <span class="hours">' + hours + ' <label>Hours</label></span> <span class="minutes">'
            //     + minutes + ' <label>Minutes</label></span> <span class="seconds">' + seconds + ' <label>Seconds</label></span>';
            $("#receiveTickerModalOtpCountDown").html("Mã OTP sẽ hết hạn sau: " + seconds + " giây");
            if (seconds <= 0) {
                $("#receiveTickerModalOtp").modal("hide");
            }
        }
    }, 1000);
}

function receiveTickerAuthenOtpCode() {
    $("#receiveTickerModalOtp").modal("hide");
    var otpCode = $("#receiveTickerModalOtpInput").val();
    var phoneNumber = $("#receiveTickerUserPhone").val();
    var urlInfo = "/action/common/smsAuthOtp";
    var obj = {
        userPhone: convertMsisdn(phoneNumber, "84") + "",
        otpCode: otpCode
    };
    console.log(obj);
    commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
            commonStopWaitMe($(".panel-group"));
            var result = null;
            if (status == 'success') {
                result = xhr.responseJSON;
            }
            console.log(result);
            if (result != null) {
                var objOutput = result.object;
                console.log(objOutput);
                if (objOutput != null) {
                    var objOutputcode = objOutput.result;
                    var token = objOutput.token;
                    // var token = "123123";
                    console.log(objOutput);
                    if (objOutputcode == 0) {
                        $("#receiveTickerModalUserResetPwToken").val(token);
                        commonShowMessage("Mã OTP chính xác", 'success');
                        // receiveTickerSmsLogin();
                        if (receiveTickerResetPwPlag == "reset") {
                            $("#receiveTickerModalUserResetPw").modal("show");
                        } else if (receiveTickerResetPwPlag == "register") {
                            $("#receiveTickerModalUserRegisterPw").modal("show");
                        }
                    } else if (objOutputcode == 41) {
                        commonShowMessage("Bạn đã thực hiện quá số lần nhận OTP trong ngày", 'error');
                    } else if (objOutputcode == 36) {
                        commonShowMessage("Mã confirm không hợp lệ", 'error');
                    } else if (objOutputcode == 37) {
                        commonShowMessage("Mã OTP không hợp lệ", 'error');
                    } else if (objOutputcode == 40) {
                        commonShowMessage("Quá số lần nhập OTP", 'error');
                    } else if (objOutputcode == 100) {
                        commonShowMessage("Thao tác quá nhanh, Vui lòng thử lại sau 30 giây", 'error');
                    }
                } else {
                    commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
                }
            } else {
                commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
            }
        }
    )
    ;
}

function receiveTickerSubmitLoginBuy() {
    // var passInput = $("#receiveTickerModalUserLoginPW").val();
    // if (commonIsEmpty(passInput) == "") {
    //     commonShowMessage("Bạn chưa nhập mật khẩu", 'error');
    //     return;
    // }

    var response = {
        code: "",
        state: "",
        status: "PARTIALLY_AUTHENTICATED",
        option: "pw"
        // pw: passInput + ""
    };

    receiveTickerLoginCallback(response);
}

function receiveTickerOpenModalResetPw() {
    $("#receiveTickerModalUserLogin").modal("hide");

    var phoneNumber = $("#receiveTickerUserPhone").val();
    if (commonIsEmpty(phoneNumber) == "" || isNaN(phoneNumber) || convertMsisdn(phoneNumber, "") == "") {
        commonShowMessage('Số điện thoại không hợp lệ', 'error');
        return;
    } else {
        receiveTickerResetPwPlag = "reset";
        receiveTickerSendOtp();
    }

    // AccountKit.login(
    //     'PHONE',
    //     {countryCode: "+84", phoneNumber: convertMsisdn(phoneNumber, "0")},
    //     receiveTickerConfirmMsisdnCallback
    // );
}

function receiveTickerConfirmMsisdnCallback(response) {
    if (response.status === "PARTIALLY_AUTHENTICATED") {
        var faceCode = response.code;
        var faceCsrf = response.state;

        var phoneNumber = $("#receiveTickerUserPhone").val();
        if (commonIsEmpty(phoneNumber) == "" || isNaN(phoneNumber) || convertMsisdn(phoneNumber, "") == "") {
            commonShowMessage('Số điện thoại không hợp lệ', 'error');
            return;
        }

        var urlInfo = "/action/common/smsFbkitSendOtp";
        var obj = {
            userPhone: convertMsisdn(phoneNumber, "84") + "",
            faceCode: faceCode + "",
            faceCsrf: faceCsrf + ""
        };

        commonRunWaitMe($(".panel-group"));
        commonAjaxJson(urlInfo, obj, function (xhr, status) {
            commonStopWaitMe($(".panel-group"));

            var result = null;
            if (status == 'success') {
                result = xhr.responseJSON;
            }

            console.log(result);

            if (result != null) {
                if (result.code == 0) {
                    $("#receiveTickerModalUserResetPw").modal("show");
                    $("#receiveTickerModalUserResetPwToken").val(result.message);
                } else {
                    commonShowMessage(result.message, 'error');
                }
            } else {
                commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
            }
        });
    } else if (response.status === "NOT_AUTHENTICATED") {
        //   console.log(response);
    } else if (response.status === "BAD_PARAMS") {
        //  console.log(response);
    }
}

function receiveTickerSubmitModalResetPw() {
    var msisdn = $("#receiveTickerUserPhone").val();

    // if (receiveTickerResetPwPlag == "register") {
    //     var accToken = $("#receiveTickerModalUserRegisterPwNewPass").val();
    //     var passNew = $("#receiveTickerModalUserRegisterPwNewPass").val();
    //     var passNewConfirm = $("#receiveTickerModalUserRegisterPwNewPassConfirm").val();

    // } else {
    var accToken = $("#receiveTickerModalUserResetPwToken").val();
    var passNew = $("#receiveTickerModalUserResetPwNewPass").val();
    var passNewConfirm = $("#receiveTickerModalUserResetPwNewPassConfirm").val();
    // }


    if (commonIsEmpty(accToken) == "") {
        commonShowMessage('Thao tác không hợp lệ', 'error');
        return;
    }

    if (commonIsEmpty(passNew) == "") {
        commonShowMessage('Bạn chưa nhập mật khẩu mới', 'error');
        return;
    }

    if (commonStrimData(passNew).length < 6) {
        commonShowMessage('Mật khẩu mới >= 6 ký tự', 'error');
        return;
    }

    if (commonIsEmpty(passNewConfirm) == "") {
        commonShowMessage('Bạn chưa nhập lại mật khẩu mới', 'error');
        return;
    }

    if (passNew != passNewConfirm) {
        commonShowMessage('Nhập lại mật khẩu không đúng', 'error');
        return;
    }

    var urlInfo = "/action/common/mshhUserRegister";
    var obj = {
        msisdn: convertMsisdn(msisdn, "84") + "",
        accToken: accToken + "",
        passNew: passNew + "",
        deviceId: "momo-webview-6699"
    };

    commonRunWaitMe($("#receiveTickerModalUserResetPw"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($("#receiveTickerModalUserResetPw"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }
        if (result != null) {
            var objOutput = result.object;
            console.log(objOutput);
            if (objOutput != null) {
                var code = objOutput.code;
                // var token = objOutput.token;
                console.log(objOutput);
                if (code == 0) {
                    $("#receiveTickerModalUserResetPw").modal("hide");
                    $("#receiveTickerModalUserResetPwToken").val('');

                    commonShowMessage("Cập nhật mật khẩu thành công", 'success');
                    if (receiveTickerResetPwPlag == "register") {
                        receiveTickerSmsLogin();
                    }
                } else {
                    commonShowMessage("Cập nhật mật khẩu không thành công", 'error');
                }
            } else {
                commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
            }
        } else {
            commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
        }
    });
}

function receiveTickerSubmitModalRegisterPw() {
    var msisdn = $("#receiveTickerUserPhone").val();

    var accToken = $("#receiveTickerModalUserResetPwToken").val();
    var passNew = $("#receiveTickerModalUserRegisterPwNewPass").val();
    var passNewConfirm = $("#receiveTickerModalUserRegisterPwNewPassConfirm").val();


    if (commonIsEmpty(accToken) == "") {
        commonShowMessage('Thao tác không hợp lệ', 'error');
        return;
    }

    if (commonIsEmpty(passNew) == "") {
        commonShowMessage('Bạn chưa nhập mật khẩu mới', 'error');
        return;
    }

    if (commonStrimData(passNew).length < 6) {
        commonShowMessage('Mật khẩu mới >= 6 ký tự', 'error');
        return;
    }

    if (commonIsEmpty(passNewConfirm) == "") {
        commonShowMessage('Bạn chưa nhập lại mật khẩu mới', 'error');
        return;
    }

    if (passNew != passNewConfirm) {
        commonShowMessage('Nhập lại mật khẩu không đúng', 'error');
        return;
    }
    receiveTickerOpenModalResetPw

    var urlInfo = "/action/common/mshhUserRegister";
    var obj = {
        msisdn: convertMsisdn(msisdn, "84") + "",
        accToken: accToken + "",
        passNew: passNew + "",
        deviceId: "truemoney-webview-6699"
    };

    commonRunWaitMe($("#receiveTickerModalUserResetPw"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($("#receiveTickerModalUserResetPw"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }
        if (result != null) {
            var objOutput = result.object;
            console.log(objOutput);
            if (objOutput != null) {
                var code = objOutput.code;
                // var token = objOutput.token;
                console.log(objOutput);
                if (code == 0) {
                    $("#receiveTickerModalUserRegisterPw").modal("hide");
                    $("#receiveTickerModalUserResetPwToken").val('');

                    commonShowMessage("Cập nhật mật khẩu thành công", 'success');
                    if (receiveTickerResetPwPlag == "register") {
                        receiveTickerSmsLogin();
                    }
                } else {
                    commonShowMessage("Cập nhật mật khẩu không thành công", 'error');
                }
            } else {
                commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
            }
        } else {
            commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
        }
    });
}

function receiveTickerFillForm() {
    var urlInfo = "/action/common/mshhUserCheckAccount";
    var obj = {
        msisdn: "",
        deviceId: "truemoney-webview-6699"
    };

    commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-group"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

        console.log(result.object);

        if (result != null) {
            var objOutput = result.object;
            if (objOutput != null) {
                var objResult = objOutput.result;

                if (objResult.code == 0 || objResult.code == 1) {
                    var data = objOutput.resultData.accountInfo;
                    console.log(data);
                    $("#receiveTickerUserPhone").val(convertPhoneNumberSatartWith84(data.accountId));
                    $("#receiveTickerUsername").val(data.fullname);
                    $("#receiveTickerUserCMND").val(data.cmnd);
                } else {

                    // commonShowMessage("Tài khoản chưa có trong hệ thống!", 'error');
                }
            } else {
                commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
            }
        } else {
            commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
        }
    });

    // if(localStorage.sdt){
    //     $("#receiveTickerUserPhone").val(convertPhoneNumberSatartWith84(localStorage.sdt));
    //     $("#receiveTickerUsername").val(localStorage.name);
    //     $("#receiveTickerUserCMND").val(localStorage.cmnd);
    // }
}

function receiveTickerSendOtp() {
    var phoneNumber = $("#receiveTickerUserPhone").val();
    var urlInfo = "/action/common/sendOtp";
    var obj = {
        userPhone: convertMsisdn(phoneNumber, "84") + "",
    };
    commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-group"));
        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
            console.log(result);
            if (result != null) {
                var objOutput = result.object;
                console.log(objOutput);
                if (objOutput != null) {
                    var objResult = objOutput.result;
                    console.log(objOutput);
                    if (objResult == 0) {
                        commonShowMessage("Mã OTP đã được gửi vào số điện thoại của bạn, vui lòng nhập mã này vào ô bên dưới!", 'success');
                        $("#receiveTickerModalOtp").modal("show");
                        receiveTickercountdownOtp();
                    } else if (objResult == 41) {
                        commonShowMessage("Bạn đã thực hiện quá số lần nhận OTP trong ngày", 'error');
                    } else if (objResult == 36) {
                        commonShowMessage("Mã confirm không hợp lệ", 'error');
                    } else if (objResult == 37) {
                        commonShowMessage("Mã OTP không hợp lệ", 'error');
                    } else if (objResult == 40) {
                        commonShowMessage("Quá số lần nhập OTP", 'error');
                    } else if (objResult == 100) {
                        commonShowMessage("Thao tác quá nhanh, Vui lòng thử lại sau 30 giây", 'error');
                    } else {
                        commonShowMessage("Không gửi được mã OTP, vui lòng thử lại sau!", 'error');
                    }
                } else {
                    commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
                }
            } else {
                commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
            }
        } else {
            commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
        }
    });

    //---------------- Dùng FBkit
    // AccountKit.login(
    //         'PHONE',
    //         {countryCode: "+84", phoneNumber: convertMsisdn(phoneNumber, "0")},
    //         receiveTickerLoginCallback
    //         );

}

function convertPhoneNumberSatartWith84(phoneNum) {
    phoneNum = phoneNum.trim();
    if (phoneNum[0] == 8 && phoneNum[1] == 4) {
        phoneNum = phoneNum.replaceAt(0, " ");
        phoneNum = phoneNum.replaceAt(1, "0");
    }
    return phoneNum.trim();
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
