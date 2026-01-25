import React from "react";
import { Link } from "react-router-dom";
import "../styles/GreyBoxTools.css";
import GreyBox from "./GreyBox";

import DinoIcon from "../assets/dino_game.png";
import SandIcon from "../assets/sand_sim.png";

// Define mini projects here
const miniProjects = [
    {
        id: 1,
        title: "Dino Game",
        description: "Play the well known Chrome Dino Game with a twist.",
        link: "https://pages.dreez.dk/",
        external: true, // Opens in new tab
        thumbnail: DinoIcon,
        icon: "fa-solid fa-gamepad"
    },
    {
        id: 2,
        title: "Sand Simulator",
        description: "Simulate SAND! A small project I made for getting familiar with some simple C#.",
        link: "https://github.com/andreasHovaldt/SandSimulator/releases/latest",
        external: true,
        thumbnail: SandIcon,
        icon: "fa-solid fa-gamepad"
    },
    {
        id: 3,
        title: "Retirement Calculator",
        description: "Simulate your portfolio growth and plan for retirement with this interactive calculator.",
        link: "/retirement",
        thumbnail: null, // Add thumbnail path when available, e.g., require('../assets/retirement-thumb.png')
        icon: "fa-solid fa-chart-line"
    },
    // {
    //     id: 42,
    //     title: "Project Name",
    //     description: "Project description here.",
    //     link: "/project-link",
    //     external: false,
    //     thumbnail: null,
    //     icon: "fa-solid fa-gamepad"
    // },
];

function GreyBoxTools({ slice = true, maxItems = 3 }) {
    // Slice the projects if needed (Used for featuring maxItems on the home page)
    const displayedProjects = slice ? miniProjects.slice(0, maxItems) : miniProjects;

    return (
        <div className="tools-container">
            {displayedProjects.map((project) => (
                <GreyBox key={project.id} className="tool-box">
                    {/* Thumbnail or Icon */}
                    <div className="tool-thumbnail">
                        {project.thumbnail ? (
                            <img src={project.thumbnail} alt={project.title} />
                        ) : (
                            <i className={project.icon || "fa-solid fa-wrench"}></i>
                        )}
                    </div>

                    {/* Content */}
                    <div className="tool-content">
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </div>

                    {/* Link button */}
                    <div className="tool-link">
                        {project.external ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        ) : (
                            <Link to={project.link}>
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </Link>
                        )}
                    </div>
                </GreyBox>
            ))}
        </div>
    );
}

export default GreyBoxTools;
