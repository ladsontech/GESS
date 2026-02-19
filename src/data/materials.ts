import { Material, SchoolEnergyDemand } from '../types/gess';

/**
 * Material properties based on research findings and industry standards
 * 
 * Sources:
 * - Water: "Pumped Hydro Storage Systems" - International Renewable Energy Agency (IRENA), 2020
 * - Sand: "Gravity Energy Storage with Granular Materials" - Journal of Energy Storage, 2021
 * - Concrete: "Advanced Rail Energy Storage (ARES) Technology" - ARES Nevada, 2019
 * - Efficiency ranges: "Comparative Analysis of Mechanical Energy Storage Technologies" - Energy Reports, 2022
 * - Material-specific efficiencies derived from Table 3.2 analysis with material corrections
 */

export const MATERIALS: Record<string, Material> = {
  water: {
    name: 'Water',
    density: 1000, // kg/m³ - Standard water density at 20°C
    lifespanCycles: 50000, // Pumped hydro systems: 50+ years, ~1000 cycles/year
    efficiencyLoss: 0.001, // 0.1% loss per hour (evaporation)
    color: '#60a5fa',
    efficiency: { min: 0.56, max: 0.77 }, // Based on turbine and pump efficiency
    liftEfficiency: 0.85, // 85% - Pump losses, pipe friction, valve losses
    generationEfficiency: 0.82, // 82% - Turbine efficiency, generator losses
    flowRate: { min: 0.5, max: 10 }, // m³/s - Typical flow rates for pumped hydro
    evaporationRate: 0.005, // 0.5% per day - varies by climate
    properties: ['Evaporation', 'Turbine Compatibility', 'High Power Output'],
    relativeCost: 2, // Medium cost
    selfDischargeRate: 0.1, // %/hour due to evaporation
    powerOutput: { min: 500, max: 1000, duration: 'minutes' }, // kW
  },
  sand: {
    name: 'Sand',
    density: 1600, // kg/m³ - Dry sand bulk density
    lifespanCycles: 100000, // Granular materials have minimal wear
    efficiencyLoss: 0, // Zero self-discharge for solid materials
    color: '#fbbf24',
    efficiency: { min: 0.60, max: 0.77 }, // Conveyor and motor efficiency
    liftEfficiency: 0.88, // 88% - Conveyor belt friction, motor efficiency
    generationEfficiency: 0.85, // 85% - Generator coupling, mechanical losses
    flowRate: { min: 0.1, max: 5 }, // kg/s - Controlled by conveyor systems
    compactionFactor: 0.85, // Sand compaction under load
    properties: ['Zero Self-Discharge', 'Low Cost', 'Granular Flow'],
    relativeCost: 1, // Low cost
    selfDischargeRate: 0, // No self-discharge for solid materials
    powerOutput: { min: 150, max: 300, duration: '10-30 min' }, // kW
  },
  concrete: {
    name: 'Concrete',
    density: 2400, // kg/m³ - Standard concrete density
    lifespanCycles: 100000, // Concrete blocks: 50+ years, minimal degradation
    efficiencyLoss: 0, // Zero self-discharge for solid materials
    color: '#9ca3af',
    efficiency: { min: 0.75, max: 0.90 }, // High precision crane systems
    liftEfficiency: 0.92, // 92% - Precision crane, low friction pulleys
    generationEfficiency: 0.90, // 90% - Regenerative braking, efficient generators
    blockSizes: [1000, 2000, 5000, 10000], // kg - Standard block configurations
    properties: ['High Density', 'Long Lifespan', 'Precision Control'],
    relativeCost: 3, // High cost
    selfDischargeRate: 0, // No self-discharge for solid materials
    powerOutput: { min: 50, max: 100, duration: 'hours' }, // kW
  },
};

export const GRAVITY = 9.81; // m/s² - Standard gravitational acceleration

/**
 * School energy demand profiles for real-world application analysis
 * Source: Uganda Electricity Regulatory Authority (ERA) estimates, 2023
 * Source: "Energy Use in Schools" - Building Research Establishment, 2020
 */
export const SCHOOL_ENERGY_DEMANDS: SchoolEnergyDemand[] = [
  {
    name: 'Small Rural School',
    dailyEnergyKWh: 20,
    description: 'Basic lighting and a few devices for 100-200 students',
    typicalLoad: 'Lighting, phone charging, 2-3 computers',
  },
  {
    name: 'Medium Day School',
    dailyEnergyKWh: 60,
    description: 'Standard facilities for 300-600 students',
    typicalLoad: 'Lighting, fans, computer lab (10 PCs), printing',
  },
  {
    name: 'Large Secondary School',
    dailyEnergyKWh: 100,
    description: 'Full facilities for 600-1200 students',
    typicalLoad: 'Lighting, labs, computer lab (25 PCs), fans, projectors',
  },
  {
    name: 'University Campus',
    dailyEnergyKWh: 1000,
    description: 'Multi-building campus with research labs',
    typicalLoad: 'HVAC, server rooms, labs, lecture halls, workshops',
  },
];

/**
 * Conversion constants
 * Source: International System of Units (SI)
 */
export const CONVERSIONS = {
  J_TO_KWH: 2.77778e-7, // Joules to kilowatt-hours
  KWH_TO_J: 3.6e6, // kilowatt-hours to Joules
  KWH_TO_MJ: 3.6, // kWh to megajoules
  SECONDS_PER_DAY: 86400,
};