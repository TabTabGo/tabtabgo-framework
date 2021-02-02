'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getToolbarButtons = exports.headerButtons = void 0;

var _react = _interopRequireDefault(require('react'));

var _FilterList = _interopRequireDefault(require('@material-ui/icons/FilterList'));

var _Search = _interopRequireDefault(require('@material-ui/icons/Search'));

var _CloudDownload = _interopRequireDefault(require('@material-ui/icons/CloudDownload'));

var _Print = _interopRequireDefault(require('@material-ui/icons/Print'));

var _sweetalert = _interopRequireDefault(require('sweetalert'));

var _ColumnView = _interopRequireDefault(require('./components/ColumnView'));

var _utilities = require('../../Buttons/utilities');

var _Refresh = _interopRequireDefault(require('@material-ui/icons/Refresh'));

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

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var headerButtons = {
  search: {
    //label: "Search",
    tooltip: function tooltip(_ref) {
      var namePluralText = _ref.namePluralText;
      return 'Search in '.concat(namePluralText);
    },
    icon: /*#__PURE__*/ _react['default'].createElement(_Search['default'], null),
    onClick: function onClick(props) {
      if (props.actions && props.actions.onViewFilter) {
        props.actions.onViewFilter();
      }
    },
  },
  viewColumn: {
    //label: "Columns",
    // eslint-disable-next-line react/display-name
    component: function component(props, key) {
      // eslint-disable-next-line react/prop-types
      var classes = props.classes,
        rest = _objectWithoutProperties(props, ['classes']);

      var root = classes.root,
        formControl = classes.formControl,
        spacer = classes.spacer,
        actions = classes.actions,
        title = classes.title;
      return /*#__PURE__*/ _react['default'].createElement(
        _ColumnView['default'],
        _extends(
          {
            classes: {
              root: root,
              formControl: formControl,
              spacer: spacer,
              actions: actions,
              title: title,
            },
          },
          rest,
          {
            key: key,
          },
        ),
      );
    },
  },
  download: {
    //label: "Download",
    tooltip: function tooltip(_ref2) {
      var namePluralText = _ref2.namePluralText;
      return 'Download all '.concat(namePluralText, ' in CSV');
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
      //TODO add function call onExport
      var actions = props.actions,
        options = props.options,
        searchOptions = props.searchOptions,
        exportOptions = props.exportOptions;

      if (actions) {
        actions.onExport(
          'csv',
          [],
          _objectSpread(_objectSpread({}, options), searchOptions),
          exportOptions || {},
        );
      } else {
        console.error('Exports Service is not injected');
      }
    },
  },
  pdf: {
    //label: "Download Pdf",
    tooltip: function tooltip(_ref3) {
      var namePluralText = _ref3.namePluralText;
      return 'Download all '.concat(namePluralText, ' in pdf');
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
    onClick: function onClick(_ref4) {
      var data = _ref4.data,
        exportsService = _ref4.exportsService,
        nameSingularText = _ref4.nameSingularText;

      if (exportsService) {
        //TODO load all data
        var entities = data;

        if (!entities || entities.length === 0) {
          (0, _sweetalert['default'])({
            text: 'No '.concat(nameSingularText, ' data available to export as PDF.'),
            icon: 'warning',
          });
        } else {
          exportsService.exportPDF(entities);
        }
      } else {
        console.error('Exports Service is not injected');
      }
    },
  },
  print: {
    //label: "Print",
    tooltip: function tooltip(_ref5) {
      var namePluralText = _ref5.namePluralText;
      return 'Print all '.concat(namePluralText);
    },
    icon: /*#__PURE__*/ _react['default'].createElement(_Print['default'], null),
    onClick: function onClick(_ref6) {
      var data = _ref6.data,
        exportsService = _ref6.exportsService,
        nameSingularText = _ref6.nameSingularText;

      if (exportsService) {
        //TODO load all data
        var entities = data;

        if (!entities || entities.length === 0) {
          (0, _sweetalert['default'])({
            text: 'No '.concat(nameSingularText, ' data available for printing.'),
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
  filter: {
    //label: "Filter",
    tooltip: 'Filter',
    icon: /*#__PURE__*/ _react['default'].createElement(_FilterList['default'], null),
    onClick: function onClick(props) {
      if (props.actions && props.actions.onViewFilter) {
        props.actions.onViewFilter();
      }
    },
  },
  refresh: {
    tooltip: 'Refresh',
    icon: /*#__PURE__*/ _react['default'].createElement(_Refresh['default'], null),
    onClick: function onClick(props) {
      if (props.actions && props.actions.onRefresh) {
        props.actions.onRefresh();
      }
    },
  },
};
exports.headerButtons = headerButtons;

var getToolbarButtons = function getToolbarButtons(buttons) {
  var finialButtons = {};

  if (buttons) {
    finialButtons = (0, _utilities.mergeButtons)(buttons, headerButtons);

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

exports.getToolbarButtons = getToolbarButtons;
