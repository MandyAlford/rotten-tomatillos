export const login = (userData) => ({
  type: "LOGIN_USER",
  user:userData.user,
});

export const logout = () => ({
  type: "LOGOUT_USER",
});

export const showModal = (isShowing) => ({
  type: "SHOW_MODAL",
  isShowing: isShowing,
});

export const getUserRatings = (ratings) => {
  console.log(ratings)
  debugger
  return ({
      type: "GET_USER_RATINGS",
      ratings,
    });
}
