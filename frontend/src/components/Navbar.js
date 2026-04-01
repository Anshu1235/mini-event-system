import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2> EventHub</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/create">Create Event</Link>
      </div>
    </nav>
  );
}

export default Navbar;
