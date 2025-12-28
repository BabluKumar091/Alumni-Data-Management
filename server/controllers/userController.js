const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

    // Server-side: enforce college email domain
    const collegeEmailRegex = /^[^\s@]+@jietjodhpur\.ac\.in$/i;
    if (!collegeEmailRegex.test(String(email).toLowerCase().trim())) {
      return res.status(400).json({ success: false, message: 'Invalid email domain' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) return res.status(409).json({ message: 'User already exists with that email' });

    // Check if this is the first user (make them admin)
    const userCount = await User.countDocuments();
    const roleToAssign = userCount === 0 ? 'admin' : (role && ['admin', 'student'].includes(role.toLowerCase()) ? role.toLowerCase() : 'student');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email: email.toLowerCase(), password: hashed, role: roleToAssign });
    const token = generateToken(user._id);

    return res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (err) {
    console.error('Register error:', err.message || err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    return res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (err) {
    console.error('Login error:', err.message || err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  return res.json({ user: req.user });
};

// Admin: list users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    console.error('List users error:', err.message || err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Admin: update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!['admin', 'student'].includes(role)) return res.status(400).json({ message: 'Invalid role' });

    // Prevent changing own role to avoid accidental lockout
    if (req.user && String(req.user._id) === String(id)) {
      return res.status(400).json({ message: 'Cannot change your own role' });
    }

    const updated = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!updated) return res.status(404).json({ message: 'User not found' });
    return res.json(updated);
  } catch (err) {
    console.error('Update user role error:', err.message || err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Admin: delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Prevent deleting self
    if (req.user && String(req.user._id) === String(id)) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const deleted = await User.findByIdAndDelete(id).select('-password');
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Delete user error:', err.message || err);
    return res.status(500).json({ message: 'Server error' });
  }
};
