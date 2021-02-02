'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _themeHelpers = require('assets/jss/themeHelpers.jsx');

// ##############################
// // // Wizard component styles
// #############################
var wizardStyle = function wizardStyle(theme) {
  return {
    root: {
      width: '100%',
    },
    completed: {
      display: 'inline-block',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    button: {
      marginRight: theme.spacing(1),
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    card: {
      display: 'inline-block',
      position: 'relative',
      width: '100%',
      margin: '25px 0',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
      borderRadius: '6px',
      color: 'rgba(0, 0, 0, 0.87)',
      background: '#fff',
      transition: 'all 300ms linear',
      minHeight: '410px',
    },
    wizardNavigation: {
      position: 'relative',
    },
    nav: {
      marginTop: '20px',
      paddingLeft: '0',
      marginBottom: '0',
      listStyle: 'none',
      backgroundColor: 'rgba(200, 200, 200, 0.2)',
      '&:after,&:before': {
        display: 'table',
        content: '" "',
      },
      '&:after': {
        boxSizing: 'border-box',
      },
    },
    steps: {
      marginLeft: '0',
      textAlign: 'center',
      // float: "left",
      // display: "block",
      position: 'relative',
      display: 'inline-block',
    },
    stepLabel: {},
    stepButton: {},
    stepsAnchor: {
      cursor: 'pointer',
      position: 'relative',
      display: 'block',
      padding: '10px 15px',
      textDecoration: 'none',
      transition: 'all .3s',
      border: '0 !important',
      borderRadius: '30px',
      lineHeight: '18px',
      fontSize: '12px',
      fontWeight: '500',
      minWidth: '100px',
      textAlign: 'center',
      color: '#555555 !important',
    },
    stepsDisabledAnchor: {
      position: 'relative',
      display: 'block',
      padding: '10px 15px',
      textDecoration: 'none',
      transition: 'all .3s',
      border: '0 !important',
      borderRadius: '30px',
      lineHeight: '18px',
      fontSize: '12px',
      fontWeight: '500',
      minWidth: '100px',
      textAlign: 'center',
    },
    content: {
      marginTop: '20px',
      minHeight: '340px',
      padding: '20px 15px',
    },
    stepContent: {
      display: 'none',
    },
    stepContentActive: {
      display: 'block',
    },
    movingTab: {
      position: 'absolute',
      textAlign: 'center',
      padding: '12px',
      fontSize: '12px',
      WebkitFontSmoothing: 'subpixel-antialiased',
      top: '-4px',
      left: '0px',
      borderRadius: '4px',
      color: '#FFFFFF',
      cursor: 'pointer',
      fontWeight: '500',
    },
    primary: {
      backgroundColor: theme.palette.primary.main,
      boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(156, 39, 176, 0.4)',
    },
    warning: {
      backgroundColor: theme.palette.warning.main,
      boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4)',
    },
    danger: {
      backgroundColor: theme.palette.error.main,
      boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(244, 67, 54, 0.4)',
    },
    success: {
      backgroundColor: theme.palette.success.main,
      boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(76, 175, 80, 0.4)',
    },
    info: {
      backgroundColor: theme.palette.info.main,
      boxShadow: '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 188, 212, 0.4)',
    },
    footer: {
      padding: '0 15px',
    },
    left: {
      float: 'left!important',
    },
    right: {
      float: 'right!important',
    },
    clearfix: {
      '&:after,&:before': {
        display: 'table',
        content: '" "',
      },
      clear: 'both',
    },
    navTitle: {
      width: '100%',
    },
    navSubtitle: {
      width: '100%',
    },
    movingTabTitle: {
      width: '100%',
      color: '#FFFFFF !important',
    },
    movingTabSubtitle: {
      width: '100%',
      color: '#FFFFFF !important',
    },
  };
};

var _default = wizardStyle;
exports['default'] = _default;
