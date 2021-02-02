"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ODataFilterService = exports.QueryPredicate = exports.QueryOperator = exports.PropertyMetaData = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _types = require("types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PropertyMetaData = /*#__PURE__*/function () {
  function PropertyMetaData(name, label, type, searchPath, displayPath, isRequired, isIdentity, isSearchable, isDisplayable, maxLength, valueFormat, iOrder, customQueryOperators, inputInitialize) {
    _classCallCheck(this, PropertyMetaData);

    this.name = void 0;
    this.label = void 0;
    this.type = void 0;
    this.maxLength = void 0;
    this.isRequired = void 0;
    this.isSearchable = void 0;
    this.isIdentity = void 0;
    this.isDisplayable = void 0;
    this.propertySearchPath = void 0;
    this.propertyDisplayPath = void 0;
    this.valueFormat = void 0;
    this.index = void 0;
    this.inputTemplate = void 0;
    this.customQueryOperator = void 0;
    this.inputInitialize = void 0;
    this.name = name;
    this.label = label;
    this.type = type;
    this.maxLength = -1;
    this.isRequired = isRequired ? isRequired : false;
    this.isIdentity = isIdentity ? isIdentity : false;
    this.isSearchable = isSearchable ? isSearchable : false;
    this.isDisplayable = isDisplayable ? isDisplayable : false;
    this.propertySearchPath = searchPath;
    this.propertyDisplayPath = displayPath !== null && displayPath !== void 0 ? displayPath : searchPath;
    this.valueFormat = valueFormat ? valueFormat : '.*';
    this.index = iOrder ? iOrder : 0;
    this.inputTemplate = '';
    this.customQueryOperator = customQueryOperators ? customQueryOperators : [];
    this.inputInitialize = inputInitialize;
  }

  _createClass(PropertyMetaData, [{
    key: "validate",
    value: function validate(value) {
      var regTest = new RegExp(this.valueFormat);
      return regTest.test(value);
    }
  }]);

  return PropertyMetaData;
}();

exports.PropertyMetaData = PropertyMetaData;

var QueryOperator = function QueryOperator(displayOperator, key, expression) {
  _classCallCheck(this, QueryOperator);

  this.label = void 0;
  this.key = void 0;
  this.expression = void 0;
  this.label = displayOperator;
  this.key = key;
  this.expression = expression;
};

exports.QueryOperator = QueryOperator;

var QueryPredicate = function QueryPredicate(logicalOperator, modelField, predicateOperator, predicateValue, predicateIndex, groupKey, allowToRemove, addedPredicateOnce) {
  _classCallCheck(this, QueryPredicate);

  this.logical = void 0;
  this.field = void 0;
  this.operator = void 0;
  this.value = void 0;
  this.index = void 0;
  this.group = void 0;
  this.allowToRemove = void 0;
  this.addedPredicateOnce = void 0;
  this.operatorOptions = void 0;

  this.compare = function (a, b) {
    if (a.index < b.index) return -1;
    if (a.index > b.index) return 1;
    return 0;
  };

  this.logical = logicalOperator;
  this.field = modelField;
  this.operator = predicateOperator;
  this.value = predicateValue;
  this.index = predicateIndex !== null && predicateIndex !== void 0 ? predicateIndex : 0;
  this.group = groupKey ? groupKey : 0;
  this.allowToRemove = allowToRemove != null || allowToRemove !== undefined ? allowToRemove : true;
  this.addedPredicateOnce = addedPredicateOnce != null || addedPredicateOnce !== undefined ? addedPredicateOnce : false;
  this.operatorOptions = [];
};

exports.QueryPredicate = QueryPredicate;

var compareOperator = function compareOperator(operator, left, leftType, right, rightType) {
  return reformatExpression(left, leftType) + ' ' + operator + ' ' + reformatExpression(right, rightType);
};

var methodOneParameter = function methodOneParameter(operator, left, leftType, right, rightType) {
  return operator + '(' + reformatExpression(left, leftType) + ',' + reformatExpression(right, rightType) + ')';
}; // eslint-disable-next-line no-unused-vars


var logicalExpression = function logicalExpression(operator, left, leftType, right, rightType) {
  return left + ' ' + operator + ' ' + right;
};

var reformatExpression = function reformatExpression(expression, type) {
  if (!expression) return expression;
  type = type.replace('System.', '');

  if (type.toLowerCase() === 'string') {
    return encodeURIComponent("'" + expression + "'");
  } else if (type === 'DateTimeOffset') {
    //return "cast('" + (typeof expression === "string" ? expression : expression.toISOString()) + "',Edm.DateTimeOffset)";
    //OData v4 doesn't need casting to Edm.DateTimeOffset per this SO post and it works: http://stackoverflow.com/a/31277779/422612
    return typeof expression === 'string' ? expression : expression.toISOString();
  } else if (type === 'DateTime') {
    return "'" + (typeof expression === 'string' ? expression : expression.toISOString()) + "'";
  } else if (type === 'Date') {
    return typeof expression === 'string' ? expression : expression.toISOString().slice(0, 10);
  }

  return expression;
};

var ODataFilterService = function ODataFilterService(defaultSearch, defaultFilters) {
  var _this = this;

  _classCallCheck(this, ODataFilterService);

  this.prePredicates = void 0;
  this.logicalOperators = {
    and: new QueryOperator('And', 'and', logicalExpression),
    or: new QueryOperator('Or', 'or', logicalExpression)
  };
  this.predicateOperators = {
    eq: new QueryOperator('Equal', 'eq', compareOperator),
    lt: new QueryOperator('Less than', 'lt', compareOperator),
    gt: new QueryOperator('Greater than', 'gt', compareOperator),
    ge: new QueryOperator('Greater than or equal to', 'ge', compareOperator),
    le: new QueryOperator('Less than or equal to', 'le', compareOperator),
    ne: new QueryOperator('Not equal', 'ne', compareOperator),
    endswith: new QueryOperator('Ends with', 'endswith', methodOneParameter),
    startswith: new QueryOperator('Starts with', 'startswith', methodOneParameter),
    contains: new QueryOperator('Contains', 'contains', methodOneParameter)
  };

  this.getOperator = function (operator) {
    switch (operator) {
      case _types.QueryOperatorEnum.Equal:
        return 'eq';

      case _types.QueryOperatorEnum.Include:
        return 'contains';

      case _types.QueryOperatorEnum.LargerThan:
        return 'gt';

      case _types.QueryOperatorEnum.LargerThanAndEqual:
        return 'ge';

      case _types.QueryOperatorEnum.LessThan:
        return 'lt';

      case _types.QueryOperatorEnum.LessThanAndEqual:
        return 'le';

      case _types.QueryOperatorEnum.NotEqual:
        return 'ne';

      case _types.QueryOperatorEnum.EndWith:
        return 'endswith';

      case _types.QueryOperatorEnum.StartWith:
        return 'startswith';

      default:
        return 'eq';
    }
  };

  this.createPredicatesFromSearchFilters = function (search, filters) {
    var predicate = [];
    var addOperator = _this.logicalOperators.and;
    var orOperator = _this.logicalOperators.or;
    var index = _this.prePredicates.length;
    var groupIndex = 1;

    if (search && !_lodash["default"].isEmpty(search)) {
      if (search.field.path && _lodash["default"].isArray(search.field.path)) {
        search.field.path.forEach(function (fieldPath) {
          predicate.push(new QueryPredicate(orOperator, new PropertyMetaData(search.key, search.field.label, search.field.type, fieldPath), _this.predicateOperators[_this.getOperator(search.operator)], search.value ? search.value.trim() : '', index++, groupIndex++, true));
        });
      } else {
        predicate.push(new QueryPredicate(addOperator, new PropertyMetaData(search.field.key, search.field.label, search.field.type, search.field.path), _this.predicateOperators[_this.getOperator(search.operator)], search.value ? search.value.trim() : '', index++, groupIndex++, true));
      }
    }

    if (filters && Array.isArray(filters) && filters.length > 0) {
      var filterByKey = _lodash["default"].groupBy(filters, function (f) {
        return f.field.key;
      });

      Object.keys(filterByKey).forEach(function (key, gIndex) {
        var filterGroup = filterByKey[key];
        filterGroup.forEach(function (filter, g) {
          predicate.push(new QueryPredicate(g === 0 ? addOperator : orOperator, new PropertyMetaData(filter.field.key, filter.field.label, filter.field.type, filter.field.path), _this.predicateOperators[filter.operator], filter.value, index++, groupIndex + gIndex, true));
        });
      });
    } //console.log("predicate", predicate);


    return predicate;
  };

  this.getODataFilter = function (search, filters) {
    var newPredicates = _this.prePredicates.concat(_this.createPredicatesFromSearchFilters(search, filters));

    return _this.getODataFilterByPredicates(newPredicates);
  };

  this.getODataFilterByPredicates = function (newPredicates) {
    var filterQuery = '';

    if (newPredicates) {
      if (Array.isArray(newPredicates) && newPredicates.length > 0) {
        var dummyPredicate = new QueryPredicate(); // list of predicate passed

        var currentGroupKey = 0;
        var currentQuery = '';
        var openGroup = 0;
        var sortedPredicate = newPredicates.sort(dummyPredicate.compare);
        filterQuery = '';

        for (var pIndex in sortedPredicate) {
          if (sortedPredicate.hasOwnProperty(pIndex)) {
            var p = sortedPredicate[pIndex];

            if (p.operator && p.operator.expression && p.value) {
              var _p$field;

              if (typeof ((_p$field = p.field) === null || _p$field === void 0 ? void 0 : _p$field.propertySearchPath) === 'function') {
                var _p$field2;

                currentQuery = (_p$field2 = p.field) === null || _p$field2 === void 0 ? void 0 : _p$field2.propertySearchPath(p.operator, p.value, p.field.type);
              } else {
                var _p$field3, _p$field4;

                currentQuery = p.operator.expression(p.operator.key, (_p$field3 = p.field) === null || _p$field3 === void 0 ? void 0 : _p$field3.propertySearchPath, 'expr', p.value, ((_p$field4 = p.field) === null || _p$field4 === void 0 ? void 0 : _p$field4.type) || 'string');
              } //#region handle grouping the query


              var nextPredicate = {};
              var nextIndex = Number(pIndex) + 1;

              if (nextIndex < sortedPredicate.length) {
                nextPredicate = sortedPredicate[nextIndex];
              }

              var addGroup = '',
                  endGroup = '';

              if (currentGroupKey !== p.group) {
                addGroup = ' ( ';
                currentGroupKey = p.group;
                openGroup++;
              }

              if (nextPredicate && !_lodash["default"].isEmpty(nextPredicate) && currentGroupKey !== nextPredicate.group) {
                endGroup = ' ) ';
                currentGroupKey = p.group;
                openGroup--;
              } //#endregion


              if (pIndex === '0' || filterQuery === '') {
                filterQuery = addGroup + currentQuery + endGroup;
              } else {
                var _p$logical;

                filterQuery = (_p$logical = p.logical) === null || _p$logical === void 0 ? void 0 : _p$logical.expression(p.logical.key, filterQuery, 'expr', addGroup + currentQuery + endGroup, 'expr');
              }

              if (nextIndex >= sortedPredicate.length && openGroup > 0) {
                for (var i = 0; i < openGroup; i++) {
                  filterQuery += ' ) ';
                }
              }
            }
          }
        }

        if (filterQuery.length === 0) {
          filterQuery = '';
        }
      } else if (!Array.isArray(newPredicates)) {
        // one predicate passed
        if (newPredicates.field && newPredicates.operator && newPredicates.value) {
          filterQuery = newPredicates.operator.expression(newPredicates.field.propertySearchPath, newPredicates.value);
        }
      }
    } //console.log('filterQuery :', filterQuery);


    return filterQuery;
  };

  this.getODataLogicalOperators = function () {
    return [_this.logicalOperators.and, _this.logicalOperators.or];
  };

  this.getODataOperators = function (operatorsToUse) {
    var operators = [];

    if (!operatorsToUse) {
      operatorsToUse = Object.keys(_this.predicateOperators);
    }

    for (var operator in operatorsToUse) {
      if (operatorsToUse.hasOwnProperty(operator)) {
        operators.push(_this.predicateOperators[operator]);
      }
    }

    return operators;
  };

  this.prePredicates = defaultSearch || defaultFilters ? this.createPredicatesFromSearchFilters(defaultSearch, defaultFilters) : [];
};

exports.ODataFilterService = ODataFilterService;