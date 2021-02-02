'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getSelectedRowButtons = void 0;

var _react = _interopRequireDefault(require('react'));

var _sweetalert = _interopRequireDefault(require('sweetalert'));

var _Delete = _interopRequireDefault(require('@material-ui/icons/Delete'));

var _CloudDownload = _interopRequireDefault(require('@material-ui/icons/CloudDownload'));

var _Print = _interopRequireDefault(require('@material-ui/icons/Print'));

var _utilities = require('../../Buttons/utilities');

var _core = require('@material-ui/core');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

var selectedRowButtons = {
  download: {
    //label: "Download",
    tooltip: function tooltip(props) {
      var selected = props.selected,
        namePluralText = props.namePluralText;
      return 'Download '.concat(selected.length, ' selected ').concat(namePluralText);
    },
    icon: function icon(props) {
      if (props.flags && props.flags.exportingCsv)
        return /*#__PURE__*/ _react['default'].createElement(_core.CircularProgress, {
          style: {
            width: '20px',
            height: '20px',
          },
        });
      return /*#__PURE__*/ _react['default'].createElement(_CloudDownload['default'], null);
    },
    onClick: function onClick(props) {
      var actions = props.actions,
        options = props.options,
        searchOptions = props.searchOptions,
        selected = props.selected,
        nameSingularText = props.nameSingularText,
        exportOptions = props.exportOptions,
        keyField = props.keyField;

      if (actions) {
        var entities = selected;

        if (entities && entities.length > 0) {
          actions.onExport(
            'csv',
            entities.map(function (item) {
              return item[keyField];
            }),
            _objectSpread(_objectSpread({}, options), searchOptions),
            exportOptions || {},
          );
        } else {
          (0, _sweetalert['default'])({
            text: 'No '
              .concat(nameSingularText, ' are selected to be exported in CSV. Please select ')
              .concat(nameSingularText, '.'),
            icon: 'warning',
          });
        }
      } else {
        console.error('Actions is not injected');
      }
    },
  },
  pdf: {
    //label: "PDF",
    tooltip: function tooltip(_ref) {
      var selected = _ref.selected,
        namePluralText = _ref.namePluralText;
      return 'Export '.concat(selected.length, ' selected ').concat(namePluralText, ' as PDF');
    },
    icon: function icon(props) {
      if (props.flags && props.flags.exportingPdf)
        return /*#__PURE__*/ _react['default'].createElement(_core.CircularProgress, {
          style: {
            width: '20px',
            height: '20px',
          },
        });
      return /*#__PURE__*/ _react['default'].createElement(_CloudDownload['default'], null);
    },
    onClick: function onClick(_ref2) {
      var selected = _ref2.selected,
        exportsService = _ref2.exportsService,
        nameSingularText = _ref2.nameSingularText;

      if (exportsService) {
        var entities = selected;

        if (entities && entities.length > 0) {
          exportsService.exportPDF(entities);
        } else {
          (0, _sweetalert['default'])({
            text: 'No '
              .concat(nameSingularText, ' are selected to be exported in PDF. Please select ')
              .concat(nameSingularText, '.'),
            icon: 'warning',
          });
        }
      } else {
        console.error('Exports Service is not injected');
      }
    },
  },
  print: {
    //label: "Print",
    tooltip: function tooltip(_ref3) {
      var selected = _ref3.selected,
        namePluralText = _ref3.namePluralText;
      return 'Print '.concat(selected.length, ' selected ').concat(namePluralText);
    },
    icon: /*#__PURE__*/ _react['default'].createElement(_Print['default'], null),
    onClick: function onClick(_ref4) {
      var selected = _ref4.selected,
        exportsService = _ref4.exportsService,
        nameSingularText = _ref4.nameSingularText;

      if (exportsService) {
        var entities = selected;

        if (!entities || entities.length === 0) {
          (0, _sweetalert['default'])({
            text: 'No '
              .concat(nameSingularText, ' are selected for printing. Please select ')
              .concat(nameSingularText),
            icon: 'warning',
          });
        } else {
          exportsService.print(entities);
        }
      } else {
        console.error('Exports Service is not injected');
      }
    },
  },
  delete: {
    //label: "Delete",
    tooltip: function tooltip(_ref5) {
      var selected = _ref5.selected,
        namePluralText = _ref5.namePluralText;
      return 'Delete '
        .concat(selected.length, ' selected ')
        .concat(namePluralText ? namePluralText : 'items');
    },
    icon: /*#__PURE__*/ _react['default'].createElement(_Delete['default'], null),
    onClick: function onClick(props) {
      //TODO instead of delete create onDalete
      var selected = props.selected,
        nameSingularText = props.nameSingularText,
        namePluralText = props.namePluralText,
        actions = props.actions;

      if (selected && selected.length > 0 && actions && actions.onDelete) {
        (0, _sweetalert['default'])({
          title: 'Are you sure want to continue ?',
          text: ''
            .concat(selected.length, ' ')
            .concat(selected.length > 1 ? namePluralText : nameSingularText, ' will be deleted.'),
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        }).then(function (result) {
          if (result) {
            actions.onDelete(selected, {
              onSuccess: function onSuccess() {
                (0, _sweetalert['default'])({
                  text: ''
                    .concat(selected.length, ' ')
                    .concat(
                      selected.length > 1 ? namePluralText : nameSingularText,
                      ' are deleted successfully.',
                    ),
                  icon: 'success',
                }); //console.log('props.search :', props.search);

                if (props.search && props.search.onSearch) {
                  props.search.onSearch();
                }
              },
              onError: function onError() {
                (0, _sweetalert['default'])({
                  text: 'Deleting '
                    .concat(selected.length, ' ')
                    .concat(selected.length > 1 ? namePluralText : nameSingularText, ' failed'),
                  icon: 'error',
                });
              },
            });
          }
        });
      }
    },
  },
};

var getSelectedRowButtons = function getSelectedRowButtons(buttons) {
  var finialButtons = {};

  if (buttons) {
    finialButtons = (0, _utilities.mergeButtons)(buttons, selectedRowButtons);

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

exports.getSelectedRowButtons = getSelectedRowButtons;
