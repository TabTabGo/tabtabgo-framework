'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _classnames = _interopRequireDefault(require('classnames'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _withStyles = _interopRequireDefault(require('@material-ui/core/styles/withStyles'));

var _LinearProgress = _interopRequireDefault(require('@material-ui/core/LinearProgress'));

var _cardStyle = _interopRequireDefault(require('./cardStyle.jsx'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

function Card(_ref) {
  var _classNames;

  var props = _extends({}, _ref);

  var classes = props.classes,
    className = props.className,
    children = props.children,
    loading = props.loading,
    plain = props.plain,
    profile = props.profile,
    blog = props.blog,
    raised = props.raised,
    background = props.background,
    pricing = props.pricing,
    color = props.color,
    product = props.product,
    testimonial = props.testimonial,
    chart = props.chart,
    login = props.login,
    rest = _objectWithoutProperties(props, [
      'classes',
      'className',
      'children',
      'loading',
      'plain',
      'profile',
      'blog',
      'raised',
      'background',
      'pricing',
      'color',
      'product',
      'testimonial',
      'chart',
      'login',
    ]);

  var cardClasses = (0, _classnames['default'])(
    ((_classNames = {}),
    _defineProperty(_classNames, classes.card, true),
    _defineProperty(_classNames, classes.cardPlain, plain),
    _defineProperty(_classNames, classes.cardProfile, profile || testimonial),
    _defineProperty(_classNames, classes.cardBlog, blog),
    _defineProperty(_classNames, classes.cardRaised, raised),
    _defineProperty(_classNames, classes.cardBackground, background),
    _defineProperty(
      _classNames,
      classes.cardPricingColor,
      (pricing && color !== undefined) || (pricing && background !== undefined),
    ),
    _defineProperty(_classNames, classes[color], color),
    _defineProperty(_classNames, classes.cardPricing, pricing),
    _defineProperty(_classNames, classes.cardProduct, product),
    _defineProperty(_classNames, classes.cardChart, chart),
    _defineProperty(_classNames, classes.cardLogin, login),
    _defineProperty(_classNames, className, className !== undefined),
    _classNames),
  );
  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    _extends(
      {
        className: cardClasses,
      },
      rest,
    ),
    loading &&
      /*#__PURE__*/ _react['default'].createElement(_LinearProgress['default'], {
        className: classes.cardProgress,
      }),
    children,
  );
}

Card.propTypes = {
  classes: _propTypes['default'].object.isRequired,
  style: _propTypes['default'].object,
  className: _propTypes['default'].string,
  loading: _propTypes['default'].bool,
  plain: _propTypes['default'].bool,
  profile: _propTypes['default'].bool,
  blog: _propTypes['default'].bool,
  raised: _propTypes['default'].bool,
  background: _propTypes['default'].bool,
  pricing: _propTypes['default'].bool,
  testimonial: _propTypes['default'].bool,
  color: _propTypes['default'].oneOf(['primary', 'info', 'success', 'warning', 'error', 'rose']),
  product: _propTypes['default'].bool,
  chart: _propTypes['default'].bool,
  login: _propTypes['default'].bool,
  children: _propTypes['default'].node,
};

var _default = (0, _withStyles['default'])(_cardStyle['default'])(Card);

exports['default'] = _default;
