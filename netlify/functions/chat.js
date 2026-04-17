const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { message } = JSON.parse(event.body || '{}');
    if (!message || !message.trim()) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Message cannot be empty' }) };
    }

    if (!GEMINI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Gemini API key not configured. Set GEMINI_API_KEY in Netlify environment variables.' }) };
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `You are a friendly financial advisor chatbot. Answer questions about personal finance, investments, saving, budgeting, mutual funds, taxes, and similar topics. Keep your response concise (2-3 sentences max). User question: "${message}"`
          }]
        }]
      }
    );

    const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate response";
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: botReply })
    };
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to get response from Gemini API. Please try again.' })
    };
  }
};
