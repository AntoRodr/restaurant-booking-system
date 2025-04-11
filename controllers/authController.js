const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const registerUser = async (req, res) => {
  const { email, password, fullName } = req.body;

  const check = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (check.rows.length > 0) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await pool.query(
    "INSERT INTO users (email, password, full_name) VALUES ($1, $2, $3) RETURNING *",
    [email, hashed, fullName]
  );

  const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.status(201).json({ token, user: newUser.rows[0] });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (user.rows.length === 0) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, user: user.rows[0] });
};

module.exports = { registerUser, loginUser };
