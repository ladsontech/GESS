import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { generateEfficiencyBreakdownData } from '../utils/calculations';

const EfficiencyComparison: React.FC = () => {
    const data = generateEfficiencyBreakdownData();

    return (
        <div className="bg-matlab-panel panel-sunken p-4">
            <div className="mb-4 pb-3 border-b-2 border-matlab-border">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 bg-matlab-panel panel-raised">
                        <TrendingUp className="text-matlab-blue" size={18} />
                    </div>
                    <h2 className="text-base font-bold text-matlab-text">
                        Material Efficiency Comparison
                    </h2>
                </div>
                <p className="text-xs text-matlab-dark ml-8">
                    Each material has different lift and generation efficiencies — they are <strong>NOT</strong> the same
                </p>
            </div>

            {/* Efficiency Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {data.map((mat) => (
                    <div key={mat.material} className="bg-white panel-sunken p-3">
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-matlab-border">
                            <div
                                className="w-4 h-4 border-2 border-matlab-dark"
                                style={{ backgroundColor: mat.color }}
                            />
                            <span className="text-sm font-bold text-matlab-text">{mat.material}</span>
                        </div>

                        {/* Energy Flow Ladder */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-matlab-dark">Lift Efficiency</span>
                                <span className="font-mono font-bold text-matlab-text">
                                    {mat.liftEfficiency.toFixed(1)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 h-2">
                                <div
                                    className="h-2 transition-all"
                                    style={{
                                        width: `${mat.liftEfficiency}%`,
                                        backgroundColor: mat.color,
                                        opacity: 0.7,
                                    }}
                                />
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-matlab-dark">Generation Efficiency</span>
                                <span className="font-mono font-bold text-matlab-text">
                                    {mat.generationEfficiency.toFixed(1)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 h-2">
                                <div
                                    className="h-2 transition-all"
                                    style={{
                                        width: `${mat.generationEfficiency}%`,
                                        backgroundColor: mat.color,
                                        opacity: 0.85,
                                    }}
                                />
                            </div>

                            <div className="mt-2 pt-2 border-t border-matlab-border">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-matlab-dark font-semibold">Round-Trip (η<sub>lift</sub> × η<sub>gen</sub>)</span>
                                    <span className="font-mono font-bold text-green-700 text-sm">
                                        {mat.roundTripEfficiency.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 h-3 mt-1">
                                    <div
                                        className="h-3 transition-all"
                                        style={{
                                            width: `${mat.roundTripEfficiency}%`,
                                            backgroundColor: mat.color,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Energy Flow Diagram */}
            <div className="mb-4 p-3 bg-white panel-sunken">
                <h3 className="text-xs font-bold text-matlab-text mb-3 pb-1 border-b border-matlab-border">
                    Energy Flow: Input → Storage → Output
                </h3>
                {data.map((mat) => {
                    const inputEnergy = 100; // Normalized to 100 units
                    const afterLift = inputEnergy * (mat.liftEfficiency / 100);
                    const afterGen = afterLift * (mat.generationEfficiency / 100);
                    const liftLoss = inputEnergy - afterLift;
                    const genLoss = afterLift - afterGen;

                    return (
                        <div key={mat.material} className="mb-3 last:mb-0">
                            <div className="flex items-center gap-2 mb-1">
                                <div
                                    className="w-3 h-3 border border-matlab-dark"
                                    style={{ backgroundColor: mat.color }}
                                />
                                <span className="text-xs font-semibold text-matlab-text">{mat.material}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                                <div className="px-2 py-1 bg-matlab-panel panel-raised font-mono">
                                    {inputEnergy.toFixed(0)}
                                </div>
                                <ArrowRight size={12} className="text-matlab-dark" />
                                <div className="px-1 py-0.5 bg-red-100 text-red-700 border border-red-300 font-mono text-xs">
                                    -{liftLoss.toFixed(1)} lift
                                </div>
                                <ArrowRight size={12} className="text-matlab-dark" />
                                <div className="px-2 py-1 bg-blue-100 panel-sunken font-mono font-bold">
                                    {afterLift.toFixed(1)}
                                </div>
                                <ArrowRight size={12} className="text-matlab-dark" />
                                <div className="px-1 py-0.5 bg-red-100 text-red-700 border border-red-300 font-mono text-xs">
                                    -{genLoss.toFixed(1)} gen
                                </div>
                                <ArrowRight size={12} className="text-matlab-dark" />
                                <div
                                    className="px-2 py-1 panel-raised font-mono font-bold text-white"
                                    style={{ backgroundColor: mat.color }}
                                >
                                    {afterGen.toFixed(1)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Line Chart Comparison */}
            <div className="bg-white panel-sunken p-3">
                <h3 className="text-xs font-bold text-matlab-text mb-2 pb-1 border-b border-matlab-border">
                    Round-Trip Efficiency Comparison
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                        <XAxis dataKey="material" tick={{ fill: '#000', fontSize: 11 }} />
                        <YAxis
                            domain={[0, 100]}
                            label={{
                                value: 'Efficiency (%)',
                                angle: -90,
                                position: 'insideLeft',
                                style: { fontSize: 11 },
                            }}
                            tick={{ fill: '#000', fontSize: 10 }}
                        />
                        <Tooltip
                            formatter={(value: any, name: string) => [`${Number(value).toFixed(1)}%`, name]}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="liftEfficiency" name="Lift Efficiency" stroke="#3498db" strokeWidth={2} dot={{ r: 5, fill: '#3498db' }} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="generationEfficiency" name="Generation Efficiency" stroke="#2ecc71" strokeWidth={2} dot={{ r: 5, fill: '#2ecc71' }} activeDot={{ r: 7 }} />
                        <Line type="monotone" dataKey="roundTripEfficiency" name="Round-Trip Efficiency" stroke="#e74c3c" strokeWidth={2} dot={{ r: 5, fill: '#e74c3c' }} activeDot={{ r: 7 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Notes */}
            <div className="mt-4 p-3 bg-white panel-sunken">
                <h4 className="text-xs font-bold text-matlab-text mb-2 pb-1 border-b border-matlab-border">
                    Efficiency Differences Explained
                </h4>
                <div className="text-xs text-matlab-dark space-y-1">
                    <div>
                        • <strong>Concrete</strong> ({data[2]?.roundTripEfficiency.toFixed(1)}%): Precision crane systems with low-friction pulleys and regenerative braking
                    </div>
                    <div>
                        • <strong>Sand</strong> ({data[1]?.roundTripEfficiency.toFixed(1)}%): Conveyor belt systems with moderate friction and motor coupling losses
                    </div>
                    <div>
                        • <strong>Water</strong> ({data[0]?.roundTripEfficiency.toFixed(1)}%): Pump losses, pipe friction, turbine conversion, plus evaporation losses
                    </div>
                    <div>
                        • Round-trip efficiency = η<sub>lift</sub> × η<sub>generation</sub> (each stage introduces losses)
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EfficiencyComparison;
