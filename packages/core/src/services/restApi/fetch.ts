/* eslint-disable no-console */
import { AppSettings } from '../../Appsettings';
//import { Promise } from "es6-promise";
import * as ActionTypes from './actionTypes';
import { TTGError } from '../../types/TTGError';
import BaseAjaxService from './baseAjaxService';
import { Dispatch } from 'redux';
import { HTTPMethod, IRestApiService } from '../contractss';

export type ResponseData = {
  statusText: string;
  status: number;
  ok: boolean;
  contentType: string;
  data?: any;
};

export default class RestApi extends BaseAjaxService {
  header: any;
  isRefreshTokenCalled: boolean;
  constructor(controller: string, prefixUrl?: string, dispatch?: Dispatch, appSettings = {}) {
    super(controller, prefixUrl, dispatch, appSettings);
    this.header = {
      'Content-Type': 'application/json',
      Accept: '*/*',
    };
    this.isRefreshTokenCalled = false;
  }

  _new(
    controller: string,
    prefixUrl?: string,
    dispatch?: Dispatch,
    appSettings?: any,
  ): IRestApiService {
    return new RestApi(controller, prefixUrl, dispatch, appSettings);
  }

  public async restApi(
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
  ): Promise<any> {
    if (!url) url = '';
    if (!parameters) parameters = {};

    //if(!body) body = {};
    if (!header) header = {};
    if (!actionDescription) actionDescription = '';
    if (notifyOnError === undefined) notifyOnError = false;

    let requestUrl = this.parseUrl(url, parameters);
    //Setup Header
    let headerProps = Object.assign({}, this.header, header);
    if (isFormData) {
      delete headerProps['Content-Type'];
    }

    //handle token
    if (!this.appSettings.disableTokenAuthorization) {
      var token = await this.sessionManger.getToken();
      var tokenType = await this.sessionManger.getTokenType();
      //TODO check if token session expired
      var isTokenExpired = await this.sessionManger.isTokenExpired();
      var addToken = false;
      if (token && isTokenExpired) {
        if (this.appSettings.allowRefreshToken) {
          try {
            await this.refreshToken();
            token = await this.sessionManger.getToken();
            addToken = true;
          } catch (error) {
            console.warn('Refresh token Failed. ', error);
            addToken = false;
          }
        } else {
          addToken = false;
        }
      } else if (token) {
        addToken = true;
      }
      if (addToken) {
        headerProps = Object.assign(headerProps, {
          Authorization: `${tokenType} ${token}`,
        }); //Se tup custom header
      } else {
        this.resetPage();
        throw new TTGError(
          `Your session is expired. Please Login Again.`,
          'REST_API_ERROR_SESSION_EXPIRED',
        );
      }
    }

    let customHeader = new Headers(headerProps);

    let requestInit = {
      method: method,
      headers: customHeader,
      credentials: 'include',
    } as any;
    if (AppSettings.excludeCredential) {
      delete requestInit.credentials;
    }
    if (body) {
      Object.assign(requestInit, {
        body: typeof body === 'string' ? body : isFormData ? body : JSON.stringify(body),
      });
    }
    //console.info(actionDescription);

    var request = new Request(requestUrl, requestInit);
    return await this.internalApiCall(request, actionDescription, notifyOnError);
  }

  internalApiCall = async (
    request: Request,
    actionDescription?: string,
    notifyOnError?: boolean,
  ) => {
    this.reduxDispatch({ type: ActionTypes.AJAX_CALL_BEGIN });
    try {
      var response = await fetch(request);
      var responseObj = await this.parseResponse(response);

      var validate = await this.validateResponseStatus(
        responseObj,
        actionDescription || '',
        notifyOnError || false,
        request,
      );
      if (validate === true) return responseObj.data;
    } catch (error) {
      this.reduxDispatch({ type: ActionTypes.AJAX_CALL_END });
      //console.error(error);
      throw error;
    }
  };

  parseResponse = async (response: Response): Promise<ResponseData> => {
    var contentType = 'unknown';
    let data;

    if (response.headers && response.headers?.has('Content-Type')) {
      var contentTypeParts = response.headers.get('Content-Type')?.split(';');
      var mimeType = contentTypeParts ? contentTypeParts[0] : '';
      // var charset, boundary;
      // if (contentTypeParts.length > 0) charset = contentTypeParts[1];
      // if (contentTypeParts.length > 2) boundary = contentTypeParts[2];

      var type = mimeType.split('/')[0];
      var subType = mimeType.split('/')[1];
      // TODO handle json , text , html etc
      switch (type) {
        case 'text':
          switch (subType) {
            case 'plain':
              data = await response.text();
              contentType = 'text';
              break;
            case 'css':
            case 'html':
            //TODO return html view
            // eslint-disable-next-line no-fallthrough
            case 'markdown':
            default:
              console.log(`Error: ${type}/${subType} handle not supported yet`);
              break;
          }
          break;
        case 'image':
        case 'audio':
        case 'video':
          data = { blob: await response.blob(), filename: this.getFilename(response) };
          contentType = type;
          // return stream
          break;
        case 'application':
          switch (subType) {
            case 'octet-stream':
            case 'pdf':
              data = { blob: await response.blob(), filename: this.getFilename(response) };
              contentType = subType;
              break;
            case 'json':
              data = await response.json();
              contentType = 'json';
              break;
            case 'javascript':
            case 'ecmascript':
            default:
              console.log(`Error: ${type}/${subType} handle not supported yet`);
              break;
          }
          break;
        case 'multipart':
          data = await response.formData();
          contentType = 'FormData';
          break;
        default:
          var text = await response.text();
          contentType = subType;

          try {
            data = JSON.parse(text);
          } catch (err) {
            console.warn("Can't parse response body to json : {0}", err);
            data = text;
          }
          break;
      }
    }

    return {
      statusText: response.statusText,
      status: response.status,
      ok: response.ok,
      contentType: contentType,
      data: data,
    } as ResponseData;
  };

  // eslint-disable-next-line no-unused-vars
  private validateStatus1xx = async (
    parsedResponse: ResponseData,
    actionDescription?: string,
    notifyOnError?: boolean,
    request?: Request,
  ) => {
    this.reduxDispatch({ type: ActionTypes.AJAX_CALL_END });
    return true;
  };

  // eslint-disable-next-line no-unused-vars
  private validateStatus2xx = async (
    response: ResponseData,
    actionDescription?: string,
    notifyOnError?: boolean,
    request?: Request,
  ) => {
    this.reduxDispatch({ type: ActionTypes.AJAX_CALL_END });
    return true;
  };

  // eslint-disable-next-line no-unused-vars
  private validateStatus3xx = async (
    response: ResponseData,
    actionDescription?: string,
    notifyOnError?: boolean,
    request?: Request,
  ) => {
    return true;
  };

  private validateStatus4xx = async (
    response: ResponseData,
    exception: any,
    actionDescription: string,
    notifyOnError: boolean,
    request: Request,
  ) => {
    var isErrorHandled = false;

    if (response.status === 403 || response.status === 405) {
      //this.resetPage();
      throw new TTGError(
        `You are not authorized ${actionDescription ? 'to ' + actionDescription : ''}.`,
        'REST_API_ERROR_NOT_AUTHORIZED',
      );

      // window.history.back();
      // isErrorHandled = true;
    } else if (response.status === 401 && exception?.code === 'invalid_token') {
      console.log('Session is expired');
      if (this.appSettings.allowRefreshToken) {
        this.isRefreshTokenCalled = true;
        var refreshResponse = await this.refreshToken();
        if (refreshResponse && !this.isRefreshTokenCalled) {
          isErrorHandled = true;
          return await this.internalApiCall(request, actionDescription, notifyOnError);
        }
      } else {
        this.resetPage();
        isErrorHandled = true;
      }
      // eslint-disable-next-line no-empty
    } else if (response.status === 400) {
    } else if (response.status === 401 && exception?.code !== 'LOGIN_INVALID') {
      //this.resetPage();
      isErrorHandled = true;
    }

    this.reduxDispatch({ type: ActionTypes.AJAX_CALL_ERROR, error: exception, isErrorHandled });
    if (isErrorHandled) return true;
    throw exception;
  };

  // eslint-disable-next-line no-unused-vars
  private validateStatus5xx = async (
    response: ResponseData,
    exception: any,
    actionDescription: string,
    notifyOnError: boolean,
    request: Request,
  ) => {
    this.reduxDispatch({ type: ActionTypes.AJAX_CALL_ERROR, error: exception });
    throw new TTGError(exception.message, '500', { ...exception, isErrorHandled: false });
  };

  /// Validate status
  // eslint-disable-next-line no-unused-vars
  private validateCustomStatus = async (
    response: ResponseData,
    exception: any,
    actionDescription: string,
    notifyOnError: boolean,
    request: Request,
  ) => {
    this.reduxDispatch({ type: ActionTypes.AJAX_CALL_ERROR, error: exception });
    throw new TTGError(exception.message, '500', { ...exception, isErrorHandled: false });
  };

  validateResponseStatus = async (
    response: ResponseData,
    actionDescription: string,
    notifyOnError: boolean,
    request: Request,
  ) => {
    //TODO handle error
    if (response.ok) {
      if (response.status < 200)
        return await this.validateStatus1xx(response, actionDescription, notifyOnError, request);
      if (response.status < 300)
        return await this.validateStatus2xx(response, actionDescription, notifyOnError, request);
    }
    let exception = {
      status: response.status || 500,
      code: response.data ? response.data.code : response.statusText || 'InternalError',
      message: response.data ? response.data.message : response.statusText || 'Unhandled Error', // TODO unhandled error,
    };

    var responseBody = response.data;
    if (responseBody) {
      if (responseBody.message) exception.message = responseBody.message;
      if (responseBody.error) exception.code = responseBody.error;
      if (responseBody.code) exception.code = responseBody.code;
    }

    console.group('Non success response');
    console.log('exception :', exception);
    console.groupEnd();
    if (response.status < 500)
      return await this.validateStatus4xx(
        response,
        exception,
        actionDescription,
        notifyOnError,
        request,
      );
    if (response.status < 600)
      return await this.validateStatus4xx(
        response,
        exception,
        actionDescription,
        notifyOnError,
        request,
      );
    return await this.validateCustomStatus(
      response,
      exception,
      actionDescription,
      notifyOnError,
      request,
    );
  };

  //TODO move to authService and should be an interface and inject the code somehow
  private refreshToken = async () => {
    let refreshToken = await this.sessionManger.getItem('refresh_token');
    var refresh_token = JSON.parse(refreshToken);
    if (refresh_token) {
      try {
        var token = await this.Get({
          url: 'token/refresh',
          parameters: { token: refresh_token },
        });
        await this.sessionManger.setToken(token, token.type || 'Bearer', token.expiredAt);
        return true;
      } catch (error) {
        console.log(`Failed to refresh Token ${error}`);
        return false;
      }
    }

    return false;
  };
}
