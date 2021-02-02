'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _core = require('@material-ui/core');

var _DataTable = _interopRequireDefault(require('./DataTable'));

var _Buttons = require('ttg-react/web/components/Buttons');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (_typeof(obj) !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

//import update from "immutability-helper";
// class Transition extends React.Component {
//   return() {
//     return <Slide direction="up" {...this.props} />;
//   }
// }
var ListModal = /*#__PURE__*/ (function (_Component) {
  _inherits(ListModal, _Component);

  var _super = _createSuper(ListModal);

  function ListModal() {
    var _this;

    _classCallCheck(this, ListModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      selectedEntities: [],
    };

    _this.handleSave = function (closeModal) {
      var onSave = _this.props.onSave;

      if (onSave) {
        onSave(_this.state.selectedEntities, closeModal);
      }
    };

    _this.handleOnRowSelectionChange = function (selections) {
      _this.setState({
        selectedEntities: selections,
      });
    };

    return _this;
  }

  _createClass(ListModal, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
          open = _this$props.open,
          fullWidth = _this$props.fullWidth,
          maxWidth = _this$props.maxWidth,
          onClose = _this$props.onClose,
          title = _this$props.title,
          flags = _this$props.flags,
          buttonsOptions = _this$props.buttonsOptions,
          rowOptions = _this$props.rowOptions,
          rest = _objectWithoutProperties(_this$props, [
            'open',
            'fullWidth',
            'maxWidth',
            'onClose',
            'title',
            'flags',
            'buttonsOptions',
            'rowOptions',
          ]);

        var loading = flags.loading,
          saving = flags.saving;
        var selectedEntities = this.state.selectedEntities; //console.log('flags :', flags);
        //select row options
        // TODO to add selected item to state instead of redux

        var rowSelectionProps = _objectSpread(
          {
            mode: 'checkbox',
            className: 'info',
          },
          rowOptions,
        );

        var dataTableButtons = {
          rowButtons: {
            view: false,
            edit: false,
          },
          headerButtons: {
            download: false,
            print: false,
            pdf: false,
            viewColumn: true,
            add: false,
            search: true,
            filter: true,
            refresh: true,
          },
          selectionButtons: {
            download: false,
            print: false,
            pdf: false,
            delete: false,
          },
          dialogButtons: {
            cancel: {
              label: 'Cancel',
              color: 'default',
              alignment: 'left',
              component: _core.Button,
              onClick: onClose,
              disabled: loading || saving,
            },
            save: {
              label: 'Save',
              color: 'primary',
              alignment: 'right',
              component: _core.Button,
              onClick: this.handleSave.bind(this, false),
              disabled: selectedEntities.length === 0 || saving,
            },
            saveAndClose: {
              label: 'Save and Close',
              color: 'primary',
              alignment: 'right',
              type: 'submit',
              component: function component(props) {
                return /*#__PURE__*/ _react['default'].createElement(
                  _core.Button,
                  props,
                  saving
                    ? /*#__PURE__*/ _react['default'].createElement(_core.CircularProgress, {
                        size: 24,
                      })
                    : props.children,
                );
              },
              onClick: this.handleSave.bind(this, true),
              disabled: selectedEntities.length === 0 || saving,
            },
          },
        };

        if (buttonsOptions) {
          dataTableButtons = (0, _Buttons.mergeButtonSections)(buttonsOptions, dataTableButtons);
        } //console.log('dataTableButtons :', dataTableButtons);

        if (rest.enableSelection) {
          rowSelectionProps.onRowSelectionChange = this.handleOnRowSelectionChange;
        }

        var dataTableTitle = title || this.props.namePluralText || this.props.namePlural; //disabled={submitting || !dirty}

        return /*#__PURE__*/ _react['default'].createElement(
          _core.Dialog,
          {
            fullWidth: fullWidth,
            maxWidth: maxWidth,
            open: open,
            onClose: onClose,
            scroll: 'paper',
            TransitionComponent: _core.Fade,
          },
          /*#__PURE__*/ _react['default'].createElement(
            _core.DialogContent,
            null,
            /*#__PURE__*/ _react['default'].createElement(
              _DataTable['default'],
              _extends({}, rest, {
                title: dataTableTitle,
                flags: flags,
                buttonsOptions: dataTableButtons,
                rowOptions: rowSelectionProps,
              }),
            ),
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _core.DialogActions,
            null,
            Object.keys(dataTableButtons.dialogButtons).map(function (buttonKey, key) {
              var button = dataTableButtons.dialogButtons[buttonKey];

              if (button) {
                var ButtonComponent = button.component || _core.Button;
                var disabled = false;

                if (typeof button.disabled === 'function') {
                  disabled = button.disabled(_this2.state);
                } else {
                  disabled = button.disabled;
                }

                return /*#__PURE__*/ _react['default'].createElement(
                  ButtonComponent,
                  {
                    key: key,
                    onClick: button.onClick,
                    color: button.color,
                    type: button.type || 'button',
                    disabled: disabled,
                  },
                  button.label,
                );
              }

              return null;
            }),
          ),
        );
      },
    },
  ]);

  return ListModal;
})(_react.Component);

ListModal.propTypes = {
  columns: _propTypes['default'].arrayOf(_propTypes['default'].shape({})).isRequired,
  title: _propTypes['default'].string,
  dataTableTitle: _propTypes['default'].string,
  openEditInNewPage: _propTypes['default'].bool,
  classes: _propTypes['default'].any,
  styles: _propTypes['default'].any,
  searchKeys: _propTypes['default'].array.isRequired,
  searchOptions: _propTypes['default'].shape({
    searchUrl: _propTypes['default'].string,
    expand: _propTypes['default'].string,
    order: _propTypes['default'].oneOf(['asc', 'desc']),
    orderBy: _propTypes['default'].string,
  }),
  filters: _propTypes['default'].array,
  filterOptions: _propTypes['default'].shape({}),
  // Entity Props
  keyField: _propTypes['default'].string.isRequired,
  displayField: _propTypes['default'].oneOfType([
    _propTypes['default'].string,
    _propTypes['default'].func,
  ]).isRequired,
  namePlural: _propTypes['default'].string.isRequired,
  namePluralText: _propTypes['default'].string,
  nameSingular: _propTypes['default'].string.isRequired,
  nameSingularText: _propTypes['default'].string,
  // reducer props
  searchResult: _propTypes['default'].shape({}),
  flags: _propTypes['default'].object.isRequired,
  actions: _propTypes['default'].shape({}),
  // extra options
  tableOptions: _propTypes['default'].object,
  buttonsOptions: _propTypes['default'].shape({
    headerButtons: _propTypes['default'].oneOfType([
      _propTypes['default'].object,
      _propTypes['default'].bool,
    ]),
    rowButtons: _propTypes['default'].oneOfType([
      _propTypes['default'].object,
      _propTypes['default'].bool,
    ]),
    selectionButtons: _propTypes['default'].oneOfType([
      _propTypes['default'].object,
      _propTypes['default'].bool,
    ]),
    contentButtons: _propTypes['default'].oneOfType([
      _propTypes['default'].object,
      _propTypes['default'].bool,
    ]),
    dialogButtons: _propTypes['default'].oneOfType([
      _propTypes['default'].object,
      _propTypes['default'].bool,
    ]),
  }),
  selectRowOptions: _propTypes['default'].object,
  exportsService: _propTypes['default'].shape({
    columns: _propTypes['default'].arrayOf(_propTypes['default'].any),
    fileName: _propTypes['default'].string,
    pageTitle: _propTypes['default'].string,
    namePlural: _propTypes['default'].string,
  }),
  open: _propTypes['default'].bool,
  fullWidth: _propTypes['default'].any,
  maxWidth: _propTypes['default'].any,
  onClose: _propTypes['default'].func,
  onSave: _propTypes['default'].func,
  scroll: _propTypes['default'].oneOf(['paper', 'body']),
  ignoreFormValidation: _propTypes['default'].bool,
  rowOptions: _propTypes['default'].any,
};
var _default = ListModal;
exports['default'] = _default;
