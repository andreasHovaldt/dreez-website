import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

// External imports
import '@fortawesome/fontawesome-free/css/all.min.css';

// Components


// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Repositories from "./pages/Repositories";
import About from "./pages/About";


function App() {

    return(
        <>
            <Router>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/repositories" element={<Repositories/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                </main>
            </Router>
        </>
    );
}

export default App