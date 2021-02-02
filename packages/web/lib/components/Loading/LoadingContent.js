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

var _reactHelmet = require('react-helmet');

var _reactBootstrap = require('react-bootstrap');

var _ContentWrapper = _interopRequireDefault(require('../../layout/ContentWrapper'));

var _ShareWidget = _interopRequireDefault(require('../ShareWidget'));

var _TagsWidgets = _interopRequireDefault(require('../TagsWidgets'));

var _LoadingTextShape = _interopRequireDefault(require('./LoadingTextShape'));

var _LoadingTextParagraph = _interopRequireDefault(require('./LoadingTextParagraph'));

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

var LoadingContent = /*#__PURE__*/ (function (_Component) {
  _inherits(LoadingContent, _Component);

  var _super = _createSuper(LoadingContent);

  function LoadingContent() {
    _classCallCheck(this, LoadingContent);

    return _super.apply(this, arguments);
  }

  _createClass(LoadingContent, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          window.scrollTo(0, 0);
        }
      },
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.scrollTo(0, 0);
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          title = _this$props.title,
          subTitle = _this$props.subTitle,
          tags = _this$props.tags,
          history = _this$props.history;
        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          {
            className: 'content-page',
          },
          /*#__PURE__*/ _react['default'].createElement(
            _reactHelmet.Helmet,
            null,
            /*#__PURE__*/ _react['default'].createElement('title', null, title),
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _ContentWrapper['default'],
            null,
            /*#__PURE__*/ _react['default'].createElement(
              'div',
              {
                className: 'mt',
              },
              title
                ? /*#__PURE__*/ _react['default'].createElement('h1', null, title)
                : /*#__PURE__*/ _react['default'].createElement(
                    'h1',
                    null,
                    /*#__PURE__*/ _react['default'].createElement(
                      _LoadingTextShape['default'],
                      null,
                    ),
                  ),
              subTitle
                ? /*#__PURE__*/ _react['default'].createElement(
                    'h2',
                    {
                      className: 'mt',
                    },
                    subTitle,
                  )
                : /*#__PURE__*/ _react['default'].createElement(
                    'h2',
                    {
                      className: 'mt',
                    },
                    /*#__PURE__*/ _react['default'].createElement(
                      _LoadingTextShape['default'],
                      null,
                    ),
                  ),
              tags
                ? /*#__PURE__*/ _react['default'].createElement(_TagsWidgets['default'], {
                    tags: tags,
                    history: history,
                  })
                : /*#__PURE__*/ _react['default'].createElement(
                    'h4',
                    {
                      className: 'mt-lg',
                    },
                    /*#__PURE__*/ _react['default'].createElement(
                      _LoadingTextShape['default'],
                      null,
                    ),
                  ),
              /*#__PURE__*/ _react['default'].createElement(
                'div',
                {
                  className: 'content-body mt-xl',
                },
                /*#__PURE__*/ _react['default'].createElement(
                  'div',
                  null,
                  /*#__PURE__*/ _react['default'].createElement(
                    _reactBootstrap.Row,
                    null,
                    /*#__PURE__*/ _react['default'].createElement(
                      _reactBootstrap.Col,
                      {
                        sm: 12,
                      },
                      /*#__PURE__*/ _react['default'].createElement(
                        _LoadingTextParagraph['default'],
                        null,
                      ),
                      /*#__PURE__*/ _react['default'].createElement(
                        _LoadingTextParagraph['default'],
                        {
                          className: 'mt-xl',
                        },
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      },
    },
  ]);

  return LoadingContent;
})(_react.Component);

var _default = LoadingContent;
exports['default'] = _default;
