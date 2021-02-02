'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _styles = require('@material-ui/core/styles');

var _core = require('@material-ui/core');

var _CloudDownload = _interopRequireDefault(require('@material-ui/icons/CloudDownload'));

var _Input = _interopRequireDefault(require('ttg-react/web/components/Validations/Input.jsx'));

var _FileService = _interopRequireDefault(require('ttg-react/core/Services/FileService'));

var _fileUploadInputStyleutStyle = _interopRequireDefault(
  require('./styles/fileUploadInputStyleutStyle'),
);

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

var FileUploadInput = /*#__PURE__*/ (function (_React$Component) {
  _inherits(FileUploadInput, _React$Component);

  var _super = _createSuper(FileUploadInput);

  function FileUploadInput(props) {
    var _this;

    _classCallCheck(this, FileUploadInput);

    _this = _super.call(this, props);
    _this.state = {
      uploading: false,
      downloading: false,
    };

    _this.handleChangeFile = /*#__PURE__*/ (function () {
      var _ref = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(e) {
          var _this$props, onChange, fileProps, file, fileExtraProps, uploadedFile, newEvent;

          return regeneratorRuntime.wrap(
            function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    (_this$props = _this.props),
                      (onChange = _this$props.onChange),
                      (fileProps = _this$props.fileProps);
                    file = e.target.files[0];

                    if (!file) {
                      _context.next = 23;
                      break;
                    }

                    //TODO handle auto upload
                    _this.setState({
                      uploading: true,
                    });

                    _context.prev = 4;
                    fileExtraProps = _objectSpread(
                      {
                        fileName: file.name,
                      },
                      file,
                    );

                    if (fileProps) {
                      fileExtraProps = Object.assign(fileExtraProps, fileProps);
                    }

                    _context.next = 9;
                    return _this.currentFileService.uploadFile(file, fileExtraProps);

                  case 9:
                    uploadedFile = _context.sent;
                    newEvent = {
                      target: {
                        value: uploadedFile,
                      },
                    };
                    onChange(newEvent);
                    _context.next = 18;
                    break;

                  case 14:
                    _context.prev = 14;
                    _context.t0 = _context['catch'](4);
                    console.log('Failed to upload file error', _context.t0);
                    _this.fileInput.value = '';

                  case 18:
                    _context.prev = 18;

                    _this.setState({
                      uploading: false,
                    });

                    return _context.finish(18);

                  case 21:
                    _context.next = 24;
                    break;

                  case 23:
                    // eslint-disable-next-line no-console
                    console.log('No file Selected');

                  case 24:
                  case 'end':
                    return _context.stop();
                }
              }
            },
            _callee,
            null,
            [[4, 14, 18, 21]],
          );
        }),
      );

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    })();

    _this.handleDownloadFile = function (file) {
      var fileId = null;

      if (_typeof(file) === 'object' && file.fileId) {
        fileId = file.fileId;
      } else {
        fileId = file;
      }

      if (fileId) {
        //TODO download file
      } else {
        // eslint-disable-next-line no-console
        console.log('error download file. FileId is empty');
      }
    };

    _this.currentFileService = props.fileService || new _FileService['default']();
    return _this;
  }

  _createClass(FileUploadInput, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        // eslint-disable-next-line no-unused-vars
        var _this$props2 = this.props,
          classes = _this$props2.classes,
          InputProps = _this$props2.InputProps,
          value = _this$props2.value,
          fileService = _this$props2.fileService,
          autoUpload = _this$props2.autoUpload,
          fileProps = _this$props2.fileProps,
          rest = _objectWithoutProperties(_this$props2, [
            'classes',
            'InputProps',
            'value',
            'fileService',
            'autoUpload',
            'fileProps',
          ]);

        return /*#__PURE__*/ _react['default'].createElement(
          _Input['default'],
          _extends({}, rest, {
            onChange: this.handleChangeFile.bind(this),
            type: 'file',
            inputRef: function inputRef(ref) {
              return (_this2.fileInput = ref);
            },
            InputProps: _objectSpread(
              _objectSpread({}, InputProps),
              {},
              {
                autoComplete: 'off',
                classes: {
                  input: classes.inputWithEndAdornment,
                },
                endAdornment: /*#__PURE__*/ _react['default'].createElement(
                  _core.InputAdornment,
                  {
                    position: 'end',
                  },
                  this.state.uploading
                    ? /*#__PURE__*/ _react['default'].createElement(_core.CircularProgress, null)
                    : null,
                  /*#__PURE__*/ _react['default'].createElement(
                    _core.IconButton,
                    {
                      'aria-label': 'Download file',
                      onClick: this.handleDownloadFile.bind(this, value),
                      className: classes.inputAdornmentIconButton,
                    },
                    this.state.downloading
                      ? /*#__PURE__*/ _react['default'].createElement(_core.CircularProgress, {
                          className: classes.inputAdornmentIcon,
                        })
                      : /*#__PURE__*/ _react['default'].createElement(_CloudDownload['default'], {
                          className: classes.inputAdornmentIcon,
                        }),
                  ),
                ),
              },
            ),
          }),
        );
      },
    },
  ]);

  return FileUploadInput;
})(_react['default'].Component);

FileUploadInput.propTypes = {
  classes: _propTypes['default'].object.isRequired,
  fileService: _propTypes['default'].object,
  fileProps: _propTypes['default'].object,
  InputProps: _propTypes['default'].object,
  onChange: _propTypes['default'].func,
};

var _default = (0, _styles.withStyles)(_fileUploadInputStyleutStyle['default'])(FileUploadInput);

exports['default'] = _default;
