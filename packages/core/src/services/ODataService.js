/* eslint-disable no-console */
import _ from 'lodash';
import { QueryOperatorEnum } from 'types';
export class PropertyMetaData {
    constructor(name, label, type, searchPath, displayPath, isRequired, isIdentity, isSearchable, isDisplayable, maxLength, valueFormat, iOrder, customQueryOperators, inputInitialize) {
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
    validate(value) {
        var regTest = new RegExp(this.valueFormat);
        return regTest.test(value);
    }
}
export class QueryOperator {
    constructor(displayOperator, key, expression) {
        this.label = displayOperator;
        this.key = key;
        this.expression = expression;
    }
}
export class QueryPredicate {
    constructor(logicalOperator, modelField, predicateOperator, predicateValue, predicateIndex, groupKey, allowToRemove, addedPredicateOnce) {
        this.compare = (a, b) => {
            if (a.index < b.index)
                return -1;
            if (a.index > b.index)
                return 1;
            return 0;
        };
        this.logical = logicalOperator;
        this.field = modelField;
        this.operator = predicateOperator;
        this.value = predicateValue;
        this.index = predicateIndex !== null && predicateIndex !== void 0 ? predicateIndex : 0;
        this.group = groupKey ? groupKey : 0;
        this.allowToRemove =
            allowToRemove != null || allowToRemove !== undefined ? allowToRemove : true;
        this.addedPredicateOnce =
            addedPredicateOnce != null || addedPredicateOnce !== undefined ? addedPredicateOnce : false;
        this.operatorOptions = [];
    }
}
const compareOperator = (operator, left, leftType, right, rightType) => {
    return (reformatExpression(left, leftType) + ' ' + operator + ' ' + reformatExpression(right, rightType));
};
const methodOneParameter = (operator, left, leftType, right, rightType) => {
    return (operator +
        '(' +
        reformatExpression(left, leftType) +
        ',' +
        reformatExpression(right, rightType) +
        ')');
};
// eslint-disable-next-line no-unused-vars
const logicalExpression = (operator, left, leftType, right, rightType) => {
    return left + ' ' + operator + ' ' + right;
};
const reformatExpression = (expression, type) => {
    if (!expression)
        return expression;
    type = type.replace('System.', '');
    if (type.toLowerCase() === 'string') {
        return encodeURIComponent("'" + expression + "'");
    }
    else if (type === 'DateTimeOffset') {
        //return "cast('" + (typeof expression === "string" ? expression : expression.toISOString()) + "',Edm.DateTimeOffset)";
        //OData v4 doesn't need casting to Edm.DateTimeOffset per this SO post and it works: http://stackoverflow.com/a/31277779/422612
        return typeof expression === 'string' ? expression : expression.toISOString();
    }
    else if (type === 'DateTime') {
        return "'" + (typeof expression === 'string' ? expression : expression.toISOString()) + "'";
    }
    else if (type === 'Date') {
        return typeof expression === 'string' ? expression : expression.toISOString().slice(0, 10);
    }
    return expression;
};
export class ODataFilterService {
    constructor(defaultSearch, defaultFilters) {
        this.logicalOperators = {
            and: new QueryOperator('And', 'and', logicalExpression),
            or: new QueryOperator('Or', 'or', logicalExpression),
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
            contains: new QueryOperator('Contains', 'contains', methodOneParameter),
        };
        this.getOperator = (operator) => {
            switch (operator) {
                case QueryOperatorEnum.Equal:
                    return 'eq';
                case QueryOperatorEnum.Include:
                    return 'contains';
                case QueryOperatorEnum.LargerThan:
                    return 'gt';
                case QueryOperatorEnum.LargerThanAndEqual:
                    return 'ge';
                case QueryOperatorEnum.LessThan:
                    return 'lt';
                case QueryOperatorEnum.LessThanAndEqual:
                    return 'le';
                case QueryOperatorEnum.NotEqual:
                    return 'ne';
                case QueryOperatorEnum.EndWith:
                    return 'endswith';
                case QueryOperatorEnum.StartWith:
                    return 'startswith';
                default:
                    return 'eq';
            }
        };
        this.createPredicatesFromSearchFilters = (search, filters) => {
            let predicate = [];
            let addOperator = this.logicalOperators.and;
            let orOperator = this.logicalOperators.or;
            let index = this.prePredicates.length;
            let groupIndex = 1;
            if (search && !_.isEmpty(search)) {
                if (search.field.path && _.isArray(search.field.path)) {
                    search.field.path.forEach((fieldPath) => {
                        predicate.push(new QueryPredicate(orOperator, new PropertyMetaData(search.key, search.field.label, search.field.type, fieldPath), this.predicateOperators[this.getOperator(search.operator)], search.value ? search.value.trim() : '', index++, groupIndex++, true));
                    });
                }
                else {
                    predicate.push(new QueryPredicate(addOperator, new PropertyMetaData(search.field.key, search.field.label, search.field.type, search.field.path), this.predicateOperators[this.getOperator(search.operator)], search.value ? search.value.trim() : '', index++, groupIndex++, true));
                }
            }
            if (filters && Array.isArray(filters) && filters.length > 0) {
                let filterByKey = _.groupBy(filters, (f) => f.field.key);
                Object.keys(filterByKey).forEach((key, gIndex) => {
                    let filterGroup = filterByKey[key];
                    filterGroup.forEach((filter, g) => {
                        predicate.push(new QueryPredicate(g === 0 ? addOperator : orOperator, new PropertyMetaData(filter.field.key, filter.field.label, filter.field.type, filter.field.path), this.predicateOperators[filter.operator], filter.value, index++, groupIndex + gIndex, true));
                    });
                });
            }
            //console.log("predicate", predicate);
            return predicate;
        };
        //#endregion
        this.getODataFilter = (search, filters) => {
            var newPredicates = this.prePredicates.concat(this.createPredicatesFromSearchFilters(search, filters));
            return this.getODataFilterByPredicates(newPredicates);
        };
        this.getODataFilterByPredicates = (newPredicates) => {
            var _a, _b, _c, _d, _e;
            var filterQuery = '';
            if (newPredicates) {
                if (Array.isArray(newPredicates) && newPredicates.length > 0) {
                    var dummyPredicate = new QueryPredicate();
                    // list of predicate passed
                    var currentGroupKey = 0;
                    var currentQuery = '';
                    let openGroup = 0;
                    var sortedPredicate = newPredicates.sort(dummyPredicate.compare);
                    filterQuery = '';
                    for (var pIndex in sortedPredicate) {
                        if (sortedPredicate.hasOwnProperty(pIndex)) {
                            var p = sortedPredicate[pIndex];
                            if (p.operator && p.operator.expression && p.value) {
                                if (typeof ((_a = p.field) === null || _a === void 0 ? void 0 : _a.propertySearchPath) === 'function') {
                                    currentQuery = (_b = p.field) === null || _b === void 0 ? void 0 : _b.propertySearchPath(p.operator, p.value, p.field.type);
                                }
                                else {
                                    currentQuery = p.operator.expression(p.operator.key, (_c = p.field) === null || _c === void 0 ? void 0 : _c.propertySearchPath, 'expr', p.value, ((_d = p.field) === null || _d === void 0 ? void 0 : _d.type) || 'string');
                                }
                                //#region handle grouping the query
                                var nextPredicate = {};
                                var nextIndex = Number(pIndex) + 1;
                                if (nextIndex < sortedPredicate.length) {
                                    nextPredicate = sortedPredicate[nextIndex];
                                }
                                var addGroup = '', endGroup = '';
                                if (currentGroupKey !== p.group) {
                                    addGroup = ' ( ';
                                    currentGroupKey = p.group;
                                    openGroup++;
                                }
                                if (nextPredicate &&
                                    !_.isEmpty(nextPredicate) &&
                                    currentGroupKey !== nextPredicate.group) {
                                    endGroup = ' ) ';
                                    currentGroupKey = p.group;
                                    openGroup--;
                                }
                                //#endregion
                                if (pIndex === '0' || filterQuery === '') {
                                    filterQuery = addGroup + currentQuery + endGroup;
                                }
                                else {
                                    filterQuery = (_e = p.logical) === null || _e === void 0 ? void 0 : _e.expression(p.logical.key, filterQuery, 'expr', addGroup + currentQuery + endGroup, 'expr');
                                }
                                if (nextIndex >= sortedPredicate.length && openGroup > 0) {
                                    for (let i = 0; i < openGroup; i++) {
                                        filterQuery += ' ) ';
                                    }
                                }
                            }
                        }
                    }
                    if (filterQuery.length === 0) {
                        filterQuery = '';
                    }
                }
                else if (!Array.isArray(newPredicates)) {
                    // one predicate passed
                    if (newPredicates.field && newPredicates.operator && newPredicates.value) {
                        filterQuery = newPredicates.operator.expression(newPredicates.field.propertySearchPath, newPredicates.value);
                    }
                }
            }
            //console.log('filterQuery :', filterQuery);
            return filterQuery;
        };
        this.getODataLogicalOperators = () => {
            return [this.logicalOperators.and, this.logicalOperators.or];
        };
        this.getODataOperators = (operatorsToUse) => {
            var operators = [];
            if (!operatorsToUse) {
                operatorsToUse = Object.keys(this.predicateOperators);
            }
            for (var operator in operatorsToUse) {
                if (operatorsToUse.hasOwnProperty(operator)) {
                    operators.push(this.predicateOperators[operator]);
                }
            }
            return operators;
        };
        this.prePredicates =
            defaultSearch || defaultFilters
                ? this.createPredicatesFromSearchFilters(defaultSearch, defaultFilters)
                : [];
    }
}
