import React, { useState } from 'react';
import { Target, Lightbulb, TrendingUp, Zap, DollarSign, Battery } from 'lucide-react';
import { findOptimalMaterial, calculateScenarioRecommendation } from '../utils/calculations';
import { SCENARIOS } from '../data/materials';

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
  const [selectedPriority, setSelectedPriority] = useState<'efficiency' | 'lifespan' | 'cost' | 'energy_density'>('efficiency');
  const [selectedScenario, setSelectedScenario] = useState<string>('urban_constrained');
  const [recommendation, setRecommendation] = useState<any>(null);
  const [scenarioRecommendation, setScenarioRecommendation] = useState<any>(null);

  const handleGetRecommendation = () => {
    const optimal = findOptimalMaterial(loadMass, height, systemEfficiency, cycles, selectedPriority);
    setRecommendation(optimal);
  };

  const handleScenarioAnalysis = () => {
    const scenario = SCENARIOS[selectedScenario as keyof typeof SCENARIOS];
    const optimal = calculateScenarioRecommendation(scenario, loadMass, height, systemEfficiency, cycles);
    setScenarioRecommendation({ ...optimal, scenario });
  };

  const priorityOptions = [
    { value: 'efficiency', label: 'Maximum Round-Trip Efficiency', icon: TrendingUp, description: 'Optimize for energy recovery' },
    { value: 'energy_density', label: 'Highest Energy Density', icon: Battery, description: 'Maximize energy per volume' },
    { value: 'lifespan', label: 'Longest Operational Lifespan', icon: Target, description: 'Minimize degradation over time' },
    { value: 'cost', label: 'Best Cost Effectiveness', icon: DollarSign, description: 'Optimize cost-benefit ratio' },
  ];

  return (
    <div className="space-y-6">
      {/* Material Optimization */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="text-green-600" size={24} />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Material Optimization</h2>
            <p className="text-sm text-gray-600">Find optimal storage medium based on performance priorities</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Optimization Priority
            </label>
            <div className="space-y-3">
              {priorityOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <label key={option.value} className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="priority"
                      value={option.value}
                      checked={selectedPriority === option.value}
                      onChange={(e) => setSelectedPriority(e.target.value as any)}
                      className="text-blue-600 focus:ring-blue-500 mt-1"
                    />
                    <IconComponent size={18} className="text-gray-600 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-gray-700">{option.label}</span>
                      <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleGetRecommendation}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Get Material Recommendation
          </button>

          {recommendation && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="text-green-600" size={20} />
                <h3 className="font-semibold text-green-800">Recommended Material</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: recommendation.color }}
                  />
                  <span className="font-medium text-gray-800">{recommendation.material}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <div>Round-Trip Efficiency: {recommendation.efficiency.toFixed(1)}%</div>
                    <div>Energy Density: {recommendation.energyDensity.toFixed(1)} kWh/m³</div>
                  </div>
                  <div>
                    <div>Lifespan: {recommendation.lifespan.toLocaleString()} cycles</div>
                    <div>Volume Required: {recommendation.volume.toFixed(2)} m³</div>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-white rounded border">
                  <h4 className="font-medium text-gray-800 mb-2">Analysis Summary</h4>
                  <p className="text-sm text-gray-600">
                    {selectedPriority === 'efficiency' && 
                      `${recommendation.material} offers the highest round-trip efficiency of ${recommendation.efficiency.toFixed(1)}% under current parameters, maximizing energy recovery from each storage cycle.`}
                    {selectedPriority === 'energy_density' && 
                      `${recommendation.material} provides the highest energy density of ${recommendation.energyDensity.toFixed(1)} kWh/m³, making it ideal for space-constrained applications.`}
                    {selectedPriority === 'lifespan' && 
                      `${recommendation.material} provides the longest operational lifespan of ${recommendation.lifespan.toLocaleString()} cycles with minimal degradation over time.`}
                    {selectedPriority === 'cost' && 
                      `${recommendation.material} delivers the best cost-effectiveness ratio of ${recommendation.costEffectiveness.toFixed(2)}, considering energy output, volume requirements, and operational lifespan.`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scenario Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="text-purple-600" size={24} />
          <div>
            <h2 className="text-xl font-bold text-gray-800">Scenario Analysis</h2>
            <p className="text-sm text-gray-600">Analyze optimal materials for specific deployment scenarios</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Deployment Scenario
            </label>
            <div className="space-y-2">
              {Object.entries(SCENARIOS).map(([key, scenario]) => (
                <label key={key} className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="scenario"
                    value={key}
                    checked={selectedScenario === key}
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    className="text-purple-600 focus:ring-purple-500 mt-1"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">{scenario.name}</span>
                    <p className="text-xs text-gray-500 mt-1">{scenario.description}</p>
                    <p className="text-xs text-gray-400 mt-1">Priority: {scenario.priority.replace('_', ' ')}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleScenarioAnalysis}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Analyze Scenario
          </button>

          {scenarioRecommendation && (
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Target className="text-purple-600" size={20} />
                <h3 className="font-semibold text-purple-800">Scenario Recommendation</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: scenarioRecommendation.color }}
                  />
                  <span className="font-medium text-gray-800">{scenarioRecommendation.material}</span>
                  <span className="text-sm text-purple-600">for {scenarioRecommendation.scenario.name}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <div>Efficiency: {scenarioRecommendation.efficiency.toFixed(1)}%</div>
                    <div>Energy Density: {scenarioRecommendation.energyDensity.toFixed(1)} kWh/m³</div>
                  </div>
                  <div>
                    <div>Lifespan: {scenarioRecommendation.lifespan.toLocaleString()} cycles</div>
                    <div>Volume: {scenarioRecommendation.volume.toFixed(2)} m³</div>
                  </div>
                </div>
      </div>
    </div>
  );
};

                <div className="mt-3 p-3 bg-white rounded border">
                  <h4 className="font-medium text-gray-800 mb-2">Scenario Analysis</h4>
                  <p className="text-sm text-gray-600">
                    For {scenarioRecommendation.scenario.description.toLowerCase()}, {scenarioRecommendation.material} is optimal 
                    due to its superior {scenarioRecommendation.scenario.priority.replace('_', ' ')} characteristics. 
                    This material meets the specific constraints and priorities of the {scenarioRecommendation.scenario.name} scenario.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
export default OptimizationPanel;