import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import About from "./About";

const handleReset = () => {
  if (window.confirm("Are you sure you want to reset everything?")) {
    window.location.reload();
  }
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">Habit Tracker</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        <li><Link to="/summary">Monthly Summary</Link></li>
        <li><Link to="/about">About</Link></li>

          <li><Link to="/About">About</Link></li>

        <li><Link to="/add-habit">Contact</Link></li>
        <li><button onClick={handleReset} style={{ marginLeft: "10px" }} className="reset-btn">
  Reset Page
</button>
</li>
      </ul>
    </nav>
  );
};

export default Navbar;
