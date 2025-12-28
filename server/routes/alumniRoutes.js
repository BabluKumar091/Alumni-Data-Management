const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


router.post('/', authMiddleware, adminMiddleware, alumniController.createAlumni);
router.get('/', alumniController.getAlumniList);
router.get('/:id', alumniController.getAlumniById);
router.put('/:id', authMiddleware, adminMiddleware, alumniController.updateAlumni);
router.delete('/:id', authMiddleware, adminMiddleware, alumniController.deleteAlumni);

module.exports = router;
