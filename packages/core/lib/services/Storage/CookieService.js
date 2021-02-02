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

var _BaseStorageService2 = _interopRequireDefault(require('./BaseStorageService'));

var _universalCookie = _interopRequireDefault(require('universal-cookie'));

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

var CookieStorageService = /*#__PURE__*/ (function (_BaseStorageService) {
  _inherits(CookieStorageService, _BaseStorageService);

  var _super = _createSuper(CookieStorageService);

  function CookieStorageService() {
    var _this;

    _classCallCheck(this, CookieStorageService);

    _this = _super.call(this);
    _this.cookies = void 0;
    _this.cookies = new _universalCookie['default']();
    return _this;
  }

  _createClass(CookieStorageService, [
    {
      key: 'reset',
      value: (function () {
        var _reset = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee(key) {
            var _this2 = this;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    return _context.abrupt(
                      'return',
                      new Promise(function (resolve) {
                        if (key) _this2.cookies.remove(key);
                        resolve();
                      }),
                    );

                  case 1:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee);
          }),
        );

        function reset(_x) {
          return _reset.apply(this, arguments);
        }

        return reset;
      })(),
    },
    {
      key: 'getItem',
      value: (function () {
        var _getItem = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(key) {
            var _this3 = this;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    return _context2.abrupt(
                      'return',
                      new Promise(function (resolve) {
                        var strToken = _this3.cookies.get(key);

                        if (strToken) return resolve(JSON.parse(strToken));
                        return resolve(null);
                      }),
                    );

                  case 1:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2);
          }),
        );

        function getItem(_x2) {
          return _getItem.apply(this, arguments);
        }

        return getItem;
      })(),
    },
    {
      key: 'setItem',
      value: (function () {
        var _setItem = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(key, object) {
            var _this4 = this;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch ((_context3.prev = _context3.next)) {
                  case 0:
                    return _context3.abrupt(
                      'return',
                      new Promise(function (resolve) {
                        _this4.cookies.set(key, JSON.stringify(object));

                        resolve();
                      }),
                    );

                  case 1:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3);
          }),
        );

        function setItem(_x3, _x4) {
          return _setItem.apply(this, arguments);
        }

        return setItem;
      })(),
    },
  ]);

  return CookieStorageService;
})(_BaseStorageService2['default']);

exports['default'] = CookieStorageService;
