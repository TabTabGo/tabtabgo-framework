'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var style = function style(theme) {
  return {
    progressWrapper: {
      position: 'absolute',
      right: 18,
    },
    errorContainer: {
      color: 'red',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[100],
      padding: theme.spacing(0.5) * 1.5,
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
    },
  };
};

var _default = style;
exports['default'] = _default;
