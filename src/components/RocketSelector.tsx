/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Weight, Clock, Fuel, Rocket as RocketIcon, ChevronRight } from 'lucide-react';
import { rockets, destinations, fuelTypes, durations, payloadWeights } from '../rockets';
import { Rocket, MissionParams } from '../types';

interface RocketSelectorProps {
  onOptimize: (rocket: Rocket, params: MissionParams) => void;
}

export default function RocketSelector({ onOptimize }: RocketSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRocket, setSelectedRocket] = useState<Rocket | null>(null);
  const [destinationId, setDestinationId] = useState(destinations[0].id);
  const [fuelTypeId, setFuelTypeId] = useState(fuelTypes[0].id);
  const [duration, setDuration] = useState(durations[2].value);
  const [payload, setPayload] = useState(payloadWeights[2].value);
  const [sortBy, setSortBy] = useState<'name' | 'payload' | 'reliability'>('name');

  const selectedDestination = destinations.find(d => d.id === destinationId) || destinations[0];
  const selectedFuelType = fuelTypes.find(f => f.id === fuelTypeId) || fuelTypes[0];

  const sortedRockets = [...rockets].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'payload') return b.payloadCapacity - a.payloadCapacity;
    if (sortBy === 'reliability') return b.baseReliability - a.baseReliability;
    return 0;
  });

  const filteredRockets = sortedRockets.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (selectedRocket) {
      onOptimize(selectedRocket, {
        destination: selectedDestination.id,
        fuelType: selectedFuelType.id,
        duration,
        payloadWeight: payload,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-sky-700 uppercase">Mission Parameters</h2>
          <p className="text-xs text-slate-900 mt-1 uppercase tracking-widest font-mono">Select vessel and vector protocols</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Vessel Selection */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-600 transition-colors" size={16} />
              <input 
                type="text"
                placeholder="Search registry..."
                className="w-full bg-white border border-sky-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-sky-500 transition-all text-xs text-slate-900 placeholder:text-slate-500 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-mono text-slate-900 font-bold uppercase">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-sky-50 border border-sky-200 rounded px-2 py-1.5 text-[10px] text-slate-700 focus:outline-none focus:border-sky-500"
              >
                <option value="name">NAME</option>
                <option value="payload">PAYLOAD</option>
                <option value="reliability">RELIABILITY</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredRockets.map((rocket, idx) => (
              <motion.button
                key={rocket.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (idx % 10) * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedRocket(rocket)}
                className={`flex flex-col text-left rounded-xl overflow-hidden border transition-all ${
                  selectedRocket?.id === rocket.id 
                    ? 'border-sky-500 bg-sky-50 shadow-md ring-2 ring-sky-200' 
                    : 'border-sky-100 bg-white hover:border-sky-300 shadow-sm'
                }`}
              >
                <div className="h-32 relative overflow-hidden bg-slate-100">
                  <img 
                    src={rocket.imageUrl} 
                    alt={rocket.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-sky-600 text-white rounded text-[8px] font-black uppercase">
                    {rocket.type}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm mb-1 text-slate-900">{rocket.name}</h3>
                  <div className="text-[10px] text-slate-700 flex items-center gap-2 mb-2">
                    <RocketIcon size={10} />
                    {rocket.engineDetails}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[9px] uppercase font-mono text-slate-800">
                    <div className="flex justify-between">FUEL <span className="text-sky-700 font-bold">{rocket.fuelCapacity}T</span></div>
                    <div className="flex justify-between pl-2 border-l border-slate-200">PAYLOAD <span className="text-sky-700 font-bold">{rocket.payloadCapacity}T</span></div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Param Details */}
        <div className="lg:col-span-4 space-y-6 self-start">
          {/* Destination Gallery */}
          <div className="bg-white p-5 rounded-xl border border-sky-100 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] flex items-center gap-2">
              <MapPin size={14} strokeWidth={3} />
              Orbit Destination
            </h3>
            
            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar snap-x">
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => setDestinationId(dest.id)}
                  className={`flex-shrink-0 w-28 group snap-start transition-all ${
                    destinationId === dest.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className={`h-28 rounded-lg overflow-hidden border-2 mb-2 transition-all ${
                    destinationId === dest.id ? 'border-sky-500 shadow-md ring-2 ring-sky-100' : 'border-slate-100'
                  }`}>
                    <img 
                      src={dest.imageUrl} 
                      alt={dest.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className={`text-[8px] font-bold uppercase tracking-tight text-center leading-tight ${
                    destinationId === dest.id ? 'text-sky-700' : 'text-slate-600'
                  }`}>
                    {dest.name.split(' ')[0]}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Fuel Synthesis Grid */}
          <div className="bg-white p-5 rounded-xl border border-sky-100 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] flex items-center gap-2">
              <Fuel size={14} strokeWidth={3} />
              Propellant Mix
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {fuelTypes.map((fuel) => (
                <button
                  key={fuel.id}
                  onClick={() => setFuelTypeId(fuel.id)}
                  className={`relative p-2 rounded-lg border flex items-center gap-2 transition-all ${
                    fuelTypeId === fuel.id 
                      ? 'border-sky-500 bg-sky-50 shadow-sm' 
                      : 'border-slate-100 bg-slate-50 hover:border-sky-200'
                  }`}
                >
                  <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
                    <img src={fuel.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className={`text-[8px] font-bold uppercase tracking-tighter text-left ${
                    fuelTypeId === fuel.id ? 'text-sky-700' : 'text-slate-600'
                  }`}>
                    {fuel.name.replace(' / LOX', '').replace(' (Methalox)', '')}
                  </span>
                  {fuelTypeId === fuel.id && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Logistics Configuration */}
          <div className="bg-white p-5 rounded-xl border border-sky-100 shadow-sm space-y-5">
            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                <Clock size={14} strokeWidth={3} />
                Mission Window
              </h3>
              <div className="flex gap-2">
                {durations.slice(0, 3).map((d) => (
                  <button 
                    key={d.value}
                    onClick={() => setDuration(d.value)}
                    className={`flex-1 py-2 rounded text-[10px] font-bold transition-all border ${
                      duration === d.value 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {d.value}D
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                <Weight size={14} strokeWidth={3} />
                Payload Mass
              </h3>
              <div className="flex gap-2">
                {[5, 25, 50, 100].map((w) => (
                  <button 
                    key={w}
                    onClick={() => setPayload(w)}
                    className={`flex-1 py-2 rounded text-[10px] font-bold transition-all border ${
                      payload === w 
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {w}T
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!selectedRocket}
              onClick={handleNext}
              className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-sky-600 text-white font-black text-xs rounded hover:bg-sky-700 disabled:opacity-50 disabled:grayscale uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95 group"
            >
              Execute Optimized Sortie
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
