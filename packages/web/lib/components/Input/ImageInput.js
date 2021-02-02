'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _core = require('@material-ui/core');

var _reactFileReaderInput = _interopRequireDefault(require('react-file-reader-input'));

var _RemoveCircle = _interopRequireDefault(require('@material-ui/icons/RemoveCircle'));

var _utilities = require('ttg-react/core/utilities');

var _reactImage = _interopRequireDefault(require('react-image'));

var _FileService = _interopRequireDefault(require('ttg-react/core/Services/FileService'));

var _imageInputStyle = _interopRequireDefault(require('./styles/imageInputStyle'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

var ImageWrapper = function ImageWrapper(props) {
  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    {
      style: _objectSpread(
        {
          position: 'relative',
          height: 120,
          width: 120,
        },
        props.style,
      ),
    },
    props.isLoading &&
      /*#__PURE__*/ _react['default'].createElement(_core.CircularProgress, {
        style: {
          position: 'absolute',
          marginTop: 4,
          right: 'calc(50% - 12px)',
          top: 'calc(50% - 20px)',
        },
        size: 28,
      }),
    props.children,
  );
};

ImageWrapper.propTypes = {
  isLoading: _propTypes['default'].bool,
  style: _propTypes['default'].object,
  children: _propTypes['default'].any,
};

var ImageInput = /*#__PURE__*/ (function (_React$Component) {
  _inherits(ImageInput, _React$Component);

  var _super = _createSuper(ImageInput);

  function ImageInput(props) {
    var _this;

    _classCallCheck(this, ImageInput);

    _this = _super.call(this, props);
    _this.state = {
      uploading: false,
      selectedImage: undefined,
      imageLoaded: false,
    };

    _this.handleFileChange = /*#__PURE__*/ (function () {
      var _ref = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(e, results) {
          var _this$props,
            onChange,
            fileProps,
            selectedFile,
            fileExtraProps,
            uploadedFile,
            newEvent;

          return regeneratorRuntime.wrap(
            function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    (_this$props = _this.props),
                      (onChange = _this$props.onChange),
                      (fileProps = _this$props.fileProps);
                    results.forEach(function (result) {
                      var _result = _slicedToArray(result, 2),
                        file = _result[1];

                      selectedFile = file;
                    });

                    _this.setState({
                      uploading: true,
                      selectedImage: URL.createObjectURL(selectedFile),
                    });

                    _context.prev = 3;
                    fileExtraProps = _objectSpread(
                      {
                        fileName: selectedFile.name,
                      },
                      selectedFile,
                    );

                    if (fileProps) {
                      fileExtraProps = Object.assign(fileExtraProps, fileProps);
                    }

                    _context.next = 8;
                    return _this.currentFileService.uploadFile(selectedFile, fileExtraProps);

                  case 8:
                    uploadedFile = _context.sent;
                    newEvent = {
                      target: {
                        value: uploadedFile,
                      },
                    };
                    onChange(newEvent);
                    _context.next = 17;
                    break;

                  case 13:
                    _context.prev = 13;
                    _context.t0 = _context['catch'](3);
                    // eslint-disable-next-line no-console
                    console.log('Failed to upload image error', _context.t0);

                    _this.setState({
                      error: true,
                      helperText:
                        'Failed to upload image. ' + _context.t0.status + ' ' + _context.t0.message,
                    });

                  case 17:
                    _context.prev = 17;

                    _this.setState({
                      uploading: false,
                    });

                    return _context.finish(17);

                  case 20:
                  case 'end':
                    return _context.stop();
                }
              }
            },
            _callee,
            null,
            [[3, 13, 17, 20]],
          );
        }),
      );

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })();

    _this.removeImage = function () {
      var newEvent = {
        target: {
          value: undefined,
        },
      };

      _this.props.onChange(newEvent);
    };

    _this.getImageUrl = function (fileId) {
      if (_this.state.selectedImage) return _this.state.selectedImage;
      return _this.currentFileService.getImageUrl('/'.concat(fileId));
    };

    _this.getHelperText = function () {
      if (_this.props.helperText || _this.state.helperText) {
        return /*#__PURE__*/ _react['default'].createElement(
          _core.FormHelperText,
          {
            error: _this.props.error || _this.state.error,
          },
          _this.props.helperText || _this.state.helperText,
        );
      }
    };

    _this.currentFileService = props.fileService || new _FileService['default']();
    return _this;
  }

  _createClass(ImageInput, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        // eslint-disable-next-line no-unused-vars
        var _this$props2 = this.props,
          classes = _this$props2.classes,
          value = _this$props2.value,
          alt = _this$props2.alt,
          style = _this$props2.style; //TODO get image url

        if (!(0, _utilities.isEmpty)(value)) {
          var src = '';

          if (typeof value === 'string' && (value.startsWith('/') || value.startsWith('http'))) {
            src = value.startsWith('http') ? value : this.currentFileService.getImageUrl(value);
          } else if (_typeof(value) === 'object' && value.fileId) {
            src = this.getImageUrl(value.fileId);
          } else src = this.getImageUrl(value);

          return /*#__PURE__*/ _react['default'].createElement(
            'div',
            {
              className: classes.imageContainer,
              style: style,
            },
            this.state.imageLoaded &&
              /*#__PURE__*/ _react['default'].createElement(
                _core.IconButton,
                {
                  className: classes.removeButton,
                  onClick: this.removeImage,
                },
                /*#__PURE__*/ _react['default'].createElement(_RemoveCircle['default'], null),
              ),
            /*#__PURE__*/ _react['default'].createElement(_reactImage['default'], {
              src: src,
              className: classes.image + (this.props.error ? ' ' + classes.errorImage : ''),
              alt: alt || '',
              loader: /*#__PURE__*/ _react['default'].createElement(ImageWrapper, {
                isLoading: true,
                style: {
                  background: '#eee',
                },
              }),
              onLoad: function onLoad() {
                return _this2.setState({
                  imageLoaded: true,
                });
              },
            }),
            this.getHelperText(),
          );
        }

        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          {
            style: style,
          },
          /*#__PURE__*/ _react['default'].createElement(
            'div',
            {
              className: classes.imageContainer,
            },
            /*#__PURE__*/ _react['default'].createElement(
              ImageWrapper,
              {
                isLoading: this.state.uploading,
              },
              /*#__PURE__*/ _react['default'].createElement(
                _reactFileReaderInput['default'],
                {
                  id: 'job-image-input',
                  accept: 'image/*',
                  multiple: false,
                  onChange: this.handleFileChange,
                  disabled: this.state.isBusy || this.state.uploading,
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _core.Button,
                  {
                    color: 'primary',
                    variant: 'outlined',
                    disabled: this.state.isBusy || this.state.uploading,
                    className:
                      classes.addButton + (this.props.error ? ' ' + classes.errorButton : ''),
                  },
                  this.props.buttonLabel,
                ),
              ),
            ),
          ),
          this.getHelperText(),
        );
      },
    },
  ]);

  return ImageInput;
})(_react['default'].Component);

ImageInput.propTypes = {
  style: _propTypes['default'].object,
  classes: _propTypes['default'].object.isRequired,
  onChange: _propTypes['default'].func,
  fileService: _propTypes['default'].object,
  fileProps: _propTypes['default'].object,
  value: _propTypes['default'].oneOfType([
    _propTypes['default'].string,
    _propTypes['default'].object,
    _propTypes['default'].number,
  ]),
  buttonLabel: _propTypes['default'].string,
  alt: _propTypes['default'].string,
  error: _propTypes['default'].bool,
  helperText: _propTypes['default'].oneOfType([
    _propTypes['default'].string,
    _propTypes['default'].node,
  ]),
};

var _default = (0, _core.withStyles)(_imageInputStyle['default'])(ImageInput);

exports['default'] = _default;
