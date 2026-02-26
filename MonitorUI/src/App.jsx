import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Cpu, Database, HardDrive, Clock, Activity, Zap, ShieldCheck } from 'lucide-react';
import StatsCard from './components/StatsCard';
import GaugeDisplay from './components/GaugeDisplay';
import ResourceChart from './components/ResourceChart'; 

function App() {
  const [stats, setStats] = useState({ ramUsage: "0%", cpuUsage: "0%", diskUsage: "0%", uptime: "0h", topProcess: "None", status: "Healthy" });
  const [history, setHistory] = useState({ labels: [], ramData: [], cpuData: [] });

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:5239/api/monitoring/stats');
      setStats(data);
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setHistory(h => ({
        labels: [...h.labels.slice(-14), time],
        ramData: [...h.ramData.slice(-14), parseInt(data.ramUsage)],
        cpuData: [...h.cpuData.slice(-14), parseInt(data.cpuUsage)],
      }));
    } catch (e) { console.error("Offline"); }
  };

  useEffect(() => {
    fetchData();
    const t = setInterval(fetchData, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-screen flex flex-col p-6 gap-6">
      <header className="flex justify-between items-center glass px-6 py-3 rounded-2xl border border-slate-800/50 shadow-2xl">
  <div className="flex items-center gap-4">
    {/* Logo */}
    <div className="w-12 h-12 bg-slate-900/50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-700/30 p-1.5">
      <img 
        src="/devops.png" 
        alt="DevOps Logo" 
        className="w-full h-full object-contain"
      />
    </div>
    
    <div>
      <h1 className="text-sm font-black text-white uppercase tracking-tighter leading-none flex items-center gap-2">
        Monitor
        <span className="text-[9px] bg-accent-teal/10 text-accent-teal px-1.5 py-0.5 rounded border border-accent-teal/20 tracking-normal">
          v1.0
        </span>
      </h1>
      <div className="flex items-center gap-2 mt-1.5">
        <div className={`h-1.5 w-1.5 rounded-full ${stats.status === 'Healthy' ? 'bg-success' : 'bg-error'} animate-pulse`}></div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Status: <span className={stats.status === 'Healthy' ? 'text-success' : 'text-error'}>{stats.status}</span>
        </p>
      </div>
    </div>
  </div>

  <div className="flex items-center gap-6">
    {/* Network Info */}
    <div className="hidden md:flex flex-col items-end">
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Management IP</span>
      <span className="text-[11px] font-mono text-accent-teal font-bold">127.0.0.1:5239</span>
    </div>
    
    {/* Connection Indicator */}
    <div className="h-8 w-[1px] bg-slate-800 hidden md:block"></div>
    
    <div className="flex items-center gap-3 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-800">
      <div className="flex flex-col">
        <span className="text-[8px] font-bold text-slate-500 uppercase">Secure Link</span>
        <span className="text-[10px] font-black text-white uppercase tracking-tighter">Active</span>
      </div>
      <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_#10B981]"></div>
    </div>
  </div>
</header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        
       
        <div className="col-span-4 flex flex-col gap-6">
          <div className="glass p-8 rounded-3xl grid grid-cols-1 gap-4 flex-1 items-center">
            <GaugeDisplay percent={stats.ramUsage} label="Memory Load" color="#2DD4BF" />
            <GaugeDisplay percent={stats.cpuUsage} label="CPU Load" color="#A855F7" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <StatsCard title="Uptime" value={stats.uptime} icon={Clock} color="#F59E0B" />
             <StatsCard title="Storage" value={stats.diskUsage} icon={HardDrive} color="#3B82F6" />
          </div>
        </div>

      
        <div className="col-span-8 flex flex-col gap-6">
          <div className="glass p-6 rounded-3xl flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                <Activity size={16} className="text-accent-teal" /> Performance History
              </h3>
            </div>
            <div className="flex-1">
              <ResourceChart history={history} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <StatsCard title="Primary Process" value={stats.topProcess} icon={Zap} color="#A855F7" />
             <StatsCard title="Security" value="Encrypted" icon={ShieldCheck} color="#10B981" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;