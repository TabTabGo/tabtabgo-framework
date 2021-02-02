'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.today = exports.dateTimeObjectToMoment = exports.toDateTimeObject = exports.timeStampFormat = exports.timeFormat = exports.dateFormat = exports.calculateDateTimeInMilliseconds = exports.calculateDateTime = exports.datetimeFormat = exports.durationFormat = exports.camel2title = void 0;

var _moment = _interopRequireDefault(require('moment'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var date_format = 'DD/MM/YYYY';
var time_format = 'HH:mm:ss';
var date_time_format = ''.concat(date_format, ' ').concat(time_format);

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

var durationFormat = function durationFormat(timeInSeconds) {
  var sec_num = parseInt(timeInSeconds, 10); // don't forget the second param

  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;
  var strHours = hours.toString();

  if (hours < 10) {
    strHours = '0' + hours;
  }

  var strMinutes = minutes.toString();

  if (minutes < 10) {
    strMinutes = '0' + minutes;
  }

  var strSeconds = seconds.toString();

  if (seconds < 10) {
    strSeconds = '0' + seconds;
  }

  return strHours + ':' + strMinutes + ':' + strSeconds;
}; //#region  Date Time format

exports.durationFormat = durationFormat;

var datetimeFormat = function datetimeFormat(format) {
  return function (date) {
    return date ? _moment['default'].parseZone(date).format(format || date_time_format) : '';
  };
};

exports.datetimeFormat = datetimeFormat;

var calculateDateTime = function calculateDateTime(timeSpan) {
  if (timeSpan && typeof timeSpan === 'number') {
    var t = new Date();
    t.setSeconds(t.getSeconds() - timeSpan);
    return datetimeFormat()(t);
  }

  if (timeSpan && typeof timeSpan === 'string') {
    return datetimeFormat()(timeSpan);
  }

  return null;
};

exports.calculateDateTime = calculateDateTime;

var calculateDateTimeInMilliseconds = function calculateDateTimeInMilliseconds(timeSpan) {
  if (timeSpan && typeof timeSpan === 'number') {
    var t = new Date();
    t.setMilliseconds(t.getMilliseconds() - timeSpan);
    return datetimeFormat()(t);
  }

  if (timeSpan && typeof timeSpan === 'string') {
    return datetimeFormat()(timeSpan);
  }

  return null;
};

exports.calculateDateTimeInMilliseconds = calculateDateTimeInMilliseconds;

var dateFormat = function dateFormat(date) {
  return date ? _moment['default'].parseZone(date).format(date_format) : '';
};

exports.dateFormat = dateFormat;

var timeFormat = function timeFormat(format) {
  return function (dateTime) {
    return dateTime ? _moment['default'].parseZone(dateTime).format(format || time_format) : '';
  };
};

exports.timeFormat = timeFormat;

var timeStampFormat = function timeStampFormat(format) {
  return function (timestamp) {
    if (timestamp) {
      var date = new Date(timestamp * 1000);
      return timeFormat(format)(date);
    }

    return timestamp;
  };
};

exports.timeStampFormat = timeStampFormat;

var toDateTimeObject = function toDateTimeObject(date) {
  return {
    date: (0, _moment['default'])(date).format('DD/MM/YYYY'),
    time: (0, _moment['default'])(date).format('HH:mm:00'),
  };
};

exports.toDateTimeObject = toDateTimeObject;

var dateTimeObjectToMoment = function dateTimeObjectToMoment(dateTimeObj) {
  if (dateTimeObj)
    return (0, _moment['default'])(
      (0, _moment['default'])(dateTimeObj.date).format('DD/MM/YYYY') + 'T' + dateTimeObj.time,
    );
  return null;
};

exports.dateTimeObjectToMoment = dateTimeObjectToMoment;

var today = function today() {
  return (0, _moment['default'])().format(date_format);
}; //#endregion

exports.today = today;
