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
exports['default'] = exports.SwipeableTabsContainer = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _styles = require('@material-ui/core/styles');

var _core = require('@material-ui/core');

var _reactSwipeableViews = _interopRequireDefault(require('react-swipeable-views'));

var _tabsStyle = _interopRequireDefault(require('./tabsStyle'));

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

var SwipeableTabsContainer = /*#__PURE__*/ (function (_React$Component) {
  _inherits(SwipeableTabsContainer, _React$Component);

  var _super = _createSuper(SwipeableTabsContainer);

  function SwipeableTabsContainer() {
    var _this;

    _classCallCheck(this, SwipeableTabsContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      activeTab: 0,
    };

    _this.handleTabChange = function (event, activeTab) {
      _this.setState({
        activeTab: activeTab,
      });
    };

    _this.handleTabIndexChange = function (index) {
      _this.setState({
        activeTab: index,
      });
    };

    return _this;
  }

  _createClass(SwipeableTabsContainer, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          tabs = _this$props.tabs,
          classes = _this$props.classes,
          theme = _this$props.theme,
          swipeable = _this$props.swipeable;
        var activeTab = this.state.activeTab;
        return /*#__PURE__*/ _react['default'].createElement(
          _core.Paper,
          {
            className: classes.root,
            elevation: 0,
          },
          /*#__PURE__*/ _react['default'].createElement(
            _core.Tabs,
            {
              value: this.state.activeTab,
              onChange: this.handleTabChange,
              indicatorColor: 'primary',
              textColor: 'primary',
            },
            tabs.map(function (tab) {
              return /*#__PURE__*/ _react['default'].createElement(_core.Tab, {
                key: tab.key,
                label: tab.label,
                classes: {
                  selected: classes.selectedTab,
                },
              });
            }),
          ),
          /*#__PURE__*/ _react['default'].createElement(
            'div',
            {
              style: {
                backgroundColor: 'white',
                padding: theme.spacing(2),
              },
            },
            swipeable
              ? /*#__PURE__*/ _react['default'].createElement(
                  _reactSwipeableViews['default'],
                  {
                    className: classes.container,
                    axis: theme.direction === 'rtl' ? 'x-reverse' : 'x',
                    index: this.state.activeTab,
                    onChangeIndex: this.handleTabIndexChange,
                  },
                  tabs.map(function (tab) {
                    return /*#__PURE__*/ _react['default'].createElement(
                      'div',
                      {
                        key: tab.key,
                        dir: theme.direction,
                      },
                      tab.component,
                    );
                  }),
                )
              : /*#__PURE__*/ _react['default'].createElement(
                  'div',
                  {
                    className: classes.container,
                  },
                  tabs[activeTab].component,
                ),
          ),
        );
      },
    },
  ]);

  return SwipeableTabsContainer;
})(_react['default'].Component);

exports.SwipeableTabsContainer = SwipeableTabsContainer;
SwipeableTabsContainer.propTypes = {
  tabs: _propTypes['default'].arrayOf(
    _propTypes['default'].shape({
      label: _propTypes['default'].string,
      key: _propTypes['default'].string,
      component: _propTypes['default'].node,
    }),
  ).isRequired,
  swipeable: _propTypes['default'].bool,
  theme: _propTypes['default'].object,
  classes: _propTypes['default'].object,
};
SwipeableTabsContainer.defaultProps = {
  swipeable: false,
};

var _default = (0, _styles.withStyles)(_tabsStyle['default'], {
  withTheme: true,
})(TabsContainer);

exports['default'] = _default;
