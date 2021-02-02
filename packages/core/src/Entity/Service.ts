/* eslint-disable no-console */
import { currentServiceProvider } from '../providers/ServiceProvider';
import { ODataFilterService } from '../services/ODataService';
import { getDisplayValue } from '../Utilities';
import { Predicate } from '../types/Predicate';
import { JsonPatch } from '../types/JsonPatch';
import { PagingList } from '../types/PagingList';
import { OrderDirection } from '../types/enums/OrderDirection';
//import jiff from "jiff";

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
  search(
    predicates: Array<Predicate>,
    page: number,
    pageSize: number,
    order?: OrderDirection,
    orderBy?: string,
    searchUrl?: string,
    expand?: string,
    fixCriteria?: Array<Predicate>,
  ): Promise<PagingList<T>>;
  saveChanges(id: any, entity: any, changes: Array<JsonPatch>, original: any): Promise<any>;
  saveEntity(entity: any, props: ServiceActionProps): Promise<any>;
  updateEntity(entity: any, props: ServiceActionProps): Promise<any>;
  createEntity(entity: any, props: ServiceActionProps): Promise<any>;
  deleteEntity(entity: any): Promise<any>;
  deleteEntities(entities: Array<any>): Promise<any>;
  entitiesActivation(
    entities: Array<any>,
    status?: boolean,
    activationParameter?: string,
  ): Promise<any>;
  exportCSV(entities: Array<T>, searchParams: any, exportConfig?: any): Promise<any>;
}
export default class EntityService<T> implements IEntityService<T> {
  protected restApi: any; //TODO create RestApi Interface
  protected queryService: any; //TODO create QueryFilterService interface
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
  constructor(
    namePlural: string,
    nameSingular: string,
    displayField?: string, //= "name",
    keyField?: string, //= "id",
    apiUrl?: string, //= "",
    namePluralText?: string,
    nameSingularText?: string,
    prefixUrl?: string,
  ) {
    this.restApi = currentServiceProvider.newAjaxService(
      apiUrl ? apiUrl : this.toStringFormat(namePlural),
      prefixUrl,
      {},
    );
    this.queryService = new ODataFilterService();

    this.namePlural = namePlural;
    this.nameSingular = nameSingular;
    this.namePluralText = namePluralText ? namePluralText : namePlural;
    this.nameSingularText = nameSingularText ? nameSingularText : nameSingular;
    this.displayField = displayField ? displayField : 'name';
    this.keyField = keyField ? keyField : 'id';
  }

  setEntityActionProperties(props: any): void {
    Object.assign(this, props);
  }

  setRestApiProperties({ controller, dispatch }: any) {
    if (controller) this.restApi.controller = controller;
    if (dispatch) this.restApi.dispatch = dispatch;
  }

  toStringFormat(str: string) {
    if (str) {
      let fChr = str.slice(0, 1).toLowerCase();
      return fChr + str.slice(1, str.length);
    }
    return str;
  }

  async getEntity(id: any, expand?: string) {
    var parameters = {
      id: id,
    } as any;
    if (expand) {
      parameters.expand = expand;
    }
    var entity = await this.restApi.Get({
      url: ':id',
      parameters: parameters,
      actionDescription: `Getting ${this.nameSingularText} id:${id}`,
    });
    return this.populateEntityAfterReceive(entity);
  }

  /**
   *
   * @param result search response from server.
   * @param searchQuery search query that send to server: TODO use SearchQuery type
   */
  parseSearchResult(result: any, searchQuery: any) {
    return {
      page: Number(result.page), //== 0 ? Number(result.number) + 1 : Number(result.number),
      totalRecords: Number(result.totalItems),
      totalPages: Number(result.totalPages),
      pageSize: Number(result.pageSize),
      numberOfElements: Number(result.count),
      last: result.page === result.totalPages,
      first: Number(result.page) === 1,
      hasPreviousPage: result.hasPreviousPage,
      hasNextPage: result.hasNextPage,
      query: {
        searchUrl: searchQuery.searchUrl,
        params: searchQuery.params,
      },
      items: result.items,
    };
  }

  getSearchParameters(
    order?: string,
    orderBy?: string,
    expand?: string,
    page?: number,
    pageSize?: number,
  ) {
    var params = {} as any;

    if (order && orderBy) {
      params.$orderBy = `${orderBy} ${order}`;
    }
    if (expand) {
      params.$expand = expand;
    }
    if (page && pageSize) {
      params.$skip = page * pageSize;
    }
    if (pageSize) {
      params.$top = pageSize;
    }

    return params;
  }

  getSearchQuery(
    predicates: Array<Predicate>,
    order?: OrderDirection,
    orderBy?: string,
    url?: string,
    expand?: string,
  ): any {
    let searchQuery = { params: {}, searchUrl: url } as any; //TODO use searchQuery Type
    if (predicates && predicates.length > 0) {
      var filterQuery = this.queryService.getODataFilter(predicates);
      if (filterQuery) searchQuery.params.$filter = filterQuery;
    }

    searchQuery.params = Object.assign(
      {},
      searchQuery.params,
      this.getSearchParameters(order, orderBy, expand),
    );
    return searchQuery;
  }

  async search(
    predicates: Array<Predicate>,
    page: number,
    pageSize: number,
    order?: OrderDirection,
    orderBy?: string,
    searchUrl = '',
    expand = '',
    fixCriteria?: Array<Predicate>,
  ) {
    // console.log('search', page, pageSize, order, orderBy, searchUrl);
    if (!order) order = OrderDirection.Asc;
    if (fixCriteria) {
      predicates = predicates.concat(fixCriteria);
    }
    let searchQuery = this.getSearchQuery(predicates, order, orderBy, searchUrl, expand);
    //console.log("searchQuery", searchQuery);
    return this.internalSearch(searchQuery.searchUrl, searchQuery.params, page, pageSize);
  }

  async internalSearch(searchUrl: string, parameters?: any, page?: number, pageSize?: number) {
    if (!parameters) {
      parameters = {};
    }
    parameters = Object.assign(
      {},
      parameters,
      this.getSearchParameters(undefined, undefined, undefined, page, pageSize),
    );

    try {
      var result = await this.restApi.Get({
        url: searchUrl,
        parameters: parameters,
      });
      return this.parseSearchResult(result, {
        params: parameters,
        searchUrl: searchUrl,
      });
    } catch (error) {
      let errorMessage = 'Failed in searching ' + this.namePluralText;
      if (error.message) {
        errorMessage += `; ${error.message}`;
      }
      // notify.error(errorMessage);
      throw Error(errorMessage);
    }
  }
  /**
   * Update entity properties before sent to server. Used by update and create
   * @param {*Object} entity
   */
  populateEntityAfterReceive(entity: any, responseData?: any): any {
    return { ...entity, ...responseData };
  }
  /**
   * Update entity properties before sent to server. Used by update and create
   * @param {*Object} entity
   */
  populateEntityBeforeSend(entity: any): any {
    return entity;
  }

  populateChangesAfterReceive(entity: any, responseData: any): any {
    return { ...entity, ...responseData };
  }
  /**
   * Update changes before send to server
   * @param changes
   */
  populateChangesBeforeSend(changes: Array<JsonPatch>): any {
    return changes;
  }
  /**
   * RESTApi PATCH request parameters
   * @param {*Object} entityChanges
   */
  getPatchEntityParameters(id: any, entityChanges: Array<JsonPatch>) {
    return {
      url: `:id/json`,
      parameters: {
        id: id,
      },
      body: entityChanges,
      actionDescription: `Save changes for ${this.nameSingularText} ${this.getDisplayValue(
        entityChanges,
      )}`,
    };
  }

  // eslint-disable-next-line no-unused-vars
  async saveChanges(id: any, entity: any, changes: Array<JsonPatch>, original: any) {
    //let entityBeforeSend = this.populateEntityBeforeSend(entity);
    //let originalBeforeSend = original ? this.populateEntityBeforeSend(original) : original;

    //var jsonPatchDocument = jiff.diff( originalBeforeSend, entityBeforeSend);

    let changesBeforeSend = changes ? this.populateChangesBeforeSend(changes) : changes;

    let patchParameters = this.getPatchEntityParameters(id, changesBeforeSend);
    var responseData = await this.restApi.Patch(patchParameters);
    return this.postUpdateEntity(this.populateChangesAfterReceive(entity, responseData));
  }

  /**
   * Save entity. If identity column is not null or not 0 then update entity else create
   * Props : save properties need it for update request or create request
   */
  async saveEntity(entity: any, props: ServiceActionProps) {
    if (entity[this.keyField]) {
      return this.updateEntity(entity, props);
    }

    return this.createEntity(entity, props);
  }

  /**
   * RESTApi PUT request parameters
   * @param {*Object} entity
   */
  getUpdateEntityParameters(entity: any, props: ServiceActionProps) {
    entity = this.populateEntityBeforeSend(entity);
    let requestParameters = {
      url: props && props.url ? props.url : ':id',
      parameters: {
        id: entity[this.keyField],
      },
      body: entity,
      actionDescription: `Update ${this.nameSingularText} ${this.getDisplayValue(entity)}`,
    };
    if (props && props.parameters) {
      requestParameters.parameters = Object.assign(requestParameters.parameters, props.parameters);
    }
    return requestParameters;
  }

  postUpdateEntity(entity: any) {
    return entity;
  }

  /**
   * Update entity in DB
   * @param {*object} entity
   */
  async updateEntity(entity: any, props: ServiceActionProps) {
    let updateParameters = this.getUpdateEntityParameters(entity, props);
    var response = await this.restApi.Put(updateParameters);
    return this.postUpdateEntity(this.populateEntityAfterReceive(entity, response));
  }

  getCreateEntityParameters(entity: any, props: ServiceActionProps) {
    let populatedEntity = this.populateEntityBeforeSend(entity);
    let requestParameters = {
      url: props && props.url ? props.url : '',
      body: populatedEntity,
      actionDescription: `Adding ${this.nameSingularText} ${this.getDisplayValue(populatedEntity)}`,
    } as any;
    if (props && props.parameters) {
      requestParameters.parameters = props.parameters;
    }
    return requestParameters;
  }

  postCreateEntity(entity: any) {
    return entity;
  }

  async createEntity(entity: any, props: ServiceActionProps) {
    let addParameters = this.getCreateEntityParameters(entity, props);
    //console.log("addParameters :", addParameters);
    var data = await this.restApi.Post(addParameters);
    if (data) {
      entity = Object.assign({}, entity, data);
    }

    if (data && this.keyField && data[this.keyField]) {
      entity = Object.assign({}, entity, {
        id: data[this.keyField],
      });
    }

    return this.postCreateEntity(this.populateEntityAfterReceive(entity, data));
  }

  async deleteEntity(entity: any) {
    await this.restApi.Delete({
      url: ':id',
      parameters: {
        id: entity[this.keyField],
      },
      actionDescription: `Delete ${this.nameSingularText} ${this.getDisplayValue(entity)}`,
    });
  }

  async deleteEntities(entities: Array<any>) {
    await this.restApi.Delete({
      body: entities.map((item) => item[this.keyField]),
      actionDescription: `Delete ${entities.length} ${this.namePluralText}`,
    });
  }

  async entitiesActivation(entities: Array<any>, status = true, activationParameter?: string) {
    let ids = entities.map((e: any) => e[this.keyField]);

    var data = await this.restApi.Post({
      url: '/activation',
      parameters: {
        [activationParameter ? activationParameter : this.nameSingular.toLowerCase()]: ids.join(
          ',',
        ),
        status: status === undefined ? true : status,
      },
      actionDescription: `Activate ${this.namePluralText}`,
    });

    let message = `${this.namePluralText} is activated`;
    if (data.message) {
      message = data.message;
    }

    return { ...data, message };
  }

  async exportCSV(entities: Array<T>, searchParams?: any, exportConfig?: object) {
    return this.internalExport('csv', entities, searchParams, exportConfig);
  }

  /**
   *
   * @param exportType
   * @param entityKeys
   * @param searchParams
   * @param exportConfig
   */
  async internalExport(
    exportType: string,
    entityKeys: Array<T>,
    searchParams?: any,
    exportConfig?: any,
  ) {
    if (!searchParams) searchParams = {} as any;
    if (!exportConfig) exportConfig = {} as any;
    let config = {
      ...exportConfig,
      fileType: exportType,
      filterKeys: entityKeys,
    };
    var searchQuery = this.getSearchQuery(
      searchParams.query.predicates,
      searchParams.order,
      searchParams.orderBy,
      searchParams.url,
      searchParams.expand,
    );
    searchQuery.params.$top = searchParams.pageSize;
    let url = `/export/${exportType}`;
    if (searchQuery.searchUrl) url = searchQuery.searchUrl;
    if (exportConfig && exportConfig.url) url = exportConfig.url;

    return this.restApi.Post({
      url: url,
      parameters: searchQuery.params,
      body: config,
    });
  }

  getDisplayValue(entity: any) {
    return getDisplayValue(entity, this.displayField);
  }

  destroy() {
    this.restApi.Abort(true);
  }
}
