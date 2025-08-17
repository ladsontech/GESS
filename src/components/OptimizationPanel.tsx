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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-800">Material Optimization</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Optimization Priority</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {priorities.map((priority) => {
              const Icon = priority.icon;
              return (
                <button
                  key={priority.key}
                  onClick={() => setSelectedPriority(priority.key)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedPriority === priority.key
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-2 ${priority.color}`} />
                  <div className="text-sm font-medium text-gray-700">{priority.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleGetRecommendation}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Get Recommendation
        </button>

        {recommendation && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Recommended Material: {recommendation.material.toUpperCase()}</h4>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-sm text-gray-600">Energy Density:</span>
                <div className="font-medium">{recommendation.energyDensity.toFixed(2)} kWh/m³</div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Efficiency:</span>
                <div className="font-medium">{(recommendation.efficiency * 100).toFixed(1)}%</div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Expected Lifespan:</span>
                <div className="font-medium">{recommendation.lifespan.toLocaleString()} cycles</div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Cost Factor:</span>
                <div className="font-medium">{recommendation.costFactor}</div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{recommendation.reasoning}</p>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Research Sources</h4>
          <ul className="text-xs text-blue-700 space-y-1">
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