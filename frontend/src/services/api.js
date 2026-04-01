import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const getEvents = () => API.get("/events");

export const createEvent = (data) => API.post("/events", data);

export const bookTicket = (data) => API.post("/bookings", data);

export const getUserBookings = (id) => API.get(`/users/${id}/bookings`);

export default API;