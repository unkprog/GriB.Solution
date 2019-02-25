namespace Interfaces {

    export interface IControllerOptions {
        Url: string;
        Id: string;
    }

    export interface IController {
        Options: IControllerOptions;
        Model: kendo.data.ObservableObject;
        View: JQuery;

        Header: string;
        ViewInit(view: JQuery): boolean;
        ViewShow(e: any): boolean;
        ViewHide(e: any): void;
        //AfterShow(e: any): void;
        ViewResize(e?: any): void;
    }

    export interface ICardController {
    }

    export interface IControllerStack {
        Current: Interfaces.IController;
        Pop: () => void; 
        Push: (controller: Interfaces.IController) => void; 
        Last: Interfaces.IController;
    }

    export interface IOpenControllerOptions {
        urlController: string;
        isModal?: boolean;
        backController?: Interfaces.IController;
        onLoadController?: (controller: Interfaces.IController) => void;
    }


    export interface IOpenViewOptions {
        controller: Interfaces.IController;
        isModal?: boolean;
        backController?: Interfaces.IController;
        isRestore?: boolean;
    }

    export interface IControllerNavigation {
        ControllerBack(e: any): void;
        RestoreController(): void;
        OpenController(options: IOpenControllerOptions): void;
        OpenView(options: IOpenViewOptions): void;
    }

    export interface IControllerEditor extends IController {
        EditorModel: Model.IBaseModel;
        EditorSettings: Control.IEditorSettings;
        Save(): void;
        Cancel(): void;
    }


    export interface IControllerCard extends IController {
        CardModel: Model.IEditorModel[];
        CardSettings: Control.ICardSettings;
        Add(): void;
        Delete(): void;
        Edit(): void;
        Close(): void;
        getSelectedRowId(): any;
        getSelectedRecord(): Model.IBaseModel;
        OnSelect(controller: IControllerCard): void;
    }

    export interface ICardClient extends IControllerCard {
        IsShowPhone(isShow: boolean): void;
    }

    export interface IDialog extends IController {
        Show(header: string, e: string): void;
        OnClose: () => void;
    }

    export interface ITerminalCheks {
        AddPosition(product: number): void;
    }

    export interface ITerminal {
        ShowLoading(): void;
        HideLoading(): void;

        Model: kendo.data.ObservableObject;
        Cheks: ITerminalCheks;
        View: JQuery;
        CurrentSalePoint: number;
        ControlChecks: JQuery;

        Reset(): void;
    }

    export interface IControllerPaymentType extends IControllerEditor {
        OnSelectPaymentType(controller: IControllerPaymentType): void;
        SelectedPaymentType: number;
    }

    export interface IControllerPayment extends IControllerEditor {
        OnPaymentApply(controller: IControllerPayment): void;
        TotalSum: number;
        ReceivedSum: number;
        SurrenderSum: number;
        TypeWithOut: number;
        Client: Interfaces.Model.IReferenceModel;
        Comment: string;
        EditorModel: Interfaces.Model.IPaymentModel;
    }

    export interface IControllerPaymentNumPad extends IControllerPayment {
    }

    export interface IControllerPaymentNonCash extends IControllerPayment {
    }

    export interface IControllerPaymentWithOut extends IControllerPayment {
    }

    export interface IControllerCheckComment extends IControllerEditor {
        IsRequireComment: boolean;
        Comment: string;
        OnApply(controller: IControllerCheckComment): void;
    }

    export interface IControllerReportWithFilter extends IControllerEditor {
        SaveFilter(): void;
        RestoreFilter(): void;
        Filter: Interfaces.Model.IReportFilter;
    }

    export interface IControllerReport extends IControllerReportWithFilter {
        Columns: Control.ITableColumn[];
        Table: Control.IControlTable;
    }
}