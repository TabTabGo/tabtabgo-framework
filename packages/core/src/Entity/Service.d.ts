import { Predicate } from '../types/Predicate';
import { JsonPatch } from '../types/JsonPatch';
import { PagingList } from '../types/PagingList';
import { OrderDirection } from '../types/enums/OrderDirection';
export interface ServiceActionProps {
    url?: string;
    parameters?: any;
    [key: string]: any;
}
export interface IEntityService<T> {
    namePlural: string;
    nameSingular: string;
    displayField: string;
    keyField: string;
    namePluralText?: string;
    nameSingularText?: string;
    [key: string]: any;
    getEntity(id: any, expand?: string): Promise<T>;
    search(predicates: Array<Predicate>, page: number, pageSize: number, order?: OrderDirection, orderBy?: string, searchUrl?: string, expand?: string, fixCriteria?: Array<Predicate>): Promise<PagingList<T>>;
    saveChanges(id: any, entity: any, changes: Array<JsonPatch>, original: any): Promise<any>;
    saveEntity(entity: any, props: ServiceActionProps): Promise<any>;
    updateEntity(entity: any, props: ServiceActionProps): Promise<any>;
    createEntity(entity: any, props: ServiceActionProps): Promise<any>;
    deleteEntity(entity: any): Promise<any>;
    deleteEntities(entities: Array<any>): Promise<any>;
    entitiesActivation(entities: Array<any>, status?: boolean, activationParameter?: string): Promise<any>;
    exportCSV(entities: Array<T>, searchParams: any, exportConfig?: any): Promise<any>;
}
export default class EntityService<T> implements IEntityService<T> {
    protected restApi: any;
    protected queryService: any;
    namePlural: string;
    nameSingular: string;
    displayField: string;
    keyField: string;
    namePluralText?: string;
    nameSingularText?: string;
    /**
     *
     * @param {string} namePlural
     * @param {string} nameSingular
     * @param {string || func} displayField
     * @param {string} keyField
     * @param {string} apiUrl
     * @param {string} namePluralText text value for entity name Plural
     * @param {string} nameSingularText text value for entity name singular
     * @param {string} prefixUrl prefix url can be used for Ajax API calls
     */
    constructor(namePlural: string, nameSingular: string, displayField?: string, //= "name",
    keyField?: string, //= "id",
    apiUrl?: string, //= "",
    namePluralText?: string, nameSingularText?: string, prefixUrl?: string);
    setEntityActionProperties(props: any): void;
    setRestApiProperties({ controller, dispatch }: any): void;
    toStringFormat(str: string): string;
    getEntity(id: any, expand?: string): Promise<any>;
    /**
     *
     * @param result search response from server.
     * @param searchQuery search query that send to server: TODO use SearchQuery type
     */
    parseSearchResult(result: any, searchQuery: any): {
        page: number;
        totalRecords: number;
        totalPages: number;
        pageSize: number;
        numberOfElements: number;
        last: boolean;
        first: boolean;
        hasPreviousPage: any;
        hasNextPage: any;
        query: {
            searchUrl: any;
            params: any;
        };
        items: any;
    };
    getSearchParameters(order?: string, orderBy?: string, expand?: string, page?: number, pageSize?: number): any;
    getSearchQuery(predicates: Array<Predicate>, order?: OrderDirection, orderBy?: string, url?: string, expand?: string): any;
    search(predicates: Array<Predicate>, page: number, pageSize: number, order?: OrderDirection, orderBy?: string, searchUrl?: string, expand?: string, fixCriteria?: Array<Predicate>): Promise<{
        page: number;
        totalRecords: number;
        totalPages: number;
        pageSize: number;
        numberOfElements: number;
        last: boolean;
        first: boolean;
        hasPreviousPage: any;
        hasNextPage: any;
        query: {
            searchUrl: any;
            params: any;
        };
        items: any;
    }>;
    internalSearch(searchUrl: string, parameters?: any, page?: number, pageSize?: number): Promise<{
        page: number;
        totalRecords: number;
        totalPages: number;
        pageSize: number;
        numberOfElements: number;
        last: boolean;
        first: boolean;
        hasPreviousPage: any;
        hasNextPage: any;
        query: {
            searchUrl: any;
            params: any;
        };
        items: any;
    }>;
    /**
     * Update entity properties before sent to server. Used by update and create
     * @param {*Object} entity
     */
    populateEntityAfterReceive(entity: any, responseData?: any): any;
    /**
     * Update entity properties before sent to server. Used by update and create
     * @param {*Object} entity
     */
    populateEntityBeforeSend(entity: any): any;
    populateChangesAfterReceive(entity: any, responseData: any): any;
    /**
     * Update changes before send to server
     * @param changes
     */
    populateChangesBeforeSend(changes: Array<JsonPatch>): any;
    /**
     * RESTApi PATCH request parameters
     * @param {*Object} entityChanges
     */
    getPatchEntityParameters(id: any, entityChanges: Array<JsonPatch>): {
        url: string;
        parameters: {
            id: any;
        };
        body: JsonPatch[];
        actionDescription: string;
    };
    saveChanges(id: any, entity: any, changes: Array<JsonPatch>, original: any): Promise<any>;
    /**
     * Save entity. If identity column is not null or not 0 then update entity else create
     * Props : save properties need it for update request or create request
     */
    saveEntity(entity: any, props: ServiceActionProps): Promise<any>;
    /**
     * RESTApi PUT request parameters
     * @param {*Object} entity
     */
    getUpdateEntityParameters(entity: any, props: ServiceActionProps): {
        url: string;
        parameters: {
            id: any;
        };
        body: any;
        actionDescription: string;
    };
    postUpdateEntity(entity: any): any;
    /**
     * Update entity in DB
     * @param {*object} entity
     */
    updateEntity(entity: any, props: ServiceActionProps): Promise<any>;
    getCreateEntityParameters(entity: any, props: ServiceActionProps): any;
    postCreateEntity(entity: any): any;
    createEntity(entity: any, props: ServiceActionProps): Promise<any>;
    deleteEntity(entity: any): Promise<void>;
    deleteEntities(entities: Array<any>): Promise<void>;
    entitiesActivation(entities: Array<any>, status?: boolean, activationParameter?: string): Promise<any>;
    exportCSV(entities: Array<T>, searchParams?: any, exportConfig?: object): Promise<any>;
    /**
     *
     * @param exportType
     * @param entityKeys
     * @param searchParams
     * @param exportConfig
     */
    internalExport(exportType: string, entityKeys: Array<T>, searchParams?: any, exportConfig?: any): Promise<any>;
    getDisplayValue(entity: any): any;
    destroy(): void;
}
