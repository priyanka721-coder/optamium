/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Target, TrendingDown, Clock, Banknote, ShieldCheck, AlertTriangle, Skull, ChevronRight, Cpu, MapPin, Fuel, Activity } from 'lucide-react';
import { useMission } from '../context/MissionContext';
import MissionReport from './MissionReport';
import { destinations, fuelTypes } from '../rockets';

export default function SuccessAnalysis() {
  const { optimization, selectedRocket: rocket, missionParams } = useMission();
  const navigate = useNavigate();

  if (!optimization || !rocket || !missionParams) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-6 text-center">
        <div className="w-20 h-20 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-400 border border-sky-100">
          <ShieldCheck size={40} />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Safety Protocols Offline</h3>
          <p className="text-xs text-slate-700 max-w-sm font-mono uppercase tracking-widest font-black">Execute mission optimization to activate Monte Carlo reliability simulations</p>
        </div>
        <button 
          onClick={() => navigate('/selection')}
          className="px-6 py-2 border border-sky-300 rounded text-[10px] uppercase font-bold text-sky-600 hover:bg-sky-50 transition-all mt-4 font-mono shadow-sm"
        >
          Select Vessel
        </button>
      </div>
    );
  }

  const destination = destinations.find(d => d.id === missionParams.destination) || destinations[0];
  const fuel = fuelTypes.find(f => f.id === missionParams.fuelType) || fuelTypes[0];

  const cards = [
    { label: 'Success Rate', value: `${(optimization.successRate * 100).toFixed(1)}%`, icon: Target, sub: 'Vessel Reliability' },
    { label: 'Fuel Savings', value: optimization.savings?.fuel !== undefined ? `${optimization.savings.fuel}%` : 'N/A', icon: TrendingDown, sub: 'Resource Optimization' },
    { label: 'Time Reduction', value: optimization.savings?.time !== undefined ? `${optimization.savings.time}%` : 'N/A', icon: Clock, sub: 'Trajectory Advantage' },
    { label: 'Cost Reduction', value: optimization.savings?.cost !== undefined ? `${optimization.savings.cost}%` : 'N/A', icon: Banknote, sub: 'Budget Allocation' },
  ];

  const getReadiness = (sr: number) => {
    if (sr > 0.9) return { label: 'Ready', color: 'bg-green-500', icon: ShieldCheck, desc: 'Mission parameters exceed all safety thresholds. Optimized vectors are stable.' };
    if (sr > 0.7) return { label: 'Needs Testing', color: 'bg-yellow-500', icon: AlertTriangle, desc: 'Primary systems are stable, but secondary heuristics require further simulation.' };
    return { label: 'Unsafe', color: 'bg-red-500', icon: Skull, desc: 'Critical stability error. Structural integrity cannot be guaranteed at this thrust level.' };
  };

  const readiness = getReadiness(optimization.successRate);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Parameter Profile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Vessel', value: rocket.name, img: rocket.imageUrl, icon: Cpu },
          { label: 'Target', value: destination.name, img: destination.imageUrl, icon: MapPin },
          { label: 'Propellant', value: fuel.name, img: fuel.imageUrl, icon: Fuel },
          { label: 'Logistics', value: `${missionParams.duration}D / ${missionParams.payloadWeight}T`, img: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&q=80&w=400', icon: Activity },
        ].map((param) => (
          <div key={param.label} className="bg-white rounded-xl border border-sky-100 overflow-hidden shadow-sm group">
            <div className="h-20 relative overflow-hidden">
              <img src={param.img} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                <param.icon size={12} className="text-sky-600" />
                <span className="text-[8px] font-black uppercase text-slate-800 tracking-widest">{param.label}</span>
              </div>
            </div>
            <div className="px-3 py-2">
              <p className="text-[10px] font-bold text-slate-950 uppercase truncate leading-tight">{param.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-sky-100 p-6 rounded-xl group hover:border-sky-300 transition-all shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-4 group-hover:bg-sky-600 group-hover:text-white transition-all">
              <card.icon size={20} />
            </div>
            <div className="text-[8px] font-mono text-slate-700 font-black uppercase tracking-[0.2em] mb-1">{card.label}</div>
            <div className="text-2xl font-black text-slate-950 mb-1">{card.value}</div>
            <div className="text-[9px] text-slate-800 font-bold uppercase tracking-tighter">{card.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-sky-50/50 border border-sky-100 rounded-xl p-8 overflow-hidden relative group shadow-sm bg-white">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="relative shrink-0">
              <svg className="w-32 h-32 -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                <motion.circle
                  cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="6" fill="transparent"
                  strokeDasharray={2 * Math.PI * 58}
                  initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 58 * (1 - optimization.successRate) }}
                  className="text-sky-600 drop-shadow-sm"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black italic text-slate-950">{(optimization.successRate * 100).toFixed(0)}%</span>
                <span className="text-[7px] font-mono text-slate-700 font-bold tracking-tighter uppercase">Probability</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-sky-800 mb-1">Final Readiness Profile</h3>
                <p className="text-[10px] text-slate-800 font-bold uppercase tracking-widest font-mono">Overall mission feasibility score based on refinements.</p>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded border ${readiness.color.replace('bg-', 'border-')}/50 ${readiness.color.replace('bg-', 'text-')} bg-white shadow-sm`}>
                <readiness.icon size={14} />
                <span className="font-black text-[10px] uppercase tracking-[0.2em]">{readiness.label}</span>
              </div>
              <p className="text-[11px] text-slate-600 italic font-mono leading-relaxed">"{readiness.desc}"</p>
            </div>
          </div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-sky-200/20 rounded-full blur-3xl group-hover:bg-sky-200/40 transition-colors" />
        </div>

        <div className="lg:col-span-4 bg-white border border-sky-100 rounded-xl p-6 space-y-6 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-sky-700">Systemic Risk Failure</h3>
          <div className="space-y-4">
            {(optimization.riskFactors || [
              { factor: 'Propulsion Error', probability: 0.03 },
              { factor: 'Thermal Fracture', probability: 0.02 },
              { factor: 'Path Deviation', probability: 0.01 },
              { factor: 'Signal Decay', probability: 0.04 },
            ]).map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-mono">
                  <span className="text-slate-900 font-bold uppercase tracking-tighter">{item.factor}</span>
                  <span className="text-slate-800 font-black">{(item.probability * 100).toFixed(1)}%</span>
                </div>
                <div className="h-0.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400" style={{ width: `${item.probability * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-sky-50">
            <p className="text-[8px] text-slate-700 font-mono font-bold leading-tight uppercase">
              *Monte carlo pathing: 10M trajectories
            </p>
          </div>
        </div>
        <div className="lg:col-span-12 flex flex-wrap gap-4 mt-8">
          <button 
            onClick={() => navigate('/testing')}
            className="flex items-center gap-3 px-10 py-4 bg-sky-600 text-white font-black text-xs rounded hover:bg-sky-700 transition-all uppercase tracking-[0.2em] group shadow-md"
          >
            Proceed to AI Test Lab
            <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
          <MissionReport />
        </div>
      </div>
    </motion.div>
  );
}
