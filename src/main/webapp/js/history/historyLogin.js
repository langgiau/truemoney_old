$(document).ready(function () {
    getResource(loginInit);
});

function loginInit() {
    $('#loginMsisdn').keyup(function (e) {
        if (e.keyCode == 13) {
            loginSmsLogin();
        }
    });

    $('#loginModalUserLoginPW').keyup(function (e) {
        if (e.keyCode == 13) {
            loginSubmitLoginBuy();
        }
    });
}

function loginLoginCallback(response) {
    if (response.status === "PARTIALLY_AUTHENTICATED") {
        var faceCode = response.code;
        var faceCsrf = response.state;

        var option = response.option;
        if (option != "pw") {
            option = "otp";
        }

        var pw = response.pw;
        if (pw == null) {
            pw = "";
        }

        var userPhone = $("#loginMsisdn").val();

        if (commonIsEmpty(userPhone) == "" || isNaN(userPhone) || convertMsisdn(userPhone, "") == "") {
            commonShowMessage('Số điện thoại không hợp lệ', 'error');
            return;
        }

        var urlInfo = "/action/user/login";
        var obj = {
            option: option + "",
            userPhone: convertMsisdn(userPhone, "84") + "",
            pw: pw,
            faceCode: faceCode + "",
            faceCsrf: faceCsrf + ""
        };


        var idQuayquay = ".panel-group";
        if (option == "pw") {
            idQuayquay = "#loginModalUserLogin";
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
                    window.location.href = requestUrl + "/history";
                } else if (result.code == 999) {
                    commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
                } else {
                    $("#loginModalUserLoginPW").focus();
                    commonShowMessage(result.message, 'error');
                }
            }
        });

    } else if (response.status === "NOT_AUTHENTICATED") {
        console.log(response);
    } else if (response.status === "BAD_PARAMS") {
        console.log(response);
    }
}

function loginSmsLogin() {
    var phoneNumber = $("#loginMsisdn").val();

    if (commonIsEmpty(phoneNumber) == "") {
        commonShowMessage('Mời bạn nhập số điện thoại', 'error');
        $("#loginMsisdn").focus();
        return;
    }

    if (commonIsEmpty(phoneNumber) == "" || isNaN(phoneNumber) || convertMsisdn(phoneNumber, "") == "") {
        $("#loginMsisdn").focus();
        commonShowMessage('Số điện thoại không hợp lệ', 'error');
        return;
    }

    var urlInfo = "/action/common/mshhUserCheckAccount";
    var obj = {
        msisdn: convertMsisdn(phoneNumber, "84") + "",
        deviceId: "momo-webview-6699"
    };

    commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-group"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

        //console.log(result);

        if (result != null) {
            var objOutput = result.object;
            if (objOutput != null) {
                var objResult = objOutput.result;
                if (objResult.code == 0 || objResult.code == 1) {
                    $("#loginModalUserLogin").modal("show");
                } else {
                    loginOpenModalResetPw();
                }
            } else {
                commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
            }
        } else {
            commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
        }
    });
}

function loginSubmitLoginBuy() {
    var passInput = $("#loginModalUserLoginPW").val();
    if (commonIsEmpty(passInput) == "") {
        commonShowMessage("Bạn chưa nhập mật khẩu", 'error');
        $("#loginModalUserLoginPW").focus();
        return;
    }

    var response = {
        code: "",
        state: "",
        status: "PARTIALLY_AUTHENTICATED",
        option: "pw",
        pw: passInput + ""
    };

    loginLoginCallback(response);
}

function loginOpenModalResetPw() {
    $("#loginModalUserLogin").modal("hide");

    var phoneNumber = $("#loginMsisdn").val();
    if (commonIsEmpty(phoneNumber) == "" || isNaN(phoneNumber) || convertMsisdn(phoneNumber, "") == "") {
        commonShowMessage('Số điện thoại không hợp lệ', 'error');
        return;
    }

    AccountKit.login(
            'PHONE',
            {countryCode: "+84", phoneNumber: convertMsisdn(phoneNumber, "0")},
            loginConfirmMsisdnCallback
            );
}

function loginConfirmMsisdnCallback(response) {
    if (response.status === "PARTIALLY_AUTHENTICATED") {
        var faceCode = response.code;
        var faceCsrf = response.state;

        var phoneNumber = $("#loginMsisdn").val();
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

            //console.log(result);

            if (result != null) {
                if (result.code == 0) {
                    $("#loginModalUserResetPw").modal("show");
                    $("#loginModalUserResetPwToken").val(result.message);
                } else {
                    commonShowMessage(result.message, 'error');
                }
            } else {
                commonShowMessage("Hệ thống bận, vui lòng thử lại sau!", 'error');
            }
        });
    } else if (response.status === "NOT_AUTHENTICATED") {
        console.log(response);
    } else if (response.status === "BAD_PARAMS") {
        console.log(response);
    }
}

function loginSubmitModalResetPw() {
    var msisdn = $("#loginMsisdn").val();
    var accToken = $("#loginModalUserResetPwToken").val();
    var passNew = $("#loginModalUserResetPwNewPass").val();
    var passNewConfirm = $("#loginModalUserResetPwNewPassConfirm").val();

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

    commonRunWaitMe($("#loginModalUserResetPw"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($("#loginModalUserResetPw"));

        var result = null;
        if (status == 'success') {
            result = xhr.responseJSON;
        }

        //console.log(result);

        if (result != null) {
            var obj = result.object;
            if (obj != null) {
                if (obj.code == 0) {
                    $("#loginModalUserResetPw").modal("hide");
                    $("#loginModalUserResetPwToken").val("");

                    commonShowMessage("Cập nhật mật khẩu thành công", 'success');
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