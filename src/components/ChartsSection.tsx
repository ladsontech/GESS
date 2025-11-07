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
    <div className="space-y-8">
      {/* Energy Density Comparison - Radial Display */}
      <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
        <div className="mb-4 border-b-2 border-tech-800 pb-3">
          <h3 className="text-sm font-bold text-tech-100 font-mono tracking-wide">ENERGY DENSITY COMPARISON</h3>
          <p className="text-xs text-tech-400 font-mono">COMPARATIVE ANALYSIS BY MATERIAL</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="flex flex-col justify-center space-y-3">
            {energyDensityData.map((material) => (
              <div key={material.material} className="flex items-center justify-between p-3 bg-tech-800 border border-tech-700 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: material.color }} />
                  <span className="font-mono font-medium text-tech-100 text-xs">{material.material.toUpperCase()}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-tech-100 text-sm">{material.energyDensity.toFixed(2)}</div>
                  <div className="text-xs text-tech-400 font-mono">{material.efficiency.toFixed(1)}% EFF</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Material Performance Overview - Composed Chart */}
      <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
        <div className="mb-4 border-b-2 border-tech-800 pb-3">
          <h3 className="text-sm font-bold text-tech-100 font-mono tracking-wide">MATERIAL PERFORMANCE OVERVIEW</h3>
          <p className="text-xs text-tech-400 font-mono">COMPREHENSIVE COMPARISON OF PERFORMANCE METRICS</p>
        </div>
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
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="material" tick={{ fill: '#666' }} />
            <YAxis yAxisId="left" label={{ value: 'Energy (MJ)', angle: -90, position: 'insideLeft' }} tick={{ fill: '#666' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Efficiency (%)', angle: 90, position: 'insideRight' }} tick={{ fill: '#666' }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #ddd', borderRadius: '8px' }}
              formatter={(value: any, name: string) => {
                if (name === 'efficiency') return [`${value.toFixed(1)}%`, 'Round-Trip Efficiency'];
                if (name === 'recoveredEnergy') return [`${value.toFixed(2)} MJ`, 'Recovered Energy'];
                return [value, name];
              }}
            />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="recoveredEnergy" fill="url(#colorEnergy)" stroke="#3498db" strokeWidth={3} name="Recovered Energy (MJ)" />
            <Scatter yAxisId="right" dataKey="efficiency" fill="#2ecc71" name="Round-Trip Efficiency (%)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
          <div className="mb-4 border-b-2 border-tech-800 pb-3">
            <h3 className="text-sm font-bold text-tech-100 font-mono tracking-wide">RECOVERED ENERGY VS MASS</h3>
            <p className="text-xs text-tech-400 font-mono">LINEAR RELATIONSHIP: E ∝ m (CONSTANT HEIGHT)</p>
          </div>
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="mass" label={{ value: 'Mass (kg)', position: 'insideBottom', offset: -5 }} tick={{ fill: '#666' }} />
              <YAxis label={{ value: 'Recovered Energy (MJ)', angle: -90, position: 'insideLeft' }} tick={{ fill: '#666' }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #ddd', borderRadius: '8px' }}
                formatter={(value: any, name: string) => [`${value.toFixed(2)} MJ`, name]}
              />
              <Legend />
              <Area type="monotone" dataKey="sand" stroke="#f1c40f" fill="url(#sandGradient)" strokeWidth={2} name="Sand" />
              <Area type="monotone" dataKey="water" stroke="#3498db" fill="url(#waterGradient)" strokeWidth={2} name="Water" />
              <Area type="monotone" dataKey="concrete" stroke="#7f8c8d" fill="url(#concreteGradient)" strokeWidth={2} name="Concrete" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
          <div className="mb-4 border-b-2 border-tech-800 pb-3">
            <h3 className="text-sm font-bold text-tech-100 font-mono tracking-wide">RECOVERED ENERGY VS HEIGHT</h3>
            <p className="text-xs text-tech-400 font-mono">LINEAR RELATIONSHIP: E ∝ h (CONSTANT MASS)</p>
          </div>
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="height" label={{ value: 'Height (m)', position: 'insideBottom', offset: -5 }} tick={{ fill: '#666' }} />
              <YAxis label={{ value: 'Recovered Energy (MJ)', angle: -90, position: 'insideLeft' }} tick={{ fill: '#666' }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #ddd', borderRadius: '8px' }}
                formatter={(value: any, name: string) => [`${value.toFixed(2)} MJ`, name]}
              />
              <Legend />
              <Area type="monotone" dataKey="sand" stroke="#f1c40f" fill="url(#sandHeightGradient)" strokeWidth={2} name="Sand" />
              <Area type="monotone" dataKey="water" stroke="#3498db" fill="url(#waterHeightGradient)" strokeWidth={2} name="Water" />
              <Area type="monotone" dataKey="concrete" stroke="#7f8c8d" fill="url(#concreteHeightGradient)" strokeWidth={2} name="Concrete" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
        <div className="mb-4 border-b-2 border-tech-800 pb-3">
          <h3 className="text-sm font-bold text-tech-100 font-mono tracking-wide">MULTI-DIMENSIONAL PERFORMANCE ANALYSIS</h3>
          <p className="text-xs text-tech-400 font-mono">COMPREHENSIVE RADAR CHART • KEY PERFORMANCE INDICATORS</p>
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
      <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
        <h3 className="text-sm font-bold text-tech-100 mb-4 font-mono tracking-wide border-b-2 border-tech-800 pb-3">RESEARCH METHODOLOGY & SOURCES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-mono font-semibold text-tech-200 mb-2 text-xs tracking-wide">CALCULATION METHODS</h4>
            <div className="text-xs text-tech-400 font-mono space-y-1">
              <div>▸ POTENTIAL ENERGY: E<sub>p</sub> = mgh (JOULES)</div>
              <div>▸ ENERGY DENSITY: E<sub>d</sub> = E<sub>recovered</sub> / VOLUME (kWh/m³)</div>
              <div>▸ ROUND-TRIP EFF: η = E<sub>out</sub> / E<sub>in</sub> × 100%</div>
              <div>▸ DEGRADATION: LINEAR EFFICIENCY LOSS/CYCLE</div>
            </div>
          </div>
          <div>
            <h4 className="font-mono font-semibold text-tech-200 mb-2 text-xs tracking-wide">DATA SOURCES</h4>
            <div className="text-xs text-tech-400 font-mono space-y-1">
              <div>▸ IRENA PUMPED HYDRO (2020)</div>
              <div>▸ J. ENERGY STORAGE (2021)</div>
              <div>▸ ARES NEVADA RAIL TECH (2019)</div>
              <div>▸ IEEE STORAGE REVIEW (2022)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;