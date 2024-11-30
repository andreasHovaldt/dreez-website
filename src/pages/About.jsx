import React from "react";
import { Link } from 'react-router-dom';
import "../styles/About.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import mountain_pic from '../assets/mountain_pic.jpeg';

function About() {
    return (
        <>
            <Header/>
            
            <div className="About-top-centered">
                <h1>About Me</h1>

                <img src={mountain_pic} alt="Mountain"/>
                <br/>
                
                <h2>Who am I?</h2>

                <p>
                    My name is Andreas Hovaldt Højrup and I'm a uni student at The department of Electronic Systems at Aalborg University.
                    I'm currently undergoing my masters in Computer Engineering, specialized in Ai, vision and sound. 
                    I am passionate about all kinds of tech and I'm always looking for new opportunities to learn and grow! Check out the <Link to="/contact">Contact</Link> page to get in touch with me.
                </p>
            </div>
            
            <Footer/>
        </>
    );
}

export default About;
