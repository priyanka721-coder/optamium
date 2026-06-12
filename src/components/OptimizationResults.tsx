/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Zap, Wind, Shield, Settings, Activity, ChevronRight } from 'lucide-react';
import { useMission } from '../context/MissionContext';

export default function OptimizationResults() {
  const { isOptimizing, optimization, selectedRocket: rocket } = useMission();
  const navigate = useNavigate();

  if (isOptimizing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="w-32 h-32 border-4 border-dashed border-sky-500 rounded-full"
          />
          <Cpu className="absolute inset-0 m-auto text-sky-600 animate-pulse" size={48} />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold tracking-widest uppercase mb-2 text-slate-900">Analyzing Interstellar Vector</h3>
          <p className="text-slate-700 font-mono text-sm uppercase font-black">QUANTUM ENGINE SIMULATION IN PROGRESS...</p>
        </div>
      </div>
    );
  }

  if (!optimization || !rocket) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center border-2 border-dashed border-sky-300/30 rounded-3xl p-12 bg-white/50 shadow-inner">
        <Activity className="text-sky-600 mb-4" size={64} />
        <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Wait for Analysis</h3>
        <p className="text-slate-800 max-w-sm mt-2 font-mono text-[10px] uppercase font-black">Select a rocket and destination to begin the AI optimization sequence.</p>
      </div>
    );
  }

  const suggestions = [
    { title: 'Engine Upgrades', icon: Zap, items: optimization.engineUpdates },
    { title: 'Fuel Optimization', icon: Wind, items: [optimization.fuelOptimization] },
    { title: 'Material', icon: Shield, items: optimization.materialImprovements },
    { title: 'Structures', icon: Settings, items: optimization.structuralModifications },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-sky-200 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-2 py-0.5 bg-sky-600 text-white text-[8px] font-black uppercase tracking-tighter rounded">AI SUGGESTED</span>
            <h2 className="text-xl font-black tracking-tight uppercase text-slate-900">Optimization Report</h2>
          </div>
          <p className="text-[10px] text-slate-900 font-mono uppercase tracking-widest font-bold">Heuristic refinements for {rocket.name} vector</p>
        </div>
        <div className="flex gap-6 text-right font-mono">
          <div>
            <div className="text-[9px] text-slate-900 font-bold uppercase mb-0.5">Fuel Sav.</div>
            <div className="text-2xl font-black text-sky-600">{optimization.savings?.fuel ? `-${optimization.savings.fuel}%` : 'N/A'}</div>
          </div>
          <div>
            <div className="text-[9px] text-slate-900 font-bold uppercase mb-0.5">Time Red.</div>
            <div className="text-2xl font-black text-sky-600">{optimization.savings?.time ? `-${optimization.savings.time}%` : 'N/A'}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {suggestions.map((card, idx) => (
          <motion.div 
            key={card.title} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-sky-100 p-4 rounded-xl hover:border-sky-300 transition-all group shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all">
                <card.icon size={16} />
              </div>
              <h3 className="font-black text-[10px] uppercase tracking-wider text-slate-950">{card.title}</h3>
            </div>
            <ul className="space-y-1.5">
              {card.items?.map((item, i) => (
                <li key={i} className="text-[10px] text-slate-900 font-medium flex gap-2 leading-relaxed">
                  <span className="text-sky-600 select-none">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="bg-white border border-sky-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-sky-50 px-4 py-3 border-b border-sky-100 flex justify-between items-center">
          <h3 className="font-black uppercase tracking-widest text-[10px] flex items-center gap-2 text-sky-700">
            <Settings size={12} />
            Differential Vector Table
          </h3>
          <span className="text-[8px] font-mono text-slate-800 font-bold">KERNEL_REF: 4.2.0</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-sky-50 text-[9px] font-mono uppercase text-slate-900 font-black">
                <th className="px-6 py-3 font-bold">Metric Parameter</th>
                <th className="px-6 py-3 font-bold">Standard</th>
                <th className="px-6 py-3 font-bold">Optimized</th>
                <th className="px-6 py-3 font-bold text-right">Delta %</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {[
                { label: 'Fuel Load', orig: optimization.original.fuelUsage, opt: optimization.optimized.fuelUsage, unit: 'T' },
                { label: 'Sortie Duration', orig: optimization.original.duration, opt: optimization.optimized.duration, unit: 'D' },
                { label: 'Effective Thrust', orig: optimization.original.thrust, opt: optimization.optimized.thrust, unit: 'kN' },
                { label: 'Payload Integrity', orig: optimization.original.payload, opt: optimization.optimized.payload, unit: 'T' },
                { label: 'Vector Efficiency', orig: optimization.original.efficiency, opt: optimization.optimized.efficiency, unit: '%' },
              ].map((row) => (
                <tr key={row.label} className="border-b border-sky-50 hover:bg-sky-50/50 transition-colors">
                  <td className="px-6 py-3 font-bold text-slate-700 uppercase tracking-tighter text-[10px]">{row.label}</td>
                  <td className="px-6 py-3 text-slate-800 font-mono text-[10px] font-bold">{row.orig.toLocaleString()}{row.unit}</td>
                  <td className="px-6 py-3 text-sky-600 font-black font-mono text-[11px]">{row.opt.toLocaleString()}{row.unit}</td>
                  <td className={`px-6 py-3 text-right font-mono text-[10px] font-bold ${row.opt > row.orig ? 'text-emerald-600' : 'text-sky-600'}`}>
                    {row.opt > row.orig ? '+' : ''}{(((row.opt - row.orig) / row.orig) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={() => navigate('/comparison')}
          className="flex items-center gap-3 px-10 py-4 bg-sky-600 text-white font-black text-sm rounded-lg hover:bg-sky-700 transition-all uppercase tracking-[0.2em] group shadow-md"
        >
          Analyze Performance Deltas
          <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
