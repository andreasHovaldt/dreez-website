import React, { useRef, useState } from "react";
import "../styles/GreyBoxProjects.css";
import GreyBox from "./GreyBox";

function GreyBoxProjects({ title, description, abstract, link }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    return (
        <GreyBox
            className="project-box"
            onClick={() => setIsOpen(!isOpen)}>

            <div className="project-info">
                <span>
                    <div className="project-title-block">
                        <h2>{title}</h2>
                        <h4>{description}</h4>
                    </div>
                    <div className="project-toggle">
                        <i
                            className={`project-toggle-icon fa-solid fa-fw ${isOpen ? "fa-angles-down" : "fa-angles-right"}`}
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
                            >
                                <i className="fa-regular fa-newspaper project-paper-icon"></i>
                            </a>
                        )}
                    </div>
                </span>
                <div className={`hidden${isOpen ? " open" : ""}`}
                    ref={contentRef}
                    style={{
                        maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
                    }}>
                    <h2>Abstract:</h2>
                    <p className="project-abstract">{abstract}</p>
                </div>
            </div>
        </GreyBox>
    );
}

export default GreyBoxProjects;
