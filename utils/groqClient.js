// // - Direct integration with Groq API
// const axios = require('axios');

// exports.getGroqCompletion = async (prompt, systemPrompt = "You are a helpful AI assistant.") => {
//   try {
//     const response = await axios.post(
//       'https://api.groq.com/openai/v1/chat/completions',
//       {
//         model: "gpt-oss:120b-cloud", // or "mixtral-8x7b-32768"
//         messages: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: prompt }
//         ],
//         temperature: 0.7,
//         max_tokens: 1024
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );
    
//     // Extract content
//     const content = response.data.choices[0].message.content;
    
//     // Attempt to parse JSON if the prompt requested it
//     try {
//         // Find JSON part if wrapped in backticks
//         const jsonMatch = content.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
//         return jsonMatch ? JSON.parse(jsonMatch[0]) : content;
//     } catch (e) {
//         return content;
//     }
//   } catch (error) {
//     console.error("Groq API Error:", error.response?.data || error.message);
//     throw new Error("Failed to generate AI response");
//   }
// };










const axios = require('axios');

exports.getGroqCompletion = async (prompt, systemPrompt = "You are a helpful AI assistant.") => {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "gpt-oss:120b-cloud", // Fast and efficient model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        response_format: { type: "json_object" } // Enforce JSON mode
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Parse the content safely
    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    // Return a fallback or rethrow
    throw new Error("Failed to generate AI response from Groq.");
  }
};