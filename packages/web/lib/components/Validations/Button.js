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

var _Button = _interopRequireDefault(require('components/CustomButtons/Button.jsx'));

var _core = require('@material-ui/core');

var _Form = require('./Form.jsx');

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

var ValidationButton = /*#__PURE__*/ (function (_Component) {
  _inherits(ValidationButton, _Component);

  var _super = _createSuper(ValidationButton);

  function ValidationButton() {
    _classCallCheck(this, ValidationButton);

    return _super.apply(this, arguments);
  }

  _createClass(ValidationButton, [
    {
      key: 'render',
      value: function render() {
        var _this = this;

        var _this$props = this.props,
          ignoreDirty = _this$props.ignoreDirty,
          ignoreValidation = _this$props.ignoreValidation,
          isBusy = _this$props.isBusy,
          round = _this$props.round,
          ignoreValidationOnSubmit = _this$props.ignoreValidationOnSubmit,
          rest = _objectWithoutProperties(_this$props, [
            'ignoreDirty',
            'ignoreValidation',
            'isBusy',
            'round',
            'ignoreValidationOnSubmit',
          ]);

        if (ignoreDirty === undefined) ignoreDirty = false;
        if (ignoreValidation === undefined) ignoreValidation = false;
        var ButtonComponent = round === true ? _Button['default'] : _core.Button;
        return /*#__PURE__*/ _react['default'].createElement(
          _Form.ValidationFormConsumer,
          null,
          function (_ref) {
            var isDirty = _ref.isDirty,
              isValid = _ref.isValid,
              validate = _ref.validate,
              setFormState = _ref.setFormState;
            //refactor round code out to a custom button
            var buttonProps = round
              ? _objectSpread(
                  {
                    round: round,
                  },
                  rest,
                )
              : _objectSpread({}, rest);

            if (_this.props.isBusy) {
              return /*#__PURE__*/ _react['default'].createElement(
                'div',
                {
                  className: _this.props.className,
                },
                /*#__PURE__*/ _react['default'].createElement(_core.CircularProgress, {
                  style: {
                    margin: 8,
                  },
                  size: 30,
                }),
                ';',
              );
            } // console.log("Validation Button",
            //   {
            //     disable: this.props.disabled,
            //     isBusy,
            //     ignoreDirty,
            //     isDirty,
            //     ignoreValidation,
            //     isValid
            //   }
            // );

            return /*#__PURE__*/ _react['default'].createElement(
              ButtonComponent,
              _extends({}, buttonProps, {
                disabled:
                  isBusy ||
                  _this.props.disabled ||
                  !(ignoreDirty || isDirty) ||
                  !(ignoreValidation || isValid),
                onClick: /*#__PURE__*/ (function () {
                  var _ref2 = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(e) {
                      var validationState, onClick;
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              e.persist();
                              validationState = {
                                isDirty: true,
                                isValid: true,
                              };

                              if (ignoreValidationOnSubmit) {
                                _context.next = 6;
                                break;
                              }

                              _context.next = 5;
                              return validate();

                            case 5:
                              validationState = _context.sent;

                            case 6:
                              // console.log(
                              //   "validate",
                              //   validationState.isDirty,
                              //   validationState.isValid
                              // );
                              if (
                                (ignoreDirty || validationState.isDirty) &&
                                (ignoreValidation || validationState.isValid)
                              ) {
                                onClick = _this.props.onClick;
                                if (onClick)
                                  onClick(e, function () {
                                    return setFormState({
                                      isDirty: false,
                                    });
                                  });
                              }

                            case 7:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }),
                  );

                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                })(),
                className: _this.props.className,
              }),
              _this.props.children,
            );
          },
        );
      },
    },
  ]);

  return ValidationButton;
})(_react.Component);

exports['default'] = ValidationButton;
ValidationButton.propTypes = {
  ignoreDirty: _propTypes['default'].bool,
  ignoreValidation: _propTypes['default'].bool,
  isBusy: _propTypes['default'].bool,
  round: _propTypes['default'].bool,
  className: _propTypes['default'].string,
  disabled: _propTypes['default'].bool,
  onClick: _propTypes['default'].func,
  children: _propTypes['default'].any,
  ignoreValidationOnSubmit: _propTypes['default'].bool,
};
