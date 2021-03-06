var Utils = {};

/** form 값을 json 형식으로 반환한다. */
Utils.getFormValue = function (formObj) {
    var arr = formObj.serializeArray();
    if (arr && arr.length > 0) {
        var values = {};
        for (var i in arr) {
            var obj = arr[i];
            values[obj.name] = obj.value
        }
        return values;
    }
    return null;
}

/** Form 초기화 */
Utils.resetForm = function (formObj) {
    formObj.find('input:text, input:password, input:file, select, textarea').val('');
    formObj.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
}

/** json 객체를 이용한 Form 값설정 */
Utils.setFormValue = function (formObj, jsonData) {
    Utils.getFormValue(formObj);
    $.each(jsonData, function (key, value) {
        var ctrl = formObj.find('[name=' + key + ']');
        if (ctrl.is('select')) {
            $('option', ctrl).each(function () {
                if (this.value == value)
                    this.selected = true;
            });
        } else if (ctrl.is('textarea')) {
            ctrl.val(value);
        } else {
            switch (ctrl.attr("type")) {
                case "text":
                case "hidden":
                    ctrl.val(value);
                    break;
                case "checkbox":
                    if (value == 'on') {
                        ctrl.prop('checked', true);
                    } else {
                        ctrl.prop('checked', false);
                    }
                    break;
            }
        }
    });
}

/** 서버데이터연계 : 비동기/ csrf 추가됨*/
Utils.ajax = function (options, successcb, failcb) {
    var header = $("meta[name='_csrf_header']").attr("content")
    var token = $("meta[name='_csrf']").attr("content")
    $.ajax({
        type: options.type || 'post',
        url: options.url,
        data: options.data,
        beforeSend: function (xhr) {
			xhr.setRequestHeader(header, token)
        },
        success: function () {
            var data = arguments[0];

            successcb(data);
        },
        error: function () {
            var jsonError = arguments[0].responseJSON;
            if (jsonError.status && jsonError.code && jsonError.message && jsonError.detailMessage) {
                var msg = 'TODO 공통오류처리할것!\r\n';
                msg += jsonError.status + '\r\n';
                msg += jsonError.code + '\r\n';
                msg += jsonError.message + '\r\n';
                msg += jsonError.detailMessage;
                alert(msg);
            }
            if (failcb) {
                failcb(arguments);
            }
        },
        complete: function () {
        }
    });
}

/** 서버데이터연계 : 동기*/
Utils.ajaxSync = function (options, successcb, failcb) {


    var mid = Utils.getCookie('memberId');
    var type = Utils.getCookie('conType');

    $.ajax({
        type: options.type || 'post',
        url: options.url,
        data: options.data,
        headers: options.headers,
        async:false,
        beforeSend: function () {
        },
        success: function () {
            var data = arguments[0];

            successcb(data);
        },
        error: function () {
            var jsonError = arguments[0].responseJSON;
            if (jsonError.status && jsonError.code && jsonError.message && jsonError.detailMessage) {
                var msg = 'TODO 공통오류처리할것!\r\n';
                msg += jsonError.status + '\r\n';
                msg += jsonError.code + '\r\n';
                msg += jsonError.message + '\r\n';
                msg += jsonError.detailMessage;
                alert(msg);
            }
            if (failcb) {
                failcb(arguments);
            }
        },
        complete: function () {
        }
    });
}

Utils.setCookie = function (cname, cvalue, exdays) {
    var exdays = exdays || 1;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

Utils.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

Utils.deleteCookie = function (cname) {
    Utils.setCookie(cname, "", -1);
}