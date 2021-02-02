import update from 'immutability-helper';
/**
 * Module Reducer Context
 * @param {EntityActionTypes} actionNames
 * @param {string} keyField Entity uniqe value
 */
export const EntityReducers = (actionNames, keyField = 'id') => {
  return {
    ActionNames: actionNames,
    keyField: keyField,
  };
};
const defaultCurrentEntity = {
  entity: {},
  changes: {},
  original: {},
};
//Bind only worked with function not with arrow function ??
export const currentEntity = function (state = defaultCurrentEntity, action = {}) {
  switch (action.type) {
    case 'RESET_APP':
      return defaultCurrentEntity;
    case this.ActionNames.select:
    case this.ActionNames.load:
      return update(state, {
        entity: { $set: action.entity },
        changes: { $set: {} },
        original: { $set: action.entity },
      });
    case this.ActionNames.update:
    case this.ActionNames.add:
      return update(state, {
        entity: { $set: action.entity },
        changes: { $set: {} },
        original: { $set: action.entity },
      });
    case this.ActionNames.save:
      return update(state, {
        entity: { $merge: action.entity },
        changes: { $set: {} },
        original: { $merge: action.entity },
      });
    case this.ActionNames.updateProperty:
      return update(state, {
        entity: { $merge: action.entity },
        changes: { $merge: action.entity },
      });
    case this.ActionNames.delete:
    case this.ActionNames.unselect:
      return { entity: {}, changes: {}, original: {} };
    default:
      return state;
  }
};

const defaultSearchResults = {
  page: 0, //0 index
  totalRecords: 0,
  totalPages: 0,
  pageSize: 50,
  items: [],
  query: {
    searchUrl: '',
    params: {},
  },
  order: null,
  orderBy: null,
};

//Bind only worked with function not with arrow function ??
export const searchResults = function (state = defaultSearchResults, action = {}) {
  switch (action.type) {
    case 'RESET_APP':
      return defaultSearchResults;
    case this.ActionNames.searching: {
      let searchProps = action.payload;
      if (searchProps) {
        var updatedState = update(state, { $merge: searchProps });
        return updatedState;
      }

      return state;
    }
    case this.ActionNames.search: {
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

    case this.ActionNames.order:
      return Object.assign({}, state, { items: action.orderData });
    case this.ActionNames.add:
    case this.ActionNames.update:
    case this.ActionNames.updateSearchResult:
      //TODO update the search result
      if (action.entity) {
        let updatedData = null;
        let index = state.items.findIndex(
          (item) => item[this.keyField] === action.entity[this.keyField],
        );
        if (index >= 0) {
          //if entity part of list
          updatedData = update(state.items, {
            [index]: { $set: action.entity },
          });
        } else {
          //Not clear why need to delete
          updatedData = [action.entity].concat(state.items);
          if (state.items.size > 0) {
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
    case this.ActionNames.delete:
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

const updateGeneralInProgress = (flag, inProgress) => {
  if (flag) return inProgress + 1;
  return inProgress > 0 ? inProgress - 1 : 0;
};
const updateGeneralPull = (action, flag, inProgress) => {
  var actionTokens = action.split('/');
  if (actionTokens.some((a) => listPullActions.includes(a))) {
    if (flag) return inProgress + 1;
    return inProgress > 0 ? inProgress - 1 : 0;
  }
  return inProgress;
};

const updateGeneralPush = (action, flag, inProgress) => {
  var actionTokens = action.split('/');
  if (actionTokens.some((a) => listPushActions.includes(a))) {
    if (flag) return inProgress + 1;
    return inProgress > 0 ? inProgress - 1 : 0;
  }
  return inProgress;
};

const defaultContainerFlags = {
  add: false,
  edit: false,
  detail: false,
  loading: false,
  searching: false,
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
export const containerFlags = function (state = defaultContainerFlags, action = {}) {
  switch (action.type) {
    case 'RESET_APP':
      return { ...defaultContainerFlags };
    case this.ActionNames.loading:
      return update(state, {
        loading: {
          $set: true,
        },
        inProgress: { $set: updateGeneralInProgress(true, state.inProgress) },
        pulling: {
          $set: updateGeneralInProgress(true, state.pulling),
        },
      });
    case this.ActionNames.searching:
      return update(state, {
        loading: {
          $set: true,
        },
        searching: {
          $set: true,
        },
        inProgress: { $set: updateGeneralInProgress(true, state.inProgress) },
        pulling: {
          $set: updateGeneralInProgress(true, state.pulling),
        },
      });
    case this.ActionNames.load:
      return update(state, {
        loading: { $set: false },
        saving: { $set: false },
        inProgress: { $set: updateGeneralInProgress(false, state.inProgress) },
        pulling: {
          $set: updateGeneralInProgress(false, state.pulling),
        },
        error: { $set: {} },
      });

    case this.ActionNames.search: {
      return update(state, {
        loading: { $set: false },
        searching: { $set: false },
        //saving: { $set: false },
        inProgress: { $set: updateGeneralInProgress(false, state.inProgress) },
        pulling: {
          $set: updateGeneralInProgress(false, state.pulling),
        },
        error: { $set: {} },
      });
    }
    case this.ActionNames.add:
    case this.ActionNames.delete:
    case this.ActionNames.save:
    case this.ActionNames.update: {
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
          [this.ActionNames.flag(action.Type)]: { $set: false },
        });
      }
      return newState;
    }
    case this.ActionNames.exportingPdf: {
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
    case this.ActionNames.exportingExcel: {
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
    case this.ActionNames.exportingCsv: {
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
    case this.ActionNames.printing: {
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
      if (action.type === this.ActionNames.flag('DETAIL'))
        return Object.assign({}, state, { detail: action.value });
      if (action.actionName && action.type === this.ActionNames.flag(action.actionName)) {
        var newState = { ...state };
        switch (action.actionName) {
          case this.ActionNames.add:
            newState = update(newState, {
              saving: { $set: action.payload },
              add: { $set: action.payload },
            });
            break;
          case this.ActionNames.update:
            newState = update(newState, {
              saving: { $set: action.payload },
              edit: { $set: action.payload },
            });
            break;
          case this.ActionNames.delete:
          case this.ActionNames.save:
            newState = update(newState, {
              saving: { $set: action.payload },
            });
            break;
          default:
            break;
        }
        //console.log('action', action)
        return update(newState, {
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
      if (action.actionName && action.type === this.ActionNames.error(action.actionName)) {
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

const defaultExportEntities = {
  entities: [],
  loading: false,
};
export const ExportEntities = (state = defaultExportEntities, action = {}) => {
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
