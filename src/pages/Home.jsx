import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/Home.css"

function Home() {
  return (
        <>
            <Header/>
            
            <div className="Home">
                <h1>Welcome to my website!</h1>
                <h6>A loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong text</h6>
            </div>

            <Footer/>
        </>
  );
}

export default Home;