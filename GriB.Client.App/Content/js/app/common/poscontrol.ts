import vars = require('app/common/variables');
import utils = require('app/common/utils');

export namespace POSControl {

    export class CheckViewControl implements Interfaces.Control.ICheckViewControl {

        private checkContainer: JQuery;
        private checkView: JQuery;
        private checkViewPos: JQuery;

        public InitView(): JQuery {
            this.labelSize = 1;
            this.checkContainer = $('<div class="check-container"></div>');
            this.checkView = $('<div class="check-view"></div>');
            this.checkViewPos = $('<div id="check-view-positions"></div>');

            this.checkView.append(this.checkViewPos);
            this.checkContainer.append(this.checkView);
            return this.checkContainer;
        }

        public DestroyView() {
           
        }

        private printService: Interfaces.IPrintService;
        public get PrintService(): Interfaces.IPrintService { return this.printService; }
        public set PrintService(service: Interfaces.IPrintService) { this.printService = service; }

        public get View(): JQuery {
            return this.checkView;
        }

        private posCheck: Interfaces.Model.IPOSCheck;
        public get POSCheck(): Interfaces.Model.IPOSCheck {
            return this.posCheck;
        }

        public set POSCheck(value: Interfaces.Model.IPOSCheck) {
            this.posCheck = value;
            this.updateView();
        }

        private labelSize: number;
        public get LabelSize(): number {
            return this.labelSize;
        }

        public set LabelSize(value: number) {
            this.labelSize = value;
            this.updateView();
        }

        private updateView() {
            let html: string = '';
            let sum: number = 0;

            if (this.labelSize === 0) {
                this.checkContainer.removeClass('size80').addClass('size58');
                this.checkView.removeClass('size80').addClass('size58');
                this.checkViewPos.removeClass('size80').addClass('size58');
            }
            else {
                this.checkContainer.removeClass('size58').addClass('size80');
                this.checkView.removeClass('size58').addClass('size80');
                this.checkViewPos.removeClass('size58').addClass('size80');
            }


            if (this.posCheck) {

                html += '<span class="truncate-print check-view-row center-print">' + vars._statres("label$check") + ' №' + utils.numberPadZero(this.posCheck.id, 7) + '</span>';
                html += '<span class="truncate-print check-view-row">' + vars._statres("label$time") + ': ' + utils.date_ddmmyyyy_withtime(this.posCheck.cd) + '</span>';
                html += '<div class="check-view-row-delimiter"></div><br/>';
                //for (let j = 0; j < 10; j++) {
                    for (let i = 0, icount = (this.posCheck.positions && this.posCheck.positions.length ? this.posCheck.positions.length : 0); i < icount; i++) {
                        html += '<span class="truncate-print check-view-name' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + this.posCheck.positions[i].product.name + '</span>';
                        html += '<span class="truncate-print right-print check-view-price' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + this.posCheck.positions[i].quantity + 'x' + utils.numberToString(this.posCheck.positions[i].price, 2) + '</span><br/>';
                        sum = sum + (this.posCheck.positions[i].quantity * this.posCheck.positions[i].price);
                    }
                //}
                html += '<br/><div class="check-view-row-delimiter"></div>';
                html += '<span class="truncate-print check-view-total bold' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + vars._statres("label$sum") + '</span>';
                html += '<span class="truncate-print right-print check-view-total-price' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + utils.numberToString(sum, 2) + '</span><br/>';

                let discountSum: number = (this.posCheck.discount && this.posCheck.discount > 0 ? (this.posCheck.discount / 100.0) : 0) * sum;
               
                if (this.posCheck.discount && this.posCheck.discount > 0) {
                    html += '<span class="truncate-print check-view-total bold' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + vars._statres("label$discount") + ' ' + this.posCheck.discount + '</span>';

                    html += '<span class="truncate-print right-print check-view-total-price' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + this.posCheck.discount + ' %</span><br/>';
                    html += '<span class="truncate-print check-view-total bold' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + vars._statres("label$discount") + '</span>';
                    html += '<span class="truncate-print right-print check-view-total-price' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + utils.numberToString(discountSum, 2) + '</span><br/>';
                }
                
                html += '<span class="truncate-print check-view-total bold' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + vars._statres("label$total") + '</span>';
                html += '<span class="truncate-print right-print check-view-total-price' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + utils.numberToString(sum - discountSum, 2) + '</span><br/>';
                html += '<span class="truncate-print check-view-total bold' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + (this.posCheck.ptype == 2 ? vars._statres("label$cash$noin") : vars._statres("label$cash$in")) + '</span>';
                html += '<span class="truncate-print right-print check-view-total-price' + (this.labelSize === 0 ? ' size58' : ' size80') + '">' + utils.numberToString(sum - discountSum, 2) + '</span><br/>';

            }
            this.checkViewPos.html(html);
        }


        public Print(pskey: string) {
            let self = this;
            if (this.printService) {
                this.printService.PrintCheck(pskey, self.checkView.html()
                    , (responseData) => { }
                    , (errorData) => { self.PrintThis(); }
                );
            }
            else
                this.PrintThis();
        }

        private PrintThis() {
            this.checkView.printThis({
                pageTitle: "PRINT CHECK",
                importCSS: true,
                //importStyle: true,         // import style tags
                printContainer: true       // print outer container/$.selector
            });
        }
    }
}