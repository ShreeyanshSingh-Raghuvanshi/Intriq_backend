// const { getGroqCompletion } = require('../utils/groqClient');

// exports.getFlashcards = async (req, res) => {
//     try {
//         const { skills, jobRole } = req.user.profileContext;
        
//         const prompt = `Generate 5 technical flashcards for a ${jobRole} proficient in ${skills.join(', ')}. 
//         The output must be a valid JSON object with a key "flashcards" containing an array of objects. 
//         Each object must have "front" (question) and "back" (answer) keys.`;

//         const data = await getGroqCompletion(prompt, "You are a technical interview tutor.");
//         res.json(data); // Expecting { flashcards: [...] }
//     } catch (e) { 
//         console.error(e);
//         res.status(500).json({ error: "Failed to generate flashcards" }); 
//     }
// };

// exports.getGapAnalysis = async (req, res) => {
//     try {
//         const { skills, jobRole } = req.user.profileContext;
//         // In a real scenario, you would fetch the latest interview report from DB here
//         // For now, we simulate based on context
        
//         const prompt = `Perform a skill gap analysis for a ${jobRole} who lists these skills: ${skills.join(', ')}. 
//         Identify 3 critical missing skills for a senior level. 
//         Return a JSON object with keys: 
//         - "score" (integer 0-100), 
//         - "missing_skills" (array of strings), 
//         - "action_plan" (string).`;

//         const data = await getGroqCompletion(prompt, "You are a senior technical recruiter.");
//         res.json(data);
//     } catch (e) { 
//         console.error(e);
//         res.status(500).json({ error: "Analysis failed" }); 
//     }
// };

// exports.getCareerGuide = async (req, res) => {
//     try {
//         const { skills, jobRole } = req.user.profileContext;
        
//         const prompt = `Suggest 3 specific career progression paths for a ${jobRole} with skills: ${skills.join(', ')}. 
//         Return a JSON object with a key "suggestions" containing an array. 
//         Each item must have "title", "probability" (number), and "reason".`;

//         const data = await getGroqCompletion(prompt, "You are a career counselor.");
//         res.json(data);
//     } catch (e) { 
//         console.error(e);
//         res.status(500).json({ error: "Career guide failed" }); 
//     }
// };








// const { getGroqCompletion } = require('../utils/groqClient');
// const User = require('../models/User'); // Import User model to fetch context

// // Helper to get user context safely
// const getUserContext = async (userId) => {
//     const user = await User.findById(userId);
//     if (!user || !user.profileContext) {
//         throw new Error("User profile context not found. Please complete your profile.");
//     }
//     return user.profileContext;
// };

// exports.getFlashcards = async (req, res) => {
//     try {
//         const { skills, jobRole } = await getUserContext(req.user.id);
//         const { topic } = req.body; // Support custom topics

//         let prompt;
//         if (topic) {
//              prompt = `Generate 5 technical interview flashcards specifically about "${topic}" for a ${jobRole}. 
//              The output must be a valid JSON object with a key "flashcards" containing an array of objects. 
//              Each object must have "front" (question) and "back" (answer) keys.`;
//         } else {
//              prompt = `Generate 5 technical interview flashcards for a ${jobRole} proficient in ${skills.join(', ')}. 
//              The output must be a valid JSON object with a key "flashcards" containing an array of objects. 
//              Each object must have "front" (question) and "back" (answer) keys.`;
//         }

//         const data = await getGroqCompletion(prompt, "You are a technical interview tutor.");
//         res.json(data); 
//     } catch (e) { 
//         console.error("Flashcard Error:", e);
//         res.status(500).json({ error: e.message || "Failed to generate flashcards" }); 
//     }
// };

// exports.getGapAnalysis = async (req, res) => {
//     try {
//         const { skills, jobRole } = await getUserContext(req.user.id);
        
//         const prompt = `Perform a skill gap analysis for a ${jobRole} who lists these skills: ${skills.join(', ')}. 
//         Compare this against industry standards for a Senior ${jobRole}.
//         Return a valid JSON object with these exact keys: 
//         - "score" (integer 0-100), 
//         - "missing_skills" (array of strings, describing critical gaps), 
//         - "strengths" (array of strings, describing what aligns well),
//         - "action_plan" (string, a brief summary of what to do).`;

//         const data = await getGroqCompletion(prompt, "You are a senior technical recruiter.");
//         res.json(data);
//     } catch (e) { 
//         console.error("Gap Analysis Error:", e);
//         res.status(500).json({ error: e.message || "Analysis failed" }); 
//     }
// };

// exports.getCareerGuide = async (req, res) => {
//     try {
//         const { skills, jobRole } = await getUserContext(req.user.id);
        
//         const prompt = `Suggest 3 specific career progression paths for a ${jobRole} with skills: ${skills.join(', ')}. 
//         Return a valid JSON object with a key "suggestions" containing an array. 
//         Each item must have "title", "match" (percentage string like "95%"), and "reason".`;

//         const data = await getGroqCompletion(prompt, "You are a career counselor.");
//         res.json(data);
//     } catch (e) { 
//         console.error("Career Guide Error:", e);
//         res.status(500).json({ error: e.message || "Career guide failed" }); 
//     }
// };

















// const { getGroqCompletion } = require('../utils/groqClient');
// const User = require('../models/User'); // Import User model

// // Helper to fetch user safely
// const getUserData = async (userId) => {
//     const user = await User.findById(userId).populate('reports');
//     if (!user) throw new Error("User not found");
//     return user;
// };

// exports.getFlashcards = async (req, res) => {
//     try {
//         // 1. Fetch User from DB
//         const user = await getUserData(req.user.id);
//         const { skills, jobRole } = user.profileContext || {};
        
//         // 2. Handle missing profile data
//         const role = jobRole || "Software Engineer";
//         const userSkills = skills?.length > 0 ? skills.join(', ') : "general programming";
//         const { topic } = req.body; // Allow frontend to pass a specific topic

//         // 3. Construct Prompt
//         const topicPhrase = topic ? `specifically about "${topic}"` : `based on their skills in ${userSkills}`;
//         const prompt = `Generate 5 technical interview flashcards for a ${role} ${topicPhrase}. 
//         The output must be a valid JSON object with a key "flashcards" containing an array of objects. 
//         Each object must have "front" (question) and "back" (short answer) keys.`;

//         // 4. Call AI
//         const data = await getGroqCompletion(prompt, "You are a technical interview tutor.");
//         res.json(data); 

//     } catch (e) { 
//         console.error("Flashcard Error:", e);
//         res.status(500).json({ error: e.message || "Failed to generate flashcards" }); 
//     }
// };

// exports.getGapAnalysis = async (req, res) => {
//     try {
//         const user = await getUserData(req.user.id);
//         const { skills, jobRole } = user.profileContext || {};

//         // Fetch latest reports if available (optional enhancement)
//         const resumeReport = user.reports?.find(r => r.type === 'resume');
        
//         const prompt = `Perform a skill gap analysis for a ${jobRole || 'Developer'} who lists these skills: ${skills?.join(', ') || 'None listed'}. 
//         Compare this against industry standards for a Senior ${jobRole || 'Developer'}.
//         Return a JSON object with keys: 
//         - "score" (integer 0-100), 
//         - "missing_skills" (array of strings), 
//         - "strengths" (array of strings),
//         - "action_plan" (string).`;

//         const data = await getGroqCompletion(prompt, "You are a senior technical recruiter.");
//         res.json(data);
//     } catch (e) { 
//         console.error("Gap Analysis Error:", e);
//         res.status(500).json({ error: e.message || "Analysis failed" }); 
//     }
// };

// exports.getCareerGuide = async (req, res) => {
//     try {
//         const user = await getUserData(req.user.id);
//         const { skills, jobRole } = user.profileContext || {};
        
//         const prompt = `Suggest 3 specific career progression paths for a ${jobRole || 'Developer'} with skills: ${skills?.join(', ') || 'General'}. 
//         Return a JSON object with a key "suggestions" containing an array. 
//         Each item must have "title", "match" (percentage string e.g. "95%"), and "reason".`;

//         const data = await getGroqCompletion(prompt, "You are a career counselor.");
//         res.json(data);
//     } catch (e) { 
//         console.error("Career Guide Error:", e);
//         res.status(500).json({ error: e.message || "Career guide failed" }); 
//     }
// };



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