﻿export function createTouchClickEvent(elemName: string | JQuery, clickFunc: any, thisObject: any, view?: JQuery): any {
    var result = $.proxy(clickFunc, thisObject);
    var elem: JQuery = elemName instanceof $ ? <JQuery>elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
    for (let i = 0, iCount = elem.length; i < iCount; i++)
        elem[i].addEventListener(("ontouchstart" in window) ? "touchend" : "click", result, false);
    return result;
}

export function createClickEvent(elemName: string | JQuery, clickFunc: any, thisObject: any, view?: JQuery): any {
    var result = $.proxy(clickFunc, thisObject);
    var elem: JQuery = elemName instanceof $ ? <JQuery>elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
    for (let i = 0, iCount = elem.length; i < iCount; i++)
        elem[i].addEventListener("click", result, false);
    return result;
}

export function destroyTouchClickEvent(elemName: string | JQuery, proxyFunc: any, view?: JQuery): any {
    let elem: JQuery = elemName instanceof $ ? <JQuery>elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
    for (let i = 0, iCount = elem.length; i < iCount; i++)
        elem[i].removeEventListener(("ontouchstart" in window) ? "touchend" : "click", proxyFunc);
}

export function destroyClickEvent(elemName: string | JQuery, proxyFunc: any, view?: JQuery): any {
    let elem: JQuery = elemName instanceof $ ? <JQuery>elemName : (view ? view.find("#" + elemName) : $("#" + elemName));
    for (let i = 0, iCount = elem.length; i < iCount; i++)
        elem[i].removeEventListener("click", proxyFunc);
}

export function isNullOrEmpty(value: string): boolean {
    return (value === null || value === undefined || value === '');
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

export function stringFormat(...args1: any[]): string {
    var args = Array.prototype.slice.call(arguments, 1);
    return arguments[0].replace(/\{(\d+)\}/g, function (match, index) {
        return args[index];
    });
};


export function dateToLongString(date: Date): string {
    return date.toLocaleString();
}

export function date_ddmmyyyy(date: Date): string {
    let _date = (date ? date : new Date());
    var yyyy = _date.getFullYear().toString();
    var mm = (_date.getMonth() + 1).toString(); // getMonth() is zero-based         
    var dd = _date.getDate().toString();

    return (dd[1] ? dd : '0' + dd[0]) + '.' + (mm[1] ? mm : '0' + mm[0]) + '.' + yyyy;
};
window.date_ddmmyyyy = date_ddmmyyyy;

export function date_ddmmyyyy_withtime(date: Date | string): string {
    let _date: Date = (date ? (typeof date === 'string' || date instanceof String ? new Date(date as string) : date) : new Date());
    let yyyy:string = _date.getFullYear().toString();
    let mm: string = (_date.getMonth() + 1).toString(); // getMonth() is zero-based         
    let dd: string = _date.getDate().toString();
    let hh: string = _date.getHours().toString();
    let mn: string = _date.getMinutes().toString();
    let ss: string = _date.getSeconds().toString();

    return (dd[1] ? dd : '0' + dd[0]) + '.' + (mm[1] ? mm : '0' + mm[0]) + '.' + yyyy + ' ' + (hh[1] ? hh : '0' + hh[0]) + ':' + (mn[1] ? mn : '0' + mn[0]) + ':' + (ss[1] ? ss : '0' + ss[0]);
};
window.date_ddmmyyyy_withtime = date_ddmmyyyy_withtime;

export function date_from_ddmmyyyy(dateStr: string): Date {
    var parts: string[] = dateStr.split(".");
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]), 0, 0, 0, 0);
};
window.date_from_ddmmyyyy = date_from_ddmmyyyy;

export function numberToString(value: number, decimal: number): string {
    let result: string = "";
    if (value)
        result = value.toFixed(decimal);// parseFloat(value).toFixed(2);
    return result;
}
window.numberToString = numberToString;