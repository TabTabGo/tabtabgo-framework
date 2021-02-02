'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var imageInputStyle = function imageInputStyle(theme) {
  return {
    imageContainer: {
      position: 'relative',
      marginTop: theme.spacing(2),
      height: 120,
      width: 'fit-content',
    },
    image: {
      height: 120,
    },
    addButton: {
      height: 120,
      width: 120,
      zIndex: 3,
    },
    removeButton: {
      position: 'absolute',
      top: -10,
      left: -10,
      padding: 0,
    },
    errorButton: {
      color: 'red',
      borderColor: 'red',
    },
    errorImage: {
      borderColor: 'red',
      borderWidth: '2',
      borderStyle: 'solid',
    },
  };
};

var _default = imageInputStyle;
exports['default'] = _default;
