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

var _react = _interopRequireDefault(require('react'));

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _notistack = require('notistack');

var _actions = require('./actions');

var _ErrorContext = require('../../contexts/ErrorContext');

var _Button = _interopRequireDefault(require('@material-ui/core/Button'));

var _core = require('@material-ui/core');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
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

var DismissButton = (0, _core.withStyles)({
  root: {
    color: '#fff',
    marginLeft: 32,
    fontWeight: 500,
  },
})(_Button['default']);

var Notifier = /*#__PURE__*/ (function (_React$Component) {
  _inherits(Notifier, _React$Component);

  var _super = _createSuper(Notifier);

  function Notifier() {
    var _this;

    _classCallCheck(this, Notifier);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.displayed = [];

    _this.storeDisplayed = function (id) {
      _this.displayed = [].concat(_toConsumableArray(_this.displayed), [id]);
    };

    return _this;
  }

  _createClass(Notifier, [
    {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(_ref) {
        var _ref$notifications = _ref.notifications,
          newSnacks = _ref$notifications === void 0 ? [] : _ref$notifications;
        var currentSnacks = this.props.notifications;
        var notExists = false;

        var _loop = function _loop(i) {
          if (notExists) return 'continue';
          notExists =
            notExists ||
            !currentSnacks.filter(function (_ref2) {
              var key = _ref2.key;
              return newSnacks[i].key === key;
            }).length;
        };

        for (var i = 0; i < newSnacks.length; i += 1) {
          var _ret = _loop(i);

          if (_ret === 'continue') continue;
        }

        return notExists;
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var _this2 = this;

        var _this$props$notificat = this.props.notifications,
          notifications = _this$props$notificat === void 0 ? [] : _this$props$notificat;
        notifications.forEach(function (notification) {
          var _notification$options, _notification$options2;

          // Do nothing if snackbar is already displayed
          if (_this2.displayed.includes(notification.key)) return; // Display snackbar using notistack
          //console.log('notification', notification);

          var isError =
            ((_notification$options = notification.options) === null ||
            _notification$options === void 0
              ? void 0
              : _notification$options.variant) === 'error';
          var error =
            (_notification$options2 = notification.options) === null ||
            _notification$options2 === void 0
              ? void 0
              : _notification$options2.error;

          _this2.props.enqueueSnackbar(
            notification.message,
            _objectSpread(
              _objectSpread({}, notification.options),
              {},
              {
                action: isError
                  ? /*#__PURE__*/ _react['default'].createElement(
                      DismissButton,
                      {
                        onClick: function onClick() {
                          return _this2.props.context.showError(error);
                        },
                      },
                      'Details',
                    )
                  : null,
                onClose: function onClose(event, reason, key) {
                  var _notification$options3;

                  if (
                    notification !== null &&
                    notification !== void 0 &&
                    (_notification$options3 = notification.options) !== null &&
                    _notification$options3 !== void 0 &&
                    _notification$options3.onClose
                  ) {
                    notification.options.onClose(event, reason, key);
                  } // Dispatch action to remove snackbar from redux store

                  _this2.props.removeSnackbar(key);
                },
              },
            ),
          ); // Keep track of snackbars that we've displayed

          _this2.storeDisplayed(notification.key); // Dispatch action to remove snackbar from redux store
          //this.props.removeSnackbar(notification.key);
        });
      },
    },
    {
      key: 'render',
      value: function render() {
        return null;
      },
    },
  ]);

  return Notifier;
})(_react['default'].Component);

var mapStateToProps = function mapStateToProps(store) {
  return {
    notifications: store.notifications.notifications,
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
    {
      removeSnackbar: _actions.removeSnackbar,
    },
    dispatch,
  );
};

var _default = (0, _ErrorContext.withError)(
  (0, _reactRedux.connect)(
    mapStateToProps,
    mapDispatchToProps,
  )((0, _notistack.withSnackbar)(Notifier)),
);

exports['default'] = _default;
