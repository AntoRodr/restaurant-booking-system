const pool = require("../db");

const makeReservation = async (req, res) => {
  const { userId, date, time, tableNumber, guests } = req.body;
  const reservation = await pool.query(
    "INSERT INTO bookings (user_id, date, time, table_number, guests) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [userId, date, time, tableNumber, guests]
  );
  res.status(201).json(reservation.rows[0]);
};

const getAvailability = async (req, res) => {
  const { date, time } = req.query;
  const available = await pool.query(
    "SELECT * FROM tables WHERE id NOT IN (SELECT table_number FROM bookings WHERE date = $1 AND time = $2)",
    [date, time]
  );
  res.json(available.rows);
};

module.exports = { makeReservation, getAvailability };
