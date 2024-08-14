import React from 'react';
import { Coin } from '../hooks/useCoins';

interface CoinListProps {
  coins: Coin[];
  onSelectCoin: (coin: Coin) => void;
}

export const CoinList: React.FC<CoinListProps> = ({ coins, onSelectCoin }) => {
  return (
    <div className="coin-list">
      {coins.map((coin) => (
        <div key={coin.id} className="coin-item" onClick={() => onSelectCoin(coin)}>
          <img src={coin.image} alt={coin.name} />
          <div className="coin-info">
            <h3>{coin.name}</h3>
            <p>${coin.current_price.toFixed(2)}</p>
            <p className={coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
