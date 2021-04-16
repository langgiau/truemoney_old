$(document).ready(function () {
    getResource(power655Init);
});

function power655Init() {
    $('#power655Muabao').SumoSelect({csvDispCount: 1});
//    $('#power655Muabao')[0].sumo.selectItem(0);

    $('#power655Kymua').SumoSelect({csvDispCount: 1});

    power655BuildKymuaService();

    power655SelectBao(6);
    power655BuildBodyMainChonSoTo();
    power655ViewAllBasket();
    power655ChangeToBuyNowBtn();
}

function power655MuabaoBasketBack() {
    window.location.href = requestUrl + '/basket?back=power655';
}

var power655ArrKymuaService = new Array();
function power655BuildKymuaService() {
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
                power655ArrKymuaService = result.data;

                var countSelChecked = -1;
                var x = document.getElementById("power655Kymua");
                for (var k = 0; k < power655ArrKymuaService.length; k++) {
                    var obj = power655ArrKymuaService[k];
                    if (obj.category == 3) {
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

                $('#power655Kymua')[0].sumo.reload();
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}

var power655ArrayBaoAll = new Array();
var power655CurrentOptSelect = 0;
function power655SelectBao1(key) {

    if (key == power655CurrentOptSelect) {
        // nếu chọn loại bao trùng với loại bao hiện tại thì ko thay đổi gì cả
    } else {
        power655SelectBao(key);
    }
}

function power655SelectBao(key) {
    var html = '';
    power655ArrayBaoAll = new Array();
    $("#power655CountAllMoney").text('0');
    if (key == 6) {
        power655CurrentOptSelect = 6;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 6; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 5) {
        power655CurrentOptSelect = 5;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 6; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 7) {
        power655CurrentOptSelect = 7;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 8) {
        power655CurrentOptSelect = 8;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_8">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 9) {
        power655CurrentOptSelect = 9;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_8">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_9">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 10) {
        power655CurrentOptSelect = 10;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_8">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_9">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_10">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 11) {
        power655CurrentOptSelect = 11;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_8">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_9">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_10">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_11">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 12) {
        power655CurrentOptSelect = 12;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_8">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_9">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_10">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_11">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_12">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 13) {
        power655CurrentOptSelect = 13;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 2; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_8">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_9">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_10">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_11">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_12">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_13">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 14) {
        power655CurrentOptSelect = 14;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 2; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_8">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_9">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_10">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_11">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_12">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_13">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_14">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 15) {
        power655CurrentOptSelect = 15;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 2; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_8">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_9">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_10">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_11">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_12">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_13">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_14">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_15">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 18) {
        power655CurrentOptSelect = 18;
        html += '<div id="power655CircleOrderBao' + key + '" class="power655CircleOrderBao">';
        for (var i = 0; i < 2; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="power655CircleOrderBao' + key + nameBao + '" class="power655Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="power655OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_8">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_9">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_10">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_11">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_12">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_13">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_14">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_15">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_16">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_17">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_18">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="power655BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    }

    $("#power655BodyAllBao").html(html);
}

function power655BtnOnclickRandomDel(num, key_nameBao) {
    var flagInputHidden = $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val();
    if (flagInputHidden == 0) {
        var valArr = new Array();

        while (valArr.length < num) {
            var randomnumber = Math.floor(Math.random() * 55) + 1;
            if (valArr.indexOf(randomnumber) > -1)
                continue;
            valArr[valArr.length] = randomnumber;
        }

        valArr = commonSortNumberArr(valArr);

        for (var k = 0; k < num; k++) {
            var numberRd = valArr[k];
            if (numberRd < 10) {
                numberRd = "0" + numberRd;
            }

            $('#idSelectedSpanBong_' + key_nameBao + "_" + (k + 1)).text(numberRd);
        }

        var objNew = {
            key: key_nameBao,
            value: valArr
        };

        power655UpdateDataBaoTicker(objNew, "update");

        $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val(1);
        $("#idSelectedSpanBong__Key_Btn_" + key_nameBao).html('<i class="fa fa-trash-o"></i>');
    } else {
        for (var k = 0; k < num; k++) {
            $('#idSelectedSpanBong_' + key_nameBao + "_" + (k + 1)).html('&nbsp;');
        }

        var objNew = {
            key: key_nameBao,
            value: new Array()
        };

        power655UpdateDataBaoTicker(objNew, "delete");

        $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val(0);
        $("#idSelectedSpanBong__Key_Btn_" + key_nameBao).html('<i class="fa fa-refresh"></i>');
    }

    power655CountMoneyBaoTicker();
}

function power655UpdateDataBaoTicker(obj, flag) {
    if (obj != null) {
        var objIndex = power655ArrayBaoAll.findIndex((o => o.key == obj.key));
        if (flag == 'update') {
            if (objIndex != -1) {
                power655ArrayBaoAll[objIndex].value = obj.value;
            } else {
                power655ArrayBaoAll.push(obj);
            }
        } else if (flag == 'delete') {
            var objIndex = power655ArrayBaoAll.findIndex((o => o.key == obj.key));
            power655ArrayBaoAll.splice(objIndex, 1);
        }
    }
}

function power655CountMoneyBaoTicker() {
    var arrKymuaSel = $('#power655Kymua').val();
    if (arrKymuaSel == null) {
        arrKymuaSel = new Array();
    }

    var typeBao = $("#power655Muabao option:selected").val();

    var giaveBao = commonPower655DefaultMoneyBao(typeBao);
    var countTicker = power655ArrayBaoAll.length;
    var giaFinal = arrKymuaSel.length * (giaveBao * countTicker);

    $("#power655CountAllMoney").text(common_format_number(giaFinal + "", ""));

}

function power655SelectKymuaChange() {
    power655CountMoneyBaoTicker();
}

function power655BtnToChonnhanh() {
    var typeBao = $("#power655Muabao option:selected").val();
    var indexOf = 6;
    if (typeBao > 6 && typeBao <= 12) {
        indexOf = 3;
    } else if (typeBao > 12 && typeBao <= 18) {
        indexOf = 2;
    }

    for (var k = 0; k < indexOf; k++) {
        var nameBao = commonBuildABCAll(k);
        var valIdHidden = $("#idSelectedSpanBong__Key_Input_Hidden_" + typeBao + "_" + nameBao).val();
        if (valIdHidden == 0) {
            power655BtnOnclickRandomDel(typeBao + "", (typeBao + "_" + nameBao));
            break;
        }
    }
}

function power655BuildBodyMainChonSoTo() {
    var html = '';
    for (var k = 1; k <= 55; k++) {
        var numberFor = k;
        if (k < 10) {
            numberFor = "0" + k;
        }
        html += '<span onclick="power655ModalBodyClickOtron(this);" class="step_to" id="idModalSelectedSpanBong_All_' + numberFor + '">' + numberFor + '</span>';
    }

    $("#power655ModelMainBuildNumber").html(html);
}

function power655OpenModalNumber(key_bao) {
    var namebaoTitle = key_bao.substring((key_bao.length - 1), key_bao.length);
    $("#power655ModelNumberTitle").text(namebaoTitle);

    $("#power655ModelKeybaoHidden").val(key_bao);
    for (var kk = 1; kk <= 55; kk++) {
        var numberFor = kk;
        if (kk < 10) {
            numberFor = "0" + kk;
        }

        var docId = $("#idModalSelectedSpanBong_All_" + numberFor);
        $(docId).removeClass('otron_checked');
        $(docId).css('background-color', 'white');
        $(docId).css('color', 'red');
    }

    var flagRandomHid = $("#idSelectedSpanBong__Key_Input_Hidden_" + key_bao).val();
    if (flagRandomHid == 1) {
        var obj = power655ArrayBaoAll.filter(x => x.key == key_bao);
        if (obj != null && obj.length > 0) {
            var arrVal = obj[0].value;
            for (var k = 0; k < arrVal.length; k++) {

                var numberFor = arrVal[k];
                if (numberFor < 10) {
                    numberFor = "0" + numberFor;
                }

                var docId = $("#idModalSelectedSpanBong_All_" + numberFor);
                $(docId).addClass('otron_checked');
                $(docId).css('background-color', 'red');
                $(docId).css('color', 'white');
            }
        }
    }

    $("#power655ModelNumber").modal('show');
}

function power655ModalBodyClickOtron(doc) {
    if (!$(doc).hasClass('otron_checked')) {
        $(doc).addClass('otron_checked');
        $(doc).css('background-color', 'red');
        $(doc).css('color', 'white');
    } else {
        $(doc).removeClass('otron_checked');
        $(doc).css('background-color', 'white');
        $(doc).css('color', 'red');
    }
}

function power655ModalBtnChonsoSubmit() {
    var arrBosoNew = new Array();
    for (var kk = 1; kk <= 55; kk++) {
        var numberFor = kk;
        if (kk < 10) {
            numberFor = "0" + kk;
        }

        var docId = $("#idModalSelectedSpanBong_All_" + numberFor);
        if ($(docId).hasClass('otron_checked')) {
            arrBosoNew.push(kk);
        }
    }

    var typeBao = $("#power655Muabao option:selected").val();
    if (arrBosoNew.length != typeBao) {
        commonShowMessage('Bạn phải chọn đúng ' + typeBao + ' số <br> (Bạn đang chọn ' + arrBosoNew.length + ' số)', 'error');
        return;
    }

    var keyBaoHid = $("#power655ModelKeybaoHidden").val();
    for (var k = 0; k < arrBosoNew.length; k++) {
        var numFor = arrBosoNew[k];
        if (numFor < 10) {
            numFor = "0" + numFor;
        }

        $("#idSelectedSpanBong_" + keyBaoHid + "_" + (k + 1)).text(numFor);
    }

    var objNew = {
        key: keyBaoHid,
        value: arrBosoNew
    };

    power655UpdateDataBaoTicker(objNew, "update");
    power655CountMoneyBaoTicker();

    var flagRandomHid = $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val();
    if (flagRandomHid == 0) {
        $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val(1);
        $("#idSelectedSpanBong__Key_Btn_" + keyBaoHid).html('<i class="fa fa-trash-o"></i>');
    }

    $("#power655ModelNumber").modal('hide');
}

function power655ViewAllBasket() {
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

    $("#power655MuabaoBasketNumberTotal").text(allSizeBasket);

    return allSizeBasket;
}

function power655BtnAddBasket() {
    if (power655ArrayBaoAll.length > 0) {
        var sizeAllBasketBefore = power655ViewAllBasket();
        var flagErr = power655CommonAddBaoCookie();
        var sizeAllBasketAfter = power655ViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');
            power655ChangeToBuyNowBtn();
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
function power655BtnAddBasketThenPay() {
    if (power655ArrayBaoAll.length > 0) {
        var power655currentBasketPrice = $("#power655CountAllMoney").text();
        power655currentBasketPrice = Number(power655currentBasketPrice.split(".").join(""));
//        if (power655currentBasketPrice < 20000) {
//            commonShowMessage('Vui lòng mua thêm, đơn hàng tối thiểu 20.000đ', 'error');
//            return false;
//        }
        var sizeAllBasketBefore = power655ViewAllBasket();
        var flagErr = power655CommonAddBaoCookie();
        var sizeAllBasketAfter = power655ViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');
            power655ChangeToBuyNowBtn();
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

function power655CommonAddBaoCookie() {
    var max_key = 0;

    var arrPower655 = commonGetCookie("LUCKYBEST_Power655");
    if (arrPower655 != null && arrPower655 != "" && arrPower655 != undefined) {
        arrPower655 = JSON.parse(arrPower655);

        jQuery.map(arrPower655, function (obj) {
            if (obj.don_hang > max_key)
                max_key = obj.don_hang;
        });
    } else {
        arrPower655 = new Array();
    }

    var arrKymuaSel = $('#power655Kymua').val();
    if (arrKymuaSel == null) {
        commonShowMessage('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }
    var power655currentBasketPrice = $("#power655CountAllMoney").text();
//    console.log(power655currentBasketPrice);
    power655currentBasketPrice = Number(power655currentBasketPrice.split(".").join(""));
    if (!basketCheckMaxPriceQuantity(power655currentBasketPrice)) {
        return false;
    }

    var arrSelDataKymua = power655ArrKymuaService.filter(function (obj) {
        var checkF = jQuery.inArray(obj.drawCode, arrKymuaSel);
        if (checkF != -1 && obj.category == 3) {
            return obj;
        }
    });

    var typeBao = $("#power655Muabao option:selected").val();
//    console.log(power655ArrayBaoAll);
    var obj_donhang = {
        don_hang: (max_key + 1),
        loai_bao: typeBao + "",
        arr_ky_mua: arrSelDataKymua,
        data: power655ArrayBaoAll
    };

    arrPower655.push(obj_donhang);
    commonSetCookie("LUCKYBEST_Power655", JSON.stringify(arrPower655));

    power655ViewAllBasket();

    $('#power655Muabao')[0].sumo.selectItem(0);
    power655SelectBao(6);

    return true;

}


function power655BtnBuyNow() {
    var arrKymuaSel = $('#power655Kymua').val();
    if (arrKymuaSel == null) {
        commonShowMessage('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }

    if ($("#power655MuabaoBasketNumberTotal").text() == '0') {
        if (power655BtnAddBasketThenPay()) {
            window.location.href = requestUrl + '/receive';
        }
    } else {
        window.location.href = requestUrl + '/basket?back=power655';
    }
}

function power655ChangeToBuyNowBtn() {
    if ($("#power655MuabaoBasketNumberTotal").text() == '0') {
        $('button[onclick="power655BtnBuyNow();"]').text("MUA NGAY");
    } else {
        $('button[onclick="power655BtnBuyNow();"]').text("XEM GIỎ HÀNG");
    }
}