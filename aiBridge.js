const axios = require('axios');

// This function replaces the broken 'require' of the Python file
exports.generateAIResponse = async (prompt, systemPrompt) => {
    try {
        const response = await axios.post('http://localhost:8000/generate', {
            prompt: prompt,
            system_prompt: systemPrompt
        });
        // Python returns the object directly, so we return it as a string 
        // to maintain compatibility with your existing controllers' JSON.parse()
        return JSON.stringify(response.data);
    } catch (error) {
        console.error("Connection to AI Service failed:", error.message);
        throw new Error("AI Service is not responding");
    }
};