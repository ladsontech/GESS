import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
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

  const COLORS = ['#3498db', '#f1c40f', '#95a5a6'];

  const efficiencyPieData = comparisonData.map((item) => ({
    name: item.material,
    value: item.efficiency,
    color: item.color,
  }));

  const energyDistributionData = comparisonData.map((item) => ({
    name: item.material,
    value: item.recoveredEnergy,
    color: item.color,
  }));

  return (
    <div className="space-y-6">
      {/* Energy Density Comparison - Radial Display */}
      <div className="bg-matlab-panel panel-sunken p-4">
        <div className="mb-3 pb-2 border-b-2 border-matlab-border">
          <h3 className="text-sm font-bold text-matlab-text">Energy Density Comparison</h3>
          <p className="text-xs text-matlab-dark">Comparative analysis of energy storage density by material</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white panel-sunken p-2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={energyDensityData}
                  dataKey="energyDensity"
                  nameKey="material"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.material}: ${entry.energyDensity.toFixed(2)} kWh/m³`}
                  labelLine={true}
                >
                  {energyDensityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value.toFixed(2)} kWh/m³`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center space-y-2">
            {energyDensityData.map((material) => (
              <div key={material.material} className="flex items-center justify-between p-2 bg-white panel-sunken">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-matlab-dark" style={{ backgroundColor: material.color }} />
                  <span className="font-semibold text-xs text-matlab-text">{material.material}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-matlab-text text-sm">{material.energyDensity.toFixed(2)} kWh/m³</div>
                  <div className="text-xs text-matlab-dark">{material.efficiency.toFixed(1)}% efficiency</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Material Performance Overview - Composed Chart */}
      <div className="bg-matlab-panel panel-sunken p-4">
        <div className="mb-3 pb-2 border-b-2 border-matlab-border">
          <h3 className="text-sm font-bold text-matlab-text">Material Performance Overview</h3>
          <p className="text-xs text-matlab-dark">Comprehensive comparison of all performance metrics</p>
        </div>
        <div className="bg-white panel-sunken p-2">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={comparisonData}>
              <defs>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3498db" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2ecc71" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
              <XAxis dataKey="material" tick={{ fill: '#000', fontSize: 11 }} />
              <YAxis yAxisId="left" label={{ value: 'Energy (MJ)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} tick={{ fill: '#000', fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Efficiency (%)', angle: 90, position: 'insideRight', style: { fontSize: 11 } }} tick={{ fill: '#000', fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="recoveredEnergy" fill="url(#colorEnergy)" stroke="#3498db" strokeWidth={2} name="Recovered Energy (MJ)" />
              <Scatter yAxisId="right" dataKey="efficiency" fill="#2ecc71" name="Round-Trip Efficiency (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-matlab-panel panel-sunken p-4">
          <div className="mb-3 pb-2 border-b-2 border-matlab-border">
            <h3 className="text-sm font-bold text-matlab-text">Recovered Energy vs Mass</h3>
            <p className="text-xs text-matlab-dark">Linear relationship: E ∝ m (at constant height)</p>
          </div>
          <div className="bg-white panel-sunken p-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={massEnergyData}>
                <defs>
                  <linearGradient id="sandGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f1c40f" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f1c40f" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="concreteGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7f8c8d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7f8c8d" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="mass" label={{ value: 'Mass (kg)', position: 'insideBottom', offset: -5, style: { fontSize: 11 } }} tick={{ fill: '#000', fontSize: 10 }} />
                <YAxis label={{ value: 'Recovered Energy (MJ)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} tick={{ fill: '#000', fontSize: 10 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="sand" stroke="#f1c40f" fill="url(#sandGradient)" strokeWidth={2} name="Sand" />
                <Area type="monotone" dataKey="water" stroke="#3498db" fill="url(#waterGradient)" strokeWidth={2} name="Water" />
                <Area type="monotone" dataKey="concrete" stroke="#7f8c8d" fill="url(#concreteGradient)" strokeWidth={2} name="Concrete" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-matlab-panel panel-sunken p-4">
          <div className="mb-3 pb-2 border-b-2 border-matlab-border">
            <h3 className="text-sm font-bold text-matlab-text">Recovered Energy vs Height</h3>
            <p className="text-xs text-matlab-dark">Linear relationship: E ∝ h (at constant mass)</p>
          </div>
          <div className="bg-white panel-sunken p-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={heightEnergyData}>
                <defs>
                  <linearGradient id="sandHeightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f1c40f" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f1c40f" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="waterHeightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="concreteHeightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7f8c8d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7f8c8d" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="height" label={{ value: 'Height (m)', position: 'insideBottom', offset: -5, style: { fontSize: 11 } }} tick={{ fill: '#000', fontSize: 10 }} />
                <YAxis label={{ value: 'Recovered Energy (MJ)', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} tick={{ fill: '#000', fontSize: 10 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="sand" stroke="#f1c40f" fill="url(#sandHeightGradient)" strokeWidth={2} name="Sand" />
                <Area type="monotone" dataKey="water" stroke="#3498db" fill="url(#waterHeightGradient)" strokeWidth={2} name="Water" />
                <Area type="monotone" dataKey="concrete" stroke="#7f8c8d" fill="url(#concreteHeightGradient)" strokeWidth={2} name="Concrete" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-matlab-panel panel-sunken p-4">
        <div className="mb-3 pb-2 border-b-2 border-matlab-border">
          <h3 className="text-sm font-bold text-matlab-text">Multi-Dimensional Performance Analysis</h3>
          <p className="text-xs text-matlab-dark">Comprehensive radar chart showing all key performance indicators</p>
        </div>
        <div className="bg-white panel-sunken p-2">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#C0C0C0" />
              <PolarAngleAxis dataKey="material" tick={{ fill: '#000', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#000', fontSize: 10 }} />
              <Radar
                name="Round-Trip Efficiency"
                dataKey="Round-Trip Efficiency"
                stroke="#3498db"
                fill="#3498db"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Energy Density"
                dataKey="Energy Density"
                stroke="#e74c3c"
                fill="#e74c3c"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Lifespan Score"
                dataKey="Lifespan Score"
                stroke="#2ecc71"
                fill="#2ecc71"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Cost Effectiveness"
                dataKey="Cost Effectiveness"
                stroke="#f39c12"
                fill="#f39c12"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Research Methodology */}
      <div className="bg-matlab-panel panel-sunken p-4">
        <h3 className="text-sm font-bold text-matlab-text mb-3 pb-2 border-b-2 border-matlab-border">Research Methodology & Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white panel-sunken p-3">
            <h4 className="font-semibold text-matlab-text mb-2 text-xs pb-1 border-b border-matlab-border">Calculation Methods</h4>
            <div className="text-xs text-matlab-dark space-y-1">
              <div>• Potential Energy: E<sub>p</sub> = mgh (Joules)</div>
              <div>• Energy Density: E<sub>d</sub> = E<sub>recovered</sub> / Volume (kWh/m³)</div>
              <div>• Round-Trip Efficiency: η = E<sub>out</sub> / E<sub>in</sub> × 100%</div>
              <div>• Degradation Model: Linear efficiency loss over cycles</div>
            </div>
          </div>
          <div className="bg-white panel-sunken p-3">
            <h4 className="font-semibold text-matlab-text mb-2 text-xs pb-1 border-b border-matlab-border">Data Sources</h4>
            <div className="text-xs text-matlab-dark space-y-1">
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
