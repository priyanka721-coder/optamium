/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Cpu, ShieldCheck, Microscope, Database, Workflow, ChevronRight } from 'lucide-react';

export default function AITesting() {
  const navigate = useNavigate();
  const trendData = [
    { name: 'T-100', accuracy: 0.92, precision: 0.90, recall: 0.91 },
    { name: 'T-80', accuracy: 0.94, precision: 0.93, recall: 0.92 },
    { name: 'T-60', accuracy: 0.95, precision: 0.95, recall: 0.94 },
    { name: 'T-40', accuracy: 0.96, precision: 0.95, recall: 0.96 },
    { name: 'T-20', accuracy: 0.97, precision: 0.96, recall: 0.95 },
    { name: 'NOW', accuracy: 0.972, precision: 0.965, recall: 0.958 },
  ];

  const metrics = [
    { label: 'Model Accuracy', value: '97.2%', desc: 'Overall prediction validity' },
    { label: 'Precision Score', value: '96.5%', desc: 'Consistency of results' },
    { label: 'Recall Rate', value: '95.8%', desc: 'Failure identification' },
    { label: 'F1 Harmonic Mean', value: '96.2%', desc: 'Aggregated reliability' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end border-b border-sky-100 pb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-black flex items-center gap-3 text-slate-900 uppercase tracking-tight">
            <Cpu className="text-sky-600" size={28} />
            AI Logic Engine Profile
          </h2>
          <p className="text-[10px] text-slate-900 font-black font-mono uppercase tracking-[0.2em]">Heuristic performance metrics for intergalactic core</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white p-3 rounded-xl border border-sky-200 text-center min-w-[100px] shadow-sm">
            <div className="text-[8px] font-mono text-slate-800 font-bold uppercase tracking-widest mb-0.5">Reliability</div>
            <div className="text-xl font-black text-sky-600">96%</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-sky-200 text-center min-w-[100px] shadow-sm">
            <div className="text-[8px] font-mono text-slate-800 font-bold uppercase tracking-widest mb-0.5">Confidence</div>
            <div className="text-xl font-black text-sky-600">98%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <motion.div 
            key={m.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-4 rounded-xl border border-sky-100 relative overflow-hidden group hover:border-sky-300 transition-all shadow-sm"
          >
            <div className="relative z-10">
              <h3 className="text-[8px] font-mono text-slate-800 font-black uppercase mb-3 tracking-widest">{m.label}</h3>
              <div className="text-2xl font-black text-slate-900 mb-1 italic">{m.value}</div>
              <p className="text-[9px] text-slate-900 font-black uppercase tracking-tighter">{m.desc}</p>
            </div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-sky-50 rounded-full blur-2xl group-hover:bg-sky-100 transition-colors" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white border border-sky-100 rounded-xl p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-sky-700">
              <Workflow size={14} />
              Training Evolution
            </h3>
            <div className="flex gap-4 text-[8px] font-mono uppercase tracking-tighter">
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-sky-600" /> ACCURACY</span>
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> PRECISION</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#1e293b" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#1e293b" fontSize={9} tickLine={false} axisLine={false} domain={[0.85, 1]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '10px', textTransform: 'uppercase' }}
                />
                <Line type="monotone" dataKey="accuracy" stroke="#0284c7" strokeWidth={2} dot={{ fill: '#0284c7', r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="precision" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 3 }} />
                <Line type="monotone" dataKey="recall" stroke="#475569" strokeWidth={1} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white border border-sky-100 rounded-xl p-6 space-y-6 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-sky-700">
            <Database size={14} />
            Data Integrity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-sky-50/50 rounded-lg border border-sky-100">
              <div className="flex items-center gap-2">
                <Microscope className="text-slate-700" size={14} />
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-800">Missions Evaluated</span>
              </div>
              <span className="text-sm font-mono font-black text-slate-950">42,891</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                <h4 className="text-[8px] font-mono text-emerald-600 uppercase mb-0.5">Successful</h4>
                <div className="text-lg font-black italic text-emerald-700">41,682</div>
              </div>
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <h4 className="text-[8px] font-mono text-red-600 uppercase mb-0.5">Failures</h4>
                <div className="text-lg font-black italic text-red-700">1,209</div>
              </div>
            </div>

            <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black flex items-center gap-1.5 text-slate-950 uppercase tracking-widest">
                  <ShieldCheck size={12} className="text-sky-600" />
                  Verifier
                </span>
                <span className="text-[8px] text-emerald-700 font-mono font-black tracking-widest">NOMINAL</span>
              </div>
              <p className="text-[9px] text-slate-900 font-bold leading-relaxed uppercase tracking-tighter">
                Automated adversarial testing validates core heuristics every 2.4s.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={() => navigate('/selection')}
          className="flex items-center gap-3 px-10 py-4 bg-transparent border-2 border-sky-600 text-sky-600 font-black text-sm rounded-full hover:bg-sky-600 hover:text-white transition-all uppercase tracking-[0.2em] group shadow-sm"
        >
          Initialize New Mission
          <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
