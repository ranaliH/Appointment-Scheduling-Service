const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 4000;

// Database connection details
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Middleware to parse JSON bodies
app.use(express.json());

// Test database connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Endpoint to get all appointments
app.get('/appointments', (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint to book a new appointment
app.post('/appointments', (req, res) => {
  const { patientId, doctorId, appointmentTime } = req.body;
  const query = 'INSERT INTO appointments (patientId, doctorId, appointmentTime) VALUES (?, ?, ?)';
  db.query(query, [patientId, doctorId, appointmentTime], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, patientId, doctorId, appointmentTime });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Appointment Scheduling Service is running on port ${port}`);
});
