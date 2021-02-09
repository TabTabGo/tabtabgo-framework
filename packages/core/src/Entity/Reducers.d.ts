import { IEntityActionTypes } from './ActionTypes';
import { Action, PagingList } from '../types';
/**
 * Module Reducer Context
 * @param {EntityActionTypes} actionNames
 * @param {string} keyField Entity unique value
 */
export declare const EntityReducers: (actionNames: IEntityActionTypes, keyField?: string) => {
    currentEntity: (state: ICurrentEntity<any>, action: Action) => ICurrentEntity<any>;
    searchResults: (state: PagingList<any>, action: Action) => any;
    containerFlags: (state: IContainerFlags, action: Action) => IContainerFlags & {
        detail: any;
    };
    exportEntities: (state: IExportEntities<any>, action: Action) => IExportEntities<any> & {
        entities: any;
        loading: boolean;
    };
    ActionNames: IEntityActionTypes;
    keyField: string;
};
export interface ICurrentEntity<T> {
    entity: T;
    changes: any;
    original: T;
}
export declare const currentEntity: (actionNames: IEntityActionTypes, keyField?: string) => (state: ICurrentEntity<any>, action: Action) => ICurrentEntity<any>;
export declare const searchResults: (actionNames: IEntityActionTypes, keyField?: string) => (state: PagingList<any>, action: Action) => any;
export interface IContainerFlags {
    add: boolean;
    edit: boolean;
    detail: boolean;
    loading: boolean;
    saving: boolean;
    exportingCsv: boolean;
    exportingExcel: boolean;
    exportingPdf: boolean;
    printing: boolean;
    forceRefresh: boolean;
    [key: string]: boolean | any;
    error: any;
    inProgress: number;
    pulling: number;
    pushing: number;
}
export declare const containerFlags: (actionNames: IEntityActionTypes, keyField?: string) => (state: IContainerFlags, action: Action) => IContainerFlags & {
    detail: any;
};
export interface IExportEntities<T> {
    entities: Array<T>;
    loading: boolean;
}
export declare const ExportEntities: (actionNames: IEntityActionTypes, keyField?: string) => (state: IExportEntities<any>, action: Action) => IExportEntities<any> & {
    entities: any;
    loading: boolean;
};
