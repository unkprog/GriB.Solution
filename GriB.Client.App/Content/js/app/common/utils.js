define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createClickEvent(elemName, clickFunc, thisObject, view) {
        var result = $.proxy(clickFunc, thisObject);
        var elem = elemName instanceof $ ? elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
        for (var i = 0, iCount = elem.length; i < iCount; i++)
            elem[i].addEventListener(("ontouchstart" in window) ? "touchend" : "click", result, false);
        return result;
    }
    exports.createClickEvent = createClickEvent;
    function destroyClickEvent(elemName, proxyFunc, view) {
        var elem = elemName instanceof $ ? elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
        for (var i = 0, iCount = elem.length; i < iCount; i++)
            elem[i].removeEventListener(("ontouchstart" in window) ? "touchend" : "click", proxyFunc);
    }
    exports.destroyClickEvent = destroyClickEvent;
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
});
//# sourceMappingURL=utils.js.map