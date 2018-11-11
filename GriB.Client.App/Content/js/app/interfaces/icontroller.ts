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

    export interface ICardColumn {
        Header?: string;
        HeaderStyle?: string;
        HeaderTemplate?: string;
        Field?: string;
        FieldStyle?: string;
        FieldTemplate?: string;
    }

    export interface ICardSettings {
        FieldId?: string;
        FieldSearch: string;
        ValueIdNew: number;
        EditIdName: string;
        IsAdd: boolean;
        IsEdit: boolean;
        IsDelete: boolean;
        IsSelect: boolean;
        EditController: string;
        Columns?: ICardColumn[];
        Load: (callback: (responseData: any) => void) => void;
        Delete: (id: number, callback: (responseData: any) => void) => void;
    }

    export interface IEditorSettings {
        EditIdName: string;
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
        OnSelect(controller: IControllerCard): void;
    }

    export interface IDialog extends IController {
        Show(header: string, e: string): void;
        OnClose: () => void;
    }
}