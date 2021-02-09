import { AxiosInstance, CancelTokenSource } from 'axios';
import BaseAjaxService from './baseAjaxService';
import { IRestApiService } from '../contracts';
import { Dispatch } from 'redux';
export default class Axios extends BaseAjaxService {
    currentAxios: AxiosInstance;
    cancelSource: CancelTokenSource;
    constructor(controller: string, prefixUrl?: string, dispatch?: Dispatch, appSettings?: any);
    _new(controller: string, prefixUrl?: string, dispatch?: Dispatch, appSettings?: any): IRestApiService;
    refreshToken: () => Promise<boolean>;
    Abort(allRequests?: boolean): Promise<void>;
    restApi(method?: string, url?: string, parameters?: {}, body?: {}, header?: {}, responseType?: string, responseEncoding?: string, actionDescription?: string, notifyOnError?: boolean, isFormData?: boolean): Promise<any>;
}
