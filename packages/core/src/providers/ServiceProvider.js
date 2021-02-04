import ExportService from '../services/ExportService';
export default class ServiceProvider {
    constructor() {
        this.services = {};
    }
    setDispatch(dispatch) {
        this.dispatch = dispatch;
        return this;
    }
    getDispatch() {
        return this.dispatch;
    }
    setAuthenticationService(authService) {
        this.services.authenticationService = authService;
        return this;
    }
    getAuthenticationService() {
        return this.services.authenticationService;
    }
    newAuthenticationService(configuration) {
        return this.services.authenticationService._new(configuration);
    }
    setStorageService(sessionManager) {
        this.services.sessionManager = sessionManager;
        return this;
    }
    getStorageService() {
        return this.services.sessionManager;
    }
    setRefreshTokenStorage(storageService) {
        this.services.refreshTokenStorage = storageService;
        return this;
    }
    getRefreshTokenStorage() {
        return this.services.refreshTokenStorage;
    }
    setAjaxService(ajaxService) {
        this.services.ajaxService = ajaxService;
        return this;
    }
    getAjaxService() {
        return this.services.ajaxService;
    }
    /**
     *
     * @param {string} controller controller name
     * @param {string} prefixUrl controller prefix like version number or any other special api url
     * @param {*} appSettings object for api/ajax settings
     */
    newAjaxService(controller = '/', prefixUrl = '', appSettings = {}) {
        var _a;
        return (_a = this.services.ajaxService) === null || _a === void 0 ? void 0 : _a._new(controller, prefixUrl, this.dispatch, appSettings);
    }
    getFileService() {
        return this.services.fileService;
    }
    setFileService(service) {
        this.services.fileService = service;
        return this;
    }
    newFileService(controller = 'files') {
        var _a;
        return (_a = this.services.fileService) === null || _a === void 0 ? void 0 : _a._new(controller);
    }
    // TODO create a export service config class
    getExportService() {
        return this.services.exportService;
    }
    setExportService(service) {
        this.services.exportService = service;
        return this;
    }
    setNotificationService(notificationService) {
        this.services.notificationService = notificationService;
        return this;
    }
    getNotificationService() {
        var _a;
        return (_a = this.services) === null || _a === void 0 ? void 0 : _a.notificationService;
    }
    newExportService(configuration = {}) {
        var _a;
        if (!this.services.exportService) {
            this.services.exportService = new ExportService(configuration);
        }
        return (_a = this.services.exportService) === null || _a === void 0 ? void 0 : _a._new(configuration);
    }
    setService(key, service) {
        this.services[key] = service;
        return this;
    }
    getService(key) {
        if (this.services[key])
            return this.services[key];
        return null;
    }
}
export const currentServiceProvider = new ServiceProvider();
