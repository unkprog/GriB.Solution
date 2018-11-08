import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import { _app } from 'app/common/variables';

export namespace Controller.Terminal {
    export class Index extends base.Controller.Base {
        constructor() {
           super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/index.html", Id: "posterminal-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": " ",
            });
        }

        private navHeader: JQuery;
        private btnSave: JQuery;
        private btnCancel: JQuery;
        public ViewInit(view): boolean {

            let navbarHeader: string = '<div class="navbar-fixed editor-header z-depth-1">';
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

            return super.ViewInit(view);
        }

        public ViewHide(e) {
            super.ViewHide(e);
        }
    }
}