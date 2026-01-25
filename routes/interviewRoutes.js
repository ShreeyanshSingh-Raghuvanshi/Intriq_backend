// const express = require('express');
// const router = express.Router();
// const { getQuestions, generateAnalysis } = require('../controllers/interviewController');
// const { verifyToken } = require('../middleware/auth');

// router.post('/questions', verifyToken, getQuestions);
// router.post('/analyze', verifyToken, generateAnalysis);

// module.exports = router;






// const express = require('express');
// const router = express.Router();
// const interviewController = require('../controllers/interviewController');

// router.post('/next-question', interviewController.getNextQuestion);
// router.post('/submit-answer', interviewController.submitAnswer);
// // router.post('/generate-questions', interviewController.getQuestions); // Old
// // router.post('/submit', interviewController.submitInterview); // Old

// module.exports = router;







// const express = require('express');
// const router = express.Router();
// const { getNextQuestion, submitAnswer, getMCQ } = require('../controllers/interviewController');
// const { protect } = require('../middleware/auth');

// router.post('/question', protect, getNextQuestion);
// router.post('/answer', protect, submitAnswer);
// router.post('/mcq', protect, getMCQ); // New Route

// module.exports = router;








// const express = require('express');
// const router = express.Router();
// // Import all functions from the controller
// const { 
//     getNextQuestion, 
//     submitAnswer, 
//     getMCQ, 
//     evaluateVoiceAnswer 
// } = require('../controllers/interviewController');

// // Define Routes
// router.post('/question', getNextQuestion);
// router.post('/answer', submitAnswer);
// router.post('/mcq', getMCQ);
// router.post('/voice-eval', evaluateVoiceAnswer);

// module.exports = router;



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