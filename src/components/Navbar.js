import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import About from "./About";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">Habit Tracker</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
        <li><Link to="/add-habit">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
