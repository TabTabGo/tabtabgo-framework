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

var _ImageUploader = _interopRequireDefault(require('./ImageUploader'));

var _reactImageGallery = _interopRequireDefault(require('react-image-gallery'));

require('react-image-gallery/styles/css/image-gallery.css');

var _reactBootstrap = require('react-bootstrap');

require('./ImageGallery.scss');

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

var AdpeImageGallery = /*#__PURE__*/ (function (_React$Component) {
  _inherits(AdpeImageGallery, _React$Component);

  var _super = _createSuper(AdpeImageGallery);

  function AdpeImageGallery() {
    _classCallCheck(this, AdpeImageGallery);

    return _super.apply(this, arguments);
  }

  _createClass(AdpeImageGallery, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          onSlide = _this$props.onSlide,
          onUploadImage = _this$props.onUploadImage,
          onDeleteImage = _this$props.onDeleteImage,
          enableDelete = _this$props.enableDelete;
        var images = this.props.images;
        if (!images) images = [];
        var haveImages = true;

        if (images.length === 0) {
          haveImages = false;
          images.push({
            original: '/media/article_placeholder.jpg',
          });
        }

        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          null,
          /*#__PURE__*/ _react['default'].createElement(_reactImageGallery['default'], {
            defaultImage: '/media/article_placeholder.jpg',
            style: this.props.style || {
              minHeight: '300px',
              minWidth: '533px',
              width: 'auto',
              height: 'auto',
            },
            items: images,
            showThumbnails: images.length > 1,
            lazyLoad: true,
            showNav: true,
            showPlayButton: images.length > 1,
            onSlide: onSlide,
            disableArrowKeys: false,
          }),
          /*#__PURE__*/ _react['default'].createElement(
            'div',
            {
              className: 'image-gallery-toolbar',
            },
            /*#__PURE__*/ _react['default'].createElement(_ImageUploader['default'], {
              isReadOnly: false,
              disablePreview: true,
              ratio: this.props.ratio || 1.78,
              updateImage: onUploadImage,
              isUploading: this.props.isUploading,
            }),
            ' ',
            enableDelete && haveImages
              ? /*#__PURE__*/ _react['default'].createElement(
                  _reactBootstrap.Button,
                  {
                    onClick: onDeleteImage,
                    disabled: this.props.isUploading,
                    bsStyle: 'error',
                  },
                  '\u062D\u0630\u0641 \u0627\u0644\u0635\u0648\u0631\u0629',
                )
              : '',
          ),
        );
      },
    },
  ]);

  return AdpeImageGallery;
})(_react['default'].Component);

exports['default'] = AdpeImageGallery;
