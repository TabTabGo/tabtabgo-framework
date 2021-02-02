"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Predicate = exports.QueryOperatorEnum = exports.LogicalOperator = exports.PredicateType = void 0;

var _Formats = require("../Formats");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PredicateType;
exports.PredicateType = PredicateType;

(function (PredicateType) {
  PredicateType[PredicateType["Search"] = 0] = "Search";
  PredicateType[PredicateType["Filter"] = 1] = "Filter";
})(PredicateType || (exports.PredicateType = PredicateType = {}));

var LogicalOperator;
exports.LogicalOperator = LogicalOperator;

(function (LogicalOperator) {
  LogicalOperator["And"] = "AND";
  LogicalOperator["Or"] = "Or";
})(LogicalOperator || (exports.LogicalOperator = LogicalOperator = {}));

var QueryOperatorEnum;
exports.QueryOperatorEnum = QueryOperatorEnum;

(function (QueryOperatorEnum) {
  QueryOperatorEnum[QueryOperatorEnum["Equal"] = 0] = "Equal";
  QueryOperatorEnum[QueryOperatorEnum["NotEqual"] = 1] = "NotEqual";
  QueryOperatorEnum[QueryOperatorEnum["LargerThan"] = 2] = "LargerThan";
  QueryOperatorEnum[QueryOperatorEnum["LargerThanAndEqual"] = 3] = "LargerThanAndEqual";
  QueryOperatorEnum[QueryOperatorEnum["LessThan"] = 4] = "LessThan";
  QueryOperatorEnum[QueryOperatorEnum["LessThanAndEqual"] = 5] = "LessThanAndEqual";
  QueryOperatorEnum[QueryOperatorEnum["Include"] = 6] = "Include";
  QueryOperatorEnum[QueryOperatorEnum["EndWith"] = 7] = "EndWith";
  QueryOperatorEnum[QueryOperatorEnum["StartWith"] = 8] = "StartWith";
})(QueryOperatorEnum || (exports.QueryOperatorEnum = QueryOperatorEnum = {}));

var Predicate = function Predicate(field, operator, value, index) {
  _classCallCheck(this, Predicate);

  this.key = void 0;
  this.type = void 0;
  this.logicalOperator = void 0;
  this.field = void 0;
  this.operator = void 0;
  this.value = void 0;
  this.index = void 0;
  this.groupKey = void 0;
  this.allowToRemove = void 0;
  this.type = PredicateType.Filter;

  if (typeof field === 'string') {
    this.key = field;
    this.field = {
      key: field,
      field: field,
      label: (0, _Formats.camel2title)(field),
      type: 'string'
    };
  } else {
    this.key = field.key;
    this.field = field;
  }

  this.operator = operator;
  this.value = value;
  this.index = index || 0;
};

exports.Predicate = Predicate;