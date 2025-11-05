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
    <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-xl p-6 border border-teal-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-teal-500 rounded-lg">
          <Target className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Material Optimization</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-base font-semibold text-gray-800 mb-4">Optimization Priority</h3>
          <div className="grid grid-cols-1 gap-3">
            {priorities.map((priority) => {
              const Icon = priority.icon;
              return (
                <button
                  key={priority.key}
                  onClick={() => setSelectedPriority(priority.key)}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    selectedPriority === priority.key
                      ? 'border-teal-500 bg-teal-50 shadow-md'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50/50'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${priority.color}`} />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-gray-800">{priority.label}</div>
                    {selectedPriority === priority.key && (
                      <div className="text-xs text-teal-600 mt-1">Selected</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleGetRecommendation}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-4 px-6 rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl font-semibold text-base"
        >
          Get Recommendation
        </button>

        {recommendation && (
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-5 border-2 border-teal-200 animate-fadeIn">
            <h4 className="font-bold text-teal-900 mb-4 text-lg">Recommended Material: {recommendation.material.toUpperCase()}</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/60 rounded-lg p-3">
                <span className="text-xs text-gray-600 font-medium">Energy Density:</span>
                <div className="font-bold text-teal-700 text-lg">{recommendation.energyDensity.toFixed(2)} kWh/m³</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <span className="text-xs text-gray-600 font-medium">Efficiency:</span>
                <div className="font-bold text-teal-700 text-lg">{(recommendation.efficiency * 100).toFixed(1)}%</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <span className="text-xs text-gray-600 font-medium">Expected Lifespan:</span>
                <div className="font-bold text-teal-700 text-lg">{recommendation.lifespan.toLocaleString()}</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <span className="text-xs text-gray-600 font-medium">Cost Factor:</span>
                <div className="font-bold text-teal-700 text-lg">{recommendation.costFactor}</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-xl p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3 text-sm">Research Sources</h4>
          <ul className="text-xs text-gray-600 space-y-2">
            <li>• IRENA Pumped Hydro Storage Systems (2020)</li>
            <li>• Journal of Energy Storage - Granular Materials (2021)</li>
            <li>• ARES Nevada Advanced Rail Technology (2019)</li>
            <li>• IEEE Energy Storage Technologies Review (2022)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};