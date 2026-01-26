// const axios = require('axios');

// exports.getGroqCompletion = async (prompt, systemPrompt = "You are a helpful AI assistant.") => {
//   try {
//     const response = await axios.post(
//       'https://api.groq.com/openai/v1/chat/completions',
//       {
//         model: "llama-3.3-70b-versatile", // Fast and efficient model
//         messages: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: prompt }
//         ],
//         temperature: 0.7,
//         max_tokens: 1024,
//         response_format: { type: "json_object" } // Enforce JSON mode
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );
    
//     // Parse the content safely
//     const content = response.data.choices[0].message.content;
//     return JSON.parse(content);
//   } catch (error) {
//     console.error("Groq API Error:", error.response?.data || error.message);
//     // Return a fallback or rethrow
//     throw new Error("Failed to generate AI response from Groq.");
//   }
// };







const axios = require('axios');

exports.getGroqCompletion = async (prompt, systemPrompt = "You are a helpful AI assistant.") => {
  // 1. Safety Check: Ensure API Key exists
  if (!process.env.GROQ_API_KEY) {
    console.error("❌ CRITICAL ERROR: GROQ_API_KEY is missing in .env file.");
    throw new Error("Server configuration error: Missing AI API Key.");
  }

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        response_format: { type: "json_object" } // Force JSON for easier parsing
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // 2. Parse Content Safely
    const content = response.data?.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("Received empty response from AI service.");
    }

    return JSON.parse(content);

  } catch (error) {
    // 3. Enhanced Error Logging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx (e.g., 401 Unauthorized, 429 Too Many Requests)
      console.error("🔴 Groq API Error Status:", error.response.status);
      console.error("🔴 Groq API Error Data:", JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      // The request was made but no response was received
      console.error("🔴 Groq Network Error: No response received.");
    } else {
      // Something happened in setting up the request
      console.error("🔴 Groq Client Error:", error.message);
    }
    
    // Throw a clean error message to the controller
    throw new Error("AI Service Unavailable. Please try again later.");
  }
};