import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import GreyBox from "../components/GreyBox";
import GreyBoxRepos from "../components/GreyBoxRepos";

import headshot from '../assets/CV_picture_scaled.png';

import "../styles/Home.css"
//import "../styles/Dropdown.css"

function Home() {
  useEffect(() => {
        document.title = "Andreas Højrup";
      }, []);
  
  return (
        <>
            <GreyBox style = {{marginTop:"40pt", paddingTop:"10pt"}}>
                <div>
                <table align="left">
                  <tbody>
                  {/* Image and text */}
                  <tr>
                    <td>
                      <Link to="/about">
                      <img src={headshot} alt="Image of Andreas Hovaldt Højrup" style={{maxWidth:"200pt", border:"5px solid #15bbe5", borderRadius:"50%"}}/>
                      </Link>
                    </td>
                    <td align="left" style={{paddingLeft:"20pt"}}>
                      <h1 className="blue-color">Welcome to my website!</h1>
                      <p className="blue-color" style={{fontSize:"16pt", fontStyle:"italic", }}>
                        My name is Andreas Hovaldt Højrup and I'm a student at Aalborg University.
                        I completed my Bachelor's in Robotics in the summer of 2024. 
                        Currently I'm pursuing a Master's in Computer Engineering, specifically specializing in AI, Vision and Sound.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    {/* Location pin*/}
                    <td>
                      <div className="true-center">
                        <div className="imageflex">
                          <i className="fa-solid fa-location-dot" style={{ fontSize: "20pt" }}></i>
                          <p className="imageflexcontent" style={{fontSize:"16pt", fontStyle:"italic", fontWeight:"lighter"}}>Aalborg, Denmark</p> 
                        </div>
                      </div>
                    </td>
                    
                    {/* Social media buttons*/}
                    <td align="center">
                      <div className="true-center">
                        <div className="buttonflex">
                          
                          <a href="https://github.com/andreasHovaldt" target="_blank" rel="noopener noreferrer" className="icon-btn">
                            <i className="fa-brands fa-github"></i>
                          </a>
                          
                          <a href="https://linkedin.com/in/andreas-hovaldt" target="_blank" rel="noopener noreferrer" className="icon-btn">
                            <i className="fa-brands fa-linkedin"></i>
                          </a>
                          
                          <a href="mailto:andreas.hovaldt@gmail.com" className="icon-btn">
                            <i className="fa-regular fa-envelope"></i>
                          </a>
                        
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  </tbody>
                </table>
                </div>

            </GreyBox>
            
            {/* Explore my projects */}
            <Link to="/projects">
              <GreyBox className="projects" style={{backgroundColor:"rgb(16, 126, 154)", border: "none"}}>
                <div style={{display: "flex", alignItems: "center", gap: "10pt"}}>
                  <i className="fa-solid fa-graduation-cap" style={{ fontSize: "20pt" }}></i>
                  <h2>Explore My University Projects!</h2> 
                </div>
                <div style={{display: "flex", marginTop: "-25pt"}}>
                  {/* <h4>Delve into my project experiences while studying at Aalborg University for both my Bachelor's and Master's.</h4> */}
                  <h4>Discover my project experiences during my time at Aalborg University, spanning both my Bachelor's and Master's.</h4>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "10pt", marginTop: "-15pt", color:"rgb(23, 202, 247)"}}>
                  <h4>Click to learn more</h4>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: "15pt" }}></i>
                </div>
              </GreyBox>
            </Link>


            {/* Technical skills dropdown menus*/}
            {/*
            <div className="dropdown-container">
              <div className="dropdown-box">
                Python
                <div className="dropdown-menu">
                  <p>Data Analysis</p>
                  <p>Web Development</p>
                  <p>Scripting</p>
                </div>
              </div>
            </div>
            */}



            {/* My top GitHub repositories */}
            <div>
              <h1 style={{marginTop: "40pt", marginBottom: "10pt"}}>My GitHub Repositories</h1>
              <GreyBoxRepos/>
            </div>
            <div>
              <Link to="/repositories" className="icon-link">
                  <p>See all repositories</p>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: "15pt" }}></i>
              </Link>
            </div>


            {/* Footer */}
            <div className="true-center">
              <Footer/>
            </div>
        </>
  );
}

export default Home;