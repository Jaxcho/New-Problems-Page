import {useState, useEffect} from 'react';
import type {Route} from "./+types/home";
import Navbar from "../components/Navbar";
import axios from "axios";
import {useAuth} from '~/hooks/useAuth';

export default function AccountPage() {
    const api_url = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
    const [username, setUsername] = useState<string>();
    const {access_token, user_id} = useAuth();
    useEffect(() => {
        axios.get(`${api_url}/account`, { headers: {"x-access-token": access_token, "x-user-id": user_id } })
            .then((res) => res.data)
            .then((data) => {
                setUsername(data);
            });

    }, [username !== null && user_id !== null]);



    return (
        <div>
            <Navbar/>
            <div>
                <div>{username}</div>
            </div>
        </div>


    )
}
