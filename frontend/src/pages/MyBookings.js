import React, { useEffect, useState } from "react";
import { getUserBookings } from "../services/api";

const bookingPhotos = [
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80",
];

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
      <section className="page-header compact">
        <div>
          <p className="eyebrow">Your tickets</p>
          <h1>My Bookings</h1>
          <p className="page-subtitle">
            Review your confirmed event reservations and booking codes.
          </p>
        </div>
      </section>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings found</h3>
          <p>Your booked events will appear here.</p>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map((b, index) => (
            <article key={b.id} className="card booking-card">
              <div className="booking-main">
                <img
                  className="booking-photo"
                  src={b.image_url || bookingPhotos[index % bookingPhotos.length]}
                  alt={b.title}
                />
                <div>
                  <span className="pill">Confirmed</span>
                  <h3>{b.title}</h3>
                  <p>{new Date(b.date).toLocaleString()}</p>
                </div>
              </div>
              <code>{b.booking_code}</code>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
