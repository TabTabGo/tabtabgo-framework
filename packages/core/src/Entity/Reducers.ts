import update from 'immutability-helper';
import { IEntityActionTypes } from './ActionTypes';
import { Action, PagingList } from '../../types';
/**
 * Module Reducer Context
 * @param {EntityActionTypes} actionNames
 * @param {string} keyField Entity unique value
 */
export const EntityReducers = (actionNames: IEntityActionTypes, keyField = 'id') => {
  return {
    currentEntity: currentEntity(actionNames, keyField),
    searchResults: searchResults(actionNames, keyField),
    containerFlags: containerFlags(actionNames, keyField),
    exportEntities: ExportEntities(actionNames, keyField),
    ActionNames: actionNames,
    keyField: keyField,
  };
};
export interface ICurrentEntity<T> {
  entity: T;
  changes: any;
  original: T;
}
const defaultCurrentEntity: ICurrentEntity<any> = {
  entity: {},
  changes: {},
  original: {},
};
//Bind only worked with function not with arrow function ??
export const currentEntity = (actionNames: IEntityActionTypes, keyField = 'id') => (
  state = defaultCurrentEntity,
  action: Action,
) => {
  switch (action.type) {
    case 'RESET_APP':
      return defaultCurrentEntity;
    case actionNames.select:
    case actionNames.load:
      return update(state, {
        entity: { $set: action.entity },
        changes: { $set: {} },
        original: { $set: action.entity },
      });
    case actionNames.update:
    case actionNames.add:
      return update(state, {
        entity: { $set: action.entity },
        changes: { $set: {} },
        original: { $set: action.entity },
      });
    case actionNames.save:
      return update(state, {
        entity: { $merge: action.entity },
        changes: { $set: {} },
        original: { $merge: action.entity },
      });
    case actionNames.updateProperty:
      return update(state, {
        entity: { $merge: action.entity },
        changes: { $merge: action.entity },
      });
    case actionNames.delete:
    case actionNames.unselect:
      return { entity: {}, changes: {}, original: {} };
    default:
      return state;
  }
};

const defaultSearchResults: PagingList<any> = {
  page: 0, //0 index
  totalRecords: 0,
  totalPages: 0,
  numberOfElements: 0,
  pageSize: 50,
  items: [],
  query: {
    searchUrl: '',
    params: {},
  },
  order: undefined,
  orderBy: undefined,
};

//Bind only worked with function not with arrow function ??
export const searchResults = (actionNames: IEntityActionTypes, keyField = 'id') => (
  state = defaultSearchResults,
  action: Action,
) => {
  switch (action.type) {
    case 'RESET_APP':
      return defaultSearchResults;
    case actionNames.searching: {
      let searchProps = action.payload;
      if (searchProps) {
        var updatedState = update(state, { $merge: searchProps });
        return updatedState;
      }

      return state;
    }
    case actionNames.search: {
      const result = action.result;
      return update(state, {
        query: { $merge: result.query },
        page: { $set: result.page },
        totalRecords: { $set: result.totalRecords },
        totalPages: { $set: result.totalPages },
        pageSize: { $set: result.pageSize },
        items: { $set: result.items }, // TODO add logic of items mapping
      });
    }

    case actionNames.order:
      return Object.assign({}, state, { items: action.orderData });
    case actionNames.add:
    case actionNames.update:
    case actionNames.updateSearchResult:
      //TODO update the search result
      if (action.entity) {
        let updatedData = null;
        let index = state.items.findIndex((item) => item[keyField] === action.entity[keyField]);
        if (index >= 0) {
          //if entity part of list
          updatedData = update(state.items, {
            [index]: { $set: action.entity },
          });
        } else {
          //Not clear why need to delete
          updatedData = [action.entity].concat(state.items);
          if (state.items.length > 0) {
            updatedData.pop();
          }
        }
        //} else {
        //    updatedData = state.items;
        //}

        const result = Object.assign({}, action.result, { items: updatedData });
        return Object.assign({}, state, result);
      }
      return state;
    case actionNames.delete:
      // if (action.entity) {
      //   let index = state.items.findIndex(
      //     item => item[this.keyField] === action.entity[this.keyField]
      //   );
      //   return Object.assign({}, state, { items: state.items.reduce(index,1) });
      // }
      // if (action.entities) {
      //   var newState = Object.assign({}, state);
      //   for (let i = 0; i < action.entities.length; i++) {
      //     const e = action.entities[i];
      //     let index = state.items.findIndex(item => item[this.keyField] === e[this.keyField]);
      //     newState = Object.assign(newState, { items: state.items.reduce(index,1) });
      //   }

      //   return Object.assign({}, state, newState);
      // }
      return state;
    default:
      return state;
  }
};

const listPushActions = [
  'CREATE',
  'POST',
  'DELETE',
  'UPDATE',
  'ADD',
  'EDIT',
  'PUT',
  'PATCH',
  'SAVE',
];
const listPullActions = ['GET', 'LOAD', 'SEARCH'];

const updateGeneralInProgress = (flag: boolean, inProgress: number) => {
  if (flag) return inProgress + 1;
  return inProgress > 0 ? inProgress - 1 : 0;
};
const updateGeneralPull = (action: string, flag: boolean, inProgress: number) => {
  var actionTokens = action.split('/');
  if (actionTokens.some((a: string) => listPullActions.includes(a))) {
    if (flag) return inProgress + 1;
    return inProgress > 0 ? inProgress - 1 : 0;
  }
  return inProgress;
};

const updateGeneralPush = (action: string, flag: boolean, inProgress: number) => {
  var actionTokens = action.split('/');
  if (actionTokens.some((a: string) => listPushActions.includes(a))) {
    if (flag) return inProgress + 1;
    return inProgress > 0 ? inProgress - 1 : 0;
  }
  return inProgress;
};

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

const defaultContainerFlags: IContainerFlags = {
  add: false,
  edit: false,
  detail: false,
  loading: false,
  saving: false,
  exportingCsv: false,
  exportingExcel: false,
  exportingPdf: false,
  printing: false,
  forceRefresh: true,
  error: {},
  inProgress: 0,
  pulling: 0,
  pushing: 0,
};
//Bind only worked with function not with arrow function ??
export const containerFlags = (actionNames: IEntityActionTypes, keyField = 'id') => (
  state: IContainerFlags = defaultContainerFlags,
  action: Action,
) => {
  switch (action.type) {
    case 'RESET_APP':
      return { ...defaultContainerFlags };
    case actionNames.loading:
    case actionNames.searching:
      return update(state, {
        loading: {
          $set: true,
        },
        inProgress: { $set: updateGeneralInProgress(true, state.inProgress) },
        pulling: {
          $set: updateGeneralInProgress(true, state.pulling),
        },
      });
    case actionNames.load:
    case actionNames.search: {
      return update(state, {
        loading: { $set: false },
        saving: { $set: false },
        inProgress: { $set: updateGeneralInProgress(false, state.inProgress) },
        pulling: {
          $set: updateGeneralInProgress(false, state.pulling),
        },
        error: { $set: {} },
      });
    }
    case actionNames.add:
    case actionNames.delete:
    case actionNames.save:
    case actionNames.update: {
      let newState = update(state, {
        loading: { $set: false },
        saving: { $set: false },
        inProgress: { $set: updateGeneralInProgress(false, state.inProgress) },
        pushing: {
          $set: updateGeneralInProgress(false, state.pushing),
        },
        error: { $set: {} },
      });

      if (action.Type) {
        newState = update(newState, {
          [actionNames.flag(action.Type)]: { $set: false },
        });
      }
      return newState;
    }
    case actionNames.exportingPdf: {
      return update(state, {
        exportingPdf: { $set: action.payload },
        inProgress: {
          $set: updateGeneralInProgress(action.payload, state.inProgress),
        },
        pushing: {
          $set: updateGeneralInProgress(action.payload, state.pushing),
        },
      });
    }
    case actionNames.exportingExcel: {
      return update(state, {
        exportingExcel: { $set: action.payload },
        inProgress: {
          $set: updateGeneralInProgress(action.payload, state.inProgress),
        },
        pushing: {
          $set: updateGeneralInProgress(action.payload, state.pushing),
        },
      });
    }
    case actionNames.exportingCsv: {
      return update(state, {
        exportingCsv: { $set: action.payload },
        inProgress: {
          $set: updateGeneralInProgress(action.payload, state.inProgress),
        },
        pushing: {
          $set: updateGeneralInProgress(action.payload, state.pushing),
        },
      });
    }
    case actionNames.printing: {
      return update(state, {
        printing: { $set: action.payload },
        inProgress: {
          $set: updateGeneralInProgress(action.payload, state.inProgress),
        },
        pushing: {
          $set: updateGeneralInProgress(action.payload, state.pushing),
        },
      });
    }
    default:
      if (action.type === actionNames.flag('DETAIL'))
        return Object.assign({}, state, { detail: action.value });
      if (action.actionName && action.type === actionNames.flag(action.actionName)) {
        //console.log('action', action)
        return update(state, {
          [action.actionName]: action.actionValue
            ? state[action.actionName]
              ? { $merge: { [action.actionValue]: action.payload } }
              : { $set: { [action.actionValue]: action.payload } }
            : { $set: action.payload },
          error: {
            [action.actionName]: action.actionValue
              ? state[action.actionName]
                ? { $merge: { [action.actionValue]: null } }
                : { $set: { [action.actionValue]: null } }
              : { $set: null },
          },
          inProgress: {
            $set: updateGeneralInProgress(action.payload, state.inProgress),
          },
          pulling: {
            $set: updateGeneralPull(action.actionName, action.payload, state.pulling),
          },
          pushing: {
            $set: updateGeneralPush(action.actionName, action.payload, state.pushing),
          },
        });
      }
      if (action.actionName && action.type === actionNames.error(action.actionName)) {
        let errorValue = action.error; //? action.error.message : action.error;

        return update(state, {
          [action.actionName]: action.actionValue
            ? state[action.actionName]
              ? { $merge: { [action.actionValue]: false } }
              : { $set: { [action.actionValue]: false } }
            : { $set: false },
          error: {
            [action.actionName]: action.actionValue
              ? state[action.actionName]
                ? { $merge: { [action.actionValue]: errorValue } }
                : { $set: { [action.actionValue]: errorValue } }
              : { $set: errorValue },
          },
          inProgress: {
            $set: updateGeneralInProgress(false, state.inProgress),
          },
          pulling: {
            $set: updateGeneralPull(action.actionName, false, state.pulling),
          },
          pushing: {
            $set: updateGeneralPush(action.actionName, false, state.pushing),
          },
        });
      }
  }
  return state;
};

export interface IExportEntities<T> {
  entities: Array<T>;
  loading: boolean;
}
const defaultExportEntities: IExportEntities<any> = {
  entities: [],
  loading: false,
};
export const ExportEntities = (actionNames: IEntityActionTypes, keyField = 'id') => (
  state = defaultExportEntities,
  action: Action,
) => {
  switch (action.type) {
    case 'RESET_APP':
      return defaultExportEntities;
    case 'EXPORTING':
    case 'PRINTING':
      return Object.assign({}, state, { entities: [], loading: true });
    case 'PRINTED':
    case 'EXPORTED':
      return Object.assign({}, state, {
        entities: action.entities,
        loading: false,
      });
    default:
      return state;
  }
};
