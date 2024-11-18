import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import './styles.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

const PieChart: React.FC<PieChartProps> = ({ title, data }) => {
  return (
    <div className="pie-chart">
      <h3>{title}</h3>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
