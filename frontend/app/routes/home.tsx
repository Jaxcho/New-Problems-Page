import type {Route} from "./+types/home";
import {Welcome} from "../welcome/welcome";
import Navbar from "../components/Navbar";
import "./home.css"

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Home"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function Home() {
    return (
        <div>
            <Navbar></Navbar>

            <div className="row">

                <div className="resource">
                    Level 1: Advanced K-1st grade math. Basic Arithmetic (1-2 digits).
                </div>

                <div className="resource">
                    Level 2: Advanced 2nd-3rd grade math. Advanced Arithmetic (2-3 digits) + Basic Word Problems.
                </div>

                <div className="resource">
                    Level 3: Advanced 4th-5th grade math. Basic Pre-Algebra and Geometry + Word Problems + Fractions.
                </div>
            </div>

            <div className="row">
                <div className="resource">
                    Level 4: Advanced 6th-7th grade math. Pre-Algebra, Basic Geometry, Basic Number Theory, and Basic
                    Counting.
                </div>

                <div className="resource">
                    Level 5: Introduction to competition math. Early MATHCOUNTS Chapter, Easy AMC 8 problems. SAT Math
                    problems.
                </div>

                <div className="resource">
                    Level 6: AMC 8 early, AMC 10 easy problems. Medium-hard MATHCOUNTS Chapter. Hard SAT Math.
                </div>
            </div>
            <div className="row">
                <div className="resource">
                    Level 7: Medium-hard AMC 8, Medium-hard MATHCOUNTS States, AMC 10 early, AMC 12 easy
                </div>

                <div className="resource">
                    Level 8: AMC 8 hard, Hard MATHCOUNTS States, Medium-hard MATHCOUNTS Nationals, AMC 10 medium, AMC 12
                    early, AIME 1-3 &lt;- target subject rating for AMC 8 DHR
                </div>

                <div className="resource">
                    Level 9: MATHCOUNTS State and Nationals hard, AMC 10 medium-hard, AMC 12 medium, AIME #2-#6, HMMT
                    #1-#2 &lt;- target subject rating for AIME Qualification
                </div>
            </div>
            <div className="row">
                <div className="resource">
                    Level 10: AMC 10 hard, AMC 12 medium-hard, AIME #5-#10, HMMT #2-#5 &lt;- target subject rating for
                    AMC 10 DHR
                </div>

                <div className="resource">
                    Level 11: AMC 12 hard, AIME #8-#13, HMMT #4-#8, USAJMO #1 &lt;- target subject rating for AMC 12 DHR
                </div>

                <div className="resource">
                    Level 12: AIME 13-15, HMMT #7-#10, USAMO/IMO #1 Easy end &lt;- target subject rating for USAJMO
                    Qualification
                </div>
            </div>
            <div className="row">
                <div className="resource">
                    Level 13: USAMO/IMO #1 to easy end of USAMO/IMO #2 &lt;- target subject rating for USAMO
                    Qualification
                </div>

                <div className="resource">
                    Level 14: USAMO/IMO #2: Hardest problems in most national math olympiads
                </div>

                <div className="resource">
                    Level 15: USAMO/IMO #3. There should be &lt;1000 people worldwide capable of solving these problems
                    under the time constraints
                </div>
            </div>
        </div>
    );
}
