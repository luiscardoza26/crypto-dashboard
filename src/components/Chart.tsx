import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { getCoinHistory } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);


interface ChartProps {
  coinId: string;
}

export const Chart: React.FC<ChartProps> = ({ coinId }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const data = await getCoinHistory(coinId);
      const prices = data.prices.map((price: number[]) => ({
        x: price[0],
        y: price[1],
      }));

      setChartData({
        datasets: [
          {
            label: `${coinId} price`,
            data: prices,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      });
    };

    fetchChartData();
  }, [coinId]);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!chartData) return <div>Loading chart...</div>;

  return (
    <div className="chart">
      <Line data={chartData} options={options} />
    </div>
  );
};

