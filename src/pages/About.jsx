import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import GreyBox from "../components/GreyBox";
import Footer from "../components/Footer";

import mountain_pic from '../assets/mountain_pic.jpeg';

import "../styles/About.css"
import "../styles/Home.css"


function About() {
    return (
        <>
            <div className="true-center blue-color">
                <h1>About Me 😎</h1>
            </div>

            <div className="true-center">
                <img src={mountain_pic} className="responsive-image" alt="Mountain" style={{maxWidth:"715pt", border:"3px solid #35465E", borderRadius:"10pt"}}/>
            </div>
            
            <GreyBox style = {{marginTop:"40pt", paddingTop:"0pt"}}>
                <div className="true-center" style={{flexDirection:"column"}}>
                    
                    <p style={{fontSize:"16pt"}}>
                        Hello! My name is Andreas, currently I am persuing a Master's degree in Computer Engineering, with a focus on AI, Vision, and Sound.
                        I love learning new technical skills and concepts and have a deep interest in modern technology.
                        I am always seeking new and exciting ways and opportunities to apply my technical knowledge and skills to solve problems and make meaningful contributions to innovative projects. 
                        Most important of all, I cherish the opportunity to learn and grow from the experiences and challenges that come my way.
                    </p>
                    <p style={{fontSize:"16pt"}}>
                        My native language is Danish, but I am also fluent in English as well, having written multiple projects in English including my Bachelor's thesis.
                        Additionally, I have worked with both English speaking supervisors and group members for multiple semesters.
                    </p>
                    <p style={{fontSize:"16pt", fontStyle:"italic", fontWeight:"bold"}}>
                        I am currently looking for an internship position for the fall semester of 2025. 
                        I am open to opportunities in the field of AI, Vision, and Sound, but I am also open to other opportunities that can help me grow and develop as a computer engineer.
                    </p>
                    <p style={{fontSize:"16pt"}}>
                        In my free time I still have an interest in tech and automation, and I like to keep up with the latest trends and technologies.
                        I have also worked on a few personal projects, including a small 3D printed self-driving car and a simple home-monitoring system utilizing either an Arduino or Raspberry PI.
                        Right now I am exploring self-hosting multiple containerized services, like this personal website, an automated media-server, and game server hosting, all running natively on home server running Proxmox VE.
                        When I am not working on any projects, I like to spend my time with my friends and family, I love to go for hiking trips or going for a run, and of course I enjoy playing video games 😉.
                    </p>
                </div>
            </GreyBox>


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
  
  export default About;