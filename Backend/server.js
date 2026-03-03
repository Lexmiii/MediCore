const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// import routes
const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctors");
const patientRoutes = require("./routes/patients");
const appointmentRoutes = require("./routes/appointments");

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("MediCore Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});