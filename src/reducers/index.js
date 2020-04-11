import { combineReducers } from "redux";
import { user } from "./user";
import { showLoginModal } from "./showLoginModal";
import { ratings } from "./ratings";

export const rootReducer = combineReducers({
  ratings,
  user,
  showLoginModal,
});
