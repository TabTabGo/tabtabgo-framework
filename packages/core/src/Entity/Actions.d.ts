import { IEntityActionTypes } from './ActionTypes';
import { Dispatch } from 'redux';
import { IEntityService } from './Service';
import { Predicate } from '../types/Predicate';
import { ActionOptions } from '../types/ActionOptions';
import { OrderDirection } from '../types/enums/OrderDirection';
import { JsonPatch } from '../types/JsonPatch';
import { IActions } from '../types/Actions';
import { INotificationService } from '../services/contracts';
/**
 * Module Action
 */
export default class EntityAction<T, TActionType extends IEntityActionTypes, TService extends IEntityService<T>> implements IActions<T> {
    actionTypes: TActionType;
    currentService: TService;
    namePlural: string;
    nameSingular: string;
    displayField: string;
    keyField: string;
    namePluralText: string;
    nameSingularText: string;
    exportsService?: any;
    notificationService: INotificationService;
    dispatch: Dispatch;
    /**
     *
     * @param {object} service entity service that access REST API
     * @param {string} namePluralText text value for entity name Plural
     * @param {string} nameSingularText text value for entity name singular
     */
    constructor(entityService: TService, actionTypes: TActionType, dispatch: Dispatch, namePluralText?: string, nameSingularText?: string, exportsService?: string);
    setApiUrl(controller: string): {};
    toStringFormat(str: string): string;
    getEntity: (id: any, onLoaded?: (entity: T) => void, expand?: string) => Promise<T>;
    loadEntityExtra(id: any, dispatch: Dispatch): Promise<void>;
    search: (predicates: Array<Predicate>, page: number, pageSize: number, order?: OrderDirection, orderBy?: string, searchUrl?: string, expand?: string, fixCriteria?: Array<Predicate>) => Promise<import("../types").PagingList<T>>;
    updatePage: (pageOption: number) => {
        type: string;
        pageOption: number;
    };
    selectEntity: (selectedEntity?: {}) => (dispatch: Dispatch) => void;
    loadEntity: (selectedEntity: T) => (dispatch: Dispatch) => void;
    unselectEntity: () => {
        type: any;
    };
    selectRow: (row: T, index: number, isSelected?: boolean) => {
        type: string;
        entity: T;
    };
    selectAllRows: (isSelected: boolean, rows?: Array<T>) => {
        type: string;
        entities: T[];
    };
    resetSelectedEntities: () => {
        type: string;
    };
    selectAllEntities: (selectedEntities?: any[]) => {
        type: string;
        entity: any[];
    };
    changeFlag: (action: string | {
        [key: string]: any;
    }, value: any, extraProps?: any) => any;
    changeProperty: (propName: string, value?: any) => {
        type: any;
        entity: {
            [x: string]: any;
        };
    };
    modifyEntity: (changes: Partial<T>) => {
        type: any;
        entity: Partial<T>;
    };
    /**
     * Save entity. If identity column is not null or not 0 then update entity else create
     */
    saveEntity: (entity: T, options?: ActionOptions) => Promise<void>;
    /**
     * Update entity in DB
     * @param {*object} entity
     * @param {*bool} isClose Close/GoBack the view after update
     */
    updateEntity: (entity: T, options?: ActionOptions) => Promise<void>;
    createEntity: (entity: T, options?: ActionOptions) => Promise<void>;
    /**
     * Update entity in DB
     * @param {number} id
     * @param {*object} changes
     */
    saveEntityChanges: (id: any, entity: T, changes: Array<JsonPatch>, original: T, options?: ActionOptions) => Promise<void>;
    onAddSuccessfully(entity: T, dispatch: Dispatch): Promise<T>;
    onUpdateSuccessfully(entity: T, dispatch: Dispatch): Promise<T>;
    deleteEntity: (entity: T, options?: ActionOptions) => Promise<any>;
    deleteEntities: (entities: Array<T>, options?: ActionOptions) => Promise<void>;
    entitiesActivation: (entities: Array<T>, status?: boolean, activationParameter?: string) => Promise<any>;
    exportEntities: (exportType: string, entities: Array<T>, searchParams: any, exportConfig?: any) => Promise<void>;
    exportCsv: (entities: Array<T>, searchParams: any, exportConfig?: any) => Promise<void>;
    exportPdf: (entities: Array<T>, searchParams: any, exportConfig?: any) => Promise<void>;
    exportExcel: (entities: Array<T>, searchParams: any, exportConfig?: any) => Promise<void>;
    exportCustomized: (entities: Array<T>, searchParams: any, exportConfig?: any) => Promise<void>;
    getDisplayValue(entity: T): any;
    notifySuccess(message: string, options?: any): void;
    notifyError(message: string, options?: any): void;
    runAction: (dispatch: Dispatch, actionType: string | {
        [actionName: string]: any;
    }, action: () => Promise<any>, onSuccessMessage?: string | boolean, onFailedMessage?: string | boolean, extraProps?: any) => Promise<any>;
    start: (dispatch: Dispatch, action: string | {
        [actionName: string]: any;
    }, extraProps: any) => void;
    parseError: (error: any, message?: string) => void;
    error: (dispatch: Dispatch, action: string | {
        [actionName: string]: any;
    }, error: any, message?: string | boolean, extraProps?: {}) => void;
    success: (dispatch: Dispatch, action: string | {
        [actionName: string]: any;
    }, message?: string | boolean, extraProps?: {}) => void;
    destroy: () => void;
}
