import type {Route} from "./+types/home";
import {Welcome} from "../welcome/welcome";
import Navbar from "../components/Navbar";
import {useAuth} from '~/hooks/useAuth';
import {useState} from 'react';
import {useNavigate} from 'react-router';

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Login"},
    ];
}

export default function Login() {
    const {login, isLoading} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async () => {
        const res = await login(email, password);
        console.info(res);
        if (res.success) {
            navigate("/");
        }
    }

    return (
        <div>

            <Navbar></Navbar>

            <label htmlFor="email">Email</label>
            <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={submit}>Login</button>
        </div>
    );
}
