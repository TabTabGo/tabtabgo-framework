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
exports['default'] = exports.EditEntityModalContext = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _core = require('@material-ui/core');

var _Close = _interopRequireDefault(require('@material-ui/icons/Close'));

var _styles = require('@material-ui/core/styles');

var _Form = _interopRequireDefault(require('ttg-react/web/components/Validations/Form.jsx'));

var _Button = _interopRequireDefault(require('ttg-react/web/components/Validations/Button.jsx'));

var _immutabilityHelper = _interopRequireDefault(require('immutability-helper'));

var _utilities = require('ttg-react/web/components/Buttons/utilities');

var _utilities2 = require('../../../core/utilities');

var _lodash = _interopRequireDefault(require('lodash'));

var _editModalStyle = _interopRequireDefault(require('../styles/editModalStyle.jsx'));

var _ActionTypes = _interopRequireDefault(require('../ActionTypes'));

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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
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

function Transition(props) {
  return /*#__PURE__*/ _react['default'].createElement(
    _core.Slide,
    _extends(
      {
        direction: 'up',
      },
      props,
    ),
  );
}

var EditEntityModalContext = /*#__PURE__*/ _react['default'].createContext();

exports.EditEntityModalContext = EditEntityModalContext;

var EntityEditModal = /*#__PURE__*/ (function (_React$Component) {
  _inherits(EntityEditModal, _React$Component);

  var _super = _createSuper(EntityEditModal);

  function EntityEditModal() {
    var _this;

    _classCallCheck(this, EntityEditModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      entity: _this.props.entity,
      changes: {},
      loading: false,
    };
    _this.actionTypes = (0, _ActionTypes['default'])(_this.props.namePlural);

    _this.handleChangeProperty = function (propName, value) {
      var entity = (0, _immutabilityHelper['default'])(
        _this.state.entity,
        _defineProperty({}, propName, {
          $set: value,
        }),
      );
      var changes = (0, _immutabilityHelper['default'])(
        _this.state.changes,
        _defineProperty({}, propName, {
          $set: value,
        }),
      );

      _this.setState({
        entity: entity,
        changes: changes,
      });
    };

    _this.handleClose = function () {
      var _this$props = _this.props,
        onClose = _this$props.onClose,
        defaultEntity = _this$props.defaultEntity;

      _this.setState({
        entity: defaultEntity,
      });

      if (onClose) onClose(_this.state.entity, true);
    };

    _this.handleOnSaveSuccess = function (succeededEntity, closeAfterSave) {
      var onClose = _this.props.onClose;
      if (closeAfterSave && onClose) onClose(succeededEntity);
      else {
        _this.setState({
          entity: succeededEntity,
          originalEntity: succeededEntity,
        });
      }
    };

    _this.handleSave = function (closeAfterSave) {
      var _this$props2 = _this.props,
        onSubmit = _this$props2.onSubmit,
        saveProps = _this$props2.saveProps,
        useSaveChanges = _this$props2.useSaveChanges,
        keyField = _this$props2.keyField,
        originalEntity = _this$props2.originalEntity;
      var _this$state = _this.state,
        entity = _this$state.entity,
        changes = _this$state.changes;

      if (onSubmit) {
        onSubmit(entity, changes);
      } else if (useSaveChanges) {
        _this.props.actions.saveEntityChanges(entity[keyField], entity, changes, originalEntity, {
          properties: saveProps,
          onSuccess: function onSuccess(succeededEntity) {
            return _this.handleOnSaveSuccess(succeededEntity, closeAfterSave);
          },
        });
      } else {
        _this.props.actions.saveEntity(entity, {
          properties: saveProps,
          onSuccess: function onSuccess(succeededEntity) {
            return _this.handleOnSaveSuccess(succeededEntity, closeAfterSave);
          },
        });
      }
    };

    return _this;
  }

  _createClass(
    EntityEditModal,
    [
      {
        key: 'componentDidMount',
        value: (function () {
          var _componentDidMount = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
              var _this$props3, reloadEntity, service, keyField, expandProperties, entity;

              return regeneratorRuntime.wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        (_this$props3 = this.props),
                          (reloadEntity = _this$props3.reloadEntity),
                          (service = _this$props3.service),
                          (keyField = _this$props3.keyField),
                          (expandProperties = _this$props3.expandProperties);

                        if (!(reloadEntity && service && this.props.entity[keyField])) {
                          _context.next = 14;
                          break;
                        }

                        _context.prev = 2;
                        this.setState({
                          loading: true,
                        });
                        _context.next = 6;
                        return service.getEntity(this.props.entity[keyField], expandProperties);

                      case 6:
                        entity = _context.sent;
                        this.setState({
                          entity: entity,
                          loading: false,
                        });
                        _context.next = 14;
                        break;

                      case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](2);
                        console.log('Failed load Entity;', _context.t0);
                        this.setState({
                          loading: false,
                        });

                      case 14:
                      case 'end':
                        return _context.stop();
                    }
                  }
                },
                _callee,
                this,
                [[2, 10]],
              );
            }),
          );

          function componentDidMount() {
            return _componentDidMount.apply(this, arguments);
          }

          return componentDidMount;
        })(),
      },
      {
        key: 'render',
        value: function render() {
          var _this$props4 = this.props,
            header = _this$props4.header,
            footer = _this$props4.footer,
            displayField = _this$props4.displayField,
            nameSingular = _this$props4.nameSingular,
            nameSingularText = _this$props4.nameSingularText,
            title = _this$props4.title,
            mode = _this$props4.mode,
            flags = _this$props4.flags,
            fullScreen = _this$props4.fullScreen,
            classes = _this$props4.classes,
            editButtons = _this$props4.buttons.editButtons;
          title = title || nameSingularText;
          var saving =
            flags.saving || mode === 'Edit'
              ? flags[this.actionTypes.update]
              : flags[this.actionTypes.add];
          var error = flags.error
            ? mode === 'Edit'
              ? flags.error[this.actionTypes.update]
              : flags.error[this.actionTypes.add]
            : null;
          var defaultButtons =
            mode === 'Edit'
              ? {
                  cancel: {
                    label: 'Cancel',
                    color: 'default',
                    alignment: 'left',
                    component: _core.Button,
                    onClick: this.handleClose.bind(this),
                  },
                  save: {
                    label: 'Save',
                    color: 'primary',
                    alignment: 'right',
                    component: _Button['default'],
                    onClick: this.handleSave.bind(this, false),
                  },
                  saveAndClose: {
                    label: 'Save and Close',
                    color: 'primary',
                    alignment: 'right',
                    type: 'submit',
                    component: _Button['default'],
                    onClick: this.handleSave.bind(this, true),
                  },
                }
              : {
                  cancel: {
                    label: 'Cancel',
                    color: 'default',
                    alignment: 'left',
                    component: _core.Button,
                    onClick: this.handleClose.bind(this),
                  },
                  saveAndClose: {
                    label: 'Add '.concat(title),
                    color: 'primary',
                    alignment: 'right',
                    type: 'submit',
                    component: _Button['default'],
                    onClick: this.handleSave.bind(this, true),
                  },
                };
          var buttons = (0, _utilities.mergeButtons)(editButtons, defaultButtons);
          var actionButtons = Object.keys(buttons).map(function (buttonKey, key) {
            var button = buttons[buttonKey];

            if (button) {
              var ButtonComponent = button.component || _core.Button;
              return /*#__PURE__*/ _react['default'].createElement(
                ButtonComponent,
                {
                  key: key,
                  onClick: button.onClick,
                  color: button.color,
                  type: button.type || 'button',
                  disabled: saving || flags.loading, //isBusy={saving}
                },
                button.label,
              );
            }

            return null;
          });
          var entity = this.state.entity;
          var displayText = (0, _utilities2.getDisplayValue)(entity, displayField);

          var errorContainer =
            !saving &&
            error &&
            /*#__PURE__*/ _react['default'].createElement(
              'div',
              {
                className: classes.errorContainer,
              },
              /*#__PURE__*/ _react['default'].createElement(
                'strong',
                null,
                'Error '.concat(mode === 'Add' ? 'adding' : 'saving', ' ').concat(nameSingularText),
              ),
              error && error.message && ' '.concat(error.message),
            ); //disabled={submitting || !dirty}

          if (footer) {
            footer = footer(
              _objectSpread(
                {
                  onClose: this.handleClose.bind(this),
                  onSave: this.handleSave.bind(this),
                },
                this.props,
              ),
            );
          } else {
            if (!fullScreen) {
              footer = /*#__PURE__*/ _react['default'].createElement(
                _core.DialogActions,
                null,
                errorContainer,
                actionButtons,
                saving &&
                  /*#__PURE__*/ _react['default'].createElement(
                    'div',
                    {
                      className: classes.progressWrapper,
                    },
                    /*#__PURE__*/ _react['default'].createElement(_core.CircularProgress, {
                      size: 24,
                    }),
                  ),
              );
            } else {
              footer = /*#__PURE__*/ _react['default'].createElement(
                _core.DialogActions,
                null,
                errorContainer,
              );
            }
          }

          var dialogTitle =
            mode === 'Edit'
              ? 'Edit '
                  .concat(title, ' ')
                  .concat(displayText && displayText !== '' ? '('.concat(displayText, ')') : '')
              : 'Add New '
                  .concat(title, ' ')
                  .concat(displayText && displayText !== '' ? '(' + displayText + ')' : '');

          if (header) {
            header = header(
              _objectSpread(
                {
                  onClose: this.handleClose.bind(this),
                  onSave: this.handleSave.bind(this),
                },
                this.props,
              ),
            );
          } else {
            if (fullScreen) {
              header = /*#__PURE__*/ _react['default'].createElement(
                _core.AppBar,
                {
                  className: classes.appBar,
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _core.Toolbar,
                  null,
                  /*#__PURE__*/ _react['default'].createElement(
                    _core.IconButton,
                    {
                      edge: 'start',
                      color: 'inherit',
                      onClick: this.handleClose.bind(this),
                      'aria-label': 'close',
                    },
                    /*#__PURE__*/ _react['default'].createElement(_Close['default'], null),
                  ),
                  /*#__PURE__*/ _react['default'].createElement(
                    _core.Typography,
                    {
                      variant: 'h6',
                      className: classes.fullScreenTitle,
                    },
                    dialogTitle,
                  ),
                  actionButtons,
                  saving &&
                    /*#__PURE__*/ _react['default'].createElement(
                      'div',
                      {
                        className: classes.progressWrapper,
                      },
                      /*#__PURE__*/ _react['default'].createElement(_core.CircularProgress, {
                        size: 24,
                        color: 'secondary',
                      }),
                    ),
                ),
              );
            } else {
              header = /*#__PURE__*/ _react['default'].createElement(
                _core.DialogTitle,
                {
                  id: ''.concat(mode, '-').concat(nameSingular, '-dialog-title'),
                },
                dialogTitle,
              );
            }
          }

          title = title || nameSingularText;
          return /*#__PURE__*/ _react['default'].createElement(
            _core.Dialog,
            {
              fullWidth: this.props.fullWidth,
              maxWidth: this.props.maxWidth,
              open: this.props.open,
              onClose: this.handleClose.bind(this),
              TransitionComponent: Transition,
              disableEscapeKeyDown: true,
              disableBackdropClick: true,
              fullScreen: fullScreen,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _Form['default'],
              {
                onValidate: this.props.onValidate,
              },
              header,
              /*#__PURE__*/ _react['default'].createElement(
                _core.DialogContent,
                {
                  className: classes.dialogContent,
                },
                /*#__PURE__*/ _react['default'].createElement(
                  EditEntityModalContext.Provider,
                  {
                    value: {
                      entity: this.state.entity,
                      loading: this.state.loading,
                      changeProperty: this.handleChangeProperty,
                    },
                  },
                  this.props.children,
                ),
              ),
              footer,
            ),
          );
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        // TODO do really need it
        value: function getDerivedStateFromProps(nextProps, prevState) {
          if (
            _lodash['default'].isEqual(prevState.entity, nextProps.defaultEntity) &&
            !_lodash['default'].isEmpty(nextProps.entity)
          ) {
            //console.log("changeState");
            return {
              entity: nextProps.entity,
            };
          } else return null;
        },
      },
    ],
  );

  return EntityEditModal;
})(_react['default'].Component);

EntityEditModal.defaultProps = {
  maxWidth: 'md',
  fullWidth: false,
};
EntityEditModal.defaultProps = {
  resetOnCancel: true,
  mode: 'Edit',
};
EntityEditModal.propTypes = {
  classes: _propTypes['default'].object,
  children: _propTypes['default'].oneOfType([
    _propTypes['default'].arrayOf(_propTypes['default'].node),
    _propTypes['default'].node,
  ]),
  mode: _propTypes['default'].oneOf(['Edit', 'Add']),
  open: _propTypes['default'].bool,
  title: _propTypes['default'].string,
  entity: _propTypes['default'].object.isRequired,
  namePlural: _propTypes['default'].string.isRequired,
  nameSingular: _propTypes['default'].string.isRequired,
  displayField: _propTypes['default'].oneOfType([
    _propTypes['default'].string,
    _propTypes['default'].func,
  ]).isRequired,
  keyField: _propTypes['default'].string.isRequired,
  originalEntity: _propTypes['default'].object,
  defaultEntity: _propTypes['default'].object,
  namePluralText: _propTypes['default'].string,
  nameSingularText: _propTypes['default'].string,
  actions: _propTypes['default'].object,
  flags: _propTypes['default'].object,
  header: _propTypes['default'].func,
  footer: _propTypes['default'].func,
  onValidate: _propTypes['default'].func,
  onSubmit: _propTypes['default'].func,
  onClose: _propTypes['default'].func,
  buttons: _propTypes['default'].object,
  maxWidth: _propTypes['default'].oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  fullWidth: _propTypes['default'].bool,
  fullScreen: _propTypes['default'].bool,
  reloadEntity: _propTypes['default'].bool,
  service: _propTypes['default'].object,
  saveProps: _propTypes['default'].object,
  useSaveChanges: _propTypes['default'].bool,
  expandProperties: _propTypes['default'].string,
};

var _default = (0, _styles.withStyles)(_editModalStyle['default'])(EntityEditModal);

exports['default'] = _default;
