import "./Navbar.css";
import {useState} from "react";
import {useAuth} from "../hooks/useAuth";

function Navbar() {
    const {isAuthenticated} = useAuth();

    if (isAuthenticated) {
        return (
            <nav>
                <a href="/">Home</a>
                <a href="/resources"> Resources</a>
                <a href="/problems/post"> Post problem</a>
                <a href="/problems"> Problems</a>
                <div id="auth">
                    <details>
                        <summary> Profile</summary>
                        <ul>
                            <li>

                                <a href="/account">Account</a>

                            </li>
                            <li>
                                <a href='/settings'>
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a href="/signout">
                                    Signout
                                </a>
                            </li>
                        </ul>
                    </details>
                </div>
            </nav>
        )
    } else {
        return (
            <nav>
                <a href="/">Home</a>
                <a href="/resources"> Resources</a>
                <a href="/problems"> Problems</a>
                <div id="auth">
                    <a href="/login"> Login </a><a href="/auth/signup"> Signup </a>
                </div>
            </nav>
        )
    }
}

export default Navbar;