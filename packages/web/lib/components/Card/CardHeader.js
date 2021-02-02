'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _classnames = _interopRequireDefault(require('classnames'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _withStyles = _interopRequireDefault(require('@material-ui/core/styles/withStyles'));

var _cardHeaderStyle = _interopRequireDefault(require('./cardHeaderStyle.jsx'));

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

function CardHeader(_ref) {
  var _classNames;

  var props = _extends({}, _ref);

  var classes = props.classes,
    className = props.className,
    children = props.children,
    color = props.color,
    plain = props.plain,
    image = props.image,
    contact = props.contact,
    signup = props.signup,
    stats = props.stats,
    icon = props.icon,
    text = props.text,
    rest = _objectWithoutProperties(props, [
      'classes',
      'className',
      'children',
      'color',
      'plain',
      'image',
      'contact',
      'signup',
      'stats',
      'icon',
      'text',
    ]);

  var cardHeaderClasses = (0, _classnames['default'])(
    ((_classNames = {}),
    _defineProperty(_classNames, classes.cardHeader, true),
    _defineProperty(_classNames, classes[color + 'CardHeader'], color),
    _defineProperty(_classNames, classes.cardHeaderPlain, plain),
    _defineProperty(_classNames, classes.cardHeaderImage, image),
    _defineProperty(_classNames, classes.cardHeaderContact, contact),
    _defineProperty(_classNames, classes.cardHeaderSignup, signup),
    _defineProperty(_classNames, classes.cardHeaderStats, stats),
    _defineProperty(_classNames, classes.cardHeaderIcon, icon),
    _defineProperty(_classNames, classes.cardHeaderText, text),
    _defineProperty(_classNames, className, className !== undefined),
    _classNames),
  );
  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    _extends(
      {
        className: cardHeaderClasses,
      },
      rest,
    ),
    children,
  );
}

CardHeader.propTypes = {
  classes: _propTypes['default'].object.isRequired,
  className: _propTypes['default'].string,
  color: _propTypes['default'].oneOf(['warning', 'success', 'error', 'info', 'primary', 'rose']),
  plain: _propTypes['default'].bool,
  image: _propTypes['default'].bool,
  contact: _propTypes['default'].bool,
  signup: _propTypes['default'].bool,
  stats: _propTypes['default'].bool,
  icon: _propTypes['default'].bool,
  text: _propTypes['default'].bool,
};

var _default = (0, _withStyles['default'])(_cardHeaderStyle['default'])(CardHeader);

exports['default'] = _default;
