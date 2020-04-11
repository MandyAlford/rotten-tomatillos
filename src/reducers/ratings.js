export const ratings = (state = [], action) => {
  switch (action.type) {
    case "GET_USER_RATINGS":
      return action.ratings;
    case "CLEAR_RATINGS":
      return [];
    default:
      return state;
  }
};
