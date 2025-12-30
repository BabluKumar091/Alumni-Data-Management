const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student'], default: 'student' }
}, {
  timestamps: true
});

// Removed pre-save hook to avoid double hashing, as controller handles it

module.exports = mongoose.model('User', userSchema);
