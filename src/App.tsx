import React, { useState, useMemo } from 'react';
import { Zap, TrendingUp, Battery, Activity } from 'lucide-react';
import ParameterControls from './components/ParameterControls';
import ResultsPanel from './components/ResultsPanel';
import ChartsSection from './components/ChartsSection';
import MaterialComparisonTable from './components/MaterialComparisonTable';
import EfficiencyDashboard from './components/EfficiencyDashboard';
import { OptimizationPanel } from './components/OptimizationPanel';
import { MATERIALS } from './data/materials';
import { calculateGESSResults } from './utils/calculations';

function App() {
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS.sand);
  const [loadMass, setLoadMass] = useState(5000);
  const [height, setHeight] = useState(100); // Updated to research range
  const [systemEfficiency, setSystemEfficiency] = useState(85);
  const [cycles, setCycles] = useState(1000);
  const [timeElapsed, setTimeElapsed] = useState(1); // Hours for self-discharge

  const results = useMemo(() => {
    return calculateGESSResults({
      material: selectedMaterial,
      loadMass,
      height,
      systemEfficiency,
      cycles,
      timeElapsed,
    });
  }, [selectedMaterial, loadMass, height, systemEfficiency, cycles]);

  return (
    <div className="min-h-screen bg-tech-950 tech-grid">
      {/* Header */}
      <header className="bg-tech-900 border-b-2 border-tech-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-tech-800 border-2 border-tech-600 rounded">
                <Zap className="text-tech-400" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-tech-100 tracking-tight font-mono">
                  GESS RESEARCH PLATFORM
                </h1>
                <p className="text-tech-400 mt-0.5 text-sm font-mono">
                  GRAVITY ENERGY STORAGE SYSTEM • MATERIAL ANALYSIS & VALIDATION
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="px-3 py-2 bg-tech-800 border border-tech-700 rounded">
                <div className="flex items-center gap-2 text-tech-300">
                  <Battery size={16} />
                  <span className="text-xs font-mono">ENERGY</span>
                </div>
              </div>
              <div className="px-3 py-2 bg-tech-800 border border-tech-700 rounded">
                <div className="flex items-center gap-2 text-tech-300">
                  <TrendingUp size={16} />
                  <span className="text-xs font-mono">PERFORMANCE</span>
                </div>
              </div>
              <div className="px-3 py-2 bg-tech-800 border border-tech-700 rounded">
                <div className="flex items-center gap-2 text-tech-300">
                  <Activity size={16} />
                  <span className="text-xs font-mono">OPTIMIZATION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Efficiency Dashboard */}
        <div className="animate-fadeIn">
          <EfficiencyDashboard
            material={selectedMaterial}
            loadMass={loadMass}
            height={height}
            timeElapsed={timeElapsed}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Parameters */}
          <div className="space-y-6">
            <ParameterControls
              selectedMaterial={selectedMaterial}
              loadMass={loadMass}
              height={height}
              systemEfficiency={systemEfficiency}
              cycles={cycles}
              onMaterialChange={setSelectedMaterial}
              onLoadMassChange={setLoadMass}
              onHeightChange={setHeight}
              onSystemEfficiencyChange={setSystemEfficiency}
              onCyclesChange={setCycles}
            />
            
            {/* Time Elapsed Control for Self-Discharge */}
            <div className="bg-tech-900 border-2 border-tech-700 rounded p-6">
              <h3 className="text-sm font-bold text-tech-200 mb-4 font-mono tracking-wide">SELF-DISCHARGE ANALYSIS</h3>
              <div>
                <label className="block text-xs font-mono font-medium text-tech-300 mb-2">
                  TIME ELAPSED: <span className="text-tech-100">{timeElapsed}</span> HOURS
                </label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={timeElapsed}
                  onChange={(e) => setTimeElapsed(Number(e.target.value))}
                  className="w-full h-2 rounded appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-tech-400 mt-1 font-mono">
                  <span>1 HR</span>
                  <span>24 HR</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-tech-400 font-mono">
                {selectedMaterial.name === 'Water' ? (
                  <p>⚠ WATER LOSS: {selectedMaterial.selfDischargeRate}%/HR (EVAPORATION)</p>
                ) : (
                  <p>✓ SOLID MATERIAL: ZERO SELF-DISCHARGE</p>
                )}
              </div>
            </div>
          </div>

          {/* Middle Column - Results */}
          <div>
            <ResultsPanel
              results={results}
              materialName={selectedMaterial.name}
            />
          </div>

          {/* Right Column - Optimization */}
          <div>
            <OptimizationPanel
              loadMass={loadMass}
              height={height}
              systemEfficiency={systemEfficiency}
              cycles={cycles}
            />
          </div>
        </div>

        {/* Material Comparison Table */}
        <div className="mt-12">
          <MaterialComparisonTable loadMass={loadMass} height={height} />
        </div>

        {/* Charts Section */}
        <div>
          <div className="mb-8 text-center border-2 border-tech-800 bg-tech-900 p-6 rounded">
            <h2 className="text-2xl font-bold text-tech-100 mb-3 font-mono tracking-wide">COMPARATIVE MATERIAL ANALYSIS</h2>
            <p className="text-tech-400 max-w-3xl mx-auto text-sm font-mono">
              PROJECT VALIDATION • RESEARCH-BASED ANALYSIS • TABLE 3.2 EFFICIENCY METRICS
            </p>
            <p className="text-tech-500 max-w-3xl mx-auto text-xs mt-2 font-mono">
              Interactive visualizations showing energy relationships and material performance characteristics
            </p>
          </div>

          <ChartsSection
            loadMass={loadMass}
            height={height}
            systemEfficiency={systemEfficiency}
            cycles={cycles}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-tech-950 border-t-2 border-tech-800 text-tech-100 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold mb-4 font-mono tracking-wide">RESEARCH TEAM</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-tech-900 border-2 border-tech-800 rounded p-4">
                <p className="font-mono font-semibold text-tech-200">AKELLOGUM CHARITY</p>
                <p className="text-xs text-tech-400 mt-1 font-mono">23/U/BEL/14672/PD</p>
                <p className="text-xs text-tech-500 font-mono">YEAR 3</p>
              </div>
              <div className="bg-tech-900 border-2 border-tech-800 rounded p-4">
                <p className="font-mono font-semibold text-tech-200">OCEN EMMANUEL</p>
                <p className="text-xs text-tech-400 mt-1 font-mono">23/U/BET/2391/PE</p>
                <p className="text-xs text-tech-500 font-mono">YEAR 3</p>
              </div>
              <div className="bg-tech-900 border-2 border-tech-800 rounded p-4">
                <p className="font-mono font-semibold text-tech-200">IKWAP BENARD</p>
                <p className="text-xs text-tech-400 mt-1 font-mono">22/U/BEL/1432/PD</p>
                <p className="text-xs text-tech-500 font-mono">YEAR 3</p>
              </div>
            </div>
          </div>
          <div className="text-center text-tech-400 border-t border-tech-800 pt-6">
            <p className="text-xs mb-2 font-mono">
              GESS RESEARCH ANALYSIS PLATFORM • 81% ROUND-TRIP EFFICIENCY (TABLE 3.2)
            </p>
            <p className="text-xs text-tech-500 font-mono">
              VALIDATED: IRENA (2020) • J. ENERGY STORAGE (2021) • ARES NEVADA (2019) • IEEE (2022)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;