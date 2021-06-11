export const loginUser = () => {
   return {
        type: "SET_LOGGED"
    }
}
export const logoutUser = () => {
    localStorage.removeItem("JWTtoken")
    return {
        type: "REMOVE_LOGGED"
    }
}