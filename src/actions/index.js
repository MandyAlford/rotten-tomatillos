export const login = userData => ({
    type:'LOGIN_USER',
    userData,
})
export const logout = () => ({
    type:'LOGOUT_USER',
})

export const showModal = isShowing => ({
    type:'SHOW_MODAL',
    isShowing:isShowing
})
