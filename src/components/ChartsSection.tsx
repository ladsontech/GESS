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
  ResponsiveContainer,
} from 'recharts';
import { generateComparisonData, generateMassEnergyData, generateHeightEnergyData } from '../utils/calculations';

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

  // Generate mass vs energy data with proper material calculations
  const massEnergyData = generateMassEnergyData(height, systemEfficiency, cycles);
  
  // Generate height vs energy data with proper material calculations
  const heightEnergyData = generateHeightEnergyData(loadMass, systemEfficiency, cycles);

  // Radar chart data for material comparison
  const radarData = comparisonData.map(material => ({
    material: material.material,
    efficiency: material.efficiency,
    lifespan: (material.lifespan / 8000) * 100, // Normalized to 100
    costEffectiveness: Math.min(100, material.costEffectiveness * 10), // Scaled
  }));

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Material Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="material" />
            <YAxis label={{ value: 'Energy (MJ) / Efficiency (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value: any, name: string) => {
              if (name === 'efficiency') return [`${value.toFixed(1)}%`, 'Efficiency'];
              if (name === 'recoveredEnergy') return [`${value.toFixed(2)} MJ`, 'Recovered Energy'];
              if (name === 'lifespan') return [`${value.toLocaleString()} cycles`, 'Lifespan'];
              return [value, name];
            }} />
            <Legend />
            <Bar dataKey="recoveredEnergy" fill="#4A90E2" name="Recovered Energy (MJ)" />
            <Bar dataKey="efficiency" fill="#50E3C2" name="Efficiency (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recovered Energy vs Mass</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={massEnergyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mass" label={{ value: 'Mass (kg)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Recovered Energy (MJ)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value: any) => [`${value.toFixed(2)} MJ`, 'Energy']} />
              <Legend />
              <Line type="monotone" dataKey="sand" stroke="#D2691E" strokeWidth={2} name="Sand" />
              <Line type="monotone" dataKey="water" stroke="#4A90E2" strokeWidth={2} name="Water" />
              <Line type="monotone" dataKey="stone" stroke="#708090" strokeWidth={2} name="Stone" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recovered Energy vs Height</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={heightEnergyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="height" label={{ value: 'Height (m)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Recovered Energy (MJ)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value: any) => [`${value.toFixed(2)} MJ`, 'Energy']} />
              <Legend />
              <Line type="monotone" dataKey="sand" stroke="#D2691E" strokeWidth={2} name="Sand" />
              <Line type="monotone" dataKey="water" stroke="#4A90E2" strokeWidth={2} name="Water" />
              <Line type="monotone" dataKey="stone" stroke="#708090" strokeWidth={2} name="Stone" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Radar</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="material" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Efficiency"
              dataKey="efficiency"
              stroke="#4A90E2"
              fill="#4A90E2"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Lifespan"
              dataKey="lifespan"
              stroke="#50E3C2"
              fill="#50E3C2"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Cost Effectiveness"
              dataKey="costEffectiveness"
              stroke="#F5A623"
              fill="#F5A623"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;