import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="neon-sweep"></div>
      <div className="nav-container">
        {/* LEFT SIDE — LINKS */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/register" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
          <Link to="/admin" onClick={() => setMenuOpen(false)}>
            Admin
          </Link>
        </div>

        {/* RIGHT SIDE — LOGO + TEXT */}
        <div className="right-section">
          <img src="/logo.png" className="logo" alt="BBC Logo" />
          <div className="nav-text">
            <h2 className="nav-logo">
              <Link to="/">BALLARI BUSINESS COLLEGE</Link>
            </h2>
            <p className="ad">
              Recognised by Govt of Karnataka, Affiliated to Vijayanagara Sri
              Krishnadevaraya University Ballari, Approved by AICTE New Delhi
              and Recognized under Sec.2(f) of UGC Act of 1956.
            </p>
          </div>
        </div>

        {/* Hamburger for mobile */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
