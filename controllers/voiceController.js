const axios = require('axios');
const AI_SERVICE = process.env.AI_SERVICE_URL || 'http://localhost:8000';

exports.evaluateVoiceAnswer = async (req, res) => {
  try {
    const { question, transcript, context } = req.body;
    
    // Call the specific voice evaluation endpoint in Python
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
