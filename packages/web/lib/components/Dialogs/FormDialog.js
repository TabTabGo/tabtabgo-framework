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

var _styles = require('@material-ui/core/styles');

var _dialogStyle = _interopRequireDefault(require('./styles/dialogStyle'));

var _Form = _interopRequireDefault(require('ttg-react/web/components/Validations/Form'));

var _Button = _interopRequireDefault(require('ttg-react/web/components/Validations/Button'));

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

function Transition(props) {
  return /*#__PURE__*/ _react['default'].createElement(
    _core.Slide,
    _extends(
      {
        direction: 'up',
      },
      props,
    ),
  );
}

var FormDialog = /*#__PURE__*/ (function (_React$Component) {
  _inherits(FormDialog, _React$Component);

  var _super = _createSuper(FormDialog);

  function FormDialog() {
    var _this;

    _classCallCheck(this, FormDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      open: true,
    };

    _this.handleConfirm = function () {
      _this.props.onConfirm();
    };

    _this.handleCancel = function () {
      _this.props.onCancel();
    };

    return _this;
  }

  _createClass(FormDialog, [
    {
      key: 'getContentView',
      value: function getContentView() {
        var _this$props = this.props,
          isBusy = _this$props.isBusy,
          error = _this$props.error,
          classes = _this$props.classes;
        return /*#__PURE__*/ _react['default'].createElement(
          _react['default'].Fragment,
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _core.DialogTitle,
            {
              id: 'form-dialog-title',
            },
            this.props.title,
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _core.DialogContent,
            null,
            /*#__PURE__*/ _react['default'].createElement(
              _core.DialogContentText,
              null,
              this.props.contentText,
            ),
            this.props.children,
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _core.DialogActions,
            null,
            !isBusy &&
              error &&
              /*#__PURE__*/ _react['default'].createElement(
                'div',
                {
                  className: classes.errorContainer,
                },
                error,
              ),
            /*#__PURE__*/ _react['default'].createElement(
              _core.Button,
              {
                onClick: this.handleCancel,
                color: 'primary',
                disabled: isBusy,
              },
              'Cancel',
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _Button['default'],
              {
                onClick: this.handleConfirm,
                color: 'primary',
                isBusy: isBusy,
              },
              this.props.confirmLabel ? this.props.confirmLabel : 'Add',
            ),
          ),
        );
      },
    },
    {
      key: 'render',
      value: function render() {
        var open = this.props.open;
        var dialogProps = {
          TransitionComponent: Transition,
          keepMounted: false,
          open: open,
          onClose: this.handleCancel,
          disableBackdropClick: true,
          disableEscapeKeyDown: true,
          'aria-labelledby': 'form-dialog-title',
        };
        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _Form['default'],
            {
              onSubmit: this.handleConfirm,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _core.Hidden,
              {
                smDown: true,
              },
              /*#__PURE__*/ _react['default'].createElement(
                _core.Dialog,
                _extends(
                  {
                    fullWidth: true,
                    maxWidth: 'md',
                  },
                  dialogProps,
                ),
                this.getContentView(),
              ),
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _core.Hidden,
              {
                mdUp: true,
              },
              /*#__PURE__*/ _react['default'].createElement(
                _core.Dialog,
                _extends(
                  {
                    fullScreen: true,
                  },
                  dialogProps,
                ),
                this.getContentView(),
              ),
            ),
          ),
        );
      },
    },
  ]);

  return FormDialog;
})(_react['default'].Component);

FormDialog.propTypes = {
  open: _propTypes['default'].bool.isRequired,
  title: _propTypes['default'].string.isRequired,
  isBusy: _propTypes['default'].bool,
  error: _propTypes['default'].string,
  children: _propTypes['default'].node,
  onConfirm: _propTypes['default'].func.isRequired,
  onCancel: _propTypes['default'].func.isRequired,
  confirmLabel: _propTypes['default'].string,
  contentText: _propTypes['default'].string,
  classes: _propTypes['default'].any,
};

var _default = (0, _styles.withStyles)(_dialogStyle['default'])(FormDialog);

exports['default'] = _default;
