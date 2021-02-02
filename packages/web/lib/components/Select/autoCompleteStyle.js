'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _colorManipulator = require('@material-ui/core/styles/colorManipulator');

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1,
    },
    input: {
      display: 'flex',
      //paddingTop: 0,
      minWidth: '200px',
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
    },
    container: {
      marginTop: '20px',
    },
    chip: {
      margin: ''.concat(theme.spacing(0.5), 'px ').concat(theme.spacing(0.25), 'px'),
      height: theme.spacing(1),
      '& svg': {
        margin: 0,
      },
    },
    chipFocused: {
      backgroundColor: (0, _colorManipulator.emphasize)(
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: ''.concat(theme.spacing(1), 'px ').concat(theme.spacing(2), 'px'),
    },
    singleValue: {
      fontSize: 16,
      fontWeight: 300,
    },
    placeholder: {
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 9,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing(2),
    },
  };
};

var _default = styles;
exports['default'] = _default;
