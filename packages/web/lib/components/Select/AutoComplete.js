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

var _classnames = _interopRequireDefault(require('classnames'));

var _async = _interopRequireDefault(require('react-select/async'));

var _core = require('@material-ui/core');

var _Cancel = _interopRequireDefault(require('@material-ui/icons/Cancel'));

var _autoCompleteStyle = _interopRequireDefault(require('./autoCompleteStyle'));

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

function NoOptionsMessage(props) {
  return /*#__PURE__*/ _react['default'].createElement(
    _core.Typography,
    _extends(
      {
        color: 'textSecondary',
        className: props.selectProps.classes.noOptionsMessage,
      },
      props.innerProps,
    ),
    props.children,
  );
}

function inputComponent(_ref) {
  var inputRef = _ref.inputRef,
    props = _objectWithoutProperties(_ref, ['inputRef']);

  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    _extends(
      {
        ref: inputRef,
      },
      props,
    ),
  );
}

function Control(props) {
  return /*#__PURE__*/ _react['default'].createElement(
    _core.TextField,
    _extends(
      {
        margin: 'normal',
        fullWidth: true,
        error: props.selectProps ? props.selectProps.error : false,
        InputProps: {
          inputComponent: inputComponent,
          inputProps: _objectSpread(
            {
              className: props.selectProps.classes.input,
              inputRef: props.innerRef,
              children: props.children,
            },
            props.innerProps,
          ),
        },
      },
      props.selectProps.textFieldProps,
      {
        onChange: function onChange(e) {
          //console.log('combo text', e.target.value)
        },
        helperText:
          props.selectProps && props.selectProps.helperText
            ? props.selectProps.helperText
            : props.selectProps.textFieldProps
            ? props.selectProps.textFieldProps.helperText
            : undefined,
      },
    ),
  );
}

function Option(props) {
  return /*#__PURE__*/ _react['default'].createElement(
    _core.MenuItem,
    _extends(
      {
        buttonRef: props.innerRef,
        selected: props.isFocused,
        component: 'div',
        style: {
          fontWeight: props.isSelected ? 500 : 400,
        },
      },
      props.innerProps,
    ),
    props.children,
  );
}

function Placeholder(props) {
  //console.log("placeholder props", props);
  return /*#__PURE__*/ _react['default'].createElement(
    _core.Typography,
    _extends(
      {
        color: 'textSecondary',
        className: props.selectProps.classes.placeholder,
      },
      props.innerProps,
    ),
    props.children,
  );
}

function SingleValue(props) {
  return /*#__PURE__*/ _react['default'].createElement(
    _core.Typography,
    _extends(
      {
        className: props.selectProps.classes.singleValue,
      },
      props.innerProps,
      {
        onBlur: function onBlur(event) {
          return event.preventDefault();
        },
      },
    ),
    props.children,
  );
}

function ValueContainer(props) {
  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    {
      className: props.selectProps.classes.valueContainer,
    },
    props.children,
  );
}

function MultiValue(props) {
  return /*#__PURE__*/ _react['default'].createElement(_core.Chip, {
    style: {
      height: 24,
    },
    tabIndex: -1,
    label: props.children,
    className: (0, _classnames['default'])(
      props.selectProps.classes.chip,
      _defineProperty({}, props.selectProps.classes.chipFocused, props.isFocused),
    ),
    onDelete: props.removeProps.onClick,
    deleteIcon: /*#__PURE__*/ _react['default'].createElement(
      _Cancel['default'],
      props.removeProps,
    ),
  });
}

function Menu(props) {
  if (props.disabled) return null;
  return /*#__PURE__*/ _react['default'].createElement(
    _core.Paper,
    _extends(
      {
        square: true,
        className: props.selectProps.classes.paper,
      },
      props.innerProps,
    ),
    props.children,
  );
}

var components = {
  Control: Control,
  Menu: Menu,
  MultiValue: MultiValue,
  NoOptionsMessage: NoOptionsMessage,
  Option: Option,
  Placeholder: Placeholder,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer,
};

var AutoComplete = /*#__PURE__*/ (function (_React$Component) {
  _inherits(AutoComplete, _React$Component);

  var _super = _createSuper(AutoComplete);

  function AutoComplete() {
    var _this;

    _classCallCheck(this, AutoComplete);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleBlur = function (e) {
      var _this$props = _this.props,
        onBlur = _this$props.onBlur,
        value = _this$props.value;

      if (onBlur) {
        onBlur(value, e);
      }
    };

    return _this;
  }

  _createClass(AutoComplete, [
    {
      key: 'render',
      value: function render() {
        var _this$props2 = this.props,
          classes = _this$props2.classes,
          theme = _this$props2.theme,
          placeholder = _this$props2.placeholder,
          onChange = _this$props2.onChange,
          value = _this$props2.value,
          className = _this$props2.className,
          selectComponent = _this$props2.selectComponent,
          selectRef = _this$props2.selectRef,
          textFieldProps = _this$props2.textFieldProps,
          defaultOptions = _this$props2.defaultOptions,
          cacheOptions = _this$props2.cacheOptions,
          disabled = _this$props2.disabled,
          rest = _objectWithoutProperties(_this$props2, [
            'classes',
            'theme',
            'placeholder',
            'onChange',
            'value',
            'className',
            'selectComponent',
            'selectRef',
            'textFieldProps',
            'defaultOptions',
            'cacheOptions',
            'disabled',
          ]);

        var SelectComponent = selectComponent ? selectComponent : _async['default'];
        var selectStyles = {
          menuPortal: function menuPortal(base) {
            return _objectSpread(
              _objectSpread({}, base),
              {},
              {
                zIndex: 9999,
              },
            );
          },
          input: function input(base) {
            return _objectSpread(
              _objectSpread({}, base),
              {},
              {
                color: theme.palette.text.primary,
                '& input': {
                  font: 'inherit',
                },
              },
            );
          },
          dropdownIndicator: function dropdownIndicator(base) {
            return _objectSpread(
              _objectSpread({}, base),
              {},
              {
                paddingBottom: 4,
                paddingRight: 4,
                cursor: 'pointer',
              },
            );
          },
          clearIndicator: function clearIndicator(base) {
            return _objectSpread(
              _objectSpread({}, base),
              {},
              {
                paddingBottom: 4,
                cursor: 'pointer',
              },
            );
          },
          indicatorSeparator: function indicatorSeparator(base) {
            return _objectSpread(
              _objectSpread({}, base),
              {},
              {
                visibility: 'collapse',
              },
            );
          },
        };

        if (textFieldProps) {
          textFieldProps.value = value || '';
          textFieldProps.InputLabelProps = {
            shrink: placeholder !== '',
          };
        }

        return /*#__PURE__*/ _react['default'].createElement(
          SelectComponent,
          _extends({}, rest, {
            ref: function ref(_ref2) {
              if (selectRef) selectRef(_ref2);
            },
            isDisabled: disabled,
            textFieldProps: textFieldProps,
            className: className,
            classes: classes,
            styles: selectStyles,
            components: components,
            value: value,
            defaultOptions: defaultOptions === undefined ? true : defaultOptions,
            cacheOptions: cacheOptions === undefined ? true : cacheOptions,
            menuPortalTarget: document.body,
            menuPosition: 'absolute',
            menuPlacement: 'bottom',
            onChange: onChange,
            onBlur: this.handleBlur.bind(this),
            placeholder: placeholder,
          }),
        );
      },
    },
  ]);

  return AutoComplete;
})(_react['default'].Component);

AutoComplete.propTypes = {
  classes: _propTypes['default'].object.isRequired,
  theme: _propTypes['default'].object.isRequired,
};

var _default = (0, _core.withStyles)(_autoCompleteStyle['default'], {
  withTheme: true,
})(AutoComplete);

exports['default'] = _default;
