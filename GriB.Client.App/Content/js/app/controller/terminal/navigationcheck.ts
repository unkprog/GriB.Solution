import utils = require('app/common/utils');
import svc = require('app/services/posterminalservice');

export namespace Controller.Terminal {
    export class NavigationCheck implements Interfaces.ITerminalCheks {
        constructor(view: JQuery, terminal: Interfaces.ITerminal) {
            this.terminal = terminal;
            this.controlContainerChecks = view.find("#posterminal-view-checks-container");
            this.controlChecks = this.controlContainerChecks.find("#posterminal-view-checks");
            this.buttonNewCheck = this.ControlContainerChecks.find("#btn-check-new");
            this.controlButtons = this.controlContainerChecks.find("#posterminal-view-check-buttons");
            this.controlTablePositions = this.controlContainerChecks.find("#posterminal-view-check-positions");
            this.controlTableBodyPositions = this.controlTablePositions.find("tbody");
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
        private buttonNewCheck: JQuery;
        private controlTablePositions: JQuery;
        private controlTableBodyPositions: JQuery;
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
            currentCheck: {},
            checks:[]
        };

        public loadData(): void {
            let controller = this;
          
            controller.Service.CheckOpened((responseData) => {
                controller.checkData.checks = responseData.checkopened;
                controller.drawChecks();
                if (controller.checkData && controller.checkData.checks.length > 0)
                    controller.setCurrentCheck(controller.checkData.checks[0]);
                else
                    controller.setCurrentCheck(undefined);
            });
        }

        public createEvents(): void {
            this.NewCheckButtonClick = utils.createTouchClickEvent(this.buttonNewCheck, this.newCheckButtonClick, this);
        }

        public destroyEvents(): void {
            utils.destroyTouchClickEvent(this.buttonNewCheck, this.NewCheckButtonClick);
            utils.destroyTouchClickEvent(this.controlChecks.find(".check-chip"), this.CheckButtonClick);
            utils.destroyTouchClickEvent(this.controlChecks.find(".check-chip i"), this.CheckDelete);
        }

        public setCurrentCheck(currentCheck: Interfaces.Model.IPOSCheck): void {
            let controller = this;
            if (controller.checkData.currentCheck)
                $('#check_id_' + controller.checkData.currentCheck.id).removeClass(['check-select', 'z-depth-1']);
            controller.checkData.currentCheck = currentCheck;
            if (controller.checkData.currentCheck)
                $('#check_id_' + controller.checkData.currentCheck.id).addClass(['check-select', 'z-depth-1']);

            this.drawCheckPositions();
            //controller.Service.CheckOpened((responseData) => {
            //    controller.checkData.checks = responseData.checkopened;
            //    if (controller.checkData && controller.checkData.checks.length > 0)
            //        controller.checkData.currentCheck = 0;
            //    controller.drawChecks();
            //});
        }

        public setCurrentCheckById(currentCheckId: number): void {
            let controller = this;
            for (let i = 0, iCount = (controller.checkData.checks ? controller.checkData.checks.length : 0); i < iCount; i++) {
                if (controller.checkData.checks[i].id === currentCheckId) {
                    this.setCurrentCheck(controller.checkData.checks[i]);
                    break;
                }
            }
        }

        private drawChecks(): void {
            let controller = this;
            let checksArray: Interfaces.Model.IPOSCheck[] = controller.checkData.checks;
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

            this.CheckButtonClick = utils.createTouchClickEvent(findId, this.checkButtonClick, this);
            this.CheckDelete = utils.createTouchClickEvent(findId.find('i'), this.checkDelete, this);
            controller.controlChecks.append(findId);
        }

        private drawCheckPositions(): void {
            let controller = this;
            let html: string = '';
            let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (controller.checkData.currentCheck ? controller.checkData.currentCheck.positions : []);
            for (let i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                html += '<tr id="check_pos_' + i + '">';
                html += '<td class="product-col-name">' + positionsArray[i].product.name + '</td>';
                html += '<td class="product-col-btn"><a class="product-col-button-delete"><i class="material-icons editor-header">add_circle_outline</i></a></td>';
                html += '<td class="product-col-quantity-auto">' + positionsArray[i].quantity + '</td>';
                html += '<td class="product-col-btn"><a class="product-col-button-delete"><i class="material-icons editor-header">remove_circle_outline</i></a></td>';
                html += '<td class="product-col-sum-auto">' + positionsArray[i].price + '</td>';
                html += '</tr>';
            }

            controller.controlTableBodyPositions.html(html);
        }

        private NewCheckButtonClick: { (e: any): void; };
        private newCheckButtonClick(e): void {
            let controller = this;
            if (controller.checkData.checks && controller.checkData.checks.length > 0) {
                for (let i = 0, iCount = controller.checkData.checks.length; i < iCount; i++) {
                    let currentCheck: Interfaces.Model.IPOSCheck = controller.checkData.checks[i];
                    if (!currentCheck.positions || currentCheck.positions.length < 1) {
                        controller.setCurrentCheck(currentCheck);
                        return;
                    }
                }
            }
            controller.Service.CheckNew((responseData) => {
                if (!controller.checkData.checks) controller.checkData.checks = [];
                controller.checkData.checks.push(responseData.checknew);
                controller.setCurrentCheck(responseData.checknew);
            });
        }

        private CheckButtonClick: { (e: any): void; };
        private checkButtonClick(e): void {
            let targetid: string = e.currentTarget.id;
            let id: number = + targetid.replace("check_id_", "");
            if (!id || id === -1) return;
            this.setCurrentCheckById(id);
        }

        private CheckDelete: { (e: any): void; };
        private checkDelete(e): void {
            e.stopPropagation();

            let targetid: string = e.currentTarget.parentElement.id;
            let id: number = +targetid.replace("check_id_", "");
            if (!id || id === -1) return;

            let controller = this;
            if (controller.checkData.checks && controller.checkData.checks.length > 0) {
                for (let i = 0, iCount = controller.checkData.checks.length; i < iCount; i++) {
                    let currentCheck: Interfaces.Model.IPOSCheck = controller.checkData.checks[i];
                    if (currentCheck.id === id && (!currentCheck.positions || currentCheck.positions.length < 1)) {
                        controller.Service.CheckDelete(currentCheck.id, (responseData) => {
                            if (!controller.checkData.checks) controller.checkData.checks = [];
                            $("#check_id_" + currentCheck.id).remove();
                            controller.checkData.checks.splice(controller.checkData.checks.indexOf(currentCheck), 1);
                            if (controller.checkData && controller.checkData.checks.length > 0)
                                controller.setCurrentCheck(controller.checkData.checks[0]);
                            else
                                controller.setCurrentCheck(undefined);
                        });
                        return;
                    }
                }
            }
        }

        public AddPosition(product: number): void {
            let controller = this;
            let check: Interfaces.Model.IPOSCheck = controller.checkData.currentCheck;
            if (check) {
                this.Service.AddToCheck(check.id, product, 1, (responseData) => {
                    let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (controller.checkData.currentCheck ? controller.checkData.currentCheck.positions : []);
                    let newItem: Interfaces.Model.IPOSCheckPosition = responseData.newposition;
                    let isNotFound: boolean = true;
                    for (let i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                        if (newItem.index === positionsArray[i].index) {
                            positionsArray[i] = newItem;
                            isNotFound = false;
                            break;
                        }
                    }
                    if (isNotFound === true)
                        positionsArray.push(newItem);

                    this.drawCheckPositions();
                });
            }
        }
    }
}