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
        EditorModel: Interfaces.Model.IBaseModel;
        EditorSettings: Interfaces.IEditorSettings;
        Save(): void;
        Cancel(): void;
    }

    export interface IBaseColumn {
        Header?: string;
        HeaderStyle?: string;
        HeaderTemplate?: string;
        Field?: string;
        FieldStyle?: string;
        FieldTemplate?: string;
    }

    export interface ICardColumn extends IBaseColumn {
    }

    export interface ICardFilterSettings {
        FieldSearch: string;

        GetItemsForView(data: Interfaces.Model.IEditorModel[]): Interfaces.Model.IEditorModel[] 

        InitControls(): JQuery;
        ViewControls(): void;
        ResizeControls(): void;
        createEvents(): void;
        destroyEvents(): void;

        saveFilter(): void;
        restoreFilter(): any;
    }

    export interface ICardSettings {
        FilterSettings: Interfaces.ICardFilterSettings;
        FieldId?: string;
        ValueIdNew: number;
        EditIdName: string;
        IsAdd: boolean;
        IsAddCopy: boolean;
        IsEdit: boolean;
        IsDelete: boolean;
        IsSelect: boolean;
        EditController: string;
        Columns?: ICardColumn[];
        Load: (callback: (responseData: any) => void) => void;
        Delete: (id: number, callback: (responseData: any) => void) => void;
    }


    export interface IEditorButtonSettings {
        IsSave?: boolean;
        IsCancel?: boolean;
    }

    export interface IEditorSettings {
        EditIdName: string;
        ButtonSetings?: IEditorButtonSettings;
        Load: (id: number, callback: (responseData: any) => void) => void;
        Save: (model: Interfaces.Model.IEditorModel, callback: (responseData: any) => void) => void;
    }

    export interface IControllerCard extends IController {
        CardModel: Interfaces.Model.IEditorModel[];
        CardSettings: Interfaces.ICardSettings;
        Add(): void;
        Delete(): void;
        Edit(): void;
        Close(): void;
        getSelectedRowId(): any;
        getSelectedRecord(): Interfaces.Model.IBaseModel;
        OnSelect(controller: IControllerCard): void;
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

    export interface IReportColumn extends IBaseColumn {
        IsSum?: boolean;
        IsOrder?: boolean;
    }

    export interface IReportSettings {
      
        Columns?: IReportColumn[];
    }

    export interface IControllerReportWithFilter extends IControllerEditor {
        SaveFilter(): void;
        RestoreFilter(): void;
        Filter: Interfaces.Model.IReportFilter;
    }

    export interface IControllerReport extends IControllerReportWithFilter {
        ReportSettings: Interfaces.IReportSettings;

        Columns: Interfaces.IReportColumn[];
    }
}