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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/setting/editor/editor"], function (require, exports, vars, utils, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var Client = /** @class */ (function (_super) {
                    __extends(Client, _super);
                    function Client() {
                        return _super.call(this) || this;
                    }
                    Client.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/client.html", Id: "editor-view-client" };
                    };
                    Client.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": "",
                            "editModel": {},
                            "labelClient": vars._statres("label$client"),
                            "labelClientInformation": vars._statres("label$clientinformation"),
                            "labelNo": vars._statres("label$no"),
                            "labelYes": vars._statres("label$yes"),
                            "labelSurname": vars._statres("label$surname"),
                            "labelName": vars._statres("label$fname"),
                            "labelPatronymic": vars._statres("label$patronymic"),
                            "labelSex": vars._statres("label$sex"),
                            "labelDateBirth": vars._statres("label$datebirth"),
                            "labelPhone": vars._statres("label$phone"),
                            "labelUnspecified": vars._statres("label$unspecified"),
                            "labelMale": vars._statres("label$male"),
                            "labelFemale": vars._statres("label$female"),
                        });
                    };
                    Object.defineProperty(Client.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Client.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_client", Load: $.proxy(this.Service.GetClient, this.Service), Save: $.proxy(this.Service.SetClient, this.Service) };
                    };
                    Client.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        this.setupControls();
                    };
                    Client.prototype.setupControls = function () {
                        $('#client-open').formSelect();
                        $('#client-sex-list').formSelect();
                        $('#client-birth').datepicker();
                    };
                    Client.prototype.ViewInit = function (view) {
                        view.find("#client-surname").characterCounter();
                        view.find("#client-name").characterCounter();
                        view.find("#client-patronymic").characterCounter();
                        var result = _super.prototype.ViewInit.call(this, view);
                        return result;
                    };
                    Client.prototype.ViewShow = function (e) {
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    Client.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (!utils.isNullOrEmpty(model.fname) && model.fname.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$surname"), 60) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.mname) && model.mname.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$fname"), 60) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.lname) && model.lname.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$patronymic"), 60) });
                            result = false;
                        }
                        //if (!utils.validatePhone(model.phone)) {
                        //    M.toast({ html: vars._statres('msg$error$phoneNumberIncorrect') });
                        //    result = false;
                        //}
                        return result;
                    };
                    return Client;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Client = Client;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/client", function (module) { return new module.Controller.Setting.Editor.Client(); });
});
//# sourceMappingURL=client.js.map