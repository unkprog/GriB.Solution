define(["require", "exports", "app/common/variables", "app/common/utils"], function (require, exports, vars, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var POSControl;
    (function (POSControl) {
        var CheckViewControl = /** @class */ (function () {
            function CheckViewControl() {
            }
            CheckViewControl.prototype.InitView = function () {
                this.checkContainer = $('<div class="check-container"></div>');
                this.checkView = $('<div class="check-view"></div>');
                this.checkViewPos = $('<div id="check-view-positions"></div>');
                this.checkView.append(this.checkViewPos);
                this.checkContainer.append(this.checkView);
                return this.checkContainer;
            };
            CheckViewControl.prototype.DestroyView = function () {
            };
            Object.defineProperty(CheckViewControl.prototype, "PrintService", {
                get: function () { return this.printService; },
                set: function (service) { this.printService = service; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckViewControl.prototype, "View", {
                get: function () {
                    return this.checkView;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckViewControl.prototype, "POSCheck", {
                get: function () {
                    return this.posCheck;
                },
                set: function (value) {
                    this.posCheck = value;
                    this.updateView();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckViewControl.prototype, "LabelSize", {
                get: function () {
                    return (this.printer ? +this.printer.labelsize : 1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CheckViewControl.prototype, "Printer", {
                get: function () {
                    return this.printer;
                },
                set: function (value) {
                    this.printer = value;
                    this.updateView();
                },
                enumerable: true,
                configurable: true
            });
            CheckViewControl.prototype.updateView = function () {
                if (!this.checkContainer)
                    return;
                var html = '';
                var sum = 0;
                var classSize = ' size80';
                if (this.LabelSize === 0) {
                    classSize = ' size58';
                    this.checkContainer.removeClass('size80').addClass('size58');
                    this.checkView.removeClass('size80').addClass('size58');
                    this.checkViewPos.removeClass('size80').addClass('size58');
                }
                else {
                    this.checkContainer.removeClass('size58').addClass('size80');
                    this.checkView.removeClass('size58').addClass('size80');
                    this.checkViewPos.removeClass('size58').addClass('size80');
                }
                if (this.printer && utils.isNullOrEmpty(this.printer.logo) === false)
                    html += '<img style="width:100%;" src = "' + location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + this.printer.logo + '">';
                if (this.printer && utils.isNullOrEmpty(this.printer.header) === false)
                    html += '<span class="truncate-print check-view-row center-print">' + this.printer.header.replace('\n', '<br />') + '</span>';
                if (this.printer && this.printer.salepoint && utils.isNullOrEmpty(this.printer.salepoint.name) === false)
                    html += '<span class="truncate-print check-view-row center-print">' + this.printer.salepoint.name.replace('\n', '<br />') + '</span>';
                if (this.posCheck) {
                    html += '<span class="truncate-print check-view-row center-print">' + vars._statres("label$check") + ' №' + utils.numberPadZero(this.posCheck.id, 7) + '</span>';
                    html += '<span class="truncate-print check-view-row">' + vars._statres("label$time") + ': ' + utils.date_ddmmyyyy_withtime(this.posCheck.cd) + '</span>';
                    html += '<div class="check-view-row-delimiter"></div><br/>';
                    //for (let j = 0; j < 10; j++) {
                    for (var i = 0, icount = (this.posCheck.positions && this.posCheck.positions.length ? this.posCheck.positions.length : 0); i < icount; i++) {
                        html += '<span class="truncate-print check-view-name' + classSize + '">' + this.posCheck.positions[i].product.name + '</span>';
                        html += '<span class="truncate-print right-print check-view-price' + classSize + '">' + this.posCheck.positions[i].quantity + 'x' + utils.numberToString(this.posCheck.positions[i].price, 2) + '</span><br/>';
                        sum = sum + (this.posCheck.positions[i].quantity * this.posCheck.positions[i].price);
                    }
                    //}
                    html += '<br/><div class="check-view-row-delimiter"></div>';
                    html += '<span class="truncate-print check-view-total bold' + classSize + '">' + vars._statres("label$sum") + '</span>';
                    html += '<span class="truncate-print right-print check-view-total-price' + classSize + '">' + utils.numberToString(sum, 2) + '</span><br/>';
                    var discountSum = (this.posCheck.discount && this.posCheck.discount > 0 ? (this.posCheck.discount / 100.0) : 0) * sum;
                    if (this.posCheck.discount && this.posCheck.discount > 0) {
                        html += '<span class="truncate-print check-view-total bold' + classSize + '">' + vars._statres("label$discount") + ' ' + this.posCheck.discount + '</span>';
                        html += '<span class="truncate-print right-print check-view-total-price' + classSize + '">' + this.posCheck.discount + ' %</span><br/>';
                        html += '<span class="truncate-print check-view-total bold' + classSize + '">' + vars._statres("label$discount") + '</span>';
                        html += '<span class="truncate-print right-print check-view-total-price' + classSize + '">' + utils.numberToString(discountSum, 2) + '</span><br/>';
                    }
                    html += '<span class="truncate-print check-view-total bold' + classSize + '">' + vars._statres("label$total") + '</span>';
                    html += '<span class="truncate-print right-print check-view-total-price' + classSize + '">' + utils.numberToString(sum - discountSum, 2) + '</span><br/>';
                    html += '<span class="truncate-print check-view-total bold' + classSize + '">' + (this.posCheck.ptype == 2 ? vars._statres("label$cash$noin") : vars._statres("label$cash$in")) + '</span>';
                    html += '<span class="truncate-print right-print check-view-total-price' + classSize + '">' + utils.numberToString(sum - discountSum, 2) + '</span><br/>';
                }
                if (this.printer && utils.isNullOrEmpty(this.printer.footer) === false)
                    html += '<span class="truncate-print check-view-row center-print">' + this.printer.footer.replace('\n', '<br />') + '</span>';
                this.checkViewPos.html(html);
            };
            CheckViewControl.prototype.Print = function (pskey) {
                var self = this;
                if (this.printService) {
                    this.printService.PrintCheck(pskey, self.checkContainer.html(), function (responseData) { }, function (errorData) { self.PrintThis(); });
                }
                else
                    this.PrintThis();
            };
            CheckViewControl.prototype.PrintThis = function () {
                this.checkContainer.printThis({
                    pageTitle: "PRINT CHECK",
                    importCSS: true,
                    //importStyle: true,         // import style tags
                    printContainer: true // print outer container/$.selector
                });
            };
            return CheckViewControl;
        }());
        POSControl.CheckViewControl = CheckViewControl;
    })(POSControl = exports.POSControl || (exports.POSControl = {}));
});
//# sourceMappingURL=poscontrol.js.map