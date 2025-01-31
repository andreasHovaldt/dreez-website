import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import GreyBox from "../components/GreyBox";
import Footer from "../components/Footer";

import mountain_pic from '../assets/mountain_pic.jpeg';

import "../styles/About.css"
import "../styles/Home.css"


function About() {
    useEffect(() => {
          document.title = "About";
        }, []);
    
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
                        Hello! My name is Andreas, and I am currently pursuing a Master's degree in Computer Engineering, with a focus on AI, Vision, and Sound. 
                        I have a passion for learning new technical skills and concepts and a deep interest in modern technology. 
                        I am always seeking exciting ways and opportunities to apply my technical knowledge to solve problems and make meaningful contributions to innovative projects. 
                        Above all, I value the opportunity to learn and grow from the experiences and challenges that come my way.
                    </p>
                    <p style={{fontSize:"16pt"}}>
                        My native language is Danish, but I am also fluent in English. 
                        I have written all university projects in English, including my Bachelor's thesis. 
                        Additionally, I have collaborated with English-speaking supervisors and group members across several semesters.
                    </p>
                    <p style={{fontSize:"16pt", fontStyle:"italic", fontWeight:"bold"}}>
                    I am currently seeking an internship position for the fall semester of 2025. 
                    While I am particularly interested in opportunities within AI, Vision, and Sound, I am open to other roles that can help me grow and develop as a computer engineer.
                    </p>
                    <p style={{fontSize:"16pt"}}>
                        In my free time, I continue to explore my interest in tech and automation, staying up to date with the latest trends and technologies. 
                        I have worked on several personal projects, including a small 3D-printed self-driving car and a simple home-monitoring system using an Arduino or Raspberry Pi. 
                        Currently, I am experimenting with self-hosting multiple containerized services, such as this personal website, an automated media server, and game server hosting, all running natively on a home server powered by Proxmox VE. 
                        When I'm not working on projects, I enjoy spending time with my friends and family, going on hiking trips or runs, and, of course, playing video games. 😉
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