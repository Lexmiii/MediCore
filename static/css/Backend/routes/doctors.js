const express = require("express");
const router = express.Router();
const db = require("../db");

// get all doctors
router.get("/", (req, res) => {
  db.query("SELECT * FROM doctors", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// add doctor
router.post("/", (req, res) => {
  const { name, specialty } = req.body;

  db.query(
    "INSERT INTO doctors (name, specialty) VALUES (?, ?)",
    [name, specialty],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Doctor added");
    }
  );
});

module.exports = router;