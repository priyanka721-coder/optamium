/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Rocket, Zap } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-xl border border-sky-100"
      >
        <Zap className="text-sky-600 w-12 h-12 fill-sky-200" />
      </motion.div>

      <h1 className="text-7xl font-bold tracking-tighter mb-4 text-slate-900">
        OPT<span className="text-sky-600">ANIUM</span>
      </h1>
      
      <p className="text-xl text-slate-900 max-w-2xl mb-12 leading-relaxed">
        AI-Powered Intergalactic Mission Optimization Platform. 
        Analyze parameters to reduce travel time, fuel consumption, and operational cost 
        for deep space exploration.
      </p>

      <button
        onClick={onStart}
        className="group relative px-10 py-4 bg-transparent border-2 border-sky-600 text-sky-600 font-black uppercase tracking-widest transition-all hover:bg-sky-600 hover:text-white overflow-hidden rounded-lg shadow-sm"
      >
        <div className="absolute inset-0 bg-sky-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative z-10 flex items-center gap-2">
          Start Optimization
          <Rocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
        </span>
      </button>
      
      <div className="mt-24 grid grid-cols-3 gap-12 max-w-4xl w-full border-t border-sky-100 pt-12">
        <div className="text-left">
          <div className="text-sky-600 font-mono text-xl mb-1 italic">01.</div>
          <h3 className="font-bold mb-2 text-slate-900">Select Vessel</h3>
          <p className="text-sm text-slate-800 font-mono uppercase text-[10px]">Choose from Starship, Falcon Heavy, and more.</p>
        </div>
        <div className="text-left">
          <div className="text-sky-600 font-mono text-xl mb-1 italic">02.</div>
          <h3 className="font-bold mb-2 text-slate-900">Configure Mission</h3>
          <p className="text-sm text-slate-800 font-mono uppercase text-[10px]">Define destinations and payload parameters.</p>
        </div>
        <div className="text-left">
          <div className="text-sky-600 font-mono text-xl mb-1 italic">03.</div>
          <h3 className="font-bold mb-2 text-slate-900">AI Optimization</h3>
          <p className="text-sm text-slate-800 font-mono uppercase text-[10px]">Iterative refinement for peak efficiency.</p>
        </div>
      </div>
    </motion.div>
  );
}
