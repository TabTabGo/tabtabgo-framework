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

var _moment = _interopRequireDefault(require('moment'));

var _reactCropper = _interopRequireDefault(require('react-cropper'));

var _reactLoaders = require('react-loaders');

var _reactFontawesome = _interopRequireDefault(require('@fortawesome/react-fontawesome'));

var _fontawesomeFreeSolid = require('@fortawesome/fontawesome-free-solid');

var _reactBootstrap = require('react-bootstrap');

require('cropperjs/dist/cropper.css');

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

var ImageUploader = /*#__PURE__*/ (function (_React$Component) {
  _inherits(ImageUploader, _React$Component);

  var _super = _createSuper(ImageUploader);

  function ImageUploader(props) {
    var _this;

    _classCallCheck(this, ImageUploader);

    _this = _super.call(this, props);

    _this.handleChangeFile = function (e) {
      var files = e.target.files,
        file;

      if (!_this.cropper.getData()) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          var blobURL = URL.createObjectURL(file);

          _this.cropper.reset().replace(blobURL);

          _this.fileName = file.name;
          _this.inputImage.value = '';
        } else {
          alert('الرجاء اختيار صورة.');
        }
      }
    };

    _this.handleCrop = function (data) {
      _this.setState({
        cropData: _this.cropper.getCroppedCanvas(_this.props.saveImageOptions).toDataURL(),
      }); // this.cropper
      // console.log(self.cropperElement.cropper('getCroppedCanvas').toDataURL()); //
      // base64 console.log('Data X: ' + (Math.round(data.x))); console.log('Data Y:
      // ' + (Math.round(data.y))); console.log('Data Height: ' +
      // (Math.round(data.height))); console.log('Data Width: ' +
      // (Math.round(data.width))); console.log('Data Rotate: ' +
      // (Math.round(data.rotate)));
    };

    _this.state = {
      showImageCropper: false,
      cropData: null,
    };
    return _this;
  }

  _createClass(ImageUploader, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {},
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {},
    },
    {
      key: 'confirm',
      value: function confirm() {
        if (this.cropper) {
          if (this.props.updateImage) {
            this.props.updateImage(
              this.cropper.getCroppedCanvas(this.props.saveImageOptions),
              this.fileName,
            );
          }

          if (this.previewImage) {
            this.previewImage.src = this.cropper
              .getCroppedCanvas(this.props.saveImageOptions)
              .toDataURL();
          }

          if (this.props.enableDownload) {
            this.refs.btnDownload.href = this.cropper
              .getCroppedCanvas(this.props.saveImageOptions)
              .toDataURL();
            this.refs.btnDownload.download = ''.concat(
              (0, _moment['default'])().format('YYYYMMDDhhmmss'),
              '.jpeg',
            );
          }

          this.close();
        }
      },
    },
    {
      key: 'close',
      value: function close() {
        this.setState({
          showImageCropper: false,
        });
      },
    },
    {
      key: 'open',
      value: function open() {
        var _this2 = this;

        this.setState(
          {
            showImageCropper: true,
          },
          function () {
            if (_this2.inputImage) _this2.inputImage.click();
          },
        );
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var options = {
          aspectRatio: this.props.ratio || 'free',
          // preview: this.previewImage,
          viewMode: 1,
          guides: true,
          crop: this.handleCrop.bind(this),
        };
        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          {
            style: this.props.style,
          },
          /*#__PURE__*/ _react['default'].createElement(
            _reactBootstrap.Modal,
            {
              bsSize: 'large',
              'aria-labelledby': 'mdlProfileImage',
              onHide: this.close.bind(this),
              show: this.state.showImageCropper,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _reactBootstrap.Modal.Header,
              {
                closeButton: true,
              },
              /*#__PURE__*/ _react['default'].createElement(
                _reactBootstrap.Modal.Title,
                {
                  id: 'mdlProfileImage',
                },
                '\u0627\u062E\u062A\u0631 \u0627\u0644\u0635\u0648\u0631\u0629',
              ),
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _reactBootstrap.Modal.Body,
              null,
              /*#__PURE__*/ _react['default'].createElement(
                _reactBootstrap.Grid,
                null,
                /*#__PURE__*/ _react['default'].createElement(
                  _reactBootstrap.Row,
                  null,
                  /*#__PURE__*/ _react['default'].createElement(
                    _reactBootstrap.Col,
                    {
                      sm: 9,
                    },
                    /*#__PURE__*/ _react['default'].createElement(
                      _reactCropper['default'],
                      _extends(
                        {
                          ref: function ref(_ref) {
                            return (_this3.cropper = _ref);
                          },
                          id: 'cropperImage',
                          style: {
                            height: 400,
                            width: '100%',
                          },
                          src: this.props.src ? this.props.src : '/media/article_placeholder.jpg',
                        },
                        options,
                      ),
                    ),
                  ),
                ),
                /*#__PURE__*/ _react['default'].createElement(
                  _reactBootstrap.Row,
                  {
                    className: 'mt',
                  },
                  /*#__PURE__*/ _react['default'].createElement(_reactBootstrap.Col, {
                    lg: 4,
                  }),
                ),
              ),
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _reactBootstrap.Modal.Footer,
              null,
              /*#__PURE__*/ _react['default'].createElement(
                _reactBootstrap.Button,
                {
                  className: 'btn btn-success  pull-left',
                  onClick: this.confirm.bind(this),
                },
                /*#__PURE__*/ _react['default'].createElement(_reactFontawesome['default'], {
                  icon: _fontawesomeFreeSolid.faCheck,
                }),
              ),
              /*#__PURE__*/ _react['default'].createElement(
                _reactBootstrap.Button,
                {
                  className: 'btn btn-danger pull-left',
                  onClick: this.close.bind(this),
                },
                /*#__PURE__*/ _react['default'].createElement(_reactFontawesome['default'], {
                  icon: _fontawesomeFreeSolid.faBan,
                }),
              ),
              /*#__PURE__*/ _react['default'].createElement(
                'label',
                {
                  htmlFor: 'inputImage',
                  title: 'Upload image file',
                  className: 'btn btn-info btn-upload',
                },
                /*#__PURE__*/ _react['default'].createElement('input', {
                  ref: function ref(_ref2) {
                    _this3.inputImage = _ref2;
                    if (_this3.inputImage && _this3.state.showImageCropper)
                      _this3.inputImage.click();
                  },
                  id: 'inputImage',
                  name: 'file',
                  type: 'file',
                  accept: 'image/*',
                  onChange: this.handleChangeFile.bind(this),
                  className: 'sr-only',
                }),
                /*#__PURE__*/ _react['default'].createElement(
                  'span',
                  {
                    'data-toggle': 'tooltip',
                    title: 'Import image with Blob URLs',
                    className: 'docs-tooltip',
                  },
                  '\u0627\u062E\u062A\u0631 \u0635\u0648\u0631\u0629 \u0623\u062E\u0631\u0649',
                ),
              ),
            ),
          ),
          /*#__PURE__*/ _react['default'].createElement(
            'div',
            null,
            this.props.isUploading,
            this.props.isReadOnly
              ? ''
              : this.props.isUploading
              ? /*#__PURE__*/ _react['default'].createElement(_reactLoaders.Loader, {
                  type: 'ball-pulse',
                })
              : /*#__PURE__*/ _react['default'].createElement(
                  _reactBootstrap.Button,
                  {
                    onClick: this.open.bind(this),
                    disabled: this.props.isUploading,
                  },
                  '\u0627\u062E\u062A\u0631 \u0635\u0648\u0631\u0629',
                ),
            this.props.enableDownload
              ? /*#__PURE__*/ _react['default'].createElement(
                  'a',
                  {
                    className: 'btn',
                    ref: 'btnDownload',
                  },
                  '\u062A\u0646\u0632\u064A\u0644',
                )
              : '',
          ),
        );
      },
    },
  ]);

  return ImageUploader;
})(_react['default'].Component);

ImageUploader.propTypes = {
  src: _propTypes['default'].string,
  updateImage: _propTypes['default'].func,
  enableDownload: _propTypes['default'].bool,
  style: _propTypes['default'].any,
  disablePreview: _propTypes['default'].bool,
  isReadOnly: _propTypes['default'].bool,
  saveImageOptions: _propTypes['default'].shape({
    width: _propTypes['default'].number,
    height: _propTypes['default'].number,
    imageSmoothingEnabled: _propTypes['default'].bool,
    imageSmoothingQuality: _propTypes['default'].oneOf(['low', 'medium', 'high']),
  }),
};
var _default = ImageUploader;
exports['default'] = _default;
