const axios = require('axios');

// This URL must match the port your ai/main.py is running on (typically 8000)
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

exports.generateAIResponse = async (prompt, systemPrompt = "You are a helpful assistant.") => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/generate`, {
      prompt,
      system_prompt: systemPrompt
    });
    // We stringify the response to keep it compatible with your existing JSON.parse() calls
    return JSON.stringify(response.data);
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error("Failed to communicate with AI service. Is the Python server running?");
  }
};