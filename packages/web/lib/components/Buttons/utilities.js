'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getButton = exports.mergeButtons = exports.mergeButtonSections = exports.getLabel = exports.getTooltip = void 0;

var _lodash = _interopRequireDefault(require('lodash'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

var getTooltip = function getTooltip(a, props) {
  if (a.tooltip && typeof a.tooltip === 'function') {
    return a.tooltip(props);
  }

  if (a.tooltip && typeof a.tooltip === 'string') return a.tooltip;
  return getLabel(a, props);
};

exports.getTooltip = getTooltip;

var getLabel = function getLabel(a, props) {
  if (a.label && typeof a.label === 'function') return a.label(props);
  return a.label || '';
};

exports.getLabel = getLabel;

var mergeButtonSections = function mergeButtonSections(buttonSections, defaultButtonSections) {
  var finalActiveButtons = {};

  if (
    _lodash['default'].isEmpty(buttonSections) &&
    _lodash['default'].isEmpty(defaultButtonSections)
  ) {
    return {};
  } else if (
    !_lodash['default'].isEmpty(buttonSections) &&
    _lodash['default'].isEmpty(defaultButtonSections)
  ) {
    return buttonSections;
  } else if (
    _lodash['default'].isEmpty(buttonSections) &&
    !_lodash['default'].isEmpty(defaultButtonSections)
  ) {
    return defaultButtonSections;
  } else {
    var keys = _lodash['default'].uniq(
      Object.keys(buttonSections).concat(Object.keys(defaultButtonSections)),
    );

    keys.forEach(function (buttonSectionKey) {
      var section = buttonSections[buttonSectionKey];
      var defaultSection = defaultButtonSections[buttonSectionKey];
      if ((typeof section === 'boolean' && section === false) || !section) return;
      else if (typeof section === 'boolean' && section === true)
        finalActiveButtons[buttonSectionKey] = defaultSection;

      if (
        _lodash['default'].isEmpty(section)
        /*&& _.isEmpty(defaultSection)*/
      ) {
        finalActiveButtons[buttonSectionKey] = {};
      } else if (
        !_lodash['default'].isEmpty(section) &&
        _lodash['default'].isEmpty(defaultSection)
      ) {
        finalActiveButtons[buttonSectionKey] = section; // } else if (_.isEmpty(section) && !_.isEmpty(defaultSection)) {
        //   finalActiveButtons[buttonSectionKey] = defaultSection;
      } else {
        finalActiveButtons[buttonSectionKey] = mergeButtons(section, defaultSection);
      }
    });
  }

  return finalActiveButtons;
};

exports.mergeButtonSections = mergeButtonSections;

var mergeButtons = function mergeButtons(buttons, defaultButtons) {
  var finalActiveButtons = {};
  if (!buttons) return defaultButtons;
  Object.keys(buttons).forEach(function (buttonKey) {
    var button = getButton(buttonKey, buttons, defaultButtons);

    if (button) {
      finalActiveButtons[buttonKey] = button;
    }
  });
  return finalActiveButtons;
};

exports.mergeButtons = mergeButtons;

var getButton = function getButton(buttonName, buttons, defaultButtons) {
  var button = null;

  if (_typeof(buttons[buttonName]) === 'object') {
    if (defaultButtons[buttonName])
      button = Object.assign({}, defaultButtons[buttonName], buttons[buttonName]);
    else button = Object.assign({}, buttons[buttonName]);
  } else if (buttons[buttonName] === true) {
    button = Object.assign({}, defaultButtons[buttonName]);
  }

  return button;
};

exports.getButton = getButton;
