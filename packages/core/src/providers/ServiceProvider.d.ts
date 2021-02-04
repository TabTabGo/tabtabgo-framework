import { IAuthService, IStorageService, IRefreshTokenService, INotificationService, IRestApiService, IFileService, IExportService } from '../services/contracts';
export default class ServiceProvider {
    services: any;
    dispatch: any;
    constructor();
    setDispatch(dispatch: any): this;
    getDispatch(): any;
    setAuthenticationService(authService: IAuthService): this;
    getAuthenticationService(): IAuthService;
    newAuthenticationService(configuration?: any): IAuthService;
    setStorageService(sessionManager: IStorageService): this;
    getStorageService(): IStorageService;
    setRefreshTokenStorage(storageService: IRefreshTokenService): this;
    getRefreshTokenStorage(): IRefreshTokenService;
    setAjaxService(ajaxService: IRestApiService): this;
    getAjaxService(): IRestApiService;
    /**
     *
     * @param {string} controller controller name
     * @param {string} prefixUrl controller prefix like version number or any other special api url
     * @param {*} appSettings object for api/ajax settings
     */
    newAjaxService(controller?: string, prefixUrl?: string, appSettings?: any): IRestApiService;
    getFileService(): IFileService;
    setFileService(service: IFileService): this;
    newFileService(controller?: string): IFileService;
    getExportService(): IExportService<any>;
    setExportService(service: IExportService<any>): this;
    setNotificationService(notificationService: INotificationService): this;
    getNotificationService(): INotificationService;
    newExportService(configuration?: any): any;
    setService(key: string, service: object): this;
    getService(key: string): any;
}
export declare const currentServiceProvider: ServiceProvider;
