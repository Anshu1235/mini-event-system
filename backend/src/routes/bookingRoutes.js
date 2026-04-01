const express = require("express");
const router = express.Router();

const { createBooking } = require("../controllers/bookingController");

// BOOK ticket
router.post("/", createBooking);

module.exports = router;