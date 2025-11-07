import React from 'react';
import { Sliders, Settings, Info } from 'lucide-react';
import { MATERIALS } from '../data/materials';
import { Material } from '../types/gess';

interface ParameterControlsProps {
  selectedMaterial: Material;
  loadMass: number;
  height: number;
  systemEfficiency: number;
  cycles: number;
  onMaterialChange: (material: Material) => void;
  onLoadMassChange: (mass: number) => void;
  onHeightChange: (height: number) => void;
  onSystemEfficiencyChange: (efficiency: number) => void;
  onCyclesChange: (cycles: number) => void;
}

const MaterialInfo: React.FC<{ material: Material }> = ({ material }) => (
  <div className="mt-2 p-2 bg-white panel-sunken text-xs">
    <div className="flex items-center gap-1 mb-1 border-b border-matlab-border pb-1">
      <Info size={10} className="text-matlab-blue" />
      <span className="font-semibold text-matlab-text text-xs">Material Properties</span>
    </div>
    <div className="space-y-1 text-matlab-text">
      <div>Density: <span className="font-mono font-bold">{material.density}</span> kg/m³</div>
      <div>Efficiency: <span className="font-mono font-bold">{(material.efficiency.min * 100).toFixed(0)}-{(material.efficiency.max * 100).toFixed(0)}%</span></div>
      <div>Lifespan: <span className="font-mono font-bold">{material.lifespanCycles.toLocaleString()}</span> cycles</div>
      <div>Self-discharge: <span className="font-mono font-bold">{material.selfDischargeRate}%/day</span></div>
      <div className="flex flex-wrap gap-1 mt-1">
        {material.properties.map((prop, idx) => (
          <span key={idx} className="px-2 py-0.5 bg-matlab-panel panel-raised text-xs">
            {prop}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ParameterControls: React.FC<ParameterControlsProps> = ({
  selectedMaterial,
  loadMass,
  height,
  systemEfficiency,
  cycles,
  onMaterialChange,
  onLoadMassChange,
  onHeightChange,
  onSystemEfficiencyChange,
  onCyclesChange,
}) => {
  return (
    <div className="bg-matlab-panel panel-sunken p-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-matlab-border">
        <Settings className="text-matlab-blue" size={18} />
        <div>
          <h2 className="text-sm font-bold text-matlab-text">System Parameters</h2>
          <p className="text-xs text-matlab-dark">Configure GESS storage medium and operational parameters</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Material Selection */}
        <div>
          <label className="block text-xs font-semibold text-matlab-text mb-2 pb-1 border-b border-matlab-border">
            Storage Medium Selection
          </label>
          <div className="space-y-2">
            {Object.values(MATERIALS).map((material) => (
              <div
                key={material.name}
                className={`transition-all ${
                  selectedMaterial.name === material.name
                    ? 'bg-blue-100 panel-sunken'
                    : 'bg-white panel-raised hover:bg-gray-50'
                }`}
              >
                <button
                  onClick={() => onMaterialChange(material)}
                  className="w-full p-2 text-left"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 border-2 border-matlab-dark"
                      style={{ backgroundColor: material.color }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-matlab-text">{material.name}</div>
                      <div className="text-xs text-matlab-dark">
                        <span className="font-mono">{material.density}</span> kg/m³ • Cost: {'$'.repeat(material.relativeCost)}
                      </div>
                    </div>
                  </div>
                </button>
                {selectedMaterial.name === material.name && (
                  <MaterialInfo material={material} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Load Mass */}
        <div>
          <label className="block text-xs font-semibold text-matlab-text mb-1">
            Load Mass: <span className="font-mono font-bold">{loadMass.toLocaleString()}</span> kg
          </label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="100"
            value={loadMass}
            onChange={(e) => onLoadMassChange(Number(e.target.value))}
            className="w-full cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-matlab-dark mt-1">
            <span>1,000 kg</span>
            <span>10,000 kg</span>
          </div>
        </div>

        {/* Height */}
        <div>
          <label className="block text-xs font-semibold text-matlab-text mb-1">
            Lift Height: <span className="font-mono font-bold">{height}</span> m (Research Range: 50-200m)
          </label>
          <input
            type="range"
            min="50"
            max="200"
            step="1"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="w-full cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-matlab-dark mt-1">
            <span>50 m</span>
            <span>200 m</span>
          </div>
        </div>

        {/* System Efficiency */}
        <div>
          <label className="block text-xs font-semibold text-matlab-text mb-1">
            System Efficiency: <span className="font-mono font-bold">{systemEfficiency}</span>% (Mechanical losses)
          </label>
          <input
            type="range"
            min="60"
            max="100"
            step="1"
            value={systemEfficiency}
            onChange={(e) => onSystemEfficiencyChange(Number(e.target.value))}
            className="w-full cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-matlab-dark mt-1">
            <span>60%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Cycles */}
        <div>
          <label className="block text-xs font-semibold text-matlab-text mb-1">
            Operating Cycles: <span className="font-mono font-bold">{cycles.toLocaleString()}</span> (Lifetime analysis)
          </label>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={cycles}
            onChange={(e) => onCyclesChange(Number(e.target.value))}
            className="w-full cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-matlab-dark mt-1">
            <span>100</span>
            <span>5,000</span>
          </div>
        </div>
      </div>
      
      {/* Research Sources */}
      <div className="mt-4 p-3 bg-white panel-sunken">
        <h3 className="text-xs font-semibold text-matlab-text mb-2 pb-1 border-b border-matlab-border">Research Sources</h3>
        <div className="text-xs text-matlab-dark space-y-1">
          <div>• IRENA Pumped Hydro Storage Report (2020)</div>
          <div>• Journal of Energy Storage - Granular Materials (2021)</div>
          <div>• ARES Nevada Advanced Rail Technology (2019)</div>
          <div>• IEEE Energy Storage Technologies Review (2022)</div>
        </div>
      </div>
    </div>
  );
};

export default ParameterControls;
