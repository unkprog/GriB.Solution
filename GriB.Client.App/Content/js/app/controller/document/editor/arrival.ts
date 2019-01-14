import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/document/editor/editor');
import { _app } from 'app/common/variables';

export namespace Controller.Document.Editor {
    export class Arrival extends edit.Controller.Document.Editor.Editor {
        constructor() {
            super();
        }

        public get Header(): string {
            return vars._statres("label$arrival");
        }
      

        public get EditIdName(): string {
            return "id_arrival";
        }


    }
}

vars.registerController("document/editor/arrival", function (module: any): Interfaces.IController { return new module.Controller.Document.Editor.Arrival(); });