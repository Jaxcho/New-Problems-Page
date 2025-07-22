import {useState, useEffect} from 'react';
import type {Route} from "./+types/home";
import Navbar from "../components/Navbar";
import axios from "axios";
import {useAuth} from '~/hooks/useAuth';
import Latex from 'react-latex-next';
import "katex/dist/katex.min.css";
// import MathJaxImport from 'better-react-mathjax/esm';
// const { MathJax } = MathJaxImport;


export default function Problems() {
    const api_url = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
    const [problems, setProblems] = useState<any>();
    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`${api_url}/problems/browse`);
            console.info(data);
            setProblems(data);
        })();
    }, [problems !== null]);
    const {access_token} = useAuth();
    const [problem, setProblem] = useState('')
    const [level, setLevel] = useState('')
    const [topic, setTopic] = useState('')

    return (
        <div>
        <Navbar/>
        <div>

        {
            problems?.length > 0 ? (
                problems.map((problem: any) => (
                        <div id={problem.id} key={problem.id} className="problem">
                            <div className="row">
                            <span style={{fontSize: "20px"}}>
                                {problem.topic}
                            </span><span style={{fontSize: "20px"}}>
                                {problem.level}
                            </span>
                                {/*<<MathJax>*/}
                                <Latex>


                                {/*<p style={{fontSize: "20px"}}>*/}
                                    {problem.problem}

                                {/*</p>*/}
                                </Latex>
                                {/*</MathJax>*/}

                            </div>
                        </div>
                    )
                )
            ) : (
                <></>
            )

        }
    </div>
        </div>
)
}
/*
TODO fix formatting

 */