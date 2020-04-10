const defaultState = {
    name: "",
    id: null,
    email: ""
};
export const user = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.userData.user;
    case "LOGOUT_USER":
      return defaultState;
    default:
      return state;
  }
}
