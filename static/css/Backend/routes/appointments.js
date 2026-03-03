const express = require("express");
const router = express.Router();
const db = require("../db");

// get appointments
router.get("/", (req, res) => {
  db.query("SELECT * FROM appointments", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// create appointment
router.post("/", (req, res) => {
  const { patientId, doctorId, date, time, reason, status } = req.body;

  db.query(
    "INSERT INTO appointments (patientId, doctorId, date, time, reason, status) VALUES (?, ?, ?, ?, ?, ?)",
    [patientId, doctorId, date, time, reason, status],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Appointment created");
    }
  );
});

module.exports = router;