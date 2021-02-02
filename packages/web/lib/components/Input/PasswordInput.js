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

var _propTypes = _interopRequireDefault(require('prop-types'));

var _styles = require('@material-ui/core/styles');

var _core = require('@material-ui/core');

var _Visibility = _interopRequireDefault(require('@material-ui/icons/Visibility'));

var _VisibilityOff = _interopRequireDefault(require('@material-ui/icons/VisibilityOff'));

var _Input = _interopRequireDefault(require('ttg-react/web/components/Validations/Input'));

var _passwordInputStyle = _interopRequireDefault(require('./styles/passwordInputStyle'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
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

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
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

var PasswordInput = /*#__PURE__*/ (function (_React$Component) {
  _inherits(PasswordInput, _React$Component);

  var _super = _createSuper(PasswordInput);

  function PasswordInput() {
    var _this;

    _classCallCheck(this, PasswordInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      showPassword: false,
    };
    return _this;
  }

  _createClass(PasswordInput, [
    {
      key: 'getContentView',
      value: function getContentView() {
        var _this2 = this;

        // eslint-disable-next-line no-unused-vars
        var _this$props = this.props,
          classes = _this$props.classes,
          InputProps = _this$props.InputProps,
          showRequirements = _this$props.showRequirements,
          rest = _objectWithoutProperties(_this$props, [
            'classes',
            'InputProps',
            'showRequirements',
          ]);

        return /*#__PURE__*/ _react['default'].createElement(
          _Input['default'],
          _extends({}, rest, {
            type: this.state.showPassword ? 'text' : 'password',
            InputProps: _objectSpread(
              _objectSpread({}, InputProps),
              {},
              {
                autoComplete: 'off',
                classes: {
                  input: classes.inputWithEndAdornment,
                },
                endAdornment: /*#__PURE__*/ _react['default'].createElement(
                  _core.InputAdornment,
                  {
                    position: 'end',
                  },
                  /*#__PURE__*/ _react['default'].createElement(
                    _core.IconButton,
                    {
                      'aria-label': 'Toggle password visibility',
                      onClick: function onClick() {
                        return _this2.setState(function (state) {
                          return {
                            showPassword: !state.showPassword,
                          };
                        });
                      },
                      className: classes.inputAdornmentIconButton,
                    },
                    this.state.showPassword
                      ? /*#__PURE__*/ _react['default'].createElement(_VisibilityOff['default'], {
                          className: classes.inputAdornmentIcon,
                        })
                      : /*#__PURE__*/ _react['default'].createElement(_Visibility['default'], {
                          className: classes.inputAdornmentIcon,
                        }),
                  ),
                ),
              },
            ),
          }),
        );
      },
    },
    {
      key: 'getRequirements',
      value: function getRequirements(color) {
        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _core.Typography,
            {
              variant: 'caption',
              color: color,
            },
            'Must be at least 6 characters long',
            /*#__PURE__*/ _react['default'].createElement('br', null),
            'Must include at least one number',
            /*#__PURE__*/ _react['default'].createElement('br', null),
            'Must include at least one uppercase character',
            /*#__PURE__*/ _react['default'].createElement('br', null),
            'Must include at least one non-alphanumeric character',
          ),
        );
      },
    },
    {
      key: 'render',
      value: function render() {
        if (this.props.showRequirements) {
          return /*#__PURE__*/ _react['default'].createElement(
            _react['default'].Fragment,
            null,
            /*#__PURE__*/ _react['default'].createElement(
              _core.Hidden,
              {
                smDown: true,
              },
              /*#__PURE__*/ _react['default'].createElement(
                _core.Tooltip,
                {
                  title: this.getRequirements('inherit'),
                  placement: 'top',
                },
                this.getContentView(),
              ),
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _core.Hidden,
              {
                mdUp: true,
              },
              this.getContentView(),
              this.getRequirements('black'),
            ),
          );
        }

        return this.getContentView();
      },
    },
  ]);

  return PasswordInput;
})(_react['default'].Component);

PasswordInput.propTypes = {
  classes: _propTypes['default'].object.isRequired,
  showRequirements: _propTypes['default'].bool,
  InputProps: _propTypes['default'].object,
};
PasswordInput.defaultProps = {
  showRequirements: false,
};

var _default = (0, _styles.withStyles)(_passwordInputStyle['default'])(PasswordInput);

exports['default'] = _default;
