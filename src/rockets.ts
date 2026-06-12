/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rocket, Destination, FuelType } from './types';

export const rockets: Rocket[] = [
  {
    id: 'falcon-heavy',
    name: 'Falcon Heavy',
    type: 'rocket',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=60&w=800',
    engineDetails: '27 Merlin 1D engines',
    fuelCapacity: 450,
    payloadCapacity: 63.8,
    thrust: 22819,
    efficiency: 88,
    baseReliability: 0.98,
  },
  {
    id: 'starship',
    name: 'Starship',
    type: 'rocket',
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=60&w=800',
    engineDetails: 'Raptor Vacuum Engines (3x SL, 3x Vac)',
    fuelCapacity: 1200,
    payloadCapacity: 150,
    thrust: 72000,
    efficiency: 92,
    baseReliability: 0.95,
  },
  {
    id: 'sls',
    name: 'SLS',
    type: 'rocket',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=60&w=800',
    engineDetails: '4 RS-25 engines + 2 Solid Rocket Boosters',
    fuelCapacity: 980,
    payloadCapacity: 95,
    thrust: 39000,
    efficiency: 85,
    baseReliability: 0.99,
  },
  {
    id: 'ariane-6',
    name: 'Ariane 6',
    type: 'rocket',
    imageUrl: 'https://images.unsplash.com/photo-1454789548928-142511478201?auto=format&fit=crop&q=60&w=800',
    engineDetails: 'Vulcain 2.1 + Vinci engines',
    fuelCapacity: 250,
    payloadCapacity: 21.6,
    thrust: 1350,
    efficiency: 82,
    baseReliability: 0.97,
  },
  {
    id: 'new-glenn',
    name: 'New Glenn',
    type: 'rocket',
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=60&w=800',
    engineDetails: '7 BE-4 engines',
    fuelCapacity: 600,
    payloadCapacity: 45,
    thrust: 17000,
    efficiency: 89,
    baseReliability: 0.96,
  },
  {
    id: 'starlink-v2',
    name: 'Starlink V2.0',
    type: 'satellite',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=60&w=800',
    engineDetails: 'Krypton Ion Thrusters',
    fuelCapacity: 50,
    payloadCapacity: 0.8,
    thrust: 0.5,
    efficiency: 99,
    baseReliability: 0.99,
  },
  {
    id: 'jwst',
    name: 'James Webb (JWST)',
    type: 'satellite',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=60&w=800',
    engineDetails: 'MRE-1 Monopropellant Engines',
    fuelCapacity: 150,
    payloadCapacity: 6.5,
    thrust: 10,
    efficiency: 95,
    baseReliability: 0.999,
  },
];

export const destinations: Destination[] = [
  {
    id: 'mars',
    name: 'Mars (Valles Marineris)',
    imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bac4?auto=format&fit=crop&q=80&w=800',
    description: 'The Red Planet, focused on the massive canyon system Valles Marineris.'
  },
  {
    id: 'europa',
    name: 'Europa (Jovian Moon)',
    imageUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?auto=format&fit=crop&q=80&w=800',
    description: 'Jupiter\'s icy moon, suspected to harbor a subsurface liquid water ocean.'
  },
  {
    id: 'titan',
    name: 'Titan (Saturnian Moon)',
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=60&w=800',
    description: 'Saturn\'s largest moon with a thick atmosphere and liquid methane lakes.'
  },
  {
    id: 'alpha-centauri',
    name: 'Alpha Centauri (Proxima b)',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=60&w=800',
    description: 'The closest star system, targeting the Earth-sized planet Proxima b.'
  },
  {
    id: 'kepler-186f',
    name: 'Kepler-186f (Exoplanet)',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    description: 'An Earth-sized planet orbiting a red dwarf star 500 light-years away.'
  },
  {
    id: 'luhman-16',
    name: 'Luhman 16 (Brown Dwarf)',
    imageUrl: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=800',
    description: 'The closest brown dwarf system, consisting of two sub-stellar objects.'
  },
];

export const fuelTypes: FuelType[] = [
  {
    id: 'rp1',
    name: 'RP-1 / LOX',
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=400',
    description: 'Standard kerosene and liquid oxygen refined for high-thrust rocket engines.'
  },
  {
    id: 'lh2',
    name: 'Liquid Hydrogen / LOX',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400',
    description: 'Efficient high-energy fuel used by major upper stages and deep-space missions.'
  },
  {
    id: 'methalox',
    name: 'Methane / LOX (Methalox)',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=400',
    description: 'Next-generation fuel designed for reusability and Mars-local manufacturing.'
  },
  {
    id: 'nuclear',
    name: 'Nuclear Thermal',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=400',
    description: 'Experimental high-efficiency propulsion using nuclear reactors to heat propellant.'
  },
  {
    id: 'ion',
    name: 'Ion Propulsion',
    imageUrl: 'https://images.unsplash.com/photo-1628126235206-5260b9ea6441?auto=format&fit=crop&q=80&w=400',
    description: 'Ultra-efficient electric propulsion for long-duration deep space exploration.'
  },
  {
    id: 'plasma',
    name: 'Plasma Propulsion',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=400',
    description: 'Advanced electromagnetic propulsion for high-velocity interplanetary transit.'
  },
];

export const durations = [
  { label: 'Short (90 Days)', value: 90 },
  { label: 'Medium (180 Days)', value: 180 },
  { label: 'Standard (365 Days)', value: 365 },
  { label: 'Extended (730 Days)', value: 730 },
  { label: 'Long Range (1825 Days)', value: 1825 },
];

export const payloadWeights = [
  { label: 'Light (5 Tons)', value: 5 },
  { label: 'Medium (25 Tons)', value: 25 },
  { label: 'Heavy (50 Tons)', value: 50 },
  { label: 'Massive (100 Tons)', value: 100 },
  { label: 'Super Heavy (200 Tons)', value: 200 },
];
