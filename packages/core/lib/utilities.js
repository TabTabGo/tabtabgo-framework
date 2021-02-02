"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.difference = difference;
exports.getToken = getToken;
exports.getSearchParams = getSearchParams;
exports.isEmpty = isEmpty;
exports.populatePageList = populatePageList;
exports.getJsonPatchDocument = exports.getUniqueId = exports.getFriendlyString = exports.getPersonInitials = exports.getPersonName = exports.getDisplayValue = exports.getPropertyValue = exports.arrayUnique = exports.getInputValue = exports.hexToRgb = exports.parseDataUrl = exports.camelCase = exports.isEqual = exports.getImageUrl = void 0;

var _Appsettings = require("./Appsettings");

var _qs = _interopRequireDefault(require("qs"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getImageUrl = function getImageUrl(mediaFileId) {
  var imageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Provided';
  return "".concat(_Appsettings.AppSettings.baseApiUrl, "/mediaFiles/Image/").concat(mediaFileId, "/").concat(imageSize);
};

exports.getImageUrl = getImageUrl;

var isEqual = function isEqual(value, other) {
  // Get the value type
  var type = Object.prototype.toString.call(value); // If the two objects are not the same type, return false

  if (type !== Object.prototype.toString.call(other)) return false; // If items are not an object or array, return false

  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false; // Compare the length of the length of the two items

  var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false; // Compare two items

  var compare = function compare(item1, item2) {
    // Get the object type
    var itemType = Object.prototype.toString.call(item1); // If an object or array, compare recursively

    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    } // Otherwise, do a simple comparison
    else {
        // If the two items are not the same type, return false
        if (itemType !== Object.prototype.toString.call(item2)) return false; // Else if it's a function, convert to a string and compare
        // Otherwise, just compare

        if (itemType === '[object Function]') {
          if (item1.toString() !== item2.toString()) return false;
        } else {
          if (item1 !== item2) return false;
        }
      }
  }; // Compare properties


  if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  } // If nothing failed, return true


  return true;
};

exports.isEqual = isEqual;

var camelCase = function camelCase(str) {
  if (str && str.length > 1) {
    return str.slice(0, 1).toLowerCase() + str.slice(1);
  }

  return str;
};

exports.camelCase = camelCase;

var parseDataUrl = function parseDataUrl(url) {
  var regex = /data:([\w,/]+);(\w+),(.*)/g;
  var m = regex.exec(url);

  if (m) {
    return {
      mediaType: m[1],
      base64: m[2] === 'base64',
      data: m[3]
    };
  }

  return {
    data: url
  };
};

exports.parseDataUrl = parseDataUrl;

var hexToRgb = function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : {
    r: 0,
    g: 0,
    b: 0
  };
};

exports.hexToRgb = hexToRgb;

var getInputValue = function getInputValue(e) {
  if (e && e.target) {
    //console.log('e.type', e.type);
    switch (e.target.type) {
      case 'radio':
        return e.target.value;

      case 'checkbox':
        return e.target.checked;

      default:
        return e.target.value;
    }
  }

  return e;
};

exports.getInputValue = getInputValue;

var arrayUnique = function arrayUnique(array, equalCompare) {
  var a = array.concat();
  if (!equalCompare) equalCompare = function equalCompare(a, b) {
    return isEqual(a, b);
  };

  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (equalCompare(a[i], a[j])) a.splice(j--, 1);
    }
  }

  return a;
};

exports.arrayUnique = arrayUnique;

var getPropertyValue = function getPropertyValue(entity, propertyPath) {
  if (entity && propertyPath) {
    var properties = propertyPath.split('.');
    var value = entity;
    properties.forEach(function (prop) {
      value = value ? value[prop] : '';
    });
    return value;
  }

  return '';
};

exports.getPropertyValue = getPropertyValue;

var getDisplayValue = function getDisplayValue(entity, displayField) {
  if (displayField) {
    if (typeof displayField == 'function') {
      return displayField(entity);
    } else {
      return getPropertyValue(entity, displayField);
    }
  } else {
    return '';
  }
};

exports.getDisplayValue = getDisplayValue;

var getPersonName = function getPersonName(entity) {
  if (entity && entity.person && (entity.person.firstName || entity.person.lastName)) {
    return "".concat(entity.person.title ? entity.person.title + ' ' : '').concat(entity.person.firstName || '', " ").concat(entity.person.lastName || '');
  }

  return '';
};

exports.getPersonName = getPersonName;

var getPersonInitials = function getPersonInitials(entity) {
  if (entity && entity.person && entity.person.firstName && entity.person.lastName) {
    return "".concat(entity.person.firstName.substring(0, 1).toUpperCase()).concat(entity.person.lastName.substring(0, 1).toUpperCase());
  }

  if (entity && entity.person && entity.person.displayName) {
    var names = entity.person.displayName.split(' ');

    if (names.length > 1) {
      return "".concat(names[0].substring(0, 1).toUpperCase()).concat(names[names.length - 1].substring(0, 1).toUpperCase());
    }

    if (names.length === 1) {
      return names[0].substring(0, 1).toUpperCase();
    }
  }

  return 'U';
};
/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */


exports.getPersonInitials = getPersonInitials;

function difference(object, base) {
  function changes(object, base) {
    return _lodash["default"].transform(object, function (result, value, key) {
      if (!_lodash["default"].isEqual(value, base[key])) {
        result[key] = _lodash["default"].isObject(value) && _lodash["default"].isObject(base[key]) ? changes(value, base[key]) : value;
      }
    });
  }

  return changes(object, base);
}

function getToken(hash) {
  var regex = /token=(.+)$/gm;
  var group = regex.exec(hash);
  var token = null;

  if (group && group.length > 1) {
    token = group[1];
  }

  return token;
}

function getSearchParams(query) {
  return _qs["default"].parse(query);
}

function isEmpty(value) {
  if (_lodash["default"].isDate(value) && value) return false;
  if (_typeof(value) === 'object' && _lodash["default"].isEmpty(value)) return true;
  if (value === null || value === undefined || value === '') return true;
  return false;
}

function populatePageList(result, map) {
  if (result !== null && result !== void 0 && result.items && result.items.length > 0) {
    return result.items.flatMap(map);
  }

  return [];
}

var getFriendlyString = function getFriendlyString(word) {
  var splitWords = word.split(/(?=[A-Z])/);
  var result = '';
  splitWords.forEach(function (word, index) {
    if (index === 0) {
      result = word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      result += word.toLowerCase();
    }

    if (index < splitWords.length - 1) {
      result += ' ';
    }
  });
  return result;
};

exports.getFriendlyString = getFriendlyString;

var getUniqueId = function getUniqueId(index) {
  var date = new Date();
  var timestamp = date.getTime();
  var idNumber = timestamp;

  if (index) {
    idNumber += index;
  }

  return idNumber.toString(16);
};

exports.getUniqueId = getUniqueId;

var getJsonPatchDocument = function getJsonPatchDocument(originalValue, newValue, path) {
  if (originalValue !== newValue) {
    if (newValue) {
      return {
        op: originalValue ? 'replace' : 'add',
        path: path,
        value: newValue
      };
    } else {
      return {
        op: 'remove',
        path: path,
        value: undefined
      };
    }
  }

  return null;
};

exports.getJsonPatchDocument = getJsonPatchDocument;