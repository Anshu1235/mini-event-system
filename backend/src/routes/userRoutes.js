const express = require("express");
const router = express.Router();

const { getUserBookings } = require("../controllers/userController");

// GET user bookings
router.get("/:id/bookings", getUserBookings);

module.exports = router;