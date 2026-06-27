import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import GreyBox from "../components/GreyBox";
import GreyBoxTools from "../components/GreyBoxTools";
import GreyBoxRepos from "../components/GreyBoxRepos";

import headshot from "../assets/CV_picture_scaled.png";
import cvIcon from "../assets/cv_icon.png";

import "../styles/Home.css";

function Home() {
  useEffect(() => {
    document.title = "Andreas Højrup";
  }, []);

  return (
    <>
      <GreyBox className="home-hero">
        <div className="home-hero-layout">
          <div className="home-hero-image-wrap">
            <Link to="/about">
              <img
                src={headshot}
                alt="Image of Andreas Hovaldt Højrup"
                className="home-hero-image"
              />
            </Link>
          </div>

          <div className="home-hero-copy">
            <h1 className="blue-color">Welcome to my website!</h1>
            <p className="blue-color home-hero-intro">
              My name is Andreas Hovaldt Højrup and I recently graduated from Aalborg University.
              I completed my Bachelor's in Robotics in the summer of 2024, 
              and finished my Master's in Computer Engineering, specifically specializing in AI, Vision and Sound, in the summer of 2026.
            </p>
          </div>

          <div className="true-center home-hero-location">
            <div className="imageflex">
              <i className="fa-solid fa-location-dot icon-lg"></i>
              <p className="imageflexcontent">
                Aalborg, Denmark
              </p>
            </div>
          </div>

          <div className="socials home-hero-socials">
            <Link to="/cv" className="icon-btn" aria-label="CV">
              <img src={cvIcon} alt="CV" className="cv-icon" />
            </Link>

            <a href="https://github.com/andreasHovaldt" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>

            <a href="https://linkedin.com/in/andreas-hovaldt" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin"></i>
            </a>

            <a href="mailto:andreas.hovaldt@gmail.com" className="icon-btn" aria-label="Email">
              <i className="fa-regular fa-envelope"></i>
            </a>
          </div>
        </div>
      </GreyBox>

      <Link to="/projects">
        <GreyBox className="projects projects-cta">
          <div className="projects-cta-title">
            <i className="fa-solid fa-graduation-cap icon-lg"></i>
            <h2>Explore My University Projects!</h2>
          </div>
          <div>
            <h4>
              Discover my project experiences during my time at Aalborg University, spanning
              both my Bachelor's and Master's.
            </h4>
          </div>
          <div className="projects-cta-tail">
            <h4>Click To Learn More!</h4>
            <i className="fa-solid fa-arrow-right icon-md"></i>
          </div>
        </GreyBox>
      </Link>

      <div>
        <h1 className="home-section-title">Mini Projects</h1>
        <GreyBoxTools maxItems={3} />
      </div>
      <div>
        <Link to="/miniprojects" className="icon-link">
          <p>See All Mini Projects</p>
          <i className="fa-solid fa-arrow-right icon-md"></i>
        </Link>
      </div>

      <div>
        <h1 className="home-section-title">My GitHub Repositories</h1>
        <GreyBoxRepos mobileMaxItems={4} />
      </div>
      <div>
        <Link to="/repositories" className="icon-link">
          <p>See All Repositories</p>
          <i className="fa-solid fa-arrow-right icon-md"></i>
        </Link>
      </div>

      <div className="true-center">
        <Footer />
      </div>
    </>
  );
}

export default Home;
