'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var decoratedInputStyle = function decoratedInputStyle(theme) {
  return {
    decoratedInputContainer: {
      position: 'relative',
      marginLeft: theme.spacing(4),
    },
    detachedAdornmentContainer: {
      position: 'absolute',
      top: theme.spacing(4.5),
      left: -1 * theme.spacing(4.5),
    },
  };
};

var _default = decoratedInputStyle;
exports['default'] = _default;
