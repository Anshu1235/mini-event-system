import React, { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users/1/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map((b) => (
        <div key={b.id}>
          <p>Event: {b.event}</p>
          <p>Tickets: {b.tickets}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;