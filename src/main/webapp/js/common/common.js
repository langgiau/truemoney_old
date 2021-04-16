function commonConstants() {
    var obj = {SUCCESS: 'SUCCESS', ERROR: 'ERROR'};
    return obj;
}

function commonValidateIPaddress(ipaddress) {
    var flag = false;
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        flag = true;
    }
    
    return flag;
}

function commonCheckPRIVI(val) {
    var html = null;
    var exp = $("#partnerAdminBtnClickReportHidden").val();
    var ins = $("#partnerAdminBtnClickInsertHidden").val();
    var upd = $("#partnerAdminBtnClickUpdateHidden").val();
    var del = $("#partnerAdminBtnClickDeleteHidden").val();
    
    if (val == "report") {
        html = exp;
    } else if (val == "insert") {
        html = ins;
    } else if (val == "update") {
        html = upd;
    } else if (val == "delete") {
        html = del;
    }
    
    return html;
}

function commonIsEmpty(val) {
    if (val == 'undefined' || val == undefined || val == 'null' || val == null || val.length <= 0) {
        return "";
    } else {
        return val;
    }
}

function commonStrimData(val) {
    if (val != null && val != undefined) {
        val = val + "";
        val = val.trim();
    }
    
    return val;
}

function commonIsEmptyHTML(val) {
    if (val == 'undefined' || val == undefined || val == 'null' || val == null || val.length <= 0) {
        return "";
    } else {
        return commonHtmlEntities(val);
    }
}

function commonHtmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function commonGetOrderDatatable(orderRow, titleTable) {
    var column = orderRow[0].column;
    var order = orderRow[0].dir;
    var urlOrder = "";
    if (column < titleTable.length) {
        urlOrder = titleTable[column];
    }
    
    urlOrder = urlOrder + " " + order;
    
    return urlOrder;
}

function commonDDMMYYYYFormatDate(dateStr, format) {
    var dateObj = null;
    if (dateStr == "" || dateStr == null) {
        return null;
    }
    try {
        var parts = dateStr.trim().split("/");
        dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
    } catch (err) {
        console.log(err);
    }
    
    return commonFormatDateAll(dateObj, format);
}

function commonYYYYMMDDFormatDate(dateStr, format) {
    var dateObj = null;
    if (dateStr == "" || dateStr == null) {
        return null;
    }
    try {
        if (isNaN(dateStr)) {
            dateStr = dateStr.replace(/-/g, '/');
        }
        
        dateObj = new Date(dateStr);
    } catch (err) {
        console.log(err);
    }
    
    return commonFormatDateAll(dateObj, format);
}

function commonLongToDDMMYYYY(dateLong) {
    var dateObj = null;
    var dateReturn = null;
    
    if (dateLong == "" || dateLong == null) {
        return null;
    }
    
    try {
        dateObj = new Date(parseFloat(dateLong));
    } catch (err) {
        console.log(err);
    }
    
    if (dateObj != null && !isNaN(dateObj.getTime())) {
        dateReturn = commonFormatDateAll(dateObj, 55);
    }
    
    return dateReturn;
}

function commonDDMMYYYYToLong(dateStr) {
    var dateLong = "";
    if (dateStr == "" || dateStr == null) {
        return "";
    }
    try {
        var parts = dateStr.trim().split("/");
        var dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
        dateLong = dateObj.getTime();
    } catch (err) {
        console.log(err);
    }
    
    return dateLong;
}

function commonFormatDateAll(dateObj, format) {
    if (dateObj == "" || dateObj == null) {
        return null;
    }
    
    var html = null;
    try {
        var curr_date = dateObj.getDate();
        var curr_month = (dateObj.getMonth() + 1);
        var curr_year = dateObj.getFullYear();
        
        var curr_hr = dateObj.getHours();
        var curr_min = dateObj.getMinutes();
        var curr_sc = dateObj.getSeconds();
        
        if (curr_month.toString().length == 1) {
            curr_month = '0' + curr_month;
        }
        
        if (curr_date.toString().length == 1) {
            curr_date = '0' + curr_date;
        }
        
        if (curr_hr.toString().length == 1) {
            curr_hr = '0' + curr_hr;
        }
        
        if (curr_min.toString().length == 1) {
            curr_min = '0' + curr_min;
        }
        
        if (curr_sc.toString().length == 1) {
            curr_sc = '0' + curr_sc;
        }
        
        if (format == 1) {
            //dd-mm-yyyy
            html = curr_date + "-" + curr_month + "-" + curr_year;
        } else if (format == 22) {
            //yyyy/mm/dd HH:mm:ss
            html = curr_year + "/" + curr_month + "/" + curr_date + " " + curr_hr + ":" + curr_min + ":" + curr_sc;
        } else if (format == 2) {
            //yyyy-mm-dd HH:mm:ss
            html = curr_year + "-" + curr_month + "-" + curr_date + " " + curr_hr + ":" + curr_min + ":" + curr_sc;
        } else if (format == 3) {
            //dd/mm/yyyy
            html = curr_date + "/" + curr_month + "/" + curr_year;
        } else if (format == 4) {
            //mm/dd/yyyy HH:mm:ss
            html = curr_month + "/" + curr_date + "/" + curr_year + " " + curr_hr + ":" + curr_min + ":" + curr_sc;
        } else {
            //dd/mm/yyyy HH:mm:ss
            html = curr_date + "/" + curr_month + "/" + curr_year + " " + curr_hr + ":" + curr_min + ":" + curr_sc;
        }
    } catch (err) {
        console.log(err);
    }
    
    return html;
}

function commonFormatMsisdn(_msisdn, _pre) {
    var msisdn = "";
    
    if (_msisdn == null || _msisdn == "") {
        return null;
    }
    
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }
    
    if (_msisdn == "" || _pre == "") {
        msisdn = _msisdn + "";
    } else if (_msisdn.startsWith(_pre)) {
        msisdn = _msisdn + "";
    } else if (_msisdn.startsWith("84")) {
        msisdn = _pre + _msisdn.substring(2);
    } else if (_msisdn.startsWith("+84")) {
        msisdn = _pre + _msisdn.substring(3);
    } else if (_msisdn.startsWith("0")) {
        msisdn = _pre + _msisdn.substring(1);
    } else {
        msisdn = _pre + _msisdn + "";
    }
    
    return msisdn;
}

function commonTableLanguage() {
    var TABLE_LANGGUAGE = {
        FIRST_PAGE: jQuery.i18n.prop('FIRST_PAGE'),
        LAST_PAGE: jQuery.i18n.prop('LAST_PAGE'),
        PREVIOUS_PAGE: jQuery.i18n.prop('PREVIOUS_PAGE'),
        NEXT_PAGE: jQuery.i18n.prop('NEXT_PAGE'),
        SZERORECORDS: jQuery.i18n.prop('SZERORECORDS'),
        PROCESSING: jQuery.i18n.prop('PROCESSING'),
        SEARCH: jQuery.i18n.prop('SEARCH'),
        LENGTHMENU: jQuery.i18n.prop('LENGTHMENU'),
        INFO: jQuery.i18n.prop('INFO'),
        INFOEMPTY: jQuery.i18n.prop('INFOEMPTY')
    };
    
    return TABLE_LANGGUAGE;
}

function commonSelectSearchLocale(emptyTitle) {
    var options = {
        emptyTitle: emptyTitle,
        currentlySelected: jQuery.i18n.prop('select_search_currentlySelected'),
        searchPlaceholder: jQuery.i18n.prop('select_search_searchPlaceholder'),
        errorText: jQuery.i18n.prop('select_search_errorText'),
        statusInitialized: jQuery.i18n.prop('select_search_statusInitialized'),
        statusNoResults: jQuery.i18n.prop('select_search_statusNoResults'),
        statusSearching: jQuery.i18n.prop('select_search_statusSearching'),
        statusTooShort: jQuery.i18n.prop('select_search_statusTooShort')
    };
    
    return options;
}

function commonLangOptionDaterangepicker(key, autoShow, idInput) {
    var langLocal = getLocaleContextUtils();
    
    var options = {};
    options.showDropdowns = true;
    options.alwaysShowCalendars = true;
    options.opens = 'center';
    
    if (key == 1) {
        options.singleDatePicker = true;
    } else {
        options.singleDatePicker = false;
    }
    
    if (autoShow == false) {
        options.autoUpdateInput = false;
        
    }
    
    if (idInput != null && idInput != '') {
        $(idInput).on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
        });
        
        $(idInput).on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
        });
    }
    
    if (langLocal == 'vi') {
        options.ranges = {
            'Hôm nay': [moment(), moment()],
            'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '7 ngày qua': [moment().subtract(6, 'days'), moment()],
            '30 ngày qua': [moment().subtract(29, 'days'), moment()],
            'Tháng này': [moment().startOf('month'), moment().endOf('month')],
            'Tháng trước': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        };
        options.locale = {
            format: 'DD/MM/YYYY',
            separator: ' - ',
            applyLabel: 'Đồng ý',
            cancelLabel: 'Hủy',
            fromLabel: 'Từ',
            toLabel: 'Đến',
            customRangeLabel: 'Tùy chỉnh',
            daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            firstDay: 1
        };
    } else {
        options.ranges = {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        };
        options.locale = {
            format: 'DD/MM/YYYY',
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            firstDay: 1
        };
    }
    
    return options;
}

function commonAjaxJson(url, obj, callback) {
    if (url === null && url === '') {
        return null;
    }
    var request = $.ajax({
        url: requestUrl + url,
        cache: false,
        type: "POST",
        data: {json: JSON.stringify(obj)},
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        timeout: 180000,
        complete: callback,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(commonHeaderToken().header, commonHeaderToken().token);
        },
        error: function (err) {
            console.log(err);
            if (err.statusText != 'abort' || err.statusText != 'timeout') {
                commonShowMessage(jQuery.i18n.prop('common_system_busy'), 'error');
            } else if (err.responseJSON == undefined) {
                window.location.href = requestUrl + "/";
            }
        }
    });
    
    return request;
}

function commonAjaxUploadFile(url, formData, callback) {
    if (url === null && url === '') {
        return null;
    }
    $.ajax({
        url: requestUrl + url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        complete: callback,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(commonHeaderToken().header, commonHeaderToken().token);
        },
        error: function (err) {
            console.log(err);
            if (err.statusText != 'abort') {
                commonShowMessage(jQuery.i18n.prop('common_system_busy'), 'error');
            }
        }
    });
}

function commonAlarmValidation(idAlarm, idFocus, text, color) {
    commonAlarm(idAlarm, text, color);
    if (idFocus != null && idFocus != "") {
        document.getElementById(idFocus).focus();
    }
}

function commonToLowerCase(str) {
    var html = "";
    if (str != "" && str != null) {
        html = str.toLowerCase();
    }
    
    return html;
}

function commonToUpperCase(str) {
    var html = "";
    if (str != "" && str != null) {
        html = str.toUpperCase();
    }
    
    return html;
}

function commonAlarm(id, text, color) {
    if (id != null) {
        document.getElementById(id).innerHTML = text;
        document.getElementById(id).style.color = color;
    }
}

function commonComButton(btn) {
    if (btn != null) {
        $(btn).button('reset');
    }
}

function commonHeaderToken() {
    var obj = {
        token: $("meta[name='_csrf']").attr("content"),
        header: $("meta[name='_csrf_header']").attr("content")
    };
    
    return obj;
}

function commonShowMessage(message, type) {
    if (type != null && type.toLowerCase() == 'success') {
        commonNotifyAll(message, "success");
    } else if (type != null && type.toLowerCase() == 'error') {
        commonNotifyAll(message, "warning");
    } else {
        console.log("invalid type");
    }
}

function commonNotifyAll(text, style) {
    
    var time = '3000';
    var $container = $('#notifications');
    var icon = '<i class="fa fa-info-circle "></i>';
    
    if (typeof style == 'undefined') {
        style = 'warning';
    }
    
    var html = $('<div class="alert alert-' + style + '  hide">' + icon + " " + text + '</div>');
    
    $('<a>', {
        text: '×',
        class: 'button close',
        style: 'padding-left: 10px;',
        href: '#',
        click: function (e) {
            e.preventDefault();
            remove_notice();
        }
    }).prependTo(html);
    
    $container.prepend(html);
    html.removeClass('hide').hide().fadeIn('slow');
    
    function remove_notice() {
        html.stop().fadeOut('slow').remove();
    }
    
    var timer = setInterval(remove_notice, time);
    
    $(html).hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(remove_notice, time);
    });
    
    html.on('click', function () {
        clearInterval(timer);
        remove_notice();
    });
}

function commonSetActivateMenu(idBo, idMe) {
    $(".menuUrlLink .menuUrlLinkSub").removeClass("menuRootSelected");
    $("#" + idBo).addClass("menuRootSelected");
    if (idMe != null) {
        $("#" + idMe).addClass("current");
    }
}

function commonSetActivateAdminMenu(idCss) {
    $("#adminMenuCss").removeClass("adminActivateCss");
    $("#" + idCss).addClass("adminActivateCss");
}

function commonUpdateDataTableSelectAllCtrl(table) {
    var $table = table.table().node();
    var $chkbox_all = $('tbody input[type="checkbox"]', $table);
    var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
    var chkbox_select_all = $('table thead tr th input[name="select_all"]');
    
    if ($chkbox_checked.length === 0) {
        chkbox_select_all.prop('checked', false);
        chkbox_select_all.prop('indeterminate', false);
    } else if ($chkbox_checked.length === $chkbox_all.length) {
        chkbox_select_all.prop('indeterminate', false);
        chkbox_select_all.prop('checked', true);
    } else {
        chkbox_select_all.prop('checked', false);
        chkbox_select_all.prop('indeterminate', true);
    }
}

function commonBuildCheckboxListData(id) {
    $(id + '.list-group.checked-list-box .list-group-item').each(function () {
        // Settings
        var $widget = $(this),
                $checkbox = $('<input type="checkbox" class="hidden" />'),
                color = ($widget.data('color') ? $widget.data('color') : "primary"),
                style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
                settings = {
                    on: {
                        icon: 'glyphicon glyphicon-check'
                    },
                    off: {
                        icon: 'glyphicon glyphicon-unchecked'
                    }
                };
        
        $widget.css('cursor', 'pointer');
        $widget.append($checkbox);
        
        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });
        
        
        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');
            
            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");
            
            // Set the button's icon
            $widget.find('.state-icon')
                    .removeClass()
                    .addClass('state-icon ' + settings[$widget.data('state')].icon);
            
            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }
        
        // Initialization
        function init() {
            
            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }
            
            updateDisplay();
            
            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });
}

function commonSetCheckedCheckboxListData(doc) {
    $(doc).addClass('list-group-item-primary active');
    
    var span = $(doc).find('span');
    $(span).removeClass('glyphicon-unchecked');
    $(span).addClass('glyphicon-check');
    
    var cb = $(doc).find('input[type=checkbox]');
    $(cb).prop('checked', true);
}

function commonSetUnCheckedCheckboxListData(doc) {
    $(doc).removeClass('list-group-item-primary active');
    
    var span = $(doc).find('span');
    $(span).removeClass('glyphicon-check');
    $(span).addClass('glyphicon-unchecked');
    
    var cb = $(doc).find('input[type=checkbox]');
    $(cb).prop('checked', false);
}

function commonGetParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function commonRunWaitMe(id) {
    id.waitMe({
        effect: 'timer',
        text: '',
        bg: 'rgba(122, 122, 122, 0.5)',
        color: '#fff'
    });
}

function commonStopWaitMe(id) {
    id.waitMe('hide');
}

function commonCheckEmail(x) {
    var check = true;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        check = false;
    }
    
    return check;
}

function commonFormatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

function commonFormatNumberMoney(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function commonToLetters(num) {
    "use strict";
    var mod = num % 26;
    var pow = num / 26 | 0;
    var out = mod ? String.fromCharCode(64 + mod) : (pow--, 'Z');
    return pow ? toLetters(pow) + out : out;
}

function commonGetColorNumber() {
    var result = "tomato";
    
    var arr = ["tomato", "orange", "dodgerblue", "mediumseagreen", "gray", "slateblue", "violet"];
    var x = Math.floor(Math.random() * 6);
    result = arr[x];
    
    return result;
}

function commonHtmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function commonIsValidDate(s) {
    var bits = s.split('/');
    var d = new Date(bits[2], bits[1] - 1, bits[0]);
    return d && (d.getMonth() + 1) == bits[1];
}

function commonDDMMYYYYToDate(dateStr) {
    var dateObj = null;
    if (dateStr == "" || dateStr == null) {
        return null;
    }
    try {
        var parts = dateStr.trim().split("/");
        dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
    } catch (err) {
        console.log(err);
    }
    
    return dateObj;
}

function commonDDMMYYYYToThisDayDate(dateStr) {
    var dateObj = null;
    if (dateStr == "" || dateStr == null) {
        return null;
    }
    try {
        var parts = dateStr.trim().split("/");
        var dayThis = parseInt(parts[0]);
        var monthThis = parseInt(parts[1] - 1);
        var yearThis = parseInt(parts[2]);
        if (dayThis < 29) {
            dateObj = new Date(yearThis, (monthThis - 1), dayThis);
        } else {
            var maxDayLastMonth = commonGetDaysInMonth((monthThis - 1), yearThis);
            if (maxDayLastMonth < dayThis) {
                dateObj = new Date(yearThis, (monthThis - 1), maxDayLastMonth);
            } else {
                dateObj = new Date(yearThis, (monthThis - 1), dayThis);
            }
        }
    } catch (err) {
        console.log(err);
    }
    
    return dateObj;
}

function commonGetDaysInMonth(m, y)
{
    // if month is Sept, Apr, Jun, Nov return 30 days
    if (/8|3|5|10/.test(m))
        return 30;
    
    // if month is not Feb return 31 days
    if (m != 1)
        return 31;
    
    // To get this far month must be Feb ( 1 )
    // if the year is a leap year then Feb has 29 days
    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0)
        return 29;
    
    // Not a leap year. Feb has 28 days.
    return 28;
}

function formatMsisdn(_msisdn, _pre) {
    
    if (_msisdn == null || _msisdn == "") {
        return _msisdn;
    }
    
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            return this.substr(position || 0, searchString.length) === searchString;
        };
    }
    
    var msisdn = "";
    
    if (_msisdn.startsWith(_pre)) {
        return _msisdn;
    } else if (_msisdn.startsWith("84")) {
        msisdn = _pre + _msisdn.substring(2);
        return msisdn;
    } else if (_msisdn.startsWith("+84")) {
        msisdn = _pre + _msisdn.substring(3);
        return msisdn;
    } else if (_msisdn.startsWith("0")) {
        msisdn = _pre + _msisdn.substring(1);
        return msisdn;
    } else {
        return _pre + _msisdn;
    }
    
}

function convertMsisdn(phonenumber, prefix) {
    var regex = "^(\\+?84|0)?([3,5,7,8,9]\\d{8}|1[2,6,8,9]\\d{8})$";
    
    if (phonenumber.match(regex)) {
        return formatMsisdn(phonenumber, prefix);
    } else {
        return "";
    }
}

function common_format_number(number, prefix, thousand_separator, decimal_separator)
{
    var thousand_separator = thousand_separator || '.',
            decimal_separator = decimal_separator,
            regex = new RegExp('[^' + decimal_separator + '\\d]', 'g'),
            number_string = number.replace(regex, '').toString(),
            split = number_string.split(decimal_separator),
            rest = split[0].length % 3,
            result = split[0].substr(0, rest),
            thousands = split[0].substr(rest).match(/\d{3}/g);
    
    if (thousands) {
        separator = rest ? thousand_separator : '';
        result += separator + thousands.join(thousand_separator);
    }
    result = split[1] != undefined ? result + decimal_separator + split[1] : result;
    return prefix == undefined ? result : (result ? prefix + result : '');
}

function commonSetCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}

function commonGetCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return "";
}

function commonCheckCookie(cname) {
    var user = commonGetCookie(cname);
    if (user != null && user != "" && user != "[]" && user.length > 0) {
        return true;
    } else {
        return false;
    }
}

function commonMax4dDefaultMoneyBao(typeBao, array_elements) {
    var giaveVND = 10000;
    
    if (typeBao == 3) {
        array_elements.sort();
        
        var current = null;
        var cnt = 0;
        var arrCount = new Array();
        for (var i = 0; i < array_elements.length; i++) {
            if (array_elements[i] != current) {
                if (cnt > 0) {
                    arrCount.push(current);
                }
                current = array_elements[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            arrCount.push(current);
        }
        
        var countsObj = {};
        var flagV2 = false;
        for (var ci = 0; ci < array_elements.length; ci++) {
            var num = array_elements[ci];
            countsObj[num] = countsObj[num] ? countsObj[num] + 1 : 1;
        }
        
        if (arrCount.length == 2) {
            var numberOne1 = countsObj[arrCount[0]];
            var numberOne2 = countsObj[arrCount[1]];
            if (numberOne1 == 3 || numberOne2 == 3) {
                flagV2 = true;
            }
        }
        
        var numberTextView = 1;
        if (arrCount.length == 2 && flagV2) {
            numberTextView = 4;
        } else if (arrCount.length == 2) {
            numberTextView = 6;
        } else if (arrCount.length == 3) {
            numberTextView = 12;
        } else if (arrCount.length == 4) {
            numberTextView = 24;
        }
        
        giaveVND = giaveVND * numberTextView;
    } else if (typeBao == 4 || typeBao == 5) {
        giaveVND = 100000;
    }
    
    return giaveVND;
}

function commonMax3dDefaultMoneyBao(typeBao, array_elements) {
    var giaveVND = 10000;
    
    if (typeBao == 3) {
        array_elements.sort();
        
        var current = null;
        var cnt = 0;
        var arrCount = new Array();
        for (var i = 0; i < array_elements.length; i++) {
            if (array_elements[i] != current) {
                if (cnt > 0) {
                    arrCount.push(current);
                }
                current = array_elements[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            arrCount.push(current);
        }
        
        var numberTextView = 1;
        if (arrCount.length == 2) {
            numberTextView = 3;
        } else if (arrCount.length == 3) {
            numberTextView = 6;
        }
        
        giaveVND = giaveVND * numberTextView;
    } else if (typeBao == 4 || typeBao == 5) {
        giaveVND = 100000;
    }
    
    return giaveVND;
}

function commonMax3dPlusDefaultMoneyBao(typeBao, array_elements) {
    var giaveVND = 10000;
    
    if (typeBao == 3) {
        array_elements.sort();
        
        var current = null;
        var cnt = 0;
        var arrCount = new Array();
        for (var i = 0; i < array_elements.length; i++) {
            if (array_elements[i] != current) {
                if (cnt > 0) {
                    arrCount.push(current);
                }
                current = array_elements[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            arrCount.push(current);
        }
        
        var numberTextView = 1;
        if (arrCount.length == 2) {
            numberTextView = 3;
        } else if (arrCount.length == 3) {
            numberTextView = 6;
        }
        
        giaveVND = giaveVND * numberTextView;
    } else if (typeBao == 4 || typeBao == 5) {
        giaveVND = 100000;
    }
    
    return giaveVND;
}

function commonPower655DefaultMoneyBao(typeBao) {
    var giaveVND = 10000;
    
    if (typeBao == 5) {
        giaveVND = 500000;
    } else if (typeBao == 7) {
        giaveVND = 70000;
    } else if (typeBao == 8) {
        giaveVND = 280000;
    } else if (typeBao == 9) {
        giaveVND = 840000;
    } else if (typeBao == 10) {
        giaveVND = 2100000;
    } else if (typeBao == 11) {
        giaveVND = 4620000;
    } else if (typeBao == 12) {
        giaveVND = 9240000;
    } else if (typeBao == 13) {
        giaveVND = 17160000;
    } else if (typeBao == 14) {
        giaveVND = 30030000;
    } else if (typeBao == 15) {
        giaveVND = 50050000;
    } else if (typeBao == 18) {
        giaveVND = 185640000;
    }
    
    return giaveVND;
}

function commonMega645DefaultMoneyBao(typeBao) {
    var giaveVND = 10000;
    
    if (typeBao == 5) {
        giaveVND = 400000;
    } else if (typeBao == 7) {
        giaveVND = 70000;
    } else if (typeBao == 8) {
        giaveVND = 280000;
    } else if (typeBao == 9) {
        giaveVND = 840000;
    } else if (typeBao == 10) {
        giaveVND = 2100000;
    } else if (typeBao == 11) {
        giaveVND = 4620000;
    } else if (typeBao == 12) {
        giaveVND = 9240000;
    } else if (typeBao == 13) {
        giaveVND = 17160000;
    } else if (typeBao == 14) {
        giaveVND = 30030000;
    } else if (typeBao == 15) {
        giaveVND = 50050000;
    } else if (typeBao == 18) {
        giaveVND = 185640000;
    }
    
    return giaveVND;
}

function commonBuildABCAll(key) {
    var html = '';
    if (key == 0) {
        html = 'A';
    } else if (key == 1) {
        html = 'B';
    } else if (key == 2) {
        html = 'C';
    } else if (key == 3) {
        html = 'D';
    } else if (key == 4) {
        html = 'E';
    } else if (key == 5) {
        html = 'F';
    }
    
    return html;
}

function commonSortNumberArr(arr) {
    arr.sort(function (a, b) {
        return parseInt(a) - parseInt(b);
    });
    
    return arr;
}

function commonAllBuildNumberView(category, group, number) {
    if (category == 2) {
        number = number + "";
        while (number.length < 4) {
            number = "0" + number;
        }
        
        if (group == 4) {
            number = "*" + number.slice(1);
        } else if (group == 5) {
            number = number.substring(0, number.length - 1) + "*";
        }
    } else if (category == 4) {
        number = number + "";
        while (number.length < 3) {
            number = "0" + number;
        }
        
        if (group == 4) {
            number = "*" + number.slice(1);
        } else if (group == 5) {
            number = number.substring(0, number.length - 1) + "*";
        }
    } else if (category == 5 || category == 15) {
        
        number = number + "";
        while (number.length < 3) {
            number = "0" + number;
        }
        
        if (group == 4) {
            number = "*" + number.slice(1);
        } else if (group == 5) {
            number = number.substring(0, number.length - 1) + "*";
        }
    } else if (category == 1 || category == 3) {
        if (number < 10) {
            number = "0" + number;
        }
    }
    
    return number;
}

function commonMax4DBuildMoney(category, priceUnit) {
    var html = '';
    
    if (category == 2) {
        html += '<td style="padding-bottom: 10px; color: red">' + common_format_number((parseInt(priceUnit) * 10000) + "", "") + 'đ</td>';
    }
    
    return html;
}

function commonMax3DBuildMoney(category, priceUnit) {
    var html = '';
    
    if (category == 4) {
        html += '<td style="padding-bottom: 10px; color: red">' + common_format_number((parseInt(priceUnit) * 10000) + "", "") + 'đ</td>';
    }
    
    return html;
}

function commonMax3DPlusBuildMoney(category, priceUnit) {
    var html = '';
    
    if (category == 5 || category == 15) {
        html += '<td style="padding-bottom: 10px; color: red">' + common_format_number((parseInt(priceUnit) * 10000) + "", "") + 'đ</td>';
    }
    
    return html;
}

function commonMax4DBuildToHopByGroup(category, group, number) {
    var html = '';
    
    if (category == 2 || category == 3) {
        if (group == 2 || group == 3) {
            number = number + "";
            while (number.length < 4) {
                number = "0" + number;
            }
            
            var array_elements = number.split("");
            
            array_elements.sort();
            
            var current = null;
            var cnt = 0;
            var arrCount = new Array();
            for (var i = 0; i < array_elements.length; i++) {
                if (array_elements[i] != current) {
                    if (cnt > 0) {
                        arrCount.push(current);
                    }
                    current = array_elements[i];
                    cnt = 1;
                } else {
                    cnt++;
                }
            }
            if (cnt > 0) {
                arrCount.push(current);
            }
            
            var countsObj = {};
            var flagV2 = false;
            for (var ci = 0; ci < array_elements.length; ci++) {
                var num = array_elements[ci];
                countsObj[num] = countsObj[num] ? countsObj[num] + 1 : 1;
            }
            
            if (arrCount.length == 2) {
                var numberOne1 = countsObj[arrCount[0]];
                var numberOne2 = countsObj[arrCount[1]];
                if (numberOne1 == 3 || numberOne2 == 3) {
                    flagV2 = true;
                }
            }
            
            var numberTextView = 0;
            if (arrCount.length == 2 && flagV2) {
                numberTextView = 4;
            } else if (arrCount.length == 2) {
                numberTextView = 6;
            } else if (arrCount.length == 3) {
                numberTextView = 12;
            } else if (arrCount.length == 4) {
                numberTextView = 24;
            }
            
            if (group == 3) {
                numberTextView = "x" + numberTextView;
            }
            
            html += numberTextView;
        } else if (group == 4 || group == 5) {
            html = "x10";
        }
    }
//    console.log("boi so : ");
//    console.log(html);
    return html;
}

function commonMax3DBuildToHopByGroup(category, group, number) {
    var html = '';
    
    if (category == 4) {
        if (group == 2 || group == 3) {
            number = number + "";
            while (number.length < 3) {
                number = "0" + number;
            }
            
            var array_elements = number.split("");
            
            array_elements.sort();
            
            var current = null;
            var cnt = 0;
            var arrCount = new Array();
            for (var i = 0; i < array_elements.length; i++) {
                if (array_elements[i] != current) {
                    if (cnt > 0) {
                        arrCount.push(current);
                    }
                    current = array_elements[i];
                    cnt = 1;
                } else {
                    cnt++;
                }
            }
            if (cnt > 0) {
                arrCount.push(current);
            }
            
            var numberTextView = 0;
            if (arrCount.length == 2) {
                numberTextView = 3;
            } else if (arrCount.length == 3) {
                numberTextView = 6;
            }
            
            if (group == 3) {
                numberTextView = numberTextView + "x";
            }
            
            html += numberTextView;
        } else if (group == 4 || group == 5) {
            html = "10x";
        }
    }
    
    return html;
}

function commonMax3DPlusBuildToHopByGroup(category, group, dataVal, flag) {
    var html = '';
    
    if (category == 5) {
        if (group == 2 || group == 3) {
            for (var ckc = 0; ckc < dataVal.length; ckc++) {
                var number = 0;
                if (flag == 1) {
                    number = dataVal[ckc].number;
                } else {
                    number = dataVal[ckc];
                }
                
                number = number + "";
                while (number.length < 3) {
                    number = "0" + number;
                }
                
                var array_elements = number.split("");
                
                array_elements.sort();
                
                var current = null;
                var cnt = 0;
                var arrCount = new Array();
                for (var i = 0; i < array_elements.length; i++) {
                    if (array_elements[i] != current) {
                        if (cnt > 0) {
                            arrCount.push(current);
                        }
                        current = array_elements[i];
                        cnt = 1;
                    } else {
                        cnt++;
                    }
                }
                if (cnt > 0) {
                    arrCount.push(current);
                }
                
                var numberTextView = 0;
                if (arrCount.length == 2) {
                    numberTextView = 3;
                } else if (arrCount.length == 3) {
                    numberTextView = 6;
                }
                
                if (group == 3) {
                    numberTextView = numberTextView + "x";
                }
                
                html += numberTextView;
            }
        } else if (group == 4 || group == 5) {
            html = "10x";
        }
    }
    
    return html;
}

function commonBuildLogoTicker(key) {
    var html = '';
    
    if (key == 3) {
        html = requestUrl + "/static/img/common/power655_logo.png";
    } else if (key == 1) {
        html = requestUrl + "/static/img/common/mega645_logo.png";
    } else if (key == 2) {
        html = requestUrl + "/static/img/common/max4d_logo.png";
    } else if (key == 4) {
        html = requestUrl + "/static/img/common/max3d_logo.png";
    } else if (key == 5) {
        html = requestUrl + "/static/img/common/max3dPlus_logo.png";
    } else if (key == 15) {
        html = requestUrl + "/static/img/common/logo_max3d_dam.png";
    }else if (key == 6) {
        html = requestUrl + "/static/img/common/logo_keno_dam.png";
    }
    
    return html;
}
function commonFormatNumberOmMax3D(number) {
    if (number.length == 1) {
        number = "00" + number;
    }
    if (number.length == 2) {
        number = "0" + number;
    }
    return number;
}

function commonKenoBuildMoney(category, priceUnit) {
    var html = '';
    
    if (category == 6) {
        html += '<td style="padding-bottom: 10px; color: red">' + common_format_number((parseInt(priceUnit) * 10000) + "", "") + 'đ</td>';
    }
    
    return html;
}

function commonShowMessageKeno(message, type) {
    if (type != null && type.toLowerCase() == 'success') {
        commonNotifyAll(message, "success",1);
    } else if (type != null && type.toLowerCase() == 'error') {
        commonNotifyAll(message, "warning",1);
    } else {
        console.log("invalid type");
    }
}
function commonGetKyQuay(paperTicketInfos) {
    return "#"+paperTicketInfos[0].drawInfo.drawId;
}

function commonGetNgayQuay(paperTicketInfos) {
    return paperTicketInfos[0].drawInfo.openDate;
}