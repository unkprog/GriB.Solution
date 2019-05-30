var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/common/variables", "app/controller/setting/card/card"], function (require, exports, vars, card) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Card;
            (function (Card) {
                var Server = /** @class */ (function (_super) {
                    __extends(Server, _super);
                    function Server() {
                        return _super.call(this) || this;
                    }
                    Server.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$servers"),
                            "cardModel": []
                        });
                    };
                    Server.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_server", EditController: "setting/editor/server",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetServers, this.Service), Delete: $.proxy(this.Service.DelServer, this.Service),
                            Columns: [
                                { Header: vars._statres("label$id"), Field: "id", },
                                { Header: vars._statres("label$address"), Field: "address", },
                                { Header: vars._statres("label$login"), Field: "user", },
                                { Header: vars._statres("label$password"), Field: "pass" }
                            ]
                        };
                    };
                    return Server;
                }(card.Controller.Setting.Card.Card));
                Card.Server = Server;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/server", function (module) { return new module.Controller.Setting.Card.Server(); });
});
//# sourceMappingURL=server.js.map