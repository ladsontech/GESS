import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { generateScenario2 } from '../utils/calculations';
import { SCENARIO2_MASS, SCENARIO2_CHARGE_TIME, SCENARIO2_DISCHARGE_TIME } from '../data/materials';

const Scenario2VaryingHeight: React.FC = () => {
    const data = generateScenario2();

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div>
                <h2 className="section-title">Scenario 2: Varying Height</h2>
                <p className="section-subtitle">
                    Constant mass = {SCENARIO2_MASS.toLocaleString()} kg &nbsp;•&nbsp; Charge time = {SCENARIO2_CHARGE_TIME} h &nbsp;•&nbsp; Discharge time = {SCENARIO2_DISCHARGE_TIME} h
                </p>
            </div>

            <div className="note">
                <strong>Objective:</strong> Demonstrate the linear relationship between height and stored energy.
            </div>

            {/* Data Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Height (m)</th>
                                <th>E<sub>mech</sub> (kJ)</th>
                                <th>E<sub>elec</sub> (kWh)</th>
                                <th>P<sub>charge</sub> (kW)</th>
                                <th>E<sub>out</sub> (kWh)</th>
                                <th>P<sub>discharge</sub> (kW)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.height}>
                                    <td className="mono">{row.height}</td>
                                    <td className="mono">{row.mechEnergy_kJ.toFixed(1)}</td>
                                    <td className="mono">{row.elecEnergy_kWh.toFixed(4)}</td>
                                    <td className="mono">{row.chargePower_kW.toFixed(4)}</td>
                                    <td className="mono">{row.energyOut_kWh.toFixed(4)}</td>
                                    <td className="mono">{row.dischargePower_kW.toFixed(4)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mechanical Energy vs Height */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-sm font-semibold text-surface-800">Mechanical Energy (kJ) vs Height</h3>
                    </div>
                    <div className="card-body">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                                <XAxis dataKey="height" label={{ value: 'Height (m)', position: 'insideBottom', offset: -5, style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                                <YAxis label={{ value: 'E_mech (kJ)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                                <Tooltip formatter={(value: number) => `${value.toFixed(1)} kJ`} />
                                <Line type="monotone" dataKey="mechEnergy_kJ" name="Mechanical Energy" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 5, fill: '#2563eb' }} activeDot={{ r: 7 }} />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-surface-500 mt-3 italic">Energy increases linearly with height (E ∝ h) at constant mass.</p>
                    </div>
                </div>

                {/* Electrical Energy vs Height */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-sm font-semibold text-surface-800">Electrical Energy (kWh) vs Height</h3>
                    </div>
                    <div className="card-body">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                                <XAxis dataKey="height" label={{ value: 'Height (m)', position: 'insideBottom', offset: -5, style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                                <YAxis label={{ value: 'E_elec (kWh)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                                <Tooltip formatter={(value: number) => `${value.toFixed(4)} kWh`} />
                                <Line type="monotone" dataKey="elecEnergy_kWh" name="Electrical Energy" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 5, fill: '#16a34a' }} activeDot={{ r: 7 }} />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-surface-500 mt-3 italic">Electrical energy output mirrors the linear trend of mechanical energy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scenario2VaryingHeight;
