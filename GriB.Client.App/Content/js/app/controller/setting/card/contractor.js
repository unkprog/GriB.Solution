var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
                var Contractor = /** @class */ (function (_super) {
                    __extends(Contractor, _super);
                    function Contractor() {
                        return _super.call(this) || this;
                    }
                    Contractor.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$contractors"),
                            "cardModel": []
                        });
                    };
                    Contractor.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FieldSearch: "code", ValueIdNew: -1, EditIdName: "id_contractor", EditController: "setting/editor/contractor",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetContractors, this.Service), Delete: $.proxy(this.Service.DelContractor, this.Service),
                            Columns: [
                                { Header: vars._statres("label$name"), Field: "name" },
                            ]
                        };
                    };
                    return Contractor;
                }(card.Controller.Setting.Card.Card));
                Card.Contractor = Contractor;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/contractor", function (module) { return new module.Controller.Setting.Card.Contractor(); });
});
//# sourceMappingURL=contractor.js.map