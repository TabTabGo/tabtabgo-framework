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
exports['default'] = exports.DetailEntityContext = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _ContentWrapper = _interopRequireDefault(require('layouts/components/Content/ContentWrapper'));

var _Buttons = require('ttg-react/web/components/Buttons');

var _Edit = _interopRequireDefault(require('@material-ui/icons/Edit'));

var _Delete = _interopRequireDefault(require('@material-ui/icons/Delete'));

var _Print = _interopRequireDefault(require('@material-ui/icons/Print'));

var _utilities = require('../../../core/utilities');

var _core = require('@material-ui/core');

var _ConfirmationContext = require('../../contexts/ConfirmationContext');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

var DetailEntityContext = /*#__PURE__*/ _react['default'].createContext();

exports.DetailEntityContext = DetailEntityContext;

var EntityDetail = /*#__PURE__*/ (function (_React$Component) {
  _inherits(EntityDetail, _React$Component);

  var _super = _createSuper(EntityDetail);

  function EntityDetail() {
    var _this;

    _classCallCheck(this, EntityDetail);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      openEditModal: false,
      isEntityLoaded: false,
    };
    _this.defaultButtons = {
      edit: {
        onClick: function onClick(props) {
          return _this.handleOpenEntityModal(props);
        },
        tooltip: function tooltip(props) {
          var display = _this.getDisplayName(props);

          return 'Edit '.concat(display);
        },
        className: 'btn-third mb',
        icon: /*#__PURE__*/ _react['default'].createElement(_Edit['default'], null),
        disabled: false,
      },
      print: {
        tooltip: 'Print',
        onClick: _this.handlePrint.bind(_assertThisInitialized(_this)),
        className: 'mb',
        icon: /*#__PURE__*/ _react['default'].createElement(_Print['default'], null),
      },
      delete: {
        tooltip: 'Delete',
        onClick: _this.handleDelete.bind(_assertThisInitialized(_this)),
        className: 'btn-danger mb',
        icon: /*#__PURE__*/ _react['default'].createElement(_Delete['default'], null),
      },
    };

    _this.getPageButtons = function (buttons) {
      return /*#__PURE__*/ _react['default'].createElement(
        _Buttons.ToolbarButtons,
        _extends({}, _this.props, {
          buttons: buttons,
        }),
      );
    };

    _this.handleOnSortChange = function (property) {
      var searchResult = _this.props.searchResult;
      var orderBy = property;
      var order = 'desc';

      if (searchResult.orderBy === property && searchResult.order === 'desc') {
        order = 'asc';
      }

      _this.search({
        order: order,
        orderBy: orderBy,
      });
    };

    _this.handleOpenEntityModal = function (_ref) {
      var data = _ref.data;

      _this.setState({
        openEditModal: true,
        selectedEntity: data,
      });
    };

    _this.handleCloseEntityModal = function () {
      _this.setState({
        openEditModal: false,
      });
    };

    _this.getDisplayName = function (props) {
      var displayField = props.displayField,
        entity = props.entity;
      return (0, _utilities.getDisplayValue)(entity, displayField);
    };

    return _this;
  }

  _createClass(EntityDetail, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        var _this$props = this.props,
          match = _this$props.match,
          keyField = _this$props.keyField,
          disableAutoLoad = _this$props.disableAutoLoad,
          forceLoad = _this$props.forceLoad,
          flags = _this$props.flags,
          entity = _this$props.entity,
          expandProperties = _this$props.expandProperties,
          getEntity = _this$props.actions.getEntity;
        var id = match.params ? match.params.id : '0';
        console.log('id', id);

        if (
          forceLoad ||
          (!isNaN(id) &&
            !disableAutoLoad &&
            !flags.loading &&
            (!entity[keyField] || entity[keyField].toString() !== id.toString()))
        ) {
          var _entity$keyField;

          console.log(
            'load entity '
              .concat(id, '. Current entity ')
              .concat(
                (_entity$keyField = entity[keyField]) === null || _entity$keyField === void 0
                  ? void 0
                  : _entity$keyField.toString(),
              ),
          );
          getEntity(
            id,
            function (entity) {
              if (_this2.props.onEntityLoaded) {
                _this2.props.onEntityLoaded(entity);
              }

              _this2.setState({
                isEntityLoaded: true,
              });
            },
            expandProperties,
          );
        }
      },
    },
    {
      key: 'handleGoBack',
      value: function handleGoBack() {
        if (this.props.history) {
          this.props.history.goBack();
        }
      },
    },
    {
      key: 'handleEdit',
      value: function handleEdit() {
        var _this$props2 = this.props,
          history = _this$props2.history,
          location = _this$props2.location;
        history.push(location.pathname + '/edit');
      },
    },
    {
      key: 'handleDelete',
      value: function handleDelete() {
        var _this$props$nameSingu,
          _this$props$nameSingu2,
          _this3 = this;

        this.props.confirmationContext.confirmAction(
          'Delete '
            .concat(
              (_this$props$nameSingu = this.props.nameSingularText) !== null &&
                _this$props$nameSingu !== void 0
                ? _this$props$nameSingu
                : this.props.nameSingular,
              ' ',
            )
            .concat(this.getDisplayName(this.props)),
          'Are you sure you want to delete '
            .concat(
              (_this$props$nameSingu2 = this.props.nameSingularText) !== null &&
                _this$props$nameSingu2 !== void 0
                ? _this$props$nameSingu2
                : this.props.nameSingular,
              ' ',
            )
            .concat(this.getDisplayName(this.props), '?'),
          function () {
            _this3.props.actions.deleteEntity(_this3.props.entity);
          },
        );
      },
    },
    {
      key: 'handlePrint',
      value: function handlePrint() {
        this.props.actions.printEntity(this.props.entity);
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props3 = this.props,
          namePlural = _this$props3.namePlural,
          nameSingular = _this$props3.nameSingular,
          namePluralText = _this$props3.namePluralText,
          nameSingularText = _this$props3.nameSingularText,
          contentButtons = _this$props3.buttons.contentButtons,
          enableBack = _this$props3.enableBack,
          flags = _this$props3.flags,
          title = _this$props3.title,
          subtitle = _this$props3.subtitle,
          entity = _this$props3.entity,
          editComponent = _this$props3.editComponent,
          forceLoad = _this$props3.forceLoad,
          useCustomProgress = _this$props3.useCustomProgress;
        var EditComponent = this.props.EditComponent;
        if (editComponent) EditComponent = editComponent;
        if (!namePluralText) namePluralText = namePlural;
        if (!nameSingularText) nameSingularText = nameSingular;
        var loading = flags.loading;
        var displayText = this.getDisplayName(this.props);
        var pageButtons = (0, _Buttons.mergeButtons)(contentButtons, this.defaultButtons);
        title = title || nameSingular;

        for (var key in pageButtons) {
          if (pageButtons[key]) {
            var button = pageButtons[key];
            button.disabled = button.disabled || loading; //button.hide = button.hide || loading; only in case of loading disable button
          }
        }

        var computedTitle = nameSingular;
        var computedSubtitle = undefined;

        if (typeof title == 'function') {
          computedTitle = title(entity);
        } else if (title) {
          computedTitle = title;
        }

        if (typeof subtitle == 'function') {
          computedSubtitle = subtitle(entity);
        } else if (subtitle) {
          computedSubtitle = subtitle;
        } //enable/disable buttons for loading

        return /*#__PURE__*/ _react['default'].createElement(
          _ContentWrapper['default'],
          {
            title: displayText ? displayText : computedTitle,
            subtitle: computedSubtitle ? computedSubtitle : displayText ? computedTitle : undefined,
            enableBack: enableBack,
            actionComponent: this.getPageButtons(pageButtons),
            showHeader: false,
          },
          !useCustomProgress && (loading || (forceLoad && !this.state.isEntityLoaded))
            ? /*#__PURE__*/ _react['default'].createElement(_core.LinearProgress, {
                style: {
                  marginTop: -4,
                },
              })
            : null,
          /*#__PURE__*/ _react['default'].createElement(
            DetailEntityContext.Provider,
            {
              value: {
                entity: entity,
                flags: flags,
              },
            },
            this.props.children,
          ),
          !loading && EditComponent && this.state.openEditModal
            ? /*#__PURE__*/ _react['default'].createElement(
                EditComponent,
                _extends({}, this.props, {
                  open: this.state.openEditModal,
                  entity: entity,
                  onClose: this.handleCloseEntityModal.bind(this),
                  mode: this.state.mode,
                  reloadEntity: false,
                }),
              )
            : null,
        );
      },
    },
  ]);

  return EntityDetail;
})(_react['default'].Component);

EntityDetail.propTypes = {
  namePlural: _propTypes['default'].string.isRequired,
  nameSingular: _propTypes['default'].string.isRequired,
  namePluralText: _propTypes['default'].string,
  nameSingularText: _propTypes['default'].string,
  displayField: _propTypes['default'].oneOfType([
    _propTypes['default'].string,
    _propTypes['default'].func,
  ]).isRequired,
  actions: _propTypes['default'].object,
  buttons: _propTypes['default'].object,
  enableBack: _propTypes['default'].bool,
  flags: _propTypes['default'].object,
  title: _propTypes['default'].oneOfType([
    _propTypes['default'].string,
    _propTypes['default'].func,
    _propTypes['default'].object,
  ]),
  subtitle: _propTypes['default'].oneOfType([
    _propTypes['default'].string,
    _propTypes['default'].func,
    _propTypes['default'].object,
  ]),
  entity: _propTypes['default'].object,
  expandProperties: _propTypes['default'].string,
  EditComponent: _propTypes['default'].oneOfType([
    _propTypes['default'].node,
    _propTypes['default'].func,
  ]),
  editComponent: _propTypes['default'].oneOfType([
    _propTypes['default'].node,
    _propTypes['default'].func,
  ]),
  children: _propTypes['default'].any,
  history: _propTypes['default'].object,
  location: _propTypes['default'].object,
  searchResult: _propTypes['default'].object,
  match: _propTypes['default'].object,
  keyField: _propTypes['default'].string,
  disableAutoLoad: _propTypes['default'].bool,
  forceLoad: _propTypes['default'].bool,
  useCustomProgress: _propTypes['default'].bool,
  onEntityLoaded: _propTypes['default'].func,
  confirmationContext: _propTypes['default'].any,
};

var _default = (0, _ConfirmationContext.withConfirmation)(EntityDetail);

exports['default'] = _default;
