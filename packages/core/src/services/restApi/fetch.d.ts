import BaseAjaxService from './baseAjaxService';
import { Dispatch } from 'redux';
import { HTTPMethod, IRestApiService } from '../contracts';
export declare type ResponseData = {
    statusText: string;
    status: number;
    ok: boolean;
    contentType: string;
    data?: any;
};
export default class RestApi extends BaseAjaxService {
    header: any;
    isRefreshTokenCalled: boolean;
    constructor(controller: string, prefixUrl?: string, dispatch?: Dispatch, appSettings?: {});
    _new(controller: string, prefixUrl?: string, dispatch?: Dispatch, appSettings?: any): IRestApiService;
    restApi(method?: HTTPMethod, url?: string, parameters?: any, body?: any, header?: any, responseType?: string, responseEncoding?: string, actionDescription?: string, notifyOnError?: boolean, isFormData?: boolean): Promise<any>;
    internalApiCall: (request: Request, actionDescription?: string, notifyOnError?: boolean) => Promise<any>;
    parseResponse: (response: Response) => Promise<ResponseData>;
    private validateStatus1xx;
    private validateStatus2xx;
    private validateStatus3xx;
    private validateStatus4xx;
    private validateStatus5xx;
    private validateCustomStatus;
    validateResponseStatus: (response: ResponseData, actionDescription: string, notifyOnError: boolean, request: Request) => Promise<any>;
    private refreshToken;
}
