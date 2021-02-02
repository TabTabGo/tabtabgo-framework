'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var viewStyles = function viewStyles(theme) {
  return {
    root: {
      padding: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      background: theme.palette.grey[100],
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    selectedTab: {
      backgroundColor: theme.palette.common.white,
    },
  };
};

var _default = viewStyles;
exports['default'] = _default;
