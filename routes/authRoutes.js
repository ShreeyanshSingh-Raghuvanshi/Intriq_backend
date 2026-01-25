// const express = require('express');
// const passport = require('passport');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const authController = require('../controllers/authController');

// // Google OAuth - Client-side token validation
// router.post('/google', authController.googleAuth);

// // Initial Google Redirect (for server-side flow, if needed)
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Add these lines
// router.post('/save-context', authController.saveContext);
// router.get('/context', authController.getContext);

// // Callback
// router.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login', session: false }),
//   (req, res) => {
//     // Generate JWT for the frontend
//     const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
//     // Redirect to frontend with token
//     res.redirect(`${process.env.FRONTEND_ORIGIN}/dashboard?token=${token}`);
//   }
// );

// module.exports = router;

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