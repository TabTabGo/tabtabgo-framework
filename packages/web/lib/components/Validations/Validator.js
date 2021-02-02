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

var StandardValidations = _interopRequireWildcard(require('ttg-react/core/Validations.js'));

var StandardValidationsErrors = _interopRequireWildcard(
  require('ttg-react/core/ValidationErrors.js'),
);

var _withValidation = _interopRequireDefault(require('./withValidation'));

var _ComponentProvider = require('ttg-react/core/ComponentProvider');

var _utilities = require('ttg-react/core/utilities');

var _lodash = _interopRequireDefault(require('lodash'));

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

var Validator = /*#__PURE__*/ (function (_Component) {
  _inherits(Validator, _Component);

  var _super = _createSuper(Validator);

  function Validator(_props) {
    var _this;

    _classCallCheck(this, Validator);

    _this = _super.call(this, _props);

    _this.getValue = function (props) {
      var value = props.value;
      return value;
    };

    _this.getPlaceholder = function (props) {
      var name = props.name,
        id = props.id; //if (placeholder) return placeholder;

      if (name) return (0, _utilities.getFriendlyString)(name);
      if (id) (0, _utilities.getFriendlyString)(id);
      return 'This ';
    };

    _this.parseValidations = function (props) {
      var newValidations = {};
      var validations = props.validations,
        isRequired = props.isRequired;
      if (validations)
        for (var key in validations) {
          if (validations[key]) {
            var validation = validations[key];

            if (typeof validation === 'function') {
              newValidations[key] = validation;
            } else if (StandardValidations[key]) {
              if (typeof validation === 'boolean' && validation === true) {
                newValidations[key] = StandardValidations[key].bind(_assertThisInitialized(_this));
              } else if (typeof validation !== 'boolean') {
                newValidations[key] = StandardValidations[key].bind(
                  _assertThisInitialized(_this),
                  validation,
                );
              }
            } else {
              console.error(
                ''.concat(
                  key,
                  ' is not valid validator please pass valid standard validation or set validation function',
                ),
              );
            }
          }
        }

      if (isRequired && !newValidations.required) {
        newValidations = _objectSpread(
          _objectSpread({}, newValidations),
          {},
          {
            required: StandardValidations.required,
          },
        );
      }

      return newValidations;
    };

    _this.parseValidationErrors = function (props) {
      var newValidationsErrors = {};
      var validations = props.validations,
        validationErrors = props.validationErrors,
        isRequired = props.isRequired;

      if (validations) {
        for (var key in validations) {
          if (validations[key]) {
            var validation = validations[key];
            if (validationErrors && validationErrors[key])
              newValidationsErrors[key] = validationErrors[key];
            else {
              if (typeof validation !== 'boolean') {
                newValidationsErrors[key] = StandardValidationsErrors[key](
                  validation,
                  _this.getPlaceholder(_this.props),
                );
              } else {
                newValidationsErrors[key] = StandardValidationsErrors[key](
                  _this.getPlaceholder(_this.props),
                );
              }
            }
          }
        }
      }

      if (isRequired && validationErrors && validationErrors.required) {
        newValidationsErrors = _objectSpread(
          _objectSpread({}, newValidationsErrors),
          {},
          {
            required: validationErrors.required,
          },
        );
      } else {
        newValidationsErrors = _objectSpread(
          _objectSpread({}, newValidationsErrors),
          {},
          {
            required: StandardValidationsErrors.required(_this.getPlaceholder(props)),
          },
        );
      }

      return newValidationsErrors;
    };

    _this.setInitValidationState = function (state, props) {
      var validations = _this.parseValidations(props);

      var validationErrors = _this.parseValidationErrors(props);

      return Object.assign({}, state, {
        validations: validations,
        validationErrors: validationErrors,
      });
    };

    _this.handleChange = function (newValue, event) {
      var onChange = _this.props.onChange;
      if (onChange) onChange(event ? event : newValue);
    };

    _this.handleBlur = /*#__PURE__*/ (function () {
      var _ref = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(newValue, event, name) {
          var _this$props, onBlur, isRequired, setValidationState;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  (_this$props = _this.props),
                    (onBlur = _this$props.onBlur),
                    (isRequired = _this$props.isRequired),
                    (setValidationState = _this$props.validation.setValidationState);
                  _context.next = 3;
                  return _this.validateInput(newValue, name, setValidationState, isRequired);

                case 3:
                  if (onBlur) {
                    onBlur(event ? event : newValue);
                  }

                  return _context.abrupt('return', true);

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee);
        }),
      );

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    })();

    _this.validateInput = /*#__PURE__*/ (function () {
      var _ref2 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(newValue, name, setFormState) {
          var isRequired,
            dirtyState,
            newState,
            validationResult,
            _args2 = arguments;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  isRequired = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : false;
                  dirtyState = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : null;
                  newState = dirtyState || {
                    isDirty: !_lodash['default'].isEqual(_this.state.originalValue, newValue),
                    isValid: true,
                    validationError: '',
                  }; //if (newState.isDirty === true)
                  //{

                  if (!(_this.props.error === true)) {
                    _context2.next = 7;
                    break;
                  }

                  newState = Object.assign({}, newState, {
                    isValid: false,
                    validationError: _this.props.helperText,
                  });
                  _context2.next = 11;
                  break;

                case 7:
                  _context2.next = 9;
                  return _this.validate(newValue, name, isRequired);

                case 9:
                  validationResult = _context2.sent;
                  newState = Object.assign({}, newState, validationResult);

                case 11:
                  //}
                  // if (name === "chargeAfterDate") {
                  //   console.group("validateInput");
                  //   console.log("input Name", name);
                  //   console.log("value", newValue);
                  //   console.log("original", this.state.originalValue);
                  //   console.log("newState", newState);
                  //   console.groupEnd();
                  // }
                  // set new inputIsValid
                  _this.setState(newState); //Update form isDirty and isValidate

                  if (setFormState) {
                    setFormState(name, newState);
                  }

                  return _context2.abrupt('return', newState);

                case 14:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2);
        }),
      );

      return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    })();

    _this.isDirty = function () {
      return _this.state.isDirty;
    };

    _this.isValid = function () {
      return _this.state.isValid;
    };

    _this.error = function () {
      return _this.state.error;
    };

    _this.validatingInput = function (result, newState, validationError) {
      if (result) {
        newState.isValid = true;
        newState.validationError = null;
      } else {
        newState.isValid = false;
        newState.validationError = validationError;
      } //console.log("validatingInput :", newState);

      return newState;
    };

    _this.validate = /*#__PURE__*/ (function () {
      var _ref3 = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(newValue, name, isRequired) {
          var newState, validations, validationErrors, key, validation, validationResult, result;
          return regeneratorRuntime.wrap(
            function _callee3$(_context3) {
              while (1) {
                switch ((_context3.prev = _context3.next)) {
                  case 0:
                    newState = {
                      isValid: true,
                      validationError: '',
                    };
                    validations = _this.state.validations;
                    validationErrors = _this.state.validationErrors;

                    if (_this.props.ignoreRegisteredValidation) {
                      validations = _this.parseValidations(_this.props);
                      validationErrors = _this.parseValidationErrors(_this.props);
                    }

                    _context3.t0 = regeneratorRuntime.keys(validations);

                  case 5:
                    if ((_context3.t1 = _context3.t0()).done) {
                      _context3.next = 40;
                      break;
                    }

                    key = _context3.t1.value;

                    if (!validations[key]) {
                      _context3.next = 38;
                      break;
                    }

                    validation = validations[key];

                    if (!(validation && !(0, _utilities.isEmpty)(newValue))) {
                      _context3.next = 34;
                      break;
                    }

                    validationResult = validation(newValue);

                    if (!validationResult.then) {
                      _context3.next = 29;
                      break;
                    }

                    _context3.prev = 12;
                    newState.isValid = false;
                    newState.validationError = 'Validating...';
                    _context3.next = 17;
                    return validationResult;

                  case 17:
                    result = _context3.sent;
                    newState = _this.validatingInput(result, newState, validationErrors[key]);

                    if (!(newState.isValid === false)) {
                      _context3.next = 21;
                      break;
                    }

                    return _context3.abrupt('break', 40);

                  case 21:
                    _context3.next = 27;
                    break;

                  case 23:
                    _context3.prev = 23;
                    _context3.t2 = _context3['catch'](12);
                    //TODO should failed
                    newState.isValid = false;
                    newState.validationError = validationErrors[key]; //console.log("Failed to validate error :", error);

                  case 27:
                    _context3.next = 32;
                    break;

                  case 29:
                    newState = _this.validatingInput(
                      validationResult,
                      newState,
                      validationErrors[key],
                    );

                    if (!(newState.isValid === false)) {
                      _context3.next = 32;
                      break;
                    }

                    return _context3.abrupt('break', 40);

                  case 32:
                    _context3.next = 38;
                    break;

                  case 34:
                    if (!(isRequired && (0, _utilities.isEmpty)(newValue))) {
                      _context3.next = 38;
                      break;
                    }

                    newState.isValid = false;
                    newState.validationError = StandardValidationsErrors.required(
                      _this.getPlaceholder(_this.props),
                    );
                    return _context3.abrupt('break', 40);

                  case 38:
                    _context3.next = 5;
                    break;

                  case 40:
                    //console.log("newState :", name, newValue,  newState);
                    if (_this.props.onValidate) {
                      _this.props.onValidate(newState.isValid, newState.validationError);
                    }

                    return _context3.abrupt('return', newState);

                  case 42:
                  case 'end':
                    return _context3.stop();
                }
              }
            },
            _callee3,
            null,
            [[12, 23]],
          );
        }),
      );

      return function (_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      };
    })();

    var initState = {
      originalValue: null,
      validations: {},
      validationErrors: {},
      isValid: true,
      isDirty: false,
      isTouched: false,
      validationError: '',
    };
    _this.isRegisteredToForm = false;
    _this.state = _this.setInitValidationState(initState, _props);
    return _this;
  }

  _createClass(
    Validator,
    [
      {
        key: 'componentDidUpdate',
        value: (function () {
          var _componentDidUpdate = _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(prevProps) {
              var _this$props2, name, setValidationState, isRequired, newValue, oldValue, newState;

              return regeneratorRuntime.wrap(
                function _callee4$(_context4) {
                  while (1) {
                    switch ((_context4.prev = _context4.next)) {
                      case 0:
                        (_this$props2 = this.props),
                          (name = _this$props2.name),
                          (setValidationState = _this$props2.validation.setValidationState),
                          (isRequired = _this$props2.isRequired);
                        newValue = this.getValue(this.props);
                        oldValue = this.getValue(prevProps);

                        if (_lodash['default'].isEqual(newValue, oldValue)) {
                          _context4.next = 6;
                          break;
                        }

                        _context4.next = 6;
                        return this.validateInput(newValue, name, setValidationState, isRequired);

                      case 6:
                        //Logically not required
                        if (
                          !_lodash['default'].isEqual(
                            prevProps.originalValue,
                            this.props.originalValue,
                          )
                        ) {
                          newState = {
                            isDirty: !_lodash['default'].isEqual(
                              this.props.originalValue,
                              newValue,
                            ),
                            originalValue: this.props.originalValue,
                          }; // console.group("componentDidUpdate");
                          // console.log("value", newValue);
                          // console.log("original", this.props.originalValue);
                          // console.log("newState :", newState);
                          // console.groupEnd();

                          this.setState(newState);
                        }

                      case 7:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                },
                _callee4,
                this,
              );
            }),
          );

          function componentDidUpdate(_x10) {
            return _componentDidUpdate.apply(this, arguments);
          }

          return componentDidUpdate;
        })(),
      },
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          var _this$props3 = this.props,
            name = _this$props3.name,
            id = _this$props3.id,
            isRequired = _this$props3.isRequired,
            registerValidationInput = _this$props3.validation.registerValidationInput,
            inputComponentRef = _this$props3.inputComponentRef;

          if (registerValidationInput) {
            registerValidationInput(name ? name : id, {
              isRequired: isRequired,
              validate: (function () {
                var _validate = _asyncToGenerator(
                  /*#__PURE__*/ regeneratorRuntime.mark(function _callee5() {
                    var _this2$props, name, isRequired, value;

                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch ((_context5.prev = _context5.next)) {
                          case 0:
                            (_this2$props = _this2.props),
                              (name = _this2$props.name),
                              (isRequired = _this2$props.isRequired);
                            value = _this2.getValue(_this2.props); //console.log("Run input Validate", value);

                            _context5.next = 4;
                            return _this2.validateInput(value, name, null, isRequired);

                          case 4:
                            return _context5.abrupt('return', _context5.sent);

                          case 5:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }),
                );

                function validate() {
                  return _validate.apply(this, arguments);
                }

                return validate;
              })(),
            });
          }

          if (inputComponentRef) {
            inputComponentRef(this);
          }
        },
        /*
    Get the Value passed to input and can be set directly or by InputProps
    */
      },
      {
        key: 'render',
        value: function render() {
          var _this3 = this;

          var _this$props4 = this.props,
            name = _this$props4.name,
            id = _this$props4.id,
            component = _this$props4.component,
            isRequired = _this$props4.isRequired,
            originalValue = _this$props4.originalValue,
            validations = _this$props4.validations,
            validationErrors = _this$props4.validationErrors,
            textFieldProps = _this$props4.textFieldProps,
            form = _this$props4.form,
            inputComponentRef = _this$props4.inputComponentRef,
            helperText = _this$props4.helperText,
            label = _this$props4.label,
            ignoreLabelSuffix = _this$props4.ignoreLabelSuffix,
            ignoreRegisteredValidation = _this$props4.ignoreRegisteredValidation,
            componentProvider = _this$props4.componentProvider,
            rest = _objectWithoutProperties(_this$props4, [
              'name',
              'id',
              'component',
              'isRequired',
              'originalValue',
              'validations',
              'validationErrors',
              'textFieldProps',
              'form',
              'inputComponentRef',
              'helperText',
              'label',
              'ignoreLabelSuffix',
              'ignoreRegisteredValidation',
              'componentProvider',
            ]);

          var currentValue = this.getValue(this.props);
          var Component = component;

          if (currentValue === undefined) {
            //console.log("name of undefined value", name);
          }

          var handleChange = function handleChange(event) {
            return _this3.handleChange(
              (0, _utilities.getInputValue)(event),
              event,
              name ? name : id,
            );
          };

          var handleBlur = function handleBlur(event) {
            return _this3.handleBlur((0, _utilities.getInputValue)(event), event, name ? name : id);
          };

          var finalLabel = label;

          if (textFieldProps && textFieldProps.label) {
            finalLabel = componentProvider.getFormInputLabel({
              isRequired: isRequired,
              ignoreLabelSuffix: ignoreLabelSuffix,
              label: textFieldProps.label,
            });
          } else if (label) {
            finalLabel = componentProvider.getFormInputLabel({
              isRequired: isRequired,
              ignoreLabelSuffix: ignoreLabelSuffix,
              label: label,
            });
          } //Set validator props

          var validatorProps = {};

          if (!(0, _utilities.isEmpty)(textFieldProps)) {
            validatorProps.textFieldProps = _objectSpread(
              _objectSpread({}, textFieldProps),
              {},
              {
                label: finalLabel,
              },
            );
          } // console.log("name :", name);
          // console.log("this.state.isValid :", this.state.isValid);
          // console.log("this.state.isDirty :", this.state.isValid);
          // console.log("this.state.validationError :", this.state.validationError);

          return /*#__PURE__*/ _react['default'].createElement(
            Component,
            _extends(
              {},
              rest,
              {
                //success={this.state.isValid && this.state.isDirty}
                error: !this.state.isValid,
                label: finalLabel,
                helperText: this.state.validationError ? this.state.validationError : helperText,
                id: id,
                name: name,
                onChange: handleChange,
                value: currentValue,
                onBlur: handleBlur,
              },
              validatorProps,
            ),
            this.props.children,
          );
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, state) {
          if (!_lodash['default'].isEqual(state.originalValue, props.originalValue)) {
            return {
              originalValue: props.originalValue,
            };
          }

          return null;
        },
      },
    ],
  );

  return Validator;
})(_react.Component);

Validator.propTypes = {
  classes: _propTypes['default'].object,
  styles: _propTypes['default'].object,
  id: _propTypes['default'].string,
  name: _propTypes['default'].string,
  label: _propTypes['default'].oneOfType([
    _propTypes['default'].string,
    _propTypes['default'].node,
  ]),
  placeholder: _propTypes['default'].string,
  validation: _propTypes['default'].shape({
    isDirty: _propTypes['default'].bool,
    isValid: _propTypes['default'].bool,
    validationErrors: _propTypes['default'].array,
    setValidationState: _propTypes['default'].func,
    registerValidationInput: _propTypes['default'].func,
  }),
  validations: _propTypes['default'].object,
  validationErrors: _propTypes['default'].object,
  onValidate: _propTypes['default'].func,
  isRequired: _propTypes['default'].bool,
  value: _propTypes['default'].any,
  originalValue: _propTypes['default'].any,
  onChange: _propTypes['default'].func.isRequired,
  onBlur: _propTypes['default'].func,
  form: _propTypes['default'].node,
  component: _propTypes['default'].oneOfType([
    _propTypes['default'].func,
    _propTypes['default'].string,
    _propTypes['default'].object,
  ]).isRequired,
  children: _propTypes['default'].node,
  textFieldProps: _propTypes['default'].object,
  ignoreLabelSuffix: _propTypes['default'].bool,
  error: _propTypes['default'].bool,
  helperText: _propTypes['default'].string,
  inputComponentRef: _propTypes['default'].func,
  ignoreRegisteredValidation: _propTypes['default'].bool,
  componentProvider: _propTypes['default'].shape({
    getFormInputLabel: _propTypes['default'].func,
  }),
};

var _default = (0, _withValidation['default'])(
  (0, _ComponentProvider.withComponentProvider)(Validator),
);

exports['default'] = _default;
