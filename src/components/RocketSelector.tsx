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
        destination: selectedDestination.name,
        fuelType: selectedFuelType.name,
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
        <div className="lg:col-span-4 space-y-6 bg-white p-6 rounded-xl border border-sky-100 self-start shadow-sm">
          <h3 className="text-xs font-bold text-sky-600 uppercase tracking-wider flex items-center gap-2">
            <MapPin size={14} />
            Target Protocols
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-24 w-full rounded-lg overflow-hidden relative border border-sky-100 bg-slate-50">
                <img 
                  src={selectedDestination.imageUrl} 
                  alt={selectedDestination.name}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <p className="text-[10px] font-bold text-slate-800 uppercase">{selectedDestination.name}</p>
                </div>
              </div>
              <label className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">Destination Vector</label>
              <select 
                className="w-full bg-sky-50 border border-sky-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-500 transition-all font-mono text-slate-800"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
              >
                {destinations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-mono text-slate-700 uppercase tracking-widest leading-none flex justify-between">
                <span>Duration Protocol</span>
                <span className="text-sky-600">Selection Required</span>
              </label>
              <select 
                className="w-full bg-sky-50 border border-sky-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-500 transition-all font-mono text-slate-800"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
              >
                {durations.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-mono text-slate-700 uppercase tracking-widest leading-none flex justify-between">
                <span>Payload Capacity</span>
                <span className="text-sky-600">Protocol Set</span>
              </label>
              <select 
                className="w-full bg-sky-50 border border-sky-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-500 transition-all font-mono text-slate-800"
                value={payload}
                onChange={(e) => setPayload(parseInt(e.target.value))}
              >
                {payloadWeights.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-sky-50 border border-sky-100 rounded-lg">
                <div className="w-8 h-8 rounded bg-white overflow-hidden flex-shrink-0 border border-sky-100">
                  <img src={selectedFuelType.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] text-sky-700 font-black uppercase tracking-widest">Selected Fuel</p>
                  <p className="text-[10px] text-slate-900 font-mono">{selectedFuelType.name}</p>
                </div>
              </div>
              <label className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">Fuel Synthesis</label>
              <select 
                className="w-full bg-sky-50 border border-sky-200 rounded-lg p-2 text-xs focus:outline-none focus:border-sky-500 transition-all font-mono text-slate-800"
                value={fuelTypeId}
                onChange={(e) => setFuelTypeId(e.target.value)}
              >
                {fuelTypes.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
          </div>

          <button
            disabled={!selectedRocket}
            onClick={handleNext}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-sky-600 text-white font-bold text-xs rounded transition-all hover:bg-sky-700 disabled:opacity-50 disabled:grayscale uppercase tracking-widest shadow-md"
          >
            Execute Optimized Sortie
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
