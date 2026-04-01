const db = require("../config/db");
const generateCode = require("../utils/generateCode");

exports.createBooking = async (req, res, next) => {
  const { user_id, event_id } = req.body;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [event] = await conn.query(
      "SELECT * FROM events WHERE id = ? FOR UPDATE",
      [event_id]
    );

    if (!event.length) throw new Error("Event not found");
    if (event[0].remaining_tickets <= 0)
      throw new Error("No tickets available");

    const code = generateCode();

    await conn.query(
      "INSERT INTO bookings (user_id, event_id, booking_code) VALUES (?, ?, ?)",
      [user_id, event_id, code]
    );

    await conn.query(
      "UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = ?",
      [event_id]
    );

    await conn.commit();

    res.json({ message: "Booking successful", code });
  } catch (err) {
    await conn.rollback();
    res.status(400).json({ error: err.message });
  } finally {
    conn.release();
  }
};