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
    { key: 'efficiency' as const, label: 'Maximum Efficiency', icon: TrendingUp, color: 'text-green-700' },
    { key: 'lifespan' as const, label: 'Longest Lifespan', icon: Award, color: 'text-matlab-blue' },
    { key: 'cost' as const, label: 'Cost Effectiveness', icon: DollarSign, color: 'text-red-700' }
  ];

  return (
    <div className="bg-matlab-panel panel-sunken p-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-matlab-border">
        <div className="p-1 bg-matlab-panel panel-raised">
          <Target className="w-5 h-5 text-matlab-blue" />
        </div>
        <h2 className="text-sm font-bold text-matlab-text">Material Optimization</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-matlab-text mb-2 pb-1 border-b border-matlab-border">Optimization Priority</h3>
          <div className="grid grid-cols-1 gap-2">
            {priorities.map((priority) => {
              const Icon = priority.icon;
              return (
                <button
                  key={priority.key}
                  onClick={() => setSelectedPriority(priority.key)}
                  className={`p-2 transition-all flex items-center gap-2 ${
                    selectedPriority === priority.key
                      ? 'bg-blue-100 panel-sunken'
                      : 'bg-white panel-raised hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${priority.color}`} />
                  <div className="text-left">
                    <div className="text-xs font-semibold text-matlab-text">{priority.label}</div>
                    {selectedPriority === priority.key && (
                      <div className="text-xs text-matlab-blue">Selected</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleGetRecommendation}
          className="w-full bg-matlab-blue text-white py-3 px-4 panel-raised hover:bg-matlab-darkblue transition-all font-semibold text-sm"
          style={{ borderColor: '#004C6D' }}
        >
          Get Recommendation
        </button>

        {recommendation && (
          <div className="bg-white panel-sunken p-3 animate-fadeIn">
            <h4 className="font-bold text-matlab-text mb-3 text-sm border-b border-matlab-border pb-2">
              Recommended Material: {recommendation.material.toUpperCase()}
            </h4>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-matlab-panel panel-raised p-2">
                <span className="text-xs text-matlab-dark">Energy Density:</span>
                <div className="font-mono font-bold text-matlab-text text-sm">{recommendation.energyDensity.toFixed(2)} kWh/m³</div>
              </div>
              <div className="bg-matlab-panel panel-raised p-2">
                <span className="text-xs text-matlab-dark">Efficiency:</span>
                <div className="font-mono font-bold text-matlab-text text-sm">{(recommendation.efficiency * 100).toFixed(1)}%</div>
              </div>
              <div className="bg-matlab-panel panel-raised p-2">
                <span className="text-xs text-matlab-dark">Expected Lifespan:</span>
                <div className="font-mono font-bold text-matlab-text text-sm">{recommendation.lifespan.toLocaleString()}</div>
              </div>
              <div className="bg-matlab-panel panel-raised p-2">
                <span className="text-xs text-matlab-dark">Cost Factor:</span>
                <div className="font-mono font-bold text-matlab-text text-sm">{recommendation.costFactor}</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white panel-sunken p-3">
          <h4 className="font-semibold text-matlab-text mb-2 text-xs pb-1 border-b border-matlab-border">Research Sources</h4>
          <ul className="text-xs text-matlab-dark space-y-1">
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
