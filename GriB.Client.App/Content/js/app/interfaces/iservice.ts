export module Interfaces {
    export interface IServiceOptions {
        BaseUrl: string;
    }

    export interface IServiceCallOptions {
        Action: string;
        RequestData?: any;
        Callback?: (responseData: any) => void;
        Error?: (e: any) => void;
    }

    export interface IService {
        GetApi(options: IServiceCallOptions): void;
        PostApi(options: IServiceCallOptions): void;
    }
}