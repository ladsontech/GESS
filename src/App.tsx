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
  const [height, setHeight] = useState(50);
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
                GESS Energy Efficiency Analyzer
              </h1>
              <p className="text-gray-600">
                Gravity Energy Storage Systems - Performance Analysis & Optimization
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
            
            <OptimizationPanel
              loadMass={loadMass}
              height={height}
              systemEfficiency={systemEfficiency}
              cycles={cycles}
            />
          </div>

          {/* Middle Column - Results */}
          <div>
            <ResultsPanel
              results={results}
              materialName={selectedMaterial.name}
            />
          </div>

          {/* Right Column - System Block Diagram */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-purple-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">System Architecture</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
                <h3 className="font-semibold text-blue-800 mb-2">Mass Storage Unit</h3>
                <p className="text-sm text-blue-700">
                  Material: {selectedMaterial.name}<br/>
                  Mass: {loadMass.toLocaleString()} kg<br/>
                  Volume: {results.volumeRequired.toFixed(2)} m³
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400"></div>
                </div>
              </div>
              
              <div className="p-4 border-2 border-dashed border-green-300 rounded-lg bg-green-50">
                <h3 className="font-semibold text-green-800 mb-2">Lifting Mechanism</h3>
                <p className="text-sm text-green-700">
                  Height: {height} m<br/>
                  Efficiency: {systemEfficiency}%<br/>
                  Cycles: {cycles.toLocaleString()}
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400"></div>
                </div>
              </div>
              
              <div className="p-4 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50">
                <h3 className="font-semibold text-purple-800 mb-2">Energy Conversion</h3>
                <p className="text-sm text-purple-700">
                  Potential: {(results.potentialEnergy / 1000000).toFixed(2)} MJ<br/>
                  Recovery: {((results.recoveredEnergy / results.potentialEnergy) * 100).toFixed(1)}%<br/>
                  Loss: {(results.powerLoss / 1000000).toFixed(2)} MW
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400"></div>
                </div>
              </div>
              
              <div className="p-4 border-2 border-dashed border-orange-300 rounded-lg bg-orange-50">
                <h3 className="font-semibold text-orange-800 mb-2">Performance Metrics</h3>
                <p className="text-sm text-orange-700">
                  Lifespan: {results.totalLifespan.toLocaleString()} cycles<br/>
                  Efficiency: {((results.recoveredEnergy / results.potentialEnergy) * 100).toFixed(1)}%<br/>
                  Rating: {results.costEffectiveness.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Performance Analysis</h2>
            <p className="text-gray-600">
              Comprehensive analysis and comparison of different materials under varying conditions
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
              GESS Energy Efficiency Analyzer - Advanced gravitational energy storage analysis platform
            </p>
            <p className="text-xs mt-2">
              Built for engineering research and optimization of gravity-based energy storage systems
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;