import { StringFunc } from './Common';
export interface IEntity<T> {
    namePlural: string;
    nameSingular: string;
    displayField: string | StringFunc<T>;
    keyField: string;
    namePluralText: string;
    nameSingularText: string;
}
