import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { generateScenario1 } from '../utils/calculations';
import { SCENARIO1_HEIGHT, SCENARIO1_CHARGE_TIME, SCENARIO1_DISCHARGE_TIME, ETA_GEN } from '../data/materials';

const Scenario1VaryingMass: React.FC = () => {
    const data = generateScenario1();

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div>
                <h2 className="section-title">Scenario 1: Varying Mass</h2>
                <p className="section-subtitle">
                    Constant height = {SCENARIO1_HEIGHT} m &nbsp;•&nbsp; Charge time = {SCENARIO1_CHARGE_TIME} h &nbsp;•&nbsp; Discharge time = {SCENARIO1_DISCHARGE_TIME} h
                </p>
            </div>

            {/* Constants reminder */}
            <div className="note">
                <strong>Objective:</strong> Show how stored energy and power scale with mass while height and duration remain fixed.
            </div>

            {/* Data Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Mass (kg)</th>
                                <th>E<sub>mech</sub> (kJ)</th>
                                <th>E<sub>elec</sub> (kWh)</th>
                                <th>P<sub>charge</sub> (kW)</th>
                                <th>E<sub>out</sub> (kWh)</th>
                                <th>P<sub>discharge</sub> (kW)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.mass}>
                                    <td className="mono">{row.mass.toLocaleString()}</td>
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
                {/* Mechanical Energy vs Mass */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-sm font-semibold text-surface-800">Mechanical Energy (kJ) vs Mass</h3>
                    </div>
                    <div className="card-body">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                                <XAxis dataKey="mass" label={{ value: 'Mass (kg)', position: 'insideBottom', offset: -5, style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                                <YAxis label={{ value: 'E_mech (kJ)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                                <Tooltip formatter={(value: number) => `${value.toFixed(1)} kJ`} />
                                <Line type="monotone" dataKey="mechEnergy_kJ" name="Mechanical Energy" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 5, fill: '#2563eb' }} activeDot={{ r: 7 }} />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-surface-500 mt-3 italic">Energy increases linearly with mass (E = mgh).</p>
                    </div>
                </div>

                {/* Electrical Energy vs Mass */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-sm font-semibold text-surface-800">Electrical Energy (kWh) vs Mass</h3>
                    </div>
                    <div className="card-body">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                                <XAxis dataKey="mass" label={{ value: 'Mass (kg)', position: 'insideBottom', offset: -5, style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                                <YAxis label={{ value: 'E_elec (kWh)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                                <Tooltip formatter={(value: number) => `${value.toFixed(4)} kWh`} />
                                <Line type="monotone" dataKey="elecEnergy_kWh" name="Electrical Energy" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 5, fill: '#16a34a' }} activeDot={{ r: 7 }} />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-surface-500 mt-3 italic">Electrical energy scales proportionally with mass at constant height.</p>
                    </div>
                </div>
            </div>

            {/* Power vs Mass - Full Width */}
            <div className="card">
                <div className="card-header">
                    <h3 className="text-sm font-semibold text-surface-800">Power (kW) vs Mass</h3>
                </div>
                <div className="card-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="mass" label={{ value: 'Mass (kg)', position: 'insideBottom', offset: -5, style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                            <YAxis label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} tick={{ fontSize: 11 }} />
                            <Tooltip formatter={(value: number) => `${value.toFixed(4)} kW`} />
                            <Legend />
                            <Line type="monotone" dataKey="chargePower_kW" name="Charging Power" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 5, fill: '#2563eb' }} activeDot={{ r: 7 }} />
                            <Line type="monotone" dataKey="dischargePower_kW" name="Discharging Power" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 5, fill: '#dc2626' }} activeDot={{ r: 7 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-surface-500 mt-3 italic">
                        Discharging power is lower than charging power due to generator efficiency (η<sub>gen</sub> = {ETA_GEN}).
                        Both scale linearly with mass.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Scenario1VaryingMass;
