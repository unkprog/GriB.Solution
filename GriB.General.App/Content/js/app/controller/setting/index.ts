import vars = require('app/common/variables');
import base = require('app/common/basecontroller');

export namespace Controller.Setting {
    export class Index extends base.Controller.Base {
        constructor() {
           super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/index.html", Id: "setting-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "labelSettings": vars._statres("label$settings"),
                "labelServers": vars._statres("label$servers"),
                "labelDatabases": vars._statres("label$databases"),
                "labelUsers": vars._statres("label$users"),
            });
        }

        protected createEvents(): void {
            this.ServersButtonClick = this.createClickEvent("btn-servers", this.serversButtonClick);
            this.DataBasesButtonClick = this.createClickEvent("btn-databases", this.dataBasesButtonClick);
            this.UsersButtonClick = this.createClickEvent("btn-users", this.usersButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent("btn-servers", this.ServersButtonClick);
            this.destroyClickEvent("btn-databases", this.DataBasesButtonClick);
            this.destroyClickEvent("btn-users", this.UsersButtonClick);
            
        }


        public ServersButtonClick: { (e: any): void; };
        private serversButtonClick(e) {
            vars._app.OpenController({ urlController: "setting/card/server", backController: this });
        }

        public DataBasesButtonClick: { (e: any): void; };
        private dataBasesButtonClick(e) {
            vars._app.OpenController({ urlController: "setting/card/database", backController: this });
        }

        public UsersButtonClick: { (e: any): void; };
        private usersButtonClick(e) {
            vars._app.OpenController({ urlController: "setting/card/user", backController: this });
        }
    }
}

vars.registerController("setting/index", function (module: any): Interfaces.IController { return new module.Controller.Setting.Index(); });