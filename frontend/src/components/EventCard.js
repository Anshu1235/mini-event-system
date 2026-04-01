import React from "react";

function EventCard({ event, onBook }) {
  return (
    <div className="card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>📅 {new Date(event.date).toLocaleString()}</p>
      <p>🎟 {event.remaining_tickets} tickets left</p>

      <button onClick={() => onBook(event.id)}>
        Book Now 🚀
      </button>
    </div>
  );
}

export default EventCard;