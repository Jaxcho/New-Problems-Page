import {useEffect, useReducer} from 'react';
import {authReducer, initialAuthState} from '../reducers/Auth';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

export const AuthProvider = ({children}: any) => {
    const api_url = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    useEffect(() => {
        const checkAuth = () => {
            const user_id = localStorage.getItem("user_id") || null;
            const access_token = localStorage.getItem("access_token") || null;

            if (user_id && access_token) {
                dispatch({type: "LOGIN_SUCCESS", payload: {user_id, access_token}});
            } else {
                dispatch({type: "LOGIN_FAILURE", payload: false})
            }
        }
        // setTimeout(checkAuth, 1000);
        checkAuth();
    }, []);

    const login=async (email: string, password: string) => {
        dispatch({type:"LOGIN_START"});
        try {
            const {data} = await axios.post(`${api_url}/auth/login`, {email, password});
            localStorage.setItem("user_id", data.id);
            localStorage.setItem("access_token", data.token);
            dispatch({type:"LOGIN_SUCCESS", payload:{user_id:data.id, access_token:data.token}});
            return {
                success:true,
            }

        } catch (e) {
            dispatch({ type: "LOGIN_FAILURE", payload: e });
            return { success: false, error: e };
        }
    }

    const logout = async () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        dispatch({type:"LOGOUT"})
        return {success:true}
    }

    const value = {
        ...state,
        login,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
