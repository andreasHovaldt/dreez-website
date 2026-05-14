import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import GreyBoxTools from "../components/GreyBoxTools";

import "../styles/Home.css"


function MiniProjects() {
    useEffect(() => {
        document.title = "Mini Projects";
    }, []);

    return (
        <>
            {/* All Mini Projects */}
            <div>
                <h1 className="true-center mini-projects-title">My Mini Projects</h1>
                <p className="true-center mini-projects-subtitle">
                    A collection of small tools, calculators, and games.
                </p>
                <GreyBoxTools slice={false}/>
            </div>
            <div>
                <Link to="/" className="icon-link">
                    <i className="fa-solid fa-arrow-left icon-md"></i>
                    <p>Go Back To Home</p>
                </Link>
            </div>

            {/* Footer */}
            <div className="true-center">
                <Footer/>
            </div>
        </>
    );
}

export default MiniProjects;
