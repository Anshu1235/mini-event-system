import React, { useEffect, useState } from "react";
import { getEvents, bookTicket } from "../services/api";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();

      console.log("API RESPONSE:", res);       // 🔥 DEBUG
      console.log("EVENT DATA:", res.data);    // 🔥 DEBUG

      setEvents(res.data); // ✅ IMPORTANT
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  const handleBooking = async (id) => {
    try {
      const res = await bookTicket({
        user_id: 1,
        event_id: id,
      });

      alert("Booked! Code: " + res.data.code);
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div className="container">
      <h2>🎉 Explore Events</h2>

      {/* 🔥 DEBUG */}
      <p>Total Events: {events.length}</p>

      {events.length === 0 ? (
        <p>No events found ❌</p>
      ) : (
        events.map((e) => (
          <div key={e.id} className="card">
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <button onClick={() => handleBooking(e.id)}>
              Book Now 🚀
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;