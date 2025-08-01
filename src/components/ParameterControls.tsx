import React from 'react';
import { Sliders, Settings } from 'lucide-react';
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
        <h2 className="text-xl font-bold text-gray-800">System Parameters</h2>
      </div>
      
      <div className="space-y-6">
        {/* Material Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Storage Material
          </label>
          <div className="grid grid-cols-3 gap-3">
            {Object.values(MATERIALS).map((material) => (
              <button
                key={material.name}
                onClick={() => onMaterialChange(material)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedMaterial.name === material.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: material.color }}
                />
                <div className="text-sm font-medium">{material.name}</div>
                <div className="text-xs text-gray-500">{material.density} kg/m³</div>
              </button>
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
            Lift Height: {height} m
          </label>
          <input
            type="range"
            min="5"
            max="100"
            step="1"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5 m</span>
            <span>100 m</span>
          </div>
        </div>

        {/* System Efficiency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Efficiency: {systemEfficiency}%
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
            Operating Cycles: {cycles.toLocaleString()}
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
    </div>
  );
};

export default ParameterControls;