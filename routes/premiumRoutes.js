// const express = require('express');
// const router = express.Router();
// const { verifyToken, checkPremium } = require('../middleware/auth');
// const { generateFlashcards, getGapAnalysis } = require('../controllers/premiumController');

// router.post('/flashcards', verifyToken, checkPremium, generateFlashcards);
// router.post('/gap-analysis', verifyToken, checkPremium, getGapAnalysis);

// module.exports = router;



const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
// Note: Ensure checkPremium middleware exists in auth.js, or remove it for testing
const { checkPremium } = require('../middleware/auth'); 

// IMPORT MUST MATCH CONTROLLER EXPORTS
const { 
    getFlashcards, 
    getGapAnalysis, 
    getCareerGuide 
} = require('../controllers/premiumController');

// Define Routes
router.post('/flashcards', verifyToken, getFlashcards); // Add checkPremium back when ready
router.post('/gap-analysis', verifyToken, getGapAnalysis);
router.post('/career-guide', verifyToken, getCareerGuide);

module.exports = router;