import React, { useState, useMemo } from 'react';
import { Zap, BarChart3 } from 'lucide-react';
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="text-blue-600" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                GESS Research Analysis Platform
              </h1>
              <p className="text-gray-600">
                Gravity Energy Storage Systems - Advanced Material Analysis & Project Validation
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Efficiency Dashboard */}
        <div className="mb-8">
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
        <div className="mt-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Comparative Material Analysis</h2>
            <p className="text-gray-600">
              Project validation and research-based comparative analysis with Table 3.2 efficiency metrics
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
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              GESS Research Analysis Platform - Project validation with 81% round-trip efficiency (Table 3.2)
            </p>
            <p className="text-xs mt-2">
              Validated against IRENA (2020), Journal of Energy Storage (2021), ARES Nevada (2019), IEEE (2022)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;