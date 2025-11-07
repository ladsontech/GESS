import React, { useState } from 'react';
import { Target, Award, DollarSign, TrendingUp } from 'lucide-react';
import { MATERIALS } from '../data/materials';
import { findOptimalMaterial } from '../utils/calculations';

interface OptimizationPanelProps {
  loadMass: number;
  height: number;
  systemEfficiency: number;
  cycles: number;
}

export const OptimizationPanel: React.FC<OptimizationPanelProps> = ({
  loadMass,
  height,
  systemEfficiency,
  cycles
}) => {
  const [selectedPriority, setSelectedPriority] = useState<'efficiency' | 'lifespan' | 'cost'>('efficiency');
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleGetRecommendation = () => {
    const result = findOptimalMaterial(loadMass, height, systemEfficiency, cycles, selectedPriority);
    setRecommendation(result);
  };

  const priorities = [
    { key: 'efficiency' as const, label: 'Maximum Efficiency', icon: TrendingUp, color: 'text-green-600' },
    { key: 'lifespan' as const, label: 'Longest Lifespan', icon: Award, color: 'text-blue-600' },
    { key: 'cost' as const, label: 'Cost Effectiveness', icon: DollarSign, color: 'text-purple-600' }
  ];

  return (
    <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
      <div className="flex items-center gap-3 mb-6 border-b-2 border-tech-800 pb-4">
        <div className="p-1.5 bg-tech-800 border-2 border-tech-600 rounded">
          <Target className="w-5 h-5 text-tech-400" />
        </div>
        <h2 className="text-sm font-bold text-tech-100 font-mono tracking-wide">MATERIAL OPTIMIZATION</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-mono font-semibold text-tech-300 mb-4 tracking-wide">OPTIMIZATION PRIORITY</h3>
          <div className="grid grid-cols-1 gap-2">
            {priorities.map((priority) => {
              const Icon = priority.icon;
              return (
                <button
                  key={priority.key}
                  onClick={() => setSelectedPriority(priority.key)}
                  className={`p-3 rounded border-2 transition-all flex items-center gap-3 ${
                    selectedPriority === priority.key
                      ? 'border-tech-500 bg-tech-800'
                      : 'border-tech-700 hover:border-tech-600 bg-tech-800/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 text-tech-400`} />
                  <div className="text-left">
                    <div className="text-xs font-mono font-semibold text-tech-100">{priority.label.toUpperCase()}</div>
                    {selectedPriority === priority.key && (
                      <div className="text-xs text-tech-400 mt-1 font-mono">▸ SELECTED</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleGetRecommendation}
          className="w-full bg-tech-800 border-2 border-tech-600 text-tech-100 py-3 px-6 rounded hover:bg-tech-700 hover:border-tech-500 transition-all font-mono font-semibold text-sm tracking-wide"
        >
          GET RECOMMENDATION
        </button>

        {recommendation && (
          <div className="bg-tech-800 border-2 border-tech-600 rounded p-4 animate-fadeIn">
            <h4 className="font-mono font-bold text-tech-100 mb-4 text-xs tracking-wide">RECOMMENDED: {recommendation.material.toUpperCase()}</h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-tech-900 border border-tech-700 rounded p-3">
                <span className="text-xs text-tech-400 font-mono">DENSITY:</span>
                <div className="font-mono font-bold text-tech-100 text-base">{recommendation.energyDensity.toFixed(2)}</div>
                <div className="text-xs text-tech-500 font-mono">kWh/m³</div>
              </div>
              <div className="bg-tech-900 border border-tech-700 rounded p-3">
                <span className="text-xs text-tech-400 font-mono">EFFICIENCY:</span>
                <div className="font-mono font-bold text-tech-100 text-base">{(recommendation.efficiency * 100).toFixed(1)}%</div>
              </div>
              <div className="bg-tech-900 border border-tech-700 rounded p-3">
                <span className="text-xs text-tech-400 font-mono">LIFESPAN:</span>
                <div className="font-mono font-bold text-tech-100 text-base">{recommendation.lifespan.toLocaleString()}</div>
                <div className="text-xs text-tech-500 font-mono">cycles</div>
              </div>
              <div className="bg-tech-900 border border-tech-700 rounded p-3">
                <span className="text-xs text-tech-400 font-mono">COST:</span>
                <div className="font-mono font-bold text-tech-100 text-base">{recommendation.costFactor}</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-tech-800 border border-tech-700 rounded p-4">
          <h4 className="font-mono font-semibold text-tech-300 mb-3 text-xs tracking-wide">RESEARCH SOURCES</h4>
          <ul className="text-xs text-tech-500 font-mono space-y-1">
            <li>▸ IRENA PUMPED HYDRO (2020)</li>
            <li>▸ J. ENERGY STORAGE (2021)</li>
            <li>▸ ARES NEVADA RAIL TECH (2019)</li>
            <li>▸ IEEE STORAGE REVIEW (2022)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};