"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ActionTypes = _interopRequireDefault(require("./ActionTypes"));

var _Utilities = require("../Utilities");

var _ServiceProvider = require("../providers/ServiceProvider");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import moment from "moment";

/**
 * Module Action
 */
var EntityAction = /*#__PURE__*/function () {
  //TODO use IExport interface

  /**
   *
   * @param {object} service entity service that access REST API
   * @param {string} namePluralText text value for entity name Plural
   * @param {string} nameSingularText text value for entity name singular
   */
  function EntityAction(entityService, _actionTypes, _dispatch, namePluralText, nameSingularText, exportsService) {
    var _this = this;

    _classCallCheck(this, EntityAction);

    this.actionTypes = void 0;
    this.currentService = void 0;
    this.namePlural = void 0;
    this.nameSingular = void 0;
    this.displayField = void 0;
    this.keyField = void 0;
    this.namePluralText = void 0;
    this.nameSingularText = void 0;
    this.exportsService = void 0;
    this.notificationService = void 0;
    this.dispatch = void 0;

    this.getEntity = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, onLoaded, expand) {
        var entity;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.dispatch(_this.changeFlag('loading', true));

                _context.prev = 1;
                _context.next = 4;
                return _this.currentService.getEntity(id, expand);

              case 4:
                entity = _context.sent;

                _this.dispatch(_this.changeFlag('loading', false));

                _this.loadEntity(entity)(_this.dispatch);

                if (onLoaded) onLoaded(entity);
                _context.next = 10;
                return _this.loadEntityExtra(id, _this.dispatch);

              case 10:
                return _context.abrupt("return", entity);

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](1);
                console.error(_context.t0);

                _this.dispatch(_this.changeFlag('loading', false));

                _this.error(_this.dispatch, 'GET_ENTITY', _context.t0, "Failed Loading ".concat(_this.nameSingularText));

                return _context.abrupt("return", undefined);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 13]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();

    this.search = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(predicates, page, pageSize, order, orderBy, searchUrl, expand, fixCriteria) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.dispatch({
                  type: _this.actionTypes.searching,
                  payload: {
                    query: {
                      predicates: predicates
                    },
                    page: page,
                    pageSize: pageSize,
                    order: order,
                    orderBy: orderBy
                  }
                });

                return _context2.abrupt("return", _this.currentService.search(predicates, page, pageSize, order, orderBy, searchUrl, expand, fixCriteria).then(function (result) {
                  _this.dispatch({
                    type: _this.actionTypes.search,
                    result: result
                  });

                  return result;
                })["catch"](function (error) {
                  _this.dispatch(_this.changeFlag('loading', false)); // notify.error(errorMessage);
                  //console.log("end Searching, error :", error);


                  _this.error(_this.dispatch, _this.actionTypes.search, error, 'Failed in search ' + _this.namePluralText);

                  return Promise.reject(error);
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.updatePage = function (pageOption) {
      return {
        type: _this.actionTypes.searchUpdatePage,
        pageOption: pageOption
      };
    };

    this.selectEntity = function () {
      var selectedEntity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return function (dispatch) {
        dispatch({
          type: _this.actionTypes.select,
          entity: selectedEntity
        });
      };
    };

    this.loadEntity = function (selectedEntity) {
      return function (dispatch) {
        dispatch({
          type: _this.actionTypes.load,
          entity: selectedEntity,
          actionValue: selectedEntity[_this.keyField]
        });
      };
    };

    this.unselectEntity = function () {
      return {
        type: _this.actionTypes.unselect
      };
    };

    this.selectRow = function (row, index, isSelected) {
      if (isSelected) {
        return {
          type: _this.actionTypes.selectMultiple,
          entity: row
        };
      } else {
        return {
          type: _this.actionTypes.unselectMultiple,
          entity: row
        };
      }
    };

    this.selectAllRows = function (isSelected, rows) {
      if (isSelected) {
        return {
          type: _this.actionTypes.selectAll,
          entities: rows
        };
      } else {
        return {
          type: _this.actionTypes.resetSelected,
          entities: rows
        };
      }
    };

    this.resetSelectedEntities = function () {
      return {
        type: _this.actionTypes.resetSelected
      };
    };

    this.selectAllEntities = function () {
      var selectedEntities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return {
        type: _this.actionTypes.selectAll,
        entity: selectedEntities
      };
    };

    this.changeFlag = function (action, value, extraProps) {
      if (!extraProps) {
        extraProps = {};
      }

      if (_typeof(action) === 'object') {
        //console.log('action', action)
        var _actionName = Object.keys(action)[0];
        var actionValue = action[_actionName];
        return _objectSpread({
          type: _this.actionTypes.flag(_actionName),
          actionName: _actionName,
          actionValue: actionValue,
          payload: value
        }, extraProps);
      } else {
        return _objectSpread({
          type: _this.actionTypes.flag(action),
          actionName: action,
          payload: value
        }, extraProps);
      }
    };

    this.changeProperty = function (propName, value) {
      return {
        type: _this.actionTypes.updateProperty,
        entity: _defineProperty({}, propName, value)
      };
    };

    this.modifyEntity = function (changes) {
      return {
        type: _this.actionTypes.updateProperty,
        entity: changes
      };
    };

    this.saveEntity = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(entity, options) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!entity[_this.keyField]) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", _this.updateEntity(entity, options));

              case 2:
                return _context3.abrupt("return", _this.createEntity(entity, options));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x12, _x13) {
        return _ref3.apply(this, arguments);
      };
    }();

    this.updateEntity = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(entity, options) {
        var data, message, successData, errorTitle;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this.dispatch(_this.changeFlag(_this.actionTypes.update, true));

                _context4.prev = 1;
                _context4.next = 4;
                return _this.currentService.updateEntity(entity, options ? options.properties : null);

              case 4:
                data = _context4.sent;
                message = options && options.successMessage ? options.successMessage : "".concat(_this.nameSingularText, " ").concat(_this.getDisplayValue(entity), " updated successfully.");
                _context4.next = 8;
                return _this.onUpdateSuccessfully(data, _this.dispatch);

              case 8:
                successData = _context4.sent;

                if (options && options.onSuccess) {
                  options.onSuccess(successData);
                } //dispatch(this.changeFlag("saving", false));


                _this.dispatch({
                  type: _this.actionTypes.update,
                  entity: successData
                });

                _this.success(_this.dispatch, _this.actionTypes.update, message);

                _context4.next = 21;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](1);
                errorTitle = "Updating ".concat(_this.nameSingularText, " ").concat(_this.getDisplayValue(entity), " failed");

                if (_context4.t0 && !_context4.t0.message) {
                  _context4.t0.message = "".concat(errorTitle, ". ").concat(_context4.t0.message);
                }

                console.error(_context4.t0);

                if (options && options.onError) {
                  options.onError(_context4.t0);
                }

                _this.error(_this.dispatch, _this.actionTypes.update, _context4.t0, errorTitle);

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 14]]);
      }));

      return function (_x14, _x15) {
        return _ref4.apply(this, arguments);
      };
    }();

    this.createEntity = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(entity, options) {
        var data, successData, message, errorTitle;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this.dispatch(_this.changeFlag(_this.actionTypes.add, true)); //dispatch(this.changeFlag("saving", true));


                _context5.prev = 1;
                _context5.next = 4;
                return _this.currentService.createEntity(entity, options ? options.properties : null);

              case 4:
                data = _context5.sent;
                _context5.next = 7;
                return _this.onAddSuccessfully(data, _this.dispatch);

              case 7:
                successData = _context5.sent;

                if (options && options.onSuccess) {
                  options.onSuccess(successData);
                }

                message = options && options.successMessage ? options.successMessage : "".concat(_this.nameSingularText, " ").concat(_this.getDisplayValue(entity), " added successfully.");

                _this.dispatch({
                  type: _this.actionTypes.add,
                  entity: successData
                });

                _this.success(_this.dispatch, _this.actionTypes.add, message);

                _context5.next = 20;
                break;

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](1);
                errorTitle = "Adding ".concat(_this.nameSingularText, " ").concat(_this.getDisplayValue(entity), " failed");
                console.error(_context5.t0);

                if (options && options.onError) {
                  options.onError(_context5.t0);
                }

                _this.error(_this.dispatch, _this.actionTypes.add, _context5.t0, errorTitle);

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 14]]);
      }));

      return function (_x16, _x17) {
        return _ref5.apply(this, arguments);
      };
    }();

    this.saveEntityChanges = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id, entity, changes, original, options) {
        var data, successData, errorTitle;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this.dispatch(_this.changeFlag('saving', true));

                _context6.prev = 1;
                _context6.next = 4;
                return _this.currentService.saveChanges(id, entity, changes, original);

              case 4:
                data = _context6.sent;
                _context6.next = 7;
                return _this.onUpdateSuccessfully(data, _this.dispatch);

              case 7:
                successData = _context6.sent;

                if (options && options.onSuccess) {
                  options.onSuccess(successData);
                } //TODO use action name


                _this.dispatch(_this.changeFlag('saving', false));

                _this.dispatch({
                  type: _this.actionTypes.save,
                  entity: successData
                });

                _this.success(_this.dispatch, _this.actionTypes.save, "".concat(_this.nameSingularText, " ").concat(_this.getDisplayValue(entity), " updated successfully"));

                _context6.next = 21;
                break;

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6["catch"](1);
                errorTitle = "Updating ".concat(_this.nameSingularText, " ").concat(_this.getDisplayValue(entity), " failed");
                console.error(_context6.t0);

                if (options && options.onError) {
                  options.onError(_context6.t0);
                }

                _this.dispatch(_this.changeFlag('saving', false));

                _this.error(_this.dispatch, _this.actionTypes.save, _context6.t0, errorTitle);

              case 21:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 14]]);
      }));

      return function (_x18, _x19, _x20, _x21, _x22) {
        return _ref6.apply(this, arguments);
      };
    }();

    this.deleteEntity = /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(entity, options) {
        var result, errorTitle;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;

                _this.dispatch(_this.changeFlag(_this.actionTypes["delete"], true));

                _context7.next = 4;
                return _this.currentService.deleteEntity(entity);

              case 4:
                result = _context7.sent;

                if (result) {
                  if (options && options.onSuccess) {
                    options.onSuccess(result);
                  }

                  _this.dispatch({
                    type: _this.actionTypes["delete"],
                    entity: entity
                  });
                } else {
                  if (options && options.onSuccess) {
                    options.onSuccess();
                  }
                }

                _this.success(_this.dispatch, _this.actionTypes["delete"], "".concat(_this.nameSingularText, " ").concat(_this.getDisplayValue(entity), " deleted successfully"));

                return _context7.abrupt("return", result);

              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7["catch"](0);

                if (options && options.onError) {
                  options.onError(_context7.t0);
                }

                errorTitle = "Delete ".concat(_this.nameSingularText, " ").concat(_this.getDisplayValue(entity), " failed");

                _this.error(_this.dispatch, _this.actionTypes["delete"], _context7.t0, errorTitle);

                return _context7.abrupt("return", null);

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 10]]);
      }));

      return function (_x23, _x24) {
        return _ref7.apply(this, arguments);
      };
    }();

    this.deleteEntities = /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(entities, options) {
        var result, errorTitle;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;

                _this.dispatch(_this.changeFlag(_this.actionTypes["delete"], true));

                _context8.next = 4;
                return _this.currentService.deleteEntities(entities);

              case 4:
                result = _context8.sent;

                if (options && options.onSuccess) {
                  options.onSuccess(result);
                }

                _this.dispatch({
                  type: _this.actionTypes["delete"],
                  entities: entities
                });

                _this.success(_this.dispatch, _this.actionTypes["delete"], "Selected ".concat(_this.nameSingularText, " deleted successfully"));

                _context8.next = 15;
                break;

              case 10:
                _context8.prev = 10;
                _context8.t0 = _context8["catch"](0);

                //console.log("Delete Entities error :", error);
                if (options && options.onError) {
                  options.onError(_context8.t0);
                }

                errorTitle = "Delete selected ".concat(_this.nameSingularText, " failed");

                _this.error(_this.dispatch, _this.actionTypes["delete"], _context8.t0, errorTitle);

              case 15:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 10]]);
      }));

      return function (_x25, _x26) {
        return _ref8.apply(this, arguments);
      };
    }();

    this.entitiesActivation = /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(entities, status, activationParameter) {
        var data, message, errorTitle;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _this.dispatch(_this.changeFlag('Loading', true));

                _context9.prev = 1;
                _context9.next = 4;
                return _this.currentService.entitiesActivation(entities, status, activationParameter);

              case 4:
                data = _context9.sent;
                message = "".concat(_this.namePluralText, " items are activated successfully");

                if (data.message) {
                  message = data.message;
                }

                _this.dispatch(_this.changeFlag('Loading', false));

                _this.dispatch({
                  type: _this.actionTypes.Activation,
                  payload: data
                });

                _this.success(_this.dispatch, _this.actionTypes.Activation, message);

                return _context9.abrupt("return", data);

              case 13:
                _context9.prev = 13;
                _context9.t0 = _context9["catch"](1);

                _this.dispatch(_this.changeFlag('Loading', false));

                errorTitle = "Activate selected ".concat(_this.nameSingularText, " failed");

                _this.error(_this.dispatch, _this.actionTypes.Activation, _context9.t0, errorTitle);

                return _context9.abrupt("return", _context9.t0);

              case 19:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[1, 13]]);
      }));

      return function (_x27, _x28, _x29) {
        return _ref9.apply(this, arguments);
      };
    }();

    this.exportEntities = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      var exportType,
          entities,
          searchParams,
          exportConfig,
          _args10 = arguments;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              exportType = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : 'csv';
              entities = _args10.length > 1 ? _args10[1] : undefined;
              searchParams = _args10.length > 2 ? _args10[2] : undefined;
              exportConfig = _args10.length > 3 ? _args10[3] : undefined;
              _context10.t0 = exportType;
              _context10.next = _context10.t0 === 'csv' ? 7 : _context10.t0 === 'pdf' ? 8 : _context10.t0 === 'excel' ? 9 : 10;
              break;

            case 7:
              return _context10.abrupt("return", _this.exportCsv(entities, searchParams, exportConfig));

            case 8:
              return _context10.abrupt("return", _this.exportPdf(entities, searchParams, exportConfig));

            case 9:
              return _context10.abrupt("return", _this.exportExcel(entities, searchParams, exportConfig));

            case 10:
              return _context10.abrupt("return", _this.exportCustomized(entities, searchParams, exportConfig));

            case 11:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    this.exportCsv = /*#__PURE__*/function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(entities, searchParams, exportConfig) {
        var result, errorTitle;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!exportConfig) exportConfig = {};
                _context11.prev = 1;

                _this.dispatch({
                  type: _this.actionTypes.exportingCsv,
                  payload: true
                });

                if (exportConfig) {
                  if (exportConfig.expand) searchParams.expand = exportConfig.expand;
                }

                searchParams.pageSize = -1;
                _context11.next = 7;
                return _this.currentService.exportCSV(entities, searchParams, exportConfig);

              case 7:
                result = _context11.sent;

                _this.dispatch({
                  type: _this.actionTypes.exportingCsv,
                  payload: false
                });

                _this.exportsService.downloadFile(window.URL.createObjectURL(result.blob), result.filename || _this.nameSingularText + '_' + (0, _moment["default"])().format('YYYYMMDDhhmmss') + '.csv');

                _context11.next = 18;
                break;

              case 12:
                _context11.prev = 12;
                _context11.t0 = _context11["catch"](1);
                console.log('error :', _context11.t0);

                _this.dispatch({
                  type: _this.actionTypes.exportingCsv,
                  payload: false
                });

                errorTitle = "Export to Csv for selected ".concat(_this.nameSingularText, " failed");

                _this.error(_this.dispatch, _this.actionTypes.exportingCsv, _context11.t0, errorTitle);

              case 18:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[1, 12]]);
      }));

      return function (_x30, _x31, _x32) {
        return _ref11.apply(this, arguments);
      };
    }();

    this.exportPdf = /*#__PURE__*/function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(entities, searchParams, exportConfig) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      return function (_x33, _x34, _x35) {
        return _ref12.apply(this, arguments);
      };
    }();

    this.exportExcel = /*#__PURE__*/function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(entities, searchParams, exportConfig) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      return function (_x36, _x37, _x38) {
        return _ref13.apply(this, arguments);
      };
    }();

    this.exportCustomized = /*#__PURE__*/function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(entities, searchParams, exportConfig) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      return function (_x39, _x40, _x41) {
        return _ref14.apply(this, arguments);
      };
    }();

    this.runAction = /*#__PURE__*/function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(dispatch, actionType, action, onSuccessMessage, onFailedMessage, extraProps) {
        var result, actionTypes;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!extraProps) extraProps = {};
                _context15.prev = 1;

                _this.start(dispatch, actionType, extraProps);

                result = undefined;

                if (!action) {
                  _context15.next = 8;
                  break;
                }

                _context15.next = 7;
                return action();

              case 7:
                result = _context15.sent;

              case 8:
                if (_typeof(actionType) === 'object') {
                  actionTypes = Object.keys(actionType);
                  actionTypes.forEach(function (actionKey) {
                    dispatch(_objectSpread({
                      type: actionKey,
                      actionValue: actionType[actionKey],
                      payload: result
                    }, extraProps));
                  });
                } else {
                  dispatch({
                    type: actionType,
                    payload: result,
                    extraProps: extraProps
                  });
                }

                _this.success(dispatch, actionType, onSuccessMessage, extraProps);

                return _context15.abrupt("return", result);

              case 13:
                _context15.prev = 13;
                _context15.t0 = _context15["catch"](1);

                _this.error(dispatch, actionType, _context15.t0, onFailedMessage, extraProps);

              case 16:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[1, 13]]);
      }));

      return function (_x42, _x43, _x44, _x45, _x46, _x47) {
        return _ref15.apply(this, arguments);
      };
    }();

    this.start = function (dispatch, action, extraProps) {
      dispatch(_this.changeFlag(action, true, extraProps));
    };

    this.parseError = function (error, message) {
      console.log('error', error, message);
    };

    this.error = function (dispatch, action, error, message) {
      var extraProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      _this.parseError(error, typeof message === 'string' ? message : '');

      if (!error) {
        error = {
          message: message
        };
      } else if (typeof error === 'string') {
        error = {
          message: error,
          title: message
        };
      } else {
        error.title = message;
      }

      dispatch(_this.changeFlag(action, false, extraProps));

      _this.notifyError(message ? message : error.message, {
        error: error
      });

      if (_typeof(action) === 'object') {
        var actionTypes = Object.keys(action);
        actionTypes.forEach(function (actionTypeKey) {
          dispatch(_objectSpread({
            type: _this.actionTypes.error(actionTypeKey),
            actionName: actionTypeKey,
            actionValue: action[actionTypeKey],
            error: error
          }, extraProps));
        });
      } else {
        dispatch(_objectSpread({
          type: _this.actionTypes.error(action),
          actionName: action,
          error: error
        }, extraProps));
      }
    };

    this.success = function (dispatch, action, message) {
      var extraProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      dispatch(_this.changeFlag(action, false, extraProps));

      if (message) {
        _this.notifySuccess(typeof message === 'string' ? message : 'Action completed successfully');
      }
    };

    this.destroy = function () {
      var _this$currentService, _this$exportsService;

      //TODO call abort for any rest calls
      (_this$currentService = _this.currentService) === null || _this$currentService === void 0 ? void 0 : _this$currentService.destroy();
      (_this$exportsService = _this.exportsService) === null || _this$exportsService === void 0 ? void 0 : _this$exportsService.destroy();
    };

    if (!entityService) throw new Error('Service is not defined');
    this.currentService = entityService;
    this.namePlural = entityService.namePlural;
    this.nameSingular = entityService.nameSingular;
    this.displayField = entityService.displayField;
    this.keyField = entityService.keyField;
    this.dispatch = _dispatch;
    this.namePluralText = namePluralText || this.namePlural;
    this.nameSingularText = nameSingularText || this.nameSingular;
    this.exportsService = exportsService ? exportsService : _ServiceProvider.currentServiceProvider.getExportService();
    this.actionTypes = _actionTypes ? _actionTypes : (0, _ActionTypes["default"])(this.namePlural, this.nameSingular);
    this.notificationService = _ServiceProvider.currentServiceProvider.getNotificationService();
  }

  _createClass(EntityAction, [{
    key: "setApiUrl",
    value: function setApiUrl(controller) {
      this.currentService.setRestApiProperties(controller, this.dispatch);
      return {};
    }
  }, {
    key: "toStringFormat",
    value: function toStringFormat(str) {
      if (str) {
        var fChr = str.slice(0, 1).toLowerCase();
        return fChr + str.slice(1, str.length);
      }

      return str;
    }
  }, {
    key: "loadEntityExtra",
    // eslint-disable-next-line no-unused-vars
    value: function () {
      var _loadEntityExtra = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(id, dispatch) {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function loadEntityExtra(_x48, _x49) {
        return _loadEntityExtra.apply(this, arguments);
      }

      return loadEntityExtra;
    }() //search, filters, page, pageSize, order, orderBy

  }, {
    key: "onAddSuccessfully",
    value: function () {
      var _onAddSuccessfully = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(entity, dispatch) {
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                _context17.next = 2;
                return Promise.resolve(entity);

              case 2:
                return _context17.abrupt("return", _context17.sent);

              case 3:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      function onAddSuccessfully(_x50, _x51) {
        return _onAddSuccessfully.apply(this, arguments);
      }

      return onAddSuccessfully;
    }()
  }, {
    key: "onUpdateSuccessfully",
    value: function () {
      var _onUpdateSuccessfully = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(entity, dispatch) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return Promise.resolve(entity);

              case 2:
                return _context18.abrupt("return", _context18.sent);

              case 3:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      function onUpdateSuccessfully(_x52, _x53) {
        return _onUpdateSuccessfully.apply(this, arguments);
      }

      return onUpdateSuccessfully;
    }()
  }, {
    key: "getDisplayValue",
    value: function getDisplayValue(entity) {
      return (0, _Utilities.getDisplayValue)(entity, this.displayField);
    }
  }, {
    key: "notifySuccess",
    value: function notifySuccess(message, options) {
      var _this$notificationSer;

      (_this$notificationSer = this.notificationService) === null || _this$notificationSer === void 0 ? void 0 : _this$notificationSer.notifySuccess(message, options);
    }
  }, {
    key: "notifyError",
    value: function notifyError(message, options) {
      var _this$notificationSer2;

      (_this$notificationSer2 = this.notificationService) === null || _this$notificationSer2 === void 0 ? void 0 : _this$notificationSer2.notifyError(message, options);
    }
  }]);

  return EntityAction;
}();

exports["default"] = EntityAction;