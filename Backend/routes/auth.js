const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO patients (name,email,password) VALUES (?,?,?)",
    [name,email,hashedPassword],
    (err,result) => {

      if(err){
        return res.status(500).send(err);
      }

      res.send("User registered");
    }
  );

});

router.post("/login", (req,res)=>{

  const { email, password } = req.body;

  db.query(
    "SELECT * FROM patients WHERE email=?",
    [email],
    async (err,result)=>{

      if(err) return res.status(500).send(err);

      if(result.length==0)
        return res.status(404).send("User not found");

      const user = result[0];

      const valid = await bcrypt.compare(password,user.password);

      if(!valid)
        return res.status(401).send("Invalid password");

      const token = jwt.sign(
        {id:user.id},
        process.env.JWT_SECRET
      );

      res.json({token});

    }
  );

});

module.exports = router;