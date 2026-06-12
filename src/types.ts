/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Rocket {
  id: string;
  name: string;
  type: 'rocket' | 'satellite';
  imageUrl: string;
  engineDetails: string;
  fuelCapacity: number; // in metric tons
  payloadCapacity: number; // in metric tons
  thrust: number; // in kN
  efficiency: number; // ISP or generic efficiency score 0-100
  baseReliability: number; // 0-1
}

export interface Destination {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface FuelType {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface MissionParams {
  destination: string;
  fuelType: string;
  duration: number; // days
  payloadWeight: number; // metric tons
}

export interface OptimizationResult {
  engineUpdates: string[];
  fuelOptimization: string;
  materialImprovements: string[];
  structuralModifications: string[];
  payloadBalancing: string;
  trajectoryOptimization: string;
  
  original: {
    fuelUsage: number;
    duration: number;
    efficiency: number;
    thrust: number;
    payload: number;
  };
  optimized: {
    fuelUsage: number;
    duration: number;
    efficiency: number;
    thrust: number;
    payload: number;
  };
  
  riskFactors: {
    factor: string;
    probability: number; // 0-1
  }[];
  
  successRate: number; // 0-1
  savings: {
    fuel: number; // percentage
    time: number; // percentage
    cost: number; // percentage
  };
}

export interface AIMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  reliability: number;
  confidence: number;
  missionsTested: number;
  successfulPredictions: number;
  failedPredictions: number;
}
