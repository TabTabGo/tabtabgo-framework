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

var _ViewColumn = _interopRequireDefault(require('@material-ui/icons/ViewColumn'));

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

var styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
    spacer: {},
    actions: {},
    title: {},
  };
};

var ColumnViewAction = /*#__PURE__*/ (function (_Component) {
  _inherits(ColumnViewAction, _Component);

  var _super = _createSuper(ColumnViewAction);

  function ColumnViewAction() {
    var _this;

    _classCallCheck(this, ColumnViewAction);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      anchorEl: null,
    };

    _this.handleChangeColumnDisplay = function (columnName) {
      return function (e) {
        //console.log("this.props.changeColumnProperties :", this.props.changeColumnProperties);
        if (_this.props.changeColumnProperties) {
          _this.props.changeColumnProperties(columnName, 'hide', !e.target.checked);
        }
      };
    };

    _this.handlePopoverOpen = function (event) {
      _this.setState({
        anchorEl: event.currentTarget,
      });
    };

    _this.handlePopoverClose = function () {
      _this.setState({
        anchorEl: null,
      });
    };

    return _this;
  }

  _createClass(ColumnViewAction, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
          columns = _this$props.columns,
          classes = _this$props.classes;
        var anchorEl = this.state.anchorEl;
        var open = Boolean(anchorEl);
        return [
          /*#__PURE__*/ _react['default'].createElement(
            _core.Tooltip,
            {
              title: 'View Columns',
              key: 0,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _core.IconButton,
              {
                onClick: this.handlePopoverOpen.bind(this),
                'aria-owns': open ? 'columnViewPopover' : undefined,
                'aria-haspopup': 'true',
              },
              /*#__PURE__*/ _react['default'].createElement(_ViewColumn['default'], null),
            ),
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _core.Popover,
            {
              id: 'columnViewPopover',
              key: 1,
              anchorEl: anchorEl,
              open: open,
              onClose: this.handlePopoverClose,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
            },
            /*#__PURE__*/ _react['default'].createElement(
              'div',
              {
                className: classes.root,
              },
              /*#__PURE__*/ _react['default'].createElement(
                _core.FormControl,
                {
                  component: 'fieldset',
                  className: classes.formControl,
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _core.FormLabel,
                  {
                    component: 'legend',
                  },
                  'Columns',
                ),
                /*#__PURE__*/ _react['default'].createElement(
                  _core.FormGroup,
                  null,
                  columns &&
                    columns.map(function (c, key) {
                      if (!c.isFixed) {
                        return /*#__PURE__*/ _react['default'].createElement(
                          _core.FormControlLabel,
                          {
                            key: key,
                            control: /*#__PURE__*/ _react['default'].createElement(_core.Checkbox, {
                              checked: !c.hide,
                              onChange: _this2.handleChangeColumnDisplay(c.name),
                              value: c.name,
                            }),
                            label: c.label,
                          },
                        );
                      }

                      return null;
                    }),
                ),
              ),
            ),
          ),
        ];
      },
    },
  ]);

  return ColumnViewAction;
})(_react.Component);

ColumnViewAction.propTypes = {
  classes: _propTypes['default'].object,
  columns: _propTypes['default'].array,
  changeColumnProperties: _propTypes['default'].func,
};

var _default = (0, _styles.withStyles)(styles)(ColumnViewAction);

exports['default'] = _default;
