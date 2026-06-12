/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ShieldAlert, Rocket as RocketIcon, Info, BarChart3, Search, ChevronRight } from 'lucide-react';
import { useMission } from '../context/MissionContext';

export default function ComparisonView() {
  const { optimization, selectedRocket: rocket } = useMission();
  const navigate = useNavigate();

  if (!optimization || !rocket) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-6 text-center">
        <div className="w-20 h-20 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-400 border border-sky-100">
          <BarChart3 size={40} />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Metrics Pending</h3>
          <p className="text-xs text-slate-700 max-w-sm font-mono uppercase tracking-widest">Run intergalactic optimization to generate performance deltas</p>
        </div>
        <button 
          onClick={() => navigate('/selection')}
          className="px-6 py-2 border border-sky-300 rounded text-[10px] uppercase font-bold text-sky-600 hover:bg-sky-50 transition-all font-mono shadow-sm"
        >
          Select Vessel
        </button>
      </div>
    );
  }

  const chartData = [
    { name: 'Fuel', original: optimization.original.fuelUsage, optimized: optimization.optimized.fuelUsage },
    { name: 'Duration', original: optimization.original.duration, optimized: optimization.optimized.duration },
    { name: 'Efficiency', original: optimization.original.efficiency, optimized: optimization.optimized.efficiency },
  ];

  const costData = [
    { name: 'Original', value: 100 },
    { name: 'AI Optimized', value: 100 - optimization.savings.cost },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 mb-2 italic">Delta Comparison</h2>
          <p className="text-xs font-mono text-slate-800 uppercase tracking-widest bg-sky-100/50 inline-block px-2 py-1 rounded">How & Why: AI Performance Logic</p>
        </div>
        <button 
          onClick={() => navigate('/success')}
          className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white font-black text-xs rounded hover:bg-sky-700 transition-all uppercase tracking-widest group shadow-md"
        >
          Next: Reliability Simulations
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-sky-100 rounded-2xl p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-sky-600/30" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
              <Search size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-950 uppercase tracking-tight">Comparison Logic Breakdown</h3>
              <p className="text-[10px] text-slate-700 font-mono uppercase">Decoupling Baseline vs AI-Engineered Performance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 font-mono">
              <div className="p-3 bg-sky-50/50 rounded-lg border border-sky-100">
                <h4 className="text-[10px] text-sky-700 font-black uppercase mb-1">How it's compared:</h4>
                <p className="text-[11px] text-slate-800 leading-relaxed font-bold">
                  We ingest the <span className="text-sky-900">Static Metadata</span> of the {rocket.name} and overlay a 
                  <span className="text-sky-900"> dynamic fluid simulation</span>. The baseline (Original) assumes standard 
                  operating procedures, while the "AI Optimized" model utilizes non-linear thrust curves.
                </p>
              </div>
              <div className="p-3 bg-sky-50/50 rounded-lg border border-sky-100">
                <h4 className="text-[10px] text-sky-700 font-black uppercase mb-1">Why it matters:</h4>
                <p className="text-[11px] text-slate-800 leading-relaxed font-bold">
                  Small deltas in fuel consumption (~{optimization.savings.fuel}%) compound into massive payload capacity increases. 
                  By reducing weight early in the flight profile, we gain <span className="text-sky-900">exponential velocity advantages</span>.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-3">
              {[
                { label: 'Propellant Mapping', value: 'Neural Flow', status: 'Active' },
                { label: 'Trajectory Correction', value: 'Real-time', status: 'Pending' },
                { label: 'Thermal Feedback', value: 'Cryo-Linked', status: 'Optimized' }
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-2 bg-white rounded border border-sky-100 shadow-sm">
                  <span className="text-[9px] text-slate-700 font-bold uppercase">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-950 font-bold font-mono">{item.value}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-sky-200 rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-sky-700 mb-4 italic flex items-center gap-2">
              <Info size={14} />
              Mission Clarity
            </h3>
            <p className="text-[11px] text-slate-900 font-mono leading-relaxed mb-6 font-medium">
              The primary objective of this view is to visualize the <span className="text-sky-900 font-black italic">Efficiency Delta</span>. 
              The AI doesn't just "guess"; it recalculates the entire physics model based on the {rocket.fuelType} properties 
              and the {rocket.payload}t load constraint.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-700 uppercase font-black">
              <span>Simulation Fidelity</span>
              <span className="text-slate-900 font-bold">99.9%</span>
            </div>
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-full h-full bg-sky-600 shadow-[0_0_5px_rgba(2,132,199,0.3)]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Model Comparison (Schematic) */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-sky-700">
            <RocketIcon size={14} />
            Structural Vector Comparison
          </h3>
          <div className="grid grid-cols-2 gap-4 h-[350px]">
            <div className="bg-white rounded-xl border border-sky-100 p-8 flex flex-col items-center justify-center relative overflow-hidden group shadow-sm">
              <span className="text-[8px] uppercase font-mono text-slate-700 font-bold absolute top-3 left-4 tracking-tighter">REF_ORIGINAL</span>
              <img src={rocket.imageUrl} alt="Rocket" className="w-full h-full max-h-[300px] object-contain opacity-40 grayscale transition-transform group-hover:scale-105 duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-x-4 bottom-4 space-y-1 opacity-20">
                <div className="h-0.5 bg-slate-400 w-full rounded" />
                <div className="h-0.5 bg-slate-400 w-2/3 rounded" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl border-2 border-sky-500 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-lg bg-[radial-gradient(circle_at_center,_#f0f9ff_0%,_#ffffff_100%)]">
              <span className="text-[8px] uppercase font-mono text-sky-600 absolute top-3 left-4 tracking-tighter">REF_OPTIMIZED</span>
              <img src={rocket.imageUrl} alt="Rocket" className="w-full h-full max-h-[300px] object-contain drop-shadow-[0_0_30px_rgba(2,132,199,0.2)]" referrerPolicy="no-referrer" />
              <div className="absolute inset-x-4 bottom-4 space-y-1">
                <div className="h-0.5 bg-sky-600 w-full rounded shadow-sm" />
                <div className="h-0.5 bg-sky-600 w-[90%] rounded shadow-sm" />
              </div>
              <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-sky-400/20 rounded-full blur-2xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-sky-700">
            <BarChart3 size={14} />
            Heuristic Performance
          </h3>
          <div className="bg-white rounded-xl border border-sky-200 p-4 h-[350px] shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" vertical={false} />
                <XAxis dataKey="name" stroke="#0f172a" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#0f172a" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #bae6fd', borderRadius: '8px', fontSize: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f0f9ff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '10px', textTransform: 'uppercase' }} />
                <Bar dataKey="original" fill="#94a3b8" radius={[2, 2, 0, 0]} name="Baseline" />
                <Bar dataKey="optimized" fill="#0284c7" radius={[2, 2, 0, 0]} name="AI Opt" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-sky-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-orange-700">
              <ShieldAlert size={14} />
              Risk Vector Assessment
            </h3>
            <span className="text-[8px] font-mono text-slate-800 font-bold uppercase">Stability Index: +94.2%</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {optimization.riskFactors.map((risk) => (
              <div key={risk.factor} className="flex items-center gap-4 bg-sky-50/50 p-3 rounded-lg border border-sky-100">
                <div className={`w-1 h-8 rounded-full ${risk.probability > 0.1 ? 'bg-orange-600' : 'bg-emerald-600'}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-tighter">{risk.factor}</span>
                    <span className="text-[9px] font-mono text-slate-700 font-bold uppercase">Prob: {(risk.probability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-0.5 bg-slate-300 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${risk.probability * 100}%` }}
                      className={`h-full ${risk.probability > 0.1 ? 'bg-orange-600' : 'bg-emerald-600'}`} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-sky-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-slate-900">Capital Allocation</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-[9px] font-mono text-slate-700 font-bold uppercase tracking-tighter">
                <span>Optimized Saving</span>
                <span className="text-sky-700 font-black">-{optimization.savings.cost}%</span>
              </div>
              <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costData} layout="vertical" margin={{ left: -40 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" hide />
                    <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={20}>
                      {costData.map((entry, i) => (
                        <Cell key={i} fill={i === 0 ? '#cbd5e1' : '#0284c7'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="p-3 bg-sky-50 rounded-lg border border-sky-100 mt-4">
            <div className="flex items-center gap-2 text-sky-800 mb-1">
              <Info size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">Saving Heuristic</span>
            </div>
            <p className="text-[10px] text-slate-700 leading-tight uppercase font-mono font-bold">AI mining identifies ${((optimization.savings.cost / 100) * 450).toFixed(0)}M in overhead reduction.</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center pt-8">
        <button 
          onClick={() => navigate('/success')}
          className="flex items-center gap-3 px-10 py-4 bg-sky-600 text-white font-black text-sm rounded-full hover:bg-sky-700 transition-all uppercase tracking-[0.2em] group shadow-md"
        >
          Initialize Reliability Scan
          <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
