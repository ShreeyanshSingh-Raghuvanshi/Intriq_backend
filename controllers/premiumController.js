const { getGroqCompletion } = require('../utils/groqClient');
const User = require('../models/User');

// Helper: Fetch User Data Safely
const getUserData = async (userId) => {
    // Populate reports if you need them for analysis, otherwise simple findById is faster
    const user = await User.findById(userId);
    if (!user) throw new Error("User account not found.");
    return user;
};

exports.getFlashcards = async (req, res) => {
    try {
        const user = await getUserData(req.user.id);
        const { skills, jobRole } = user.profileContext || {};
        
        // Default fallbacks if profile is empty
        const role = jobRole || "Software Engineer";
        const userSkills = (skills && skills.length > 0) ? skills.join(', ') : "General Programming Concepts";
        const { topic } = req.body; 

        // Construct Prompt
        const topicPhrase = topic ? `specifically about "${topic}"` : `based on their skills in ${userSkills}`;
        const prompt = `Generate 5 technical interview flashcards for a ${role} ${topicPhrase}. 
        The output must be a strictly valid JSON object with a key "flashcards" containing an array of objects. 
        Each object must have "front" (question) and "back" (short answer) keys.`;

        const data = await getGroqCompletion(prompt, "You are an expert technical interviewer.");
        res.json(data); 

    } catch (e) { 
        console.error("Controller Error (getFlashcards):", e.message);
        res.status(500).json({ error: e.message || "Failed to generate flashcards" }); 
    }
};

exports.getGapAnalysis = async (req, res) => {
    try {
        const user = await getUserData(req.user.id);
        const { skills, jobRole } = user.profileContext || {};
        
        const role = jobRole || "Developer";
        const skillList = (skills && skills.length > 0) ? skills.join(', ') : "Standard Web Development";

        const prompt = `Perform a skill gap analysis for a ${role} with these skills: ${skillList}. 
        Compare this against industry standards for a Senior ${role}.
        Return a strictly valid JSON object with these keys: 
        - "score" (integer 0-100), 
        - "missing_skills" (array of strings), 
        - "strengths" (array of strings),
        - "action_plan" (string).`;

        const data = await getGroqCompletion(prompt, "You are a senior technical recruiter.");
        res.json(data);
    } catch (e) { 
        console.error("Controller Error (getGapAnalysis):", e.message);
        res.status(500).json({ error: e.message || "Analysis failed" }); 
    }
};

exports.getCareerGuide = async (req, res) => {
    try {
        const user = await getUserData(req.user.id);
        const { skills, jobRole } = user.profileContext || {};
        
        const role = jobRole || "Developer";
        const skillList = (skills && skills.length > 0) ? skills.join(', ') : "Standard Tech Stack";

        const prompt = `Suggest 3 specific career progression paths for a ${role} with skills: ${skillList}. 
        Return a strictly valid JSON object with a key "suggestions" containing an array. 
        Each item must have "title", "match" (percentage string e.g. "95%"), and "reason".`;

        const data = await getGroqCompletion(prompt, "You are a career counselor.");
        res.json(data);
    } catch (e) { 
        console.error("Controller Error (getCareerGuide):", e.message);
        res.status(500).json({ error: e.message || "Career guide failed" }); 
    }
};
