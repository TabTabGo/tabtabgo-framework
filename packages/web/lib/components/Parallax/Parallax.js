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

var _parallaxStyle = _interopRequireDefault(require('./parallaxStyle.jsx'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

var Parallax = /*#__PURE__*/ (function (_React$Component) {
  _inherits(Parallax, _React$Component);

  var _super = _createSuper(Parallax);

  function Parallax(props) {
    var _this;

    _classCallCheck(this, Parallax);

    _this = _super.call(this, props);
    var windowScrollTop;

    if (window.innerWidth >= 768) {
      windowScrollTop = window.pageYOffset / 3;
    } else {
      windowScrollTop = 0;
    }

    _this.state = {
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
    };
    _this.resetTransform = _this.resetTransform.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Parallax, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (window.innerWidth >= 768) {
          var windowScrollTop = window.pageYOffset / 3;
          this.setState({
            transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
          });
          window.addEventListener('scroll', this.resetTransform);
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (window.innerWidth >= 768) {
          window.removeEventListener('scroll', this.resetTransform);
        }
      },
    },
    {
      key: 'resetTransform',
      value: function resetTransform() {
        var windowScrollTop = window.pageYOffset / 3;
        this.setState({
          transform: 'translate3d(0,' + windowScrollTop + 'px,0)',
        });
      },
    },
    {
      key: 'render',
      value: function render() {
        var _classNames,
          _this2 = this;

        var _this$props = this.props,
          classes = _this$props.classes,
          filter = _this$props.filter,
          className = _this$props.className,
          children = _this$props.children,
          style = _this$props.style,
          image = _this$props.image,
          small = _this$props.small;
        var parallaxClasses = (0, _classnames['default'])(
          ((_classNames = {}),
          _defineProperty(_classNames, classes.parallax, true),
          _defineProperty(_classNames, classes[filter + 'Color'], filter !== undefined),
          _defineProperty(_classNames, classes.small, small),
          _defineProperty(_classNames, className, className !== undefined),
          _classNames),
        );
        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          {
            className: parallaxClasses,
            style: _objectSpread(
              _objectSpread({}, style),
              {},
              {
                backgroundImage: image ? 'url(' + image + ')' : null,
              },
              this.state,
            ),
            ref: function ref(_ref) {
              return (_this2.parallax = _ref);
            },
          },
          children,
        );
      },
    },
  ]);

  return Parallax;
})(_react['default'].Component);

Parallax.propTypes = {
  classes: _propTypes['default'].object.isRequired,
  className: _propTypes['default'].string,
  filter: _propTypes['default'].oneOf([
    'primary',
    'rose',
    'dark',
    'info',
    'success',
    'warning',
    'danger',
  ]),
  children: _propTypes['default'].node,
  style: _propTypes['default'].string,
  image: _propTypes['default'].string,
  small: _propTypes['default'].bool,
};

var _default = (0, _styles.withStyles)(_parallaxStyle['default'])(Parallax);

exports['default'] = _default;
