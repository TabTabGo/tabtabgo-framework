import { Predicate, QueryOperatorEnum } from '../types';
declare type PropertyPathFunc<T> = (operator: QueryOperator, value: T, type: string) => string;
export declare class PropertyMetaData {
    name: string;
    label: string;
    type: string;
    maxLength: number;
    isRequired?: boolean;
    isSearchable?: boolean;
    isIdentity?: boolean;
    isDisplayable?: boolean;
    propertySearchPath: string | PropertyPathFunc<any>;
    propertyDisplayPath: string;
    valueFormat: string;
    index: number;
    inputTemplate?: string;
    customQueryOperator: Array<QueryOperator>;
    inputInitialize?: any;
    constructor(name: string, label: string, type: string, searchPath: string, displayPath?: string, isRequired?: boolean, isIdentity?: boolean, isSearchable?: boolean, isDisplayable?: boolean, maxLength?: number, valueFormat?: string, iOrder?: number, customQueryOperators?: Array<QueryOperator>, inputInitialize?: any);
    validate(value: any): boolean;
}
export declare class QueryOperator {
    label: string;
    key: string;
    expression: any;
    constructor(displayOperator: string, key: string, expression: any);
}
export declare class QueryPredicate {
    logical?: QueryOperator;
    field?: PropertyMetaData;
    operator?: QueryOperator;
    value?: any;
    index: number;
    group: any;
    allowToRemove: boolean;
    addedPredicateOnce: boolean;
    operatorOptions?: Array<QueryPredicate>;
    constructor(logicalOperator?: QueryOperator, modelField?: PropertyMetaData, predicateOperator?: QueryOperator, predicateValue?: any, predicateIndex?: number, groupKey?: any, allowToRemove?: boolean, addedPredicateOnce?: boolean);
    compare: (a: QueryPredicate, b: QueryPredicate) => 1 | -1 | 0;
}
export declare class ODataFilterService {
    prePredicates: Array<QueryPredicate>;
    logicalOperators: {
        and: QueryOperator;
        or: QueryOperator;
    };
    predicateOperators: {
        eq: QueryOperator;
        lt: QueryOperator;
        gt: QueryOperator;
        ge: QueryOperator;
        le: QueryOperator;
        ne: QueryOperator;
        endswith: QueryOperator;
        startswith: QueryOperator;
        contains: QueryOperator;
    };
    constructor(defaultSearch?: Predicate, defaultFilters?: Array<Predicate>);
    getOperator: (operator: QueryOperatorEnum) => "lt" | "eq" | "gt" | "ge" | "le" | "ne" | "endswith" | "startswith" | "contains";
    createPredicatesFromSearchFilters: (search?: Predicate, filters?: Array<Predicate>) => any[];
    getODataFilter: (search?: Predicate, filters?: Array<Predicate>) => string;
    getODataFilterByPredicates: (newPredicates: Array<QueryPredicate> | QueryPredicate) => string;
    getODataLogicalOperators: () => QueryOperator[];
    getODataOperators: (operatorsToUse: Array<string>) => QueryOperator[];
}
export {};
