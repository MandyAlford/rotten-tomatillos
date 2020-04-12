import { combineReducers } from "redux";
import { user } from "./user";
import { showLoginModal } from "./showLoginModal";
import { movies } from "./movies";

export const rootReducer = combineReducers({
  user,
  showLoginModal,
  movies,
});
