import bc = require('app/common/basecontroller');

export namespace Controller.Dialog {
    export class Base extends bc.Controller.Base implements Interfaces.IDialog {
        public Show(header: string, e: string): void {
        }

        public OnClose: () => void;
    }
}