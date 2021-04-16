$(document).ready(function () {
    getResource(mega645Init);
});

function mega645Init() {
    $('#mega645Muabao').SumoSelect({csvDispCount: 1});
//    $('#mega645Muabao')[0].sumo.selectItem(0);

    $('#mega645Kymua').SumoSelect({csvDispCount: 1});

    mega645BuildKymuaService();

    mega645SelectBao(6);
    mega645BuildBodyMainChonSoTo();
    mega645ViewAllBasket();
    mega645ChangeToBuyNowBtn();
}

function mega645MuabaoBasketBack() {
    window.location.href = requestUrl + '/basket?back=mega645';
}

var mega645ArrKymuaService = new Array();
function mega645BuildKymuaService() {
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
                mega645ArrKymuaService = result.data;

                var countSelChecked = -1;
                var x = document.getElementById("mega645Kymua");
                for (var k = 0; k < mega645ArrKymuaService.length; k++) {
                    var obj = mega645ArrKymuaService[k];
                    if (obj.category == 1) {
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

                $('#mega645Kymua')[0].sumo.reload();
            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}

var mega645ArrayBaoAll = new Array();
var mega645CurrentOptSelect = 0;
function mega645SelectBao1(key) {
    if (key == mega645CurrentOptSelect) {
        // nếu chọn loại bao trùng với loại bao hiện tại thì ko thay đổi gì cả
    } else {
        mega645SelectBao(key);
    }
}
function mega645SelectBao(key) {

    var html = '';

    mega645ArrayBaoAll = new Array();
    $("#mega645CountAllMoney").text('0');

    if (key == 6) {
        mega645CurrentOptSelect = 6;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 6; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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
        mega645CurrentOptSelect = 5;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 6; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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
        mega645CurrentOptSelect = 7;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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
        mega645CurrentOptSelect = 8;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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
        mega645CurrentOptSelect = 9;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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
        mega645CurrentOptSelect = 10;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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
        mega645CurrentOptSelect = 11;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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
        mega645CurrentOptSelect = 12;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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
        mega645CurrentOptSelect = 13;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 2; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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
        mega645CurrentOptSelect = 14;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 2; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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
        mega645CurrentOptSelect = 15;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 2; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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
        mega645CurrentOptSelect = 18;
        html += '<div id="mega645CircleOrderBao' + key + '" class="mega645CircleOrderBao">';
        for (var i = 0; i < 2; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="mega645CircleOrderBao' + key + nameBao + '" class="mega645Circle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 75%" onclick="mega645OpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="mega645BtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
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

    $("#mega645BodyAllBao").html(html);
}

function mega645BtnOnclickRandomDel(num, key_nameBao) {
    var flagInputHidden = $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val();
    if (flagInputHidden == 0) {
        var valArr = new Array();

        while (valArr.length < num) {
            var randomnumber = Math.floor(Math.random() * 45) + 1;
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

        mega645UpdateDataBaoTicker(objNew, "update");

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

        mega645UpdateDataBaoTicker(objNew, "delete");

        $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val(0);
        $("#idSelectedSpanBong__Key_Btn_" + key_nameBao).html('<i class="fa fa-refresh"></i>');
    }

    mega645CountMoneyBaoTicker();
}

function mega645UpdateDataBaoTicker(obj, flag) {
    if (obj != null) {
        var objIndex = mega645ArrayBaoAll.findIndex((o => o.key == obj.key));
        if (flag == 'update') {
            if (objIndex != -1) {
                mega645ArrayBaoAll[objIndex].value = obj.value;
            } else {
                mega645ArrayBaoAll.push(obj);
            }
        } else if (flag == 'delete') {
            var objIndex = mega645ArrayBaoAll.findIndex((o => o.key == obj.key));
            mega645ArrayBaoAll.splice(objIndex, 1);
        }
    }
}

function mega645CountMoneyBaoTicker() {
    var arrKymuaSel = $('#mega645Kymua').val();
    if (arrKymuaSel == null) {
        arrKymuaSel = new Array();
    }

    var typeBao = $("#mega645Muabao option:selected").val();

    var giaveBao = commonMega645DefaultMoneyBao(typeBao);
    var countTicker = mega645ArrayBaoAll.length;
    var giaFinal = arrKymuaSel.length * (giaveBao * countTicker);

    $("#mega645CountAllMoney").text(common_format_number(giaFinal + "", ""));
}

function mega645SelectKymuaChange() {
    mega645CountMoneyBaoTicker();
}

function mega645BtnToChonnhanh() {
    var typeBao = $("#mega645Muabao option:selected").val();
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
            mega645BtnOnclickRandomDel(typeBao + "", (typeBao + "_" + nameBao));
            break;
        }
    }
}

function mega645BuildBodyMainChonSoTo() {
    var html = '';
    for (var k = 1; k <= 45; k++) {
        var numberFor = k;
        if (k < 10) {
            numberFor = "0" + k;
        }
        html += '<span onclick="mega645ModalBodyClickOtron(this);" class="step_to" id="idModalSelectedSpanBong_All_' + numberFor + '">' + numberFor + '</span>';
    }

    $("#mega645ModelMainBuildNumber").html(html);
}

function mega645OpenModalNumber(key_bao) {
    var namebaoTitle = key_bao.substring((key_bao.length - 1), key_bao.length);
    $("#mega645ModelNumberTitle").text(namebaoTitle);

    $("#mega645ModelKeybaoHidden").val(key_bao);
    for (var kk = 1; kk <= 45; kk++) {
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
        var obj = mega645ArrayBaoAll.filter(x => x.key == key_bao);
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

    $("#mega645ModelNumber").modal('show');
}

function mega645ModalBodyClickOtron(doc) {
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

function mega645ModalBtnChonsoSubmit() {
    var arrBosoNew = new Array();
    for (var kk = 1; kk <= 45; kk++) {
        var numberFor = kk;
        if (kk < 10) {
            numberFor = "0" + kk;
        }

        var docId = $("#idModalSelectedSpanBong_All_" + numberFor);
        if ($(docId).hasClass('otron_checked')) {
            arrBosoNew.push(kk);
        }
    }

    var typeBao = $("#mega645Muabao option:selected").val();
    if (arrBosoNew.length != typeBao) {
        commonShowMessage('Bạn phải chọn đúng ' + typeBao + ' số <br> (Bạn đang chọn ' + arrBosoNew.length + ' số)', 'error');
        return;
    }

    var keyBaoHid = $("#mega645ModelKeybaoHidden").val();
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

    mega645UpdateDataBaoTicker(objNew, "update");
    mega645CountMoneyBaoTicker();

    var flagRandomHid = $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val();
    if (flagRandomHid == 0) {
        $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val(1);
        $("#idSelectedSpanBong__Key_Btn_" + keyBaoHid).html('<i class="fa fa-trash-o"></i>');
    }

    $("#mega645ModelNumber").modal('hide');
}

function mega645ViewAllBasket() {
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

    $("#mega645MuabaoBasketNumberTotal").text(allSizeBasket);

    return allSizeBasket;
}

function mega645BtnAddBasket() {
    if (mega645ArrayBaoAll.length > 0) {
        var sizeAllBasketBefore = mega645ViewAllBasket();
        var flagErr = mega645CommonAddBaoCookie();
        var sizeAllBasketAfter = mega645ViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');
            mega645ChangeToBuyNowBtn();
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

function mega645BtnAddBasketThenPay() {
    if (mega645ArrayBaoAll.length > 0) {
        var mega645currentBasketPrice = $("#mega645CountAllMoney").text();
        mega645currentBasketPrice = Number(mega645currentBasketPrice.split(".").join(""));
//        if (mega645currentBasketPrice < 20000) {
//            commonShowMessage('Vui lòng mua thêm, đơn hàng tối thiểu 20.000đ', 'error');
//            return false;
//        }
        var sizeAllBasketBefore = mega645ViewAllBasket();
        var flagErr = mega645CommonAddBaoCookie();
        var sizeAllBasketAfter = mega645ViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessage('Thêm vào giỏ hàng thành công', 'success');
            mega645ChangeToBuyNowBtn();
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

function mega645CommonAddBaoCookie() {
    var max_key = 0;

    var arrMega645 = commonGetCookie("LUCKYBEST_Mega645");
    if (arrMega645 != null && arrMega645 != "" && arrMega645 != undefined) {
        arrMega645 = JSON.parse(arrMega645);

        jQuery.map(arrMega645, function (obj) {
            if (obj.don_hang > max_key)
                max_key = obj.don_hang;
        });
    } else {
        arrMega645 = new Array();
    }

    var arrKymuaSel = $('#mega645Kymua').val();
    if (arrKymuaSel == null) {
        commonShowMessage('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }
    var mega645CurrentBasketPrice = $("#mega645CountAllMoney").text();
    mega645CurrentBasketPrice = Number(mega645CurrentBasketPrice.split(".").join(""));
    if (!basketCheckMaxPriceQuantity(mega645CurrentBasketPrice)) {
        return false;
    }

    var arrSelDataKymua = mega645ArrKymuaService.filter(function (obj) {
        var checkF = jQuery.inArray(obj.drawCode, arrKymuaSel);
        if (checkF != -1 && obj.category == 1) {
            return obj;
        }
    });

    var typeBao = $("#mega645Muabao option:selected").val();

    var obj_donhang = {
        don_hang: (max_key + 1),
        loai_bao: typeBao + "",
        arr_ky_mua: arrSelDataKymua,
        data: mega645ArrayBaoAll
    };

    arrMega645.push(obj_donhang);
    commonSetCookie("LUCKYBEST_Mega645", JSON.stringify(arrMega645));

    mega645ViewAllBasket();

    $('#mega645Muabao')[0].sumo.selectItem(0);
    mega645SelectBao(6);

    return true;
}

function mega645BtnBuyNow() {
    var arrKymuaSel = $('#mega645Kymua').val();
    if (arrKymuaSel == null) {
        commonShowMessage('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }

    if ($("#mega645MuabaoBasketNumberTotal").text() == '0') {
        if (mega645BtnAddBasketThenPay()) {
            window.location.href = requestUrl + '/receive';
        }
    } else {
        window.location.href = requestUrl + '/basket?back=mega645';
    }
}

function mega645ChangeToBuyNowBtn() {
    if ($("#mega645MuabaoBasketNumberTotal").text() == '0') {
        $('button[onclick="mega645BtnBuyNow();"]').text("MUA NGAY");
    } else {
        $('button[onclick="mega645BtnBuyNow();"]').text("XEM GIỎ HÀNG");
    }
}