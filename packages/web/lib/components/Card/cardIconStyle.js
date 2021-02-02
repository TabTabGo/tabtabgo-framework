'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _themeHelpers = require('assets/jss/themeHelpers.jsx');

var cardIconStyle = function cardIconStyle(theme) {
  return {
    cardIcon: {
      '&$warningCardHeader,&$successCardHeader,&$errorCardHeader,&$infoCardHeader,&$primaryCardHeader': {
        borderRadius: '3px',
        backgroundColor: '#999',
        padding: '15px',
        marginTop: '-20px',
        marginRight: '15px',
        float: 'left',
      },
    },
    warningCardHeader: (0, _themeHelpers.getWarningCardHeader)(theme),
    successCardHeader: (0, _themeHelpers.getSuccessCardHeader)(theme),
    errorCardHeader: (0, _themeHelpers.getErrorCardHeader)(theme),
    infoCardHeader: (0, _themeHelpers.getInfoCardHeader)(theme),
    primaryCardHeader: (0, _themeHelpers.getPrimaryCardHeader)(theme),
  };
};

var _default = cardIconStyle;
exports['default'] = _default;
