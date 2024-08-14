import React from 'react';
import { Coin } from '../hooks/useCoins';
import { Chart } from './Chart';

interface CoinDetailsProps {
  coin: Coin;
}

export const CoinDetails: React.FC<CoinDetailsProps> = ({ coin }) => {
  return (
    <div className="coin-details">
      <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
      <img src={coin.image} alt={coin.name} />
      <p>Price: ${coin.current_price.toFixed(2)}</p>
      <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
      <p className={coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}>
        24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
      <Chart coinId={coin.id} />
    </div>
  );
};
