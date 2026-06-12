/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import RocketSelector from './components/RocketSelector';
import OptimizationResults from './components/OptimizationResults';
import ComparisonView from './components/ComparisonView';
import SuccessAnalysis from './components/SuccessAnalysis';
import AITesting from './components/AITesting';
import { useMission } from './context/MissionContext';

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="w-full flex-1 flex flex-col"
  >
    {children}
  </motion.div>
);

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { startOptimization } = useMission();

  const handleStartOptimization = async (rocket: any, params: any) => {
    navigate('/optimization');
    await startOptimization(rocket, params);
  };

  return (
    <div className="bg-sky-50 min-h-screen text-slate-900 font-sans selection:bg-sky-500/30 selection:text-sky-900 flex flex-col">
      <Sidebar />
      
      <main className="pl-20 min-h-screen relative flex flex-col flex-1">
        {/* Header Section */}
        <header className="h-16 px-8 border-b border-sky-200 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10 w-full">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tighter text-sky-600">OPTANIUM</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-800">Intergalactic Mission Optimization</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="px-4 py-1 rounded-full bg-sky-100 border border-sky-200 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span className="text-xs font-mono uppercase text-sky-700">AI Engine: Online</span>
            </div>
            {location.pathname !== '/selection' && (
              <button 
                onClick={() => navigate('/selection')}
                className="px-6 py-2 bg-sky-600 text-white font-bold text-xs rounded hover:bg-sky-700 transition-all uppercase tracking-wider shadow-sm"
              >
                Start Optimization
              </button>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,_#e0f2fe_0%,_#f0f9ff_100%)]" />
          
          <div className="absolute inset-0 -z-10 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  opacity: Math.random() * 0.3
                }}
                animate={{ 
                  y: [null, "-10%"],
                  opacity: [null, 0.4, 0.2]
                }}
                transition={{ 
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute w-1.5 h-1.5 bg-sky-400 rounded-full blur-[1px]"
              />
            ))}
          </div>

          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-200/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-300/10 rounded-full blur-[100px] -z-10" />

          <div className="max-w-7xl mx-auto px-8 py-8 w-full flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              <div key={location.pathname} className="flex-1 flex flex-col">
                <Routes location={location}>
                  <Route path="/" element={
                    <PageTransition>
                      <Hero onStart={() => navigate('/selection')} />
                    </PageTransition>
                  } />
                  
                  <Route path="/selection" element={
                    <PageTransition>
                      <RocketSelector onOptimize={handleStartOptimization} />
                    </PageTransition>
                  } />

                  <Route path="/optimization" element={
                    <PageTransition>
                      <OptimizationResults />
                    </PageTransition>
                  } />

                  <Route path="/comparison" element={
                    <PageTransition>
                      <ComparisonView />
                    </PageTransition>
                  } />

                  <Route path="/success" element={
                    <PageTransition>
                      <SuccessAnalysis />
                    </PageTransition>
                  } />

                  <Route path="/testing" element={
                    <PageTransition>
                      <AITesting />
                    </PageTransition>
                  } />
                </Routes>
              </div>
            </AnimatePresence>
          </div>
        </div>

        {/* Global Footer Stats */}
        <footer className="h-8 bg-white border-t border-sky-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex space-x-6 text-[9px] font-mono text-slate-700 uppercase tracking-widest">
            <span>System v2.4.1</span>
            <span>Kernel_Lat: 0.12ms</span>
            <span>GPU_Load: 44%</span>
          </div>
          <div className="flex space-x-4 text-[9px] font-mono text-sky-600">
            <span>LAT: 45.1232° N</span>
            <span>LONG: 122.3423° W</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
