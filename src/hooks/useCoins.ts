import { useState, useEffect } from 'react';
import { getTopCoins } from '../services/api';

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

export const useCoins = (limit = 10) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getTopCoins(limit);
        setCoins(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching coins');
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return { coins, loading, error };
};
