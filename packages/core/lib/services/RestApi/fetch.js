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

var _Appsettings = require('../../Appsettings');

var ActionTypes = _interopRequireWildcard(require('./actionTypes'));

var _TTGError = require('../../types/TTGError');

var _baseAjaxService = _interopRequireDefault(require('./baseAjaxService'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
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

var RestApi = /*#__PURE__*/ (function (_BaseAjaxService) {
  _inherits(RestApi, _BaseAjaxService);

  var _super = _createSuper(RestApi);

  function RestApi(controller, prefixUrl, dispatch) {
    var _this;

    var appSettings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, RestApi);

    _this = _super.call(this, controller, prefixUrl, dispatch, appSettings);
    _this.header = void 0;
    _this.isRefreshTokenCalled = void 0;

    _this.internalApiCall = /*#__PURE__*/ (function () {
      var _ref = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(
          request,
          actionDescription,
          notifyOnError,
        ) {
          var response, responseObj, validate;
          return regeneratorRuntime.wrap(
            function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _this.reduxDispatch({
                      type: ActionTypes.AJAX_CALL_BEGIN,
                    });

                    _context.prev = 1;
                    _context.next = 4;
                    return fetch(request);

                  case 4:
                    response = _context.sent;
                    _context.next = 7;
                    return _this.parseResponse(response);

                  case 7:
                    responseObj = _context.sent;
                    _context.next = 10;
                    return _this.validateResponseStatus(
                      responseObj,
                      actionDescription || '',
                      notifyOnError || false,
                      request,
                    );

                  case 10:
                    validate = _context.sent;

                    if (!(validate === true)) {
                      _context.next = 13;
                      break;
                    }

                    return _context.abrupt('return', responseObj.data);

                  case 13:
                    _context.next = 19;
                    break;

                  case 15:
                    _context.prev = 15;
                    _context.t0 = _context['catch'](1);

                    _this.reduxDispatch({
                      type: ActionTypes.AJAX_CALL_END,
                    }); //console.error(error);

                    throw _context.t0;

                  case 19:
                  case 'end':
                    return _context.stop();
                }
              }
            },
            _callee,
            null,
            [[1, 15]],
          );
        }),
      );

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    })();

    _this.parseResponse = /*#__PURE__*/ (function () {
      var _ref2 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(response) {
          var _response$headers;

          var contentType,
            data,
            _response$headers$get,
            contentTypeParts,
            mimeType,
            type,
            subType,
            text;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  contentType = 'unknown';

                  if (
                    !(
                      response.headers &&
                      (_response$headers = response.headers) !== null &&
                      _response$headers !== void 0 &&
                      _response$headers.has('Content-Type')
                    )
                  ) {
                    _context2.next = 56;
                    break;
                  }

                  contentTypeParts =
                    (_response$headers$get = response.headers.get('Content-Type')) === null ||
                    _response$headers$get === void 0
                      ? void 0
                      : _response$headers$get.split(';');
                  mimeType = contentTypeParts ? contentTypeParts[0] : ''; // var charset, boundary;
                  // if (contentTypeParts.length > 0) charset = contentTypeParts[1];
                  // if (contentTypeParts.length > 2) boundary = contentTypeParts[2];

                  type = mimeType.split('/')[0];
                  subType = mimeType.split('/')[1]; // TODO handle json , text , html etc

                  _context2.t0 = type;
                  _context2.next =
                    _context2.t0 === 'text'
                      ? 9
                      : _context2.t0 === 'image'
                      ? 20
                      : _context2.t0 === 'audio'
                      ? 20
                      : _context2.t0 === 'video'
                      ? 20
                      : _context2.t0 === 'application'
                      ? 27
                      : _context2.t0 === 'multipart'
                      ? 45
                      : 50;
                  break;

                case 9:
                  _context2.t1 = subType;
                  _context2.next =
                    _context2.t1 === 'plain'
                      ? 12
                      : _context2.t1 === 'css'
                      ? 17
                      : _context2.t1 === 'html'
                      ? 17
                      : _context2.t1 === 'markdown'
                      ? 17
                      : 17;
                  break;

                case 12:
                  _context2.next = 14;
                  return response.text();

                case 14:
                  data = _context2.sent;
                  contentType = 'text';
                  return _context2.abrupt('break', 19);

                case 17:
                  console.log(
                    'Error: '.concat(type, '/').concat(subType, ' handle not supported yet'),
                  );
                  return _context2.abrupt('break', 19);

                case 19:
                  return _context2.abrupt('break', 56);

                case 20:
                  _context2.next = 22;
                  return response.blob();

                case 22:
                  _context2.t2 = _context2.sent;
                  _context2.t3 = _this.getFilename(response);
                  data = {
                    blob: _context2.t2,
                    filename: _context2.t3,
                  };
                  contentType = type; // return stream

                  return _context2.abrupt('break', 56);

                case 27:
                  _context2.t4 = subType;
                  _context2.next =
                    _context2.t4 === 'octet-stream'
                      ? 30
                      : _context2.t4 === 'pdf'
                      ? 30
                      : _context2.t4 === 'json'
                      ? 37
                      : _context2.t4 === 'javascript'
                      ? 42
                      : _context2.t4 === 'ecmascript'
                      ? 42
                      : 42;
                  break;

                case 30:
                  _context2.next = 32;
                  return response.blob();

                case 32:
                  _context2.t5 = _context2.sent;
                  _context2.t6 = _this.getFilename(response);
                  data = {
                    blob: _context2.t5,
                    filename: _context2.t6,
                  };
                  contentType = subType;
                  return _context2.abrupt('break', 44);

                case 37:
                  _context2.next = 39;
                  return response.json();

                case 39:
                  data = _context2.sent;
                  contentType = 'json';
                  return _context2.abrupt('break', 44);

                case 42:
                  console.log(
                    'Error: '.concat(type, '/').concat(subType, ' handle not supported yet'),
                  );
                  return _context2.abrupt('break', 44);

                case 44:
                  return _context2.abrupt('break', 56);

                case 45:
                  _context2.next = 47;
                  return response.formData();

                case 47:
                  data = _context2.sent;
                  contentType = 'FormData';
                  return _context2.abrupt('break', 56);

                case 50:
                  _context2.next = 52;
                  return response.text();

                case 52:
                  text = _context2.sent;
                  contentType = subType;

                  try {
                    data = JSON.parse(text);
                  } catch (err) {
                    console.warn("Can't parse response body to json : {0}", err);
                    data = text;
                  }

                  return _context2.abrupt('break', 56);

                case 56:
                  return _context2.abrupt('return', {
                    statusText: response.statusText,
                    status: response.status,
                    ok: response.ok,
                    contentType: contentType,
                    data: data,
                  });

                case 57:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2);
        }),
      );

      return function (_x4) {
        return _ref2.apply(this, arguments);
      };
    })();

    _this.validateStatus1xx = /*#__PURE__*/ (function () {
      var _ref3 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(
          parsedResponse,
          actionDescription,
          notifyOnError,
          request,
        ) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _this.reduxDispatch({
                    type: ActionTypes.AJAX_CALL_END,
                  });

                  return _context3.abrupt('return', true);

                case 2:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3);
        }),
      );

      return function (_x5, _x6, _x7, _x8) {
        return _ref3.apply(this, arguments);
      };
    })();

    _this.validateStatus2xx = /*#__PURE__*/ (function () {
      var _ref4 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(
          response,
          actionDescription,
          notifyOnError,
          request,
        ) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _this.reduxDispatch({
                    type: ActionTypes.AJAX_CALL_END,
                  });

                  return _context4.abrupt('return', true);

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4);
        }),
      );

      return function (_x9, _x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
      };
    })();

    _this.validateStatus3xx = /*#__PURE__*/ (function () {
      var _ref5 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee5(
          response,
          actionDescription,
          notifyOnError,
          request,
        ) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  return _context5.abrupt('return', true);

                case 1:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5);
        }),
      );

      return function (_x13, _x14, _x15, _x16) {
        return _ref5.apply(this, arguments);
      };
    })();

    _this.validateStatus4xx = /*#__PURE__*/ (function () {
      var _ref6 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee6(
          response,
          exception,
          actionDescription,
          notifyOnError,
          request,
        ) {
          var isErrorHandled, refreshResponse;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch ((_context6.prev = _context6.next)) {
                case 0:
                  isErrorHandled = false;

                  if (!(response.status === 403 || response.status === 405)) {
                    _context6.next = 5;
                    break;
                  }

                  throw new _TTGError.TTGError(
                    'You are not authorized '.concat(
                      actionDescription ? 'to ' + actionDescription : '',
                      '.',
                    ),
                    'REST_API_ERROR_NOT_AUTHORIZED',
                  );

                case 5:
                  if (
                    !(
                      response.status === 401 &&
                      (exception === null || exception === void 0 ? void 0 : exception.code) ===
                        'invalid_token'
                    )
                  ) {
                    _context6.next = 23;
                    break;
                  }

                  console.log('Session is expired');

                  if (!_this.appSettings.allowRefreshToken) {
                    _context6.next = 19;
                    break;
                  }

                  _this.isRefreshTokenCalled = true;
                  _context6.next = 11;
                  return _this.refreshToken();

                case 11:
                  refreshResponse = _context6.sent;

                  if (!(refreshResponse && !_this.isRefreshTokenCalled)) {
                    _context6.next = 17;
                    break;
                  }

                  isErrorHandled = true;
                  _context6.next = 16;
                  return _this.internalApiCall(request, actionDescription, notifyOnError);

                case 16:
                  return _context6.abrupt('return', _context6.sent);

                case 17:
                  _context6.next = 21;
                  break;

                case 19:
                  _this.resetPage();

                  isErrorHandled = true;

                case 21:
                  _context6.next = 24;
                  break;

                case 23:
                  if (response.status === 400) {
                  } else if (
                    response.status === 401 &&
                    (exception === null || exception === void 0 ? void 0 : exception.code) !==
                      'LOGIN_INVALID'
                  ) {
                    //this.resetPage();
                    isErrorHandled = true;
                  }

                case 24:
                  _this.reduxDispatch({
                    type: ActionTypes.AJAX_CALL_ERROR,
                    error: exception,
                    isErrorHandled: isErrorHandled,
                  });

                  if (!isErrorHandled) {
                    _context6.next = 27;
                    break;
                  }

                  return _context6.abrupt('return', true);

                case 27:
                  throw exception;

                case 28:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6);
        }),
      );

      return function (_x17, _x18, _x19, _x20, _x21) {
        return _ref6.apply(this, arguments);
      };
    })();

    _this.validateStatus5xx = /*#__PURE__*/ (function () {
      var _ref7 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee7(
          response,
          exception,
          actionDescription,
          notifyOnError,
          request,
        ) {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch ((_context7.prev = _context7.next)) {
                case 0:
                  _this.reduxDispatch({
                    type: ActionTypes.AJAX_CALL_ERROR,
                    error: exception,
                  });

                  throw new _TTGError.TTGError(
                    exception.message,
                    '500',
                    _objectSpread(
                      _objectSpread({}, exception),
                      {},
                      {
                        isErrorHandled: false,
                      },
                    ),
                  );

                case 2:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7);
        }),
      );

      return function (_x22, _x23, _x24, _x25, _x26) {
        return _ref7.apply(this, arguments);
      };
    })();

    _this.validateCustomStatus = /*#__PURE__*/ (function () {
      var _ref8 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee8(
          response,
          exception,
          actionDescription,
          notifyOnError,
          request,
        ) {
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch ((_context8.prev = _context8.next)) {
                case 0:
                  _this.reduxDispatch({
                    type: ActionTypes.AJAX_CALL_ERROR,
                    error: exception,
                  });

                  throw new _TTGError.TTGError(
                    exception.message,
                    '500',
                    _objectSpread(
                      _objectSpread({}, exception),
                      {},
                      {
                        isErrorHandled: false,
                      },
                    ),
                  );

                case 2:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8);
        }),
      );

      return function (_x27, _x28, _x29, _x30, _x31) {
        return _ref8.apply(this, arguments);
      };
    })();

    _this.validateResponseStatus = /*#__PURE__*/ (function () {
      var _ref9 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee9(
          response,
          actionDescription,
          notifyOnError,
          request,
        ) {
          var exception, responseBody;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch ((_context9.prev = _context9.next)) {
                case 0:
                  if (!response.ok) {
                    _context9.next = 9;
                    break;
                  }

                  if (!(response.status < 200)) {
                    _context9.next = 5;
                    break;
                  }

                  _context9.next = 4;
                  return _this.validateStatus1xx(
                    response,
                    actionDescription,
                    notifyOnError,
                    request,
                  );

                case 4:
                  return _context9.abrupt('return', _context9.sent);

                case 5:
                  if (!(response.status < 300)) {
                    _context9.next = 9;
                    break;
                  }

                  _context9.next = 8;
                  return _this.validateStatus2xx(
                    response,
                    actionDescription,
                    notifyOnError,
                    request,
                  );

                case 8:
                  return _context9.abrupt('return', _context9.sent);

                case 9:
                  exception = {
                    status: response.status || 500,
                    code: response.data
                      ? response.data.code
                      : response.statusText || 'InternalError',
                    message: response.data
                      ? response.data.message
                      : response.statusText || 'Unhandled Error', // TODO unhandled error,
                  };
                  responseBody = response.data;

                  if (responseBody) {
                    if (responseBody.message) exception.message = responseBody.message;
                    if (responseBody.error) exception.code = responseBody.error;
                    if (responseBody.code) exception.code = responseBody.code;
                  }

                  console.group('Non success response');
                  console.log('exception :', exception);
                  console.groupEnd();

                  if (!(response.status < 500)) {
                    _context9.next = 19;
                    break;
                  }

                  _context9.next = 18;
                  return _this.validateStatus4xx(
                    response,
                    exception,
                    actionDescription,
                    notifyOnError,
                    request,
                  );

                case 18:
                  return _context9.abrupt('return', _context9.sent);

                case 19:
                  if (!(response.status < 600)) {
                    _context9.next = 23;
                    break;
                  }

                  _context9.next = 22;
                  return _this.validateStatus4xx(
                    response,
                    exception,
                    actionDescription,
                    notifyOnError,
                    request,
                  );

                case 22:
                  return _context9.abrupt('return', _context9.sent);

                case 23:
                  _context9.next = 25;
                  return _this.validateCustomStatus(
                    response,
                    exception,
                    actionDescription,
                    notifyOnError,
                    request,
                  );

                case 25:
                  return _context9.abrupt('return', _context9.sent);

                case 26:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9);
        }),
      );

      return function (_x32, _x33, _x34, _x35) {
        return _ref9.apply(this, arguments);
      };
    })();

    _this.refreshToken = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee10() {
        var refreshToken, refresh_token, token;
        return regeneratorRuntime.wrap(
          function _callee10$(_context10) {
            while (1) {
              switch ((_context10.prev = _context10.next)) {
                case 0:
                  _context10.next = 2;
                  return _this.sessionManger.getItem('refresh_token');

                case 2:
                  refreshToken = _context10.sent;
                  refresh_token = JSON.parse(refreshToken);

                  if (!refresh_token) {
                    _context10.next = 18;
                    break;
                  }

                  _context10.prev = 5;
                  _context10.next = 8;
                  return _this.Get({
                    url: 'token/refresh',
                    parameters: {
                      token: refresh_token,
                    },
                  });

                case 8:
                  token = _context10.sent;
                  _context10.next = 11;
                  return _this.sessionManger.setToken(
                    token,
                    token.type || 'Bearer',
                    token.expiredAt,
                  );

                case 11:
                  return _context10.abrupt('return', true);

                case 14:
                  _context10.prev = 14;
                  _context10.t0 = _context10['catch'](5);
                  console.log('Failed to refresh Token '.concat(_context10.t0));
                  return _context10.abrupt('return', false);

                case 18:
                  return _context10.abrupt('return', false);

                case 19:
                case 'end':
                  return _context10.stop();
              }
            }
          },
          _callee10,
          null,
          [[5, 14]],
        );
      }),
    );
    _this.header = {
      'Content-Type': 'application/json',
      Accept: '*/*',
    };
    _this.isRefreshTokenCalled = false;
    return _this;
  }

  _createClass(RestApi, [
    {
      key: '_new',
      value: function _new(controller, prefixUrl, dispatch, appSettings) {
        return new RestApi(controller, prefixUrl, dispatch, appSettings);
      },
    },
    {
      key: 'restApi',
      value: (function () {
        var _restApi = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee11(
            method,
            url,
            parameters,
            body,
            header,
            responseType,
            responseEncoding,
            actionDescription,
            notifyOnError,
            isFormData,
          ) {
            var requestUrl,
              headerProps,
              token,
              tokenType,
              isTokenExpired,
              addToken,
              customHeader,
              requestInit,
              request;
            return regeneratorRuntime.wrap(
              function _callee11$(_context11) {
                while (1) {
                  switch ((_context11.prev = _context11.next)) {
                    case 0:
                      if (!url) url = '';
                      if (!parameters) parameters = {}; //if(!body) body = {};

                      if (!header) header = {};
                      if (!actionDescription) actionDescription = '';
                      if (notifyOnError === undefined) notifyOnError = false;
                      requestUrl = this.parseUrl(url, parameters); //Setup Header

                      headerProps = Object.assign({}, this.header, header);

                      if (isFormData) {
                        delete headerProps['Content-Type'];
                      } //handle token

                      if (this.appSettings.disableTokenAuthorization) {
                        _context11.next = 46;
                        break;
                      }

                      _context11.next = 11;
                      return this.sessionManger.getToken();

                    case 11:
                      token = _context11.sent;
                      _context11.next = 14;
                      return this.sessionManger.getTokenType();

                    case 14:
                      tokenType = _context11.sent;
                      _context11.next = 17;
                      return this.sessionManger.isTokenExpired();

                    case 17:
                      isTokenExpired = _context11.sent;
                      addToken = false;

                      if (!(token && isTokenExpired)) {
                        _context11.next = 39;
                        break;
                      }

                      if (!this.appSettings.allowRefreshToken) {
                        _context11.next = 36;
                        break;
                      }

                      _context11.prev = 21;
                      _context11.next = 24;
                      return this.refreshToken();

                    case 24:
                      _context11.next = 26;
                      return this.sessionManger.getToken();

                    case 26:
                      token = _context11.sent;
                      addToken = true;
                      _context11.next = 34;
                      break;

                    case 30:
                      _context11.prev = 30;
                      _context11.t0 = _context11['catch'](21);
                      console.warn('Refresh token Failed. ', _context11.t0);
                      addToken = false;

                    case 34:
                      _context11.next = 37;
                      break;

                    case 36:
                      addToken = false;

                    case 37:
                      _context11.next = 40;
                      break;

                    case 39:
                      if (token) {
                        addToken = true;
                      }

                    case 40:
                      if (!addToken) {
                        _context11.next = 44;
                        break;
                      }

                      headerProps = Object.assign(headerProps, {
                        Authorization: ''.concat(tokenType, ' ').concat(token),
                      }); //Se tup custom header

                      _context11.next = 46;
                      break;

                    case 44:
                      this.resetPage();
                      throw new _TTGError.TTGError(
                        'Your session is expired. Please Login Again.',
                        'REST_API_ERROR_SESSION_EXPIRED',
                      );

                    case 46:
                      customHeader = new Headers(headerProps);
                      requestInit = {
                        method: method,
                        headers: customHeader,
                        credentials: 'include',
                      };

                      if (_Appsettings.AppSettings.excludeCredential) {
                        delete requestInit.credentials;
                      }

                      if (body) {
                        Object.assign(requestInit, {
                          body:
                            typeof body === 'string'
                              ? body
                              : isFormData
                              ? body
                              : JSON.stringify(body),
                        });
                      } //console.info(actionDescription);

                      request = new Request(requestUrl, requestInit);
                      _context11.next = 53;
                      return this.internalApiCall(request, actionDescription, notifyOnError);

                    case 53:
                      return _context11.abrupt('return', _context11.sent);

                    case 54:
                    case 'end':
                      return _context11.stop();
                  }
                }
              },
              _callee11,
              this,
              [[21, 30]],
            );
          }),
        );

        function restApi(_x36, _x37, _x38, _x39, _x40, _x41, _x42, _x43, _x44, _x45) {
          return _restApi.apply(this, arguments);
        }

        return restApi;
      })(),
    },
  ]);

  return RestApi;
})(_baseAjaxService['default']);

exports['default'] = RestApi;
