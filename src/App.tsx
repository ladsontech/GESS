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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Zap className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  GESS Research Analysis Platform
                </h1>
                <p className="text-blue-100 mt-1">
                  Gravity Energy Storage Systems - Advanced Material Analysis & Project Validation
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 text-white">
                  <Battery size={20} />
                  <span className="text-sm font-medium">Energy Analysis</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-white">
                  <TrendingUp size={20} />
                  <span className="text-sm font-medium">Performance</span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-white">
                  <Activity size={20} />
                  <span className="text-sm font-medium">Optimization</span>
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
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Self-Discharge Analysis</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Elapsed: {timeElapsed} hours
                </label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={timeElapsed}
                  onChange={(e) => setTimeElapsed(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 hour</span>
                  <span>24 hours</span>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                {selectedMaterial.name === 'Water' ? (
                  <p>Water loses {selectedMaterial.selfDischargeRate}% per hour due to evaporation</p>
                ) : (
                  <p>Solid materials (sand/concrete) have zero self-discharge</p>
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
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Comparative Material Analysis</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Project validation and research-based comparative analysis with Table 3.2 efficiency metrics.
              Explore interactive visualizations showing energy relationships and material performance characteristics.
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
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-4">Research Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="font-semibold">Akellogum Charity</p>
                <p className="text-sm text-gray-300">23/U/BEL/14672/PD</p>
                <p className="text-xs text-gray-400">Year 3</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="font-semibold">Ocen Emmanuel</p>
                <p className="text-sm text-gray-300">23/U/BET/2391/PE</p>
                <p className="text-xs text-gray-400">Year 3</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="font-semibold">Ikwap Benard</p>
                <p className="text-sm text-gray-300">22/U/BEL/1432/PD</p>
                <p className="text-xs text-gray-400">Year 3</p>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-300 border-t border-gray-700 pt-6">
            <p className="text-sm mb-2">
              GESS Research Analysis Platform - Project validation with 81% round-trip efficiency (Table 3.2)
            </p>
            <p className="text-xs">
              Validated against IRENA (2020), Journal of Energy Storage (2021), ARES Nevada (2019), IEEE (2022)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;