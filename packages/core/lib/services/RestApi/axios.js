'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _axios = _interopRequireDefault(require('axios'));

var _Appsettings = require('../../Appsettings');

var fs = _interopRequireWildcard(require('fs'));

var _ServiceProvider = require('../../providers/ServiceProvider');

var ActionTypes = _interopRequireWildcard(require('./actionTypes'));

var _baseAjaxService = _interopRequireDefault(require('./baseAjaxService'));

var _TTGError = require('../../types/TTGError');

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (_typeof(obj) !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
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

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

var Axios = /*#__PURE__*/ (function (_BaseAjaxService) {
  _inherits(Axios, _BaseAjaxService);

  var _super = _createSuper(Axios);

  function Axios(controller, prefixUrl, dispatch, appSettings) {
    var _this;

    _classCallCheck(this, Axios);

    _this = _super.call(this, controller, prefixUrl, dispatch, appSettings);
    _this.currentAxios = void 0;
    _this.cancelSource = void 0;
    _this.refreshToken = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
        var identityService;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                identityService = _ServiceProvider.currentServiceProvider.getAuthenticationService();
                _context.next = 3;
                return identityService.refreshToken();

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      }),
    );

    var self = _assertThisInitialized(_this);

    _this.currentAxios = _axios['default'].create({
      baseUrl: _Appsettings.AppSettings.baseApiUrl
        ? ''.concat(_Appsettings.AppSettings.baseApiUrl, '/').concat(_this.prefixUrl)
        : '/',
      timeout: _Appsettings.AppSettings.timeout || 60000,
      headers: {
        Accept: '*/*',
      },
    });
    _this.cancelSource = _axios['default'].CancelToken.source();

    _this.currentAxios.interceptors.request.use(
      /*#__PURE__*/ (function () {
        var _ref2 = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(requestConfig) {
            var token, tokenType, isTokenExpired, headerKey, addToken;
            return regeneratorRuntime.wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      if (self.appSettings.disableTokenAuthorization) {
                        _context2.next = 41;
                        break;
                      }

                      _context2.next = 3;
                      return self.sessionManger.getToken();

                    case 3:
                      token = _context2.sent;
                      _context2.next = 6;
                      return _this.sessionManger.getTokenType();

                    case 6:
                      tokenType = _context2.sent;
                      _context2.next = 9;
                      return _this.sessionManger.isTokenExpired();

                    case 9:
                      isTokenExpired = _context2.sent;
                      _context2.next = 12;
                      return _this.sessionManger.getTokenHeaderKey();

                    case 12:
                      headerKey = _context2.sent;
                      addToken = false;

                      if (!(!token || isTokenExpired)) {
                        _context2.next = 34;
                        break;
                      }

                      if (!self.appSettings.allowRefreshToken) {
                        _context2.next = 31;
                        break;
                      }

                      _context2.prev = 16;
                      _context2.next = 19;
                      return self.refreshToken();

                    case 19:
                      _context2.next = 21;
                      return _this.sessionManger.getToken();

                    case 21:
                      token = _context2.sent;
                      addToken = true;
                      _context2.next = 29;
                      break;

                    case 25:
                      _context2.prev = 25;
                      _context2.t0 = _context2['catch'](16);
                      console.warn(
                        'Refresh token Failed. ',
                        _context2.t0 === null || _context2.t0 === void 0
                          ? void 0
                          : _context2.t0.message,
                        _context2.t0,
                      );
                      addToken = false;

                    case 29:
                      _context2.next = 32;
                      break;

                    case 31:
                      addToken = false;

                    case 32:
                      _context2.next = 35;
                      break;

                    case 34:
                      if (token) {
                        addToken = true;
                      }

                    case 35:
                      if (!addToken) {
                        _context2.next = 39;
                        break;
                      }

                      requestConfig.headers[
                        headerKey !== null && headerKey !== void 0 ? headerKey : 'Authorization'
                      ] = ''.concat(tokenType ? tokenType + ' ' : '').concat(token);
                      _context2.next = 41;
                      break;

                    case 39:
                      self.resetPage();
                      throw new _TTGError.TTGError(
                        'Your session is expired. Please Login Again.',
                        'REST_API_ERROR_SESSION_EXPIRED',
                      );

                    case 41:
                      return _context2.abrupt('return', requestConfig);

                    case 42:
                    case 'end':
                      return _context2.stop();
                  }
                }
              },
              _callee2,
              null,
              [[16, 25]],
            );
          }),
        );

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      })(),
      function (error) {
        return error;
      },
    );

    _this.currentAxios.interceptors.response.use(
      function (response) {
        return response;
      },
      /*#__PURE__*/ (function () {
        var _ref3 = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(error) {
            var _error$response, _error$response$data, _error$response2, _error$response2$data;

            var originalRequest, tokenType, headerKey;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch ((_context3.prev = _context3.next)) {
                  case 0:
                    originalRequest = error.config;
                    _context3.next = 3;
                    return self.sessionManger.getTokenType();

                  case 3:
                    tokenType = _context3.sent;
                    _context3.next = 6;
                    return self.sessionManger.getTokenHeaderKey();

                  case 6:
                    headerKey = _context3.sent;

                    if (
                      !(
                        // TODO move to setup
                        (
                          error.response &&
                          (error.response.status === 401 ||
                            (error.response.status === 403 &&
                              ((_error$response = error.response) === null ||
                              _error$response === void 0
                                ? void 0
                                : (_error$response$data = _error$response.data) === null ||
                                  _error$response$data === void 0
                                ? void 0
                                : _error$response$data.messageCode) === 'tokenIsExpired') ||
                            (error.response.status === 400 &&
                              ((_error$response2 = error.response) === null ||
                              _error$response2 === void 0
                                ? void 0
                                : (_error$response2$data = _error$response2.data) === null ||
                                  _error$response2$data === void 0
                                ? void 0
                                : _error$response2$data.messageCode) === 'userNotFound'))
                        ) //&& !originalRequest._retry
                      )
                    ) {
                      _context3.next = 12;
                      break;
                    }

                    originalRequest._retry = true;
                    return _context3.abrupt(
                      'return',
                      self
                        .refreshToken()
                        .then(function (res) {
                          //console.log('refreshToken', res)
                          if (res) {
                            // 2) Change Authorization header
                            return self.sessionManger.getToken().then(function (token) {
                              self.currentAxios.defaults.headers.common[
                                headerKey !== null && headerKey !== void 0
                                  ? headerKey
                                  : 'Authorization'
                              ] = ''.concat(tokenType ? tokenType + ' ' : '').concat(token); //axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                              //console.log("try again", originalRequest);
                              // 3) return originalRequest object with Axios.

                              return self.currentAxios.request(originalRequest);
                            });
                          } else {
                            console.warn(
                              'failed to get token from refresh token;',
                              error === null || error === void 0 ? void 0 : error.message,
                              error,
                            );
                            self.resetPage();
                          }
                        })
                        ['catch'](function (refreshError) {
                          console.warn(
                            'failed to get token from refresh token;',
                            refreshError === null || refreshError === void 0
                              ? void 0
                              : refreshError.message,
                            refreshError,
                          );
                          self.resetPage();
                        }),
                    );

                  case 12:
                    if (
                      error.response &&
                      error.response.status === 401 //&& originalRequest._retry
                    ) {
                      console.log('reset Page');
                      self.resetPage();
                    }

                  case 13:
                    return _context3.abrupt('return', Promise.reject(error));

                  case 14:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3);
          }),
        );

        return function (_x2) {
          return _ref3.apply(this, arguments);
        };
      })(),
    );

    return _this;
  }

  _createClass(Axios, [
    {
      key: '_new',
      value: function _new(controller, prefixUrl, dispatch, appSettings) {
        return new Axios(controller, prefixUrl, dispatch, appSettings);
      },
    },
    {
      key: 'Abort',
      value: (function () {
        var _Abort = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
            var allRequests,
              _args4 = arguments;
            return regeneratorRuntime.wrap(
              function _callee4$(_context4) {
                while (1) {
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      allRequests = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : true;
                      // TODO handle cancel specific API
                      if (allRequests) this.cancelSource.cancel('Operation canceled by the user.');

                    case 2:
                    case 'end':
                      return _context4.stop();
                  }
                }
              },
              _callee4,
              this,
            );
          }),
        );

        function Abort() {
          return _Abort.apply(this, arguments);
        }

        return Abort;
      })(),
    },
    {
      key: 'restApi',
      value: (function () {
        var _restApi = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee5() {
            var method,
              url,
              parameters,
              body,
              header,
              responseType,
              responseEncoding,
              actionDescription,
              notifyOnError,
              isFormData,
              requestUrl,
              headerProps,
              requestConfig,
              response,
              _errorResponse$respon,
              _error,
              _errorResponse$respon2,
              error,
              _args5 = arguments;

            return regeneratorRuntime.wrap(
              function _callee5$(_context5) {
                while (1) {
                  switch ((_context5.prev = _context5.next)) {
                    case 0:
                      method = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : 'GET';
                      url = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : '';
                      parameters = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
                      body = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
                      header = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : {};
                      responseType =
                        _args5.length > 5 && _args5[5] !== undefined ? _args5[5] : 'json';
                      responseEncoding =
                        _args5.length > 6 && _args5[6] !== undefined ? _args5[6] : 'utf8';
                      actionDescription =
                        _args5.length > 7 && _args5[7] !== undefined ? _args5[7] : '';
                      notifyOnError =
                        _args5.length > 8 && _args5[8] !== undefined ? _args5[8] : false;
                      isFormData = _args5.length > 9 && _args5[9] !== undefined ? _args5[9] : false;
                      if (!url) url = '';
                      if (!parameters) parameters = {};
                      if (!header) header = {};
                      if (!actionDescription) actionDescription = '';
                      if (notifyOnError === undefined) notifyOnError = false;
                      requestUrl = this.parseUrl(url, parameters, false); //console.log('requestUrl', url, requestUrl)
                      //Setup Header
                      //console.log('header', header);

                      headerProps = Object.assign({}, header);

                      if (headerProps['Content-Type']) {
                        headerProps = Object.assign({}, headerProps, {
                          'Content-Type': 'application/x-www-form-urlencoded',
                        });
                      } else if (!isFormData) {
                        headerProps = Object.assign({}, headerProps, {
                          'Content-Type': 'application/json; charset=UTF-8',
                        });
                      } //console.log('headerProps', headerProps);

                      requestConfig = {
                        method: method,
                        url: requestUrl,
                        headers: headerProps,
                        params: parameters,
                        withCredentials: !_Appsettings.AppSettings.excludeCredential,
                        responseType: responseType,
                        responseEncoding: responseEncoding,
                        validateStatus: function validateStatus(status) {
                          return status >= 200 && status < 300; // default
                        },
                        data: body,
                        cancelToken: this.cancelSource ? this.cancelSource.token : null,
                      };
                      this.reduxDispatch({
                        type: ActionTypes.AJAX_CALL_BEGIN,
                      });
                      _context5.prev = 20;
                      _context5.next = 23;
                      return this.currentAxios.request(requestConfig);

                    case 23:
                      response = _context5.sent;
                      this.reduxDispatch({
                        type: ActionTypes.AJAX_CALL_END,
                      });

                      if (responseType === 'stream') {
                        response.data.pipe(fs.createWriteStream(this.getFilename(response)));
                      } // TODO do we need to validate status

                      return _context5.abrupt('return', response.data);

                    case 29:
                      _context5.prev = 29;
                      _context5.t0 = _context5['catch'](20);
                      //TODO error handler
                      error = {};

                      if (
                        _context5.t0 !== null &&
                        _context5.t0 !== void 0 &&
                        (_errorResponse$respon = _context5.t0.response) !== null &&
                        _errorResponse$respon !== void 0 &&
                        _errorResponse$respon.data
                      ) {
                        error = _context5.t0.response.data;
                      }

                      if (
                        !((_error = error) !== null && _error !== void 0 && _error.status) &&
                        _context5.t0 !== null &&
                        _context5.t0 !== void 0 &&
                        (_errorResponse$respon2 = _context5.t0.response) !== null &&
                        _errorResponse$respon2 !== void 0 &&
                        _errorResponse$respon2.status
                      ) {
                        error.status = _context5.t0.response.status;
                      } //console.log("Failed API request", error);

                      this.reduxDispatch({
                        type: ActionTypes.AJAX_CALL_ERROR,
                        error: error,
                      });
                      throw error;

                    case 36:
                    case 'end':
                      return _context5.stop();
                  }
                }
              },
              _callee5,
              this,
              [[20, 29]],
            );
          }),
        );

        function restApi() {
          return _restApi.apply(this, arguments);
        }

        return restApi;
      })(),
    },
  ]);

  return Axios;
})(_baseAjaxService['default']);

exports['default'] = Axios;
