'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _themeHelpers = require('assets/jss/themeHelpers.jsx');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
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

var cardHeaderStyle = function cardHeaderStyle(theme) {
  return {
    cardHeader: {
      padding: '0.75rem 1.25rem',
      marginBottom: '0',
      borderBottom: 'none',
      background: 'transparent',
      zIndex: '3 !important',
      '&$cardHeaderPlain,&$cardHeaderImage,&$cardHeaderContact,&$cardHeaderSignup,&$cardHeaderIcon,&$cardHeaderStats,&$warningCardHeader,&$successCardHeader,&$errorCardHeader,&$infoCardHeader,&$primaryCardHeader': {
        margin: '0 15px',
        padding: '0',
        position: 'relative',
        color: '#FFFFFF',
      },
      '&:first-child': {
        borderRadius: 'calc(.25rem - 1px) calc(.25rem - 1px) 0 0',
      },
      '&$warningCardHeader,&$successCardHeader,&$errorCardHeader,&$infoCardHeader,&$primaryCardHeader': {
        '&:not($cardHeaderIcon):not($cardHeaderImage):not($cardHeaderText)': {
          borderRadius: '3px',
          marginTop: '-20px',
          padding: '15px',
        },
      },
      '&$cardHeaderStats svg': {
        fontSize: '36px',
        lineHeight: '56px',
        textAlign: 'center',
        width: '36px',
        height: '36px',
        margin: '10px 10px 4px',
      },
      '&$cardHeaderStats .fab,&$cardHeaderStats .fas,&$cardHeaderStats .far,&$cardHeaderStats .fal,&$cardHeaderStats .material-icons': {
        fontSize: '36px',
        lineHeight: '56px',
        width: '56px',
        height: '56px',
        textAlign: 'center',
        overflow: 'unset',
        marginBottom: '1px',
      },
      '&$cardHeaderStats$cardHeaderIcon': {
        textAlign: 'right',
      },
      '&$cardHeaderImage': {
        marginLeft: '15px',
        marginRight: '15px',
        marginTop: '-30px',
        borderRadius: '6px',
      },
      '&$cardHeaderText': {
        display: 'inline-block',
      },
    },
    cardHeaderPlain: {
      marginLeft: '0px',
      marginRight: '0px',
      '&$cardHeaderImage': {
        margin: '0 !important',
      },
    },
    cardHeaderImage: {
      position: 'relative',
      padding: '0',
      zIndex: '1',
      '& img': {
        width: '100%',
        borderRadius: '6px',
        pointerEvents: 'none',
        boxShadow: '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
      },
      '& a': {
        display: 'block',
      },
    },
    cardHeaderContact: {
      margin: '0 15px',
      marginTop: '-20px',
    },
    cardHeaderSignup: {
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '-40px',
      padding: '20px 0',
      width: '100%',
      marginBottom: '15px',
    },
    cardHeaderStats: {
      '& $cardHeaderIcon': {
        textAlign: 'right',
      },
      '& h1,& h2,& h3,& h4,& h5,& h6': {
        margin: '0 !important',
      },
    },
    cardHeaderIcon: {
      '&$warningCardHeader,&$successCardHeader,&$errorCardHeader,&$infoCardHeader,&$primaryCardHeader': {
        background: 'transparent',
        boxShadow: 'none',
      },
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        width: '33px',
        height: '33px',
        textAlign: 'center',
        lineHeight: '33px',
      },
      '& svg': {
        width: '24px',
        height: '24px',
        textAlign: 'center',
        lineHeight: '33px',
        margin: '5px 4px 0px',
      },
    },
    cardHeaderText: {},
    warningCardHeader: {
      color: '#FFFFFF',
      '&:not($cardHeaderText):not($cardHeaderIcon)': _objectSpread(
        {},
        (0, _themeHelpers.getWarningCardHeader)(theme),
      ),
    },
    successCardHeader: {
      color: '#FFFFFF',
      '&:not($cardHeaderText):not($cardHeaderIcon)': _objectSpread(
        {},
        (0, _themeHelpers.getSuccessCardHeader)(theme),
      ),
    },
    errorCardHeader: {
      color: '#FFFFFF',
      '&:not($cardHeaderText):not($cardHeaderIcon)': _objectSpread(
        {},
        (0, _themeHelpers.getErrorCardHeader)(theme),
      ),
    },
    infoCardHeader: {
      color: '#FFFFFF',
      '&:not($cardHeaderText):not($cardHeaderIcon)': _objectSpread(
        {},
        (0, _themeHelpers.getInfoCardHeader)(theme),
      ),
    },
    primaryCardHeader: {
      color: '#FFFFFF',
      '&:not($cardHeaderText):not($cardHeaderIcon)': _objectSpread(
        {},
        (0, _themeHelpers.getPrimaryCardHeader)(theme),
      ),
    },
  };
};

var _default = cardHeaderStyle;
exports['default'] = _default;
