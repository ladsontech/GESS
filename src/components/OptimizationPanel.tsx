import React, { useState } from 'react';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';
import { findOptimalMaterial } from '../utils/calculations';

interface OptimizationPanelProps {
  loadMass: number;
  height: number;
  systemEfficiency: number;
  cycles: number;
}

const OptimizationPanel: React.FC<OptimizationPanelProps> = ({
  loadMass,
  height,
  systemEfficiency,
  cycles,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<'efficiency' | 'lifespan' | 'cost'>('efficiency');
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleGetRecommendation = () => {
    const optimal = findOptimalMaterial(loadMass, height, systemEfficiency, cycles, selectedPriority);
    setRecommendation(optimal);
  };


  const priorityOptions = [
    { value: 'efficiency', label: 'Maximum Efficiency', icon: TrendingUp },
    { value: 'lifespan', label: 'Longest Lifespan', icon: Target },
    { value: 'cost', label: 'Cost Effectiveness', icon: Lightbulb },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="text-green-600" size={24} />
        <h2 className="text-xl font-bold text-gray-800">Material Optimization</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Optimization Priority
          </label>
          <div className="space-y-2">
            {priorityOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={option.value}
                    checked={selectedPriority === option.value}
                    onChange={(e) => setSelectedPriority(e.target.value as any)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <IconComponent size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleGetRecommendation}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Get Recommendation
        </button>

        {recommendation && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="text-green-600" size={20} />
              <h3 className="font-semibold text-green-800">Recommended Material</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: recommendation.color }}
                />
                <span className="font-medium text-gray-800">{recommendation.material}</span>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <div>Efficiency: {recommendation.efficiency.toFixed(1)}%</div>
                <div>Lifespan: {recommendation.lifespan.toLocaleString()} cycles</div>
                <div>Volume Required: {recommendation.volume.toFixed(2)} m³</div>
                <div>Cost Effectiveness: {recommendation.costEffectiveness.toFixed(2)}</div>
              </div>

              <div className="mt-3 p-3 bg-white rounded border">
                <h4 className="font-medium text-gray-800 mb-2">Why this material?</h4>
                <p className="text-sm text-gray-600">
                  {selectedPriority === 'efficiency' && 
                    `${recommendation.material} offers the highest energy recovery efficiency of ${recommendation.efficiency.toFixed(1)}% under current parameters.`}
                  {selectedPriority === 'lifespan' && 
                    `${recommendation.material} provides the longest operational lifespan of ${recommendation.lifespan.toLocaleString()} cycles before significant degradation.`}
                  {selectedPriority === 'cost' && 
                    `${recommendation.material} delivers the best cost-effectiveness ratio considering energy output, volume requirements, and operational lifespan.`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizationPanel;