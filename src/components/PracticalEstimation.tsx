import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { generateFacilityProfiles, generateHeightTradeoff, calcVolume } from '../utils/calculations';
import { ETA_GEN, G, KWH_TO_KJ, MATERIAL_DENSITIES } from '../data/materials';

const PracticalEstimation: React.FC = () => {
    const facilities = generateFacilityProfiles();
    const heightTradeoff = generateHeightTradeoff(100); // School: 100 kWh

    // Worked example values (school)
    const school = facilities[0];
    const schoolMechEnergy = (100 * KWH_TO_KJ) / ETA_GEN;
    const schoolMass = (schoolMechEnergy * 1000) / (G * 100);

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div>
                <h2 className="section-title">Practical Energy Use Estimation</h2>
                <p className="section-subtitle">
                    How much mass must be lowered, and from what height, to supply a real facility with electricity?
                </p>
            </div>

            <div className="note">
                <strong>Method:</strong> E<sub>demand</sub> = P<sub>load</sub> × t &nbsp;→&nbsp;
                E<sub>mech</sub> = E<sub>demand</sub> × 3600 / η<sub>gen</sub> &nbsp;→&nbsp;
                m = E<sub>mech</sub> × 1000 / (g × h)
            </div>

            {/* Facility Summary Table */}
            <div className="card overflow-hidden">
                <div className="card-header">
                    <h3 className="text-sm font-semibold text-surface-800">Facility Load Profiles & Required Mass</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Facility</th>
                                <th>Power (kW)</th>
                                <th>Time (h)</th>
                                <th>Energy (kWh)</th>
                                <th>Height (m)</th>
                                <th>Required Mass (kg)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facilities.map((f) => (
                                <tr key={f.name}>
                                    <td>
                                        <div className="font-medium text-surface-800">{f.name}</div>
                                        <div className="text-xs text-surface-400">{f.typicalLoads}</div>
                                    </td>
                                    <td className="mono">{f.power_kW}</td>
                                    <td className="mono">{f.time_h}</td>
                                    <td className="mono">{f.energy_kWh}</td>
                                    <td className="mono">{f.height_m}</td>
                                    <td className="mono font-bold">{f.requiredMass_kg.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Worked Example */}
            <div className="card">
                <div className="card-header">
                    <h3 className="text-sm font-semibold text-surface-800">Worked Example: School Running Overnight</h3>
                </div>
                <div className="card-body space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="metric-card">
                            <div className="metric-label">Energy Demand</div>
                            <div className="metric-value">100<span className="metric-unit">kWh</span></div>
                            <div className="text-xs text-surface-400 mt-1">10 kW × 10 hours</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-label">Height</div>
                            <div className="metric-value">100<span className="metric-unit">m</span></div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-label">Generator Efficiency</div>
                            <div className="metric-value">{(ETA_GEN * 100).toFixed(0)}<span className="metric-unit">%</span></div>
                        </div>
                    </div>

                    <div className="bg-surface-50 rounded-lg p-4 space-y-3 font-mono text-sm">
                        <div>
                            <span className="text-surface-500">Step 1:</span>{' '}
                            <span className="text-surface-800">
                                E<sub>mech</sub> = 100 × 3600 / {ETA_GEN} = <strong>{schoolMechEnergy.toLocaleString()} kJ</strong>
                            </span>
                        </div>
                        <div>
                            <span className="text-surface-500">Step 2:</span>{' '}
                            <span className="text-surface-800">
                                m = {schoolMechEnergy.toLocaleString()} × 1000 / ({G} × 100) ≈ <strong>{Math.round(schoolMass).toLocaleString()} kg</strong>
                            </span>
                        </div>
                    </div>

                    <div className="note">
                        <strong>✅ Interpretation:</strong> A mass of approximately <strong>{Math.round(schoolMass / 1000).toLocaleString()} tonnes</strong> lowered
                        from 100 m can supply a school with 10 kW for 10 hours.
                    </div>
                </div>
            </div>

            {/* Material Volume for Each Facility */}
            <div className="card overflow-hidden">
                <div className="card-header">
                    <h3 className="text-sm font-semibold text-surface-800">Material Volume Comparison by Facility</h3>
                    <p className="text-xs text-surface-400 mt-1">Volume = Mass / Density — practical volumes for each storage medium</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Facility</th>
                                <th>Mass (kg)</th>
                                {MATERIAL_DENSITIES.map((mat) => (
                                    <th key={mat.name}>
                                        <span className="inline-block w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: mat.color, verticalAlign: 'middle' }} />
                                        {mat.name} (m³)
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {facilities.map((f) => (
                                <tr key={f.name}>
                                    <td className="font-medium text-surface-800">{f.name}</td>
                                    <td className="mono">{f.requiredMass_kg.toLocaleString()}</td>
                                    {MATERIAL_DENSITIES.map((mat) => (
                                        <td key={mat.name} className="mono">
                                            {calcVolume(f.requiredMass_kg, mat.density).toFixed(1)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Height Trade-off */}
            <div className="card">
                <div className="card-header">
                    <h3 className="text-sm font-semibold text-surface-800">Height Trade-off: School Example (100 kWh)</h3>
                    <p className="text-xs text-surface-400 mt-1">Reducing mass by increasing height — shows m ∝ 1/h</p>
                </div>
                <div className="card-body space-y-4">
                    {/* Trade-off Table */}
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Height (m)</th>
                                    <th>Required Mass (kg)</th>
                                    <th>Required Mass (tonnes)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {heightTradeoff.map((row) => (
                                    <tr key={row.height}>
                                        <td className="mono">{row.height}</td>
                                        <td className="mono">{row.requiredMass.toLocaleString()}</td>
                                        <td className="mono">{(row.requiredMass / 1000).toFixed(0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Trade-off Graph */}
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={heightTradeoff}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="height" label={{ value: 'Height (m)', position: 'insideBottom', offset: -5, style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                            <YAxis label={{ value: 'Required Mass (kg)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                            <Tooltip formatter={(value: number) => `${value.toLocaleString()} kg`} />
                            <Line type="monotone" dataKey="requiredMass" name="Required Mass" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 5, fill: '#dc2626' }} activeDot={{ r: 7 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-surface-500 italic">
                        Doubling the height halves the required mass. This demonstrates the importance of vertical infrastructure in gravity energy storage design.
                    </p>
                </div>
            </div>

            {/* Interpretation */}
            <div className="card">
                <div className="card-body">
                    <h3 className="text-sm font-semibold text-surface-800 mb-3">Interpretation</h3>
                    <p className="text-sm text-surface-600 leading-relaxed">
                        The estimation results demonstrate that gravity energy storage systems require large masses to supply high
                        electrical energy demands over long durations. However, these masses are practically achievable using dense
                        materials such as concrete or sand in tower-based or underground systems. Increasing the lifting height
                        significantly reduces the required mass, highlighting the importance of vertical infrastructure in gravity
                        energy storage design.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PracticalEstimation;
