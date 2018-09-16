interface JQuery {
    sidenav(methodName?: any, paramName?: any): JQuery;
    modal(methodName?: any, paramName?: any): JQuery;
}

declare namespace M {
    function updateTextFields(): JQuery;

    export namespace Modal {
        function getInstance(elems: any, options?: any): JQuery;
    }
}
