//base
function addTab(tabs, node) {

    if (tabs.tabs('exists', node.text)) {
        tabs.tabs('select', node.text);
    } else {
        if (node.children && node.children.length > 0) {
            consoleinfo(node);
            return;
        } else if (node.attributes.url && node.attributes.url.length > 0) {
            if (node.attributes.url.indexOf('druid/index.html') < 0) {/*数据源监控页面不需要开启等待提示*/
                $.messager.progress({
                    text: '页面加载中....',
                    interval: 100
                });
                window.setTimeout(function () {
                    try {
                        $.messager.progress('close');
                    } catch (e) {
                    }
                }, 500);
            }
            tabs.tabs('add', {
                title: node.text,
                closable: true,
                iconCls: node.iconCls,
                content: '<iframe src="' + node.attributes.url + '" frameborder="0" style="border:0;width:100%;height:99.4%;"></iframe>'
            });
        } else {
            tabs.tabs('add', {
                title: node.text,
                closable: true,
                iconCls: node.iconCls,
                content: '<iframe src="error/err.jsp" frameborder="0" style="border:0;width:100%;height:99.4%;"></iframe>'
            });
        }
    }
}

/**
 * 刷新tab
 * @param tabs
 * @param title
 */
function refreshTab(tabs, title) {
    var tab = tabs.tabs('getTab', title);
    tabs.tabs('update', {
        tab: tab,
        options: tab.panel('options')
    });
}


/**
 * @author fengking
 *
 * @requires jQuery,EasyUI
 *
 * 通用错误提示
 *
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
 */
var easyuiErrorFunction = function (XMLHttpRequest) {
    $.messager.progress('close');
    $.messager.alert('错误', XMLHttpRequest.responseText);
};
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.tree.defaults.onLoadError = easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;
$.fn.form.defaults.onLoadError = easyuiErrorFunction;

/**
 * @author fengking
 *
 * @requires jQuery,EasyUI
 *
 * 防止panel/window/dialog组件超出浏览器边界
 * @param left
 * @param top
 */
var easyuiPanelOnMove = function (left, top) {
    var l = left;
    var t = top;
    if (l < 1) {
        l = 1;
    }
    if (t < 1) {
        t = 1;
    }
    var width = parseInt($(this).parent().css('width')) + 14;
    var height = parseInt($(this).parent().css('height')) + 14;
    var right = l + width;
    var buttom = t + height;
    var browserWidth = $(window).width();
    var browserHeight = $(window).height();
    if (right > browserWidth) {
        l = browserWidth - width;
    }
    if (buttom > browserHeight) {
        t = browserHeight - height;
    }
    $(this).parent().css({
        /* 修正面板位置 */
        left: l,
        top: t
    });
};
$.fn.dialog.defaults.onMove = easyuiPanelOnMove;
$.fn.window.defaults.onMove = easyuiPanelOnMove;
$.fn.panel.defaults.onMove = easyuiPanelOnMove;

/**
 * @author fengking
 *
 * @requires jQuery,EasyUI
 *
 * panel关闭时回收内存
 */
$.fn.panel.defaults.onBeforeDestroy = function () {
    var frame = $('iframe', this);
    try {
        if (frame.length > 0) {
            for (var i = 0; i < frame.length; i++) {
                frame[i].contentWindow.document.write('');
                frame[i].contentWindow.close();
            }
            frame.remove();
            if ($.browser.msie) {
                CollectGarbage();
            }
        }
    } catch (e) {
    }
};

/**
 * @author fengking
 *
 * @requires jQuery,EasyUI
 *
 * 扩展validatebox，添加验证两次密码功能
 */
$.extend($.fn.validatebox.defaults.rules, {
    eqPwd: {
        validator: function (value, param) {
            return value == $(param[0]).val();
        },
        message: '密码不一致！'
    }
});

/**
 * @author  fengking
 *
 * 格式化日期时间
 *
 * @param format
 * @returns
 */
Date.prototype.format = function (format) {
    if (isNaN(this.getMonth())) {
        return '';
    }
    if (!format) {
        format = "yyyy-MM-dd hh:mm:ss";
    }
    var o = {
        /* month */
        "M+": this.getMonth() + 1,
        /* day */
        "d+": this.getDate(),
        /* hour */
        "h+": this.getHours(),
        /* minute */
        "m+": this.getMinutes(),
        /* second */
        "s+": this.getSeconds(),
        /* quarter */
        "q+": Math.floor((this.getMonth() + 3) / 3),
        /* millisecond */
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};


/**
 *
 * 增加formatString功能
 *
 * 使用方法：sy.fs('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
 *
 * @returns 格式化后的字符串
 */
formatString = function (str) {
    for (var i = 0; i < arguments.length - 1; i++) {
        str = str.replace("{" + i + "}", arguments[i + 1]);
    }
    return str;
};


/**
 *
 * @requires jQuery
 *
 * 将form表单元素的值序列化成对象
 *
 * @returns object
 */
serializeObject = function (form) {
    var o = {};
    $.each(form.serializeArray(), function (index) {
        if (o[this['name']]) {
            if (this['value'] == '' || this['value'] == null) {

            } else {
                o[this['name']] = o[this['name']] + "," + this['value'];
            }
        } else {
            if (this['value'] == '' || this['value'] == null) {

            } else {
                o[this['name']] = this['value'];
            }
        }
    });
    return o;
};

var myview = $.extend({}, $.fn.datagrid.defaults.view, {
    renderFooter: function (target, container, frozen) {
        var opts = $.data(target, 'datagrid').options;
        var rows = $.data(target, 'datagrid').footer || [];
        var fields = $(target).datagrid('getColumnFields', frozen);
        var table = ['<table class="datagrid-ftable" cellspacing="0" cellpadding="0" border="0"><tbody>'];

        for (var i = 0; i < rows.length; i++) {
            var styleValue = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : '';
            var style = styleValue ? 'style="' + styleValue + '"' : '';
            table.push('<tr class="datagrid-row" datagrid-row-index="' + i + '"' + style + '>');
            table.push(this.renderRow.call(this, target, fields, frozen, i, rows[i]));
            table.push('</tr>');
        }

        table.push('</tbody></table>');
        $(container).html(table.join(''));
    }
});