"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ServiceProvider = require("../providers/ServiceProvider");

var _ODataService = require("../services/ODataService");

var _Utilities = require("../Utilities");

var _OrderDirection = require("../types/enums/OrderDirection");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EntityService = /*#__PURE__*/function () {
  //TODO create RestApi Interface
  //TODO create QueryFilterService interface

  /**
   *
   * @param {string} namePlural
   * @param {string} nameSingular
   * @param {string || func} displayField
   * @param {string} keyField
   * @param {string} apiUrl
   * @param {string} namePluralText text value for entity name Plural
   * @param {string} nameSingularText text value for entity name singular
   * @param {string} prefixUrl prefix url can be used for Ajax API calls
   */
  function EntityService(namePlural, nameSingular, displayField, //= "name",
  keyField, //= "id",
  apiUrl, //= "",
  namePluralText, nameSingularText, prefixUrl) {
    _classCallCheck(this, EntityService);

    this.restApi = void 0;
    this.queryService = void 0;
    this.namePlural = void 0;
    this.nameSingular = void 0;
    this.displayField = void 0;
    this.keyField = void 0;
    this.namePluralText = void 0;
    this.nameSingularText = void 0;
    this.restApi = _ServiceProvider.currentServiceProvider.newAjaxService(apiUrl ? apiUrl : this.toStringFormat(namePlural), prefixUrl, {});
    this.queryService = new _ODataService.ODataFilterService();
    this.namePlural = namePlural;
    this.nameSingular = nameSingular;
    this.namePluralText = namePluralText ? namePluralText : namePlural;
    this.nameSingularText = nameSingularText ? nameSingularText : nameSingular;
    this.displayField = displayField ? displayField : 'name';
    this.keyField = keyField ? keyField : 'id';
  }

  _createClass(EntityService, [{
    key: "setEntityActionProperties",
    value: function setEntityActionProperties(props) {
      Object.assign(this, props);
    }
  }, {
    key: "setRestApiProperties",
    value: function setRestApiProperties(_ref) {
      var controller = _ref.controller,
          dispatch = _ref.dispatch;
      if (controller) this.restApi.controller = controller;
      if (dispatch) this.restApi.dispatch = dispatch;
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
    key: "getEntity",
    value: function () {
      var _getEntity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, expand) {
        var parameters, entity;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                parameters = {
                  id: id
                };

                if (expand) {
                  parameters.expand = expand;
                }

                _context.next = 4;
                return this.restApi.Get({
                  url: ':id',
                  parameters: parameters,
                  actionDescription: "Getting ".concat(this.nameSingularText, " id:").concat(id)
                });

              case 4:
                entity = _context.sent;
                return _context.abrupt("return", this.populateEntityAfterReceive(entity));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getEntity(_x, _x2) {
        return _getEntity.apply(this, arguments);
      }

      return getEntity;
    }()
    /**
     *
     * @param result search response from server.
     * @param searchQuery search query that send to server: TODO use SearchQuery type
     */

  }, {
    key: "parseSearchResult",
    value: function parseSearchResult(result, searchQuery) {
      return {
        page: Number(result.page),
        //== 0 ? Number(result.number) + 1 : Number(result.number),
        totalRecords: Number(result.totalItems),
        totalPages: Number(result.totalPages),
        pageSize: Number(result.pageSize),
        numberOfElements: Number(result.count),
        last: result.page === result.totalPages,
        first: Number(result.page) === 1,
        hasPreviousPage: result.hasPreviousPage,
        hasNextPage: result.hasNextPage,
        query: {
          searchUrl: searchQuery.searchUrl,
          params: searchQuery.params
        },
        items: result.items
      };
    }
  }, {
    key: "getSearchParameters",
    value: function getSearchParameters(order, orderBy, expand, page, pageSize) {
      var params = {};

      if (order && orderBy) {
        params.$orderBy = "".concat(orderBy, " ").concat(order);
      }

      if (expand) {
        params.$expand = expand;
      }

      if (page && pageSize) {
        params.$skip = page * pageSize;
      }

      if (pageSize) {
        params.$top = pageSize;
      }

      return params;
    }
  }, {
    key: "getSearchQuery",
    value: function getSearchQuery(predicates, order, orderBy, url, expand) {
      var searchQuery = {
        params: {},
        searchUrl: url
      }; //TODO use searchQuery Type

      if (predicates && predicates.length > 0) {
        var filterQuery = this.queryService.getODataFilter(predicates);
        if (filterQuery) searchQuery.params.$filter = filterQuery;
      }

      searchQuery.params = Object.assign({}, searchQuery.params, this.getSearchParameters(order, orderBy, expand));
      return searchQuery;
    }
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(predicates, page, pageSize, order, orderBy) {
        var searchUrl,
            expand,
            fixCriteria,
            searchQuery,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                searchUrl = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : '';
                expand = _args2.length > 6 && _args2[6] !== undefined ? _args2[6] : '';
                fixCriteria = _args2.length > 7 ? _args2[7] : undefined;
                // console.log('search', page, pageSize, order, orderBy, searchUrl);
                if (!order) order = _OrderDirection.OrderDirection.Asc;

                if (fixCriteria) {
                  predicates = predicates.concat(fixCriteria);
                }

                searchQuery = this.getSearchQuery(predicates, order, orderBy, searchUrl, expand); //console.log("searchQuery", searchQuery);

                return _context2.abrupt("return", this.internalSearch(searchQuery.searchUrl, searchQuery.params, page, pageSize));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function search(_x3, _x4, _x5, _x6, _x7) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "internalSearch",
    value: function () {
      var _internalSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(searchUrl, parameters, page, pageSize) {
        var result, errorMessage;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!parameters) {
                  parameters = {};
                }

                parameters = Object.assign({}, parameters, this.getSearchParameters(undefined, undefined, undefined, page, pageSize));
                _context3.prev = 2;
                _context3.next = 5;
                return this.restApi.Get({
                  url: searchUrl,
                  parameters: parameters
                });

              case 5:
                result = _context3.sent;
                return _context3.abrupt("return", this.parseSearchResult(result, {
                  params: parameters,
                  searchUrl: searchUrl
                }));

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);
                errorMessage = 'Failed in searching ' + this.namePluralText;

                if (_context3.t0.message) {
                  errorMessage += "; ".concat(_context3.t0.message);
                } // notify.error(errorMessage);


                throw Error(errorMessage);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 9]]);
      }));

      function internalSearch(_x8, _x9, _x10, _x11) {
        return _internalSearch.apply(this, arguments);
      }

      return internalSearch;
    }()
    /**
     * Update entity properties before sent to server. Used by update and create
     * @param {*Object} entity
     */

  }, {
    key: "populateEntityAfterReceive",
    value: function populateEntityAfterReceive(entity, responseData) {
      return _objectSpread(_objectSpread({}, entity), responseData);
    }
    /**
     * Update entity properties before sent to server. Used by update and create
     * @param {*Object} entity
     */

  }, {
    key: "populateEntityBeforeSend",
    value: function populateEntityBeforeSend(entity) {
      return entity;
    }
  }, {
    key: "populateChangesAfterReceive",
    value: function populateChangesAfterReceive(entity, responseData) {
      return _objectSpread(_objectSpread({}, entity), responseData);
    }
    /**
     * Update changes before send to server
     * @param changes
     */

  }, {
    key: "populateChangesBeforeSend",
    value: function populateChangesBeforeSend(changes) {
      return changes;
    }
    /**
     * RESTApi PATCH request parameters
     * @param {*Object} entityChanges
     */

  }, {
    key: "getPatchEntityParameters",
    value: function getPatchEntityParameters(id, entityChanges) {
      return {
        url: ":id/json",
        parameters: {
          id: id
        },
        body: entityChanges,
        actionDescription: "Save changes for ".concat(this.nameSingularText, " ").concat(this.getDisplayValue(entityChanges))
      };
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "saveChanges",
    value: function () {
      var _saveChanges = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, entity, changes, original) {
        var changesBeforeSend, patchParameters, responseData;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                //let entityBeforeSend = this.populateEntityBeforeSend(entity);
                //let originalBeforeSend = original ? this.populateEntityBeforeSend(original) : original;
                //var jsonPatchDocument = jiff.diff( originalBeforeSend, entityBeforeSend);
                changesBeforeSend = changes ? this.populateChangesBeforeSend(changes) : changes;
                patchParameters = this.getPatchEntityParameters(id, changesBeforeSend);
                _context4.next = 4;
                return this.restApi.Patch(patchParameters);

              case 4:
                responseData = _context4.sent;
                return _context4.abrupt("return", this.postUpdateEntity(this.populateChangesAfterReceive(entity, responseData)));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function saveChanges(_x12, _x13, _x14, _x15) {
        return _saveChanges.apply(this, arguments);
      }

      return saveChanges;
    }()
    /**
     * Save entity. If identity column is not null or not 0 then update entity else create
     * Props : save properties need it for update request or create request
     */

  }, {
    key: "saveEntity",
    value: function () {
      var _saveEntity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(entity, props) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!entity[this.keyField]) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", this.updateEntity(entity, props));

              case 2:
                return _context5.abrupt("return", this.createEntity(entity, props));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function saveEntity(_x16, _x17) {
        return _saveEntity.apply(this, arguments);
      }

      return saveEntity;
    }()
    /**
     * RESTApi PUT request parameters
     * @param {*Object} entity
     */

  }, {
    key: "getUpdateEntityParameters",
    value: function getUpdateEntityParameters(entity, props) {
      entity = this.populateEntityBeforeSend(entity);
      var requestParameters = {
        url: props && props.url ? props.url : ':id',
        parameters: {
          id: entity[this.keyField]
        },
        body: entity,
        actionDescription: "Update ".concat(this.nameSingularText, " ").concat(this.getDisplayValue(entity))
      };

      if (props && props.parameters) {
        requestParameters.parameters = Object.assign(requestParameters.parameters, props.parameters);
      }

      return requestParameters;
    }
  }, {
    key: "postUpdateEntity",
    value: function postUpdateEntity(entity) {
      return entity;
    }
    /**
     * Update entity in DB
     * @param {*object} entity
     */

  }, {
    key: "updateEntity",
    value: function () {
      var _updateEntity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(entity, props) {
        var updateParameters, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                updateParameters = this.getUpdateEntityParameters(entity, props);
                _context6.next = 3;
                return this.restApi.Put(updateParameters);

              case 3:
                response = _context6.sent;
                return _context6.abrupt("return", this.postUpdateEntity(this.populateEntityAfterReceive(entity, response)));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateEntity(_x18, _x19) {
        return _updateEntity.apply(this, arguments);
      }

      return updateEntity;
    }()
  }, {
    key: "getCreateEntityParameters",
    value: function getCreateEntityParameters(entity, props) {
      var populatedEntity = this.populateEntityBeforeSend(entity);
      var requestParameters = {
        url: props && props.url ? props.url : '',
        body: populatedEntity,
        actionDescription: "Adding ".concat(this.nameSingularText, " ").concat(this.getDisplayValue(populatedEntity))
      };

      if (props && props.parameters) {
        requestParameters.parameters = props.parameters;
      }

      return requestParameters;
    }
  }, {
    key: "postCreateEntity",
    value: function postCreateEntity(entity) {
      return entity;
    }
  }, {
    key: "createEntity",
    value: function () {
      var _createEntity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(entity, props) {
        var addParameters, data;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                addParameters = this.getCreateEntityParameters(entity, props); //console.log("addParameters :", addParameters);

                _context7.next = 3;
                return this.restApi.Post(addParameters);

              case 3:
                data = _context7.sent;

                if (data) {
                  entity = Object.assign({}, entity, data);
                }

                if (data && this.keyField && data[this.keyField]) {
                  entity = Object.assign({}, entity, {
                    id: data[this.keyField]
                  });
                }

                return _context7.abrupt("return", this.postCreateEntity(this.populateEntityAfterReceive(entity, data)));

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function createEntity(_x20, _x21) {
        return _createEntity.apply(this, arguments);
      }

      return createEntity;
    }()
  }, {
    key: "deleteEntity",
    value: function () {
      var _deleteEntity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(entity) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.restApi.Delete({
                  url: ':id',
                  parameters: {
                    id: entity[this.keyField]
                  },
                  actionDescription: "Delete ".concat(this.nameSingularText, " ").concat(this.getDisplayValue(entity))
                });

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function deleteEntity(_x22) {
        return _deleteEntity.apply(this, arguments);
      }

      return deleteEntity;
    }()
  }, {
    key: "deleteEntities",
    value: function () {
      var _deleteEntities = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(entities) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.restApi.Delete({
                  body: entities.map(function (item) {
                    return item[_this.keyField];
                  }),
                  actionDescription: "Delete ".concat(entities.length, " ").concat(this.namePluralText)
                });

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function deleteEntities(_x23) {
        return _deleteEntities.apply(this, arguments);
      }

      return deleteEntities;
    }()
  }, {
    key: "entitiesActivation",
    value: function () {
      var _entitiesActivation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(entities) {
        var _this2 = this,
            _parameters;

        var status,
            activationParameter,
            ids,
            data,
            message,
            _args10 = arguments;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                status = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : true;
                activationParameter = _args10.length > 2 ? _args10[2] : undefined;
                ids = entities.map(function (e) {
                  return e[_this2.keyField];
                });
                _context10.next = 5;
                return this.restApi.Post({
                  url: '/activation',
                  parameters: (_parameters = {}, _defineProperty(_parameters, activationParameter ? activationParameter : this.nameSingular.toLowerCase(), ids.join(',')), _defineProperty(_parameters, "status", status === undefined ? true : status), _parameters),
                  actionDescription: "Activate ".concat(this.namePluralText)
                });

              case 5:
                data = _context10.sent;
                message = "".concat(this.namePluralText, " is activated");

                if (data.message) {
                  message = data.message;
                }

                return _context10.abrupt("return", _objectSpread(_objectSpread({}, data), {}, {
                  message: message
                }));

              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function entitiesActivation(_x24) {
        return _entitiesActivation.apply(this, arguments);
      }

      return entitiesActivation;
    }()
  }, {
    key: "exportCSV",
    value: function () {
      var _exportCSV = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(entities, searchParams, exportConfig) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", this.internalExport('csv', entities, searchParams, exportConfig));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function exportCSV(_x25, _x26, _x27) {
        return _exportCSV.apply(this, arguments);
      }

      return exportCSV;
    }()
    /**
     *
     * @param exportType
     * @param entityKeys
     * @param searchParams
     * @param exportConfig
     */

  }, {
    key: "internalExport",
    value: function () {
      var _internalExport = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(exportType, entityKeys, searchParams, exportConfig) {
        var config, searchQuery, url;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!searchParams) searchParams = {};
                if (!exportConfig) exportConfig = {};
                config = _objectSpread(_objectSpread({}, exportConfig), {}, {
                  fileType: exportType,
                  filterKeys: entityKeys
                });
                searchQuery = this.getSearchQuery(searchParams.query.predicates, searchParams.order, searchParams.orderBy, searchParams.url, searchParams.expand);
                searchQuery.params.$top = searchParams.pageSize;
                url = "/export/".concat(exportType);
                if (searchQuery.searchUrl) url = searchQuery.searchUrl;
                if (exportConfig && exportConfig.url) url = exportConfig.url;
                return _context12.abrupt("return", this.restApi.Post({
                  url: url,
                  parameters: searchQuery.params,
                  body: config
                }));

              case 9:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function internalExport(_x28, _x29, _x30, _x31) {
        return _internalExport.apply(this, arguments);
      }

      return internalExport;
    }()
  }, {
    key: "getDisplayValue",
    value: function getDisplayValue(entity) {
      return (0, _Utilities.getDisplayValue)(entity, this.displayField);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.restApi.Abort(true);
    }
  }]);

  return EntityService;
}();

exports["default"] = EntityService;