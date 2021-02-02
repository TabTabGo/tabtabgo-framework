'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.getUrl = void 0;

var _react = _interopRequireDefault(require('react'));

var _classnames = _interopRequireDefault(require('classnames'));

var _reactRouterDom = require('react-router-dom');

require('./TagsWidget.scss');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var getUrl = function getUrl(type, propName, value) {};

exports.getUrl = getUrl;

var TagsWidget = function TagsWidget(_ref) {
  var tags = _ref.tags,
    className = _ref.className,
    history = _ref.history;
  if (!tags) return /*#__PURE__*/ _react['default'].createElement('span', null);
  var mainClassNames = (0, _classnames['default'])('tags-widget', className);
  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    {
      className: mainClassNames,
    },
    tags.map(function (tag, index) {
      var tagLink = tag.value ? getUrl(tag.type, null, tag.value) : null;
      var classNames = (0, _classnames['default'])({
        'text-clickable': tagLink,
        pr: index > 0,
        pl: true,
        br2: index > 0,
      });
      if (tagLink)
        return /*#__PURE__*/ _react['default'].createElement(
          _reactRouterDom.Link,
          {
            to: tagLink,
          },
          /*#__PURE__*/ _react['default'].createElement(
            'span',
            {
              key: index,
              className: classNames,
            },
            tag.label,
          ),
        );
      return /*#__PURE__*/ _react['default'].createElement(
        'span',
        {
          key: index,
          className: classNames,
        },
        tag.label,
      );
    }),
  );
};

var _default = TagsWidget;
exports['default'] = _default;
