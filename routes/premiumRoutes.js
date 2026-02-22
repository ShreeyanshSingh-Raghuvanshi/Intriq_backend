const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Import Controllers
const { 
    getFlashcards, 
    getGapAnalysis, 
    getCareerGuide 
} = require('../controllers/premiumController');

// Define Routes
// NOTE: We rely on verifyToken to ensure req.user is populated.
router.post('/flashcards', verifyToken, getFlashcards);
router.post('/gap-analysis', verifyToken, getGapAnalysis);
router.post('/career-guide', verifyToken, getCareerGuide);

module.exports = router;
