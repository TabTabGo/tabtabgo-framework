import { QueryOperator } from '../src/services/ODataService';

export interface Property {
  key: string;
  label: string;
  name?: string;
  field?: string | FieldPathFunc<any>;
  type: string;
  [key: string]: any;
}
export type FieldPathFunc<T> = (data: T, operator: QueryOperator) => string;
