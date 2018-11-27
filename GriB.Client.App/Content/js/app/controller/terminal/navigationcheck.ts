export namespace Controller.Terminal {
    export class NavigationCheck {
        constructor(view: JQuery, terminal: Interfaces.ITerminal) {

            this.controlChecks = view.find("#posterminal-view-checks-container");
        }

        private controlChecks: JQuery;
        public get ControlChecks() {
            return this.controlChecks;
        }

        public ViewShow(e: any): void {
            $('.chips').chips();
        }

        public ViewResize(e: any): void {
            if (this.controlChecks)
                this.controlChecks.height($(window).height() - this.controlChecks.offset().top);
        }
    }
}