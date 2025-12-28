const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNumber: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  batch: { type: String, trim: true },     // e.g., 2020
  department: { type: String, trim: true },
  company: { type: String, trim: true },
  designation: { type: String, trim: true },
  linkedin: { type: String, trim: true },
  notes: { type: String },
  role: { type: String, enum: ['student', 'admin'], default: 'student' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Alumni', alumniSchema);
