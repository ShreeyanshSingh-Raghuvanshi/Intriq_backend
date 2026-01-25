// const { generateAIResponse } = require('../aiBridge');
// const { GAP_ANALYSIS_PROMPT } = require('../utils/prompts');

// exports.generateFlashcards = async (req, res) => {
//   const { topic } = req.body;
//   const prompt = `Generate 10 flashcards for ${topic}. Return as JSON array of {front, back}.`;
//   const cards = await generateAIResponse(prompt);
//   res.json(JSON.parse(cards));
// };

// exports.careerSuggestion = async (req, res) => {
//   const { interviewReport, currentSkills } = req.body;
//   const prompt = `Based on this interview performance: ${interviewReport} and skills ${currentSkills}, suggest 3 detailed career paths and 5 upskilling steps. Return JSON.`;
//   const suggestions = await generateAIResponse(prompt);
//   res.json(JSON.parse(suggestions));
// };

// exports.getGapAnalysis = async (req, res) => {
//   const { resumeContent, interviewResults } = req.body;
//   const prompt = `Resume: ${resumeContent}. Interview: ${JSON.stringify(interviewResults)}. ${GAP_ANALYSIS_PROMPT}`;
  
//   const result = await generateAIResponse(prompt);
//   res.json(JSON.parse(result));
// };






// const axios = require('axios');
// const AI_SERVICE = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// exports.getFlashcards = async (req, res) => {
//     try {
//         const { skills, jobRole } = req.user.profileContext;
//         const response = await axios.post(`${AI_SERVICE}/generate-flashcards`, { skills, role: jobRole });
//         res.json(response.data);
//     } catch (e) { res.status(500).json({ error: "AI Error" }); }
// };

// exports.getGapAnalysis = async (req, res) => {
//     try {
//         const { skills, jobRole } = req.user.profileContext;
//         const response = await axios.post(`${AI_SERVICE}/gap-analysis`, { skills, role: jobRole });
//         res.json(response.data);
//     } catch (e) { res.status(500).json({ error: "AI Error" }); }
// };

// exports.getCareerGuide = async (req, res) => {
//     try {
//         const { skills, jobRole } = req.user.profileContext;
//         const response = await axios.post(`${AI_SERVICE}/career-guide`, { skills, role: jobRole });
//         res.json(response.data);
//     } catch (e) { res.status(500).json({ error: "AI Error" }); }
// };














// // - Updated to use Groq for premium features
// const { getGroqCompletion } = require('../utils/groqClient');

// exports.getFlashcards = async (req, res) => {
//     try {
//         const { skills, jobRole } = req.user.profileContext;
//         const prompt = `Generate 10 technical flashcards for a ${jobRole} proficient in ${skills.join(', ')}. 
//         Return strictly a JSON array of objects with keys "front" and "back". Do not include markdown formatting.`;
        
//         const data = await getGroqCompletion(prompt, "You are a technical tutor.");
//         res.json({ flashcards: data });
//     } catch (e) { 
//         res.status(500).json({ error: "Failed to generate flashcards", details: e.message }); 
//     }
// };

// exports.getGapAnalysis = async (req, res) => {
//     try {
//         const { skills, jobRole } = req.user.profileContext;
//         // In a real scenario, you would fetch the latest interview report here
//         const prompt = `Perform a gap analysis for a ${jobRole} with these skills: ${skills.join(', ')}. 
//         Identify 3 missing critical skills and suggest resources. Return as JSON object with keys "missing_skills" (array) and "action_plan" (string).`;

//         const data = await getGroqCompletion(prompt, "You are a senior career counselor.");
//         res.json(data);
//     } catch (e) { 
//         res.status(500).json({ error: "Analysis failed", details: e.message }); 
//     }
// };

// exports.getCareerGuide = async (req, res) => {
//     try {
//         const { skills, jobRole } = req.user.profileContext;
//         const prompt = `Suggest 3 specific career paths for a ${jobRole} with skills: ${skills.join(', ')}. 
//         Return as JSON array of objects with keys "title", "probability" (0-100), and "reason".`;

//         const data = await getGroqCompletion(prompt, "You are a recruitment expert.");
//         res.json({ suggestions: data });
//     } catch (e) { 
//         res.status(500).json({ error: "Career guide failed", details: e.message }); 
//     }
// };







const { getGroqCompletion } = require('../utils/groqClient');

exports.getFlashcards = async (req, res) => {
    try {
        const { skills, jobRole } = req.user.profileContext;
        
        const prompt = `Generate 5 technical flashcards for a ${jobRole} proficient in ${skills.join(', ')}. 
        The output must be a valid JSON object with a key "flashcards" containing an array of objects. 
        Each object must have "front" (question) and "back" (answer) keys.`;

        const data = await getGroqCompletion(prompt, "You are a technical interview tutor.");
        res.json(data); // Expecting { flashcards: [...] }
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: "Failed to generate flashcards" }); 
    }
};

exports.getGapAnalysis = async (req, res) => {
    try {
        const { skills, jobRole } = req.user.profileContext;
        // In a real scenario, you would fetch the latest interview report from DB here
        // For now, we simulate based on context
        
        const prompt = `Perform a skill gap analysis for a ${jobRole} who lists these skills: ${skills.join(', ')}. 
        Identify 3 critical missing skills for a senior level. 
        Return a JSON object with keys: 
        - "score" (integer 0-100), 
        - "missing_skills" (array of strings), 
        - "action_plan" (string).`;

        const data = await getGroqCompletion(prompt, "You are a senior technical recruiter.");
        res.json(data);
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: "Analysis failed" }); 
    }
};

exports.getCareerGuide = async (req, res) => {
    try {
        const { skills, jobRole } = req.user.profileContext;
        
        const prompt = `Suggest 3 specific career progression paths for a ${jobRole} with skills: ${skills.join(', ')}. 
        Return a JSON object with a key "suggestions" containing an array. 
        Each item must have "title", "probability" (number), and "reason".`;

        const data = await getGroqCompletion(prompt, "You are a career counselor.");
        res.json(data);
    } catch (e) { 
        console.error(e);
        res.status(500).json({ error: "Career guide failed" }); 
    }
};