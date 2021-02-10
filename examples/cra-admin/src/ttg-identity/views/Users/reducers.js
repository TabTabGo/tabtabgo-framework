import { combineReducers } from 'redux';
import { UsersActionTypes } from './actions';
import {
  EntityReducers,
  currentEntity,
  searchResults,
  containerFlags,
} from '@tabtabgo/web/Entity/Reducers';

const reducerObj = EntityReducers(UsersActionTypes, 'id');

const UsersReducer = combineReducers({
  current: currentEntity.bind(reducerObj),
  searchResults: searchResults.bind(reducerObj),
  containerFlags: containerFlags.bind(reducerObj),
});

export default UsersReducer;
