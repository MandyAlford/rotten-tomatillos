export const login = (user) => ({
  type: "LOGIN_USER",
  user
});

export const logout = () => ({
  type: "LOGOUT_USER"
});

export const showModal = (isShowing) => ({
  type: "SHOW_MODAL",
  isShowing: isShowing
});

export const getUserRatings = (ratings) => ({
  type: "GET_USER_RATINGS",
  ratings
});

export const getMovies = (movies) => ({
  type: "GET_MOVIES",
  movies
});

export const fetchError = (text) => ({
  type: "FETCH_ERROR",
  text
});
