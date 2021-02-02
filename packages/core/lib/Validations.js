'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.url = exports.number = exports.equalTo = exports.range = exports.equalValue = exports.minValue = exports.maxValue = exports.equalLength = exports.minLength = exports.maxLength = exports.isAfterToday = exports.isTodayAndAfter = exports.email = exports.ip = exports.regex = exports.required = void 0;

var _Utilities = require('./Utilities');

var _moment = _interopRequireDefault(require('moment'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var isNumber = function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var required = function required(value) {
  if ((0, _Utilities.isEmpty)(value)) {
    return false;
  }

  return true;
};

exports.required = required;

var regex = function regex(rex, value) {
  return rex.test(value);
};

exports.regex = regex;

var ip = function ip(value) {
  var ipRegex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/gm;
  return regex(ipRegex, value);
}; // function to validate email

exports.ip = ip;

var email = function email(value) {
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex(emailRex, value);
};

exports.email = email;

var isTodayAndAfter = function isTodayAndAfter(value) {
  if (!value) return false;
  var today = new Date().setHours(0, 0, 0, 0);
  var valueDate = (0, _moment['default'])(value).toDate().setHours(0, 0, 0, 0);
  return valueDate >= today;
};

exports.isTodayAndAfter = isTodayAndAfter;

var isAfterToday = function isAfterToday(value) {
  if (!value) return false;
  var today = new Date().setHours(0, 0, 0, 0);
  var valueDate = (0, _moment['default'])(value).toDate().setHours(0, 0, 0, 0);
  return valueDate > today;
}; // function that verifies if a string has a length less than or equal length

exports.isAfterToday = isAfterToday;

var maxLength = function maxLength(length, value) {
  if (value && value.length <= length) {
    return true;
  }

  return false;
}; // function that verifies if a string has a length more than or equal length

exports.maxLength = maxLength;

var minLength = function minLength(length, value) {
  if (value && value.length >= length) {
    return true;
  }

  return false;
}; // function that verifies if value are equal in length

exports.minLength = minLength;

var equalLength = function equalLength(length, value) {
  if (value && value.length === Number(length)) {
    return true;
  }

  return false;
};

exports.equalLength = equalLength;

var maxValue = function maxValue(length, value) {
  if (isNumber(value) && Number(value) <= length) {
    return true;
  }

  return false;
}; // function that verifies if a string has a length more than or equal length

exports.maxValue = maxValue;

var minValue = function minValue(length, value) {
  if (isNumber(value) && Number(value) >= length) {
    return true;
  }

  return false;
}; // function that verifies if value are equal in length

exports.minValue = minValue;

var equalValue = function equalValue(length, value) {
  if (isNumber(value) && Number(value) === length) {
    return true;
  }

  return false;
};

exports.equalValue = equalValue;

var range = function range() {
  var lengths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, -1];
  var value = arguments.length > 1 ? arguments[1] : undefined;

  if (lengths.length !== 2) {
    // eslint-disable-next-line no-console
    console.error('Lengths should be an array of two items [minLength, maxLength]');
  }

  if (value && value.length <= lengths[0] && value.length >= lengths[1]) {
    return true;
  }

  return false;
}; // function that verifies if two strings are equal

exports.range = range;

var equalTo = function equalTo(string1, value) {
  var stringValue;

  if (typeof string1 === 'function') {
    stringValue = string1();
  } else {
    stringValue = string1;
  }

  if (value === stringValue) {
    return true;
  }

  return false;
}; // function that verifies if value contains only numbers

exports.equalTo = equalTo;

var number = function number(value) {
  var numberRex = new RegExp('^[0-9]+$');

  if (numberRex.test(value)) {
    return true;
  }

  return false;
}; // verifies if value is a valid URL

exports.number = number;

var url = function url(enabled, value) {
  try {
    new URL(value);
    return true;
  } catch (_) {
    return false;
  }
};

exports.url = url;
