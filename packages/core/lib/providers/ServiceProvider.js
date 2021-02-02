'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.currentServiceProvider = exports['default'] = void 0;

var _ExportService = _interopRequireDefault(require('../services/ExportService'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var ServiceProvider = /*#__PURE__*/ (function () {
  function ServiceProvider() {
    _classCallCheck(this, ServiceProvider);

    this.services = void 0;
    this.dispatch = void 0;
    this.services = {};
  }

  _createClass(ServiceProvider, [
    {
      key: 'setDispatch',
      value: function setDispatch(dispatch) {
        this.dispatch = dispatch;
        return this;
      },
    },
    {
      key: 'getDispatch',
      value: function getDispatch() {
        return this.dispatch;
      },
    },
    {
      key: 'setAuthenticationService',
      value: function setAuthenticationService(authService) {
        this.services.authenticationService = authService;
        return this;
      },
    },
    {
      key: 'getAuthenticationService',
      value: function getAuthenticationService() {
        return this.services.authenticationService;
      },
    },
    {
      key: 'newAuthenticationService',
      value: function newAuthenticationService(configuration) {
        return this.services.authenticationService._new(configuration);
      },
    },
    {
      key: 'setStorageService',
      value: function setStorageService(sessionManager) {
        this.services.sessionManager = sessionManager;
        return this;
      },
    },
    {
      key: 'getStorageService',
      value: function getStorageService() {
        return this.services.sessionManager;
      },
    },
    {
      key: 'setRefreshTokenStorage',
      value: function setRefreshTokenStorage(storageService) {
        this.services.refreshTokenStorage = storageService;
        return this;
      },
    },
    {
      key: 'getRefreshTokenStorage',
      value: function getRefreshTokenStorage() {
        return this.services.refreshTokenStorage;
      },
    },
    {
      key: 'setAjaxService',
      value: function setAjaxService(ajaxService) {
        this.services.ajaxService = ajaxService;
        return this;
      },
    },
    {
      key: 'getAjaxService',
      value: function getAjaxService() {
        return this.services.ajaxService;
      },
      /**
       *
       * @param {string} controller controller name
       * @param {string} prefixUrl controller prefix like version number or any other special api url
       * @param {*} appSettings object for api/ajax settings
       */
    },
    {
      key: 'newAjaxService',
      value: function newAjaxService() {
        var _this$services$ajaxSe;

        var controller = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
        var prefixUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var appSettings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return (_this$services$ajaxSe = this.services.ajaxService) === null ||
          _this$services$ajaxSe === void 0
          ? void 0
          : _this$services$ajaxSe._new(controller, prefixUrl, this.dispatch, appSettings);
      },
    },
    {
      key: 'getFileService',
      value: function getFileService() {
        return this.services.fileService;
      },
    },
    {
      key: 'setFileService',
      value: function setFileService(service) {
        this.services.fileService = service;
        return this;
      },
    },
    {
      key: 'newFileService',
      value: function newFileService() {
        var _this$services$fileSe;

        var controller =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'files';
        return (_this$services$fileSe = this.services.fileService) === null ||
          _this$services$fileSe === void 0
          ? void 0
          : _this$services$fileSe._new(controller);
      }, // TODO create a export service config class
    },
    {
      key: 'getExportService',
      value: function getExportService() {
        return this.services.exportService;
      },
    },
    {
      key: 'setExportService',
      value: function setExportService(service) {
        this.services.exportService = service;
        return this;
      },
    },
    {
      key: 'setNotificationService',
      value: function setNotificationService(notificationService) {
        this.services.notificationService = notificationService;
        return this;
      },
    },
    {
      key: 'getNotificationService',
      value: function getNotificationService() {
        var _this$services;

        return (_this$services = this.services) === null || _this$services === void 0
          ? void 0
          : _this$services.notificationService;
      },
    },
    {
      key: 'newExportService',
      value: function newExportService() {
        var _this$services$export;

        var configuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (!this.services.exportService) {
          this.services.exportService = new _ExportService['default'](configuration);
        }

        return (_this$services$export = this.services.exportService) === null ||
          _this$services$export === void 0
          ? void 0
          : _this$services$export._new(configuration);
      },
    },
    {
      key: 'setService',
      value: function setService(key, service) {
        this.services[key] = service;
        return this;
      },
    },
    {
      key: 'getService',
      value: function getService(key) {
        if (this.services[key]) return this.services[key];
        return null;
      },
    },
  ]);

  return ServiceProvider;
})();

exports['default'] = ServiceProvider;
var currentServiceProvider = new ServiceProvider();
exports.currentServiceProvider = currentServiceProvider;
