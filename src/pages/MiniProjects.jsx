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
                <h1 className="true-center" style={{marginTop: "40pt", marginBottom: "20pt", fontSize: "50pt"}}>My Mini Projects</h1>
                <p className="true-center" style={{marginBottom: "30pt", color: "#9CA3AF", fontStyle: "italic"}}>
                    A collection of small tools, calculators, and games.
                </p>
                <GreyBoxTools slice={false}/>
            </div>
            <div>
                <Link to="/" className="icon-link">
                    <i className="fa-solid fa-arrow-left" style={{ fontSize: "15pt" }}></i>
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
