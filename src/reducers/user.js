const defaultState = {
  user: {
    name: "",
    id: null,
    email: ""
  },
  show:false
};
export const user = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {...state,...action.userData,show:action.show};
    default:
      return state;
  }
};
