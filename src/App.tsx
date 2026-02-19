import React, { useState, useMemo } from 'react';
import { Zap, TrendingUp, Battery, Activity } from 'lucide-react';
import ParameterControls from './components/ParameterControls';
import ResultsPanel from './components/ResultsPanel';
import ChartsSection from './components/ChartsSection';
import MaterialComparisonTable from './components/MaterialComparisonTable';
import EfficiencyDashboard from './components/EfficiencyDashboard';
import { OptimizationPanel } from './components/OptimizationPanel';
import EfficiencyComparison from './components/EfficiencyComparison';
import SchoolEnergyAnalytics from './components/SchoolEnergyAnalytics';
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
    <div className="min-h-screen bg-matlab-bg">
      {/* Header - Classic Toolbar Style */}
      <header className="bg-matlab-toolbar border-b-2 border-matlab-dark" style={{
        borderTop: '2px solid #FFFFFF',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.2)'
      }}>
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-matlab-panel panel-raised">
                <Zap className="text-matlab-blue" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-matlab-text font-system">
                  GESS Research Analysis Platform
                </h1>
                <p className="text-matlab-dark text-xs">
                  Gravity Energy Storage System - Material Analysis & Validation
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="px-3 py-1 bg-matlab-panel panel-raised text-xs">
                <div className="flex items-center gap-1 text-matlab-text">
                  <Battery size={14} />
                  <span>Energy</span>
                </div>
              </div>
              <div className="px-3 py-1 bg-matlab-panel panel-raised text-xs">
                <div className="flex items-center gap-1 text-matlab-text">
                  <TrendingUp size={14} />
                  <span>Performance</span>
                </div>
              </div>
              <div className="px-3 py-1 bg-matlab-panel panel-raised text-xs">
                <div className="flex items-center gap-1 text-matlab-text">
                  <Activity size={14} />
                  <span>Optimization</span>
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
            <div className="bg-matlab-panel panel-sunken p-4">
              <h3 className="text-sm font-bold text-matlab-text mb-3 pb-2 border-b border-matlab-border">Self-Discharge Analysis</h3>
              <div>
                <label className="block text-xs font-medium text-matlab-text mb-2">
                  Time Elapsed: <span className="font-mono font-bold">{timeElapsed}</span> hours
                </label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={timeElapsed}
                  onChange={(e) => setTimeElapsed(Number(e.target.value))}
                  className="w-full cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-matlab-dark mt-1">
                  <span>1 hour</span>
                  <span>24 hours</span>
                </div>
              </div>
              <div className="mt-3 p-2 bg-white border border-matlab-border text-xs">
                {selectedMaterial.name === 'Water' ? (
                  <p className="text-red-700">⚠ Water loss: {selectedMaterial.selfDischargeRate}%/hr due to evaporation</p>
                ) : (
                  <p className="text-green-700">✓ Solid material: Zero self-discharge</p>
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

        {/* Efficiency Comparison - NEW */}
        <div className="mt-8">
          <EfficiencyComparison />
        </div>

        {/* School Energy Analytics - NEW */}
        <div className="mt-8">
          <SchoolEnergyAnalytics
            constantMass={loadMass}
            constantHeight={height}
          />
        </div>

        {/* Material Comparison Table */}
        <div className="mt-12">
          <MaterialComparisonTable loadMass={loadMass} height={height} />
        </div>

        {/* Charts Section */}
        <div>
          <div className="mb-6 text-center bg-matlab-panel panel-raised p-4">
            <h2 className="text-xl font-bold text-matlab-text mb-2">Comparative Material Analysis</h2>
            <p className="text-matlab-dark max-w-3xl mx-auto text-sm">
              Project validation and research-based analysis with material-specific efficiency metrics
            </p>
            <p className="text-matlab-dark max-w-3xl mx-auto text-xs mt-1">
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
      <footer className="bg-matlab-toolbar border-t-2 border-matlab-dark text-matlab-text mt-12" style={{
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center mb-4">
            <h3 className="text-base font-bold mb-3">Research Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
              <div className="bg-matlab-panel panel-raised p-3">
                <p className="font-semibold text-matlab-text">Akellogum Charity</p>
                <p className="text-xs text-matlab-dark mt-1">23/U/BEL/14672/PD</p>
                <p className="text-xs text-matlab-dark">Year 3</p>
              </div>
              <div className="bg-matlab-panel panel-raised p-3">
                <p className="font-semibold text-matlab-text">Ocen Emmanuel</p>
                <p className="text-xs text-matlab-dark mt-1">23/U/BET/2391/PE</p>
                <p className="text-xs text-matlab-dark">Year 3</p>
              </div>
              <div className="bg-matlab-panel panel-raised p-3">
                <p className="font-semibold text-matlab-text">Ikwap Benard</p>
                <p className="text-xs text-matlab-dark mt-1">22/U/BEL/1432/PD</p>
                <p className="text-xs text-matlab-dark">Year 3</p>
              </div>
            </div>
          </div>
          <div className="text-center text-matlab-dark border-t border-matlab-border pt-4">
            <p className="text-xs mb-1">
              GESS Research Analysis Platform - Material-specific round-trip efficiencies: Water 69.7% | Sand 74.8% | Concrete 82.8%
            </p>
            <p className="text-xs">
              Validated: IRENA (2020), J. Energy Storage (2021), ARES Nevada (2019), IEEE (2022)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;