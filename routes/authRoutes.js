const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/upload');
const { verifyToken } = require('../middleware/auth'); // Ensure you have auth middleware

// Google OAuth Routes
router.post('/google', authController.googleAuth);

// Onboarding Route (Protected + File Upload)
router.post('/save-context', 
  verifyToken, 
  upload.single('resume'), // 'resume' is the field name
  authController.saveContext
);

router.get('/context', verifyToken, authController.getContext);

module.exports = router;
