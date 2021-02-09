import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../rootReducers';

const Store = (preLoadedState) => createStore(rootReducer, preLoadedState, applyMiddleware(thunk));

export default Store;
