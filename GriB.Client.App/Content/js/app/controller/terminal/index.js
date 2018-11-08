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
define(["require", "exports", "app/common/basecontroller"], function (require, exports, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var Index = /** @class */ (function (_super) {
                __extends(Index, _super);
                function Index() {
                    return _super.call(this) || this;
                }
                Index.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/index.html", Id: "posterminal-view" };
                };
                Index.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": " ",
                    });
                };
                Index.prototype.ViewInit = function (view) {
                    var navbarHeader = '<div class="navbar-fixed editor-header z-depth-1">';
                    navbarHeader += '        <nav class="editor-header-nav">';
                    navbarHeader += '            <div class="nav-wrapper editor-header">';
                    navbarHeader += '                <a class="editor-header-title">' + this.Header + '</a>';
                    navbarHeader += '                <ul id="pos-menu-buttons" class="left"></ul>';
                    navbarHeader += '            </div>';
                    navbarHeader += '        </nav>';
                    navbarHeader += '    </div>';
                    this.navHeader = $(navbarHeader);
                    this.btnSave = $('<li><a id="pos-btn-cash" class="editor-header-button"><i class="material-icons editor-header">account_balance_wallet</i></a></li>');
                    this.btnCancel = $('<li><a id="pos-btn-salepoint" class="editor-header-button"><i class="material-icons editor-header">account_balance</i></a></li>');
                    this.navHeader.find("#pos-menu-buttons").append(this.btnSave);
                    this.navHeader.find("#pos-menu-buttons").append(this.btnCancel);
                    view.prepend(this.navHeader);
                    return _super.prototype.ViewInit.call(this, view);
                };
                Index.prototype.ViewHide = function (e) {
                    _super.prototype.ViewHide.call(this, e);
                };
                return Index;
            }(base.Controller.Base));
            Terminal.Index = Index;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=index.js.map