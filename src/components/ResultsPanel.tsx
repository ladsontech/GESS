import React from 'react';
import { Battery, Zap, Clock, Box, TrendingDown, Gauge, Activity } from 'lucide-react';
import { EnergyResults } from '../types/gess';

interface ResultsPanelProps {
  results: EnergyResults;
  materialName: string;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, materialName }) => {
  const formatEnergy = (joules: number) => {
    if (joules >= 1000000) {
      return `${(joules / 1000000).toFixed(2)} MJ`;
    } else if (joules >= 1000) {
      return `${(joules / 1000).toFixed(2)} kJ`;
    }
    return `${joules.toFixed(2)} J`;
  };

  const formatPower = (watts: number) => {
    if (watts >= 1000000) {
      return `${(watts / 1000000).toFixed(2)} MW`;
    } else if (watts >= 1000) {
      return `${(watts / 1000).toFixed(2)} kW`;
    }
    return `${watts.toFixed(2)} W`;
  };

  const efficiency = (results.recoveredEnergy / results.potentialEnergy) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Analysis Results - {materialName}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Comprehensive energy storage performance metrics
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="text-blue-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Potential Energy</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {formatEnergy(results.potentialEnergy)}
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-orange-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Input Energy</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {formatEnergy(results.inputEnergy)}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-green-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Output Energy</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {formatEnergy(results.outputEnergy)}
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-red-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Power Loss</span>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {formatPower(results.powerLoss)}
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-purple-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Lifespan</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {results.totalLifespan.toLocaleString()} cycles
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Box className="text-amber-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Volume Required</span>
          </div>
          <div className="text-2xl font-bold text-amber-600">
            {results.volumeRequired.toFixed(2)} m³
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="text-indigo-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Project Efficiency</span>
          </div>
          <div className="text-2xl font-bold text-indigo-600">
            {results.projectEfficiency.toFixed(1)}%
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="text-yellow-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Energy Density</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {results.energyDensity.toFixed(1)} kWh/m³
          </div>
        </div>

        <div className="bg-pink-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="text-pink-600" size={20} />
            <span className="text-sm font-medium text-gray-700">Self-Discharge</span>
          </div>
          <div className="text-2xl font-bold text-pink-600">
            {results.selfDischargeRate > 0 ? `${results.selfDischargeRate}%/hr` : 'Zero'}
          </div>
        </div>

        {results.powerOutput && (
          <div className="bg-cyan-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-cyan-600" size={20} />
              <span className="text-sm font-medium text-gray-700">Power Output</span>
            </div>
            <div className="text-lg font-bold text-cyan-600">
              {results.powerOutput.min}-{results.powerOutput.max} kW
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Duration: {results.powerOutput.duration}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">Performance Metrics</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Project Efficiency:</span>
              <span className="font-medium">{results.projectEfficiency.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Energy Density:</span>
              <span className="font-medium">{results.energyDensity.toFixed(1)} kWh/m³</span>
            </div>
            <div className="flex justify-between">
              <span>Degradation Rate:</span>
              <span className="font-medium">{results.degradationRate.toFixed(3)}%/cycle</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3">System Analysis</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Cost Effectiveness:</span>
              <span className="font-medium">{results.costEffectiveness.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Expected Lifespan:</span>
              <span className="font-medium">{results.totalLifespan.toLocaleString()} cycles</span>
            </div>
            <div className="flex justify-between">
              <span>Self-Discharge:</span>
              <span className="font-medium">
                {results.selfDischargeRate > 0 ? `${results.selfDischargeRate}%/hr` : 'Zero Loss'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;