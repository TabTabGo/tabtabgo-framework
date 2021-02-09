import { Property } from './Property';
export declare enum PredicateType {
    Search = 0,
    Filter = 1
}
export declare enum LogicalOperator {
    And = "AND",
    Or = "Or"
}
export declare enum QueryOperatorEnum {
    Equal = 0,
    NotEqual = 1,
    LargerThan = 2,
    LargerThanAndEqual = 3,
    LessThan = 4,
    LessThanAndEqual = 5,
    Include = 6,
    EndWith = 7,
    StartWith = 8
}
export declare class Predicate {
    key: string;
    type: PredicateType;
    logicalOperator?: LogicalOperator;
    field: Property;
    operator: QueryOperatorEnum;
    value: any | Array<any>;
    index: number;
    groupKey?: number;
    allowToRemove?: boolean;
    constructor(field: Property | string, operator: QueryOperatorEnum, value: any | Array<any>, index?: number);
}
