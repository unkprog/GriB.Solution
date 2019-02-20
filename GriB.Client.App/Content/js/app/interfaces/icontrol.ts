namespace Interfaces.Control {

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
        FilterSettings: ICardFilterSettings;
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

    export interface ITableColumn extends IBaseColumn {
        HeaderGroupName?: string;
        IsSum?: boolean;
        IsOrder?: boolean;
    }

    export interface IControlTable {
        Columns: ITableColumn[];
        InitView(): JQuery;
        DestroyView();
        TableBody: JQuery;
        Setup();
        Rows: Interfaces.Model.ITableRowModel[];
        OnDetalize(row: Interfaces.Model.ITableRowModel);
    }
}