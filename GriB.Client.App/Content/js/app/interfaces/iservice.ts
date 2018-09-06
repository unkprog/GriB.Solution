namespace Interfaces {
    export interface IServiceOptions {
        BaseUrl: string;
    }

    export interface IServiceCallOptions {
        Action: string;
        CrossDomain?: boolean;
        RequestData?: any;
        Callback?: (responseData: any) => void;
        Error?: (e: any) => void;
    }

    export interface IService {
        Options: IServiceOptions;
        GetApi(options: IServiceCallOptions): void;
        PostApi(options: IServiceCallOptions): void;
    }
}