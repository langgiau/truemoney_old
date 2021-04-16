$(document).ready(function () {
    getResource(homeInit);
});

function homeInit() {
    receiveClearCookieKeno();
    //$("#homeModelFormInfoNote").modal("show");
    homeBuildInfoTickerAll();
}

function homeOpenHistory() {
    window.location.href = requestUrl + "/history";
}

function homeOpenHistoryKeno() {
    window.location.href = requestUrl + "/history_keno";
}
function homeOpenBulk() {
    window.location.href = requestUrl + "/bulk";
}

function homeOpenPower655() {
    window.location.href = requestUrl + "/power655";
}

function homeOpenMega645() {
    window.location.href = requestUrl + "/mega645";
}

function homeOpenMax4D() {
    window.location.href = requestUrl + "/max4d";
}

function homeOpenMax3D() {
    window.location.href = requestUrl + "/max3d";
}

function homeOpenOmMax3DPlus() {
    window.location.href = requestUrl + "/ommax3dplus";
}

function homeOpenMax3DPlus() {
    window.location.href = requestUrl + "/max3dplus";
}

function homeOpenKeno() {
    window.location.href = requestUrl + "/keno";
}
function homeBuildInfoTickerAll() {
    var urlInfo = "/action/common/getConfigQsmtInfos";
    var obj = {};
    $("#homeTextKenoDateQuay").text(moment(new Date(), 'DD/MM/YYYY').locale('vi').format('llll'));
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
                var banners = result.banners;
                try {
                    if (banners != null) {
                        homeBuildBannerHtml(banners);
                    }
                } catch (err) {
                    console.log(err.message);
                }

                var bookingTickets = result.bookingTickets;
                if (bookingTickets != null) {
                    for (var k = 0; k < bookingTickets.length; k++) {
                        var oneData = bookingTickets[k];
                        if (oneData.category == 1) {
                            $("#homeTextMega645DateQuay").text(moment(oneData.openDate, 'DD/MM/YYYY').locale('vi').format('llll'));
                            $("#homeTextMega645Money").text(commonFormatNumberMoney(oneData.jackpot1) + "đ");
                            $("#homeTextMega645CountDown").countdowntimer({
                                dateAndTime: commonFormatDateAll(moment(oneData.openDate, 'DD/MM/YYYY HH:mm:ss').toDate(), 22),
                                displayFormat: "DHMS"
                            });
                        } else if (oneData.category == 3) {
                            $("#homeTextPower655DateQuay").text(moment(oneData.openDate, 'DD/MM/YYYY').locale('vi').format('llll'));
                            $("#homeTextPower655Money").text(commonFormatNumberMoney(oneData.jackpot1) + "đ");
                            $("#homeTextPower655CountDown").countdowntimer({
                                dateAndTime: commonFormatDateAll(moment(oneData.openDate, 'DD/MM/YYYY HH:mm:ss').toDate(), 22),
                                displayFormat: "DHMS"
                            });
                        } else if (oneData.category == 2) {
                            $("#homeTextMax4dDateQuay").text(moment(oneData.openDate, 'DD/MM/YYYY').locale('vi').format('llll'));
                            $("#homeTextMax4dCountDown").countdowntimer({
                                dateAndTime: commonFormatDateAll(moment(oneData.openDate, 'DD/MM/YYYY HH:mm:ss').toDate(), 22),
                                displayFormat: "DHMS"
                            });
                        } else if (oneData.category == 4) {
                            $("#homeTextMax3dDateQuay").text(moment(oneData.openDate, 'DD/MM/YYYY').locale('vi').format('llll'));
                            $("#homeTextMax3dCountDown").countdowntimer({
                                dateAndTime: commonFormatDateAll(moment(oneData.openDate, 'DD/MM/YYYY HH:mm:ss').toDate(), 22),
                                displayFormat: "DHMS"
                            });

                            $("#homeTextMax3dPlusDateQuay").text(moment(oneData.openDate, 'DD/MM/YYYY').locale('vi').format('llll'));
                            $("#homeTextMax3dPlusCountDown").countdowntimer({
                                dateAndTime: commonFormatDateAll(moment(oneData.openDate, 'DD/MM/YYYY HH:mm:ss').toDate(), 22),
                                displayFormat: "DHMS"
                            });
                            
                            $("#homeTextOmMax3dPlusDateQuay").text(moment(oneData.openDate, 'DD/MM/YYYY').locale('vi').format('llll'));
                            $("#homeTextOmMax3dPlusCountDown").countdowntimer({
                                dateAndTime: commonFormatDateAll(moment(oneData.openDate, 'DD/MM/YYYY HH:mm:ss').toDate(), 22),
                                displayFormat: "DHMS"
                            });
                        } else if (oneData.category == 5) {

                        }else if (oneData.category == 6) {
                           // $("#homeTextKenoDateQuay").text(moment(oneData.openDate, 'DD/MM/YYYY').locale('vi').format('llll'));
                            $("#homeTextKenoCountDown").countdowntimer({
                                dateAndTime: commonFormatDateAll(moment(oneData.openDate, 'DD/MM/YYYY HH:mm:ss').toDate(), 22),
                                displayFormat: "DHMS"
                            });                            
                        }
                    }
                }
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}

function homeBuildBannerHtml(data) {
    var html = '';

    if (data == null || data.length == 0) {
        return html;
    }

    html += '<div id="homeMyCarousel" class="carousel slide" data-ride="carousel">' +
            '  <ol class="carousel-indicators">';

    for (var k = 0; k < data.length; k++) {
        if (k == 0) {
            html += '	    <li data-target="#homeMyCarousel" data-slide-to="' + k + '" class="active"></li>';
        } else {
            html += '	    <li data-target="#homeMyCarousel" data-slide-to="' + k + '"></li>';
        }
    }

    html += '  </ol>' +
            '  <div class="carousel-inner">';

    for (var kk = 0; kk < data.length; kk++) {
        var pictureUrl = data[kk].pictureUrl;
        var urlClick = data[kk].url;

        var itemActive = "";
        if (kk == 0) {
            itemActive = "active";
        }

        var pictureUrlConvert = pictureUrl.replace("http://103.63.109.215:8181", "https://luckybest.vn:1236/momo_web/api/image/url");

        html += '    <div class="item ' + itemActive + '">' +
                '        <img style="cursor: pointer" onclick="homeBannerImgClick(\'' + urlClick + '\');" src="' + pictureUrlConvert + '" />' +
                '    </div>';
    }

    html += '  </div>' +
            '  <a class="left carousel-control" href="#homeMyCarousel" data-slide="prev">' +
            '    <span class="glyphicon glyphicon-chevron-left"></span>' +
            '    <span class="sr-only">Previous</span>' +
            '  </a>' +
            '  <a class="right carousel-control" href="#homeMyCarousel" data-slide="next">' +
            '    <span class="glyphicon glyphicon-chevron-right"></span>' +
            '    <span class="sr-only">Next</span>' +
            '  </a>' +
            '</div>';

    $("#homeBannerSlides").html(html);

    $('#homeMyCarousel').carousel({
        interval: 3000,
        cycle: true
    });
}

function homeBannerImgClick(url) {
    if (url != null && commonIsEmpty(url) != "") {
        window.open(url);
    }
}

function receiveClearCookieKeno() {
    commonSetCookie("LUCKYBEST_Keno", "");
}