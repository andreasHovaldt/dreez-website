import React, { useRef, useState } from "react";
import "../styles/GreyBoxProjects.css";
import GreyBox from "./GreyBox";

function GreyBoxProjects({ title, description, abstract, link }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    return (
        <GreyBox 
            className="project-box" 
            style={{ maxWidth: "800px", cursor: "pointer" }} 
            onClick={() => setIsOpen(!isOpen)}>

            <div className="project-info">
                <span>
                    <div style={{ flex: "1 1 auto", minWidth: 0 }}>
                        <h2>{title}</h2>
                        <h4>{description}</h4>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flex: "0 0 44px",
                            width: "44px",
                            marginTop: "25pt",
                            marginLeft: "-5pt",
                        }}
                    >
                        <i
                            className={isOpen ? "fa-solid fa-angles-down fa-fw" : "fa-solid fa-angles-right fa-fw"}
                            style={{ fontSize: "30pt" }}
                        ></i>
                        {link && (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label="Open Publication"
                                title="Open Publication"
                                className="paper-link"
                                style={{
                                    marginTop: "26px",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                <i className="fa-regular fa-newspaper" style={{ fontSize: "28pt" }}></i>
                            </a>
                        )}
                    </div>
                </span>
                <div className="hidden" 
                    ref={contentRef}
                    style={{
                        maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
                        transition: "max-height 0.5s ease-in-out",
                        marginLeft: "10px",
                        marginTop: "-10px",
                    }}>
                    <h2>Abstract:</h2>
                    <p style={{ marginTop: "-15pt" }}>{abstract}</p>
                </div>
            </div>
        </GreyBox>
    );
}

export default GreyBoxProjects;
