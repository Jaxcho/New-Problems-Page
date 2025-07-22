const initialAuthState={
    access_token:null,
    user_id:null,
    isAuthenticated:false,
    isLoading:false,
    error: null
    }


const authReducer=(state: any, action: any): any => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case "LOGIN_SUCCESS":
            return {
                ...state,
                user_id: action.payload.user_id,
                access_token: action.payload.access_token,
                isAuthenticated: true,
                isLoading: false,
                error: null
            }
        case "LOGIN_FAILURE":
            return {
                ...state,
                user_id: null,
                access_token: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                access_token:null,
                user_id:null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            }
        default:
            return state;
    }
}

export { authReducer, initialAuthState };