requirejs.config({
    baseUrl: "/Content/js",
    paths: {
        "jquery": "lib/jquery-3.3.1.min",
        "materialize": "lib/materialize",
        "kendo.core": "lib/kendo/kendo.core",
        "kendo.data": "lib/kendo/kendo.data",
        "kendo.data.odata": "lib/kendo/kendo.data.odata",
        "kendo.data.xml": "lib/kendo/kendo.data.xml",
        "kendo.binder": "lib/kendo/kendo.binder",
        "i18n": "lib/i18n",
        "domReady": "lib/require/domReady",
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
    require(["materialize", "kendo.binder"], function (materialize, kendoBinder) {
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

