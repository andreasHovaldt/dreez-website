import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

import "../styles/Header.css";

import logo from '../assets/chill_guy.png';

function Header() {
  const { isLoggedIn, login, logout } = useAuth(); // State for login status
  const [showLogin, setShowLogin] = useState(false); // State to show/hide login form
  
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent page refresh on form submit
    login()                 // Call the global login function
    setShowLogin(false);    // Hide the login form
  };

  return (
    <header className='Header'>
        {/* Logo image */}
        <img src={logo} alt="Site logo" className='Header-img'/>

        {/* Navbar */}
        <nav className='Navbar'>
          {/* Links (They inherit the style of <a/> */}
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {/*<a href="https://rocketleague.tracker.network/rocket-league/profile/steam/76561198072504070/overview">Services</a>*/}
          <Link to="/contact">Contact</Link>

          {/* Only show the link if the user is logged in */}
          {isLoggedIn && <Link to="/SpeedTest">Speed Test</Link>}
        </nav>

        {/* Login Section */}
        <div className="Login">
                {isLoggedIn ? (
                    <>
                        <span>Welcome, User!</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setShowLogin(!showLogin)}>Login</button>
                        {showLogin && (
                            <div className="Overlay">
                                <form onSubmit={handleLogin} className="LoginForm">
                                    <input type="text" placeholder="Username" required />
                                    <input type="password" placeholder="Password" required />
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        )}
                    </>
                )}
            </div>

    </header>
  );
}

export default Header;