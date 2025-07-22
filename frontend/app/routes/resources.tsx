import {useState, useEffect} from 'react';
import type {Route} from "./+types/home";
import Navbar from "../components/Navbar";
import "./resources.css";
import axios from "axios";
import {useAuth} from '~/hooks/useAuth';


export default function Resources() {
    const api_url = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
    const [resources, setResources] = useState<any>();
    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`${api_url}/resources`, { headers: { "x-access-token": access_token }});
            setResources(data);
        })();
    }, [resources !== null]);
    const {access_token} = useAuth();
    const [link, setLink] = useState('')
    const [level, setLevel] = useState('')
    const [topic, setTopic] = useState('')

    async function submit() {
        const {data} = await axios.post(`${api_url}/resources`, {
            "access-token": access_token,
            "Link": link,
            "Level": level,
            "Topic": topic
        })
        if (data) {
            location.reload();
        }
    }

    return (
        <div>
            <Navbar/>
            <div>

                <label htmlFor="Link">Link</label>
                <input name="Link" value={link} onChange={(e) => setLink(e.target.value)}/>

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
            {
                resources?.length > 0 ? (
                    resources.map((resource: any) => (
                        <div id={resource.id} className="resource">
                            <div className="row">
                            <span style={{fontSize: "20px"}}>
                                {resource.topic}
                            </span><span style={{fontSize: "20px"}}>
                                {resource.level}
                            </span>
                            <a style={{fontSize: "20px"}} href={`http://${resource.link}`} target="_blank">
                                {resource.link}
                            </a>
                            </div>
                        </div>
                        )
                    )
                ) : (
                    <></>
                )
            }
        </div>
    )
}

// TODO sort and filter later