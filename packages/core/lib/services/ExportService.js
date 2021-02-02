"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ColumnConfiguration = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _DateFormats = require("../DateFormats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//TODO user lazy loading
//import pdfMake from "pdfmake/build/pdfmake";
//import pdfFonts from "pdfmake/build/vfs_fonts";
// The size of PDF library is huge need to have to loaded in separate chunk
//pdfMake.vfs = pdfFonts.pdfMake.vfs;
var getTitle = function getTitle(value) {
  var regex = /([A-Z]{1})/g;
  var str = value.replace(regex, function (match, p1) {
    return ' ' + p1;
  });
  str = str.substr(0, 1).toUpperCase() + str.substr(1, str.length);
  return str;
};

var ColumnConfiguration = function ColumnConfiguration(_ref) {
  var field = _ref.field,
      title = _ref.title,
      width = _ref.width,
      format = _ref.format,
      config = _objectWithoutProperties(_ref, ["field", "title", "width", "format"]);

  return {
    title: title ? title : getTitle(field),
    field: field,
    width: width || 'auto',
    "export": config["export"] || ['all'],
    format: format ? format : function (v) {
      var dateRegex = /^\d{4}-\d{2}-\d{2}.*/g;

      if (dateRegex.test(v)) {
        return (0, _DateFormats.datetimeFormat)(v);
      }

      return v;
    }
  };
};

exports.ColumnConfiguration = ColumnConfiguration;

var ExportService = /*#__PURE__*/function () {
  function ExportService(_config) {
    var _this = this;

    _classCallCheck(this, ExportService);

    this.config = void 0;

    this.getValue = function (entity, columnConfig) {
      if (entity) {
        var properties = columnConfig.field.split('.');
        var value = {};

        for (var pIndex in properties) {
          value = entity[properties[pIndex]];
        }

        return columnConfig.format(value);
      }

      return '';
    };

    this.getConfig = function (entity) {
      if (_this.config.columns) {
        return _this.config;
      }

      var headers = [];

      for (var prop in entity) {
        if (_typeof(entity[prop]) !== 'object' && typeof entity[prop] !== 'function') {
          headers.push(prop);
        }
      }

      _this.config.columns = _this.config.columns || headers.map(function (h) {
        return ColumnConfiguration({
          field: h.toString()
        });
      });
      return _this.config;
    };

    this._new = function (config) {
      return new ExportService(config);
    };

    this.generateCsvFile = function (entities) {
      if (!entities || entities.length === 0) return '';

      var config = _this.getConfig(entities[0]);

      var lines = [];
      var columns = config.columns.filter(function (c) {
        return c["export"] && (c["export"].includes('csv') || c["export"].includes('all'));
      }); //Add column

      lines.push(columns.map(function (c) {
        return c.title;
      }).join(',')); //Add Values

      var _loop = function _loop(entityIndex) {
        lines.push(columns.map(function (c) {
          return _this.getValue(entities[entityIndex], c);
        }).join(','));
      };

      for (var entityIndex in entities) {
        _loop(entityIndex);
      }

      return lines.join('\n');
    };

    this.downloadFile = function (content, fileName, waitTime) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var link = document.createElement('a');
          link.name = fileName;
          link.setAttribute('href', content);
          link.setAttribute('download', fileName);
          document.body.appendChild(link); // Required for FF

          link.target = '_blank';
          link.click(); // This will download the data file named "my_data.csv".
          //return resolve(link);
        }, waitTime ? waitTime : 1);
      });
    };

    this.openFile = function (content, fileName, waitTime) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var link = document.createElement('a');
          link.name = fileName;
          link.setAttribute('href', content);
          link.setAttribute('download', fileName);
          document.body.appendChild(link); // Required for FF

          link.click(); // This will download the data file named "my_data.csv".

          link.target = '_tab';
        }, waitTime ? waitTime : 1);
      });
    };

    this.exportCsv = function (entities) {
      var config = _this.getConfig(entities[0]);

      var content = _this.generateCsvFile(entities);

      var csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(content); //var encodedUri = encodeURI(csvContent);

      return _this.downloadFile(csvContent, config.fileName + '.csv');
    };

    this.exportPDF = function (entities) {
      var config = _this.getConfig(entities[0]);

      var content = [];

      if (config.pageTitle) {
        content.push({
          text: config.pageTitle,
          style: 'header'
        });
      }

      var columns = config.columns.filter(function (c) {
        return c["export"] && (c["export"].includes('pdf') || c["export"].includes('all'));
      });

      if (columns) {
        var body = [],
            row = [];
        body.push(columns.map(function (c) {
          return {
            text: c.title,
            style: 'tableHeader'
          };
        }));

        var _loop2 = function _loop2(index) {
          row = columns.map(function (c) {
            return _this.getValue(entities[index], c);
          });
          body.push(row);
        };

        for (var index = 0; index < entities.length; index++) {
          _loop2(index);
        }

        content.push({
          style: 'tableStandard',
          table: {
            widths: columns.map(function (c) {
              return c.width;
            }),
            headerRows: 1,
            body: body
          },
          layout: 'lightHorizontalLines'
        });
      } //TODO use pdfMake if required


      return new Promise(function () {}); // var docDefinition = {
      //   content: content,
      //   styles: {
      //     header: {
      //       fontSize: 18,
      //       bold: true,
      //       margin: [0, 0, 0, 10]
      //     },
      //     subheader: {
      //       fontSize: 16,
      //       bold: true,
      //       margin: [0, 10, 0, 5]
      //     },
      //     tableStandard: {
      //       margin: [0, 5, 0, 15]
      //     },
      //     tableHeader: {
      //       bold: true,
      //       fontSize: 13,
      //       color: "black"
      //     }
      //   },
      //   pageOrientation: "landscape",
      //   defaultStyle: {}
      // };
      // pdfMake.createPdf(docDefinition).download(config.fileName+".pdf");
    };

    this.print = function (entities) {
      var config = _this.getConfig(entities[0]);

      var strHeader = _this.config.columns.map(function (c) {
        return "<th>".concat(c.title, "</th>");
      }).join('');

      var strBody = entities.map(function (row) {
        return '<tr>' + config.columns.map(function (c) {
          return "<td>".concat(_this.getValue(row, c), "</td>");
        }).join('') + '</tr>';
      }).join('');
      var html = "\n                    <html>\n                    <head>\n                        <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css\">\n                        <style>\n                        @page {\n                            size:landscape;\n                        }\n                        </style>\n                    </head>\n                    <body>\n                        <table className=\"table table-bordered\">\n                            <thead>\n                                <tr>".concat(strHeader, "</tr>\n                            </thead>\n                            <tbody>\n                                ").concat(strBody, "            \n                            </tbody>\n                        \n                        </table>\n                    </body>\n                    </html>\n                    ");
      var iFrameComponent = document.getElementById('ifmcontentstoprint');
      var pri = iFrameComponent.contentWindow;
      pri.document.open();
      pri.document.write(html);
      pri.document.close();
      return new Promise(function (resolve) {
        setTimeout(function () {
          pri.focus();
          pri.print();
        }, 1000);
      });
    };

    this.config = _config;
    if (!this.config.fileName) this.config.fileName = _config.namePlural + '_' + (0, _moment["default"])().format('YYYYMMDDhhmmss');
  } //#region private functions


  _createClass(ExportService, [{
    key: "destroy",
    value: function destroy() {}
  }]);

  return ExportService;
}();

exports["default"] = ExportService;