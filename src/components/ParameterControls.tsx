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
  <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs">
    <div className="flex items-center gap-1 mb-2">
      <Info size={12} className="text-gray-500" />
      <span className="font-medium text-gray-700">Material Properties</span>
    </div>
    <div className="space-y-1 text-gray-600">
      <div>Density: {material.density} kg/m³</div>
      <div>Efficiency: {(material.efficiency.min * 100).toFixed(0)}-{(material.efficiency.max * 100).toFixed(0)}%</div>
      <div>Lifespan: {material.lifespanCycles.toLocaleString()} cycles</div>
      <div>Self-discharge: {material.selfDischargeRate}%/day</div>
      <div className="flex flex-wrap gap-1 mt-2">
        {material.properties.map((prop, idx) => (
          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="text-blue-600" size={24} />
        <div>
          <h2 className="text-xl font-bold text-gray-800">System Parameters</h2>
          <p className="text-sm text-gray-600">Configure GESS storage medium and operational parameters</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Material Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Storage Medium Selection
          </label>
          <div className="space-y-3">
            {Object.values(MATERIALS).map((material) => (
              <div
                key={material.name}
                className={`border-2 rounded-lg transition-all ${
                  selectedMaterial.name === material.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => onMaterialChange(material)}
                  className="w-full p-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: material.color }}
                    />
                    <div>
                      <div className="text-sm font-medium">{material.name}</div>
                      <div className="text-xs text-gray-500">
                        {material.density} kg/m³ • Cost: {'$'.repeat(material.relativeCost)}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Load Mass: {loadMass.toLocaleString()} kg
          </label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="100"
            value={loadMass}
            onChange={(e) => onLoadMassChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1,000 kg</span>
            <span>10,000 kg</span>
          </div>
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lift Height: {height} m (Research Range: 50-200m)
          </label>
          <input
            type="range"
            min="50"
            max="200"
            step="1"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>50 m</span>
            <span>200 m</span>
          </div>
        </div>

        {/* System Efficiency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Efficiency: {systemEfficiency}% (Mechanical losses)
          </label>
          <input
            type="range"
            min="60"
            max="100"
            step="1"
            value={systemEfficiency}
            onChange={(e) => onSystemEfficiencyChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>60%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Cycles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operating Cycles: {cycles.toLocaleString()} (Lifetime analysis)
          </label>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={cycles}
            onChange={(e) => onCyclesChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>100</span>
            <span>5,000</span>
          </div>
        </div>
      </div>
      
      {/* Research Sources */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Research Sources</h3>
        <div className="text-xs text-gray-600 space-y-1">
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