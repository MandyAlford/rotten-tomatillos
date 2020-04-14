export const error = (state = {errorMessage: '', isError: false}, action) => {
  switch (action.type){
    case "FETCH_ERROR":
      return {
        errorMessage: action.text,
        isError: true,
      }
    default:
      return state;
  }
}
