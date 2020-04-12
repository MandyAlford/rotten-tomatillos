import { combineReducers } from "redux";
import { user } from "./user";
import { showLoginModal } from "./showLoginModal";
import { ratings } from "./ratings";
import { movies } from "./movies";
import { error } from "./error";

export const rootReducer = combineReducers({
  ratings,
  user,
  showLoginModal,
  movies,
  error
});
