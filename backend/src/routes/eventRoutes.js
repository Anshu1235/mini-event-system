const express = require("express");
const router = express.Router();

const {
  getEvents,
  createEvent,
  markAttendance,
} = require("../controllers/eventController");

// GET all events
router.get("/", getEvents);

// CREATE event
router.post("/", createEvent);

// MARK attendance
router.post("/:id/attendance", markAttendance);

module.exports = router;