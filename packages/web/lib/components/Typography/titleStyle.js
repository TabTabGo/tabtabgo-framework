'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

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

var titleStyle = function titleStyle(theme) {
  return {
    title: _defineProperty(
      {
        color: '#3C4858',
        textAlign: 'center',
        textDecoration: 'none',
        fontWeight: '300',
        marginTop: '0px',
        marginBottom: '25px',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        minHeight: '32px',
        '& small': {
          color: '#777',
          fontSize: '50%',
          fontWeight: '400',
          lineHeight: '1.6',
          display: 'block',
        },
      },
      theme.breakpoints.down('xs'),
      {
        fontSize: '1.8em',
        marginBottom: '16px',
        '& small': {
          fontSize: '70%',
        },
      },
    ),
  };
};

var _default = titleStyle;
exports['default'] = _default;
