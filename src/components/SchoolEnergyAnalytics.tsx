import React, { useState, useMemo } from 'react';
import { School, ArrowUpDown, Scale, Zap } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { SCHOOL_ENERGY_DEMANDS } from '../data/materials';
import { generateSchoolAnalyticsData } from '../utils/calculations';

interface SchoolEnergyAnalyticsProps {
    constantMass: number;
    constantHeight: number;
}

const SchoolEnergyAnalytics: React.FC<SchoolEnergyAnalyticsProps> = ({
    constantMass,
    constantHeight,
}) => {
    const [selectedSchoolIndex, setSelectedSchoolIndex] = useState(0);
    const analyticsData = useMemo(
        () => generateSchoolAnalyticsData(constantMass, constantHeight),
        [constantMass, constantHeight]
    );

    const selectedSchool = analyticsData[selectedSchoolIndex];

    // Chart data for required height (at constant mass)
    const heightChartData = selectedSchool.materials.map((m) => ({
        material: m.material,
        'Required Height (m)': m.requiredHeight,
        fill: m.color,
    }));

    // Chart data for required mass (at constant height)
    const massChartData = selectedSchool.materials.map((m) => ({
        material: m.material,
        'Required Mass (kg)': m.requiredMass,
        fill: m.color,
    }));

    return (
        <div className="bg-matlab-panel panel-sunken p-4">
            <div className="mb-4 pb-3 border-b-2 border-matlab-border">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 bg-matlab-panel panel-raised">
                        <School className="text-matlab-blue" size={18} />
                    </div>
                    <h2 className="text-base font-bold text-matlab-text">
                        School Energy Application Analysis
                    </h2>
                </div>
                <p className="text-xs text-matlab-dark ml-8">
                    How much mass and height does a GESS system need to power a school?
                </p>
            </div>

            {/* School Type Selector */}
            <div className="mb-4">
                <label className="block text-xs font-semibold text-matlab-text mb-2 pb-1 border-b border-matlab-border">
                    Select School Type
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {SCHOOL_ENERGY_DEMANDS.map((school, idx) => (
                        <button
                            key={school.name}
                            onClick={() => setSelectedSchoolIndex(idx)}
                            className={`p-2 text-left transition-all ${selectedSchoolIndex === idx
                                    ? 'bg-blue-100 panel-sunken'
                                    : 'bg-white panel-raised hover:bg-gray-50'
                                }`}
                        >
                            <div className="text-xs font-semibold text-matlab-text">{school.name}</div>
                            <div className="text-lg font-mono font-bold text-matlab-blue">
                                {school.dailyEnergyKWh} kWh
                            </div>
                            <div className="text-xs text-matlab-dark mt-0.5">{school.description}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Selected School Details */}
            <div className="mb-4 p-3 bg-white panel-sunken">
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-matlab-blue" size={14} />
                    <span className="text-xs font-bold text-matlab-text">
                        {selectedSchool.school} — {selectedSchool.dailyEnergyKWh} kWh/day
                    </span>
                </div>
                <p className="text-xs text-matlab-dark">
                    <strong>Typical loads:</strong> {selectedSchool.typicalLoad}
                </p>
            </div>

            {/* Requirements Table */}
            <div className="mb-4 bg-white panel-sunken p-2">
                <table className="w-full text-xs border-collapse">
                    <thead>
                        <tr className="bg-matlab-toolbar border-b-2 border-matlab-dark">
                            <th className="text-left py-2 px-2 font-bold text-matlab-text">Material</th>
                            <th className="text-right py-2 px-2 font-bold text-matlab-text">
                                <div className="flex items-center justify-end gap-1">
                                    <ArrowUpDown size={10} />
                                    Height Required
                                </div>
                                <span className="font-normal text-matlab-dark">(at {constantMass.toLocaleString()} kg)</span>
                            </th>
                            <th className="text-right py-2 px-2 font-bold text-matlab-text">
                                <div className="flex items-center justify-end gap-1">
                                    <Scale size={10} />
                                    Mass Required
                                </div>
                                <span className="font-normal text-matlab-dark">(at {constantHeight} m)</span>
                            </th>
                            <th className="text-right py-2 px-2 font-bold text-matlab-text">
                                Round-Trip η
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedSchool.materials.map((mat, idx) => (
                            <tr
                                key={mat.material}
                                className={`border-b border-matlab-border ${idx % 2 === 0 ? 'bg-white' : 'bg-matlab-bg'
                                    } hover:bg-blue-50 transition-colors`}
                            >
                                <td className="py-2 px-2">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-4 h-4 border-2 border-matlab-dark"
                                            style={{ backgroundColor: mat.color }}
                                        />
                                        <span className="font-semibold text-matlab-text">{mat.material}</span>
                                    </div>
                                </td>
                                <td className="text-right py-2 px-2 font-mono font-bold text-matlab-blue">
                                    {mat.requiredHeight.toFixed(1)} m
                                </td>
                                <td className="text-right py-2 px-2 font-mono font-bold text-matlab-text">
                                    {mat.requiredMass.toLocaleString()} kg
                                </td>
                                <td className="text-right py-2 px-2 font-mono font-bold text-green-700">
                                    {mat.roundTripEfficiency}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Height Required Chart */}
                <div className="bg-white panel-sunken p-3">
                    <h3 className="text-xs font-bold text-matlab-text mb-2 pb-1 border-b border-matlab-border">
                        Required Height per Material (Mass = {constantMass.toLocaleString()} kg)
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={heightChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                            <XAxis dataKey="material" tick={{ fill: '#000', fontSize: 11 }} />
                            <YAxis
                                label={{
                                    value: 'Height (m)',
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { fontSize: 11 },
                                }}
                                tick={{ fill: '#000', fontSize: 10 }}
                            />
                            <Tooltip formatter={(value: any) => `${Number(value).toFixed(1)} m`} />
                            <Bar dataKey="Required Height (m)" fill="#3498db">
                                {heightChartData.map((entry, index) => (
                                    <rect key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Mass Required Chart */}
                <div className="bg-white panel-sunken p-3">
                    <h3 className="text-xs font-bold text-matlab-text mb-2 pb-1 border-b border-matlab-border">
                        Required Mass per Material (Height = {constantHeight} m)
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={massChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                            <XAxis dataKey="material" tick={{ fill: '#000', fontSize: 11 }} />
                            <YAxis
                                label={{
                                    value: 'Mass (kg)',
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { fontSize: 11 },
                                }}
                                tick={{ fill: '#000', fontSize: 10 }}
                            />
                            <Tooltip formatter={(value: any) => `${Number(value).toLocaleString()} kg`} />
                            <Bar dataKey="Required Mass (kg)" fill="#e74c3c">
                                {massChartData.map((entry, index) => (
                                    <rect key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Interpretation Notes */}
            <div className="mt-4 p-3 bg-white panel-sunken">
                <h4 className="text-xs font-bold text-matlab-text mb-2 pb-1 border-b border-matlab-border">
                    Key Observations
                </h4>
                <div className="text-xs text-matlab-dark space-y-1">
                    <div>
                        • <strong>Concrete</strong> requires the least height due to highest density (2400 kg/m³) and best efficiency ({(0.92 * 0.90 * 100).toFixed(1)}%)
                    </div>
                    <div>
                        • <strong>Water</strong> requires the most mass due to lowest density and suffers evaporation losses
                    </div>
                    <div>
                        • <strong>Sand</strong> offers a middle ground with zero self-discharge and moderate cost
                    </div>
                    <div>
                        • Higher energy demands (e.g., university campus) require proportionally more mass or height
                    </div>
                    <div>
                        • Formula used: h = E / (m × g × η<sub>roundtrip</sub>) and m = E / (g × h × η<sub>roundtrip</sub>)
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolEnergyAnalytics;
