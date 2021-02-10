/* eslint-disable no-console */
import EntityActionTypes, { IEntityActionTypes } from './ActionTypes';
import { getDisplayValue } from '../Utilities';
import { currentServiceProvider } from '../providers/ServiceProvider';
import { Dispatch } from 'redux';
import moment from 'moment';
import { IEntityService } from './Service';
import { Predicate } from '../../types/Predicate';
import { ActionOptions } from '../../types/ActionOptions';
import { OrderDirection } from '../../types/enums/OrderDirection';
import { JsonPatch } from '../../types/JsonPatch';
import { IActions } from '../../types/Actions';
import { INotificationService } from '../services/contracts';

//import moment from "moment";

/**
 * Module Action
 */
export default class EntityAction<
  T,
  TActionType extends IEntityActionTypes,
  TService extends IEntityService<T>
> implements IActions<T> {
  actionTypes: TActionType;
  currentService: TService;
  namePlural: string;
  nameSingular: string;
  displayField: string;
  keyField: string;
  namePluralText: string;
  nameSingularText: string;
  exportsService?: any; //TODO use IExport interface
  notificationService: INotificationService;
  dispatch: Dispatch;
  /**
   *
   * @param {object} service entity service that access REST API
   * @param {string} namePluralText text value for entity name Plural
   * @param {string} nameSingularText text value for entity name singular
   */
  constructor(
    entityService: TService,
    actionTypes: TActionType,
    dispatch: Dispatch,
    namePluralText?: string,
    nameSingularText?: string,
    exportsService?: string,
  ) {
    if (!entityService) throw new Error('Service is not defined');

    this.currentService = entityService;
    this.namePlural = entityService.namePlural;
    this.nameSingular = entityService.nameSingular;
    this.displayField = entityService.displayField;
    this.keyField = entityService.keyField;
    this.dispatch = dispatch;
    this.namePluralText = namePluralText || this.namePlural;
    this.nameSingularText = nameSingularText || this.nameSingular;
    this.exportsService = exportsService
      ? exportsService
      : currentServiceProvider.getExportService();
    this.actionTypes = actionTypes
      ? actionTypes
      : (EntityActionTypes(this.namePlural, this.nameSingular) as TActionType);
    this.notificationService = currentServiceProvider.getNotificationService();
  }

  setApiUrl(controller: string) {
    this.currentService.setRestApiProperties(controller, this.dispatch);
    return {};
  }

  toStringFormat(str: string) {
    if (str) {
      let fChr = str.slice(0, 1).toLowerCase();
      return fChr + str.slice(1, str.length);
    }
    return str;
  }

  getEntity = async (id: any, onLoaded?: (entity: T) => void, expand?: string) => {
    this.dispatch(this.changeFlag('loading', true));
    try {
      var entity = await this.currentService.getEntity(id, expand);
      this.dispatch(this.changeFlag('loading', false));
      this.loadEntity(entity)(this.dispatch);
      if (onLoaded) onLoaded(entity);
      await this.loadEntityExtra(id, this.dispatch);
      return entity;
    } catch (error) {
      console.error(error);
      this.dispatch(this.changeFlag('loading', false));
      this.error(this.dispatch, 'GET_ENTITY', error, `Failed Loading ${this.nameSingularText}`);
      return undefined;
    }
  };

  // eslint-disable-next-line no-unused-vars
  async loadEntityExtra(id: any, dispatch: Dispatch) {}
  //search, filters, page, pageSize, order, orderBy

  search = async (
    predicates: Array<Predicate>,
    page: number,
    pageSize: number,
    order?: OrderDirection,
    orderBy?: string,
    searchUrl?: string,
    expand?: string,
    fixCriteria?: Array<Predicate>,
  ) => {
    this.dispatch({
      type: this.actionTypes.searching,
      payload: { query: { predicates }, page, pageSize, order, orderBy },
    });

    return this.currentService
      .search(predicates, page, pageSize, order, orderBy, searchUrl, expand, fixCriteria)
      .then((result) => {
        this.dispatch({
          type: this.actionTypes.search,
          result: result,
        });
        return result;
      })
      .catch((error) => {
        this.dispatch(this.changeFlag('loading', false));
        // notify.error(errorMessage);
        //console.log("end Searching, error :", error);

        this.error(
          this.dispatch,
          this.actionTypes.search,
          error,
          'Failed in search ' + this.namePluralText,
        );
        return Promise.reject(error);
      });
  };

  updatePage = (pageOption: number) => {
    return { type: this.actionTypes.searchUpdatePage, pageOption };
  };

  selectEntity = (selectedEntity = {}) => (dispatch: Dispatch) => {
    dispatch({ type: this.actionTypes.select, entity: selectedEntity });
  };

  loadEntity = (selectedEntity: T) => (dispatch: Dispatch) => {
    dispatch({
      type: this.actionTypes.load,
      entity: selectedEntity,
      actionValue: (selectedEntity as any)[this.keyField],
    });
  };

  unselectEntity = () => {
    return { type: this.actionTypes.unselect };
  };

  selectRow = (row: T, index: number, isSelected?: boolean) => {
    if (isSelected) {
      return { type: this.actionTypes.selectMultiple, entity: row };
    } else {
      return { type: this.actionTypes.unselectMultiple, entity: row };
    }
  };

  selectAllRows = (isSelected: boolean, rows?: Array<T>) => {
    if (isSelected) {
      return { type: this.actionTypes.selectAll, entities: rows };
    } else {
      return { type: this.actionTypes.resetSelected, entities: rows };
    }
  };

  resetSelectedEntities = () => {
    return { type: this.actionTypes.resetSelected };
  };

  selectAllEntities = (selectedEntities = []) => {
    return { type: this.actionTypes.selectAll, entity: selectedEntities };
  };

  changeFlag = (action: string | { [key: string]: any }, value: any, extraProps?: any) => {
    if (!extraProps) {
      extraProps = {};
    }
    if (typeof action === 'object') {
      //console.log('action', action)
      let actionName = Object.keys(action)[0];
      let actionValue = action[actionName];
      return {
        type: this.actionTypes.flag(actionName),
        actionName,
        actionValue,
        payload: value,
        ...extraProps,
      };
    } else {
      return {
        type: this.actionTypes.flag(action),
        actionName: action,
        payload: value,
        ...extraProps,
      };
    }
  };

  changeProperty = (propName: string, value?: any) => {
    return {
      type: this.actionTypes.updateProperty,
      entity: {
        [propName]: value,
      },
    };
  };

  modifyEntity = (changes: Partial<T>) => {
    return {
      type: this.actionTypes.updateProperty,
      entity: changes,
    };
  };
  /**
   * Save entity. If identity column is not null or not 0 then update entity else create
   */
  saveEntity = async (entity: T, options?: ActionOptions) => {
    if ((entity as any)[this.keyField]) {
      return this.updateEntity(entity, options);
    }

    return this.createEntity(entity, options);
  };
  /**
   * Update entity in DB
   * @param {*object} entity
   * @param {*bool} isClose Close/GoBack the view after update
   */
  updateEntity = async (entity: T, options?: ActionOptions) => {
    this.dispatch(this.changeFlag(this.actionTypes.update, true));
    try {
      var data = await this.currentService.updateEntity(
        entity,
        options ? options.properties : null,
      );

      var message =
        options && options.successMessage
          ? options.successMessage
          : `${this.nameSingularText} ${this.getDisplayValue(entity)} updated successfully.`;

      let successData = await this.onUpdateSuccessfully(data, this.dispatch);

      if (options && options.onSuccess) {
        options.onSuccess(successData);
      }

      //dispatch(this.changeFlag("saving", false));
      this.dispatch({ type: this.actionTypes.update, entity: successData });
      this.success(this.dispatch, this.actionTypes.update, message);
    } catch (error) {
      var errorTitle = `Updating ${this.nameSingularText} ${this.getDisplayValue(entity)} failed`;
      if (error && !error.message) {
        error.message = `${errorTitle}. ${error.message}`;
      }

      console.error(error);
      if (options && options.onError) {
        options.onError(error);
      }
      this.error(this.dispatch, this.actionTypes.update, error, errorTitle);
    }
  };

  createEntity = async (entity: T, options?: ActionOptions) => {
    this.dispatch(this.changeFlag(this.actionTypes.add, true));
    //dispatch(this.changeFlag("saving", true));
    try {
      var data = await this.currentService.createEntity(
        entity,
        options ? options.properties : null,
      );

      let successData = await this.onAddSuccessfully(data, this.dispatch);

      if (options && options.onSuccess) {
        options.onSuccess(successData);
      }

      var message =
        options && options.successMessage
          ? options.successMessage
          : `${this.nameSingularText} ${this.getDisplayValue(entity)} added successfully.`;
      this.dispatch({ type: this.actionTypes.add, entity: successData });
      this.success(this.dispatch, this.actionTypes.add, message);
    } catch (error) {
      var errorTitle = `Adding ${this.nameSingularText} ${this.getDisplayValue(entity)} failed`;

      console.error(error);
      if (options && options.onError) {
        options.onError(error);
      }

      this.error(this.dispatch, this.actionTypes.add, error, errorTitle);
    }
  };

  /**
   * Update entity in DB
   * @param {number} id
   * @param {*object} changes
   */
  saveEntityChanges = async (
    id: any,
    entity: T,
    changes: Array<JsonPatch>,
    original: T,
    options?: ActionOptions,
  ) => {
    this.dispatch(this.changeFlag('saving', true));
    try {
      var data = await this.currentService.saveChanges(id, entity, changes, original);

      let successData = await this.onUpdateSuccessfully(data, this.dispatch);

      if (options && options.onSuccess) {
        options.onSuccess(successData);
      }
      //TODO use action name
      this.dispatch(this.changeFlag('saving', false));
      this.dispatch({ type: this.actionTypes.save, entity: successData });

      this.success(
        this.dispatch,
        this.actionTypes.save,
        `${this.nameSingularText} ${this.getDisplayValue(entity)} updated successfully`,
      );
    } catch (error) {
      var errorTitle = `Updating ${this.nameSingularText} ${this.getDisplayValue(entity)} failed`;

      console.error(error);
      if (options && options.onError) {
        options.onError(error);
      }

      this.dispatch(this.changeFlag('saving', false));
      this.error(this.dispatch, this.actionTypes.save, error, errorTitle);
    }
  };

  async onAddSuccessfully(entity: T, dispatch: Dispatch) {
    return await Promise.resolve(entity);
  }

  async onUpdateSuccessfully(entity: T, dispatch: Dispatch) {
    return await Promise.resolve(entity);
  }

  deleteEntity = async (entity: T, options?: ActionOptions) => {
    try {
      this.dispatch(this.changeFlag(this.actionTypes.delete, true));
      var result = await this.currentService.deleteEntity(entity);
      if (result) {
        if (options && options.onSuccess) {
          options.onSuccess(result);
        }

        this.dispatch({ type: this.actionTypes.delete, entity: entity });
      } else {
        if (options && options.onSuccess) {
          options.onSuccess();
        }
      }
      this.success(
        this.dispatch,
        this.actionTypes.delete,
        `${this.nameSingularText} ${this.getDisplayValue(entity)} deleted successfully`,
      );
      return result;
    } catch (error) {
      if (options && options.onError) {
        options.onError(error);
      }
      let errorTitle = `Delete ${this.nameSingularText} ${this.getDisplayValue(entity)} failed`;
      this.error(this.dispatch, this.actionTypes.delete, error, errorTitle);
      return null;
    }
  };

  deleteEntities = async (entities: Array<T>, options?: ActionOptions) => {
    try {
      this.dispatch(this.changeFlag(this.actionTypes.delete, true));
      var result = await this.currentService.deleteEntities(entities);

      if (options && options.onSuccess) {
        options.onSuccess(result);
      }

      this.dispatch({ type: this.actionTypes.delete, entities: entities });
      this.success(
        this.dispatch,
        this.actionTypes.delete,
        `Selected ${this.nameSingularText} deleted successfully`,
      );
    } catch (error) {
      //console.log("Delete Entities error :", error);

      if (options && options.onError) {
        options.onError(error);
      }
      let errorTitle = `Delete selected ${this.nameSingularText} failed`;
      this.error(this.dispatch, this.actionTypes.delete, error, errorTitle);
    }
  };

  entitiesActivation = async (
    entities: Array<T>,
    status?: boolean,
    activationParameter?: string,
  ) => {
    this.dispatch(this.changeFlag('Loading', true));
    try {
      var data = await this.currentService.entitiesActivation(
        entities,
        status,
        activationParameter,
      );

      let message = `${this.namePluralText} items are activated successfully`;
      if (data.message) {
        message = data.message;
      }

      this.dispatch(this.changeFlag('Loading', false));

      this.dispatch({ type: this.actionTypes.Activation, payload: data });
      this.success(this.dispatch, this.actionTypes.Activation, message);
      return data;
    } catch (error) {
      this.dispatch(this.changeFlag('Loading', false));
      let errorTitle = `Activate selected ${this.nameSingularText} failed`;
      this.error(this.dispatch, this.actionTypes.Activation, error, errorTitle);
      return error;
    }
  };

  exportEntities = async (
    exportType = 'csv',
    entities: Array<T>,
    searchParams: any,
    exportConfig?: any,
  ) => {
    switch (exportType) {
      case 'csv':
        return this.exportCsv(entities, searchParams, exportConfig);

      case 'pdf':
        return this.exportPdf(entities, searchParams, exportConfig);

      case 'excel':
        return this.exportExcel(entities, searchParams, exportConfig);

      default:
        return this.exportCustomized(entities, searchParams, exportConfig);
    }
  };

  exportCsv = async (entities: Array<T>, searchParams: any, exportConfig?: any) => {
    if (!exportConfig) exportConfig = {} as any;
    try {
      this.dispatch({ type: this.actionTypes.exportingCsv, payload: true });
      if (exportConfig) {
        if (exportConfig.expand) searchParams.expand = exportConfig.expand;
      }
      searchParams.pageSize = -1;
      var result = await this.currentService.exportCSV(entities, searchParams, exportConfig);

      this.dispatch({ type: this.actionTypes.exportingCsv, payload: false });

      this.exportsService.downloadFile(
        window.URL.createObjectURL(result.blob),
        result.filename || this.nameSingularText + '_' + moment().format('YYYYMMDDhhmmss') + '.csv',
      );
    } catch (error) {
      console.log('error :', error);
      this.dispatch({ type: this.actionTypes.exportingCsv, payload: false });
      let errorTitle = `Export to Csv for selected ${this.nameSingularText} failed`;
      this.error(this.dispatch, this.actionTypes.exportingCsv, error, errorTitle);
    }
  };

  exportPdf = async (entities: Array<T>, searchParams: any, exportConfig?: any) => {};
  exportExcel = async (entities: Array<T>, searchParams: any, exportConfig?: any) => {};
  exportCustomized = async (entities: Array<T>, searchParams: any, exportConfig?: any) => {};

  getDisplayValue(entity: T) {
    return getDisplayValue(entity, this.displayField);
  }

  notifySuccess(message: string, options?: any) {
    this.notificationService?.notifySuccess(message, options);
  }

  notifyError(message: string, options?: any) {
    this.notificationService?.notifyError(message, options);
  }

  runAction = async (
    dispatch: Dispatch,
    actionType: string | { [actionName: string]: any },
    action: () => Promise<any>,
    onSuccessMessage?: string | boolean,
    onFailedMessage?: string | boolean,
    extraProps?: any,
  ) => {
    if (!extraProps) extraProps = {};
    try {
      this.start(dispatch, actionType, extraProps);
      var result: any = undefined;
      if (action) {
        result = await action();
      }
      if (typeof actionType === 'object') {
        var actionTypes = Object.keys(actionType);
        actionTypes.forEach((actionKey) => {
          dispatch({
            type: actionKey,
            actionValue: actionType[actionKey],
            payload: result,
            ...extraProps,
          });
        });
      } else {
        dispatch({
          type: actionType,
          payload: result,
          extraProps,
        });
      }

      this.success(dispatch, actionType, onSuccessMessage, extraProps);
      return result;
    } catch (error) {
      this.error(dispatch, actionType, error, onFailedMessage, extraProps);
    }
  };

  start = (dispatch: Dispatch, action: string | { [actionName: string]: any }, extraProps: any) => {
    dispatch(this.changeFlag(action, true, extraProps));
  };

  parseError = (error: any, message?: string) => {
    console.log('error', error, message);
  };

  error = (
    dispatch: Dispatch,
    action: string | { [actionName: string]: any },
    error: any,
    message?: string | boolean,
    extraProps = {},
  ) => {
    this.parseError(error, typeof message === 'string' ? message : '');
    if (!error) {
      error = { message: message };
    } else if (typeof error === 'string') {
      error = { message: error, title: message };
    } else {
      error.title = message;
    }
    dispatch(this.changeFlag(action, false, extraProps));

    this.notifyError(message ? message : error.message, {
      error: error,
    });

    if (typeof action === 'object') {
      var actionTypes = Object.keys(action);
      actionTypes.forEach((actionTypeKey) => {
        dispatch({
          type: this.actionTypes.error(actionTypeKey),
          actionName: actionTypeKey,
          actionValue: action[actionTypeKey],
          error,
          ...extraProps,
        });
      });
    } else {
      dispatch({
        type: this.actionTypes.error(action),
        actionName: action,
        error,
        ...extraProps,
      });
    }
  };

  success = (
    dispatch: Dispatch,
    action: string | { [actionName: string]: any },
    message?: string | boolean,
    extraProps = {},
  ) => {
    dispatch(this.changeFlag(action, false, extraProps));
    if (message) {
      this.notifySuccess(typeof message === 'string' ? message : 'Action completed successfully');
    }
  };

  destroy = () => {
    //TODO call abort for any rest calls
    this.currentService?.destroy();
    this.exportsService?.destroy();
  };
}
