$(document).ready(function () {
    getResource(kenoInit);
});

function kenoInit() {
    $('#kenoMuabao').SumoSelect({csvDispCount: 1} );
   // $('#kenoMuabao').SumoSelect(2);

    $('#kenoKymua').SumoSelect({csvDispCount: 1});
    checkKyQuayHienTai();
    receiveClearCookieKeno() ;
    kenoBuildKymuaService();
   // kenoBuildTextBao($('#kenoMuabao').val());
    kenoSelectBao( $('#kenoMuabao').val());
    // kenoViewAllBasket();
 //   kenoChangeToBuyNowBtn();  
    kenoBuildBodyMainChonSoTo();
    // kenoByMinService();
}

function kenoMuabaoBasketBack() {
    window.location.href = requestUrl + '/basket?back=keno';
}


var kenoTimeCurrentCloseOrder = new Date();
var kenoArrKymuaService = new Array();

function kenoBuildKymuaService() {

    var urlInfo = "/action/common/getKenoConfigQsmtInfos";
    var obj = {};
    commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-group")); 
        var result =null;
        if (status == 'success') {
          result = xhr.responseJSON;
        }
        if (result != null) {
            if (result.code == 0) {
                kenoArrKymuaService = result.data;

                var countSelChecked = -1;
                var x = document.getElementById("kenoKymua");
                for (var k = 0; k < kenoArrKymuaService.length; k++) {
                    var obj = kenoArrKymuaService[k];

                  if (moment(new Date()).format("DD/MM/YYYY HH:mm:ss") < moment(obj.closeOrderTime,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm:ss")) {
                        countSelChecked++;
                        var option = document.createElement("option");
                        option.value = obj.drawCode;
                   if (obj.drawCode != null && obj.drawCode != "" && obj.drawCode != "[]" && obj.drawCode != undefined){
                        option.text = "#" + obj.drawCode + " - " + moment(obj.openDate, "DD/MM/YYYY HH:mm:ss").format("HH:mm DD/MM/YYYY ");
                      //  option.selected = true;
                          kenoTimeCurrentCloseOrder = moment(obj.closeOrderTime,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
                        $("#TextKenoDrawCode").text("#"+obj.drawCode);
                        
                    var date_format_close = moment(obj.closeOrderTime, "DD/MM/YYYY HH:mm:ss"); // var date_format_close = moment(obj.closeOrderTime, "DD/MM/YYYY HH:mm:ss");
                    var date_format_current = moment();

                    var diff = date_format_close.diff(date_format_current, 'seconds');
                    
                     $("#TextKenoCountDown").countdowntimer("destroy");
                    $("#TextKenoCountDown").countdowntimer({
                            seconds : diff,
                            displayFormat: "MS"
                        });
                    } 
                    
                        if (countSelChecked == 0) {
                            option.selected = true;
                        }

                        x.add(option);
                    break;
                    }
                }
                 
                $('#kenoKymua')[0].sumo.reload();
                
            } else if (result.code == 999) {
                commonShowMessageKeno('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }       
    });
    
}

var kenoArrayBaoAll = new Array();
var kenoCurrentOptSelect = 0;
function kenoSelectBao1() {

    var typeBao = $("#kenoMuabao option:selected").val();
    if (typeBao == kenoCurrentOptSelect) {
        // nếu chọn loại bao trùng với loại bao hiện tại thì ko thay đổi gì cả
    } else {
        kenoSelectBao();
    }
}

function kenoSelectBao(key) {
    
    kenoBuildBtnMuaNhanh(key)
//    console.log(key);
//    if (key==11){
//    $("#kenoMuabao option:selected").text("LN - CL");
//    } else if(key!=11) {
//    $("#kenoMuabao option:selected").text();
//    }
//    console.log($("#kenoMuabao option:selected").text());
        
    var html = '';
    kenoArrayBaoAll = new Array();
    $("#kenoCountAllMoney").text('0');
    if (key == 1) {
        kenoCurrentOptSelect = 1;
        html += '<div id="kenoCircleOrderBao' + key + '" class="kenoCircleOrderBao">';
        for (var i = 0; i < 6; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" onclick="kenoOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="kenoBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
		    ' 	             </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 2) {
        kenoCurrentOptSelect = 2;
        html += '<div id="kenoCircleOrderBao' + key + '" class="kenoCircleOrderBao">';
        for (var i = 0; i < 6; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" onclick="kenoOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="kenoBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 3) {
        kenoCurrentOptSelect = 3;
        html += '<div id="kenoCircleOrderBao' + key + '" class="kenoCircleOrderBao">';
        for (var i = 0; i < 6; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" onclick="kenoOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="kenoBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 4) {
        kenoCurrentOptSelect = 4;
        html += '<div id="kenoCircleOrderBao' + key + '" class="kenoCircleOrderBao">';
        for (var i = 0; i < 6; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" onclick="kenoOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="kenoBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    }  else if (key == 5) {
        kenoCurrentOptSelect = 5;
        html += '<div id="kenoCircleOrderBao' + key + '" class="kenoCircleOrderBao">';
        for (var i = 0; i < 6; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" onclick="kenoOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
		    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="kenoBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    }  else if (key == 6) {
        kenoCurrentOptSelect = 6;
        html += '<div id="kenoCircleOrderBao' + key + '" class="kenoCircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" onclick="kenoOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="kenoBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 7) {
        kenoCurrentOptSelect = 7;
        html += '<div id="kenoCircleOrderBao' + key + '" class="kenoCircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" onclick="kenoOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_3">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_4">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_5">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_6">&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_7">&nbsp;</span>' +
                    '                </td>' +
                    '                <td style="text-align: right;">' +
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="kenoBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 8) {
        kenoCurrentOptSelect = 8;
        html += '<div id="kenoCircleOrderBao' + key + '" class="kenoCircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" onclick="kenoOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="kenoBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 9) {
        kenoCurrentOptSelect = 9;
        html += '<div id="kenoCircleOrderBao' + key + '" class="kenoCircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" onclick="kenoOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="kenoBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 10) {
        kenoCurrentOptSelect = 10;
        html += '<div id="kenoCircleOrderBao' + key + '" class="kenoCircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" onclick="kenoOpenModalNumber(\'' + key + '_' + nameBao + '\');">' +
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
                    '                    <span class="step_btn" id="idSelectedSpanBong__Key_Btn_' + key + '_' + nameBao + '" onclick="kenoBtnOnclickRandomDel(\'' + key + '\',\'' + key + '_' + nameBao + '\');">' +
                    '                        <i class="fa fa-refresh"></i>' +
                    '                    </span>' +
                    '                </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    } else if (key == 11) {
        kenoCurrentOptSelect = 11;
        html += '<div id="kenoCircleOrderBao' + key + '" class="kenoCircleOrderBao">';
        for (var i = 0; i < 3; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%;">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" >' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1" style= "width: 5em;" onclick="kenoModalTaiChan(\'' + key + '\',\'' + nameBao + '\',\'3\');">Lớn&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2" style= "width: 5em;" onclick="kenoModalXiuLe(\'' + key + '\',\'' + nameBao + '\',\'4\');">Nhỏ&nbsp;</span>' +
                    '                </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        for (var i = 3; i < 6; i++) {
            var nameBao = commonBuildABCAll(i);
            html += '<div class="form-group">' +
                    '    <div id="kenoCircleOrderBao' + key + nameBao + '" class="kenoCircle">' +
                    '        <table style="width: 100%">' +
                    '            <tr>' +
                    '                <td><span class="key">' + nameBao + '</span></td>' +
                    '                <td style="width: 59%" >' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_1" style= "width: 5em;" onclick="kenoModalTaiChan(\'' + key + '\',\'' + nameBao + '\',\'1\');">Chẵn&nbsp;</span>' +
                    '                    <span class="step" id="idSelectedSpanBong_' + key + '_' + nameBao + '_2" style= "width: 5em;" onclick="kenoModalXiuLe(\'' + key + '\',\'' + nameBao + '\',\'2\');">Lẻ&nbsp;</span>' +
                    '                </td>' +
		    '		     <td style="text-align: right; vertical-align: top;">' +
		    '			<select onchange="kenoMuabaoSelMoneyOnchane(this.value,\'' + key + '_' + nameBao + '\');" id="kenoMuabaoSelMoney_' + key + '_' + nameBao + '" class="kenoMuabaoSelMoney_Bg form-control input-sm">' +
		    '			    <option value="1" selected>10K</option>' +
                    '                        <option value="2">20K</option>' +
		    '			    <option value="5">50K</option>' +
		    '			    <option value="10">100K</option>' +
		    '			    <option value="20">200K</option>' +
		    '			    <option value="50">500K</option>' +
		    '			</select>' +
                    '                    <input id="idSelectedSpanBong__Key_Input_Hidden_' + key + '_' + nameBao + '" type="hidden" value="0" />' +
                    '                </td>' +
                    '            </tr>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>';
        }
        html += '</div>';
    }

    $("#kenoBodyAllBao").html(html);
    
}


function kenoBtnOnclickRandomDel(num, key_nameBao) {
    var moneyBoso = $("#kenoMuabaoSelMoney_" + key_nameBao).val();
    var flagInputHidden = $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val();
    var typeBao = $("#kenoMuabao option:selected").val();
    if (flagInputHidden == 0) {
        var valArr = new Array();

        while (valArr.length < num) {
            var randomnumber = Math.floor(Math.random() * 80) +1;
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
            money: moneyBoso,
            value: valArr
        };

       kenoUpdateDataBaoTicker(objNew, "update");

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

       kenoUpdateDataBaoTicker(objNew, "delete");

        $("#idSelectedSpanBong__Key_Input_Hidden_" + key_nameBao).val(0);
        $("#idSelectedSpanBong__Key_Btn_" + key_nameBao).html('<i class="fa fa-refresh"></i>');
    }

   kenoCountMoneyBaoTicker();
}
// kenoBtnOnclickRandomDel(typeBao + "", (typeBao + "_" + nameBao));
function kenoBtnOnclickRandomModalAll() {
    kenoBtnOnclickRandomModalDel();
    
    var typeBao = $("#kenoMuabao option:selected").val();

    var valArr = new Array();
    while (valArr.length < typeBao) {
        var randomnumber = Math.floor(Math.random() * 80) +1;
        if (valArr.indexOf(randomnumber) > -1)
                continue;
        valArr[valArr.length] = randomnumber;
    }

    // valArr = commonSortNumberArr(valArr);

    for (var k = 0; k < valArr.length; k++) {
        var numberRd = valArr[k];
        if (numberRd < 10) {
            numberRd = "0" + numberRd;
            }

        var docId = $("#idModalSelectedSpanBong_All_" + numberRd);
        $(docId).addClass('otron_checked');
        $(docId).css('background-color', 'red');
        $(docId).css('color', 'white');
    }
}

function kenoBtnOnclickRandomModalDel() {
    for (var kk = 1; kk <= 80; kk++) {
            if (kk < 10) {
            kk = "0" + kk;
            }
            var docId = $("#idModalSelectedSpanBong_All_" + kk);
            $(docId).removeClass('otron_checked');
            $(docId).css('background-color', 'white');
            $(docId).css('color', 'red');      
    }
}

function kenoUpdateDataBaoTicker(obj, flag) {
    if (obj != null) {
        var objIndex = kenoArrayBaoAll.findIndex((o => o.key == obj.key));
        if (flag == 'update') {
            if (objIndex != -1) {
                kenoArrayBaoAll[objIndex].money = obj.money;
                kenoArrayBaoAll[objIndex].value = obj.value;
            } else {
                kenoArrayBaoAll.push(obj);
            }
        } else if (flag == 'delete') {
            var objIndex = kenoArrayBaoAll.findIndex((o => o.key == obj.key));
            kenoArrayBaoAll.splice(objIndex, 1);
        }
    }
}

function kenoCountMoneyBaoTicker() {
    var arrKymuaSel = $('#kenoKymua').val();
    if (arrKymuaSel == null) {
        arrKymuaSel = new Array();
    }

    var typeBao = $("#kenoMuabao option:selected").val();

    var giaFinal = 0;
    for (var k = 0; k < kenoArrayBaoAll.length; k++) {
        var obj = kenoArrayBaoAll[k];
        var giaveBao = 10000; 
      var giaveOne = (giaveBao * obj.money);
        giaFinal = giaFinal + giaveOne;
    }

    $("#kenoCountAllMoney").text(common_format_number(giaFinal + "", ""));
}

function kenoSelectKymuaChange() {
    kenoCountMoneyBaoTicker();
}


function kenoBtnToChonnhanh() {
  //  console.log('kenoMuabao:' + $("#kenoMuabao option:selected").val());
    var typeBao = $("#kenoMuabao option:selected").val();
    var indexOf = 6;
    
    if (typeBao > 5 && typeBao <= 10) {
        indexOf = 3;
    } 
    for (var k = 0; k < indexOf; k++) {
        var nameBao = commonBuildABCAll(k);
        var valIdHidden = $("#idSelectedSpanBong__Key_Input_Hidden_" + typeBao + "_" + nameBao).val();
        if (valIdHidden == 0) {
            kenoBtnOnclickRandomDel(typeBao + "", (typeBao + "_" + nameBao));
            break;
        }
    }
}


function kenoBuildBodyMainChonSoTo() {
     var html = '';
    for (var k = 1; k <= 80; k++) {
        var numberFor = k;
        if (k < 10) {
            numberFor = "0" + k;
        }
        html += '<span onclick="kenoModalBodyClickOtron(this);" class="step_to" id="idModalSelectedSpanBong_All_' + numberFor + '">' + numberFor + '</span>';
    }

    $("#kenoModelMainBuildNumberOtron").html(html);
}

function kenoBuildBodyMainChonSoClickMoneyBtn(doc) {
    if (!$(doc).hasClass('btn-danger')) {
        $(".kenoModelNumberRadioMoney").removeClass('btn-danger');
        $(".kenoModelNumberRadioMoney").addClass('btn-default');

        $(doc).addClass('btn-danger');
    }
}

function kenoOpenModalNumber(key_bao) {
    var typeBao = $("#kenoMuabao option:selected").val();

    $("#kenoModelKeybaoHidden").val(key_bao);
        for (var kk = 1; kk <= 80; kk++) {
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
    if (flagRandomHid == 1) {var obj = kenoArrayBaoAll.filter(x => x.key == key_bao);
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

    var moneySel = $("#kenoMuabaoSelMoney_" + key_bao + " option:selected").val();
    var btnModalMoney = $("#kenoBuildBodyMainChonSoClickMoneyBtn_" + moneySel);
    
  //  console.log("moneySel:" + moneySel);
  //  console.log("btnModalMoney:" + btnModalMoney);
    kenoBuildBodyMainChonSoClickMoneyBtn(btnModalMoney);

    $("#kenoModelNumber").modal('show');
}

function kenoModalBodyClickOtron(doc) {
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

function kenoMuabaoSelMoneyOnchane(val, key_nameBao) {
    var objIndex = kenoArrayBaoAll.findIndex((o => o.key == key_nameBao));
    if (objIndex != -1) {
        kenoArrayBaoAll[objIndex].money = val;
        kenoCountMoneyBaoTicker();
    }
}

function kenoModalBtnChonsoSubmit() {
    var arrBosoNew = new Array();
    var moneyBoso = 0;
    var typeBao = $("#kenoMuabao option:selected").val();

var arrBosoNew = new Array();
    for (var kk = 1; kk <= 80; kk++) {
        var numberFor = kk;
        if (kk < 10) {
            numberFor = "0" + kk;
        }

        var docId = $("#idModalSelectedSpanBong_All_" + numberFor);
        if ($(docId).hasClass('otron_checked')) {
            arrBosoNew.push(kk);
        }
    }
    
    if (arrBosoNew.length != typeBao) {
        commonShowMessageKeno('Bạn phải chọn đúng ' + typeBao + ' số <br> (Bạn đang chọn ' + arrBosoNew.length + ' số)', 'error');
        return;
    }


    var keyBaoHid = $("#kenoModelKeybaoHidden").val();
  //  console.log("keyBaoHid:" +keyBaoHid);
    for (var k = 0; k < arrBosoNew.length; k++) {
        var numFor = arrBosoNew[k];
        if (numFor < 10) {
            numFor = "0" + numFor;
        }
      //  console.log('numFor: '+ numFor);
        $("#idSelectedSpanBong_" + keyBaoHid + "_" + (k + 1)).text(numFor);
    }

    $(".kenoModelNumberRadioMoney").each(function () {
        if ($(this).hasClass('btn-danger')) {
            var idBtnAct = $(this).prop('id');
            var numMoney = idBtnAct.replace("kenoBuildBodyMainChonSoClickMoneyBtn_", "");
            $("#kenoMuabaoSelMoney_" + keyBaoHid).val(numMoney);
            moneyBoso = numMoney;
        }
    });
    
 //   console.log("moneyBoso: " + moneyBoso);
 //   console.log("arrBosoNew: " + arrBosoNew);
    var objNew = {
        key: keyBaoHid,
        money: moneyBoso,
        value: arrBosoNew
    };

    kenoUpdateDataBaoTicker(objNew, "update");
    kenoCountMoneyBaoTicker();

    var flagRandomHid = $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val();
    if (flagRandomHid == 0) {
        $("#idSelectedSpanBong__Key_Input_Hidden_" + keyBaoHid).val(1);
        $("#idSelectedSpanBong__Key_Btn_" + keyBaoHid).html('<i class="fa fa-trash-o"></i>');
    }

    $("#kenoModelNumber").modal('hide');
}

function kenoViewAllBasket() {
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

    var arrKeno = commonGetCookie("LUCKYBEST_Keno");
    if (arrKeno != null && arrKeno != "" && arrKeno != undefined) {
        arrKeno = JSON.parse(arrKeno);

        allSizeBasket += arrKeno.length;
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

    $("#kenoMuabaoBasketNumberTotal").text(allSizeBasket);

    return allSizeBasket;
}

function kenoBtnAddBasket() {
    if (kenoArrayBaoAll.length > 0) {
        var sizeAllBasketBefore = kenoViewAllBasket();
        var flagErr = kenoCommonAddBaoCookie();
        var sizeAllBasketAfter = kenoViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessageKeno('Thêm vào giỏ hàng thành công', 'success');
         //   kenoChangeToBuyNowBtn();
            return true;
        } else if (flagErr && (sizeAllBasketAfter == sizeAllBasketBefore)) {
            commonShowMessageKeno('Giỏ hàng đã đầy, vui lòng thanh toán', 'error');
            return false;
        }
    } else {
        commonShowMessageKeno('Bạn chưa chọn bộ số nào', 'error');
        return false;
    }
}

function kenoBtnAddBasketThenPay() {
    if (kenoArrayBaoAll.length > 0) {
        var kenocurrentBasketPrice = $("#kenoCountAllMoney").text();
        kenocurrentBasketPrice = Number(kenocurrentBasketPrice.split(".").join(""));
      //  if (kenocurrentBasketPrice < 20000) {
      //      commonShowMessageKeno('Đối với sản phẩm Keno, giá trị tối thiểu cho 1 đơn hàng là 20.000đ. Xin Quý khách vui lòng đặt lại !', 'error');
      //      return false;
      //  }
      //   if (kenocurrentBasketPrice < kenoByMin.minKenoWeb) {
      //       commonShowMessage(kenoByMin.messageKeno, 'error');
      //       return false;
      //   }

        var sizeAllBasketBefore = kenoViewAllBasket();
        var flagErr = kenoCommonAddBaoCookie();
        var sizeAllBasketAfter = kenoViewAllBasket();

        if (flagErr && (sizeAllBasketAfter > sizeAllBasketBefore)) {
            commonShowMessageKeno('Thêm vào giỏ hàng thành công', 'success');
          //  kenoChangeToBuyNowBtn();
            return true;
        } else if (flagErr && (sizeAllBasketAfter == sizeAllBasketBefore)) {
            commonShowMessageKeno('Giỏ hàng đã đầy, vui lòng thanh toán', 'error');
            return false;
        }
    } else {
        commonShowMessageKeno('Bạn chưa chọn bộ số nào', 'error');
        return false;
    }
}

function kenoCommonAddBaoCookie() {
    var max_key = 0;

    var arrKeno = commonGetCookie("LUCKYBEST_Keno");
    if (arrKeno != null && arrKeno != "" && arrKeno != undefined) {
        arrKeno = JSON.parse(arrKeno);
      //  console.log(arrKeno);
    
        jQuery.map(arrKeno, function (obj) {
            if (obj.don_hang > max_key)
            //    max_key = obj.don_hang;
        console.log('don_hang :'+obj.don_hang);
        commonShowMessageKeno('Quý khách đang mua nhiều hơn 1 đơn hàng Keno cho 1 lần thanh toán. Vui lòng thao tác lại.', 'error');
        return false;
           
        });
    } else {
        arrKeno = new Array();
    

    var arrKymuaSel = $('#kenoKymua').val();
    if (arrKymuaSel == null) {
        commonShowMessageKeno('Bạn chưa chọn kỳ quay', 'error');
        return false;
    }
    
    var kenoCurrentBasketPrice = $("#kenoCountAllMoney").text();
    kenoCurrentBasketPrice = Number(kenoCurrentBasketPrice.split(".").join(""));  

    var arrSelDataKymua = kenoArrKymuaService.filter(function (obj) {
        if (obj.drawCode == $('#kenoKymua').val() ) {
            return obj;  
        }
 
    }       
    )
   

    var typeBao = $("#kenoMuabao option:selected").val();

    var obj_donhang = {
        don_hang: (max_key + 1),
        loai_bao: typeBao + "",
        arr_ky_mua: arrSelDataKymua,
        data: kenoArrayBaoAll
    };

    arrKeno.push(obj_donhang);
    commonSetCookie("LUCKYBEST_Keno", JSON.stringify(arrKeno));
    
    console.log('obj_donhang:' + obj_donhang);
    console.log('JSON.stringify(arrKeno):' + JSON.stringify(arrKeno));

    kenoViewAllBasket();

    $('#kenoMuabao')[0].sumo.selectItem(0);
    kenoSelectBao();

    return true;
    }
}
function kenoBtnBuyNow() {
    //    commonSetCookie("TextKenoCountDown", "");

    var arrKymuaSel = $('#kenoKymua').val();
    var firstArrKymuaSel = $('#kenoKymua').val();
    var firstTimeCloseOrder = kenoTimeCurrentCloseOrder;

    var urlInfo = "/action/common/getKenoConfigQsmtInfos";
    var obj = {};
    var kenoArrKy = new Array();
     commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-group")); 
        var result =null;
        if (status == 'success') {
          result = xhr.responseJSON;
        }
        if (result != null) {        
                kenoBuildKymuaService(); 
                kenoArrKy = result.data;  
                var obj = kenoArrKy[0];
                        if (arrKymuaSel == null) {
                        commonShowMessageKeno('Bạn chưa chọn kỳ quay', 'error');
                        return false;
                        } else if (kenoArrayBaoAll.length == 0) {
                            if (kenoCurrentOptSelect <=10) {
                                commonShowMessageKeno('Bạn chưa chọn bộ số nào', 'error'); 
                            } else {
                                commonShowMessageKeno('Bạn chưa chọn loại vé hợp lệ', 'error'); 
                            }                               
                        
                        return false; 
                        } else if (obj.drawCode == null || obj.drawCode == "" || obj.drawCode == "[]" || obj.drawCode == "undefined") {
                            commonShowMessageKeno('Không có kỳ quay phục vụ trong thời gian này. Quý khách vui lòng quay trở lại sau !', 'error'); 
                            return false;
                        } else if (firstTimeCloseOrder < moment(new Date()).format("DD/MM/YYYY HH:mm:ss")) {
                            commonShowMessageKeno('Đã hết thời gian đặt mua cho kỳ quay: ' + firstArrKymuaSel +'. Bạn có thể tiếp tục mua vé cho kỳ quay: ' + obj.drawCode, 'error'); 
                            return false;
                        } else {

                          if (kenoBtnAddBasketThenPay()) {         
                            window.location.href = requestUrl + '/receive';
                        }
                                }             
        }       
    });

}
    
function receiveClearCookieKeno() {
    commonSetCookie("LUCKYBEST_Keno", "");
}



function checkKyQuayHienTai() {
    var urlInfo = "/action/common/getKenoConfigQsmtInfos";
    var obj = {};
    var kenoArrKy = new Array();
    commonRunWaitMe($(".panel-group"));
    commonAjaxJson(urlInfo, obj, function (xhr, status) {
        commonStopWaitMe($(".panel-group")); 
        var result =null;
        if (status == 'success') {
          result = xhr.responseJSON;
        }
        if (result != null) {
                kenoArrKy = result.data;  
                
                    var obj = kenoArrKy[0];
                        if (obj.drawCode == null || obj.drawCode == "" || obj.drawCode == "[]" || obj.drawCode == "undefined") {
                            commonShowMessageKeno('Không có kỳ quay phục vụ trong thời gian này. Quý khách vui lòng quay trở lại sau !', 'error');
                        return false;
                        } else if ( moment(obj.openDate,"DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY HH:mm:ss") > moment(new Date()).subtract(-10, "minutes").format("DD/MM/YYYY HH:mm:ss")) {
                            var intCurentKyMua = parseInt(obj.drawCode, 10) -1;
                            if (intCurentKyMua.toString().length ==4){
                            var strCurentKyMua ='000' + intCurentKyMua;
                            } else if(intCurentKyMua.toString().length ==5) {
                            var strCurentKyMua ='00' + intCurentKyMua;
                            } else if(intCurentKyMua.toString().length ==6) {
                            var strCurentKyMua ='0' + intCurentKyMua;
                            }
                            commonShowMessageKeno('Thời gian đặt vé kỳ này #' + strCurentKyMua +' đã hết. Vé bạn đặt sẽ là của kỳ #' + obj.drawCode +'. Vé sẽ được xử lý khi kết thúc kỳ số #'+ strCurentKyMua, 'error'); 
                        return false;
                        }
        }       
    });
}

function kenoModalTaiChan(key,bao,value) {
    var check = null;
     var x = document.getElementById('idSelectedSpanBong_' + key + '_' + bao +'_1');
     var x1 = document.getElementById('idSelectedSpanBong_' + key + '_' + bao +'_2');
    if (key==11 && value ==3){
        if (x1.style.backgroundColor === 'rgb(39, 170, 225)') {
            x1.style.backgroundColor = 'white';
            x1.style.color = '#464646';
        }
      //  console.log("backgroundColor:" + x.style.backgroundColor);
        if (x.style.backgroundColor === 'rgb(190, 30, 45)') {
            x.style.backgroundColor = 'white';
            x.style.color = '#464646';
            check = 0;
        } else {
            x.style.backgroundColor = '#BE1E2D';
            x.style.color = 'white';
            check = 1;
        }
    } else if (key==11 && value ==1) {
        if (x1.style.backgroundColor === 'rgb(221, 85, 54)') {
            x1.style.backgroundColor = 'white';
            x1.style.color = '#464646';
        }
       // console.log("backgroundColor:" + x.style.backgroundColor);
        if (x.style.backgroundColor === 'rgb(0, 166, 81)') {
            x.style.backgroundColor = 'white';
            x.style.color = '#464646';
            check = 0;
        } else {
            x.style.backgroundColor = '#00A651';
            x.style.color = 'white';
            check = 1;
        }
    }

    var keyBaoHid = key + '_' + bao;
    var moneyBoso = $("#kenoMuabaoSelMoney_" + key + '_' + bao + " option:selected").val();

    if (check ==1 && value ==3) {
        var objNew = {
        key: keyBaoHid,
        money: moneyBoso,
        value: [3]
    };

        kenoUpdateDataBaoTicker(objNew, "update");
        kenoCountMoneyBaoTicker();
    } else if (check ==1 && value ==1) {
        var objNew = {
        key: keyBaoHid,
        money: moneyBoso,
        value: [1]
    };

        kenoUpdateDataBaoTicker(objNew, "update");
        kenoCountMoneyBaoTicker();
    } else {
        var objNew = {
        key: keyBaoHid,
        money: moneyBoso,
        value: new Array()
    };

        kenoUpdateDataBaoTicker(objNew, "delete");
        kenoCountMoneyBaoTicker();
    }
}

function kenoModalXiuLe(key,bao,value) {
     var check = null;
     var x = document.getElementById('idSelectedSpanBong_' + key + '_' + bao + '_1');
     var x1 = document.getElementById('idSelectedSpanBong_' + key + '_' + bao + '_2');
    if (key==11 && value ==4){
        
        if (x.style.backgroundColor === 'rgb(190, 30, 45)') {
            x.style.backgroundColor = 'white';
            x.style.color = '#464646';
            x.style.border =='red solid 1px;';
        }
      //  console.log("backgroundColor:" + x1.style.backgroundColor);
        if (x1.style.backgroundColor === 'rgb(39, 170, 225)') {
            x1.style.backgroundColor = 'white';
            x1.style.color = '#464646';
            x1.style.border =='red solid 1px;';
            check =0;
        } else {
            x1.style.backgroundColor = '#27AAE1';
            x1.style.color = 'white';
            x.style.border =='#27AAE1 solid 1px;';
            check =1;
        }
    } else if (key==11 && value ==2) {
        
        if (x.style.backgroundColor === 'rgb(0, 166, 81)') {
            x.style.backgroundColor = 'white';
            x.style.color = '#464646';
        }
     //   console.log("backgroundColor:" + x1.style.backgroundColor);
        if (x1.style.backgroundColor === 'rgb(221, 85, 54)') {
            x1.style.backgroundColor = 'white';
            x1.style.color = '#464646';
            check = 0;
        } else {
            x1.style.backgroundColor = '#DD5536';
            x1.style.color = 'white';
            check =1;
        }
    }
    var keyBaoHid = key + '_' + bao;
    // console.log('keyBaoHid: '+ keyBaoHid);
    var moneyBoso = $("#kenoMuabaoSelMoney_" + key + '_' + bao + " option:selected").val();

    if (check ==1 && value ==4) {
        var objNew = {
        key: keyBaoHid,
        money: moneyBoso,
        value: [4]
    };
  //  console.log(objNew);
        kenoUpdateDataBaoTicker(objNew, "update");
        kenoCountMoneyBaoTicker();
    } else if (check ==1 && value ==2) {
        var objNew = {
        key: keyBaoHid,
        money: moneyBoso,
        value: [2]
    };
 //   console.log(objNew);
        kenoUpdateDataBaoTicker(objNew, "update");
        kenoCountMoneyBaoTicker();
    }  else {
        var objNew = {
        key: keyBaoHid,
        money: moneyBoso,
        value: new Array()
    };

        kenoUpdateDataBaoTicker(objNew, "delete");
        kenoCountMoneyBaoTicker();
    }
}
function kenoBuildBtnMuaNhanh(key) {
   
 //   console.log(key);
    var html='';
    if (key <=10) {
      html +='<div class="form-group">'+
             '               <button type="button" onclick="kenoBtnToChonnhanh();" class="btn btn-warning btn-block btn-md">CHỌN NHANH</button>'+
             '           </div>'  
    }
   $("#kenoBtnMuaNhanh").html(html); 
}

var kenoByMin;

function kenoByMinService() {
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
                // kenoByMin = JSON.parse(result.configByMin);
                // console.log(kenoByMin);

            } else if (result.code == 999) {
                commonShowMessage('Hệ thống bận, vui lòng thử lại sau', 'error');
            }
        }
    });
}