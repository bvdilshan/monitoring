import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GaugeDisplay = ({ percent, label, color }) => {
  const val = parseInt(percent);
  const data = {
    datasets: [{
      data: [val, 100 - val],
      backgroundColor: [color, '#1E293B'],
      borderWidth: 0,
      circumference: 180,
      rotation: 270,
      cutout: '85%',
      borderRadius: 10,
    }]
  };

  return (
    <div className="flex flex-col items-center justify-center relative h-40">
      <Doughnut data={data} options={{ plugins: { tooltip: { enabled: false } }, events: [] }} />
      <div className="absolute top-24 text-center">
        <span className="text-3xl font-black text-white">{percent}</span>
        <p className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">{label}</p>
      </div>
    </div>
  );
};

export default GaugeDisplay;