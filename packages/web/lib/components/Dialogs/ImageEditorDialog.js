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

var _reactFileReaderInput = _interopRequireDefault(require('react-file-reader-input'));

var _styles = require('@material-ui/core/styles');

var _core = require('@material-ui/core');

var _ZoomIn = _interopRequireDefault(require('@material-ui/icons/ZoomIn'));

var _ZoomOut = _interopRequireDefault(require('@material-ui/icons/ZoomOut'));

var _RotateRight = _interopRequireDefault(require('@material-ui/icons/RotateRight'));

var _RotateLeft = _interopRequireDefault(require('@material-ui/icons/RotateLeft'));

var _reactAvatarEditor = _interopRequireDefault(require('react-avatar-editor'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

var imageEditorDialogStyle = function imageEditorDialogStyle() {};

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

var ImageEditorDialog = /*#__PURE__*/ (function (_React$Component) {
  _inherits(ImageEditorDialog, _React$Component);

  var _super = _createSuper(ImageEditorDialog);

  function ImageEditorDialog() {
    var _this;

    _classCallCheck(this, ImageEditorDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.initialState = {
      isBusy: false,
      scale: 1.0,
      rotationDegree: 0,
      newImage: undefined,
    };
    _this.state = _objectSpread({}, _this.initialState);

    _this.handleFileChange = function (e, results) {
      var selectedFile;
      results.forEach(function (result) {
        var _result = _slicedToArray(result, 2),
          file = _result[1];

        selectedFile = file;
      });

      _this.setState({
        newImage: selectedFile,
      });
    };

    _this.handleCancel = function () {
      _this.props.onCancel();

      _this.setState(_objectSpread({}, _this.initialState));
    };

    _this.handleConfirm = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                if (_this.editor) {
                  _this.setState({
                    isBusy: true,
                  });

                  _this.editor.getImage().toBlob(
                    /*#__PURE__*/ (function () {
                      var _ref2 = _asyncToGenerator(
                        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(image) {
                          var avatarFile;
                          return regeneratorRuntime.wrap(
                            function _callee$(_context) {
                              while (1) {
                                switch ((_context.prev = _context.next)) {
                                  case 0:
                                    _context.prev = 0;
                                    avatarFile = _this.state.newImage
                                      ? _this.state.newImage
                                      : _this.props.imageSource;
                                    _context.next = 4;
                                    return _this.props.uploadImage(image, {
                                      fileName: avatarFile.name,
                                      extension: avatarFile.name
                                        ? avatarFile.name.split('.').pop()
                                        : '.jpeg',
                                      originalMediaType: avatarFile.type,
                                      OriginalFileName: avatarFile.name,
                                    });

                                  case 4:
                                    _this.setState(
                                      {
                                        isBusy: false,
                                      },
                                      function () {
                                        return _this.props.onConfirm();
                                      },
                                    );

                                    _context.next = 11;
                                    break;

                                  case 7:
                                    _context.prev = 7;
                                    _context.t0 = _context['catch'](0);
                                    // eslint-disable-next-line no-console
                                    console.log('error', _context.t0);

                                    _this.setState({
                                      isBusy: false,
                                    });

                                  case 11:
                                  case 'end':
                                    return _context.stop();
                                }
                              }
                            },
                            _callee,
                            null,
                            [[0, 7]],
                          );
                        }),
                      );

                      return function (_x) {
                        return _ref2.apply(this, arguments);
                      };
                    })(),
                  );
                }

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2);
      }),
    );
    return _this;
  }

  _createClass(ImageEditorDialog, [
    {
      key: 'zoomIn',
      value: function zoomIn() {
        var newScale = this.state.scale + 0.1;
        newScale = newScale > 2.0 ? 2.0 : newScale;
        this.setState({
          scale: newScale,
        });
      },
    },
    {
      key: 'zoomOut',
      value: function zoomOut() {
        var newScale = this.state.scale - 0.1;
        newScale = newScale < 0.5 ? 0.5 : newScale;
        this.setState({
          scale: newScale,
        });
      },
    },
    {
      key: 'rotateRight',
      value: function rotateRight() {
        var newRotation = this.state.rotationDegree + 90;
        newRotation = newRotation === 360 ? 0 : newRotation;
        this.setState({
          rotationDegree: newRotation,
        });
      },
    },
    {
      key: 'rotateLeft',
      value: function rotateLeft() {
        var newRotation = this.state.rotationDegree - 90;
        newRotation = newRotation === -360 ? 0 : newRotation;
        this.setState({
          rotationDegree: newRotation,
        });
      },
    },
    {
      key: 'getContentView',
      value: function getContentView() {
        var _this2 = this;

        var _this$props = this.props,
          cancelLabel = _this$props.cancelLabel,
          confirmLabel = _this$props.confirmLabel,
          title = _this$props.title;
        return /*#__PURE__*/ _react['default'].createElement(
          _react['default'].Fragment,
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _core.DialogTitle,
            {
              id: 'confirm-dialog-title',
            },
            title,
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _core.Grid,
            {
              container: true,
              justify: 'center',
              style: {
                background: 'black',
                flex: 1,
                flexDirection: 'column',
              },
            },
            /*#__PURE__*/ _react['default'].createElement(
              'div',
              {
                style: {
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
              /*#__PURE__*/ _react['default'].createElement(_reactAvatarEditor['default'], {
                ref: function ref(editor) {
                  return (_this2.editor = editor);
                },
                image: this.state.newImage ? this.state.newImage : this.props.imageSource,
                width: 256,
                height: 256,
                borderRadius: 128,
                scale: this.state.scale,
                color: [0, 0, 0, 0.75],
                rotate: this.state.rotationDegree,
                style: {
                  background: 'black',
                },
                disabled: this.state.isBusy,
                crossOrigin: 'anonymous',
              }),
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _core.Grid,
              {
                item: true,
                xs: 12,
                style: {
                  background: '#232323',
                  flex: 0,
                },
              },
              /*#__PURE__*/ _react['default'].createElement(
                _core.Grid,
                {
                  container: true,
                  justify: 'center',
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _core.IconButton,
                  {
                    onClick: function onClick() {
                      return _this2.zoomOut();
                    },
                    disabled: this.state.isBusy,
                    style: {
                      color: 'white',
                      margin: 8,
                    },
                  },
                  /*#__PURE__*/ _react['default'].createElement(_ZoomOut['default'], {
                    fontSize: 'large',
                  }),
                ),
                /*#__PURE__*/ _react['default'].createElement(
                  _core.IconButton,
                  {
                    onClick: function onClick() {
                      return _this2.zoomIn();
                    },
                    disabled: this.state.isBusy,
                    style: {
                      color: 'white',
                      margin: 8,
                    },
                  },
                  /*#__PURE__*/ _react['default'].createElement(_ZoomIn['default'], {
                    fontSize: 'large',
                  }),
                ),
                /*#__PURE__*/ _react['default'].createElement(
                  _core.IconButton,
                  {
                    onClick: function onClick() {
                      return _this2.rotateRight();
                    },
                    disabled: this.state.isBusy,
                    style: {
                      color: 'white',
                      margin: 8,
                    },
                  },
                  /*#__PURE__*/ _react['default'].createElement(_RotateRight['default'], {
                    fontSize: 'large',
                  }),
                ),
                /*#__PURE__*/ _react['default'].createElement(
                  _core.IconButton,
                  {
                    onClick: function onClick() {
                      return _this2.rotateLeft();
                    },
                    disabled: this.state.isBusy,
                    style: {
                      color: 'white',
                      margin: 8,
                    },
                  },
                  /*#__PURE__*/ _react['default'].createElement(_RotateLeft['default'], {
                    fontSize: 'large',
                  }),
                ),
              ),
            ),
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _core.DialogActions,
            null,
            /*#__PURE__*/ _react['default'].createElement(
              _core.Button,
              {
                onClick: this.handleCancel,
                color: 'primary',
                disabled: this.state.isBusy,
              },
              cancelLabel ? cancelLabel : 'Cancel',
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _reactFileReaderInput['default'],
              {
                id: 'profile-image-input',
                accept: 'image/*',
                multiple: false,
                onChange: this.handleFileChange,
              },
              /*#__PURE__*/ _react['default'].createElement(
                _core.Button,
                {
                  color: 'primary',
                  disabled: this.state.isBusy,
                },
                'Change Photo',
              ),
            ),
            /*#__PURE__*/ _react['default'].createElement(
              'div',
              {
                style: {
                  position: 'relative',
                },
              },
              this.state.isBusy &&
                /*#__PURE__*/ _react['default'].createElement(_core.CircularProgress, {
                  style: {
                    position: 'absolute',
                    marginTop: 4,
                    right: 'calc(50% - 12px)',
                  },
                  size: 28,
                }),
              /*#__PURE__*/ _react['default'].createElement(
                _core.Button,
                {
                  onClick: this.handleConfirm,
                  color: 'primary',
                  variant: 'outlined',
                  disabled: this.state.isBusy,
                },
                confirmLabel ? confirmLabel : 'Save Photo',
              ),
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
          'aria-labelledby': 'confirm-dialog-title',
        };
        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          null,
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
        );
      },
    },
  ]);

  return ImageEditorDialog;
})(_react['default'].Component);

ImageEditorDialog.propTypes = {
  open: _propTypes['default'].bool.isRequired,
  title: _propTypes['default'].string.isRequired,
  message: _propTypes['default'].string,
  imageSource: _propTypes['default'].oneOfType([
    _propTypes['default'].string,
    _propTypes['default'].instanceOf(File),
  ]),
  uploadImage: _propTypes['default'].func.isRequired,
  onConfirm: _propTypes['default'].func.isRequired,
  onCancel: _propTypes['default'].func.isRequired,
  confirmLabel: _propTypes['default'].string,
  cancelLabel: _propTypes['default'].string,
};

var _default = (0, _styles.withStyles)(imageEditorDialogStyle)(ImageEditorDialog);

exports['default'] = _default;
