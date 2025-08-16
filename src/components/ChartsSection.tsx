import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import { 
  generateComparisonData, 
  generateMassEnergyData, 
  generateHeightEnergyData,
  generateEnergyDensityData 
} from '../utils/calculations';

interface ChartsSectionProps {
  loadMass: number;
  height: number;
  systemEfficiency: number;
  cycles: number;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({
  loadMass,
  height,
  systemEfficiency,
  cycles,
}) => {
  const comparisonData = generateComparisonData(loadMass, height, systemEfficiency, cycles);

  const massEnergyData = generateMassEnergyData(height, systemEfficiency, cycles);
  const heightEnergyData = generateHeightEnergyData(loadMass, systemEfficiency, cycles);
  const energyDensityData = generateEnergyDensityData(loadMass, height, systemEfficiency, cycles);

  const radarData = comparisonData.map(material => ({
    material: material.material,
    'Round-Trip Efficiency': material.efficiency,
    'Energy Density': Math.min(100, (material.energyDensity / 10) * 100), // Normalized
    'Lifespan Score': (material.lifespan / 100000) * 100, // Normalized to 100
    'Cost Effectiveness': Math.min(100, material.costEffectiveness * 5), // Scaled
  }));

  return (
    <div className="space-y-8">
      {/* Energy Density Comparison */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">Energy Density Comparison</h3>
          <p className="text-sm text-gray-600">Comparative analysis of energy storage density by material</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={energyDensityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="material" />
            <YAxis label={{ value: 'Energy Density (kWh/m³)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value: any, name: string) => {
              if (name === 'energyDensity') return [`${value.toFixed(1)} kWh/m³`, 'Energy Density'];
              return [value, name];
            }} />
            <Legend />
            <Bar dataKey="energyDensity" fill="#4A90E2" name="Energy Density (kWh/m³)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Material Performance Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">Material Performance Overview</h3>
          <p className="text-sm text-gray-600">Comprehensive comparison of all performance metrics</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="material" />
            <YAxis label={{ value: 'Energy (MJ) / Efficiency (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value: any, name: string) => {
              if (name === 'efficiency') return [`${value.toFixed(1)}%`, 'Round-Trip Efficiency'];
              if (name === 'recoveredEnergy') return [`${value.toFixed(2)} MJ`, 'Recovered Energy'];
              if (name === 'energyDensity') return [`${value.toFixed(1)} kWh/m³`, 'Energy Density'];
              return [value, name];
            }} />
            <Legend />
            <Bar dataKey="recoveredEnergy" fill="#3498db" name="Recovered Energy (MJ)" />
            <Bar dataKey="efficiency" fill="#2ecc71" name="Round-Trip Efficiency (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recovered Energy vs Mass</h3>
            <p className="text-sm text-gray-600">Linear relationship: E ∝ m (at constant height)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={massEnergyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mass" label={{ value: 'Mass (kg)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Recovered Energy (MJ)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value: any, name: string) => [`${value.toFixed(2)} MJ`, name]} />
              <Legend />
              <Line type="monotone" dataKey="sand" stroke="#f1c40f" strokeWidth={3} name="Sand" />
              <Line type="monotone" dataKey="water" stroke="#3498db" strokeWidth={3} name="Water" />
              <Line type="monotone" dataKey="concrete" stroke="#7f8c8d" strokeWidth={3} name="Concrete" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recovered Energy vs Height</h3>
            <p className="text-sm text-gray-600">Linear relationship: E ∝ h (at constant mass)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={heightEnergyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="height" label={{ value: 'Height (m)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Recovered Energy (MJ)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value: any, name: string) => [`${value.toFixed(2)} MJ`, name]} />
              <Legend />
              <Line type="monotone" dataKey="sand" stroke="#f1c40f" strokeWidth={3} name="Sand" />
              <Line type="monotone" dataKey="water" stroke="#3498db" strokeWidth={3} name="Water" />
              <Line type="monotone" dataKey="concrete" stroke="#7f8c8d" strokeWidth={3} name="Concrete" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cost vs Performance Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">Cost vs Performance Analysis</h3>
          <p className="text-sm text-gray-600">Efficiency vs relative cost comparison (bubble size = energy density)</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={energyDensityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="cost" label={{ value: 'Relative Cost', position: 'insideBottom', offset: -5 }} />
            <YAxis dataKey="efficiency" label={{ value: 'Round-Trip Efficiency (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value: any, name: string) => {
              if (name === 'efficiency') return [`${value.toFixed(1)}%`, 'Efficiency'];
              if (name === 'cost') return [value, 'Relative Cost'];
              return [value, name];
            }} />
            <Legend />
            <Scatter name="Materials" dataKey="efficiency" fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800">Multi-Dimensional Performance Analysis</h3>
          <p className="text-sm text-gray-600">Comprehensive radar chart showing all key performance indicators</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="material" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Round-Trip Efficiency"
              dataKey="Round-Trip Efficiency"
              stroke="#3498db"
              fill="#3498db"
              fillOpacity={0.3}
              strokeWidth={3}
            />
            <Radar
              name="Energy Density"
              dataKey="Energy Density"
              stroke="#e74c3c"
              fill="#e74c3c"
              fillOpacity={0.3}
              strokeWidth={3}
            />
            <Radar
              name="Lifespan Score"
              dataKey="Lifespan Score"
              stroke="#2ecc71"
              fill="#2ecc71"
              fillOpacity={0.3}
              strokeWidth={3}
            />
            <Radar
              name="Cost Effectiveness"
              dataKey="Cost Effectiveness"
              stroke="#f39c12"
              fill="#f39c12"
              fillOpacity={0.3}
              strokeWidth={3}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Research Methodology */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Research Methodology & Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Calculation Methods</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• Potential Energy: E<sub>p</sub> = mgh (Joules)</div>
              <div>• Energy Density: E<sub>d</sub> = E<sub>recovered</sub> / Volume (kWh/m³)</div>
              <div>• Round-Trip Efficiency: η = E<sub>out</sub> / E<sub>in</sub> × 100%</div>
              <div>• Degradation Model: Linear efficiency loss over cycles</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Data Sources</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• IRENA Pumped Hydro Storage Systems (2020)</div>
              <div>• Journal of Energy Storage - Granular Materials (2021)</div>
              <div>• ARES Nevada Advanced Rail Technology (2019)</div>
              <div>• IEEE Energy Storage Technologies Review (2022)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;