// AI prompts for premium features
exports.GAP_ANALYSIS_PROMPT = `
Analyze the gap between the candidate's resume and their interview performance. 
Provide:
1. Key strengths demonstrated in the interview
2. Areas where performance fell short of resume claims
3. Specific skill gaps that should be addressed
4. Recommended learning path with resources
Return the response as valid JSON.
`;

exports.FLASHCARD_PROMPT = `
Generate educational flashcards in JSON format.
Each flashcard should have:
- front: The question or prompt
- back: The answer or explanation
Return as JSON array: [{"front": "...", "back": "..."}, ...]
`;

exports.CAREER_SUGGESTION_PROMPT = `
Based on interview performance and current skills, suggest:
1. 3 detailed career paths (with rationale)
2. 5 specific upskilling steps (with resources and timeline)
Return as valid JSON.
`;
