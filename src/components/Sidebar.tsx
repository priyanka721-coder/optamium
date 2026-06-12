/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rocket, Cpu, BarChart3, ShieldCheck, Zap, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Sidebar() {
  const menuItems = [
    { id: '', label: 'Home', icon: Home },
    { id: 'selection', label: 'Vessel', icon: Rocket },
    { id: 'optimization', label: 'Optimize', icon: Zap },
    { id: 'comparison', label: 'Stats', icon: BarChart3 },
    { id: 'success', label: 'Safety', icon: ShieldCheck },
    { id: 'testing', label: 'Core', icon: Cpu },
  ];

  return (
    <nav className="w-20 bg-white border-r border-sky-100 h-screen fixed left-0 top-0 z-20 flex flex-col items-center py-6 space-y-8 shadow-sm">
      <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center shadow-md mb-4 group cursor-pointer hover:bg-sky-500 transition-colors">
        <Zap className="text-white fill-white w-6 h-6" />
      </div>

      <div className="flex flex-col space-y-4 flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            title={item.label}
            className={({ isActive }) => cn(
              "p-3 rounded-lg transition-all duration-200 group relative",
              isActive 
                ? "bg-sky-50 text-sky-600 border border-sky-200 shadow-sm" 
                : "text-slate-700 hover:bg-sky-50 hover:text-sky-600"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={24} className={cn("transition-colors", isActive ? "text-sky-600" : "group-hover:text-sky-700")} />
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-sky-600 rounded-r-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="mt-auto opacity-80 hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 rounded border border-slate-900 flex items-center justify-center text-[8px] font-mono font-black text-slate-950">
          V2.4
        </div>
      </div>
    </nav>
  );
}
