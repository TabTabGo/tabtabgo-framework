import ExportService from '../services/ExportService';

import {
  IAuthService,
  IStorageService,
  IRefreshTokenService,
  INotificationService,
  IRestApiService,
  IFileService,
  IExportService,
} from '../services/contracts';

export default class ServiceProvider {
  services: any;
  dispatch: any;
  constructor() {
    this.services = {};
  }
  setDispatch(dispatch: any) {
    this.dispatch = dispatch;
    return this;
  }
  getDispatch() {
    return this.dispatch;
  }

  setAuthenticationService(authService: IAuthService) {
    this.services.authenticationService = authService;
    return this;
  }

  getAuthenticationService(): IAuthService {
    return this.services.authenticationService;
  }
  newAuthenticationService(configuration?: any): IAuthService {
    return this.services.authenticationService._new(configuration);
  }

  setStorageService(sessionManager: IStorageService) {
    this.services.sessionManager = sessionManager;
    return this;
  }

  getStorageService(): IStorageService {
    return this.services.sessionManager;
  }

  setRefreshTokenStorage(storageService: IRefreshTokenService) {
    this.services.refreshTokenStorage = storageService;
    return this;
  }

  getRefreshTokenStorage(): IRefreshTokenService {
    return this.services.refreshTokenStorage;
  }

  setAjaxService(ajaxService: IRestApiService) {
    this.services.ajaxService = ajaxService;
    return this;
  }

  getAjaxService(): IRestApiService {
    return this.services.ajaxService;
  }

  /**
   *
   * @param {string} controller controller name
   * @param {string} prefixUrl controller prefix like version number or any other special api url
   * @param {*} appSettings object for api/ajax settings
   */
  newAjaxService(controller = '/', prefixUrl = '', appSettings: any = {}): IRestApiService {
    return this.services.ajaxService?._new(controller, prefixUrl, this.dispatch, appSettings);
  }

  getFileService(): IFileService {
    return this.services.fileService;
  }

  setFileService(service: IFileService) {
    this.services.fileService = service;
    return this;
  }

  newFileService(controller = 'files'): IFileService {
    return this.services.fileService?._new(controller);
  }

  // TODO create a export service config class
  getExportService(): IExportService<any> {
    return this.services.exportService;
  }

  setExportService(service: IExportService<any>) {
    this.services.exportService = service;
    return this;
  }

  setNotificationService(notificationService: INotificationService) {
    this.services.notificationService = notificationService;
    return this;
  }

  getNotificationService(): INotificationService {
    return this.services?.notificationService as INotificationService;
  }

  newExportService(configuration: any = {}) {
    if (!this.services.exportService) {
      this.services.exportService = new ExportService(configuration);
    }

    return this.services.exportService?._new(configuration);
  }

  setService(key: string, service: object) {
    this.services[key] = service;
    return this;
  }

  getService(key: string) {
    if (this.services[key]) return this.services[key];
    return null;
  }
}

export const currentServiceProvider = new ServiceProvider();
