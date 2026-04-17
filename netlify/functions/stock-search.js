const axios = require('axios');

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const { keywords } = event.queryStringParameters || {};
  if (!keywords) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Keywords parameter required' }) };
  }

  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: { function: 'SYMBOL_SEARCH', keywords, apikey: ALPHA_VANTAGE_API_KEY }
    });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Alpha Vantage Search Error:', error.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to search stocks' }) };
  }
};
