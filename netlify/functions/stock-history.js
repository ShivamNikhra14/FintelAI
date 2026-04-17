const axios = require('axios');

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

exports.handler = async (event) => {
  const { symbol, interval = 'daily' } = event.queryStringParameters || {};
  if (!symbol) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Symbol parameter required' }) };
  }

  try {
    const functionName = interval === 'intraday' ? 'TIME_SERIES_INTRADAY' : 'TIME_SERIES_DAILY';
    const params = {
      function: functionName,
      symbol: symbol.toUpperCase(),
      apikey: ALPHA_VANTAGE_API_KEY
    };
    if (interval === 'intraday') params.interval = '5min';

    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, { params });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Alpha Vantage History Error:', error.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to get stock history' }) };
  }
};
