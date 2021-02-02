'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _reactGoogleMaps = require('react-google-maps');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

var regularGoogleMap = (0, _reactGoogleMaps.withScriptjs)(
  (0, _reactGoogleMaps.withGoogleMap)(function (props) {
    return /*#__PURE__*/ _react['default'].createElement(
      _reactGoogleMaps.GoogleMap,
      _extends(
        {
          defaultZoom: props.defaultZoom || 8,
          defaultCenter: props.defaultCenter,
          defaultOptions: {
            scrollwheel: false,
          },
        },
        props.googleMapOptions,
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _reactGoogleMaps.Marker,
        _extends(
          {
            position: props.markPosition,
          },
          props.markerOptions,
        ),
      ),
    );
  }),
);
var _default = regularGoogleMap;
exports['default'] = _default;
