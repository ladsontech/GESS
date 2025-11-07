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
  <div className="mt-2 p-3 bg-tech-800 border border-tech-700 rounded text-xs">
    <div className="flex items-center gap-1 mb-2">
      <Info size={12} className="text-tech-400" />
      <span className="font-mono font-medium text-tech-300">MATERIAL PROPERTIES</span>
    </div>
    <div className="space-y-1 text-tech-400 font-mono">
      <div>DENSITY: <span className="text-tech-200">{material.density}</span> kg/m³</div>
      <div>EFFICIENCY: <span className="text-tech-200">{(material.efficiency.min * 100).toFixed(0)}-{(material.efficiency.max * 100).toFixed(0)}%</span></div>
      <div>LIFESPAN: <span className="text-tech-200">{material.lifespanCycles.toLocaleString()}</span> cycles</div>
      <div>SELF-DISCHARGE: <span className="text-tech-200">{material.selfDischargeRate}%/day</span></div>
      <div className="flex flex-wrap gap-1 mt-2">
        {material.properties.map((prop, idx) => (
          <span key={idx} className="px-2 py-1 bg-tech-900 border border-tech-600 text-tech-300 rounded text-xs">
            {prop.toUpperCase()}
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
    <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
      <div className="flex items-center gap-2 mb-6 border-b-2 border-tech-800 pb-4">
        <Settings className="text-tech-400" size={20} />
        <div>
          <h2 className="text-sm font-bold text-tech-100 font-mono tracking-wide">SYSTEM PARAMETERS</h2>
          <p className="text-xs text-tech-400 font-mono">CONFIGURE STORAGE MEDIUM & OPERATIONS</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Material Selection */}
        <div>
          <label className="block text-xs font-mono font-medium text-tech-300 mb-3 tracking-wide">
            STORAGE MEDIUM SELECTION
          </label>
          <div className="space-y-2">
            {Object.values(MATERIALS).map((material) => (
              <div
                key={material.name}
                className={`border-2 rounded transition-all ${
                  selectedMaterial.name === material.name
                    ? 'border-tech-500 bg-tech-800'
                    : 'border-tech-700 hover:border-tech-600 bg-tech-800/50'
                }`}
              >
                <button
                  onClick={() => onMaterialChange(material)}
                  className="w-full p-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: material.color }}
                    />
                    <div>
                      <div className="text-xs font-mono font-medium text-tech-100">{material.name.toUpperCase()}</div>
                      <div className="text-xs text-tech-400 font-mono">
                        {material.density} kg/m³ • COST: {'$'.repeat(material.relativeCost)}
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
          <label className="block text-xs font-mono font-medium text-tech-300 mb-2 tracking-wide">
            LOAD MASS: <span className="text-tech-100">{loadMass.toLocaleString()}</span> kg
          </label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="100"
            value={loadMass}
            onChange={(e) => onLoadMassChange(Number(e.target.value))}
            className="w-full h-2 rounded appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-tech-500 mt-1 font-mono">
            <span>1K</span>
            <span>10K</span>
          </div>
        </div>

        {/* Height */}
        <div>
          <label className="block text-xs font-mono font-medium text-tech-300 mb-2 tracking-wide">
            LIFT HEIGHT: <span className="text-tech-100">{height}</span> m
          </label>
          <input
            type="range"
            min="50"
            max="200"
            step="1"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="w-full h-2 rounded appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-tech-500 mt-1 font-mono">
            <span>50m</span>
            <span>200m</span>
          </div>
        </div>

        {/* System Efficiency */}
        <div>
          <label className="block text-xs font-mono font-medium text-tech-300 mb-2 tracking-wide">
            SYSTEM EFFICIENCY: <span className="text-tech-100">{systemEfficiency}</span>%
          </label>
          <input
            type="range"
            min="60"
            max="100"
            step="1"
            value={systemEfficiency}
            onChange={(e) => onSystemEfficiencyChange(Number(e.target.value))}
            className="w-full h-2 rounded appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-tech-500 mt-1 font-mono">
            <span>60%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Cycles */}
        <div>
          <label className="block text-xs font-mono font-medium text-tech-300 mb-2 tracking-wide">
            OPERATING CYCLES: <span className="text-tech-100">{cycles.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={cycles}
            onChange={(e) => onCyclesChange(Number(e.target.value))}
            className="w-full h-2 rounded appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-tech-500 mt-1 font-mono">
            <span>100</span>
            <span>5K</span>
          </div>
        </div>
      </div>
      
      {/* Research Sources */}
      <div className="mt-6 p-4 bg-tech-800 border border-tech-700 rounded">
        <h3 className="text-xs font-mono font-semibold text-tech-300 mb-2 tracking-wide">RESEARCH SOURCES</h3>
        <div className="text-xs text-tech-500 font-mono space-y-1">
          <div>▸ IRENA PUMPED HYDRO (2020)</div>
          <div>▸ J. ENERGY STORAGE (2021)</div>
          <div>▸ ARES NEVADA RAIL TECH (2019)</div>
          <div>▸ IEEE STORAGE REVIEW (2022)</div>
        </div>
      </div>
    </div>
  );
};

export default ParameterControls;