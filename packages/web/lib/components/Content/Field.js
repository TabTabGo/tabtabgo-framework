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

var _core = require('@material-ui/core');

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

var Field = /*#__PURE__*/ (function (_React$Component) {
  _inherits(Field, _React$Component);

  var _super = _createSuper(Field);

  function Field() {
    _classCallCheck(this, Field);

    return _super.apply(this, arguments);
  }

  _createClass(Field, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          label = _this$props.label,
          value = _this$props.value,
          stacked = _this$props.stacked,
          fullWidth = _this$props.fullWidth;
        var computedValue =
          typeof value === 'function'
            ? value()
            : /*#__PURE__*/ _react['default'].createElement(
                _core.Typography,
                {
                  variant: 'body1',
                },
                value,
              );

        if (stacked === true) {
          var stackedGridProps = {
            xs: fullWidth ? 12 : 8,
            sm: fullWidth ? 12 : 6,
            md: fullWidth ? 12 : 4,
          };
          return /*#__PURE__*/ _react['default'].createElement(
            _core.Grid,
            _extends(
              {
                item: true,
              },
              stackedGridProps,
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _core.Typography,
              {
                variant: 'body1',
              },
              /*#__PURE__*/ _react['default'].createElement('strong', null, label),
            ),
            /*#__PURE__*/ _react['default'].createElement(
              'div',
              {
                style: {
                  marginTop: 8,
                  marginBottom: 8,
                },
              },
              computedValue,
            ),
          );
        }

        return /*#__PURE__*/ _react['default'].createElement(
          _react['default'].Fragment,
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _core.Grid,
            {
              item: true,
              xs: 4,
              sm: 3,
              md: 2,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _core.Typography,
              {
                variant: 'body1',
              },
              /*#__PURE__*/ _react['default'].createElement('strong', null, label),
            ),
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _core.Grid,
            {
              item: true,
              xs: 8,
              sm: fullWidth === true ? 9 : 3,
              md: fullWidth === true ? 10 : 4,
            },
            computedValue,
          ),
        );
      },
    },
  ]);

  return Field;
})(_react['default'].Component);

Field.propTypes = {
  fullWidth: _propTypes['default'].bool,
  stacked: _propTypes['default'].bool,
  label: _propTypes['default'].string,
  value: _propTypes['default'].oneOfType([
    _propTypes['default'].string,
    _propTypes['default'].number,
    _propTypes['default'].func,
  ]),
};
var _default = Field;
exports['default'] = _default;
