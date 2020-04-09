import { combineReducers } from 'redux';
import { user } from './user';
import { show } from './show';

export const rootReducer = combineReducers({
  user,
  show
})
