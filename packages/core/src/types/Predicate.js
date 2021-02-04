import { camel2title } from '../Formats';
export var PredicateType;
(function (PredicateType) {
    PredicateType[PredicateType["Search"] = 0] = "Search";
    PredicateType[PredicateType["Filter"] = 1] = "Filter";
})(PredicateType || (PredicateType = {}));
export var LogicalOperator;
(function (LogicalOperator) {
    LogicalOperator["And"] = "AND";
    LogicalOperator["Or"] = "Or";
})(LogicalOperator || (LogicalOperator = {}));
export var QueryOperatorEnum;
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
})(QueryOperatorEnum || (QueryOperatorEnum = {}));
export class Predicate {
    constructor(field, operator, value, index) {
        this.type = PredicateType.Filter;
        if (typeof field === 'string') {
            this.key = field;
            this.field = {
                key: field,
                field,
                label: camel2title(field),
                type: 'string',
            };
        }
        else {
            this.key = field.key;
            this.field = field;
        }
        this.operator = operator;
        this.value = value;
        this.index = index || 0;
    }
}
