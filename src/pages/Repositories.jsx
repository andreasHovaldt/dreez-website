import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import GreyBoxRepos from "../components/GreyBoxRepos";

import "../styles/Repositories.css"
import "../styles/Home.css"


function Repositories() {
  useEffect(() => {
        document.title = "About";
      }, []);
  
  return (
        <>
            {/* All my GitHub repositories */}
            <div>
              <h1 className="true-center" style={{marginTop: "40pt", marginBottom: "20pt", fontSize: "50pt"}}>All My GitHub Repositories</h1>
              <GreyBoxRepos slice={false}/>
            </div>
            <div>
              <Link to="/" className="icon-link">
                <i className="fa-solid fa-arrow-left" style={{ fontSize: "15pt" }}></i>
                <p>Go back to Home</p>
              </Link>
            </div>


            {/* Footer */}
            <div className="true-center">
            <Footer/>
            </div>
      </>
    );
  }
  
  export default Repositories;