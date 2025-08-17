import React from 'react';
import { MATERIALS } from '../data/materials';
import { calculateProjectEnergy } from '../utils/calculations';

interface MaterialComparisonTableProps {
  loadMass: number;
  height: number;
}

const MaterialComparisonTable: React.FC<MaterialComparisonTableProps> = ({ loadMass, height }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800">Material Comparison Analysis</h3>
        <p className="text-sm text-gray-600">Comprehensive comparison of storage media properties and performance</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-2 font-semibold text-gray-700">Material</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Density<br/>(kg/m³)</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Energy Density<br/>(kWh/m³)</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Project Efficiency<br/>(%)</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Self-Discharge</th>
              <th className="text-right py-3 px-2 font-semibold text-gray-700">Power Output<br/>(kW)</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Duration</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(MATERIALS).map((material) => {
              const projectEnergy = calculateProjectEnergy(loadMass, height, material);
              return (
                <tr key={material.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: material.color }}
                      />
                      <span className="font-medium">{material.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-2 font-mono">{material.density.toLocaleString()}</td>
                  <td className="text-right py-3 px-2 font-mono">{projectEnergy.energyDensity.toFixed(3)}</td>
                  <td className="text-right py-3 px-2 font-mono">{projectEnergy.efficiency.toFixed(1)}%</td>
                  <td className="text-center py-3 px-2">
                    {material.selfDischargeRate > 0 ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                        {material.selfDischargeRate}%/hr
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Zero Loss
                      </span>
                    )}
                  </td>
                  <td className="text-right py-3 px-2 font-mono">
                    {material.powerOutput ? `${material.powerOutput.min}-${material.powerOutput.max}` : 'N/A'}
                  </td>
                  <td className="text-center py-3 px-2 text-xs">
                    {material.powerOutput?.duration || 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">Key Findings</h4>
        <div className="text-xs text-blue-700 space-y-1">
          <div>• <strong>Concrete</strong>: Highest energy density (6.53 kWh/m³) due to superior density</div>
          <div>• <strong>Sand</strong>: Best cost-effectiveness with zero self-discharge</div>
          <div>• <strong>Water</strong>: Highest power output but suffers from evaporation losses</div>
          <div>• All materials achieve 81% round-trip efficiency (Table 3.2)</div>
        </div>
      </div>
    </div>
  );
};

export default MaterialComparisonTable;