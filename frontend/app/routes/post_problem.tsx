import {useState, useEffect} from 'react';
import type {Route} from "./+types/home";
import Navbar from "../components/Navbar";
import "./resources.css";
import axios from "axios";
import {useAuth} from '~/hooks/useAuth';
import { useNavigate} from "react-router";


export default function PostProblem() {
    const api_url = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

    const {access_token} = useAuth();
    const [problem, setProblem] = useState('');
    const [level, setLevel] = useState('')
    const [topic, setTopic] = useState('')
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate();

    async function submit() {
        const res = await axios.post(`${api_url}/problems/post`, {
            "access-token": access_token,
            "Answer":answer,
            "Problem": problem,
            "Level": level,
            "Topic": topic
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `${access_token}`
            }
        })
        if (res) {
            navigate("/problems");
        }
    }

    return (
        <div>
            <Navbar/>
            <div>
                <label htmlFor="Problem">Problem</label>
                <input name="Problem" value={problem} onChange={(e) => setProblem(e.target.value)}/>
                <label htmlFor="Answer">Answer</label>
                <input name="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                <label htmlFor="Level">Level (Minimum, 0=all)</label>
                <input name="Level" type='number' value={level} onChange={(e) => setLevel(e.target.value)}/>

                <select name="Topic" id="Topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
                    <option value="Algebra">Algebra</option>
                    <option value="Combinatorics">Combinatorics</option>
                    <option value="Geometry">Geometry</option>
                    <option value="Number Theory">Number Theory</option>

                    <option value="All">All</option>
                </select>
                <button onClick={() => submit()}>
                    SUBMIT
                </button>
            </div>
        </div>
            )

            }
