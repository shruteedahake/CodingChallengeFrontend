import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-nav">
        
          <>
          <div className="nav-item">
          <Link className="nav-link btn" to="/login">Login</Link>
          <Link className="nav-link btn" to="/signup">Signup</Link>
        </div>
          </>
        
        
      </div>
    </nav>
  );
};

export default Navbar;
