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
    <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
      <div className="mb-6 border-b-2 border-tech-800 pb-4">
        <h2 className="text-lg font-bold text-tech-100 flex items-center gap-3 font-mono tracking-wide">
          <div className="p-1.5 bg-tech-800 border-2 border-tech-600 rounded">
            <TrendingUp className="text-tech-400" size={20} />
          </div>
          ENERGY METRICS DASHBOARD
        </h2>
        <p className="text-xs text-tech-400 mt-2 ml-11 font-mono">
          LOAD: <span className="text-tech-200">{loadMass.toLocaleString()}</span> kg • 
          HEIGHT: <span className="text-tech-200">{height}</span>m • 
          MATERIAL: <span className="text-tech-200">{material.name.toUpperCase()}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-tech-800 border-2 border-tech-700 rounded p-4 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Battery className="text-tech-400" size={18} />
            <span className="text-xs font-mono font-semibold text-tech-300">POTENTIAL</span>
          </div>
          <div className="text-2xl font-mono font-bold text-tech-100">
            {formatEnergy(projectEnergy.potential)}
          </div>
        </div>

        <div className="bg-tech-800 border-2 border-tech-700 rounded p-4 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-tech-400" size={18} />
            <span className="text-xs font-mono font-semibold text-tech-300">INPUT (LIFT)</span>
          </div>
          <div className="text-2xl font-mono font-bold text-tech-100">
            {formatEnergy(projectEnergy.input)}
          </div>
        </div>

        <div className="bg-tech-800 border-2 border-tech-700 rounded p-4 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-tech-400" size={18} />
            <span className="text-xs font-mono font-semibold text-tech-300">OUTPUT (GEN)</span>
          </div>
          <div className="text-2xl font-mono font-bold text-tech-100">
            {formatEnergy(energyAfterDischarge)}
          </div>
        </div>

        <div className="bg-tech-800 border-2 border-tech-700 rounded p-4 hover:border-tech-600 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-tech-400" size={18} />
            <span className="text-xs font-mono font-semibold text-tech-300">EFFICIENCY</span>
          </div>
          <div className="text-2xl font-mono font-bold text-tech-100">
            {projectEnergy.efficiency.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Self-Discharge Indicator */}
      <div className="bg-tech-800 border-2 border-tech-700 rounded p-4">
        <h3 className="font-mono font-semibold text-tech-200 text-xs mb-3 flex items-center gap-2 tracking-wide">
          <Clock size={16} />
          SELF-DISCHARGE ANALYSIS
        </h3>
        
        {material.name === 'Water' ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-sm animate-pulse"></div>
              <span className="text-xs text-tech-300 font-mono">EVAPORATION EFFECT</span>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-medium text-tech-200">
                {material.selfDischargeRate}%/HR LOSS
              </div>
              <div className="text-xs text-tech-400 font-mono">
                {timeElapsed}H: {formatEnergy(energyAfterDischarge)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
              <span className="text-xs text-tech-300 font-mono">SOLID MATERIAL</span>
            </div>
            <div className="inline-flex items-center px-2 py-1 border border-tech-600 rounded text-xs bg-tech-900 text-tech-200 font-mono">
              ZERO LOSS
            </div>
          </div>
        )}
      </div>

      {/* Power Output Characteristics */}
      {material.powerOutput && (
        <div className="mt-4 bg-tech-800 border-2 border-tech-700 rounded p-4">
          <h3 className="font-mono font-semibold text-tech-200 text-xs mb-3 tracking-wide">POWER OUTPUT CHARACTERISTICS</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-base font-mono font-bold text-tech-100">
                {material.powerOutput.min}-{material.powerOutput.max}
              </div>
              <div className="text-xs text-tech-400 font-mono">kW RANGE</div>
            </div>
            <div>
              <div className="text-base font-mono font-bold text-tech-100">
                {material.powerOutput.duration.toUpperCase()}
              </div>
              <div className="text-xs text-tech-400 font-mono">DURATION</div>
            </div>
            <div>
              <div className="text-base font-mono font-bold text-tech-100">
                {material.name.toUpperCase()}
              </div>
              <div className="text-xs text-tech-400 font-mono">MATERIAL</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EfficiencyDashboard;