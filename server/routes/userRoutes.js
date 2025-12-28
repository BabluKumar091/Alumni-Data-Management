const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);

// Admin user management
router.get('/', authMiddleware, adminMiddleware, userController.listUsers);
router.put('/:id/role', authMiddleware, adminMiddleware, userController.updateUserRole);
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
