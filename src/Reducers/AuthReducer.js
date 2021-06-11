const authReducer = (state = {
    isLogged: false
}, action) => {
    var newState;
    switch (action.type) {
        case 'SET_LOGGED':
            newState = { ...state };
            newState.isLogged = true
            return newState;

        case 'REMOVE_LOGGED':
            newState = { ...state };
            newState.isLogged = false
            return newState;

        default:
            return state;
    }
}
export default authReducer;