// const { generateAIResponse } = require('../ai/engine');

// exports.getQuestions = async (req, res) => {
//   const { context, type, count, history } = req.body;
  
//   const prompt = `Generate ${count} ${type} interview questions for a candidate with skills: ${context.skills.join(', ')} and role: ${context.jobRole}. 
//   Avoid these previous questions: ${JSON.stringify(history)}. Return as JSON array: ["q1", "q2"...]`;

//   const questions = await generateAIResponse(prompt, "You are an expert technical recruiter.");
//   res.json({ questions: JSON.parse(questions) });
// };

// exports.generateAnalysis = async (req, res) => {
//   const { answers } = req.body; // Array of {question, answer}
  
//   const prompt = `Analyze this interview performance: ${JSON.stringify(answers)}. 
//   Provide a score out of 100 for: communication, technicalDepth, problemSolving, accuracy, behaviouralClarity. 
//   Also provide a detailed feedback paragraph. Return as JSON.`;

//   const analysis = await generateAIResponse(prompt, "You are a senior hiring manager.");
//   res.json(JSON.parse(analysis));
// };








// // backend/controllers/interviewController.js
// const { generateAIResponse } = require('../utils/aiClient');

// const axios = require('axios'); // Ensure axios is installed in backend

// // Direct call to Python service for typed endpoints
// const AI_SERVICE = 'http://localhost:8000';

// exports.getNextQuestion = async (req, res) => {
//   try {
//     const { context, currentDifficulty, history } = req.body;
    
//     // Call Python /generate-next-question
//     const response = await axios.post(`${AI_SERVICE}/generate-next-question`, {
//       skills: context.skills,
//       role: context.jobRole,
//       difficulty: currentDifficulty || 5, // Default start at 5
//       history: history || []
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error("AI Error:", err.message);
//     // Fallback question if AI fails
//     res.json({ question: "Tell me about your background.", type: "behavioral" });
//   }
// };

// exports.submitAnswer = async (req, res) => {
//   try {
//     const { question, answer, context } = req.body;

//     // Call Python /analyze-answer
//     const response = await axios.post(`${AI_SERVICE}/analyze-answer`, {
//       question,
//       answer,
//       role: context.jobRole
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error("Analysis Error:", err.message);
//     res.json({ score: 50, difficulty_adjustment: 0, feedback: "Processing error, but answer recorded." });
//   }
// };

// /**
//  * Generates interview questions based on user skills and role.
//  * Calls the AI service via the bridge utility.
//  */
// exports.getQuestions = async (req, res) => {
//   try {
//     const { context, type, count, history } = req.body;
    
//     // Construct the prompt for the AI
//     const prompt = `Generate ${count} ${type} interview questions for a candidate with skills: ${context.skills.join(', ')} and role: ${context.jobRole}. 
//     Avoid these previous questions: ${JSON.stringify(history)}. Return as JSON array: ["q1", "q2"...]`;

//     // Request response from the FastAPI service
//     const aiResponseString = await generateAIResponse(prompt, "You are an expert technical recruiter.");
    
//     // Parse the stringified JSON returned by the bridge
//     const questionsData = JSON.parse(aiResponseString);
    
//     res.json({ questions: questionsData });
//   } catch (err) {
//     console.error("Error in getQuestions:", err.message);
//     res.status(500).json({ 
//       error: "Failed to generate questions", 
//       details: err.message 
//     });
//   }
// };

// /**
//  * Analyzes interview performance based on provided answers.
//  * Provides scores and detailed feedback.
//  */
// exports.generateAnalysis = async (req, res) => {
//   try {
//     const { answers } = req.body; // Array of {question, answer}
    
//     // Construct the prompt for performance analysis
//     const prompt = `Analyze this interview performance: ${JSON.stringify(answers)}. 
//     Provide a score out of 100 for: communication, technicalDepth, problemSolving, accuracy, behaviouralClarity. 
//     Also provide a detailed feedback paragraph. Return as JSON.`;

//     // Request analysis from the FastAPI service
//     const aiResponseString = await generateAIResponse(prompt, "You are a senior hiring manager.");
    
//     // Parse and return the analysis object
//     const analysisData = JSON.parse(aiResponseString);
    
//     res.json(analysisData);
//   } catch (err) {
//     console.error("Error in generateAnalysis:", err.message);
//     res.status(500).json({ 
//       error: "Failed to generate interview analysis", 
//       details: err.message 
//     });
//   }
// };















// const axios = require('axios');
// const AI_SERVICE = 'http://localhost:8000';

// exports.getNextQuestion = async (req, res) => {
//   try {
//     const { context, difficulty, history } = req.body;
    
//     // Call Python Service
//     const response = await axios.post(`${AI_SERVICE}/generate-next-question`, {
//       skills: context.skills || [],
//       role: context.jobRole,
//       interview_type: context.targetInterviewType || 'Technical',
//       difficulty: difficulty || 5,
//       history: history || [],
//       resume_text: "" // If you add PDF parsing later, pass text here
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error("AI Service Error:", err.message);
//     res.json({ question: "Tell me about your experience.", type: "behavioral" });
//   }
// };

// exports.submitAnswer = async (req, res) => {
//   try {
//     const { question, answer, role, difficulty } = req.body;

//     const response = await axios.post(`${AI_SERVICE}/analyze-answer`, {
//       question,
//       answer,
//       role,
//       difficulty
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error("AI Analysis Error:", err.message);
//     res.json({ score: 50, difficulty_adjustment: 0, feedback: "Service busy." });
//   }
// };












// const axios = require('axios');
// // Ensure this URL matches where your python script is running
// const AI_SERVICE = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// exports.getNextQuestion = async (req, res) => {
//   try {
//     const { context, difficulty, history } = req.body;
    
//     // Validate and sanitize history to ensure 'question' field exists
//     const sanitizedHistory = Array.isArray(history) ? history.map(h => ({
//       question: (h.question && typeof h.question === 'object') ? h.question.question : (h.question || ""),
//       answer: h.answer || ""
//     })) : [];

//     const response = await axios.post(`${AI_SERVICE}/generate-next-question`, {
//       skills: context.skills || [],
//       role: context.jobRole || "Software Engineer",
//       interview_type: context.targetInterviewType || 'Technical',
//       difficulty: difficulty || 5,
//       history: sanitizedHistory,
//       resume_text: "" 
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error("AI Service Error:", err.message);
//     // Fallback if AI service is completely down (Connection Refused)
//     res.json({ 
//         question: "Could you tell me about yourself and your experience? (Service Unavailable)", 
//         type: "behavioral" 
//     });
//   }
// };

// exports.submitAnswer = async (req, res) => {
//   try {
//     const { question, answer, role, difficulty } = req.body;

//     const response = await axios.post(`${AI_SERVICE}/analyze-answer`, {
//       question: typeof question === 'object' ? question.question : question,
//       answer,
//       role: role || "Candidate",
//       difficulty: difficulty || 5
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error("AI Analysis Error:", err.message);
//     res.json({ score: 50, difficulty_adjustment: 0, feedback: "We recorded your answer, but AI analysis is currently unavailable." });
//   }
// };









// const axios = require('axios');
// const AI_SERVICE = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// exports.getNextQuestion = async (req, res) => {
//   try {
//     const { context, difficulty, history } = req.body;
    
//     // Sanitize history to avoid errors if frontend sends bad data
//     const sanitizedHistory = Array.isArray(history) ? history.map(h => ({
//       question: (h.question && typeof h.question === 'object') ? h.question.question : (h.question || ""),
//       answer: h.answer || ""
//     })) : [];

//     const response = await axios.post(`${AI_SERVICE}/generate-next-question`, {
//       skills: context.skills || [],
//       role: context.jobRole || "Software Engineer",
//       interview_type: context.targetInterviewType || 'Technical',
//       difficulty: difficulty || 5,
//       history: sanitizedHistory
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error("AI Service Error:", err.message);
//     res.status(500).json({ 
//         question: "Service is temporarily unavailable. Please check your connection.", 
//         type: "error" 
//     });
//   }
// };

// exports.submitAnswer = async (req, res) => {
//   try {
//     const { question, answer, role, difficulty } = req.body;

//     const response = await axios.post(`${AI_SERVICE}/analyze-answer`, {
//       question: typeof question === 'object' ? question.question : question,
//       answer,
//       role: role || "Candidate",
//       difficulty: difficulty || 5
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error("AI Analysis Error:", err.message);
//     res.status(500).json({ score: 0, feedback: "Error analyzing answer." });
//   }
// };












// const axios = require('axios');
// const AI_SERVICE = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// exports.getNextQuestion = async (req, res) => {
//   try {
//     const { context, difficulty, history } = req.body;
    
//     const sanitizedHistory = Array.isArray(history) ? history.map(h => ({
//       question: (h.question && typeof h.question === 'object') ? h.question.question : (h.question || ""),
//       answer: h.answer || ""
//     })) : [];

//     const response = await axios.post(`${AI_SERVICE}/generate-next-question`, {
//       skills: context.skills || [],
//       role: context.jobRole || "Software Engineer",
//       interview_type: context.targetInterviewType || 'Technical',
//       difficulty: difficulty || 5,
//       history: sanitizedHistory
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error("AI Service Error:", err.message);
//     res.status(500).json({ question: "Service Unavailable", type: "error" });
//   }
// };

// exports.getMCQ = async (req, res) => {
//     try {
//         const { context, difficulty } = req.body;
//         const response = await axios.post(`${AI_SERVICE}/generate-mcq`, {
//             skills: context.skills || [],
//             role: context.jobRole || "Developer",
//             difficulty: difficulty || 5
//         });
//         res.json(response.data);
//     } catch (err) {
//         console.error("MCQ Error:", err.message);
//         res.status(500).json({ error: "Failed to generate MCQ" });
//     }
// };

// exports.submitAnswer = async (req, res) => {
//   try {
//     const { question, answer, role, difficulty } = req.body;

//     const response = await axios.post(`${AI_SERVICE}/analyze-answer`, {
//       question: typeof question === 'object' ? question.question : question,
//       answer,
//       role: role || "Candidate",
//       difficulty: difficulty || 5
//     });

//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ score: 0, feedback: "Error analyzing answer." });
//   }
// };












const axios = require('axios');
const AI_SERVICE = process.env.AI_SERVICE_URL || 'http://localhost:8000';

exports.getNextQuestion = async (req, res) => {
  try {
    const { context, difficulty, history } = req.body;
    
    // Sanitize history
    const sanitizedHistory = Array.isArray(history) ? history.map(h => ({
      question: (h.question && typeof h.question === 'object') ? h.question.question : (h.question || ""),
      answer: h.answer || ""
    })) : [];

    const response = await axios.post(`${AI_SERVICE}/generate-next-question`, {
      skills: context.skills || [],
      role: context.jobRole || "Software Engineer",
      interview_type: context.targetInterviewType || 'Technical',
      difficulty: difficulty || 5,
      history: sanitizedHistory
    });

    res.json(response.data);
  } catch (err) {
    console.error("AI Service Error:", err.message);
    res.status(500).json({ question: "Service Unavailable", type: "error" });
  }
};
exports.getFirstQuestion = async (req, res) => {
  try {
    const { context, difficulty, history } = req.body;
    
    // Sanitize history
    // const sanitizedHistory = Array.isArray(history) ? history.map(h => ({
    //   question: (h.question && typeof h.question === 'object') ? h.question.question : (h.question || ""),
    //   answer: h.answer || ""
    // })) : [];

    const response = await axios.post(`${AI_SERVICE}/generate-next-question`, {
      skills: context.skills || [],
      role: context.jobRole || "Software Engineer",
      interview_type: context.targetInterviewType || 'Technical',
      difficulty: difficulty || 5,
      // history: sanitizedHistory
    });

    res.json(response.data);
  } catch (err) {
    console.error("AI Service Error:", err.message);
    res.status(500).json({ question: "Service Unavailable", type: "error" });
  }
};

exports.getMCQ = async (req, res) => {
    try {
        const { context, difficulty } = req.body;
        const response = await axios.post(`${AI_SERVICE}/generate-mcq`, {
            skills: context.skills || [],
            role: context.jobRole || "Developer",
            difficulty: difficulty || 5
        });
        res.json(response.data);
    } catch (err) {
        console.error("MCQ Error:", err.message);
        res.status(500).json({ error: "Failed to generate MCQ" });
    }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { question, answer, role, difficulty } = req.body;

    const response = await axios.post(`${AI_SERVICE}/analyze-answer`, {
      question: typeof question === 'object' ? question.question : question,
      answer,
      role: role || "Candidate",
      difficulty: difficulty || 5
    });

    res.json(response.data);
  } catch (err) {
    console.error("Analysis Error:", err.message);
    res.status(500).json({ score: 0, feedback: "Error analyzing answer." });
  }
};

exports.evaluateVoiceAnswer = async (req, res) => {
  try {
    const { question, transcript, context } = req.body;
    
    const response = await axios.post(`${AI_SERVICE}/evaluate-voice`, {
      question: question,
      answer: transcript,
      role: context.jobRole || "Professional"
    });

    res.json(response.data);
  } catch (err) {
    console.error("Voice AI Error:", err.message);
    res.status(500).json({ 
        error: "Voice evaluation failed", 
        feedback: "Could not analyze voice input at this time." 
    });
  }
};