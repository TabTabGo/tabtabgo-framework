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
exports['default'] = exports.defaultProps = void 0;

var _react = _interopRequireWildcard(require('react'));

var _reactSelect = _interopRequireDefault(require('react-select'));

var _utils = require('react-select/lib/utils');

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

var defaultProps = {
  cacheOptions: false,
  defaultOptions: false,
  filterOption: null,
};
exports.defaultProps = defaultProps;

var Async = /*#__PURE__*/ (function (_Component) {
  _inherits(Async, _Component);

  var _super = _createSuper(Async);

  function Async(props) {
    var _this;

    _classCallCheck(this, Async);

    _this = _super.call(this);

    _this.handleSetOptions = function (options) {
      if (!_this.mounted) return;
      var isLoading = !!_this.lastRequest;

      _this.setState({
        defaultOptions: options || [],
        isLoading: isLoading,
      });
    };

    _this.handleInputChange = function (newValue, actionMeta) {
      var _this$props = _this.props,
        cacheOptions = _this$props.cacheOptions,
        onInputChange = _this$props.onInputChange; // TODO

      var inputValue = (0, _utils.handleInputChange)(newValue, actionMeta, onInputChange);

      if (!inputValue) {
        delete _this.lastRequest;

        _this.setState({
          inputValue: '',
          loadedInputValue: '',
          loadedOptions: [],
          isLoading: false,
          passEmptyOptions: false,
        });

        return;
      }

      if (cacheOptions && _this.optionsCache && _this.optionsCache[inputValue]) {
        _this.setState({
          inputValue: inputValue,
          loadedInputValue: inputValue,
          loadedOptions: _this.optionsCache[inputValue],
          isLoading: false,
          passEmptyOptions: false,
        });
      } else {
        var request = (_this.lastRequest = {});

        _this.setState(
          {
            inputValue: inputValue,
            isLoading: true,
            passEmptyOptions: !_this.state.loadedInputValue,
          },
          function () {
            _this.loadOptions(inputValue, function (options) {
              if (!_this.mounted) return;

              if (options) {
                _this.optionsCache[inputValue] = options;
              }

              if (request !== _this.lastRequest) return;
              delete _this.lastRequest;

              _this.setState({
                isLoading: false,
                loadedInputValue: inputValue,
                loadedOptions: options || [],
                passEmptyOptions: false,
              });
            });
          },
        );
      }

      return inputValue;
    };

    _this.optionsCache = {};
    _this.state = {
      defaultOptions: Array.isArray(props.defaultOptions) ? props.defaultOptions : undefined,
      inputValue: typeof props.inputValue !== 'undefined' ? props.inputValue : '',
      isLoading: props.defaultOptions === true ? true : false,
      loadedOptions: [],
      passEmptyOptions: false,
    };
    return _this;
  }

  _createClass(Async, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.mounted = true;
        var defaultOptions = this.props.defaultOptions;
        var inputValue = this.state.inputValue;

        if (defaultOptions === true) {
          this.loadOptions(inputValue, this.handleSetOptions);
        }
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        // if the cacheOptions prop changes, clear the cache
        if (prevProps.cacheOptions !== this.props.cacheOptions) {
          this.optionsCache = {};
        }

        if (prevProps.defaultOptions !== this.props.defaultOptions) {
          this.setState({
            defaultOptions: Array.isArray(this.props.defaultOptions)
              ? this.props.defaultOptions
              : undefined,
          });
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.mounted = false;
      },
    },
    {
      key: 'focus',
      value: function focus() {
        this.select.focus();
      },
    },
    {
      key: 'blur',
      value: function blur() {
        this.select.blur();
      },
    },
    {
      key: 'loadOptions',
      value: function loadOptions(inputValue) {
        var callback =
          arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.handleSetOptions;
        var loadOptions = this.props.loadOptions;
        if (!loadOptions) return callback();
        if (!this.state.isLoading)
          this.setState({
            isLoading: true,
          });
        var loader = loadOptions(inputValue, callback);

        if (loader && typeof loader.then === 'function') {
          loader.then(callback, function () {
            return callback();
          });
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        // eslint-disable-next-line no-unused-vars
        var _this$props2 = this.props,
          value = _this$props2.value,
          cacheOptions = _this$props2.cacheOptions,
          loadOptions = _this$props2.loadOptions,
          selectRef = _this$props2.selectRef,
          props = _objectWithoutProperties(_this$props2, [
            'value',
            'cacheOptions',
            'loadOptions',
            'selectRef',
          ]);

        var getOptionValue = this.props.getOptionValue;
        var _this$state = this.state,
          defaultOptions = _this$state.defaultOptions,
          inputValue = _this$state.inputValue,
          isLoading = _this$state.isLoading,
          loadedInputValue = _this$state.loadedInputValue,
          loadedOptions = _this$state.loadedOptions,
          passEmptyOptions = _this$state.passEmptyOptions;
        var options = passEmptyOptions
          ? []
          : inputValue && loadedInputValue
          ? loadedOptions
          : defaultOptions || [];
        getOptionValue = getOptionValue
          ? getOptionValue
          : function (option) {
              return option.value;
            };
        var optionValue = options.find(function (o) {
          return getOptionValue(o) === value;
        });
        return /*#__PURE__*/ _react['default'].createElement(
          _reactSelect['default'],
          _extends({}, props, {
            ref: function ref(_ref) {
              _this2.select = _ref;
              if (selectRef) selectRef(_ref);
            },
            options: options,
            onMenuClose: function onMenuClose() {
              return _this2.setState({
                menuIsOpen: false,
              });
            },
            onMenuOpen: function onMenuOpen() {
              return _this2.setState({
                menuIsOpen: true,
              });
            },
            menuIsOpen: this.state.menuIsOpen,
            value: optionValue,
            inputValue: inputValue,
            isLoading: isLoading,
            onInputChange: this.handleInputChange,
          }),
        );
      },
    },
  ]);

  return Async;
})(_react.Component);

exports['default'] = Async;
Async.defaultProps = defaultProps;
