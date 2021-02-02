"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = exports.number = exports.equalTo = exports.range = exports.equalValue = exports.minValue = exports.maxValue = exports.equalLength = exports.minLength = exports.maxLength = exports.email = exports.regex = exports.required = void 0;

//TODO Pass language
var required = function required(name) {
  return "".concat(name, " is required");
};

exports.required = required;

var regex = function regex(_regex, name) {
  return "".concat(name, " is not valid input");
}; // function to validate email


exports.regex = regex;

var email = function email(name) {
  return "".concat(name, " is not valid");
}; // function that verifies if a string has a length less than or equal length


exports.email = email;

var maxLength = function maxLength(length, name) {
  return "".concat(name, " length is more than required length ").concat(length);
}; // function that verifies if a string has a length more than or equal length


exports.maxLength = maxLength;

var minLength = function minLength(length, name) {
  return "".concat(name, " length is less than required length ").concat(length);
}; // function that verifies if value are equal in length


exports.minLength = minLength;

var equalLength = function equalLength(length, name) {
  return "".concat(name, " length is not equal to required length ").concat(length);
};

exports.equalLength = equalLength;

var maxValue = function maxValue(length, name) {
  return "".concat(name, " value is more than ").concat(length);
}; // function that verifies if a string has a length more than or equal length


exports.maxValue = maxValue;

var minValue = function minValue(length, name) {
  return "".concat(name, " value is less than ").concat(length);
}; // function that verifies if value are equal in length


exports.minValue = minValue;

var equalValue = function equalValue(length, name) {
  return "".concat(name, " value is not equal to ").concat(length);
};

exports.equalValue = equalValue;

var range = function range() {
  var lengths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, -1];
  var name = arguments.length > 1 ? arguments[1] : undefined;
  return "".concat(name, " length is not between range [").concat(lengths[0], ",").concat(lengths[1], "]");
}; // function that verifies if two strings are equal


exports.range = range;

var equalTo = function equalTo(string1, name) {
  return "".concat(name, " is not equal to");
}; // function that verifies if value contains only numbers


exports.equalTo = equalTo;

var number = function number(name) {
  return "".concat(name, " is not number");
}; // verifies if value is a valid URL


exports.number = number;

var url = function url(name) {
  return "".concat(name, " is not url");
};

exports.url = url;