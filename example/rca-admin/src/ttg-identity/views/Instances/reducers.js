import { combineReducers } from 'redux';
import { InstancesActionTypes } from './actions';
import {
  EntityReducers,
  currentEntity,
  searchResults,
  containerFlags,
} from '@tabtabgo/web/Entity/Reducers';

const reducerObj = EntityReducers(InstancesActionTypes, 'instanceId');

const InstancesReducer = combineReducers({
  current: currentEntity.bind(reducerObj),
  searchResults: searchResults.bind(reducerObj),
  containerFlags: containerFlags.bind(reducerObj),
});

export default InstancesReducer;
