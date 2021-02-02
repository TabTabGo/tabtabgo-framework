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

var _ImageGallery = _interopRequireDefault(require('./ImageGallery'));

var _ValidationField = require('./ValidationField');

var _ServiceProvider = require('ttg-react/core/ServiceProvider');

var _sweetalert = _interopRequireDefault(require('sweetalert'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
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

var ImageGalleryField = /*#__PURE__*/ (function (_React$Component) {
  _inherits(ImageGalleryField, _React$Component);

  var _super = _createSuper(ImageGalleryField);

  function ImageGalleryField(props) {
    var _this;

    _classCallCheck(this, ImageGalleryField);

    _this = _super.call(this, props);

    _this.handleUpdateImage = function (onChange, canvasData, fileName) {
      var _this$props = _this.props,
        referenceId = _this$props.referenceId,
        referenceType = _this$props.referenceType,
        input = _this$props.input,
        allowMultipleImages = _this$props.allowMultipleImages,
        featureMediaFile = _this$props.featureMediaFile;

      var mediaFiles = _this.getMediaFiles(input);

      if (canvasData) {
        canvasData.toBlob(
          function (blob) {
            var imageProps = {
              fileName: fileName,
              extension: 'jpg',
              mediaCategoryId: 7,
              fileType: 'jpg',
              mediaType: 'image',
            };

            if (referenceId) {
              Object.assign(imageProps, {
                referenceId: referenceId,
                referenceType: referenceType,
              });
            }

            _this.setState(
              {
                isUploadingImage: true,
              },
              function () {
                _this.mediaFileService
                  .uploadFile(blob, imageProps)
                  .then(function (result) {
                    if (onChange) {
                      var newMediaFile = allowMultipleImages ? Object.assign([], mediaFiles) : [];
                      newMediaFile.push({
                        mediaFileId: result.mediaFileId,
                      });

                      _this.setState(
                        {
                          isUploadingImage: false,
                        },
                        function () {
                          return onChange(featureMediaFile ? result.mediaFileId : newMediaFile);
                        },
                      );
                    }
                  })
                  ['catch'](function (error) {
                    (0, _sweetalert['default'])({
                      text:
                        '\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0648\u0631\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.',
                      icon: 'error',
                      button: 'تم',
                    });

                    _this.setState({
                      isUploadingImage: false,
                    });
                  });
              },
            );
          },
          'image/jpeg',
          0.95,
        );
      }
    };

    _this.handleDeleteImage = function (onChange) {
      var input = _this.props.input;

      var mediaFiles = _this.getMediaFiles(input);

      var currentImageIndex = _this.state.currentImageIndex;

      if (currentImageIndex < mediaFiles.length) {
        var newMediaFiles = Object.assign([], mediaFiles);
        newMediaFiles.splice(currentImageIndex, 1);
        onChange(newMediaFiles);
      }
    };

    _this.getMediaFiles = function (input) {
      var mediaFiles = [];

      if (input.value) {
        if (Array.isArray(input.value)) {
          mediaFiles = input.value;
        } else {
          mediaFiles.push({
            mediaFileId: input.value,
          });
        }
      }

      return mediaFiles;
    };

    _this.render = function () {
      var _this$props2 = _this.props,
        input = _this$props2.input,
        enablePlayControls = _this$props2.enablePlayControls,
        ratio = _this$props2.ratio,
        style = _this$props2.style,
        enableDelete = _this$props2.enableDelete;

      var mediaFiles = _this.getMediaFiles(input);

      var images = [];
      if (mediaFiles)
        for (var i = 0; i < mediaFiles.length; i++) {
          images.push({
            original: _this.mediaFileService.getImageUrl(mediaFiles[i].mediaFileId),
            thumbnail: _this.mediaFileService.getImageUrl(mediaFiles[i].mediaFileId, 'ThumbMedium'),
          });
        }
      return /*#__PURE__*/ _react['default'].createElement(
        _ValidationField.BaseValidationField,
        _this.props,
        /*#__PURE__*/ _react['default'].createElement(_ImageGallery['default'], {
          images: images,
          style: style,
          ratio: ratio,
          enableDelete: enableDelete,
          isUploading: _this.state.isUploadingImage,
          enablePlayControls: enablePlayControls,
          onSlide: function onSlide(currentImageIndex) {
            return _this.setState({
              currentImageIndex: currentImageIndex,
            });
          },
          onUploadImage: _this.handleUpdateImage.bind(
            _assertThisInitialized(_this),
            input.onChange,
          ),
          onDeleteImage: _this.handleDeleteImage.bind(
            _assertThisInitialized(_this),
            input.onChange,
          ),
        }),
      );
    };

    _this.state = {
      isUploadingImage: false,
      currentImageIndex: 0,
    };
    _this.mediaFileService = _ServiceProvider.currentServiceProvider.getFileService();
    return _this;
  }

  return ImageGalleryField;
})(_react['default'].Component);

exports['default'] = ImageGalleryField;
