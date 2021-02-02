'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getRowButtons = exports.rowButtons = void 0;

var _react = _interopRequireDefault(require('react'));

var _Visibility = _interopRequireDefault(require('@material-ui/icons/Visibility'));

var _utilities = require('../../Buttons/utilities');

var _utilities2 = require('ttg-react/core/utilities');

var _Edit = _interopRequireDefault(require('@material-ui/icons/Edit'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var rowButtons = {
  edit: {
    //label: "Edit",
    tooltip: function tooltip(_ref) {
      var data = _ref.data,
        displayField = _ref.displayField,
        nameSingularText = _ref.nameSingularText;
      return 'Edit '.concat(
        data && displayField
          ? (0, _utilities2.getDisplayValue)(data, displayField)
          : nameSingularText
          ? nameSingularText
          : '',
        ' ',
      );
    },
    icon: /*#__PURE__*/ _react['default'].createElement(_Edit['default'], null),
    onClick: function onClick(data, props) {
      if (props.actions.onEdit) {
        props.actions.onEdit(data);
      }
    },
  },
  view: {
    //label: "View",
    tooltip: function tooltip(_ref2) {
      var data = _ref2.data,
        displayField = _ref2.displayField,
        nameSingularText = _ref2.nameSingularText;
      return 'View '.concat(
        data && displayField
          ? (0, _utilities2.getDisplayValue)(data, displayField)
          : nameSingularText
          ? nameSingularText
          : '',
        ' details',
      );
    },
    icon: /*#__PURE__*/ _react['default'].createElement(_Visibility['default'], null),
    onClick: function onClick(data, props) {
      if (props.history) {
        var keyField = props.keyField;
        props.history.push('/'.concat(data[keyField]));
      }
    },
  },
};
exports.rowButtons = rowButtons;

var getRowButtons = function getRowButtons(buttons) {
  var finialButtons = {};

  if (buttons) {
    finialButtons = (0, _utilities.mergeButtons)(buttons, rowButtons);

    if (buttons.extraButtons) {
      for (var actionKey in buttons.extraButtons) {
        if (buttons.extraButtons[actionKey]) {
          finialButtons[actionKey] = buttons.extraButtons[actionKey];
        }
      }
    }
  }

  return finialButtons;
};

exports.getRowButtons = getRowButtons;
