import React, { useState } from 'react';
import { Coin } from '../hooks/useCoins';

interface ConverterProps {
  coins: Coin[];
}

export const Converter: React.FC<ConverterProps> = ({ coins }) => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCoin, setFromCoin] = useState<string>(coins[0]?.id || '');
  const [toCoin, setToCoin] = useState<string>(coins[1]?.id || '');

  const getPrice = (id: string) => {
    return coins.find(coin => coin.id === id)?.current_price || 0;
  };

  const convertedAmount = (amount * getPrice(fromCoin)) / getPrice(toCoin);

  return (
    <div className="converter">
      <h3>Cryptocurrency Converter</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={fromCoin} onChange={(e) => setFromCoin(e.target.value)}>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name}
          </option>
        ))}
      </select>
      <span>to</span>
      <select value={toCoin} onChange={(e) => setToCoin(e.target.value)}>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name}
          </option>
        ))}
      </select>
      <p>
        {amount} {coins.find(coin => coin.id === fromCoin)?.symbol.toUpperCase()} =
        {' '}
        {convertedAmount.toFixed(6)} {coins.find(coin => coin.id === toCoin)?.symbol.toUpperCase()}
      </p>
    </div>
  );
};
