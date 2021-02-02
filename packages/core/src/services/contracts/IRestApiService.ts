import { Dispatch } from 'redux';
export type HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export interface RequestProps {
  url?: string;
  parameters?: any;
  body?: any;
  header?: any;
  responseType?: string; // = "json";
  responseEncoding?: string; // = "utf8";
  actionDescription?: string; // = "";
  notifyOnError?: boolean; // = false;
  isFormData?: boolean; // = false;
}

export interface IRestApiService {
  _new(
    controller: string,
    prefixUrl?: string,
    dispatch?: Dispatch,
    appSettings?: any,
  ): IRestApiService;
  Abort(allRequests?: boolean): Promise<any>;
  Get(requestProps: RequestProps): Promise<any>;
  Put(requestProps: RequestProps): Promise<any>;
  Patch(requestProps: RequestProps): Promise<any>;
  Post(requestProps: RequestProps): Promise<any>;
  Delete(requestProps: RequestProps): Promise<any>;
  restApi(
    method?: HTTPMethod,
    url?: string,
    parameters?: any,
    body?: any,
    header?: any,
    responseType?: string,
    responseEncoding?: string,
    actionDescription?: string,
    notifyOnError?: boolean,
    isFormData?: boolean,
  ): Promise<any>;
  resetPage(): void;
  destroy(): void;
}
