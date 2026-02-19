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
    <div className="bg-matlab-panel panel-sunken p-4">
      <div className="mb-4 pb-3 border-b-2 border-matlab-border">
        <h2 className="text-base font-bold text-matlab-text flex items-center gap-2">
          <div className="p-1 bg-matlab-panel panel-raised">
            <TrendingUp className="text-matlab-blue" size={18} />
          </div>
          Energy Metrics Dashboard
        </h2>
        <p className="text-xs text-matlab-dark mt-1 ml-8">
          Load: <span className="font-mono font-bold">{loadMass.toLocaleString()}</span> kg •
          Height: <span className="font-mono font-bold">{height}</span>m •
          Material: <span className="font-bold">{material.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div className="bg-white panel-sunken p-3">
          <div className="flex items-center gap-2 mb-1">
            <Battery className="text-matlab-blue" size={16} />
            <span className="text-xs font-semibold text-matlab-text">Potential</span>
          </div>
          <div className="text-xl font-mono font-bold text-matlab-text">
            {formatEnergy(projectEnergy.potential)}
          </div>
        </div>

        <div className="bg-white panel-sunken p-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="text-matlab-blue" size={16} />
            <span className="text-xs font-semibold text-matlab-text">Input (Lift)</span>
          </div>
          <div className="text-xl font-mono font-bold text-matlab-text">
            {formatEnergy(projectEnergy.input)}
          </div>
          <div className="text-xs text-matlab-dark mt-0.5">η<sub>lift</sub> = {projectEnergy.liftEfficiency.toFixed(1)}%</div>
        </div>

        <div className="bg-white panel-sunken p-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="text-green-700" size={16} />
            <span className="text-xs font-semibold text-matlab-text">Output (Gen)</span>
          </div>
          <div className="text-xl font-mono font-bold text-matlab-text">
            {formatEnergy(energyAfterDischarge)}
          </div>
          <div className="text-xs text-matlab-dark mt-0.5">η<sub>gen</sub> = {projectEnergy.generationEfficiency.toFixed(1)}%</div>
        </div>

        <div className="bg-white panel-sunken p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="text-green-700" size={16} />
            <span className="text-xs font-semibold text-matlab-text">Round-Trip η</span>
          </div>
          <div className="text-xl font-mono font-bold text-matlab-text">
            {projectEnergy.efficiency.toFixed(1)}%
          </div>
          <div className="text-xs text-matlab-dark mt-0.5">η<sub>lift</sub> × η<sub>gen</sub></div>
        </div>
      </div>

      {/* Self-Discharge Indicator */}
      <div className="bg-white panel-sunken p-3">
        <h3 className="font-semibold text-matlab-text text-xs mb-2 flex items-center gap-2 border-b border-matlab-border pb-2">
          <Clock size={14} />
          Self-Discharge Analysis
        </h3>

        {material.name === 'Water' ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 border border-red-700"></div>
              <span className="text-xs text-matlab-text">Evaporation Effect</span>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-medium text-red-700">
                {material.selfDischargeRate}%/hr loss
              </div>
              <div className="text-xs text-matlab-dark">
                After {timeElapsed}h: {formatEnergy(energyAfterDischarge)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 border border-green-700"></div>
              <span className="text-xs text-matlab-text">Solid Material</span>
            </div>
            <div className="inline-flex items-center px-2 py-1 bg-green-100 border border-green-600 text-xs text-green-800 font-semibold">
              Zero Loss
            </div>
          </div>
        )}
      </div>

      {/* Power Output Characteristics */}
      {material.powerOutput && (
        <div className="mt-3 bg-white panel-sunken p-3">
          <h3 className="font-semibold text-matlab-text text-xs mb-2 border-b border-matlab-border pb-2">Power Output Characteristics</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-matlab-panel panel-raised p-2">
              <div className="text-sm font-mono font-bold text-matlab-text">
                {material.powerOutput.min}-{material.powerOutput.max}
              </div>
              <div className="text-xs text-matlab-dark">kW Range</div>
            </div>
            <div className="bg-matlab-panel panel-raised p-2">
              <div className="text-sm font-mono font-bold text-matlab-text">
                {material.powerOutput.duration}
              </div>
              <div className="text-xs text-matlab-dark">Duration</div>
            </div>
            <div className="bg-matlab-panel panel-raised p-2">
              <div className="text-sm font-bold text-matlab-text">
                {material.name}
              </div>
              <div className="text-xs text-matlab-dark">Material</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EfficiencyDashboard;