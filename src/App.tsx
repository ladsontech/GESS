import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import AssumptionsPanel from './components/AssumptionsPanel';
import Scenario1VaryingMass from './components/Scenario1VaryingMass';
import Scenario2VaryingHeight from './components/Scenario2VaryingHeight';
import Scenario3EnergyDemand from './components/Scenario3EnergyDemand';
import PracticalEstimation from './components/PracticalEstimation';

type Tab = 'constants' | 'scenario1' | 'scenario2' | 'scenario3' | 'practical';

const TABS: { key: Tab; label: string }[] = [
  { key: 'constants', label: 'Constants & Equations' },
  { key: 'scenario1', label: 'Scenario 1: Mass' },
  { key: 'scenario2', label: 'Scenario 2: Height' },
  { key: 'scenario3', label: 'Scenario 3: Demand' },
  { key: 'practical', label: 'Practical Estimation' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('constants');

  const renderTab = () => {
    switch (activeTab) {
      case 'constants': return <AssumptionsPanel />;
      case 'scenario1': return <Scenario1VaryingMass />;
      case 'scenario2': return <Scenario2VaryingHeight />;
      case 'scenario3': return <Scenario3EnergyDemand />;
      case 'practical': return <PracticalEstimation />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="bg-white border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-600 rounded-lg">
              <Zap className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-surface-900">
                Gravity Energy Storage System
              </h1>
              <p className="text-sm text-surface-500">
                Detailed Simulation &amp; Analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-surface-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`tab-btn whitespace-nowrap ${activeTab === tab.key ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderTab()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-surface-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h3 className="text-base font-semibold text-surface-800 mb-4">Research Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-surface-50 rounded-lg p-4">
                <p className="font-semibold text-surface-800">Akellogum Charity</p>
                <p className="text-xs text-surface-400 mt-1">23/U/BEL/14672/PD</p>
                <p className="text-xs text-surface-400">Year 3</p>
              </div>
              <div className="bg-surface-50 rounded-lg p-4">
                <p className="font-semibold text-surface-800">Ocen Emmanuel</p>
                <p className="text-xs text-surface-400 mt-1">23/U/BET/2391/PE</p>
                <p className="text-xs text-surface-400">Year 3</p>
              </div>
              <div className="bg-surface-50 rounded-lg p-4">
                <p className="font-semibold text-surface-800">Ikwap Benard</p>
                <p className="text-xs text-surface-400 mt-1">22/U/BEL/1432/PD</p>
                <p className="text-xs text-surface-400">Year 3</p>
              </div>
            </div>
          </div>
          <div className="text-center text-surface-400 border-t border-surface-100 pt-4">
            <p className="text-xs mb-1">
              GESS Simulation Platform — Fixed efficiencies: η<sub>lift</sub> = 90% | η<sub>gen</sub> = 90% | η<sub>rt</sub> = 81%
            </p>
            <p className="text-xs">
              g = 9.81 m/s² &nbsp;•&nbsp; 1 kWh = 3600 kJ
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;