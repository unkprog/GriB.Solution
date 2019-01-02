define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createTouchClickEvent(elemName, clickFunc, thisObject, view) {
        var result = $.proxy(clickFunc, thisObject);
        var elem = elemName instanceof $ ? elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
        for (var i = 0, iCount = elem.length; i < iCount; i++)
            elem[i].addEventListener(("ontouchstart" in window) ? "touchend" : "click", result, false);
        return result;
    }
    exports.createTouchClickEvent = createTouchClickEvent;
    function createClickEvent(elemName, clickFunc, thisObject, view) {
        var result = $.proxy(clickFunc, thisObject);
        var elem = elemName instanceof $ ? elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
        for (var i = 0, iCount = elem.length; i < iCount; i++)
            elem[i].addEventListener("click", result, false);
        return result;
    }
    exports.createClickEvent = createClickEvent;
    function destroyTouchClickEvent(elemName, proxyFunc, view) {
        var elem = elemName instanceof $ ? elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
        for (var i = 0, iCount = elem.length; i < iCount; i++)
            elem[i].removeEventListener(("ontouchstart" in window) ? "touchend" : "click", proxyFunc);
    }
    exports.destroyTouchClickEvent = destroyTouchClickEvent;
    function destroyClickEvent(elemName, proxyFunc, view) {
        var elem = elemName instanceof $ ? elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
        for (var i = 0, iCount = elem.length; i < iCount; i++)
            elem[i].removeEventListener("click", proxyFunc);
    }
    exports.destroyClickEvent = destroyClickEvent;
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
    function numberToString(value, decimal) {
        var result = "";
        if (value)
            result = value.toFixed(decimal); // parseFloat(value).toFixed(2);
        return result;
    }
    exports.numberToString = numberToString;
});
//# sourceMappingURL=utils.js.map