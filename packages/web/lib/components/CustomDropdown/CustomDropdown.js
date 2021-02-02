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

var _classnames = _interopRequireDefault(require('classnames'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _styles = require('@material-ui/core/styles');

var _core = require('@material-ui/core');

var _Button = _interopRequireDefault(require('components/CustomButtons/Button.jsx'));

var _customDropdownStyle = _interopRequireDefault(require('./customDropdownStyle.jsx'));

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

var CustomDropdown = /*#__PURE__*/ (function (_React$Component) {
  _inherits(CustomDropdown, _React$Component);

  var _super = _createSuper(CustomDropdown);

  function CustomDropdown(props) {
    var _this;

    _classCallCheck(this, CustomDropdown);

    _this = _super.call(this, props);

    _this.handleClick = function () {
      _this.setState(function (state) {
        return {
          open: !state.open,
        };
      });
    };

    _this.handleClose = function (event) {
      if (_this.anchorEl.contains(event.target)) {
        return;
      }

      _this.setState({
        open: false,
      });
    };

    _this.state = {
      open: false,
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_this));
    _this.handleCloseMenu = _this.handleCloseMenu.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CustomDropdown, [
    {
      key: 'handleCloseMenu',
      value: function handleCloseMenu(param) {
        this.setState({
          open: false,
        });

        if (this.props && this.props.onClick) {
          this.props.onClick(param);
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _classNames,
          _classNames2,
          _this2 = this,
          _classNames3;

        var open = this.state.open;
        var _this$props = this.props,
          classes = _this$props.classes,
          renderButton = _this$props.renderButton,
          buttonText = _this$props.buttonText,
          buttonIcon = _this$props.buttonIcon,
          buttonProps = _this$props.buttonProps,
          dropdownList = _this$props.dropdownList,
          dropup = _this$props.dropup,
          dropdownHeader = _this$props.dropdownHeader,
          caret = _this$props.caret,
          hoverColor = _this$props.hoverColor,
          dropPlacement = _this$props.dropPlacement,
          noLiPadding = _this$props.noLiPadding,
          innerDropDown = _this$props.innerDropDown,
          navDropdown = _this$props.navDropdown;
        var caretClasses = (0, _classnames['default'])(
          ((_classNames = {}),
          _defineProperty(_classNames, classes.caret, true),
          _defineProperty(_classNames, classes.caretDropup, dropup && !open),
          _defineProperty(_classNames, classes.caretActive, open && !dropup),
          _classNames),
        );
        var dropdownItem = (0, _classnames['default'])(
          ((_classNames2 = {}),
          _defineProperty(_classNames2, classes.dropdownItem, true),
          _defineProperty(_classNames2, classes[hoverColor + 'Hover'], true),
          _defineProperty(_classNames2, classes.noLiPadding, noLiPadding),
          _classNames2),
        );

        var dropDownMenu = /*#__PURE__*/ _react['default'].createElement(
          _core.MenuList,
          {
            role: 'menu',
            className: classes.menuList,
          },
          dropdownHeader !== undefined
            ? /*#__PURE__*/ _react['default'].createElement(
                _core.MenuItem,
                {
                  onClick: function onClick() {
                    return _this2.handleCloseMenu(dropdownHeader);
                  },
                  className: classes.dropdownHeader,
                },
                dropdownHeader,
              )
            : null,
          dropdownList.map(function (prop, key) {
            if (prop.divider) {
              return /*#__PURE__*/ _react['default'].createElement(_core.Divider, {
                key: key,
                onClick: function onClick() {
                  return _this2.handleCloseMenu('divider');
                },
                className: classes.dropdownDividerItem,
              });
            } else if (prop.ref === 'multi') {
              return /*#__PURE__*/ _react['default'].createElement(
                _core.MenuItem,
                {
                  key: key,
                  className: dropdownItem,
                  style: {
                    overflow: 'visible',
                    padding: 0,
                  },
                },
                prop.name,
              );
            }

            return /*#__PURE__*/ _react['default'].createElement(
              _core.MenuItem,
              {
                key: key,
                onClick: function onClick() {
                  return _this2.handleCloseMenu(prop);
                },
                className: dropdownItem,
              },
              prop.name,
            );
          }),
        );

        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          {
            className: innerDropDown ? classes.innerManager : classes.manager,
          },
          renderButton
            ? /*#__PURE__*/ _react['default'].createElement(
                'div',
                {
                  'aria-owns': open ? 'menu-list' : null,
                  'aria-haspopup': 'true',
                  onClick: this.handleClick,
                  style: {
                    display: 'table',
                  },
                  ref: function ref(node) {
                    _this2.anchorEl = node;
                  },
                },
                renderButton(),
              )
            : /*#__PURE__*/ _react['default'].createElement(
                'div',
                {
                  className: buttonText !== undefined ? '' : classes.target,
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _Button['default'],
                  _extends(
                    {
                      'aria-label': 'Notifications',
                      'aria-owns': open ? 'menu-list' : null,
                      'aria-haspopup': 'true',
                      buttonRef: function buttonRef(node) {
                        _this2.anchorEl = node;
                      },
                    },
                    buttonProps,
                    {
                      onClick: this.handleClick,
                    },
                  ),
                  buttonIcon !== undefined
                    ? /*#__PURE__*/ _react['default'].createElement(this.props.buttonIcon, {
                        className: classes.buttonIcon,
                      })
                    : null,
                  buttonText !== undefined ? buttonText : null,
                  caret
                    ? /*#__PURE__*/ _react['default'].createElement('b', {
                        className: caretClasses,
                      })
                    : null,
                ),
              ),
          /*#__PURE__*/ _react['default'].createElement(
            _core.Popper,
            {
              open: open,
              anchorEl: this.anchorEl,
              transition: true,
              disablePortal: true,
              placement: dropPlacement,
              className: (0, _classnames['default'])(
                ((_classNames3 = {}),
                _defineProperty(_classNames3, classes.popperClose, !open),
                _defineProperty(_classNames3, classes.pooperResponsive, true),
                _defineProperty(_classNames3, classes.pooperNav, open && navDropdown),
                _classNames3),
              ),
            },
            function () {
              return /*#__PURE__*/ _react['default'].createElement(
                _core.Grow,
                {
                  in: open,
                  id: 'menu-list',
                  style: dropup
                    ? {
                        transformOrigin: '0 100% 0',
                      }
                    : {
                        transformOrigin: '0 0 0',
                      },
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _core.Paper,
                  {
                    className: classes.dropdown,
                  },
                  innerDropDown
                    ? dropDownMenu
                    : /*#__PURE__*/ _react['default'].createElement(
                        _core.ClickAwayListener,
                        {
                          onClickAway: _this2.handleClose,
                          ref: function ref(_ref) {
                            return (_this2.cacat = _ref);
                          },
                        },
                        dropDownMenu,
                      ),
                ),
              );
            },
          ),
        );
      },
    },
  ]);

  return CustomDropdown;
})(_react['default'].Component);

CustomDropdown.defaultProps = {
  caret: true,
  dropup: false,
  hoverColor: 'primary',
};
CustomDropdown.propTypes = {
  classes: _propTypes['default'].object.isRequired,
  hoverColor: _propTypes['default'].oneOf([
    'dark',
    'primary',
    'info',
    'success',
    'warning',
    'error',
    'rose',
  ]),
  buttonText: _propTypes['default'].node,
  buttonIcon: _propTypes['default'].func,
  dropdownList: _propTypes['default'].array,
  buttonProps: _propTypes['default'].object,
  dropup: _propTypes['default'].bool,
  dropdownHeader: _propTypes['default'].node,
  caret: _propTypes['default'].bool,
  dropPlacement: _propTypes['default'].oneOf([
    'bottom',
    'top',
    'right',
    'left',
    'bottom-start',
    'bottom-end',
    'top-start',
    'top-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
  ]),
  noLiPadding: _propTypes['default'].bool,
  innerDropDown: _propTypes['default'].bool,
  navDropdown: _propTypes['default'].bool,
  // This is a function that returns the clicked menu item
  onClick: _propTypes['default'].func,
};

var _default = (0, _styles.withStyles)(_customDropdownStyle['default'])(CustomDropdown);

exports['default'] = _default;
