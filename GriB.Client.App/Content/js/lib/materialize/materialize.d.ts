interface JQuery {
    sidenav(methodName?: any, paramName?: any): JQuery;
    tabs(methodName?: any, paramName?: any): JQuery;
    modal(methodName?: any, paramName?: any): JQuery;
    formSelect(methodName?: any, paramName?: any): JQuery;
    datepicker(methodName?: any, paramName?: any): JQuery;
    tablePagination(options: any): JQuery;
}


declare namespace M {
    interface toastOptions
    {
        html?: string;
    }

    function updateTextFields(): JQuery;
    function updateTabIndicator(): JQuery;
    function toast(options :toastOptions): JQuery;
    export namespace Modal {
        function getInstance(elems: any, options?: any): JQuery;
    }

    export namespace FormSelect {
        function init(elems: any, options?: any): JQuery;
    }
}
