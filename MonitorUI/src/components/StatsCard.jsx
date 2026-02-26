import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color }) => (
  <div className="glass p-5 rounded-2xl flex items-center gap-4 transition-all hover:border-slate-700">
    <div className="p-3 rounded-xl bg-slate-900/50" style={{ color }}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{title}</p>
      <h3 className="text-xl font-bold text-white tracking-tight">{value}</h3>
    </div>
  </div>
);

export default StatsCard;