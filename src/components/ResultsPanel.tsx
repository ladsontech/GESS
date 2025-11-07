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
    <div className="bg-matlab-panel panel-sunken p-4">
      <div className="mb-4 pb-3 border-b-2 border-matlab-border">
        <h2 className="text-sm font-bold text-matlab-text">
          Analysis Results - {materialName}
        </h2>
        <p className="text-xs text-matlab-dark mt-1">
          Comprehensive energy storage performance metrics
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
        <div className="bg-white panel-sunken p-2">
          <div className="flex items-center gap-1 mb-1">
            <Battery className="text-matlab-blue" size={14} />
            <span className="text-xs font-semibold text-matlab-text">Potential Energy</span>
          </div>
          <div className="text-base font-mono font-bold text-matlab-text">
            {formatEnergy(results.potentialEnergy)}
          </div>
        </div>

        <div className="bg-white panel-sunken p-2">
          <div className="flex items-center gap-1 mb-1">
            <Zap className="text-red-600" size={14} />
            <span className="text-xs font-semibold text-matlab-text">Input Energy</span>
          </div>
          <div className="text-base font-mono font-bold text-matlab-text">
            {formatEnergy(results.inputEnergy)}
          </div>
        </div>

        <div className="bg-white panel-sunken p-2">
          <div className="flex items-center gap-1 mb-1">
            <Zap className="text-green-700" size={14} />
            <span className="text-xs font-semibold text-matlab-text">Output Energy</span>
          </div>
          <div className="text-base font-mono font-bold text-matlab-text">
            {formatEnergy(results.outputEnergy)}
          </div>
        </div>

        <div className="bg-white panel-sunken p-2">
          <div className="flex items-center gap-1 mb-1">
            <Zap className="text-red-600" size={14} />
            <span className="text-xs font-semibold text-matlab-text">Power Loss</span>
          </div>
          <div className="text-base font-mono font-bold text-matlab-text">
            {formatPower(results.powerLoss)}
          </div>
        </div>

        <div className="bg-white panel-sunken p-2">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="text-matlab-blue" size={14} />
            <span className="text-xs font-semibold text-matlab-text">Lifespan</span>
          </div>
          <div className="text-sm font-mono font-bold text-matlab-text">
            {results.totalLifespan.toLocaleString()}
          </div>
          <div className="text-xs text-matlab-dark">cycles</div>
        </div>

        <div className="bg-white panel-sunken p-2">
          <div className="flex items-center gap-1 mb-1">
            <Box className="text-matlab-blue" size={14} />
            <span className="text-xs font-semibold text-matlab-text">Volume Required</span>
          </div>
          <div className="text-base font-mono font-bold text-matlab-text">
            {results.volumeRequired.toFixed(2)}
          </div>
          <div className="text-xs text-matlab-dark">m³</div>
        </div>

        <div className="bg-white panel-sunken p-2">
          <div className="flex items-center gap-1 mb-1">
            <Gauge className="text-green-700" size={14} />
            <span className="text-xs font-semibold text-matlab-text">Project Efficiency</span>
          </div>
          <div className="text-base font-mono font-bold text-matlab-text">
            {results.projectEfficiency.toFixed(1)}%
          </div>
        </div>
        
        <div className="bg-white panel-sunken p-2">
          <div className="flex items-center gap-1 mb-1">
            <Gauge className="text-matlab-blue" size={14} />
            <span className="text-xs font-semibold text-matlab-text">Energy Density</span>
          </div>
          <div className="text-base font-mono font-bold text-matlab-text">
            {results.energyDensity.toFixed(1)}
          </div>
          <div className="text-xs text-matlab-dark">kWh/m³</div>
        </div>

        <div className="bg-white panel-sunken p-2">
          <div className="flex items-center gap-1 mb-1">
            <TrendingDown className="text-red-600" size={14} />
            <span className="text-xs font-semibold text-matlab-text">Self-Discharge</span>
          </div>
          <div className="text-base font-mono font-bold text-matlab-text">
            {results.selfDischargeRate > 0 ? `${results.selfDischargeRate}%` : 'Zero'}
          </div>
          <div className="text-xs text-matlab-dark">per hour</div>
        </div>

        {results.powerOutput && (
          <div className="bg-white panel-sunken p-2">
            <div className="flex items-center gap-1 mb-1">
              <Activity className="text-matlab-blue" size={14} />
              <span className="text-xs font-semibold text-matlab-text">Power Output</span>
            </div>
            <div className="text-sm font-mono font-bold text-matlab-text">
              {results.powerOutput.min}-{results.powerOutput.max}
            </div>
            <div className="text-xs text-matlab-dark">
              kW • {results.powerOutput.duration}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 bg-white panel-sunken">
          <h3 className="font-semibold text-matlab-text text-xs mb-2 border-b border-matlab-border pb-1">Performance Metrics</h3>
          <div className="text-xs text-matlab-text space-y-1">
            <div className="flex justify-between">
              <span>Project Efficiency:</span>
              <span className="font-mono font-bold">{results.projectEfficiency.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Energy Density:</span>
              <span className="font-mono font-bold">{results.energyDensity.toFixed(1)} kWh/m³</span>
            </div>
            <div className="flex justify-between">
              <span>Degradation Rate:</span>
              <span className="font-mono font-bold">{results.degradationRate.toFixed(3)}%/cycle</span>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-white panel-sunken">
          <h3 className="font-semibold text-matlab-text text-xs mb-2 border-b border-matlab-border pb-1">System Analysis</h3>
          <div className="text-xs text-matlab-text space-y-1">
            <div className="flex justify-between">
              <span>Cost Effectiveness:</span>
              <span className="font-mono font-bold">{results.costEffectiveness.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Expected Lifespan:</span>
              <span className="font-mono font-bold">{results.totalLifespan.toLocaleString()} cycles</span>
            </div>
            <div className="flex justify-between">
              <span>Self-Discharge:</span>
              <span className="font-mono font-bold">
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
