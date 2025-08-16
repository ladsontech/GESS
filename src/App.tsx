import React, { useState, useMemo } from 'react';
import { Zap, BarChart3 } from 'lucide-react';
import ParameterControls from './components/ParameterControls';
import ResultsPanel from './components/ResultsPanel';
import ChartsSection from './components/ChartsSection';
import OptimizationPanel from './components/OptimizationPanel';
import { MATERIALS } from './data/materials';
import { calculateGESSResults } from './utils/calculations';

function App() {
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS.sand);
  const [loadMass, setLoadMass] = useState(5000);
  const [height, setHeight] = useState(100); // Updated to research range
  const [systemEfficiency, setSystemEfficiency] = useState(85);
  const [cycles, setCycles] = useState(1000);

  const results = useMemo(() => {
    return calculateGESSResults({
      material: selectedMaterial,
      loadMass,
      height,
      systemEfficiency,
      cycles,
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
                Gravity Energy Storage Systems - Comparative Material Analysis & Optimization
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
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

        {/* Charts Section */}
        <div className="mt-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Comparative Material Analysis</h2>
            <p className="text-gray-600">
              Research-based comparative analysis of water, sand, and concrete storage media performance
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
              GESS Research Analysis Platform - Advanced gravitational energy storage comparative analysis
            </p>
            <p className="text-xs mt-2">
              Research-based analysis tool for comparative evaluation of gravity energy storage materials and systems
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;