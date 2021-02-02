"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _ServiceProvider = require("../../providers/ServiceProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JwtAuthService = //TODO create rest APi interface
//TODO create rest APi interface
function JwtAuthService(configuration) {
  var _this = this;

  _classCallCheck(this, JwtAuthService);

  this.configuration = void 0;
  this.sessionManager = void 0;
  this.restApi = void 0;
  this.restApiWithSession = void 0;

  this.internalLogin = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, body, onSuccess, onError) {
      var _result;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.restApi) {
                _context.next = 3;
                break;
              }

              console.error('Ajax service not setup correctly.');
              return _context.abrupt("return", {
                isAuthenticated: false,
                success: false,
                message: 'Ajax service not setup correctly.'
              });

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return _this.restApi.Post({
                url: url,
                body: body
              });

            case 6:
              _result = _context.sent;

              if (!(_result && _result.succeeded !== false)) {
                _context.next = 12;
                break;
              }

              _context.next = 10;
              return _this.setSession(_result);

            case 10:
              if (onSuccess) onSuccess(_result);
              return _context.abrupt("return", {
                isAuthenticated: true,
                success: true,
                user: _result.user,
                instance: _result.instance,
                menus: _result.menus
              });

            case 12:
              return _context.abrupt("return", {
                isAuthenticated: false,
                success: false,
                message: _result.message || 'Unhandled Error',
                code: _result.code || 'Unhandled'
              });

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](3);
              console.log('error :', _context.t0);
              _context.next = 20;
              return _this.sessionManager.resetToken();

            case 20:
              if (onError) {
                onError(_context.t0);
              }

              return _context.abrupt("return", {
                isAuthenticated: false,
                success: false,
                message: _context.t0.message,
                errorCode: _context.t0.Code
              });

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 15]]);
    }));

    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();

  this.login = function (username, password, redirectUrl) {
    return _this.internalLogin('/login', {
      username: username,
      password: password
    }, function () {
      //TODO add support to react navigation
      if (redirectUrl) window.location.href = redirectUrl;
    });
  };

  this.loginByCode = function (code, identification, mode, onSuccess) {
    identification = identification.replace(/\s/g, '');
    return _this.internalLogin('/login/code', _defineProperty({
      code: code
    }, mode, identification), onSuccess);
  };

  this.sendCode = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(identification) {
      var mode,
          _result2,
          _args2 = arguments;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              mode = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 'phoneNumber';
              _context2.prev = 1;
              identification = identification.replace(/\s/g, '');
              _context2.next = 5;
              return _this.restApi.Get({
                url: '/sendCode',
                parameters: _defineProperty({}, mode, identification)
              });

            case 5:
              _result2 = _context2.sent;

              if (!(_result2 && _result2.code === 'LOGIN_PHONE_NUMBER_TOKEN_SENT')) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", _objectSpread({
                succeeded: true
              }, _result2));

            case 8:
              return _context2.abrupt("return", _objectSpread({
                succeeded: false
              }, _result2));

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);
              console.log('error :', _context2.t0);
              return _context2.abrupt("return", _objectSpread({
                succeeded: false
              }, _context2.t0));

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 11]]);
    }));

    return function (_x5) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.register = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(user, registerUrl) {
      var _result3;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _this.restApi.Post({
                url: registerUrl || '/register',
                body: user
              });

            case 3:
              _result3 = _context3.sent;

              if (!(_result3 && (_result3.code === 'LOGIN_PHONE_NUMBER_TOKEN_SENT' || _result3.code === 'USER_CONFIRM_EMAIL_SENT'))) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", _objectSpread({
                succeeded: true
              }, _result3));

            case 6:
              return _context3.abrupt("return", _objectSpread({
                succeeded: false
              }, _result3));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              console.log('error :', _context3.t0);
              return _context3.abrupt("return", _objectSpread({
                succeeded: false
              }, _context3.t0));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));

    return function (_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.saveUserProfile = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userProfile) {
      var _result4;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (_this.restApiWithSession) {
                _context4.next = 3;
                break;
              }

              console.error('Ajax service not setup correctly.');
              return _context4.abrupt("return", {
                success: false,
                message: 'Ajax service not setup correctly.',
                code: 'NoSetup'
              });

            case 3:
              _context4.prev = 3;
              _context4.next = 6;
              return _this.restApiWithSession.Put({
                url: "/profile",
                body: userProfile
              });

            case 6:
              _result4 = _context4.sent;
              return _context4.abrupt("return", {
                success: true
              });

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](3);
              console.log('error :', _context4.t0);
              return _context4.abrupt("return", {
                success: false,
                message: _context4.t0.message,
                code: _context4.t0.Code
              });

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 10]]);
    }));

    return function (_x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.changeInstance = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(instanceId, redirectUrl) {
      var _result5;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (_this.restApiWithSession) {
                _context5.next = 3;
                break;
              }

              console.error('Ajax service not setup correctly.');
              return _context5.abrupt("return", {
                isAuthenticated: false,
                success: false,
                message: 'Ajax service not setup correctly.',
                code: 'NoSetup'
              });

            case 3:
              _context5.prev = 3;
              _context5.next = 6;
              return _this.restApiWithSession.Put({
                url: "/instances/".concat(instanceId, "/change")
              });

            case 6:
              _result5 = _context5.sent;

              if (!_result5) {
                _context5.next = 12;
                break;
              }

              _context5.next = 10;
              return _this.setSession(_result5);

            case 10:
              if (redirectUrl) window.location.href = redirectUrl;
              return _context5.abrupt("return", {
                success: true,
                isAuthenticated: true,
                user: _result5.user,
                instance: _result5.instance,
                menus: _result5.menus
              });

            case 12:
              return _context5.abrupt("return", {
                isAuthenticated: false,
                success: false,
                message: 'Unhandled Error',
                code: 'Unhandled'
              });

            case 15:
              _context5.prev = 15;
              _context5.t0 = _context5["catch"](3);
              console.log('error :', _context5.t0);
              return _context5.abrupt("return", {
                success: false,
                isAuthenticated: false,
                message: _context5.t0.message,
                code: _context5.t0.Code
              });

            case 19:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[3, 15]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.setSession = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(authResult) {
      var tokenData;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(authResult && authResult.token)) {
                _context6.next = 15;
                break;
              }

              _context6.next = 3;
              return _this.sessionManager.setTokenType('Bearer');

            case 3:
              _context6.next = 5;
              return _this.sessionManager.setAccessToken(authResult.token);

            case 5:
              tokenData = (0, _jwtDecode["default"])(authResult.token); //add timeout to expire

              if (!tokenData) {
                _context6.next = 9;
                break;
              }

              _context6.next = 9;
              return _this.sessionManager.setTokenExpire(tokenData.exp);

            case 9:
              if (!authResult.user) {
                _context6.next = 12;
                break;
              }

              _context6.next = 12;
              return _this.sessionManager.setUser({
                displayName: authResult.user.displayName,
                avatar: authResult.user.avatar,
                instances: [],
                roles: []
              });

            case 12:
              if (!authResult.instance) {
                _context6.next = 15;
                break;
              }

              _context6.next = 15;
              return _this.sessionManager.setItem('instance', authResult.instance);

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x11) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.getSessionData = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var userSession, instanceSession;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _this.sessionManager.getUser();

          case 2:
            userSession = _context7.sent;
            _context7.next = 5;
            return _this.sessionManager.getItem('instance');

          case 5:
            instanceSession = _context7.sent;
            return _context7.abrupt("return", {
              user: userSession,
              menus: null,
              instance: instanceSession
            });

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  this.logout = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _this.restApiWithSession.Post({
              url: '/logout'
            });

          case 3:
            _context8.next = 8;
            break;

          case 5:
            _context8.prev = 5;
            _context8.t0 = _context8["catch"](0);
            console.log('error in logout:', _context8.t0);

          case 8:
            _context8.next = 10;
            return _this.sessionManager.resetToken();

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 5]]);
  }));

  this.recoverPassword = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(email) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _this.restApi.Get({
                url: '/recoverPassword',
                parameters: {
                  email: email
                }
              });

            case 3:
              return _context9.abrupt("return", _context9.sent);

            case 6:
              _context9.prev = 6;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", _context9.t0);

            case 9:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 6]]);
    }));

    return function (_x12) {
      return _ref9.apply(this, arguments);
    };
  }();

  this.resetPassword = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(email, token, newPassword) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _this.restApi.Post({
                url: "/resetPassword",
                parameters: {
                  email: email,
                  token: encodeURIComponent(token)
                },
                body: {
                  newPassword: newPassword,
                  confirmPassword: newPassword
                }
              });

            case 3:
              return _context10.abrupt("return", _context10.sent);

            case 6:
              _context10.prev = 6;
              _context10.t0 = _context10["catch"](0);
              return _context10.abrupt("return", _context10.t0);

            case 9:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 6]]);
    }));

    return function (_x13, _x14, _x15) {
      return _ref10.apply(this, arguments);
    };
  }();

  this.isAuthenticated = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var tokenData, isTokenExpired;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (_this.restApi) {
              _context11.next = 2;
              break;
            }

            return _context11.abrupt("return", false);

          case 2:
            _context11.next = 4;
            return _this.getTokenData();

          case 4:
            tokenData = _context11.sent;

            if (tokenData) {
              _context11.next = 7;
              break;
            }

            return _context11.abrupt("return", false);

          case 7:
            _context11.next = 9;
            return _this.sessionManager.isTokenExpired();

          case 9:
            isTokenExpired = _context11.sent;

            if (isTokenExpired) {
              _context11.next = 14;
              break;
            }

            return _context11.abrupt("return", true);

          case 14:
            _context11.next = 16;
            return _this.sessionManager.resetToken();

          case 16:
            return _context11.abrupt("return", false);

          case 17:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  this.getUserData = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            return _context12.abrupt("return", _this.restApiWithSession.Get({
              url: 'me'
            }));

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  this.getToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _this.sessionManager.getTokenType();

          case 2:
            _context13.t0 = _context13.sent;
            _context13.next = 5;
            return _this.sessionManager.getToken();

          case 5:
            _context13.t1 = _context13.sent;
            return _context13.abrupt("return", {
              tokenType: _context13.t0,
              token: _context13.t1
            });

          case 7:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  this.getTokenData = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
    var token, decoded;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _this.sessionManager.getToken();

          case 2:
            token = _context14.sent;

            if (token) {
              _context14.next = 5;
              break;
            }

            return _context14.abrupt("return", null);

          case 5:
            decoded = (0, _jwtDecode["default"])(token);

            if (decoded) {
              _context14.next = 8;
              break;
            }

            return _context14.abrupt("return", null);

          case 8:
            return _context14.abrupt("return", decoded);

          case 9:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  this.refreshToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
    var refreshToken, refresh_token, tokenResponse;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _this.sessionManager.getItem('refresh_token');

          case 2:
            refreshToken = _context15.sent;
            refresh_token = JSON.parse(refreshToken);

            if (!refresh_token) {
              _context15.next = 16;
              break;
            }

            _context15.prev = 5;
            _context15.next = 8;
            return _this.restApi.Get({
              url: 'token/refresh',
              parameters: {
                token: refresh_token
              }
            });

          case 8:
            tokenResponse = _context15.sent;
            return _context15.abrupt("return", tokenResponse);

          case 12:
            _context15.prev = 12;
            _context15.t0 = _context15["catch"](5);
            console.error("Failed to refresh Token ".concat(_context15.t0));
            return _context15.abrupt("return", false);

          case 16:
            return _context15.abrupt("return", false);

          case 17:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[5, 12]]);
  }));

  this.confirmEmail = /*#__PURE__*/function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(email, token) {
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return _this.restApi.Post({
                url: '/confirm/Email',
                body: {
                  email: email,
                  token: token
                }
              });

            case 2:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    return function (_x16, _x17) {
      return _ref16.apply(this, arguments);
    };
  }();

  this.configuration = configuration;
  this.sessionManager = _ServiceProvider.currentServiceProvider.getStorageService();
  this.restApi = _ServiceProvider.currentServiceProvider.newAjaxService('accounts', '', {
    disableTokenAuthorization: true
  });
  this.restApiWithSession = _ServiceProvider.currentServiceProvider.newAjaxService('accounts', '', {
    disableTokenAuthorization: false
  });
};

var _default = JwtAuthService;
exports["default"] = _default;