requirejs.config({
    baseUrl: "/Content/js",
    paths: {
        "jquery": "lib/jquery-3.3.1.min",
        "materialize": "lib/materialize/materialize.min",
        "materialize.pagination": "lib/materialize/materialize.pagination",
        "kendo.core": "lib/kendo/kendo.core.es5.min",
        "kendo.data": "lib/kendo/kendo.data.es5.min",
        "kendo.data.odata": "lib/kendo/kendo.data.odata.es5.min",
        "kendo.data.xml": "lib/kendo/kendo.data.xml.es5.min",
        "kendo.binder": "lib/kendo/kendo.binder.es5.min",
        "i18n": "lib/i18n",
        "domReady": "lib/require/domReady"
    },
    waitSeconds: 20
});

(function () {
    var requirejs_load = requirejs.load;
    var v = new Date().getTime().toString();
    requirejs.load = function (context, moduleId, url) {
        url += "?v=" + v;
        requirejs_load(context, moduleId, url);
    };
})();

require(["domReady", "jquery"], function (domReady, jquery) {
    $("#progress-container").show();
    require(["materialize", "materialize.pagination", "kendo.binder"], function (materialize, materializePager, kendoBinder) {
        domReady(function () {
            require(["app/application"], function (app) {
                var _app = new app.App.Application();
                $(window).on('resize', function (e) {
                    _app.Resize(e);
                });
                window.onpopstate = function (e) {
                    _app.ControllerBack(e);
                };
            });
        });
    });
});

