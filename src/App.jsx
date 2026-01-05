import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

// External imports
import '@fortawesome/fontawesome-free/css/all.min.css';

// Components


// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import MiniProjects from "./pages/MiniProjects";
import Repositories from "./pages/Repositories";
import About from "./pages/About";
import CV from "./pages/CV";
import PortfolioSimulator from "./pages/PortfolioSimulator";


function App() {

    return(
        <>
            <Router>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/miniprojects" element={<MiniProjects/>}/>
                        <Route path="/repositories" element={<Repositories/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/cv" element={<CV/>}/>
                        <Route path="/retirement" element={<PortfolioSimulator/>}/>
                    </Routes>
                </main>
            </Router>
        </>
    );
}

export default App