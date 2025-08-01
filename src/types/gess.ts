export interface Material {
  name: string;
  density: number; // kg/m³
  lifespanCycles: number;
  efficiencyLoss: number; // per cycle
  color: string;
  evaporationRate?: number; // for water only
}

export interface GESSParameters {
  material: Material;
  loadMass: number; // kg
  height: number; // m
  systemEfficiency: number; // %
  cycles: number;
}

export interface EnergyResults {
  potentialEnergy: number; // J
  recoveredEnergy: number; // J
  powerLoss: number; // W
  totalLifespan: number; // cycles
  volumeRequired: number; // m³
  costEffectiveness: number;
}