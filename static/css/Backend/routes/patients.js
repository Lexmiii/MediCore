const express = require("express");
const router = express.Router();
const db = require("../db");

// get patients
router.get("/", (req, res) => {
  db.query("SELECT * FROM patients", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

module.exports = router;