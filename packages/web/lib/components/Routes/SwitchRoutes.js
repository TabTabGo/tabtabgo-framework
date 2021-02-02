'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var routeTypes = function routeTypes(prop, key) {
  return /*#__PURE__*/ _react['default'].createElement(_reactRouterDom.Route, {
    path: prop.path,
    component: prop.component,
    key: key,
  });
};

var SwitchRoutes = function SwitchRoutes(routes) {
  return /*#__PURE__*/ _react['default'].createElement(
    _reactRouterDom.Switch,
    null,
    routes.map(function (prop, key) {
      if (prop.redirect)
        return /*#__PURE__*/ _react['default'].createElement(_reactRouterDom.Redirect, {
          from: prop.path,
          to: prop.pathTo,
          key: key,
        });
      if (prop.collapse && prop.views)
        return prop.views.map(function (prop, key) {
          return routeTypes(prop, key);
        });
      return routeTypes(prop, key);
    }),
  );
};

SwitchRoutes.propTypes = {
  routes: _propTypes['default'].arrayOf(_propTypes['default'].object).isRequired,
};
var _default = SwitchRoutes;
exports['default'] = _default;
