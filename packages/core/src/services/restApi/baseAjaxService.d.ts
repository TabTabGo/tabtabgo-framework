import { IRestApiService, IStorageService, RequestProps, HTTPMethod } from '../contracts';
import { Dispatch } from 'redux';
export default class BaseAjaxService implements IRestApiService {
    protected sessionManger: IStorageService;
    protected controller: string;
    protected appSettings: any;
    protected prefixUrl: string;
    protected dispatch?: Dispatch;
    constructor(controller: string, prefixUrl?: string, dispatch?: Dispatch, appSettings?: any);
    _new(controller: string, prefixUrl?: string, dispatch?: Dispatch, appSettings?: any): IRestApiService;
    destroy(): void;
    Abort(allRequests: boolean): Promise<void>;
    Get({ url, parameters, header, actionDescription, notifyOnError, responseType, responseEncoding, }: RequestProps): Promise<any>;
    Put({ url, parameters, body, header, actionDescription, notifyOnError, responseType, responseEncoding, }: RequestProps): Promise<any>;
    Patch({ url, parameters, body, header, actionDescription, notifyOnError, responseType, responseEncoding, }: RequestProps): Promise<any>;
    Post({ url, parameters, body, header, actionDescription, notifyOnError, isFormData, responseType, responseEncoding, }: RequestProps): Promise<any>;
    Delete({ url, parameters, body, header, actionDescription, notifyOnError, responseType, responseEncoding, }: RequestProps): Promise<any>;
    restApi(method?: HTTPMethod, url?: string, parameters?: any, body?: any, header?: any, responseType?: string, responseEncoding?: string, actionDescription?: string, notifyOnError?: boolean, isFormData?: boolean): Promise<any>;
    resetPage: () => void;
    protected reduxDispatch(action: any): void;
    protected parseUrl: (url?: string, parameters?: any, buildQuery?: boolean, concatBaseUrl?: boolean) => string;
    protected getFilename(response: any): string;
}
