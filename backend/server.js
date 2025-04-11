
const express = require('express');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5001;


app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.send(`Database time: ${result.rows[0].now}`);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).send('Error connecting to the database');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
