const axios = require('axios');

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

exports.handler = async (event) => {
  const { symbol } = event.queryStringParameters || {};
  if (!symbol) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Symbol parameter required' }) };
  }

  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: { function: 'GLOBAL_QUOTE', symbol: symbol.toUpperCase(), apikey: ALPHA_VANTAGE_API_KEY }
    });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Alpha Vantage Quote Error:', error.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to get stock quote' }) };
  }
};
