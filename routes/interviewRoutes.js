// - Aligned routes with frontend API calls
const express = require('express');
const router = express.Router();
const { 
    getNextQuestion, 
    getFirstQuestion, 
    submitAnswer, 
    getMCQ, 
    evaluateVoiceAnswer 
} = require('../controllers/interviewController');

// Updated paths to match frontend services/api.js
router.post('/next-question', getNextQuestion); // Was /question
router.post('/first-question', getFirstQuestion); // Was /question
router.post('/submit-answer', submitAnswer);    // Was /answer
router.post('/mcq', getMCQ);
router.post('/voice-eval', evaluateVoiceAnswer);

module.exports = router;
