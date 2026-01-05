import React, { useEffect } from "react";

function CV() {
    useEffect(() => {
        document.title = "CV - Andreas Højrup";
    }, []);

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh"
        }}>
            <iframe
                src="/CV_andreasHovaldtHojrup.pdf"
                title="CV"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none"
                }}
            />
        </div>
    );
}

export default CV;
