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
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 border border-blue-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <TrendingUp className="text-white" size={24} />
          </div>
          Energy Metrics Dashboard
        </h2>
        <p className="text-sm text-gray-600 mt-2 ml-14">
          {loadMass.toLocaleString()} kg @ {height}m using <span className="font-semibold text-blue-600">{material.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 card-hover cursor-pointer border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Battery className="text-blue-600" size={22} />
            <span className="text-sm font-semibold text-gray-700">Potential</span>
          </div>
          <div className="text-3xl font-bold text-blue-700">
            {formatEnergy(projectEnergy.potential)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 card-hover cursor-pointer border border-red-200">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-red-600" size={22} />
            <span className="text-sm font-semibold text-gray-700">Input (Lift)</span>
          </div>
          <div className="text-3xl font-bold text-red-700">
            {formatEnergy(projectEnergy.input)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 card-hover cursor-pointer border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-green-600" size={22} />
            <span className="text-sm font-semibold text-gray-700">Output (Gen)</span>
          </div>
          <div className="text-3xl font-bold text-green-700">
            {formatEnergy(energyAfterDischarge)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 card-hover cursor-pointer border border-purple-200">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-purple-600" size={22} />
            <span className="text-sm font-semibold text-gray-700">Efficiency</span>
          </div>
          <div className="text-3xl font-bold text-purple-700">
            {projectEnergy.efficiency.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Self-Discharge Indicator */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-5 border border-gray-200">
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
        <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
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