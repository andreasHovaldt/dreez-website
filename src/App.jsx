import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./styles/App.css";

// Components


// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SpeedTest from "./pages/SpeedTest";


function App() {

    return(
        <>
            <AuthProvider>
                <Router>
                    <main>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/SpeedTest" element={<SpeedTest/>}/>
                        </Routes>
                    </main>
                </Router>
            </AuthProvider>
        </>
    );
}

export default App