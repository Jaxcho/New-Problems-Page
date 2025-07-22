import {useAuth} from '~/hooks/useAuth';
import { useNavigate} from "react-router";
import Navbar from "../components/Navbar";
import {useState, useEffect} from 'react';

export default function Signout() {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        logout();
        if(!isAuthenticated){
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }, [])
    const api_url = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
    return (
        <div>
            <Navbar/>
            <div>
                SIGNOUT
            </div>
        </div>
                )
                }