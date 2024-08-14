import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export const getTopCoins = async (limit = 10) => {
  const response = await api.get(`/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: limit,
      page: 1,
      sparkline: false,
    },
  });
  return response.data;
};

export const getCoinData = async (id: string) => {
  const response = await api.get(`/coins/${id}`);
  return response.data;
};

export const getCoinHistory = async (id: string, days = 7) => {
  const response = await api.get(`/coins/${id}/market_chart`, {
    params: { vs_currency: 'usd', days },
  });
  return response.data;
};
