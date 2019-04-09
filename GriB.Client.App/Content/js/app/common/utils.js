define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createEventListener(elemName, eventName, clickFunc, thisObject, view) {
        var result = $.proxy(clickFunc, thisObject);
        var elem = elemName instanceof $ ? elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
        for (var i = 0, iCount = elem.length; i < iCount; i++)
            elem[i].addEventListener(eventName, result, false);
        return result;
    }
    exports.createEventListener = createEventListener;
    function destroyEventListener(elemName, eventName, proxyFunc, view) {
        var elem = elemName instanceof $ ? elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
        for (var i = 0, iCount = elem.length; i < iCount; i++)
            elem[i].removeEventListener(eventName, proxyFunc);
    }
    exports.destroyEventListener = destroyEventListener;
    function createClickEvent(elemName, clickFunc, thisObject, view) {
        return createEventListener(elemName, "click", clickFunc, thisObject, view);
    }
    exports.createClickEvent = createClickEvent;
    function destroyClickEvent(elemName, proxyFunc, view) {
        return destroyEventListener(elemName, "click", proxyFunc, view);
    }
    exports.destroyClickEvent = destroyClickEvent;
    function createTouchClickEvent(elemName, clickFunc, thisObject, view) {
        return createEventListener(elemName, ("ontouchstart" in window) ? "touchend" : "click", clickFunc, thisObject, view);
    }
    exports.createTouchClickEvent = createTouchClickEvent;
    function destroyTouchClickEvent(elemName, proxyFunc, view) {
        return destroyEventListener(elemName, ("ontouchstart" in window) ? "touchend" : "click", proxyFunc, view);
    }
    exports.destroyTouchClickEvent = destroyTouchClickEvent;
    function createDblTouchClickEvent(elemName, clickFunc, thisObject, view) {
        return createEventListener(elemName, ("ontouchstart" in window) ? "touchend" : "dblclick", clickFunc, thisObject, view);
    }
    exports.createDblTouchClickEvent = createDblTouchClickEvent;
    function destroyDblTouchClickEvent(elemName, proxyFunc, view) {
        return destroyEventListener(elemName, ("ontouchstart" in window) ? "touchend" : "dblclick", proxyFunc, view);
    }
    exports.destroyDblTouchClickEvent = destroyDblTouchClickEvent;
    function createContextMenuEvent(elemName, clickFunc, thisObject, view) {
        return createEventListener(elemName, "contextmenu", clickFunc, thisObject, view);
    }
    exports.createContextMenuEvent = createContextMenuEvent;
    function destroyContextMenuEvent(elemName, proxyFunc, view) {
        return destroyEventListener(elemName, "contextmenu", proxyFunc, view);
    }
    exports.destroyContextMenuEvent = destroyContextMenuEvent;
    function createBlurEvent(elemName, clickFunc, thisObject, view) {
        return createEventListener(elemName, "blur", clickFunc, thisObject, view);
    }
    exports.createBlurEvent = createBlurEvent;
    function destroyBlurEvent(elemName, proxyFunc, view) {
        return destroyEventListener(elemName, "blur", proxyFunc, view);
    }
    exports.destroyBlurEvent = destroyBlurEvent;
    function isNullOrEmpty(value) {
        return (value === null || value === undefined || value === '');
    }
    exports.isNullOrEmpty = isNullOrEmpty;
    function validateEmail(email) {
        if (!email)
            return false;
        var pattern = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/i;
        return pattern.test(email);
    }
    exports.validateEmail = validateEmail;
    function validatePhone(phone) {
        if (!phone)
            return false;
        var pattern = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
        return pattern.test(phone);
    }
    exports.validatePhone = validatePhone;
    function stringFormat() {
        var args1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args1[_i] = arguments[_i];
        }
        var args = Array.prototype.slice.call(arguments, 1);
        return arguments[0].replace(/\{(\d+)\}/g, function (match, index) {
            return args[index];
        });
    }
    exports.stringFormat = stringFormat;
    ;
    function dateToLongString(date) {
        return date.toLocaleString();
    }
    exports.dateToLongString = dateToLongString;
    function dateToday() {
        var result = new Date();
        result.setHours(0, 0, 0, 0);
        return result;
    }
    exports.dateToday = dateToday;
    function date_parse(date) {
        var result; // = new Date();
        var split1 = date.split(' ');
        var splitDate = (split1.length > 0 ? split1[0].split('.') : []);
        var splitTime = (split1.length > 1 ? split1[1].split(':') : []);
        result = new Date(parseInt(splitDate[2], 10), parseInt(splitDate[1], 10) - 1, parseInt(splitDate[0], 10), splitTime.length > 0 ? parseInt(splitTime[0], 10) : 0, splitTime.length > 1 ? parseInt(splitTime[1], 10) : 0, splitTime.length > 2 ? parseInt(splitTime[2], 10) : 0);
        return result;
    }
    exports.date_parse = date_parse;
    window.date_parse = date_parse;
    function date_ddmmyyyy(date) {
        var _date = (date ? (typeof date === 'string' || date instanceof String ? date_parse(date) : date) : new Date());
        var yyyy = _date.getFullYear().toString();
        var mm = (_date.getMonth() + 1).toString(); // getMonth() is zero-based         
        var dd = _date.getDate().toString();
        return (dd[1] ? dd : '0' + dd[0]) + '.' + (mm[1] ? mm : '0' + mm[0]) + '.' + yyyy;
    }
    exports.date_ddmmyyyy = date_ddmmyyyy;
    ;
    window.date_ddmmyyyy = date_ddmmyyyy;
    function date_ddmmyyyy_withtime(date) {
        var _date = (date ? (typeof date === 'string' || date instanceof String ? new Date(date) : date) : new Date());
        var yyyy = _date.getFullYear().toString();
        var mm = (_date.getMonth() + 1).toString(); // getMonth() is zero-based         
        var dd = _date.getDate().toString();
        var hh = _date.getHours().toString();
        var mn = _date.getMinutes().toString();
        var ss = _date.getSeconds().toString();
        return (dd[1] ? dd : '0' + dd[0]) + '.' + (mm[1] ? mm : '0' + mm[0]) + '.' + yyyy + ' ' + (hh[1] ? hh : '0' + hh[0]) + ':' + (mn[1] ? mn : '0' + mn[0]) + ':' + (ss[1] ? ss : '0' + ss[0]);
    }
    exports.date_ddmmyyyy_withtime = date_ddmmyyyy_withtime;
    ;
    window.date_ddmmyyyy_withtime = date_ddmmyyyy_withtime;
    function date_from_ddmmyyyy(dateStr) {
        var parts = dateStr.split(".");
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]), 0, 0, 0, 0);
    }
    exports.date_from_ddmmyyyy = date_from_ddmmyyyy;
    ;
    window.date_from_ddmmyyyy = date_from_ddmmyyyy;
    function numberToString(value, decimal) {
        var result = "";
        if (value || value === 0) {
            if (value === 0)
                result = '-';
            else
                result = value.toFixed(decimal); // parseFloat(value).toFixed(2);
        }
        return result;
    }
    exports.numberToString = numberToString;
    window.numberToString = numberToString;
    function numberPadZero(value, length) {
        var str = '' + value;
        while (str.length < length)
            str = '0' + str;
        return str;
    }
    exports.numberPadZero = numberPadZero;
    window.numberPadZero = numberPadZero;
    /**
     * @see http://stackoverflow.com/q/7616461/940217
     * @return {number}
     */
    function strToHashCode(value) {
        var hash = 0;
        if (value && value.length !== 0) {
            if (Array.prototype.reduce) {
                hash = value.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
            }
            else {
                for (var i = 0, icount = value.length; i < icount; i++) {
                    var character = value.charCodeAt(i);
                    hash = ((hash << 5) - hash) + character;
                    hash = hash & hash; // Convert to 32bit integer
                }
            }
        }
        return hash;
    }
    exports.strToHashCode = strToHashCode;
    window.strToHashCode = strToHashCode;
    function PrintElem(elem, title, offset) {
        // Title constructor
        title = title || $('title').text();
        // Offset for the print
        offset = offset || 0;
        // Loading start
        var dStart = Math.round(new Date().getTime() / 1000), $html = $('html');
        var i = 0;
        // Start building HTML
        var HTML = '<html';
        if (typeof ($html.attr('lang')) !== 'undefined') {
            HTML += ' lang=' + $html.attr('lang');
        }
        if (typeof ($html.attr('id')) !== 'undefined') {
            HTML += ' id=' + $html.attr('id');
        }
        if (typeof ($html.attr('xmlns')) !== 'undefined') {
            HTML += ' xmlns=' + $html.attr('xmlns');
        }
        // Close HTML and start build HEAD
        HTML += '><head>';
        // Get all meta tags
        $('head > meta').each(function () {
            var $this = $(this), $meta = '<meta';
            if (typeof ($this.attr('charset')) !== 'undefined') {
                $meta += ' charset=' + $this.attr('charset');
            }
            if (typeof ($this.attr('name')) !== 'undefined') {
                $meta += ' name=' + $this.attr('name');
            }
            if (typeof ($this.attr('http-equiv')) !== 'undefined') {
                $meta += ' http-equiv=' + $this.attr('http-equiv');
            }
            if (typeof ($this.attr('content')) !== 'undefined') {
                $meta += ' content=' + $this.attr('content');
            }
            $meta += ' />';
            HTML += $meta;
            i++;
        }).promise().done(function () {
            // Insert title
            HTML += '<title>' + title + '</title>';
            // Let's pickup all CSS files for the formatting
            $('head > link[rel="stylesheet"]').each(function () {
                HTML += '<link rel="stylesheet" href="' + $(this).attr('href') + '" />';
                i++;
            }).promise().done(function () {
                // Print setup
                HTML += '<style>body{display:none;}@media print{body{display:block;}}</style>';
                // Finish HTML
                HTML += '</head><body>';
                HTML += '<h1 class="text-center mb-3">' + title + '</h1>';
                HTML += elem.html();
                HTML += '</body></html>';
                // Open new window
                var printWindow = window.open('', 'PRINT', 'height=' + $(window).height() + ',width=' + $(window).width());
                // Append new window HTML
                printWindow.document.write(HTML);
                printWindow.document.close(); // necessary for IE >= 10
                printWindow.focus(); // necessary for IE >= 10*/
                console.log(printWindow.document);
                /* Make sure that page is loaded correctly */
                $(printWindow).on('load', function () {
                    setTimeout(function () {
                        // Open print
                        //printWindow.print();
                        // Close on print
                        //////setTimeout(function () {
                        //////    printWindow.close();
                        //////    return true;
                        //////}, 3);
                    }, (Math.round(new Date().getTime() / 1000) - dStart) + i + offset);
                });
            });
        });
    }
    function printDocumentPage(documentPage) {
        //PrintElem(documentPage, 'PRINT', 0);
        var elem = documentPage instanceof $ ? documentPage : $("#" + documentPage);
        var printWindow = window.open("", "new div", "");
        printWindow.document.write("<html><head><title></title>");
        printWindow.document.write("<link type=\"text/css\" rel=\"stylesheet\" href=\"/Content/css/app.print.min.css\"  media=\"screen, projection, print\"/>");
        printWindow.document.write("</head><body >");
        printWindow.document.write((elem && elem.length > 0 ? elem[0].innerHTML : ''));
        printWindow.document.write("</body></html>");
        //printWindow.print();
        //var htmlPrint = "<html><head><title></title></head><body>";
        //htmlPrint += (elem && elem.length > 0 ? elem[0].innerHTML : '');
        //htmlPrint += "</body>";
        //let oldHtml = document.body.innerHTML;
        //document.body.innerHTML = (elem && elem.length > 0 ? elem[0].innerHTML : ''); //htmlPrint;
        printWindow.print();
        //document.body.innerHTML = oldHtml;
        return true;
    }
    exports.printDocumentPage = printDocumentPage;
    window.printDocumentPage = printDocumentPage;
});
//export function browserName():string {
//    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
//        alert('Opera');
//    }
//    else if (navigator.userAgent.indexOf("Chrome") != -1) {
//        alert('Chrome');
//    }
//    else if (navigator.userAgent.indexOf("Safari") != -1) {
//        alert('Safari');
//    }
//    else if (navigator.userAgent.indexOf("Firefox") != -1) {
//        alert('Firefox');
//    }
//    else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
//    {
//        alert('IE');
//    }
//    else {
//        alert('unknown');
//    }
//}
//# sourceMappingURL=utils.js.map