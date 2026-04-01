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
      alert("✅ Event Created!");
    } catch (err) {
        console.log(err.response);
        alert(err.response?.data?.error || "Error creating event");
      }
  };

  return (
    <div className="container">
      <h2>➕ Create Event</h2>

      <div className="card">
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input 
          type="datetime-local" 
          name="date" 
          onChange={handleChange} 
        />
        <input name="capacity" placeholder="Capacity" onChange={handleChange} />

        <button onClick={handleSubmit}>Create Event 🚀</button>
      </div>
    </div>
  );
}

export default CreateEvent;