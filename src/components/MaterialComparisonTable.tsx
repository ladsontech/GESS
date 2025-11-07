import React from 'react';
import { MATERIALS } from '../data/materials';
import { calculateProjectEnergy } from '../utils/calculations';

interface MaterialComparisonTableProps {
  loadMass: number;
  height: number;
}

const MaterialComparisonTable: React.FC<MaterialComparisonTableProps> = ({ loadMass, height }) => {
  return (
    <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
      <div className="mb-6 border-b-2 border-tech-800 pb-4">
        <h3 className="text-lg font-bold text-tech-100 mb-2 font-mono tracking-wide">MATERIAL COMPARISON ANALYSIS</h3>
        <p className="text-xs text-tech-400 font-mono">COMPREHENSIVE STORAGE MEDIA PROPERTIES & PERFORMANCE</p>
      </div>
      
      <div className="overflow-x-auto rounded border-2 border-tech-800">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-tech-800 border-b-2 border-tech-700">
              <th className="text-left py-3 px-3 font-mono font-bold text-tech-200 tracking-wide">MATERIAL</th>
              <th className="text-right py-3 px-3 font-mono font-bold text-tech-200 tracking-wide">DENSITY<br/>(kg/m³)</th>
              <th className="text-right py-3 px-3 font-mono font-bold text-tech-200 tracking-wide">ENERGY<br/>(kWh/m³)</th>
              <th className="text-right py-3 px-3 font-mono font-bold text-tech-200 tracking-wide">EFFICIENCY<br/>(%)</th>
              <th className="text-center py-3 px-3 font-mono font-bold text-tech-200 tracking-wide">DISCHARGE</th>
              <th className="text-right py-3 px-3 font-mono font-bold text-tech-200 tracking-wide">POWER<br/>(kW)</th>
              <th className="text-center py-3 px-3 font-mono font-bold text-tech-200 tracking-wide">DURATION</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(MATERIALS).map((material) => {
              const projectEnergy = calculateProjectEnergy(loadMass, height, material);
              return (
                <tr key={material.name} className="border-b border-tech-800 hover:bg-tech-800/50 transition-colors duration-200">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: material.color }}
                      />
                      <span className="font-mono font-semibold text-tech-100 text-xs">{material.name.toUpperCase()}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-3 font-mono font-medium text-tech-200">{material.density.toLocaleString()}</td>
                  <td className="text-right py-3 px-3 font-mono font-bold text-tech-100">{projectEnergy.energyDensity.toFixed(3)}</td>
                  <td className="text-right py-3 px-3 font-mono font-bold text-tech-100">{projectEnergy.efficiency.toFixed(1)}%</td>
                  <td className="text-center py-3 px-3">
                    {material.selfDischargeRate > 0 ? (
                      <span className="inline-flex items-center px-2 py-1 border border-red-600 rounded text-xs font-mono bg-red-900/30 text-red-300">
                        {material.selfDischargeRate}%/HR
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 border border-green-600 rounded text-xs font-mono bg-green-900/30 text-green-300">
                        ZERO
                      </span>
                    )}
                  </td>
                  <td className="text-right py-3 px-3 font-mono font-medium text-tech-200">
                    {material.powerOutput ? `${material.powerOutput.min}-${material.powerOutput.max}` : 'N/A'}
                  </td>
                  <td className="text-center py-3 px-3 text-xs font-mono font-medium text-tech-200">
                    {material.powerOutput?.duration.toUpperCase() || 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-4 bg-tech-800 border-2 border-tech-700 rounded">
        <h4 className="text-xs font-mono font-bold text-tech-200 mb-3 tracking-wide">KEY FINDINGS</h4>
        <div className="text-xs text-tech-400 font-mono space-y-2">
          <div>▸ <strong className="text-tech-200">CONCRETE</strong>: HIGHEST ENERGY DENSITY (6.53 kWh/m³)</div>
          <div>▸ <strong className="text-tech-200">SAND</strong>: BEST COST-EFFECTIVENESS • ZERO SELF-DISCHARGE</div>
          <div>▸ <strong className="text-tech-200">WATER</strong>: HIGHEST POWER OUTPUT • EVAPORATION LOSSES</div>
          <div>▸ ALL MATERIALS: 81% ROUND-TRIP EFFICIENCY (TABLE 3.2)</div>
        </div>
      </div>
    </div>
  );
};

export default MaterialComparisonTable;