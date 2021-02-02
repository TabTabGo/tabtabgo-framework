'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.ExportEntities = exports.containerFlags = exports.searchResults = exports.currentEntity = exports.EntityReducers = void 0;

var _immutabilityHelper = _interopRequireDefault(require('immutability-helper'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
 * Module Reducer Context
 * @param {EntityActionTypes} actionNames
 * @param {string} keyField Entity uniqe value
 */
var EntityReducers = function EntityReducers(actionNames) {
  var keyField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  return {
    ActionNames: actionNames,
    keyField: keyField,
  };
};

exports.EntityReducers = EntityReducers;
var defaultCurrentEntity = {
  entity: {},
  changes: {},
  original: {},
}; //Bind only worked with function not with arrow function ??

var currentEntity = function currentEntity() {
  var state =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCurrentEntity;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case 'RESET_APP':
      return defaultCurrentEntity;

    case this.ActionNames.select:
    case this.ActionNames.load:
      return (0, _immutabilityHelper['default'])(state, {
        entity: {
          $set: action.entity,
        },
        changes: {
          $set: {},
        },
        original: {
          $set: action.entity,
        },
      });

    case this.ActionNames.update:
    case this.ActionNames.add:
      return (0, _immutabilityHelper['default'])(state, {
        entity: {
          $set: action.entity,
        },
        changes: {
          $set: {},
        },
        original: {
          $set: action.entity,
        },
      });

    case this.ActionNames.save:
      return (0, _immutabilityHelper['default'])(state, {
        entity: {
          $merge: action.entity,
        },
        changes: {
          $set: {},
        },
        original: {
          $merge: action.entity,
        },
      });

    case this.ActionNames.updateProperty:
      return (0, _immutabilityHelper['default'])(state, {
        entity: {
          $merge: action.entity,
        },
        changes: {
          $merge: action.entity,
        },
      });

    case this.ActionNames['delete']:
    case this.ActionNames.unselect:
      return {
        entity: {},
        changes: {},
        original: {},
      };

    default:
      return state;
  }
};

exports.currentEntity = currentEntity;
var defaultSearchResults = {
  page: 0,
  //0 index
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
}; //Bind only worked with function not with arrow function ??

var searchResults = function searchResults() {
  var _this = this;

  var state =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSearchResults;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case 'RESET_APP':
      return defaultSearchResults;

    case this.ActionNames.searching: {
      var searchProps = action.payload;

      if (searchProps) {
        var updatedState = (0, _immutabilityHelper['default'])(state, {
          $merge: searchProps,
        });
        return updatedState;
      }

      return state;
    }

    case this.ActionNames.search: {
      var result = action.result;
      return (0, _immutabilityHelper['default'])(state, {
        query: {
          $merge: result.query,
        },
        page: {
          $set: result.page,
        },
        totalRecords: {
          $set: result.totalRecords,
        },
        totalPages: {
          $set: result.totalPages,
        },
        pageSize: {
          $set: result.pageSize,
        },
        items: {
          $set: result.items,
        }, // TODO add logic of items mapping
      });
    }

    case this.ActionNames.order:
      return Object.assign({}, state, {
        items: action.orderData,
      });

    case this.ActionNames.add:
    case this.ActionNames.update:
    case this.ActionNames.updateSearchResult:
      //TODO update the search result
      if (action.entity) {
        var updatedData = null;
        var index = state.items.findIndex(function (item) {
          return item[_this.keyField] === action.entity[_this.keyField];
        });

        if (index >= 0) {
          //if entity part of list
          updatedData = (0, _immutabilityHelper['default'])(
            state.items,
            _defineProperty({}, index, {
              $set: action.entity,
            }),
          );
        } else {
          //Not clear why need to delete
          updatedData = [action.entity].concat(state.items);

          if (state.items.size > 0) {
            updatedData.pop();
          }
        } //} else {
        //    updatedData = state.items;
        //}

        var _result = Object.assign({}, action.result, {
          items: updatedData,
        });

        return Object.assign({}, state, _result);
      }

      return state;

    case this.ActionNames['delete']:
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

exports.searchResults = searchResults;
var listPushActions = ['CREATE', 'POST', 'DELETE', 'UPDATE', 'ADD', 'EDIT', 'PUT', 'PATCH', 'SAVE'];
var listPullActions = ['GET', 'LOAD', 'SEARCH'];

var updateGeneralInProgress = function updateGeneralInProgress(flag, inProgress) {
  if (flag) return inProgress + 1;
  return inProgress > 0 ? inProgress - 1 : 0;
};

var updateGeneralPull = function updateGeneralPull(action, flag, inProgress) {
  var actionTokens = action.split('/');

  if (
    actionTokens.some(function (a) {
      return listPullActions.includes(a);
    })
  ) {
    if (flag) return inProgress + 1;
    return inProgress > 0 ? inProgress - 1 : 0;
  }

  return inProgress;
};

var updateGeneralPush = function updateGeneralPush(action, flag, inProgress) {
  var actionTokens = action.split('/');

  if (
    actionTokens.some(function (a) {
      return listPushActions.includes(a);
    })
  ) {
    if (flag) return inProgress + 1;
    return inProgress > 0 ? inProgress - 1 : 0;
  }

  return inProgress;
};

var defaultContainerFlags = {
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
}; //Bind only worked with function not with arrow function ??

var containerFlags = function containerFlags() {
  var state =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultContainerFlags;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case 'RESET_APP':
      return _objectSpread({}, defaultContainerFlags);

    case this.ActionNames.loading:
      return (0, _immutabilityHelper['default'])(state, {
        loading: {
          $set: true,
        },
        inProgress: {
          $set: updateGeneralInProgress(true, state.inProgress),
        },
        pulling: {
          $set: updateGeneralInProgress(true, state.pulling),
        },
      });

    case this.ActionNames.searching:
      return (0, _immutabilityHelper['default'])(state, {
        loading: {
          $set: true,
        },
        searching: {
          $set: true,
        },
        inProgress: {
          $set: updateGeneralInProgress(true, state.inProgress),
        },
        pulling: {
          $set: updateGeneralInProgress(true, state.pulling),
        },
      });

    case this.ActionNames.load:
      return (0, _immutabilityHelper['default'])(state, {
        loading: {
          $set: false,
        },
        saving: {
          $set: false,
        },
        inProgress: {
          $set: updateGeneralInProgress(false, state.inProgress),
        },
        pulling: {
          $set: updateGeneralInProgress(false, state.pulling),
        },
        error: {
          $set: {},
        },
      });

    case this.ActionNames.search: {
      return (0, _immutabilityHelper['default'])(state, {
        loading: {
          $set: false,
        },
        searching: {
          $set: false,
        },
        //saving: { $set: false },
        inProgress: {
          $set: updateGeneralInProgress(false, state.inProgress),
        },
        pulling: {
          $set: updateGeneralInProgress(false, state.pulling),
        },
        error: {
          $set: {},
        },
      });
    }

    case this.ActionNames.add:
    case this.ActionNames['delete']:
    case this.ActionNames.save:
    case this.ActionNames.update: {
      var _newState = (0, _immutabilityHelper['default'])(state, {
        loading: {
          $set: false,
        },
        saving: {
          $set: false,
        },
        inProgress: {
          $set: updateGeneralInProgress(false, state.inProgress),
        },
        pushing: {
          $set: updateGeneralInProgress(false, state.pushing),
        },
        error: {
          $set: {},
        },
      });

      if (action.Type) {
        _newState = (0, _immutabilityHelper['default'])(
          _newState,
          _defineProperty({}, this.ActionNames.flag(action.Type), {
            $set: false,
          }),
        );
      }

      return _newState;
    }

    case this.ActionNames.exportingPdf: {
      return (0, _immutabilityHelper['default'])(state, {
        exportingPdf: {
          $set: action.payload,
        },
        inProgress: {
          $set: updateGeneralInProgress(action.payload, state.inProgress),
        },
        pushing: {
          $set: updateGeneralInProgress(action.payload, state.pushing),
        },
      });
    }

    case this.ActionNames.exportingExcel: {
      return (0, _immutabilityHelper['default'])(state, {
        exportingExcel: {
          $set: action.payload,
        },
        inProgress: {
          $set: updateGeneralInProgress(action.payload, state.inProgress),
        },
        pushing: {
          $set: updateGeneralInProgress(action.payload, state.pushing),
        },
      });
    }

    case this.ActionNames.exportingCsv: {
      return (0, _immutabilityHelper['default'])(state, {
        exportingCsv: {
          $set: action.payload,
        },
        inProgress: {
          $set: updateGeneralInProgress(action.payload, state.inProgress),
        },
        pushing: {
          $set: updateGeneralInProgress(action.payload, state.pushing),
        },
      });
    }

    case this.ActionNames.printing: {
      return (0, _immutabilityHelper['default'])(state, {
        printing: {
          $set: action.payload,
        },
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
        return Object.assign({}, state, {
          detail: action.value,
        });

      if (action.actionName && action.type === this.ActionNames.flag(action.actionName)) {
        var _update3;

        var newState = _objectSpread({}, state);

        switch (action.actionName) {
          case this.ActionNames.add:
            newState = (0, _immutabilityHelper['default'])(newState, {
              saving: {
                $set: action.payload,
              },
              add: {
                $set: action.payload,
              },
            });
            break;

          case this.ActionNames.update:
            newState = (0, _immutabilityHelper['default'])(newState, {
              saving: {
                $set: action.payload,
              },
              edit: {
                $set: action.payload,
              },
            });
            break;

          case this.ActionNames['delete']:
          case this.ActionNames.save:
            newState = (0, _immutabilityHelper['default'])(newState, {
              saving: {
                $set: action.payload,
              },
            });
            break;

          default:
            break;
        } //console.log('action', action)

        return (0, _immutabilityHelper['default'])(
          newState,
          ((_update3 = {}),
          _defineProperty(
            _update3,
            action.actionName,
            action.actionValue
              ? state[action.actionName]
                ? {
                    $merge: _defineProperty({}, action.actionValue, action.payload),
                  }
                : {
                    $set: _defineProperty({}, action.actionValue, action.payload),
                  }
              : {
                  $set: action.payload,
                },
          ),
          _defineProperty(
            _update3,
            'error',
            _defineProperty(
              {},
              action.actionName,
              action.actionValue
                ? state[action.actionName]
                  ? {
                      $merge: _defineProperty({}, action.actionValue, null),
                    }
                  : {
                      $set: _defineProperty({}, action.actionValue, null),
                    }
                : {
                    $set: null,
                  },
            ),
          ),
          _defineProperty(_update3, 'inProgress', {
            $set: updateGeneralInProgress(action.payload, state.inProgress),
          }),
          _defineProperty(_update3, 'pulling', {
            $set: updateGeneralPull(action.actionName, action.payload, state.pulling),
          }),
          _defineProperty(_update3, 'pushing', {
            $set: updateGeneralPush(action.actionName, action.payload, state.pushing),
          }),
          _update3),
        );
      }

      if (action.actionName && action.type === this.ActionNames.error(action.actionName)) {
        var _update4;

        var errorValue = action.error; //? action.error.message : action.error;

        return (0, _immutabilityHelper['default'])(
          state,
          ((_update4 = {}),
          _defineProperty(
            _update4,
            action.actionName,
            action.actionValue
              ? state[action.actionName]
                ? {
                    $merge: _defineProperty({}, action.actionValue, false),
                  }
                : {
                    $set: _defineProperty({}, action.actionValue, false),
                  }
              : {
                  $set: false,
                },
          ),
          _defineProperty(
            _update4,
            'error',
            _defineProperty(
              {},
              action.actionName,
              action.actionValue
                ? state[action.actionName]
                  ? {
                      $merge: _defineProperty({}, action.actionValue, errorValue),
                    }
                  : {
                      $set: _defineProperty({}, action.actionValue, errorValue),
                    }
                : {
                    $set: errorValue,
                  },
            ),
          ),
          _defineProperty(_update4, 'inProgress', {
            $set: updateGeneralInProgress(false, state.inProgress),
          }),
          _defineProperty(_update4, 'pulling', {
            $set: updateGeneralPull(action.actionName, false, state.pulling),
          }),
          _defineProperty(_update4, 'pushing', {
            $set: updateGeneralPush(action.actionName, false, state.pushing),
          }),
          _update4),
        );
      }
  }

  return state;
};

exports.containerFlags = containerFlags;
var defaultExportEntities = {
  entities: [],
  loading: false,
};

var ExportEntities = function ExportEntities() {
  var state =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultExportEntities;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case 'RESET_APP':
      return defaultExportEntities;

    case 'EXPORTING':
    case 'PRINTING':
      return Object.assign({}, state, {
        entities: [],
        loading: true,
      });

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

exports.ExportEntities = ExportEntities;
