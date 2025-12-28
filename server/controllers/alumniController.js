const Alumni = require('../models/Alumni');
const mongoose = require('mongoose');

exports.createAlumni = async (req, res) => {
  try {
    const payload = req.body;

    // Basic validation
    const { name, email, rollNumber, batch, department, company, designation, phone, linkedin } = payload;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ message: 'Name is required' });
    }

    // Name should not be purely numeric
    if (/^\d+$/.test(name.trim())) {
      return res.status(400).json({ message: 'Name must contain letters' });
    }

    // If email provided, basic email format check
    if (email) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) return res.status(400).json({ message: 'Invalid email format' });
    }

    // Roll number if provided - allow alphanumeric and dashes only, max 20 characters
    if (rollNumber && !/^[a-zA-Z0-9\-]{1,20}$/.test(rollNumber)) {
      return res.status(400).json({ message: 'Roll number must be alphanumeric (max 20 characters, allowed: letters, numbers, hyphens)' });
    }

    // Batch (year) if provided - basic 4 digit check
    if (batch && !/^\d{4}$/.test(String(batch))) {
      return res.status(400).json({ message: 'Batch must be a 4-digit year' });
    }

    // Department, company, designation should not be purely numeric
    if (department && /^\d+$/.test(String(department).trim())) {
      return res.status(400).json({ message: 'Department must contain letters' });
    }
    if (company && /^\d+$/.test(String(company).trim())) {
      return res.status(400).json({ message: 'Company must contain letters' });
    }
    if (designation && /^\d+$/.test(String(designation).trim())) {
      return res.status(400).json({ message: 'Designation must contain letters' });
    }

    // Phone basic check - require exactly 10 digits
    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Phone must be exactly 10 digits' });
    }

    // LinkedIn basic URL check
    if (linkedin && !/^https?:\/\//i.test(linkedin)) {
      return res.status(400).json({ message: 'LinkedIn must be a valid URL (starting with http:// or https://)' });
    }

    const newAlumni = await Alumni.create(payload);
    return res.status(201).json(newAlumni);
  } catch (err) {
    console.error('Create alumni error:', err.message || err);
    return res.status(500).json({ message: 'Server error' });
  }
};
exports.getAlumniList = async (req, res) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;
    const pageNum = Math.max(parseInt(page, 10), 1);
    const perPage = Math.max(parseInt(limit, 10), 1);

    // Show student alumni OR records with no role field (legacy records)
    const filter = { $or: [{ role: 'student' }, { role: { $exists: false } }] };
    if (q) {
      const safe = q.toString();
      const regex = new RegExp(safe, 'i');
      filter.$and = [
        { $or: [{ role: 'student' }, { role: { $exists: false } }] },
        { $or: [
          { name: regex },
          { email: regex },
          { company: regex },
          { department: regex }
        ]}
      ];
    }

    const total = await Alumni.countDocuments(filter);
    const items = await Alumni.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * perPage)
      .limit(perPage);

    return res.json({
      total,
      page: pageNum,
      limit: perPage,
      items
    });
  } catch (err) {
    console.error('Get alumni list error:', err.message || err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getAlumniById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });

    const al = await Alumni.findById(id);
    if (!al) return res.status(404).json({ message: 'Alumni not found' });

    return res.json(al);
  } catch (err) {
    console.error('Get alumni by id error:', err.message || err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });

    const updated = await Alumni.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Alumni not found' });

    return res.json(updated);
  } catch (err) {
    console.error('Update alumni error:', err.message || err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid ID' });

    const deleted = await Alumni.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Alumni not found' });

    return res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete alumni error:', err.message || err);
    return res.status(500).json({ message: 'Server error' });
  }
};
