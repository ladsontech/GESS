import React from 'react';
import { Battery, Zap, TrendingUp, Clock } from 'lucide-react';
import { calculateProjectEnergy, simulateSelfDischarge } from '../utils/calculations';
import { Material } from '../types/gess';

interface EfficiencyDashboardProps {
  material: Material;
  loadMass: number;
  height: number;
  timeElapsed?: number;
}

const EfficiencyDashboard: React.FC<EfficiencyDashboardProps> = ({
  material,
  loadMass,
  height,
  timeElapsed = 1
}) => {
  const projectEnergy = calculateProjectEnergy(loadMass, height, material);
  const energyAfterDischarge = simulateSelfDischarge(projectEnergy.output, material, timeElapsed);

  const formatEnergy = (kwh: number) => {
    if (kwh >= 1) {
      return `${kwh.toFixed(2)} kWh`;
    } else {
      return `${(kwh * 1000).toFixed(0)} Wh`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <TrendingUp className="text-blue-600" size={24} />
          Energy Metrics Dashboard
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {loadMass.toLocaleString()} kg @ {height}m using {material.name}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="text-blue-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Potential</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {formatEnergy(projectEnergy.potential)}
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-red-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Input (Lift)</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {formatEnergy(projectEnergy.input)}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-green-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Output (Gen)</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {formatEnergy(energyAfterDischarge)}
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-purple-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Efficiency</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {projectEnergy.efficiency.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Self-Discharge Indicator */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Clock size={18} />
          Self-Discharge Analysis
        </h3>
        
        {material.name === 'Water' ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Evaporation Effect</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-red-600">
                {material.selfDischargeRate}%/hr loss
              </div>
              <div className="text-xs text-gray-500">
                After {timeElapsed}h: {formatEnergy(energyAfterDischarge)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Solid Material</span>
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 font-medium">
              Zero Loss
            </div>
          </div>
        )}
      </div>

      {/* Power Output Characteristics */}
      {material.powerOutput && (
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Power Output Characteristics</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-800">
                {material.powerOutput.min}-{material.powerOutput.max}
              </div>
              <div className="text-xs text-gray-600">kW Range</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">
                {material.powerOutput.duration}
              </div>
              <div className="text-xs text-gray-600">Duration</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">
                {material.name}
              </div>
              <div className="text-xs text-gray-600">Material</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EfficiencyDashboard;