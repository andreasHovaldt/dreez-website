import React from "react";

import "../styles/Contact.css"

import Header from "../components/Header";
import Footer from "../components/Footer";



function Contact() {
    return (
        <>
            <Header/>

            <div className="Contact-top-centered">
                <h1>Contact Me</h1>

                <p>Get in touch with me! I am always open for new opportunities and collaborations. You can reach me on LinkedIn, email or GitHub. I will do my best to get back to you as soon as possible.</p>
                    
                    <table align="center">
                        <tr>
                            <td align="left">LinkedIn:</td>
                            <td></td>
                            <td align="left"><a href="https://www.linkedin.com/in/andreas-hovaldt/">Andreas Hovaldt Højrup</a></td>
                        </tr>
                        <tr>
                            <td align="left">Email:</td>
                            <td></td>
                            <td><a href="mailto:andreas.hovaldt@gmail.com">andreas.hovaldt@gmail.com</a></td>
                        </tr>
                        <tr>
                            <td align="left">GitHub:</td>
                            <td></td>
                            <td align="left"><a href="https://github.com/andreasHovaldt">andreasHovaldt</a></td>
                        </tr>
                    </table>
            </div>
            <Footer/>
        </>
    );
}

export default Contact;