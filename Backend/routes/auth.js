const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// ───────── REGISTER ─────────
router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO patients (name,email,password) VALUES (?,?,?)",
      [name, email, hashedPassword],
      (err, result) => {

        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Database error" });
        }

        res.json({
          message: "User registered successfully"
        });

      }
    );

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

});


// ───────── LOGIN ─────────
router.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.query(
    "SELECT * FROM patients WHERE email = ?",
    [email],
    async (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login successful",
        token: token,
        id: user.id,
        name: user.name,
        role: "patient"
      });

    }
  );

});

module.exports = router;