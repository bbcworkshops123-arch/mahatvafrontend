import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="neon-sweep"></div>
      <div className="nav-container">
           <img src="/logo.png" className="logo" alt="" srcset="" />

        <h2 className="nav-logo">
          <Link to="/">BALLARI BUSINESS COLLEGE</Link>
          <h6 className="ad"> Recognised by Govt of Karnataka, Affiliated to Vijayanagara Sri Krishnadevaraya University Ballari, Approved by AICTE New Delhi and Recognized under Sec.2(f) of UGC Act of 1956.</h6>

        </h2>
        
        <div className="nav-links">
          <Link to="/register">Register</Link>
          <Link to="/admin">Admin</Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
