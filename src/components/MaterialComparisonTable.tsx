import React from 'react';
import { MATERIALS } from '../data/materials';
import { calculateProjectEnergy } from '../utils/calculations';

interface MaterialComparisonTableProps {
  loadMass: number;
  height: number;
}

const MaterialComparisonTable: React.FC<MaterialComparisonTableProps> = ({ loadMass, height }) => {
  return (
    <div className="bg-matlab-panel panel-sunken p-4">
      <div className="mb-4 pb-3 border-b-2 border-matlab-border">
        <h3 className="text-base font-bold text-matlab-text mb-1">Material Comparison Analysis</h3>
        <p className="text-xs text-matlab-dark">Comprehensive comparison of storage media properties and performance</p>
      </div>

      <div className="overflow-x-auto bg-white panel-sunken p-2">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-matlab-toolbar border-b-2 border-matlab-dark">
              <th className="text-left py-2 px-2 font-bold text-matlab-text">Material</th>
              <th className="text-right py-2 px-2 font-bold text-matlab-text">Density<br />(kg/m³)</th>
              <th className="text-right py-2 px-2 font-bold text-matlab-text">Energy Density<br />(kWh/m³)</th>
              <th className="text-right py-2 px-2 font-bold text-matlab-text">Project Efficiency<br />(%)</th>
              <th className="text-center py-2 px-2 font-bold text-matlab-text">Self-Discharge</th>
              <th className="text-right py-2 px-2 font-bold text-matlab-text">Power Output<br />(kW)</th>
              <th className="text-center py-2 px-2 font-bold text-matlab-text">Duration</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(MATERIALS).map((material, idx) => {
              const projectEnergy = calculateProjectEnergy(loadMass, height, material);
              return (
                <tr key={material.name} className={`border-b border-matlab-border ${idx % 2 === 0 ? 'bg-white' : 'bg-matlab-bg'} hover:bg-blue-50 transition-colors`}>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 border-2 border-matlab-dark"
                        style={{ backgroundColor: material.color }}
                      />
                      <span className="font-semibold text-matlab-text">{material.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-2 px-2 font-mono text-matlab-text">{material.density.toLocaleString()}</td>
                  <td className="text-right py-2 px-2 font-mono font-bold text-matlab-blue">{projectEnergy.energyDensity.toFixed(3)}</td>
                  <td className="text-right py-2 px-2 font-mono font-bold text-green-700">{projectEnergy.efficiency.toFixed(1)}%</td>
                  <td className="text-center py-2 px-2">
                    {material.selfDischargeRate > 0 ? (
                      <span className="inline-flex items-center px-2 py-0.5 bg-red-100 border border-red-600 text-xs font-semibold text-red-800">
                        {material.selfDischargeRate}%/hr
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 bg-green-100 border border-green-600 text-xs font-semibold text-green-800">
                        Zero Loss
                      </span>
                    )}
                  </td>
                  <td className="text-right py-2 px-2 font-mono text-matlab-text">
                    {material.powerOutput ? `${material.powerOutput.min}-${material.powerOutput.max}` : 'N/A'}
                  </td>
                  <td className="text-center py-2 px-2 text-xs text-matlab-text">
                    {material.powerOutput?.duration || 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-white panel-sunken">
        <h4 className="text-xs font-bold text-matlab-text mb-2 pb-1 border-b border-matlab-border">Key Findings</h4>
        <div className="text-xs text-matlab-dark space-y-1">
          <div>• <strong>Concrete</strong>: Highest energy density due to superior density (2400 kg/m³) — η = {(0.92 * 0.90 * 100).toFixed(1)}%</div>
          <div>• <strong>Sand</strong>: Best cost-effectiveness with zero self-discharge — η = {(0.88 * 0.85 * 100).toFixed(1)}%</div>
          <div>• <strong>Water</strong>: Highest power output but suffers from evaporation losses — η = {(0.85 * 0.82 * 100).toFixed(1)}%</div>
          <div>• Each material has <strong>different</strong> round-trip efficiencies based on mechanical system characteristics</div>
        </div>
      </div>
    </div>
  );
};

export default MaterialComparisonTable;
