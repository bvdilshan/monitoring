import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ResourceChart = ({ history }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 750, easing: 'easeInOutQuart' },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#64748b',
          font: { family: 'Inter', size: 11, weight: '600' }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#161922',
        titleColor: '#94a3b8',
        bodyColor: '#ffffff',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        boxPadding: 6,
        titleFont: { family: 'Inter', size: 12 },
        bodyFont: { family: 'Inter', size: 12, weight: '600' }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        border: { display: false },
        grid: { color: 'rgba(255, 255, 255, 0.03)', drawTicks: false },
        ticks: {
          color: '#475569',
          font: { family: 'Inter', size: 10 },
          padding: 10,
          callback: (value) => `${value}%`
        }
      },
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          color: '#475569',
          font: { family: 'Inter', size: 10 },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 7
        }
      }
    },
    elements: {
      line: { tension: 0.4, borderWidth: 2 },
      point: { radius: 0, hoverRadius: 5, hoverBorderWidth: 2, backgroundColor: '#0F1117' }
    }
  };

  const data = {
    labels: history.labels,
    datasets: [
      {
        label: 'RAM Usage',
        data: history.ramData,
        borderColor: '#00cf19', 
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(45, 212, 191, 0.15)');
          gradient.addColorStop(1, 'rgba(45, 212, 191, 0)');
          return gradient;
        },
        fill: true,
        stepped: 'after',
      },
      {
        label: 'CPU Usage',
        data: history.cpuData,
        borderColor: '#0743cf', 
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
          gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
          return gradient;
        },
        fill: true,
        stepped: 'after',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ResourceChart;