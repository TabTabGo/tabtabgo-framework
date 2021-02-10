import { camel2title } from '../Formats';
import { Property } from './Property';
export enum PredicateType {
  Search,
  Filter,
}

export enum LogicalOperator {
  And = 'AND',
  Or = 'Or',
}

export enum QueryOperatorEnum {
  Equal,
  NotEqual,
  LargerThan,
  LargerThanAndEqual,
  LessThan,
  LessThanAndEqual,
  Include,
  EndWith,
  StartWith,
}

export class Predicate {
  key: string;
  type: PredicateType;
  logicalOperator?: LogicalOperator;
  field: Property;
  operator: QueryOperatorEnum;
  value: any | Array<any>;
  index: number;
  groupKey?: number;
  allowToRemove?: boolean;

  constructor(
    field: Property | string,
    operator: QueryOperatorEnum,
    value: any | Array<any>,
    index?: number,
  ) {
    this.type = PredicateType.Filter;
    if (typeof field === 'string') {
      this.key = field;
      this.field = {
        key: field,
        field,
        label: camel2title(field),
        type: 'string',
      } as Property;
    } else {
      this.key = field.key;
      this.field = field as Property;
    }

    this.operator = operator;
    this.value = value;
    this.index = index || 0;
  }
}
