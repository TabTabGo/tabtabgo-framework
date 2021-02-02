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

var _utilities = require('./utilities');

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

var ToolbarButtons = /*#__PURE__*/ (function (_Component) {
  _inherits(ToolbarButtons, _Component);

  var _super = _createSuper(ToolbarButtons);

  function ToolbarButtons() {
    _classCallCheck(this, ToolbarButtons);

    return _super.apply(this, arguments);
  }

  _createClass(ToolbarButtons, [
    {
      key: 'getButton',
      value: function getButton(icon, label, button, _onClick, disabled, className, color) {
        var _this = this;

        var classes = this.props.classes;
        var isDisabled = typeof disabled === 'function' ? disabled(this.props) : disabled;

        if (label) {
          var labelText = (0, _utilities.getLabel)(button, this.props);
          return /*#__PURE__*/ _react['default'].createElement(
            _core.Button,
            {
              'aria-label': labelText,
              className: ''.concat(classes.button, ' ').concat(className),
              disabled: isDisabled,
              color: color,
              startIcon: icon,
              onClick: function onClick(e) {
                e.stopPropagation();
                if (_onClick) _onClick(_this.props, e);
              },
            },
            labelText,
          );
        }

        if (icon) {
          return /*#__PURE__*/ _react['default'].createElement(
            _core.IconButton,
            {
              className: ''.concat(classes.iconButton, ' ').concat(className),
              'aria-label': (0, _utilities.getLabel)(button, this.props),
              disabled: isDisabled,
              color: color,
              onClick: function onClick(e) {
                e.stopPropagation();
                if (_onClick) _onClick(_this.props, e);
              },
            },
            icon && typeof icon === 'function' ? icon(this.props) : icon,
          );
        }

        return /*#__PURE__*/ _react['default'].createElement('div', null);
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
          classes = _this$props.classes,
          buttons = _this$props.buttons,
          defaultColor = _this$props.defaultColor; //console.log('buttons :', buttons);

        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          {
            className: classes.buttons,
          },
          buttons &&
            Object.keys(buttons).map(function (aKey, key) {
              var button = buttons[aKey];
              var component = button.component,
                icon = button.icon,
                label = button.label,
                onClick = button.onClick,
                disabled = button.disabled,
                hide = button.hide,
                className = button.className;

              if (
                hide &&
                ((typeof hide === 'function' && hide(_this2.props)) ||
                  (typeof hide === 'boolean' && hide === true))
              ) {
                return null;
              }

              if (component) return component(_this2.props, key);
              return /*#__PURE__*/ _react['default'].createElement(
                _core.Tooltip,
                {
                  title: (0, _utilities.getTooltip)(button, _this2.props),
                  key: key,
                },
                _this2.getButton(
                  icon,
                  label && (0, _utilities.getLabel)(button, _this2.props),
                  button,
                  onClick,
                  disabled,
                  className,
                  button.color || defaultColor,
                ),
              );
            }, this),
        );
      },
    },
  ]);

  return ToolbarButtons;
})(_react.Component);

ToolbarButtons.propTypes = {
  classes: _propTypes['default'].object.isRequired,
  nameSingularText: _propTypes['default'].string,
  namePluralText: _propTypes['default'].string,
  buttons: _propTypes['default'].object,
  defaultColor: _propTypes['default'].string,
  data: _propTypes['default'].any,
};

var toolbarButtonsStyles = function toolbarButtonsStyles() {
  return {
    buttons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: '1 0 25%',
      textAlign: 'right',
    },
    button: {},
    iconButton: {},
  };
};

var _default = (0, _styles.withStyles)(toolbarButtonsStyles)(ToolbarButtons);

exports['default'] = _default;
