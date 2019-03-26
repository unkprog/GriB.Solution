import vars = require('app/common/variables');
import utils = require('app/common/utils');

export namespace POSControl {

    export class CheckViewControl implements Interfaces.Control.ICheckViewControl {

        private checkView: JQuery;
        private checkViewPos: JQuery;

        public InitView(): JQuery {

            let checkViewHtml: string = '<div class="z-depth-1 check-view">';
            checkViewHtml += '<div id="check-view-positions"></div>';
            checkViewHtml += '</div>';
            this.checkView = $(checkViewHtml);
           
            this.checkViewPos = this.checkView.find("#check-view-positions");

            return this.checkView;
        }

        public DestroyView() {
           
        }

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

        private updateView() {
            let html: string = '';
            let sum: number = 0;
            if (this.posCheck) {

                html += '<span class="truncate check-view-row center">' + vars._statres("label$check") + ' №' + utils.numberPadZero(this.posCheck.id, 7) + '</span>';
                html += '<span class="truncate check-view-row">' + vars._statres("label$time") + ': ' + utils.date_ddmmyyyy_withtime(this.posCheck.cd) + '</span>';
                html += '<div class="check-view-row-delimiter"></div><br/>';
                for (let i = 0, icount = (this.posCheck.positions && this.posCheck.positions.length ? this.posCheck.positions.length : 0); i < icount; i++) {
                    html += '<span class="truncate check-view-name">' + this.posCheck.positions[i].product.name + '</span>';
                    html += '<span class="truncate right-align check-view-price">' + this.posCheck.positions[i].quantity + 'x' + utils.numberToString(this.posCheck.positions[i].price, 2) + '</span><br/>';
                    sum = sum + (this.posCheck.positions[i].quantity * this.posCheck.positions[i].price);
                }
                html += '<br/><div class="check-view-row-delimiter"></div>';
                html += '<span class="truncate check-view-total bold">' + vars._statres("label$sum") + '</span>';
                html += '<span class="truncate right-align check-view-total-price">' + utils.numberToString(sum, 2) + '</span><br/>';

                let discountSum: number = (this.posCheck.discount && this.posCheck.discount > 0 ? (this.posCheck.discount / 100.0) : 0) * sum;
                if (this.posCheck.discount && this.posCheck.discount > 0) {
                    html += '<span class="truncate check-view-total bold">' + vars._statres("label$discount") + ' ' + this.posCheck.discount + '</span>';
                   
                    html += '<span class="truncate right-align check-view-total-price">' + this.posCheck.discount + ' %</span><br/>';
                    html += '<span class="truncate check-view-total bold">' + vars._statres("label$discount") + '</span>';
                    html += '<span class="truncate right-align check-view-total-price">' + utils.numberToString(discountSum, 2) + '</span><br/>';
                }
                html += '<span class="truncate check-view-total bold">' + vars._statres("label$total") + '</span>';
                html += '<span class="truncate right-align check-view-total-price">' + utils.numberToString(sum - discountSum, 2) + '</span><br/>';
                html += '<span class="truncate check-view-total bold">' + (this.posCheck.ptype == 2 ? vars._statres("label$cash$noin") : vars._statres("label$cash$in")) + '</span>';
                html += '<span class="truncate right-align check-view-total-price">' + utils.numberToString(sum - discountSum, 2) + '</span><br/>';

            }
            this.checkViewPos.html(html);
        }
    }
}