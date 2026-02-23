import React from 'react';
import { G, ETA_LIFT, ETA_GEN, ETA_RT, KWH_TO_KJ } from '../data/materials';

const AssumptionsPanel: React.FC = () => {
    const constants = [
        { symbol: 'g', name: 'Gravitational acceleration', value: `${G} m/s²` },
        { symbol: 'η_lift', name: 'Lift efficiency', value: `${ETA_LIFT}` },
        { symbol: 'η_gen', name: 'Generator efficiency', value: `${ETA_GEN}` },
        { symbol: 'η_rt', name: 'Round-trip efficiency', value: `${ETA_RT}` },
        { symbol: '—', name: 'Energy conversion', value: `1 kWh = ${KWH_TO_KJ} kJ` },
    ];

    const assumptions = [
        'Constant lifting speed',
        'No acceleration losses',
        'No container mass considered',
        'No thermal losses',
        'Constant motor and generator efficiency',
        'Ideal power electronics',
    ];

    const equations = [
        { name: 'Mechanical Energy', formula: 'E_mech = m × g × h / 1000', unit: 'kJ' },
        { name: 'Electrical Energy', formula: 'E_elec = E_mech / 3600', unit: 'kWh' },
        { name: 'Charging Power', formula: 'P_charge = E_elec / t_charge', unit: 'kW' },
        { name: 'Energy Output', formula: 'E_out = E_elec × η_gen', unit: 'kWh' },
        { name: 'Discharging Power', formula: 'P_discharge = E_out / t_discharge', unit: 'kW' },
        { name: 'Required Mass', formula: 'm = E × 3.6×10⁶ / (g × h)', unit: 'kg' },
    ];

    const keyNotes = [
        'Energy increases linearly with mass and height',
        'Power depends on energy and duration',
        'Efficiency is independent of mass and height',
        'Shorter discharge time → higher power output',
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h2 className="section-title">Constants, Equations & Assumptions</h2>
                <p className="section-subtitle">Fixed parameters and formulas used throughout all simulations</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Fixed Constants */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-sm font-semibold text-surface-800">Fixed Constants</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Symbol</th>
                                    <th>Parameter</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {constants.map((c, i) => (
                                    <tr key={i}>
                                        <td className="mono font-semibold text-primary-600">{c.symbol}</td>
                                        <td>{c.name}</td>
                                        <td className="mono font-bold">{c.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Equations */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-sm font-semibold text-surface-800">Energy & Power Equations</h3>
                    </div>
                    <div className="card-body space-y-2">
                        {equations.map((eq, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-surface-100 last:border-0">
                                <span className="text-sm text-surface-600">{eq.name}</span>
                                <code className="text-sm font-mono bg-surface-50 px-3 py-1 rounded text-surface-800">{eq.formula}</code>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Assumptions */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-sm font-semibold text-surface-800">Assumptions</h3>
                    </div>
                    <div className="card-body">
                        <ul className="space-y-2">
                            {assumptions.map((a, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-surface-600">
                                    <span className="text-surface-300 mt-0.5">•</span>
                                    {a}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Key Interpretation Notes */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-sm font-semibold text-surface-800">Key Interpretation Notes</h3>
                    </div>
                    <div className="card-body">
                        <ul className="space-y-2">
                            {keyNotes.map((n, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-surface-600">
                                    <span className="text-primary-500 mt-0.5">✓</span>
                                    {n}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssumptionsPanel;
