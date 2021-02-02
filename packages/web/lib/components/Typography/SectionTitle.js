'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _styles = require('@material-ui/core/styles');

var _core = require('@material-ui/core');

var _classnames = _interopRequireDefault(require('classnames'));

var _sectionTitleStyle = _interopRequireDefault(require('./sectionTitleStyle'));

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

var SectionTitle = function SectionTitle(_ref) {
  var _cx;

  var children = _ref.children,
    classes = _ref.classes,
    className = _ref.className,
    style = _ref.style;
  var classNames = (0, _classnames['default'])(
    ((_cx = {}),
    _defineProperty(_cx, classes.root, true),
    _defineProperty(_cx, 'className', className),
    _cx),
  );
  return /*#__PURE__*/ _react['default'].createElement(
    _core.Typography,
    {
      variant: 'subtitle2',
      style: style,
      className: classNames,
    },
    children,
  );
};

SectionTitle.propTypes = {
  children: _propTypes['default'].node,
  classes: _propTypes['default'].object,
  className: _propTypes['default'].string,
  style: _propTypes['default'].object,
};

var _default = (0, _styles.withStyles)(_sectionTitleStyle['default'])(SectionTitle);

exports['default'] = _default;
