export function createClickEvent(elemName: string | JQuery, clickFunc: any, thisObject: any, view?: JQuery): any {
    var result = $.proxy(clickFunc, thisObject);
    var elem: JQuery = elemName instanceof $ ? <JQuery>elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
    for (let i = 0, iCount = elem.length; i < iCount; i++)
        elem[i].addEventListener(("ontouchstart" in window) ? "touchend" : "click", result, false);
    return result;
}

export function destroyClickEvent(elemName: string | JQuery, proxyFunc: any, view?: JQuery): any {
    let elem: JQuery = elemName instanceof $ ? <JQuery>elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
    for (let i = 0, iCount = elem.length; i < iCount; i++)
        elem[i].removeEventListener(("ontouchstart" in window) ? "touchend" : "click", proxyFunc);
}


export function validateEmail(email: string): boolean {
    if (!email) return false;
    var pattern = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/i;
    return pattern.test(email);
}

export function validatePhone(phone: string): boolean {
    if (!phone) return false;
    var pattern = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
    return pattern.test(phone);
}