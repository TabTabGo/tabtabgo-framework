'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.showInfoAlert = exports.showWarningAlert = exports.showErrorAlert = exports.showSuccessAlert = exports.showAlert = exports.showSnackbar = void 0;

var _react = _interopRequireDefault(require('react'));

var _core = require('@material-ui/core');

var _withReact = _interopRequireDefault(require('@sweetalert/with-react'));

require('./styles/material-swal.scss');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var showSnackbar = function showSnackbar(enqueueSnackbar, success, message) {
  if (success === true) {
    enqueueSnackbar(message, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      action: /*#__PURE__*/ _react['default'].createElement(
        _core.Button,
        {
          size: 'small',
          style: {
            color: 'white',
          },
        },
        'Dismiss',
      ),
      autoHideDuration: 2000,
    });
  } else {
    enqueueSnackbar(message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    });
  }
};

exports.showSnackbar = showSnackbar;

var showAlert = function showAlert(type, message, title) {
  (0, _withReact['default'])({
    icon: type,
    content: /*#__PURE__*/ _react['default'].createElement(
      'div',
      null,
      /*#__PURE__*/ _react['default'].createElement('h1', null, title ? title : ''),
      /*#__PURE__*/ _react['default'].createElement('p', null, message),
    ),
  });
};

exports.showAlert = showAlert;

var showSuccessAlert = function showSuccessAlert(message, title) {
  showAlert('success', message, title);
};

exports.showSuccessAlert = showSuccessAlert;

var showErrorAlert = function showErrorAlert(message, title) {
  showAlert('error', message, title);
};

exports.showErrorAlert = showErrorAlert;

var showWarningAlert = function showWarningAlert(message, title) {
  showAlert('warning', message, title);
};

exports.showWarningAlert = showWarningAlert;

var showInfoAlert = function showInfoAlert(message, title) {
  showAlert('info', message, title);
};

exports.showInfoAlert = showInfoAlert;
