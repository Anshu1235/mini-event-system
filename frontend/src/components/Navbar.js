import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/eventhub-logo.svg";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <img src={logo} alt="EventHub logo" className="brand-logo" />
        <span>EventHub</span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/bookings">My Bookings</NavLink>
        <NavLink to="/create">Create Event</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
