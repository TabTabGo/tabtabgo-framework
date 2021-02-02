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

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _reactRouter = require('react-router');

var _core = require('@material-ui/core');

var _Form = _interopRequireDefault(require('../../components/Validations/Form'));

var _ContentWrapper = _interopRequireDefault(require('layouts/components/Content/ContentWrapper'));

var _sweetalert = _interopRequireDefault(require('sweetalert'));

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

var EntityEdit = /*#__PURE__*/ (function (_React$Component) {
  _inherits(EntityEdit, _React$Component);

  var _super = _createSuper(EntityEdit);

  function EntityEdit(props) {
    var _this;

    _classCallCheck(this, EntityEdit);

    _this = _super.call(this, props);

    _this.goBack = function () {
      _this.isCancelling = true;

      if (_this.props.onCancel) {
        _this.props.onCancel();
      }

      if (_this.props.history) {
        if (_this.props.reset && _this.props.resetOnCancel === true) {
          _this.props.reset();
        }

        _this.props.history.goBack();
      }
    };

    _this.state = {
      enableEdit: true,
      allowLeave: false,
    };
    return _this;
  } //TODO convert to hooks and Typescript

  _createClass(EntityEdit, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function UNSAFE_componentWillMount() {
        var _this2 = this;

        var _this$props = this.props,
          match = _this$props.match,
          keyField = _this$props.keyField,
          mode = _this$props.mode,
          defaultEntity = _this$props.defaultEntity,
          entity = _this$props.entity;
        var id = match.params ? match.params.id : '0';

        if (
          !isNaN(id) &&
          entity &&
          (!entity[keyField] || entity[keyField].toString() !== match.params.id.toString())
        ) {
          this.props.getEntity(match.params.id, function (entity) {
            _this2.props.initializeForm(entity);
          });
        } else if (mode === 'add' && defaultEntity) {
          this.props.initializeForm(defaultEntity);
        } else {
          //console.log("Init current Entity");
          this.props.initializeForm(entity);
        }
      },
    },
    {
      key: 'handleSave',
      value: function handleSave(entity, e) {
        var _this3 = this;

        var _this$props2 = this.props,
          reset = _this$props2.reset,
          onSubmitForm = _this$props2.onSubmitForm,
          ignoreReset = _this$props2.ignoreReset;

        if (onSubmitForm) {
          onSubmitForm(entity);
        } else {
          this.props.actions.saveEntity(entity, {
            onSuccess: function onSuccess() {
              if (reset && !ignoreReset) reset();

              _this3.setState(
                {
                  allowLeave: true,
                },
                function () {
                  window.history.back();
                },
              );
            },
          });
        }
      },
    },
    {
      key: 'handleGoBack',
      value: function handleGoBack() {
        var _this4 = this;

        if (this.props.dirty === true) {
          this.setState(
            {
              allowLeave: true,
            },
            function () {
              (0, _sweetalert['default'])({
                title: 'Are you sure want to leave this page?',
                text: 'You have pending changes not saved yet',
                icon: 'warning',
                buttons: ['No', 'Yes'],
                dangerMode: true,
              }).then(function (cancel) {
                if (cancel) {
                  _this4.goBack();
                }
              });
            },
          );
        } else {
          this.goBack();
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props3 = this.props,
          header = _this$props3.header,
          footer = _this$props3.footer,
          entity = _this$props3.entity,
          displayField = _this$props3.displayField,
          nameSingular = _this$props3.nameSingular,
          namePluralText = _this$props3.namePluralText,
          nameSingularText = _this$props3.nameSingularText,
          title = _this$props3.title,
          submitting = _this$props3.submitting,
          dirty = _this$props3.dirty,
          pristine = _this$props3.pristine,
          invalid = _this$props3.invalid,
          handleSubmit = _this$props3.handleSubmit,
          ignoreFormDirty = _this$props3.ignoreFormDirty,
          extraActions = _this$props3.extraActions;
        var disableSubmit = invalid || submitting || pristine;

        if (ignoreFormDirty) {
          disableSubmit = false;
        } //disabled={submitting || !dirty}

        footer = footer
          ? footer(
              _objectSpread(
                {
                  enableEdit: this.state.enableEdit,
                },
                this.props,
              ),
            )
          : /*#__PURE__*/ _react['default'].createElement(
              'div',
              {
                className: 'clearfix',
              },
              /*#__PURE__*/ _react['default'].createElement(
                'div',
                {
                  className: 'pull-right',
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _core.Button,
                  {
                    className: 'btn btn-default ml',
                    onClick: this.handleGoBack.bind(this),
                  },
                  'Cancel',
                ),
                /*#__PURE__*/ _react['default'].createElement(
                  _core.Button,
                  {
                    type: 'submit',
                    className: 'btn btn-primary',
                    disabled: disableSubmit,
                  },
                  'save',
                ),
              ),
              extraActions,
            );
        header =
          header ||
          /*#__PURE__*/ _react['default'].createElement(
            'div',
            null,
            /*#__PURE__*/ _react['default'].createElement('h2', null, nameSingularText),
            /*#__PURE__*/ _react['default'].createElement(
              'h1',
              null,
              /*#__PURE__*/ _react['default'].createElement(
                'span',
                {
                  className: 'primary',
                },
                entity ? getDisplayValue(entity, displayField) : '',
              ),
            ),
          );
        title = title || namePluralText;
        return /*#__PURE__*/ _react['default'].createElement(
          _ContentWrapper['default'],
          null,
          /*#__PURE__*/ _react['default'].createElement(
            'div',
            {
              className: 'content-heading',
            },
            /*#__PURE__*/ _react['default'].createElement(_reactRouter.Prompt, {
              when: !this.state.allowLeave && dirty && !this.isCancelling,
              message: 'You have pending changes not saved yet. Are you sure want to leave?',
            }),
            title,
            this.props.enableSubtitle
              ? /*#__PURE__*/ _react['default'].createElement('small', null, this.props.subtitle)
              : '',
            /*#__PURE__*/ _react['default'].createElement(
              'small',
              null,
              /*#__PURE__*/ _react['default'].createElement(
                'a',
                {
                  onClick: this.handleGoBack.bind(this),
                },
                /*#__PURE__*/ _react['default'].createElement('i', {
                  className: 'fa fa-arrow-circle-left',
                }),
                '  ',
                'Back',
              ),
            ),
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _core.Paper,
            {
              className: 'adpe-entity' + (this.props.flags.loading ? ' whirl traditional' : ''),
            },
            /*#__PURE__*/ _react['default'].createElement(
              _Form['default'],
              {
                id: 'formEdit' + nameSingular,
                onSubmit: handleSubmit(this.handleUpdate.bind(this)),
              },
              this.props.children,
            ),
          ),
        );
      },
    },
  ]);

  return EntityEdit;
})(_react['default'].Component);

EntityEdit.defaultProps = {
  resetOnCancel: true,
};
EntityEdit.propTypes = {
  namePlural: _propTypes['default'].string.isRequired,
  nameSingular: _propTypes['default'].string.isRequired,
  namePluralText: _propTypes['default'].string,
  nameSingularText: _propTypes['default'].string,
  flags: _propTypes['default'].array,
  enableSubtitle: _propTypes['default'].bool,
  header: _propTypes['default'].element,
  footer: _propTypes['default'].func,
  displayField: _propTypes['default'].oneOfType([
    _propTypes['default'].string,
    _propTypes['default'].func,
  ]).isRequired,
  resetOnCancel: _propTypes['default'].bool,
  onCancel: _propTypes['default'].func,
  children: _propTypes['default'].node,
  entity: _propTypes['default'].object.isRequired,
};
var _default = EntityEdit;
exports['default'] = _default;
