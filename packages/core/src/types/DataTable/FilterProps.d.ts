/// <reference types="react" />
import { IEntity, Property, Predicate, QueryOperatorEnum } from '../../types';
export interface FilterProps<T> extends IEntity<T>, FilterOptions {
}
export interface FilterOptions {
    filters?: Array<FilterProperty>;
    searchProperties: Array<SearchProperty>;
    defaultSearchOption?: SearchProperty;
    predicates?: Array<Predicate>;
    search(predicates: Array<Predicate>): void;
    [key: string]: any;
}
export interface QueryProperty extends Property {
    component?: (props: any) => JSX.Element;
    defaultOperator?: QueryOperatorEnum;
}
export interface SearchProperty extends QueryProperty {
}
export declare type OptionsFunc = (data: any) => any;
export interface FilterProperty extends QueryProperty {
    options?: Array<any> | OptionsFunc;
    operators?: Array<QueryOperatorEnum>;
}
