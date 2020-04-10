import { combineReducers } from 'redux';
import { user } from './user';
import { showLoginModal } from './showLoginModal';

export const rootReducer = combineReducers({
  user,
  showLoginModal
})
