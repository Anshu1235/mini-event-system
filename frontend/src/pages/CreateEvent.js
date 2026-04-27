import React, { useState } from "react";
import { createEvent } from "../services/api";

function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createEvent({
        ...form,
        capacity: Number(form.capacity),
      });
      alert("Event created successfully");
    } catch (err) {
      console.log(err.response);
      alert(err.response?.data?.error || "Error creating event");
    }
  };

  return (
    <div className="container">
      <section className="page-header compact">
        <div>
          <p className="eyebrow">Organizer tools</p>
          <h1>Create Event</h1>
          <p className="page-subtitle">
            Add the details guests need before opening bookings.
          </p>
        </div>
      </section>

      <div className="card form-card">
        <label>
          <span>Title</span>
          <input name="title" placeholder="Product meetup" onChange={handleChange} />
        </label>
        <label>
          <span>Description</span>
          <input
            name="description"
            placeholder="A short summary for attendees"
            onChange={handleChange}
          />
        </label>
        <div className="form-row">
          <label>
            <span>Date and time</span>
            <input
              type="datetime-local"
              name="date"
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Capacity</span>
            <input
              name="capacity"
              type="number"
              min="1"
              placeholder="50"
              onChange={handleChange}
            />
          </label>
        </div>

        <button onClick={handleSubmit}>Create Event</button>
      </div>
    </div>
  );
}

export default CreateEvent;
