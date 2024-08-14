import React, { useState } from 'react';
import { useCoins, Coin } from './hooks/useCoins';
import { CoinList } from './components/CoinList';
import { CoinDetails } from './components/CoinDetails';
import { Converter } from './components/Converter';
import './styles/global.css';

const App: React.FC = () => {
  const { coins, loading, error } = useCoins(20);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="app">
      <header>
        <h1>Crypto Dashboard</h1>
      </header>
      <main>
        <div className="dashboard">
          <CoinList coins={coins} onSelectCoin={setSelectedCoin} />
          {selectedCoin && <CoinDetails coin={selectedCoin} />}
        </div>
        <Converter coins={coins} />
      </main>
    </div>
  );
};

export default App;
