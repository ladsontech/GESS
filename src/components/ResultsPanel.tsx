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
    <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
      <div className="mb-6 border-b-2 border-tech-800 pb-4">
        <h2 className="text-sm font-bold text-tech-100 font-mono tracking-wide">
          ANALYSIS RESULTS - {materialName.toUpperCase()}
        </h2>
        <p className="text-xs text-tech-400 mt-1 font-mono">
          ENERGY STORAGE PERFORMANCE METRICS
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <div className="bg-tech-800 border-2 border-tech-700 rounded p-3 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="text-tech-400" size={16} />
            <span className="text-xs font-mono font-medium text-tech-300">POTENTIAL</span>
          </div>
          <div className="text-xl font-mono font-bold text-tech-100">
            {formatEnergy(results.potentialEnergy)}
          </div>
        </div>

        <div className="bg-tech-800 border-2 border-tech-700 rounded p-3 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-tech-400" size={16} />
            <span className="text-xs font-mono font-medium text-tech-300">INPUT</span>
          </div>
          <div className="text-xl font-mono font-bold text-tech-100">
            {formatEnergy(results.inputEnergy)}
          </div>
        </div>

        <div className="bg-tech-800 border-2 border-tech-700 rounded p-3 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-tech-400" size={16} />
            <span className="text-xs font-mono font-medium text-tech-300">OUTPUT</span>
          </div>
          <div className="text-xl font-mono font-bold text-tech-100">
            {formatEnergy(results.outputEnergy)}
          </div>
        </div>

        <div className="bg-tech-800 border-2 border-tech-700 rounded p-3 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-tech-400" size={16} />
            <span className="text-xs font-mono font-medium text-tech-300">LOSS</span>
          </div>
          <div className="text-xl font-mono font-bold text-tech-100">
            {formatPower(results.powerLoss)}
          </div>
        </div>

        <div className="bg-tech-800 border-2 border-tech-700 rounded p-3 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-tech-400" size={16} />
            <span className="text-xs font-mono font-medium text-tech-300">LIFESPAN</span>
          </div>
          <div className="text-lg font-mono font-bold text-tech-100">
            {results.totalLifespan.toLocaleString()}
          </div>
          <div className="text-xs text-tech-500 font-mono">cycles</div>
        </div>

        <div className="bg-tech-800 border-2 border-tech-700 rounded p-3 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Box className="text-tech-400" size={16} />
            <span className="text-xs font-mono font-medium text-tech-300">VOLUME</span>
          </div>
          <div className="text-xl font-mono font-bold text-tech-100">
            {results.volumeRequired.toFixed(2)}
          </div>
          <div className="text-xs text-tech-500 font-mono">m³</div>
        </div>

        <div className="bg-tech-800 border-2 border-tech-700 rounded p-3 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="text-tech-400" size={16} />
            <span className="text-xs font-mono font-medium text-tech-300">PROJECT EFF</span>
          </div>
          <div className="text-xl font-mono font-bold text-tech-100">
            {results.projectEfficiency.toFixed(1)}%
          </div>
        </div>
        
        <div className="bg-tech-800 border-2 border-tech-700 rounded p-3 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="text-tech-400" size={16} />
            <span className="text-xs font-mono font-medium text-tech-300">DENSITY</span>
          </div>
          <div className="text-xl font-mono font-bold text-tech-100">
            {results.energyDensity.toFixed(1)}
          </div>
          <div className="text-xs text-tech-500 font-mono">kWh/m³</div>
        </div>

        <div className="bg-tech-800 border-2 border-tech-700 rounded p-3 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="text-tech-400" size={16} />
            <span className="text-xs font-mono font-medium text-tech-300">DISCHARGE</span>
          </div>
          <div className="text-xl font-mono font-bold text-tech-100">
            {results.selfDischargeRate > 0 ? `${results.selfDischargeRate}%` : 'ZERO'}
          </div>
          <div className="text-xs text-tech-500 font-mono">per hour</div>
        </div>

        {results.powerOutput && (
          <div className="bg-tech-800 border-2 border-tech-700 rounded p-3 hover:border-tech-600 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-tech-400" size={16} />
              <span className="text-xs font-mono font-medium text-tech-300">POWER</span>
            </div>
            <div className="text-base font-mono font-bold text-tech-100">
              {results.powerOutput.min}-{results.powerOutput.max}
            </div>
            <div className="text-xs text-tech-500 font-mono">
              kW • {results.powerOutput.duration.toUpperCase()}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-tech-800 border border-tech-700 rounded">
          <h3 className="font-mono font-semibold text-tech-200 text-xs mb-3 tracking-wide">PERFORMANCE METRICS</h3>
          <div className="text-xs text-tech-400 font-mono space-y-2">
            <div className="flex justify-between">
              <span>PROJECT EFF:</span>
              <span className="font-medium text-tech-200">{results.projectEfficiency.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>ENERGY DENSITY:</span>
              <span className="font-medium text-tech-200">{results.energyDensity.toFixed(1)} kWh/m³</span>
            </div>
            <div className="flex justify-between">
              <span>DEGRADATION:</span>
              <span className="font-medium text-tech-200">{results.degradationRate.toFixed(3)}%/cycle</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-tech-800 border border-tech-700 rounded">
          <h3 className="font-mono font-semibold text-tech-200 text-xs mb-3 tracking-wide">SYSTEM ANALYSIS</h3>
          <div className="text-xs text-tech-400 font-mono space-y-2">
            <div className="flex justify-between">
              <span>COST INDEX:</span>
              <span className="font-medium text-tech-200">{results.costEffectiveness.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>LIFESPAN:</span>
              <span className="font-medium text-tech-200">{results.totalLifespan.toLocaleString()} cycles</span>
            </div>
            <div className="flex justify-between">
              <span>SELF-DISCHARGE:</span>
              <span className="font-medium text-tech-200">
                {results.selfDischargeRate > 0 ? `${results.selfDischargeRate}%/hr` : 'ZERO'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;