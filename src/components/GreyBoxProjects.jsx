import React, { useRef, useState } from "react";
import "../styles/GreyBoxProjects.css";
import GreyBox from "./GreyBox";

function GreyBoxProjects({ title, description, abstract }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    return (
        <GreyBox 
            className="project-box" 
            style={{ maxWidth: "800px", cursor: "pointer" }} 
            onClick={() => setIsOpen(!isOpen)}>

            <div className="project-info">
                <span>
                    <div>
                        <h2>{title}</h2>
                        <h4>{description}</h4>
                    </div>
                    <i className={isOpen ? "fa-solid fa-angles-down" : "fa-solid fa-angles-right"} 
                        style={{ fontSize: "30pt", marginTop: "25pt", marginLeft: "-5pt" }}
                    ></i>
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
