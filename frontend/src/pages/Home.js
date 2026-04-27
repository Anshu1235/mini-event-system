import React, { useEffect, useState } from "react";
import { getEvents, bookTicket } from "../services/api";

const eventPhotos = [
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80",
];

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();

      setEvents(res.data);
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
      <section className="page-header">
        <div>
          <p className="eyebrow">Live events</p>
          <h1>Explore Events</h1>
          <p className="page-subtitle">
            Find upcoming sessions, track ticket availability, and book your spot.
          </p>
        </div>
        <div className="header-photo" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80"
            alt=""
          />
        </div>
        <div className="stat-card">
          <span>{events.length}</span>
          <p>Total Events</p>
        </div>
      </section>

      {events.length === 0 ? (
        <div className="empty-state">
          <h3>No events found</h3>
          <p>Create your first event to start taking bookings.</p>
        </div>
      ) : (
        <div className="event-grid">
          {events.map((e, index) => (
            <article key={e.id} className="card event-card">
              <img
                className="event-photo"
                src={e.image_url || eventPhotos[index % eventPhotos.length]}
                alt={e.title}
              />
              <div className="card-topline">
                <span className="pill">Upcoming</span>
                <span className="ticket-count">
                  {e.remaining_tickets} left
                </span>
              </div>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <div className="event-meta">
                <span>{new Date(e.date).toLocaleString()}</span>
              </div>
              <button onClick={() => handleBooking(e.id)}>Book Now</button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
