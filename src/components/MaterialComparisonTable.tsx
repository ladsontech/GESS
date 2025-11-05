import React from 'react';
import { MATERIALS } from '../data/materials';
import { calculateProjectEnergy } from '../utils/calculations';

interface MaterialComparisonTableProps {
  loadMass: number;
  height: number;
}

const MaterialComparisonTable: React.FC<MaterialComparisonTableProps> = ({ loadMass, height }) => {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Material Comparison Analysis</h3>
        <p className="text-sm text-gray-600">Comprehensive comparison of storage media properties and performance</p>
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-200">
              <th className="text-left py-4 px-4 font-bold text-gray-800">Material</th>
              <th className="text-right py-4 px-4 font-bold text-gray-800">Density<br/>(kg/m³)</th>
              <th className="text-right py-4 px-4 font-bold text-gray-800">Energy Density<br/>(kWh/m³)</th>
              <th className="text-right py-4 px-4 font-bold text-gray-800">Project Efficiency<br/>(%)</th>
              <th className="text-center py-4 px-4 font-bold text-gray-800">Self-Discharge</th>
              <th className="text-right py-4 px-4 font-bold text-gray-800">Power Output<br/>(kW)</th>
              <th className="text-center py-4 px-4 font-bold text-gray-800">Duration</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(MATERIALS).map((material) => {
              const projectEnergy = calculateProjectEnergy(loadMass, height, material);
              return (
                <tr key={material.name} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full shadow-md"
                        style={{ backgroundColor: material.color }}
                      />
                      <span className="font-semibold text-gray-900">{material.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4 font-mono font-medium text-gray-700">{material.density.toLocaleString()}</td>
                  <td className="text-right py-4 px-4 font-mono font-bold text-blue-600">{projectEnergy.energyDensity.toFixed(3)}</td>
                  <td className="text-right py-4 px-4 font-mono font-bold text-green-600">{projectEnergy.efficiency.toFixed(1)}%</td>
                  <td className="text-center py-4 px-4">
                    {material.selfDischargeRate > 0 ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        {material.selfDischargeRate}%/hr
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Zero Loss
                      </span>
                    )}
                  </td>
                  <td className="text-right py-4 px-4 font-mono font-medium text-gray-700">
                    {material.powerOutput ? `${material.powerOutput.min}-${material.powerOutput.max}` : 'N/A'}
                  </td>
                  <td className="text-center py-4 px-4 text-sm font-medium text-gray-700">
                    {material.powerOutput?.duration || 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
        <h4 className="text-base font-bold text-blue-900 mb-3">Key Findings</h4>
        <div className="text-sm text-blue-800 space-y-2">
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