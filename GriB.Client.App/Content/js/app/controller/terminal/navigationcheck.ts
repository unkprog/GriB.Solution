export namespace Controller.Terminal {
    export class NavigationCheck {
        constructor(view: JQuery, terminal: Interfaces.ITerminal) {

            this.controlContainerChecks = view.find("#posterminal-view-checks-container");
            this.controlChecks = this.controlContainerChecks.find("#posterminal-view-checks");
        }

        private controlChecks: JQuery;
        private controlContainerChecks: JQuery;
        public get ControlContainerChecks() {
            return this.controlContainerChecks;
        }

        public ViewShow(e: any): void {
            $('.chips').chips();
        }

        public ViewResize(e: any): void {
            if (this.controlContainerChecks)
                this.controlContainerChecks.height($(window).height() - this.controlContainerChecks.offset().top);
        }
    }
}