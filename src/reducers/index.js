import { combineReducers } from "redux";
import { user } from "./user";
import { showLoginModal } from "./showLoginModal";
import { movies } from "./movies";
import { error } from "./error";

export const rootReducer = combineReducers({
  user,
  showLoginModal,
  movies,
  error
});
