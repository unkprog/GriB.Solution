import bc = require('app/common/basecontroller');
import acc = require('app/services/accountservice');

export namespace Controller.Security {
    export class Account extends bc.Controller.Base {

        constructor() {
            super();
            this.accountService = new acc.Services.AccountService();
        }

        private accountService: acc.Services.AccountService;
        public get AccountService(): acc.Services.AccountService {
            return this.accountService;
        }
    }
}