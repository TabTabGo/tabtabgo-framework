/* eslint-disable no-console */
import axios, { AxiosInstance, CancelTokenSource, AxiosRequestConfig } from 'axios';
import { AppSettings } from '../../Appsettings';
import * as fs from 'fs';
import { currentServiceProvider } from '../../providers/ServiceProvider';
import * as ActionTypes from './actionTypes';
import BaseAjaxService from './baseAjaxService';
import { TTGError } from '../../types/TTGError';
import { IRestApiService } from '../contractss';
import { Dispatch } from 'redux';
export default class Axios extends BaseAjaxService {
  currentAxios: AxiosInstance;
  cancelSource: CancelTokenSource;
  constructor(controller: string, prefixUrl?: string, dispatch?: Dispatch, appSettings?: any) {
    super(controller, prefixUrl, dispatch, appSettings);

    let self = this;
    this.currentAxios = axios.create({
      baseUrl: AppSettings.baseApiUrl ? `${AppSettings.baseApiUrl}/${this.prefixUrl}` : '/',
      timeout: AppSettings.timeout || 60000,
      headers: {
        Accept: '*/*',
      },
    } as AxiosRequestConfig);

    this.cancelSource = axios.CancelToken.source();

    this.currentAxios.interceptors.request.use(
      async (requestConfig) => {
        if (!self.appSettings.disableTokenAuthorization) {
          var token = await self.sessionManger.getToken();
          var tokenType = await this.sessionManger.getTokenType();
          var isTokenExpired = await this.sessionManger.isTokenExpired();
          var headerKey = await this.sessionManger.getTokenHeaderKey();
          var addToken = false;
          if (!token || isTokenExpired) {
            if (self.appSettings.allowRefreshToken) {
              try {
                await self.refreshToken();
                token = await this.sessionManger.getToken();
                addToken = true;
              } catch (error) {
                console.warn('Refresh token Failed. ', error?.message, error);
                addToken = false;
              }
            } else {
              addToken = false;
            }
          } else if (token) {
            addToken = true;
          }

          if (addToken) {
            requestConfig.headers[headerKey ?? 'Authorization'] = `${
              tokenType ? tokenType + ' ' : ''
            }${token}`;
          } else {
            self.resetPage();
            throw new TTGError(
              `Your session is expired. Please Login Again.`,
              'REST_API_ERROR_SESSION_EXPIRED',
            );
          }
        }
        return requestConfig;
      },
      (error) => {
        return error;
      },
    );

    this.currentAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        var tokenType = await self.sessionManger.getTokenType();
        var headerKey = await self.sessionManger.getTokenHeaderKey();
        //console.log("api failed error", error.response, originalRequest);
        if (
          // TODO move to setup
          error.response &&
          (error.response.status === 401 ||
            (error.response.status === 403 &&
              error.response?.data?.messageCode === 'tokenIsExpired') ||
            (error.response.status === 400 && error.response?.data?.messageCode === 'userNotFound'))
          //&& !originalRequest._retry
        ) {
          originalRequest._retry = true;
          return self
            .refreshToken()
            .then((res) => {
              //console.log('refreshToken', res)
              if (res) {
                // 2) Change Authorization header
                return self.sessionManger.getToken().then((token) => {
                  self.currentAxios.defaults.headers.common[headerKey ?? 'Authorization'] = `${
                    tokenType ? tokenType + ' ' : ''
                  }${token}`;
                  //axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                  //console.log("try again", originalRequest);
                  // 3) return originalRequest object with Axios.
                  return self.currentAxios.request(originalRequest);
                });
              } else {
                console.warn('failed to get token from refresh token;', error?.message, error);
                self.resetPage();
              }
            })
            .catch((refreshError) => {
              console.warn(
                'failed to get token from refresh token;',
                refreshError?.message,
                refreshError,
              );
              self.resetPage();
            });
        } else if (
          error.response &&
          error.response.status === 401
          //&& originalRequest._retry
        ) {
          console.log('reset Page');
          self.resetPage();
        }
        // return Error object with Promise
        return Promise.reject(error);
      },
    );
  }

  _new(
    controller: string,
    prefixUrl?: string,
    dispatch?: Dispatch,
    appSettings?: any,
  ): IRestApiService {
    return new Axios(controller, prefixUrl, dispatch, appSettings);
  }

  refreshToken = async () => {
    var identityService = currentServiceProvider.getAuthenticationService();
    return await identityService.refreshToken();
  };

  async Abort(allRequests = true) {
    // TODO handle cancel specific API
    if (allRequests) this.cancelSource.cancel('Operation canceled by the user.');
  }

  async restApi(
    method = 'GET',
    url = '',
    parameters = {},
    body = {},
    header = {},
    responseType = 'json',
    responseEncoding = 'utf8',
    actionDescription = '',
    notifyOnError = false,
    isFormData = false,
  ) {
    if (!url) url = '';
    if (!parameters) parameters = {};

    if (!header) header = {};
    if (!actionDescription) actionDescription = '';
    if (notifyOnError === undefined) notifyOnError = false;

    let requestUrl = this.parseUrl(url, parameters, false);
    //console.log('requestUrl', url, requestUrl)
    //Setup Header
    //console.log('header', header);
    let headerProps = Object.assign({}, header) as any;
    if (headerProps['Content-Type']) {
      headerProps = Object.assign({}, headerProps, {
        'Content-Type': 'application/x-www-form-urlencoded',
      });
    } else if (!isFormData) {
      headerProps = Object.assign({}, headerProps, {
        'Content-Type': 'application/json; charset=UTF-8',
      });
    }
    //console.log('headerProps', headerProps);

    let requestConfig = {
      method: method,
      url: requestUrl,
      headers: headerProps,
      params: parameters,
      withCredentials: !AppSettings.excludeCredential,
      responseType,
      responseEncoding,
      validateStatus: function (status: number) {
        return status >= 200 && status < 300; // default
      },
      data: body,
      cancelToken: this.cancelSource ? this.cancelSource.token : null,
    } as any;

    this.reduxDispatch({ type: ActionTypes.AJAX_CALL_BEGIN });
    try {
      //console.log("requestConfig :", requestConfig);
      var response = await this.currentAxios.request(requestConfig);
      this.reduxDispatch({ type: ActionTypes.AJAX_CALL_END });
      if (responseType === 'stream') {
        response.data.pipe(fs.createWriteStream(this.getFilename(response)));
      }
      // TODO do we need to validate status
      return response.data;
    } catch (errorResponse) {
      //TODO error handler
      let error: any = {};
      if (errorResponse?.response?.data) {
        error = errorResponse.response.data;
      }
      if (!error?.status && errorResponse?.response?.status) {
        error.status = errorResponse.response.status;
      }
      //console.log("Failed API request", error);
      this.reduxDispatch({ type: ActionTypes.AJAX_CALL_ERROR, error: error });
      throw error;
    }
  }
}
