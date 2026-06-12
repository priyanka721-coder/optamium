import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Rocket, MissionParams, OptimizationResult } from '../types';

interface MissionContextType {
  selectedRocket: Rocket | null;
  missionParams: MissionParams | null;
  optimization: OptimizationResult | null;
  isOptimizing: boolean;
  setSelectedRocket: (rocket: Rocket | null) => void;
  setMissionParams: (params: MissionParams | null) => void;
  setOptimization: (opt: OptimizationResult | null) => void;
  setIsOptimizing: (loading: boolean) => void;
  startOptimization: (rocket: Rocket, params: MissionParams) => Promise<void>;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: ReactNode }) {
  const [selectedRocket, setSelectedRocket] = useState<Rocket | null>(null);
  const [missionParams, setMissionParams] = useState<MissionParams | null>(null);
  const [optimization, setOptimization] = useState<OptimizationResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const startOptimization = async (rocket: Rocket, params: MissionParams) => {
    setSelectedRocket(rocket);
    setMissionParams(params);
    setIsOptimizing(true);

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rocket, mission: params }),
      });
      
      const isSimulation = response.headers.get('X-Optimization-Source') === 'simulation';
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setOptimization({ ...data, isSimulation });
    } catch (error) {
      console.error('Optimization failed:', error);
      setOptimization(null);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <MissionContext.Provider value={{
      selectedRocket,
      missionParams,
      optimization,
      isOptimizing,
      setSelectedRocket,
      setMissionParams,
      setOptimization,
      setIsOptimizing,
      startOptimization
    }}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMission() {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
}
