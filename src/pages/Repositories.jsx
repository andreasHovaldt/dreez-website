import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";

import mountain_pic from '../assets/mountain_pic.jpeg';

import "../styles/Repositories.css"


function Repositories() {
    return (
        <>
            <div className="true-center blue-color">
                <h1>Welcome to the Repositories page!</h1>
            </div>

            <div className="true-center blue-color">
                <h2 className="blue-color">...work in progress...</h2>
            </div>

            <Link to="/" className="true-center">
                <button>Go back to Home</button>
            </Link>

            {/* Footer */}
            <div className="true-center">
            <Footer/>
            </div>
      </>
    );
  }
  
  export default Repositories;