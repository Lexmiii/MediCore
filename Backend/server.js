require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// ─── DATABASE CONNECTION ───────────────────────────

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root123",
  database: process.env.DB_NAME || "medicore"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});


// ─── TEST ROUTE ────────────────────────────────────

app.get("/", (req, res) => {
  res.send("Medicore Backend Running 🚀");
});


// ─── PATIENT ROUTES ───────────────────────────────

app.get("/patients", (req, res) => {

  const sql = "SELECT * FROM patients";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Database error");
    } else {
      res.json(result);
    }

  });

});


app.post("/patients", (req, res) => {

  const { name, email, password } = req.body;

  const sql = `
    INSERT INTO patients (name,email,password)
    VALUES (?,?,?)
  `;

  db.query(sql, [name, email, password], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Insert failed");
    } else {
      res.send("✅ Patient added successfully");
    }

  });

});


// ─── DOCTOR ROUTES ─────────────────────────────────

app.get("/doctors", (req, res) => {

  const sql = "SELECT * FROM doctors";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Database error");
    } else {
      res.json(result);
    }

  });

});


// ─── APPOINTMENT ROUTES ───────────────────────────

app.get("/appointments", (req, res) => {

  const sql = "SELECT * FROM appointments";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send("Database error");
    } else {
      res.json(result);
    }

  });

});


// ─── SERVER START ─────────────────────────────────

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});