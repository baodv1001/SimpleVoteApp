import { combineReducers } from 'redux';
import itemsReducer from './item.js';
import authReducer from './auth';

const appReducer = combineReducers({
  items: itemsReducer,
  auth: authReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
