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
exports.ValidationFormConsumer = exports['default'] = exports.ValidationFormContext = void 0;

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _immutabilityHelper = _interopRequireDefault(require('immutability-helper'));

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

var ValidationFormContext = /*#__PURE__*/ _react['default'].createContext({});

exports.ValidationFormContext = ValidationFormContext;

var ValidationForm = /*#__PURE__*/ (function (_Component) {
  _inherits(ValidationForm, _Component);

  var _super = _createSuper(ValidationForm);

  function ValidationForm(_props) {
    var _this;

    _classCallCheck(this, ValidationForm);

    _this = _super.call(this, _props);

    _this.registerValidationInput = function (inputName, props) {
      if (!_this.state.validationInputs[inputName]) {
        var state = _objectSpread(
          {
            isDirty: false,
            isValid: true,
            validationError: null,
          },
          props,
        ); //console.log(`registerValidationInput ${inputName} :`, state);

        var newValidationInputs = Object.assign(
          _this.state.validationInputs,
          _defineProperty({}, inputName, state),
        );

        _this.updateFormState(newValidationInputs);
      }
    };

    _this.setValidationState = function (inputName) {
      var newState =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : {
              isDirty: false,
              isValid: true,
              validationError: null,
            };

      // console.log("inputName :", inputName);
      // console.log("newState :", newState);
      // console.log(`setValidationState ${inputName} :`, this.state.validationInputs);
      if (inputName) {
        var newValidationInputs = (0, _immutabilityHelper['default'])(
          _this.state.validationInputs,
          _defineProperty({}, inputName, {
            $merge: newState,
          }),
        );

        _this.updateFormState(newValidationInputs);
      }
    };

    _this.isDirty = function () {
      return _this.state.isDirty;
    };

    _this.isValid = function () {
      return _this.state.isValid;
    };

    _this.errors = function () {
      return Object.keys(_this.state.validationInputs)
        .filter(function (key) {
          return _this.state.validationInputs[key].validationError;
        }, _assertThisInitialized(_this))
        .map(function (key) {
          return _this.state.validationInputs[key].validationError;
        }, _assertThisInitialized(_this));
    };

    _this.getStats = function () {
      return {
        total: Object.keys(_this.state.validationInputs).length,
        dirty: Object.keys(_this.state.validationInputs).filter(function (key) {
          return _this.state.validationInputs[key].isDirty;
        }, _assertThisInitialized(_this)).length,
        valid: Object.keys(_this.state.validationInputs).filter(function (key) {
          return _this.state.validationInputs[key].isValid;
        }, _assertThisInitialized(_this)).length,
      };
    };

    _this.setFormState = function (state, callBack) {
      _this.setState(state, function () {
        if (callBack && typeof callBack === 'function') callBack(_this.state);
      });
    };

    _this.updateFormState = function (validationInputs) {
      var stateObj = {
        isDirty: false,
        isValid: true,
        validationInputs: validationInputs,
      }; //check for isDirty

      for (var key in validationInputs) {
        var inputState = validationInputs[key];

        if (inputState.isDirty) {
          stateObj.isDirty = inputState.isDirty;
          break;
        }
      } // check if input not valid or it is Required and not value passed

      for (var _key in validationInputs) {
        var _inputState = validationInputs[_key];

        if (!_inputState.isValid) {
          stateObj.isValid = _inputState.isValid;
          break;
        }
      } //console.log("stateObj:" , stateObj);

      _this.setState(stateObj, function () {
        if (_this.props.onValidate) {
          _this.props.onValidate(_this.state.isValid, _this.state.isDirty, _this.getStats());
        }
      });
    };

    _this.handleOnSubmit = /*#__PURE__*/ (function () {
      var _ref = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(event) {
          var onSubmit;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  event.persist();
                  onSubmit = _this.props.onSubmit;
                  _context.next = 4;
                  return _this.validate();

                case 4:
                  if (_this.state.isDirty && _this.state.isValid && onSubmit) {
                    onSubmit(event, function () {
                      _this.setState({
                        isDirty: false,
                      });
                    });
                  }

                  event.preventDefault();

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee);
        }),
      );

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    })();

    _this.handleOnRest = function (event) {
      var onReset = _this.props.onReset;

      if (_this.state.isDirty) {
        //TODO add confirmation to lose data
      }

      if (onReset) {
        onReset(event);
        event.preventDefault();
      }
    };

    _this.validate = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
        var isValid, isDirty, key, inputState, validation;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                isValid = true;
                isDirty = false; // check if input not valid or it is Required and not value passed

                _context2.t0 = regeneratorRuntime.keys(_this.state.validationInputs);

              case 3:
                if ((_context2.t1 = _context2.t0()).done) {
                  _context2.next = 13;
                  break;
                }

                key = _context2.t1.value;
                inputState = _this.state.validationInputs[key];
                _context2.next = 8;
                return inputState.validate();

              case 8:
                validation = _context2.sent;

                if (!validation.isValid) {
                  isValid = validation.isValid; //break; //To validate all data
                }

                isDirty = isDirty || validation.isDirty;
                _context2.next = 3;
                break;

              case 13:
                _this.setState(
                  {
                    isValid: isValid,
                    isDirty: isDirty,
                  },
                  function () {
                    if (_this.props.onValidate) {
                      _this.props.onValidate(
                        _this.state.isValid,
                        _this.state.isDirty,
                        _this.getStats(),
                      );
                    }
                  },
                );

                return _context2.abrupt('return', {
                  isValid: isValid,
                  isDirty: isDirty,
                });

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2);
      }),
    );
    _this.state = {
      isDirty: false,
      isValid: true,
      validationErrors: [],
      validationInputs: {},
    };
    return _this;
  }

  _createClass(ValidationForm, [
    {
      key: 'render',
      value: function render() {
        // eslint-disable-next-line no-unused-vars
        var _this$props = this.props,
          onValidate = _this$props.onValidate,
          rest = _objectWithoutProperties(_this$props, ['onValidate']);

        return /*#__PURE__*/ _react['default'].createElement(
          ValidationFormContext.Provider,
          {
            value: {
              isDirty: this.state.isDirty,
              isValid: this.state.isValid,
              validate: this.validate.bind(this),
              validationErrors: this.errors(),
              setFormState: this.setFormState.bind(this),
              setValidationState: this.setValidationState.bind(this),
              registerValidationInput: this.registerValidationInput.bind(this),
            },
          },
          /*#__PURE__*/ _react['default'].createElement(
            'form',
            _extends({}, rest, {
              onSubmit: this.handleOnSubmit.bind(this),
              onReset: this.handleOnRest.bind(this),
            }),
            this.props.children,
          ),
        );
      },
    },
  ]);

  return ValidationForm;
})(_react.Component);

exports['default'] = ValidationForm;
ValidationForm.propTypes = {
  onValidate: _propTypes['default'].func,
  onSubmit: _propTypes['default'].func,
  onReset: _propTypes['default'].func,
  children: _propTypes['default'].any,
};
var ValidationFormConsumer = ValidationFormContext.Consumer;
exports.ValidationFormConsumer = ValidationFormConsumer;
