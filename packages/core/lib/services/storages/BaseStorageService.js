'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

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

var BaseStorageService = function BaseStorageService() {
  var _this = this;

  _classCallCheck(this, BaseStorageService);

  this.token_name = 'access_token';
  this.token_type = 'token_type';
  this.token_expired = 'token_expired';
  this.user_info = 'user_info';
  this.refresh_token = 'refresh_token';
  this.token_header_key = 'token_header_key';

  this.setToken = /*#__PURE__*/ (function () {
    var _ref = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(accessToken, tokenType, tokenExpired) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return Promise.all([
                  _this.setAccessToken(accessToken),
                  _this.setAccessToken(tokenType),
                  _this.setTokenExpire(tokenExpired || -1),
                ]);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      }),
    );

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })();

  this.setTokenType = function (tokenType) {
    return _this.setItem(_this.token_type, tokenType);
  };

  this.setAccessToken = function (accessToken) {
    return _this.setItem(_this.token_name, accessToken);
  };

  this.setTokenExpire = function (tokenExpired) {
    return _this.setItem(_this.token_expired, tokenExpired);
  };

  this.setRefreshToken = function (refreshToken, user) {
    return _this.setItem(_this.refresh_token, refreshToken);
  };

  this.setTokenHeaderKey = function (headerKey) {
    return _this.setItem(_this.token_header_key, headerKey);
  };

  this.setUser = function (user) {
    return _this.setItem(_this.user_info, user);
  };

  this.getToken = function () {
    return _this.getItem(_this.token_name);
  };

  this.getTokenType = function () {
    return _this.getItem(_this.token_type);
  };

  this.getTokenHeaderKey = function () {
    return _this.getItem(_this.token_header_key);
  };

  this.getUser = /*#__PURE__*/ _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
      var user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              _context2.next = 2;
              return _this.getItem(_this.user_info);

            case 2:
              user = _context2.sent;
              return _context2.abrupt('return', user);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    }),
  );

  this.getRefreshToken = function (user) {
    return _this.getItem(_this.refresh_token);
  };

  this.isTokenExpired = /*#__PURE__*/ _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
      var tokenExpiry, expiresAt;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch ((_context3.prev = _context3.next)) {
            case 0:
              if (_this.getToken()) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', false);

            case 2:
              _context3.next = 4;
              return _this.getItem(_this.token_expired);

            case 4:
              tokenExpiry = _context3.sent;

              if (tokenExpiry) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt('return', false);

            case 7:
              expiresAt = Number(tokenExpiry) * 1000; // JSON.stringify(Number(tokenExpiry) * 1000 + new Date().getTime());

              return _context3.abrupt('return', new Date().getTime() > expiresAt);

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3);
    }),
  );
  this.resetToken = /*#__PURE__*/ _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
      var resetTasks;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch ((_context4.prev = _context4.next)) {
            case 0:
              resetTasks = [
                _this.reset(_this.token_type),
                _this.reset(_this.token_expired),
                _this.reset(_this.user_info),
                _this.reset(_this.refresh_token),
              ];
              _context4.next = 3;
              return Promise.all(resetTasks);

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4);
    }),
  );
};

exports['default'] = BaseStorageService;
