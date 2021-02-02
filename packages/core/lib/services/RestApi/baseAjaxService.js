'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _ServiceProvider = require('../../providers/ServiceProvider');

var _Appsettings = require('../../Appsettings');

var _TTGError = require('../../types/TTGError');

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

var BaseAjaxService = /*#__PURE__*/ (function () {
  function BaseAjaxService(controller, prefixUrl, dispatch, appSettings) {
    var _this = this;

    _classCallCheck(this, BaseAjaxService);

    this.sessionManger = void 0;
    this.controller = void 0;
    this.appSettings = void 0;
    this.prefixUrl = void 0;
    this.dispatch = void 0;

    this.resetPage = function () {
      //reset all what in session
      _this.sessionManger.resetToken(); //if (window) window.location.reload();
    };

    this.parseUrl = function () {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var buildQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var concatBaseUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var regex = /:(\w+)\/?/g;
      var m;

      while ((m = regex.exec(url)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        } // The result can be accessed through the `m`-variable.

        for (var i = 0; i < m.length; i++) {
          var match = m[i];

          if (parameters[match]) {
            url = url.replace(':'.concat(match), parameters[match]);
            delete parameters[match];
          }
        }
      }

      if (buildQuery) {
        var prefix = url.lastIndexOf('?') > 0 ? '&' : '?';

        for (var propName in parameters) {
          url = url.concat(''.concat(prefix).concat(propName, '=').concat(parameters[propName]));

          if (prefix === '?') {
            prefix = '&';
          }
        }
      }

      var finialUrl = '';

      if (url.startsWith('//')) {
        finialUrl = url.slice(2);
      } else {
        if (url.startsWith('/')) {
          url = url.slice(1);
        }

        if (url.startsWith('?')) finialUrl = ''.concat(_this.controller).concat(url);
        else finialUrl = ''.concat(_this.controller, '/').concat(url);
      }

      if (concatBaseUrl) {
        var _AppSettings$baseApiU;

        finialUrl = ''
          .concat(
            (_AppSettings$baseApiU = _Appsettings.AppSettings.baseApiUrl) !== null &&
              _AppSettings$baseApiU !== void 0
              ? _AppSettings$baseApiU
              : '',
            '/',
          )
          .concat(_this.prefixUrl)
          .concat(finialUrl);
      }

      return finialUrl;
    };

    this.sessionManger = _ServiceProvider.currentServiceProvider.getStorageService();
    this.controller = controller;
    this.appSettings = Object.assign(
      {},
      _Appsettings.AppSettings,
      appSettings !== null && appSettings !== void 0 ? appSettings : {},
    );
    this.dispatch = dispatch;
    this.prefixUrl = '';
    if (prefixUrl && !prefixUrl.endsWith('/')) this.prefixUrl = prefixUrl + '/';
  }

  _createClass(BaseAjaxService, [
    {
      key: '_new',
      value: function _new(controller, prefixUrl, dispatch, appSettings) {
        throw new Error('Method not implemented.');
      },
    },
    {
      key: 'destroy',
      value: function destroy() {},
    },
    {
      key: 'Abort',
      value: (function () {
        var _Abort = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee(allRequests) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    throw new _TTGError.TTGError('Abort is not implemented');

                  case 1:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee);
          }),
        );

        function Abort(_x) {
          return _Abort.apply(this, arguments);
        }

        return Abort;
      })(),
    },
    {
      key: 'Get',
      value: function Get(_ref) {
        var url = _ref.url,
          parameters = _ref.parameters,
          header = _ref.header,
          actionDescription = _ref.actionDescription,
          notifyOnError = _ref.notifyOnError,
          responseType = _ref.responseType,
          responseEncoding = _ref.responseEncoding;
        return this.restApi(
          'GET',
          url,
          parameters,
          undefined,
          header,
          responseType,
          responseEncoding,
          actionDescription,
          notifyOnError,
        );
      },
    },
    {
      key: 'Put',
      value: function Put(_ref2) {
        var url = _ref2.url,
          parameters = _ref2.parameters,
          body = _ref2.body,
          header = _ref2.header,
          actionDescription = _ref2.actionDescription,
          notifyOnError = _ref2.notifyOnError,
          responseType = _ref2.responseType,
          responseEncoding = _ref2.responseEncoding;
        return this.restApi(
          'PUT',
          url,
          parameters,
          body,
          header,
          responseType,
          responseEncoding,
          actionDescription,
          notifyOnError,
        );
      },
    },
    {
      key: 'Patch',
      value: function Patch(_ref3) {
        var url = _ref3.url,
          parameters = _ref3.parameters,
          body = _ref3.body,
          header = _ref3.header,
          actionDescription = _ref3.actionDescription,
          notifyOnError = _ref3.notifyOnError,
          responseType = _ref3.responseType,
          responseEncoding = _ref3.responseEncoding;
        return this.restApi(
          'PATCH',
          url,
          parameters,
          body,
          header,
          responseType,
          responseEncoding,
          actionDescription,
          notifyOnError,
        );
      },
    },
    {
      key: 'Post',
      value: function Post(_ref4) {
        var url = _ref4.url,
          parameters = _ref4.parameters,
          body = _ref4.body,
          header = _ref4.header,
          actionDescription = _ref4.actionDescription,
          notifyOnError = _ref4.notifyOnError,
          isFormData = _ref4.isFormData,
          responseType = _ref4.responseType,
          responseEncoding = _ref4.responseEncoding;
        return this.restApi(
          'POST',
          url,
          parameters,
          body,
          header,
          responseType,
          responseEncoding,
          actionDescription,
          notifyOnError,
          isFormData,
        );
      },
    },
    {
      key: 'Delete',
      value: function Delete(_ref5) {
        var url = _ref5.url,
          parameters = _ref5.parameters,
          body = _ref5.body,
          header = _ref5.header,
          actionDescription = _ref5.actionDescription,
          notifyOnError = _ref5.notifyOnError,
          responseType = _ref5.responseType,
          responseEncoding = _ref5.responseEncoding;
        return this.restApi(
          'DELETE',
          url,
          parameters,
          body,
          header,
          responseType,
          responseEncoding,
          actionDescription,
          notifyOnError,
        );
      },
    },
    {
      key: 'restApi',
      value: (function () {
        var _restApi = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(
            method,
            url,
            parameters,
            body,
            header,
            responseType,
            responseEncoding,
            actionDescription,
            notifyOnError,
            isFormData,
          ) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    throw new _TTGError.TTGError('restApi is not implemented');

                  case 1:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2);
          }),
        );

        function restApi(_x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
          return _restApi.apply(this, arguments);
        }

        return restApi;
      })(),
    },
    {
      key: 'reduxDispatch',
      value: function reduxDispatch(action) {
        if (this.dispatch) {
          this.dispatch(action);
        }
      },
    },
    {
      key: 'getFilename',
      value: function getFilename(response) {
        var filename = '';
        var disposition = response.headers.get('Content-Disposition'); //console.log("response.headers", response.headers);
        //console.log("disposition", disposition);

        if (disposition && disposition.indexOf('inline') !== -1) {
          var filenameRegex = /filename=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);

          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }

        return filename;
      },
    },
  ]);

  return BaseAjaxService;
})();

exports['default'] = BaseAjaxService;
