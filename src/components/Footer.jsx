import React from "react";
import "../styles/Footer.css";

function Footer() {
    return(
        <footer className="Footer-text">
            <p>&copy; {new Date().getFullYear()} dreez.dk - Andreas Hovaldt Højrup - All rights reserved</p>
        </footer>
    );
}

export default Footer