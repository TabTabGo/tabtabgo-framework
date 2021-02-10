import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../rootReducers';

const Store = (preLoadedState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    preLoadedState,
    composeEnhancers(applyMiddleware(thunk /*, createLogger()*/)),
  );

  return store;
};

export default Store;
