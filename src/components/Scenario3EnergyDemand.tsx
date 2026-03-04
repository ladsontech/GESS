import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { generateScenario3, calcVolume } from '../utils/calculations';
import { SCENARIO3_HEIGHT, SCENARIO3_CHARGE_TIME, MATERIAL_DENSITIES } from '../data/materials';

const Scenario3EnergyDemand: React.FC = () => {
    const [height, setHeight] = useState<number>(SCENARIO3_HEIGHT);
    const data = generateScenario3(height);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div>
                <h2 className="section-title">Scenario 3: Varying Energy Demand</h2>
                <p className="section-subtitle">
                    Adjustable height (default {SCENARIO3_HEIGHT}m) &nbsp;•&nbsp; Charge time = {SCENARIO3_CHARGE_TIME} h &nbsp;•&nbsp; System design case
                </p>
            </div>

            {/* Height Control */}
            <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <label htmlFor="height-slider" className="block text-sm font-semibold text-surface-800 mb-1">
                            System Height: <span className="text-primary-600">{height} meters</span>
                        </label>
                        <p className="text-xs text-surface-500">
                            Adjust height to see how required mass changes for fixed energy demands.
                        </p>
                    </div>
                    <div className="flex-1 max-w-xs">
                        <input
                            id="height-slider"
                            type="range"
                            min={20}
                            max={200}
                            step={20}
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
                        <div className="flex justify-between text-[10px] text-surface-400 mt-1 px-1">
                            <span>20m</span>
                            <span>100m</span>
                            <span>200m</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="note">
                <strong>Objective:</strong> Determine the required mass for different energy demands at a given height. Formula: m = E × 3.6 × 10⁶ / (g × h)
            </div>

            {/* Data Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Energy Demand (kWh)</th>
                                <th>Required Mass (kg)</th>
                                <th>E<sub>mech</sub> (kJ)</th>
                                <th>P<sub>charge</sub> (kW)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.demand_kWh}>
                                    <td className="mono">{row.demand_kWh}</td>
                                    <td className="mono">{Math.round(row.requiredMass_kg).toLocaleString()}</td>
                                    <td className="mono">{row.mechEnergy_kJ.toFixed(1)}</td>
                                    <td className="mono">{row.chargePower_kW.toFixed(1)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Graph: Required Mass vs Energy Demand */}
            <div className="card">
                <div className="card-header">
                    <h3 className="text-sm font-semibold text-surface-800">Required Mass (kg) vs Energy Demand (kWh)</h3>
                </div>
                <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="demand_kWh" label={{ value: 'Energy Demand (kWh)', position: 'insideBottom', offset: -5, style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                            <YAxis label={{ value: 'Required Mass (kg)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                            <Tooltip formatter={(value: number) => `${Math.round(value).toLocaleString()} kg`} />
                            <Line type="monotone" dataKey="requiredMass_kg" name="Required Mass" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 5, fill: '#7c3aed' }} activeDot={{ r: 7 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-surface-500 mt-3 italic">Required mass increases linearly with energy demand at a constant height.</p>
                </div>
            </div>

            {/* Material Volume Comparison */}
            <div className="card">
                <div className="card-header">
                    <h3 className="text-sm font-semibold text-surface-800">Material Volume Comparison</h3>
                    <p className="text-xs text-surface-400 mt-1">Volume = Mass / Density (m³) — converts required mass to volume for each material</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Energy Demand (kWh)</th>
                                <th>Required Mass (kg)</th>
                                {MATERIAL_DENSITIES.map((mat) => (
                                    <th key={mat.name}>
                                        <span className="inline-block w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: mat.color, verticalAlign: 'middle' }} />
                                        {mat.name} (m³)
                                        <div className="text-[10px] font-normal normal-case tracking-normal text-surface-400">{mat.density} kg/m³</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.demand_kWh}>
                                    <td className="mono">{row.demand_kWh}</td>
                                    <td className="mono">{Math.round(row.requiredMass_kg).toLocaleString()}</td>
                                    {MATERIAL_DENSITIES.map((mat) => (
                                        <td key={mat.name} className="mono">
                                            {calcVolume(row.requiredMass_kg, mat.density).toFixed(1)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Scenario3EnergyDemand;
