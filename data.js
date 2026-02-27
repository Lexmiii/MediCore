// ── Shared Mock Data (localStorage-backed) ────────────────────────
// This file acts as a frontend data layer.
// When you connect a real backend, replace these functions with fetch() calls.

const DEFAULT_DOCTORS = [
  { id: 1, name: 'Dr. Aisha Nair',    specialty: 'Cardiology',      email: 'aisha@clinic.com',   phone: '9876543210', available: 1 },
  { id: 2, name: 'Dr. Rajan Mehta',   specialty: 'Neurology',       email: 'rajan@clinic.com',   phone: '9876543211', available: 1 },
  { id: 3, name: 'Dr. Priya Suresh',  specialty: 'Orthopedics',     email: 'priya@clinic.com',   phone: '9876543212', available: 1 },
  { id: 4, name: 'Dr. Samuel Joy',    specialty: 'Pediatrics',      email: 'samuel@clinic.com',  phone: '9876543213', available: 0 },
  { id: 5, name: 'Dr. Meera Pillai',  specialty: 'Dermatology',     email: 'meera@clinic.com',   phone: '9876543214', available: 1 },
  { id: 6, name: 'Dr. Thomas Kurian', specialty: 'General Medicine', email: 'thomas@clinic.com', phone: '9876543215', available: 1 },
];

const DEFAULT_PATIENTS = [
  { id: 1, name: 'Arjun Kumar',  email: 'arjun@mail.com',  phone: '9000000001', dob: '1990-05-12', blood_group: 'O+', address: 'Kochi, Kerala',   password: 'pass123' },
  { id: 2, name: 'Sneha Pillai', email: 'sneha@mail.com',  phone: '9000000002', dob: '1995-08-23', blood_group: 'A+', address: 'Thrissur, Kerala', password: 'pass123' },
  { id: 3, name: 'Rahul Das',    email: 'rahul@mail.com',  phone: '9000000003', dob: '1988-03-17', blood_group: 'B+', address: 'Kozhikode, Kerala', password: 'pass123' },
];

const DEFAULT_APPOINTMENTS = [
  { id: 1, patientId: 1, doctorId: 1, date: '2026-03-05', time: '10:00', reason: 'Chest pain checkup',      status: 'Confirmed' },
  { id: 2, patientId: 2, doctorId: 2, date: '2026-03-06', time: '11:30', reason: 'Migraine consultation',   status: 'Pending'   },
  { id: 3, patientId: 3, doctorId: 3, date: '2026-03-07', time: '09:30', reason: 'Knee pain',               status: 'Pending'   },
  { id: 4, patientId: 1, doctorId: 5, date: '2026-03-10', time: '14:00', reason: 'Skin rash',               status: 'Confirmed' },
  { id: 5, patientId: 2, doctorId: 6, date: '2026-02-20', time: '15:30', reason: 'Annual checkup',          status: 'Completed' },
];

// ── Getters ───────────────────────────────────────────────────────

function getDoctors() {
  const stored = localStorage.getItem('mc_doctors');
  return stored ? JSON.parse(stored) : DEFAULT_DOCTORS;
}

function getPatients() {
  const stored = localStorage.getItem('mc_patients');
  const base = stored ? JSON.parse(stored) : DEFAULT_PATIENTS;
  return base;
}

function getAppointments() {
  const stored = localStorage.getItem('mc_appointments');
  return stored ? JSON.parse(stored) : DEFAULT_APPOINTMENTS;
}

// ── Setters ───────────────────────────────────────────────────────

function saveDoctors(data)      { localStorage.setItem('mc_doctors',      JSON.stringify(data)); }
function savePatients(data)     { localStorage.setItem('mc_patients',     JSON.stringify(data)); }
function saveAppointments(data) { localStorage.setItem('mc_appointments', JSON.stringify(data)); }

// ── Reset (dev utility) ───────────────────────────────────────────
// Call resetData() in browser console to restore defaults
function resetData() {
  localStorage.removeItem('mc_doctors');
  localStorage.removeItem('mc_patients');
  localStorage.removeItem('mc_appointments');
  localStorage.removeItem('patients');
  location.reload();
}
