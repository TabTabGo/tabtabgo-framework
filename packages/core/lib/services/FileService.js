'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _ServiceProvider = require('../providers/ServiceProvider');

var _moment = _interopRequireDefault(require('moment'));

var _Appsettings = require('../Appsettings');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var FileService = function FileService() {
  var _this = this;

  var _controller = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'files';

  _classCallCheck(this, FileService);

  this.restApi = void 0;

  this._new = function () {
    var controller = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'files';
    return new FileService(controller);
  };

  this.getImageUrl = function (url) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';

    if (url && /^\/\d+$/.test(url)) {
      return ''
        .concat(_Appsettings.AppSettings.baseApiUrl, '/files')
        .concat(url, '/image/')
        .concat(size);
    }

    return _this.getFileUrl(url);
  };

  this.getFileUrl = function (url) {
    // if the url format is /<number> return url else if start with / then return with api/files else return url
    if (url) {
      if (/^\/\d+$/.test(url))
        return ''.concat(_Appsettings.AppSettings.baseApiUrl, '/files').concat(url);
      else if (/^\/[a-zA-Z].*$/.test(url)) {
        return ''.concat(_Appsettings.AppSettings.baseApiUrl).concat(url);
      } else return url;
    }

    return null;
  };

  this.uploadFile = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee(blob, _ref, url) {
        var fileName, extension, fileInfo, data, prop;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                (fileName = _ref.fileName),
                  (extension = _ref.extension),
                  (fileInfo = _objectWithoutProperties(_ref, ['fileName', 'extension']));
                data = new FormData();

                for (prop in fileInfo) {
                  if (prop !== 'fileName' && prop !== 'extension') {
                    data.append(prop, fileInfo[prop]);
                  }
                }

                if (!extension && fileName) {
                  extension = fileName.split('.').pop();
                }

                if (extension) data.append('fileExtension', extension);

                if (!fileName) {
                  fileName = 'File_'
                    .concat((0, _moment['default'])().format('YYYYMMDDmmhhss'), '.')
                    .concat(extension);
                }

                data.append('formFile', blob, fileName);
                return _context.abrupt(
                  'return',
                  _this.restApi.Post({
                    url: url ? url : '/Create',
                    isFormData: true,
                    body: data,
                    actionDescription: 'Uploading file',
                  }),
                );

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      }),
    );

    return function (_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  })();

  this.destroy = function () {};

  this.restApi = _ServiceProvider.currentServiceProvider.newAjaxService(_controller);
};

exports['default'] = FileService;
