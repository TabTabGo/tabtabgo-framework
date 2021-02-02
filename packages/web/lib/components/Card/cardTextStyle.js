'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _themeHelpers = require('assets/jss/themeHelpers.jsx');

var cardTextStyle = function cardTextStyle(theme) {
  return {
    cardText: {
      float: 'none',
      display: 'inline-block',
      marginRight: '0',
      borderRadius: '3px',
      backgroundColor: '#999999',
      padding: '15px',
      marginTop: '-20px',
    },
    warningCardHeader: (0, _themeHelpers.getWarningCardHeader)(theme),
    sccessCardHeader: (0, _themeHelpers.getSuccessCardHeader)(theme),
    errorCardHeader: (0, _themeHelpers.getErrorCardHeader)(theme),
    infoCardHeader: (0, _themeHelpers.getInfoCardHeader)(theme),
    primaryCardHeader: (0, _themeHelpers.getPrimaryCardHeader)(theme),
  };
};

var _default = cardTextStyle;
exports['default'] = _default;
