import React from "react";
import "../styles/GreyBox.css";

function GreyBox({ children , style = {}, className = "" }) {

    return (
        <div className={`GreyBox ${className}`} style={style}>
            {children}
        </div>
    );
}

export default GreyBox;