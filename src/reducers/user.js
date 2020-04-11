const defaultState = {
  name: "",
  id: null,
  email: "",
  ratings: [],
};
export const user = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.user;
    case "LOGOUT_USER":
      return defaultState;
    case "GET_USER_RATINGS":
      return {
        name: state.name,
        id: state.id,
        email: state.email,
        ratings: action.ratings,
      };
    default:
      return state;
  }
};
