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

var _ExpandMore = _interopRequireDefault(require('@material-ui/icons/ExpandMore'));

var _panelGroupStyle = _interopRequireDefault(require('./panelGroupStyle'));

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

var PanelGroup = /*#__PURE__*/ (function (_React$Component) {
  _inherits(PanelGroup, _React$Component);

  var _super = _createSuper(PanelGroup);

  function PanelGroup() {
    var _this;

    _classCallCheck(this, PanelGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      activePanel: undefined,
    };

    _this.handlePanelChange = function (activePanel) {
      _this.setState({
        activePanel: activePanel,
      });
    };

    return _this;
  }

  _createClass(PanelGroup, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
          panels = _this$props.panels,
          accordion = _this$props.accordion,
          classes = _this$props.classes;
        var activePanel = this.state.activePanel;
        return /*#__PURE__*/ _react['default'].createElement(
          _core.Paper,
          {
            className: classes.root,
            elevation: 0,
          },
          panels.map(function (panel) {
            var accordionProps =
              accordion === true
                ? {
                    expanded: activePanel === panel.key,
                    handlePanelChange: function handlePanelChange() {
                      return _this2.handlePanelChange(panel.key);
                    },
                  }
                : {};
            return /*#__PURE__*/ _react['default'].createElement(
              _core.ExpansionPanel,
              _extends(
                {
                  key: panel.key,
                },
                accordionProps,
                {
                  classes: {
                    root: classes.panel,
                    expanded: classes.expanded,
                  },
                },
              ),
              /*#__PURE__*/ _react['default'].createElement(
                _core.ExpansionPanelSummary,
                {
                  expandIcon: /*#__PURE__*/ _react['default'].createElement(
                    _ExpandMore['default'],
                    null,
                  ),
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _core.Typography,
                  {
                    variant: 'button',
                    color: 'primary',
                    className: classes.heading,
                  },
                  panel.label,
                ),
                panel.secondaryLabel &&
                  /*#__PURE__*/ _react['default'].createElement(
                    _core.Typography,
                    {
                      className: classes.secondaryHeading,
                    },
                    panel.secondaryLabel,
                  ),
              ),
              /*#__PURE__*/ _react['default'].createElement(
                _core.ExpansionPanelDetails,
                null,
                panel.component,
              ),
            );
          }),
        );
      },
    },
  ]);

  return PanelGroup;
})(_react['default'].Component);

PanelGroup.propTypes = {
  panels: _propTypes['default'].arrayOf(
    _propTypes['default'].shape({
      label: _propTypes['default'].string,
      secondarylabel: _propTypes['default'].string,
      key: _propTypes['default'].string,
      component: _propTypes['default'].node,
    }),
  ).isRequired,
  accordion: _propTypes['default'].bool,
  theme: _propTypes['default'].object,
  classes: _propTypes['default'].object,
};

var _default = (0, _styles.withStyles)(_panelGroupStyle['default'], {
  withTheme: true,
})(PanelGroup);

exports['default'] = _default;
