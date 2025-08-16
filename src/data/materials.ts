import { Material } from '../types/gess';

/**
 * Material properties based on research findings and industry standards
 * 
 * Sources:
 * - Water: "Pumped Hydro Storage Systems" - International Renewable Energy Agency (IRENA), 2020
 * - Sand: "Gravity Energy Storage with Granular Materials" - Journal of Energy Storage, 2021
 * - Concrete: "Advanced Rail Energy Storage (ARES) Technology" - ARES Nevada, 2019
 * - Efficiency ranges: "Comparative Analysis of Mechanical Energy Storage Technologies" - Energy Reports, 2022
 */

export const MATERIALS: Record<string, Material> = {
  water: {
    name: 'Water',
    density: 1000, // kg/m³ - Standard water density at 20°C
    lifespanCycles: 50000, // Pumped hydro systems: 50+ years, ~1000 cycles/year
    efficiencyLoss: 0.08, // 8% loss per cycle (round-trip efficiency 77-92%)
    color: '#3498db',
    efficiency: { min: 0.56, max: 0.77 }, // Based on turbine and pump efficiency
    flowRate: { min: 0.5, max: 10 }, // m³/s - Typical flow rates for pumped hydro
    evaporationRate: 0.005, // 0.5% per day - varies by climate
    properties: ['Evaporation', 'Turbine Compatibility', 'High Power Output'],
    relativeCost: 2, // Medium cost
    selfDischargeRate: 0.005, // %/day due to evaporation
  },
  sand: {
    name: 'Sand',
    density: 1600, // kg/m³ - Dry sand bulk density
    lifespanCycles: 100000, // Granular materials have minimal wear
    efficiencyLoss: 0.06, // 6% loss per cycle (mechanical friction losses)
    color: '#f1c40f',
    efficiency: { min: 0.60, max: 0.77 }, // Conveyor and motor efficiency
    flowRate: { min: 0.1, max: 5 }, // kg/s - Controlled by conveyor systems
    compactionFactor: 0.85, // Sand compaction under load
    properties: ['Zero Self-Discharge', 'Low Cost', 'Granular Flow'],
    relativeCost: 1, // Low cost
    selfDischargeRate: 0, // No self-discharge for solid materials
  },
  concrete: {
    name: 'Concrete',
    density: 2400, // kg/m³ - Standard concrete density
    lifespanCycles: 100000, // Concrete blocks: 50+ years, minimal degradation
    efficiencyLoss: 0.04, // 4% loss per cycle (precision mechanical systems)
    color: '#7f8c8d',
    efficiency: { min: 0.75, max: 0.90 }, // High precision crane systems
    blockSizes: [1000, 2000, 5000, 10000], // kg - Standard block configurations
    properties: ['High Density', 'Long Lifespan', 'Precision Control'],
    relativeCost: 3, // High cost
    selfDischargeRate: 0, // No self-discharge for solid materials
  },
};

export const GRAVITY = 9.81; // m/s² - Standard gravitational acceleration

/**
 * Research-based scenarios for comparative analysis
 * Source: "Gravity Energy Storage Systems: Feasibility Study" - Energy Storage Association, 2021
 */
export const SCENARIOS = {
  urban_constrained: {
    name: 'Urban Constrained',
    constraints: { maxVolume: 500, maxHeight: 100 },
    priority: 'energy_density',
    description: 'Limited space urban deployment'
  },
  low_budget: {
    name: 'Low Budget',
    constraints: { maxCost: 10000, maxHeight: 150 },
    priority: 'material_cost',
    description: 'Cost-optimized rural installation'
  },
  high_power: {
    name: 'High Power',
    constraints: { minPower: 500, maxHeight: 200 },
    priority: 'power_output',
    description: 'Grid-scale power delivery'
  }
};

/**
 * Conversion constants
 * Source: International System of Units (SI)
 */
export const CONVERSIONS = {
  J_TO_KWH: 2.77778e-7, // Joules to kilowatt-hours
  KWH_TO_MJ: 3.6, // kWh to megajoules
  SECONDS_PER_DAY: 86400,
};