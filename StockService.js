import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // Replace with your Alpha Vantage API key
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockPrice = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '1min',
        apikey: API_KEY,
      },
    });
    const data = response.data['Time Series (1min)'];
    const latestTime = Object.keys(data)[0];
    return parseFloat(data[latestTime]['1. open']); // Return the latest price
  } catch (error) {
    console.error('Error fetching stock price:', error);
    throw error;
  }
};
