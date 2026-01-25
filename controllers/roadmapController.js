// const { generateAIResponse } = require('../../ai/engine');

// exports.getRoadmap = async (req, res) => {
//   const { skills, jobRole } = req.body;
//   const prompt = `Create a 4-week roadmap to become a ${jobRole}. 
//     Current skills: ${skills}. Suggest 3 specific YouTube search terms for each week. 
//     Return JSON: {"weeks": [{"week": 1, "topics": [], "yt_links": []}]}`;
    
//   const roadmap = await generateAIResponse(prompt);
//   res.json(JSON.parse(roadmap));
// };









const axios = require('axios');
const AI_SERVICE = process.env.AI_SERVICE_URL || 'http://localhost:8000';
const User = require('../models/User');

exports.getRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const context = user.profileContext || {};

    const response = await axios.post(`${AI_SERVICE}/generate-roadmap`, {
      skills: context.skills || [],
      role: context.jobRole || "General Developer"
    });

    res.json(response.data);
  } catch (error) {
    console.error("Roadmap Error:", error.message);
    // Static fallback
    res.json({
        roadmap: [
            { week: "Week 1", topic: "Basics", details: "Review fundamental concepts of your role." },
            { week: "Week 2", topic: "Advanced", details: "Practice complex problem solving." }
        ]
    });
  }
};