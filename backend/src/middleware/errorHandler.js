module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.code === "ECONNREFUSED") {
    return res.status(500).json({
      error: "Database connection failed. Please make sure MySQL is running and your .env database settings are correct.",
    });
  }

  res.status(500).json({ error: err.message });
};
