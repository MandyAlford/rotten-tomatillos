export const ratings = (state = [], action) => {
  switch (action.type) {
    case "RATE_MOVIE":
      return [...state, action.rating];
    case "GET_USER_RATINGS":
      return action.ratings;
    default:
      return state;
  }
};
