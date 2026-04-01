const db = require("../config/db");

// ✅ GET ALL EVENTS
exports.getEvents = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM events ORDER BY date ASC"
    );
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

// ✅ CREATE EVENT
exports.createEvent = async (req, res, next) => {
  try {
    let { title, description, date, capacity } = req.body;

    // 🔒 Validation
    if (!title || !date || !capacity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🔧 Convert capacity to number
    capacity = Number(capacity);

    if (isNaN(capacity) || capacity <= 0) {
      return res.status(400).json({ error: "Invalid capacity" });
    }

    // 🔧 Fix date format (important)
    const eventDate = new Date(date);

    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const [result] = await db.query(
      `INSERT INTO events 
      (title, description, date, total_capacity, remaining_tickets)
      VALUES (?, ?, ?, ?, ?)`,
      [title, description || "", eventDate, capacity, capacity]
    );

    res.status(201).json({
      message: "Event created successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Create Event Error:", err);
    next(err);
  }
};

// ✅ MARK ATTENDANCE
exports.markAttendance = async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const [booking] = await db.query(
      "SELECT * FROM bookings WHERE booking_code = ? AND event_id = ?",
      [code, req.params.id]
    );

    if (!booking.length) {
      return res.status(404).json({ error: "Invalid code" });
    }

    await db.query(
      "INSERT INTO attendance (booking_id) VALUES (?)",
      [booking[0].id]
    );

    res.status(200).json({
      message: "Entry recorded successfully",
      tickets: 1,
    });
  } catch (err) {
    next(err);
  }
};