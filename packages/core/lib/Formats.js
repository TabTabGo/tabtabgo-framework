'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.arrayFormat = exports.genderFormat = exports.phoneNumberFormat = exports.amountFormat = exports.numberFormat = exports.camel2title = void 0;

var _Utilities = require('./Utilities');

var _Appsettings = require('./Appsettings');

var camel2title = function camel2title(camelCase) {
  return camelCase
    ? camelCase
        .replace(/([A-Z])/g, function (match) {
          return ' '.concat(match);
        })
        .replace(/^./, function (match) {
          return match.toUpperCase();
        })
        .replace(/_/g, function () {
          return ' ';
        })
    : '';
};

exports.camel2title = camel2title;

var numberFormat = function numberFormat(locale, decimalFixed) {
  return function (value) {
    if (!locale) locale = _Appsettings.AppSettings.defaultLocale || 'en-US';
    if (decimalFixed === undefined) decimalFixed = _Appsettings.AppSettings.decimalFixed || 2;
    return Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: decimalFixed,
    }).format(value);
  };
}; //TODO support local format

exports.numberFormat = numberFormat;

var amountFormat = function amountFormat(currency, locale, decimalFixed) {
  return function (amount) {
    if (!currency) currency = _Appsettings.AppSettings.defaultCurrency || '$';
    if (!locale) locale = _Appsettings.AppSettings.defaultLocale || 'en-US';
    if (!decimalFixed) decimalFixed = _Appsettings.AppSettings.decimalFixed || 2;
    var value = parseFloat(amount.toString()).toFixed(decimalFixed);
    return (
      Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumFractionDigits: 2,
      }).format(Number(value)) + ' '.concat(currency)
    );
  };
};

exports.amountFormat = amountFormat;

var phoneNumberFormat = function phoneNumberFormat(phoneNumber) {
  return phoneNumber;
};

exports.phoneNumberFormat = phoneNumberFormat;

var genderFormat = function genderFormat(value, defaultValue) {
  if (value === 'm' || value === 'male' || value === 1 || value === true) return 'Male';
  if (value === 'f' || value === 'female' || value === 0 || value === false) return 'Female';
  if (value === 'n') return 'Prefer not to say';
  return defaultValue || 'Not specified';
};

exports.genderFormat = genderFormat;

var arrayFormat = function arrayFormat(array, displayField) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ', ';

  if (array && Array.isArray(array)) {
    var displays =
      typeof displayField === 'function'
        ? array.map(function (a) {
            return displayField(a);
          })
        : array.map(function (a) {
            return (0, _Utilities.getPropertyValue)(a, displayField);
          });
    return displays.join(separator);
  }

  return '';
};

exports.arrayFormat = arrayFormat;
