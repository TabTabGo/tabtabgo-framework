'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _styles = require('@material-ui/core/styles');

var _Tabs = _interopRequireDefault(require('@material-ui/core/Tabs'));

var _Tab = _interopRequireDefault(require('@material-ui/core/Tab'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

var StyledTabs = (0, _styles.withStyles)({
  indicator: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
})(function (props) {
  return /*#__PURE__*/ _react['default'].createElement(
    _Tabs['default'],
    _extends({}, props, {
      TabIndicatorProps: {
        children: /*#__PURE__*/ _react['default'].createElement('div', null),
      },
    }),
  );
});
var StyledTab = (0, _styles.withStyles)(function (theme) {
  return {
    root: {
      minWidth: 0,
      color: theme.palette.text.hint,
      fontWeight: theme.typography.fontWeightBold,
      textTransform: 'uppercase',
      fontSize: theme.typography.pxToRem(14),
      marginRight: theme.spacing(1.5),
      marginLeft: 0,
      paddingLeft: 0,
      opacity: 1,
      '&$selected': {
        opacity: 1,
        color: theme.palette.primary.main,
      },
      '& .MuiTab-wrapper': {
        alignItems: 'flex-start !important',
      },
    },
    selected: {},
  };
})(function (props) {
  return /*#__PURE__*/ _react['default'].createElement(
    _Tab['default'],
    _extends(
      {
        disableRipple: true,
      },
      props,
    ),
  );
});
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {},
    padding: {
      padding: theme.spacing(3),
    },
  };
});

var TabNavigation = function TabNavigation(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    tabs = _ref.tabs,
    updateParent = _ref.updateParent;
  var classes = useStyles();

  var _React$useState = _react['default'].useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    value = _React$useState2[0],
    setValue = _React$useState2[1];

  var handleChange = function handleChange(event, newValue) {
    setValue(newValue);
    updateParent(newValue);
  };

  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    {
      className: classes.root + ' ' + className,
    },
    /*#__PURE__*/ _react['default'].createElement(
      'div',
      null,
      /*#__PURE__*/ _react['default'].createElement(
        StyledTabs,
        {
          value: value,
          onChange: handleChange,
          'aria-label': 'styled tabs',
        },
        tabs.map(function (tab, index) {
          return /*#__PURE__*/ _react['default'].createElement(StyledTab, {
            key: index,
            label: tab.label,
          });
        }),
      ),
    ),
  );
};

TabNavigation.propTypes = {
  className: _propTypes['default'].string,
  tabs: _propTypes['default'].array,
  updateParent: _propTypes['default'].func,
};
var _default = TabNavigation;
exports['default'] = _default;
