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
