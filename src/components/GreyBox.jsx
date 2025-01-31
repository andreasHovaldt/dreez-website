import React from "react";
import "../styles/GreyBox.css";

function GreyBox({ children , style = {}, className = "" , onClick }) {

    return (
        <div className={`GreyBox ${className}`} style={style} onClick={onClick}>
            {children}
        </div>
    );
}

export default GreyBox;