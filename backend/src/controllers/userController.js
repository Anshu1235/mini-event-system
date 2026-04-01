const db = require("../config/db");

exports.getUserBookings = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT b.*, e.title, e.date
       FROM bookings b
       JOIN events e ON b.event_id = e.id
       WHERE b.user_id = ?`,
      [req.params.id]
    );

    res.json(rows);
  } catch (err) {
    next(err);
  }
};