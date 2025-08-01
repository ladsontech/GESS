import { Material } from '../types/gess';

export const MATERIALS: Record<string, Material> = {
  sand: {
    name: 'Sand',
    density: 1600, // kg/m³
    lifespanCycles: 5000,
    efficiencyLoss: 0.15, // 15% loss per cycle
    color: '#D2691E',
  },
  water: {
    name: 'Water',
    density: 1000, // kg/m³
    lifespanCycles: 50000, // Much higher due to no mechanical wear
    efficiencyLoss: 0.10, // 10% loss per cycle
    color: '#4A90E2',
    evaporationRate: 0.001, // 0.1% per cycle
  },
  stone: {
    name: 'Stone',
    density: 2500, // kg/m³
    lifespanCycles: 8000,
    efficiencyLoss: 0.12, // 12% loss per cycle
    color: '#708090',
  },
};

export const GRAVITY = 9.81; // m/s²