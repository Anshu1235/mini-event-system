import React, { useEffect, useState } from "react";
import { getUserBookings } from "../services/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getUserBookings(1); // ⚠️ user_id = 1
      console.log("BOOKINGS:", res.data); // 🔥 DEBUG
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found ❌</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="card">
            <h3>{b.title}</h3>
            <p>{b.booking_code}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;