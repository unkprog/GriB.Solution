import utils = require('app/common/utils');
import svc = require('app/services/posterminalservice');

export namespace Controller.Terminal {
    export class NavigationCheck {
        constructor(view: JQuery, terminal: Interfaces.ITerminal) {
            this.terminal = terminal;
            this.controlContainerChecks = view.find("#posterminal-view-checks-container");
            this.controlChecks = this.controlContainerChecks.find("#posterminal-view-checks");
            this.controlButtons = this.controlContainerChecks.find("#posterminal-view-check-buttons");
            this.controlTablePositions = this.controlContainerChecks.find("#posterminal-view-check-positions");
            this.controlTotal = this.controlContainerChecks.find("#posterminal-view-check-total");
        }

        private service: svc.Services.POSTerminalService;
        protected get Service(): svc.Services.POSTerminalService {
            if (!this.service)
                this.service = new svc.Services.POSTerminalService();
            return this.service;
        }

        private terminal: Interfaces.ITerminal;
        private controlChecks: JQuery;
        private controlContainerChecks: JQuery;
        private controlTablePositions: JQuery;
        private controlTotal: JQuery;
        private controlButtons: JQuery;
        public get ControlContainerChecks() {
            return this.controlContainerChecks;
        }

        public ViewShow(e: any): void {
            let controller = this;
            $('.chips').chips(); //{ onChipDelete: $.proxy(controller.CheckDelete, controller) }
        }

        public ViewResize(e: any): void {
            if (this.controlContainerChecks) {
                let height: number = $(window).height();
                let totalHeight: number = this.controlTotal.height() + 10;
                let btnheight: number = this.controlButtons.height() + 10;
                this.controlContainerChecks.height(height - this.controlContainerChecks.offset().top);

                if (this.controlTablePositions) {
                    this.controlTablePositions.height(height - this.controlTablePositions.offset().top - totalHeight - btnheight);
                    this.controlTablePositions.find('tbody').height(height - this.controlTablePositions.offset().top - totalHeight - btnheight);
                }
                //if (this.controlButtons)
                //    this.controlButtons.css({ "position": "absolute", "top": "" + (height - btnheight) + "px", "width": "" + this.controlContainerChecks.width() + "px" });
            }

        }

        private checkData: any = {
            currentCheck: 0,
            checks: []
        };

        public loadData(): void {
            let controller = this;
            controller.Service.CheckOpened((responseData) => {
                controller.checkData.checks = responseData.checkopened;
                controller.drawChecks();
                if (controller.checkData && controller.checkData.checks.length > 0)
                    controller.setCurrentCheck(controller.checkData.checks[0].id);
            });
        }

        public createEvents(): void {
        }

        public destroyEvents(): void {
           
        }

        public setCurrentCheck(currentCheck:number): void {
            let controller = this;
            $('#check_id_' + controller.checkData.currentCheck).removeClass(['check-select', 'z-depth-1']);
            controller.checkData.currentCheck = currentCheck;
            $('#check_id_' + controller.checkData.currentCheck).addClass(['check-select','z-depth-1']);  

            //controller.Service.CheckOpened((responseData) => {
            //    controller.checkData.checks = responseData.checkopened;
            //    if (controller.checkData && controller.checkData.checks.length > 0)
            //        controller.checkData.currentCheck = 0;
            //    controller.drawChecks();
            //});
        }

        private drawChecks(): void {
            let controller = this;
            let checksArray: any[] = controller.checkData.checks;
            let html: string = '';
            let strId: string;
            let findId: JQuery;
            for (let i = 0, iCount = (checksArray ? checksArray.length : 0); i < iCount; i++) {
                strId = 'check_id_' + checksArray[i].id;
                findId = controller.controlChecks.find('#' + strId);
                if (findId && findId.length > 0) { }
                else {

                    html += '<div id="check_id_' + checksArray[i].id + '" class="chip check-chip">Чек №' + checksArray[i].number + '<i class="close material-icons">close</i></div>';
                }
            }

            findId = $(html);

            utils.createTouchClickEvent(findId, this.CheckButtonClick, this);
            utils.createTouchClickEvent(findId.find('i'), this.CheckDelete, this);
            controller.controlChecks.append(findId);
        }

        private CheckButtonClick(e): void {
            let targetid: string = e.currentTarget.id;
            let id: number = + targetid.replace("check_id_", "");

            if (id === -1)
                return;

            this.setCurrentCheck(id);
            //this.currentCategory = id;
            //this.backToCategory(id);
            //this.loadSaleProducts();
        }

        private CheckDelete(e): void {
            alert('document');
            e.stopPropagation();
        }
    }
}