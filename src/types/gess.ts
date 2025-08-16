export interface Material {
  name: string;
  density: number; // kg/m³
  lifespanCycles: number;
  efficiencyLoss: number; // per cycle
  color: string;
  efficiency: { min: number; max: number }; // efficiency range
  flowRate?: { min: number; max: number }; // flow characteristics
  evaporationRate?: number; // for water only
  compactionFactor?: number; // for sand only
  blockSizes?: number[]; // for concrete only
  properties: string[];
  relativeCost: number; // 1=low, 2=medium, 3=high
  selfDischargeRate: number; // %/day
}

export interface GESSParameters {
  material: Material;
  loadMass: number; // kg
  height: number; // m
  systemEfficiency: number; // %
  cycles: number;
  volume?: number; // m³
}

export interface EnergyResults {
  potentialEnergy: number; // J
  recoveredEnergy: number; // J
  powerLoss: number; // W
  totalLifespan: number; // cycles
  volumeRequired: number; // m³
  costEffectiveness: number;
  energyDensity: number; // kWh/m³
  roundTripEfficiency: number; // %
  selfDischargeRate: number; // %/day
  degradationRate: number; // %/cycle
}

export interface ScenarioConfig {
  name: string;
  constraints: {
    maxVolume?: number;
    maxHeight?: number;
    maxCost?: number;
    minPower?: number;
  };
  priority: 'energy_density' | 'material_cost' | 'power_output';
  description: string;
}

export interface ComparisonData {
  material: string;
  potentialEnergy: number;
  recoveredEnergy: number;
  efficiency: number;
  lifespan: number;
  volume: number;
  costEffectiveness: number;
  energyDensity: number;
  selfDischarge: number;
  color: string;
}