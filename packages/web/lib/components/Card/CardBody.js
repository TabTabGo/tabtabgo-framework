'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _classnames = _interopRequireDefault(require('classnames'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _withStyles = _interopRequireDefault(require('@material-ui/core/styles/withStyles'));

var _cardBodyStyle = _interopRequireDefault(require('./cardBodyStyle.jsx'));

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

function CardBody(_ref) {
  var _classNames;

  var props = _extends({}, _ref);

  var classes = props.classes,
    className = props.className,
    children = props.children,
    background = props.background,
    plain = props.plain,
    formHorizontal = props.formHorizontal,
    pricing = props.pricing,
    signup = props.signup,
    color = props.color,
    profile = props.profile,
    calendar = props.calendar,
    rest = _objectWithoutProperties(props, [
      'classes',
      'className',
      'children',
      'background',
      'plain',
      'formHorizontal',
      'pricing',
      'signup',
      'color',
      'profile',
      'calendar',
    ]);

  var cardBodyClasses = (0, _classnames['default'])(
    ((_classNames = {}),
    _defineProperty(_classNames, classes.cardBody, true),
    _defineProperty(_classNames, classes.cardBodyBackground, background),
    _defineProperty(_classNames, classes.cardBodyPlain, plain),
    _defineProperty(_classNames, classes.cardBodyFormHorizontal, formHorizontal),
    _defineProperty(_classNames, classes.cardPricing, pricing),
    _defineProperty(_classNames, classes.cardSignup, signup),
    _defineProperty(_classNames, classes.cardBodyColor, color),
    _defineProperty(_classNames, classes.cardBodyProfile, profile),
    _defineProperty(_classNames, classes.cardBodyCalendar, calendar),
    _defineProperty(_classNames, className, className !== undefined),
    _classNames),
  );
  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    _extends(
      {
        className: cardBodyClasses,
      },
      rest,
    ),
    children,
  );
}

CardBody.propTypes = {
  classes: _propTypes['default'].object.isRequired,
  className: _propTypes['default'].string,
  background: _propTypes['default'].bool,
  plain: _propTypes['default'].bool,
  formHorizontal: _propTypes['default'].bool,
  pricing: _propTypes['default'].bool,
  signup: _propTypes['default'].bool,
  color: _propTypes['default'].bool,
  profile: _propTypes['default'].bool,
  calendar: _propTypes['default'].bool,
};

var _default = (0, _withStyles['default'])(_cardBodyStyle['default'])(CardBody);

exports['default'] = _default;
