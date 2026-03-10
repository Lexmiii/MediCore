require("dotenv").config();

console.log("ENV USER:", process.env.DB_USER);

const express = require("express");
const cors    = require("cors");
const path    = require("path");

const app = express();

// ─── MIDDLEWARE ───────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── STATIC FILES ─────────────────────────────────
app.use("/static", express.static(path.join(__dirname, "../static")));
app.use("/templates", express.static(path.join(__dirname, "../templates")));  // add this

// ─── API ROUTES ───────────────────────────────────
const authRoutes        = require("./routes/auth");
const doctorRoutes      = require("./routes/doctors");
const patientRoutes     = require("./routes/patients");
const appointmentRoutes = require("./routes/appointments");

app.use("/api/auth",         authRoutes);
app.use("/api/doctors",      doctorRoutes);
app.use("/api/patients",     patientRoutes);
app.use("/api/appointments", appointmentRoutes);

// ─── HTML PAGES ───────────────────────────────────
const T = path.join(__dirname, "../templates");

app.get("/",         (req, res) => res.redirect("/login"));
app.get("/login",    (req, res) => res.sendFile(path.join(T, "login")));
app.get("/register", (req, res) => res.sendFile(path.join(T, "register")));
app.get("/admin",    (req, res) => res.sendFile(path.join(T, "admin-dashboard")));
app.get("/doctor",   (req, res) => res.sendFile(path.join(T, "doctor-dashboard")));
app.get("/patient",  (req, res) => res.sendFile(path.join(T, "patient-dashboard")));

// ─── TEST ROUTE ───────────────────────────────────
app.get("/test", (req, res) => res.send("Medicore Backend Running 🚀"));

// ─── SERVER START ─────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});