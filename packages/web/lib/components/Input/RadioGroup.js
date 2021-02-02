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

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _styles = require('@material-ui/core/styles');

var _core = require('@material-ui/core');

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

var style = function style(theme) {
  return {
    formGroup: {
      flexDirection: 'row',
    },
    formControl: {
      marginTop: theme.spacing(2),
      '& legend': {
        fontSize: '13px',
        fontWeight: 400,
        marginBottom: 'unset',
      },
    },
  };
};

var ValidationRedioGroup = /*#__PURE__*/ (function (_Component) {
  _inherits(ValidationRedioGroup, _Component);

  var _super = _createSuper(ValidationRedioGroup);

  function ValidationRedioGroup() {
    _classCallCheck(this, ValidationRedioGroup);

    return _super.apply(this, arguments);
  }

  _createClass(ValidationRedioGroup, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          classes = _this$props.classes,
          options = _this$props.options,
          label = _this$props.label,
          error = _this$props.error,
          helperText = _this$props.helperText,
          rest = _objectWithoutProperties(_this$props, [
            'classes',
            'options',
            'label',
            'error',
            'helperText',
          ]);

        return /*#__PURE__*/ _react['default'].createElement(
          _core.FormControl,
          {
            component: 'fieldset',
            className: classes.formControl,
          },
          /*#__PURE__*/ _react['default'].createElement(
            _core.FormLabel,
            {
              component: 'legend',
              style: {
                color: error ? 'red' : 'inherit',
              },
            },
            label,
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _core.RadioGroup,
            _extends(
              {
                className: classes.formGroup,
              },
              rest,
            ),
            options.map(function (item) {
              return /*#__PURE__*/ _react['default'].createElement(_core.FormControlLabel, {
                key: item.value,
                value: item.value,
                label: item.label,
                control: /*#__PURE__*/ _react['default'].createElement(_core.Radio, {
                  color: 'primary',
                }),
                labelPlacement: 'end',
              });
            }),
          ),
          error &&
            helperText &&
            /*#__PURE__*/ _react['default'].createElement(
              _core.FormHelperText,
              {
                error: error,
                style: {
                  marginTop: 0,
                },
              },
              helperText,
            ),
        );
      },
    },
  ]);

  return ValidationRedioGroup;
})(_react.Component);

ValidationRedioGroup.propTypes = {
  classes: _propTypes['default'].object,
  label: _propTypes['default'].string,
  options: _propTypes['default'].arrayOf(
    _propTypes['default'].shape({
      value: _propTypes['default'].string,
      label: _propTypes['default'].node,
    }),
  ).isRequired,
  error: _propTypes['default'].bool,
  helperText: _propTypes['default'].string,
};

var _default = (0, _styles.withTheme)((0, _styles.withStyles)(style)(ValidationRedioGroup));

exports['default'] = _default;
