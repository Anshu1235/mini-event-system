// const express = require("express");
// const cors = require("cors");

// const eventRoutes = require("./routes/eventRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const userRoutes = require("./routes/userRoutes");
// const errorHandler = require("./middleware/errorHandler");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/events", eventRoutes);
// app.use("/bookings", bookingRoutes);
// app.use("/users", userRoutes);

// app.use(errorHandler);

// // ✅ ONLY THIS (VERY IMPORTANT)
// module.exports = app;


// const express = require("express");
// const cors = require("cors");

// // ✅ FIRST create app
// const app = express();

// // ✅ THEN use middleware
// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));

// app.use(express.json());

// // ✅ Routes
// const eventRoutes = require("./routes/eventRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const userRoutes = require("./routes/userRoutes");

// console.log("eventRoutes:", eventRoutes);
// console.log("bookingRoutes:", bookingRoutes);
// console.log("userRoutes:", userRoutes);

// app.use("/events", eventRoutes);
// app.use("/bookings", bookingRoutes);
// app.use("/users", userRoutes);

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.send("API Working ✅");
// });

// // ✅ Export
// module.exports = app;

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🧠 Temporary storage
let events = [];
let bookings = [];

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});


// ================= EVENTS =================

// ✅ GET EVENTS
app.get("/events", (req, res) => {
  res.json(events);
});

// ✅ CREATE EVENT
app.post("/events", (req, res) => {
  const { title, description, date, capacity } = req.body;

  if (!title || !description || !date || !capacity) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newEvent = {
    id: events.length + 1,
    title,
    description,
    date,
    total_capacity: capacity,
    remaining_tickets: capacity,
  };

  events.push(newEvent);

  res.status(201).json({
    message: "Event created successfully",
    event: newEvent,
  });
});


// ================= BOOKINGS =================

// ✅ BOOK TICKET
app.post("/bookings", (req, res) => {
  const { user_id, event_id } = req.body;

  const event = events.find((e) => e.id === event_id);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  if (event.remaining_tickets <= 0) {
    return res.status(400).json({ error: "No tickets available" });
  }

  const bookingCode =
    "BOOK-" + Math.random().toString(36).substring(2, 8);

  const newBooking = {
    id: bookings.length + 1,
    user_id,
    event_id,
    booking_code: bookingCode,
  };

  bookings.push(newBooking);

  // reduce ticket
  event.remaining_tickets -= 1;

  res.json({
    message: "Booking successful",
    code: bookingCode,
  });
});


// ================= USER BOOKINGS =================

// ✅ GET USER BOOKINGS
app.get("/users/:id/bookings", (req, res) => {
  const userId = Number(req.params.id);

  const userBookings = bookings
    .filter((b) => b.user_id === userId)
    .map((b) => {
      const event = events.find((e) => e.id === b.event_id);

      return {
        ...b,
        title: event?.title,
        date: event?.date,
      };
    });

  res.json(userBookings);
});


module.exports = app;