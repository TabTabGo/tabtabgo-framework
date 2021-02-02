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

var style = function style(theme) {
  return {
    root: {
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(1.5),
    },
    selectedFilter: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      borderRadius: theme.shape.borderRadius,
    },
  };
};

var FilterButtonGroup = /*#__PURE__*/ (function (_React$Component) {
  _inherits(FilterButtonGroup, _React$Component);

  var _super = _createSuper(FilterButtonGroup);

  function FilterButtonGroup() {
    _classCallCheck(this, FilterButtonGroup);

    return _super.apply(this, arguments);
  }

  _createClass(FilterButtonGroup, [
    {
      key: 'handleChange',
      value: function handleChange(event, value) {
        if (this.props.onChange) {
          this.props.onChange(event, value);
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          value = _this$props.value,
          filters = _this$props.filters,
          classes = _this$props.classes,
          disabled = _this$props.disabled;
        return /*#__PURE__*/ _react['default'].createElement(
          _core.BottomNavigation,
          {
            value: value,
            onChange: this.handleChange.bind(this),
            showLabels: true,
            className: classes.root,
          },
          filters &&
            filters.map(function (filter) {
              return /*#__PURE__*/ _react['default'].createElement(_core.BottomNavigationAction, {
                disabled: disabled,
                key: filter.value,
                label: filter.label,
                value: filter.value,
                classes: {
                  selected: classes.selectedFilter,
                },
              });
            }),
        );
      },
    },
  ]);

  return FilterButtonGroup;
})(_react['default'].Component);

FilterButtonGroup.propTypes = {
  classes: _propTypes['default'].object.isRequired,
  value: _propTypes['default'].string.isRequired,
  filters: _propTypes['default'].arrayOf(
    _propTypes['default'].shape({
      label: _propTypes['default'].string,
      value: _propTypes['default'].string,
    }),
  ).isRequired,
  onChange: _propTypes['default'].func.isRequired,
  disabled: _propTypes['default'].bool,
};

var _default = (0, _styles.withTheme)((0, _styles.withStyles)(style)(FilterButtonGroup));

exports['default'] = _default;
