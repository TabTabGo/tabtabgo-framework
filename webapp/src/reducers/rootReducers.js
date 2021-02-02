import { combineReducers } from 'redux';

import ajaxCallsInProgress from '@tabtabgo/core/RestApi/reducer';
import { snackbarReducer } from '@tabtabgo/web/components/Notifications/reducers';
import DashboardReducer from 'views/Dashboard/reducers';

const appReducers = combineReducers({
  ajaxCallsInProgress,
  notifications: snackbarReducer,
  dashboard: DashboardReducer,  
});

const rootReducers = (state, action) => {
  // Handle general reducers
  return appReducers(state, action);
};

export default rootReducers;
