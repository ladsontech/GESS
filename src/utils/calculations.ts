import { GESSParameters, EnergyResults, ComparisonData, HeightRequirement } from '../types/gess';
import { GRAVITY, MATERIALS, CONVERSIONS, SCHOOL_ENERGY_DEMANDS } from '../data/materials';
import { Material } from '../types/gess';

/**
 * Core GESS energy calculations based on gravitational potential energy
 * Formula: Ep = mgh (Joules)
 * 
 * Sources:
 * - "Fundamentals of Physics" - Halliday, Resnick, Walker (10th Edition)
 * - "Energy Storage Technologies" - IEEE Power & Energy Society, 2020
 * - Material-specific efficiencies based on mechanical system analysis
 */

/**
 * Calculate energy metrics using material-specific efficiencies
 * Each material has its own lift and generation efficiency
 */
export const calculateProjectEnergy = (mass: number, height: number, material: Material) => {
  const potentialEnergy = mass * GRAVITY * height; // Joules
  const potentialEnergyKWh = potentialEnergy * CONVERSIONS.J_TO_KWH; // Convert to kWh

  // Material-specific efficiencies (each material is different)
  const liftEff = material.liftEfficiency;
  const genEff = material.generationEfficiency;
  const roundTrip = liftEff * genEff;

  const inputEnergy = potentialEnergyKWh / liftEff; // Energy required for lifting
  const outputEnergy = potentialEnergyKWh * genEff; // Energy available for generation
  const roundTripEfficiency = roundTrip * 100; // percentage

  return {
    potential: potentialEnergyKWh,
    input: inputEnergy,
    output: outputEnergy,
    efficiency: roundTripEfficiency,
    liftEfficiency: liftEff * 100,
    generationEfficiency: genEff * 100,
    energyDensity: (potentialEnergyKWh / (mass / material.density)) // kWh/m³
  };
};

/**
 * Simulate self-discharge mechanism for different materials
 * Water loses energy due to evaporation, sand/concrete have zero loss
 */
export const simulateSelfDischarge = (currentEnergy: number, material: Material, timeElapsed: number = 1) => {
  if (material.name === 'Water') {
    // Water loses 0.1% per hour due to evaporation
    return currentEnergy * Math.pow(1 - (material.selfDischargeRate / 100), timeElapsed);
  }
  // Sand and concrete have zero self-discharge
  return currentEnergy;
};

export const calculateGESSResults = (params: GESSParameters): EnergyResults => {
  const { material, loadMass, height, systemEfficiency, cycles, timeElapsed = 1 } = params;

  // Basic potential energy calculation: Ep = mgh
  const potentialEnergy = loadMass * GRAVITY * height;

  // Project-specific energy calculations using material-specific efficiencies
  const projectEnergy = calculateProjectEnergy(loadMass, height, material);

  // Material-specific efficiency calculation
  const materialEfficiency = (material.efficiency.min + material.efficiency.max) / 2;
  const systemEfficiencyDecimal = systemEfficiency / 100;
  const combinedEfficiency = materialEfficiency * systemEfficiencyDecimal;

  // Initial recovered energy
  const initialRecoveredEnergy = potentialEnergy * combinedEfficiency;

  // Apply self-discharge
  const recoveredEnergyAfterDischarge = simulateSelfDischarge(initialRecoveredEnergy, material, timeElapsed);

  // Degradation model based on material properties and cycle count
  const degradationRate = material.efficiencyLoss;
  const totalDegradation = Math.min(0.5, degradationRate * cycles / material.lifespanCycles);
  const averageEfficiency = combinedEfficiency * (1 - totalDegradation / 2);

  // Final recovered energy accounting for degradation
  const recoveredEnergy = recoveredEnergyAfterDischarge * averageEfficiency;

  // Power loss calculation
  const powerLoss = potentialEnergy - recoveredEnergy;

  // Volume calculations
  const volumeRequired = loadMass / material.density;

  // Energy density calculation (kWh/m³)
  const energyDensityJoules = recoveredEnergy / volumeRequired;
  const energyDensity = energyDensityJoules * CONVERSIONS.J_TO_KWH;

  // Round-trip efficiency (uses material-specific values)
  const roundTripEfficiency = projectEnergy.efficiency;

  // Effective lifespan considering load factor
  const loadFactor = Math.min(2, loadMass / 5000);
  const effectiveLifespan = material.lifespanCycles / loadFactor;

  // Cost effectiveness metric (energy per unit cost per unit volume)
  const costEffectiveness = (energyDensity * effectiveLifespan) / (material.relativeCost * volumeRequired);

  return {
    potentialEnergy,
    recoveredEnergy,
    inputEnergy: projectEnergy.input * CONVERSIONS.KWH_TO_J, // Convert back to Joules
    outputEnergy: projectEnergy.output * CONVERSIONS.KWH_TO_J, // Convert back to Joules
    powerLoss,
    totalLifespan: Math.floor(effectiveLifespan),
    volumeRequired,
    costEffectiveness,
    energyDensity,
    roundTripEfficiency,
    selfDischargeRate: material.selfDischargeRate,
    degradationRate: totalDegradation * 100,
    projectEfficiency: projectEnergy.efficiency,
    powerOutput: material.powerOutput || { min: 0, max: 0, duration: 'N/A' },
  };
};

export const generateComparisonData = (
  loadMass: number,
  height: number,
  systemEfficiency: number,
  cycles: number
): ComparisonData[] => {
  return Object.values(MATERIALS).map((material) => {
    const results = calculateGESSResults({
      material,
      loadMass,
      height,
      systemEfficiency,
      cycles,
    });

    return {
      material: material.name,
      potentialEnergy: results.potentialEnergy / 1000000, // Convert to MJ
      recoveredEnergy: results.recoveredEnergy / 1000000, // Convert to MJ
      efficiency: results.roundTripEfficiency,
      lifespan: results.totalLifespan,
      volume: results.volumeRequired,
      costEffectiveness: results.costEffectiveness,
      energyDensity: results.energyDensity,
      selfDischarge: results.selfDischargeRate,
      color: material.color,
    };
  });
};

export const generateMassEnergyData = (
  height: number,
  systemEfficiency: number,
  cycles: number
) => {
  const masses = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

  return masses.map(mass => {
    const results = Object.values(MATERIALS).reduce((acc, material) => {
      const calculation = calculateGESSResults({
        material,
        loadMass: mass,
        height,
        systemEfficiency,
        cycles,
      });

      acc[material.name.toLowerCase()] = calculation.recoveredEnergy / 1000000; // Convert to MJ
      return acc;
    }, {} as Record<string, number>);

    return {
      mass,
      ...results,
    };
  });
};

export const generateHeightEnergyData = (
  loadMass: number,
  systemEfficiency: number,
  cycles: number
) => {
  const heights = [50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200]; // Updated range 50-200m

  return heights.map(height => {
    const results = Object.values(MATERIALS).reduce((acc, material) => {
      const calculation = calculateGESSResults({
        material,
        loadMass,
        height,
        systemEfficiency,
        cycles,
      });

      acc[material.name.toLowerCase()] = calculation.recoveredEnergy / 1000000; // Convert to MJ
      return acc;
    }, {} as Record<string, number>);

    return {
      height,
      ...results,
    };
  });
};

export const generateEnergyDensityData = (
  loadMass: number,
  height: number,
  systemEfficiency: number,
  cycles: number
) => {
  return Object.values(MATERIALS).map((material) => {
    const results = calculateGESSResults({
      material,
      loadMass,
      height,
      systemEfficiency,
      cycles,
    });

    return {
      material: material.name,
      energyDensity: results.energyDensity,
      efficiency: results.roundTripEfficiency,
      selfDischarge: results.selfDischargeRate,
      cost: material.relativeCost,
      color: material.color,
    };
  });
};

export const findOptimalMaterial = (
  loadMass: number,
  height: number,
  systemEfficiency: number,
  cycles: number,
  priority: 'efficiency' | 'lifespan' | 'cost' | 'energy_density'
) => {
  const comparisonData = generateComparisonData(loadMass, height, systemEfficiency, cycles);

  let optimalMaterial;

  switch (priority) {
    case 'efficiency':
      optimalMaterial = comparisonData.reduce((prev, current) =>
        prev.efficiency > current.efficiency ? prev : current
      );
      break;
    case 'lifespan':
      optimalMaterial = comparisonData.reduce((prev, current) =>
        prev.lifespan > current.lifespan ? prev : current
      );
      break;
    case 'cost':
      optimalMaterial = comparisonData.reduce((prev, current) =>
        prev.costEffectiveness > current.costEffectiveness ? prev : current
      );
      break;
    case 'energy_density':
      optimalMaterial = comparisonData.reduce((prev, current) =>
        prev.energyDensity > current.energyDensity ? prev : current
      );
      break;
    default:
      optimalMaterial = comparisonData[0];
  }

  return optimalMaterial;
};

/**
 * Calculate scenario-specific recommendations
 * Based on research constraints and optimization priorities
 */
export const calculateScenarioRecommendation = (
  scenario: any,
  loadMass: number,
  height: number,
  systemEfficiency: number,
  cycles: number
) => {
  const comparisonData = generateComparisonData(loadMass, height, systemEfficiency, cycles);

  // Filter materials based on scenario constraints
  let filteredMaterials = comparisonData.filter(material => {
    if (scenario.constraints.maxVolume && material.volume > scenario.constraints.maxVolume) {
      return false;
    }
    if (scenario.constraints.maxHeight && height > scenario.constraints.maxHeight) {
      return false;
    }
    return true;
  });

  if (filteredMaterials.length === 0) {
    filteredMaterials = comparisonData; // Fallback to all materials
  }

  // Find optimal based on scenario priority
  return findOptimalMaterial(loadMass, height, systemEfficiency, cycles, scenario.priority);
};

// ─── NEW: School Energy Analytics Functions ──────────────────────────────

/**
 * Calculate the height required to store a given amount of energy
 * Derived from: E = mgh × η_roundtrip
 * Therefore: h = E / (m × g × η_roundtrip)
 */
export const calculateHeightForEnergy = (
  targetEnergyKWh: number,
  mass: number,
  material: Material
): number => {
  const targetEnergyJ = targetEnergyKWh * CONVERSIONS.KWH_TO_J;
  const roundTripEfficiency = material.liftEfficiency * material.generationEfficiency;
  // h = E / (m × g × η)
  const height = targetEnergyJ / (mass * GRAVITY * roundTripEfficiency);
  return height;
};

/**
 * Calculate the mass required to store a given amount of energy at a given height
 * Derived from: E = mgh × η_roundtrip
 * Therefore: m = E / (g × h × η_roundtrip)
 */
export const calculateMassForEnergy = (
  targetEnergyKWh: number,
  height: number,
  material: Material
): number => {
  const targetEnergyJ = targetEnergyKWh * CONVERSIONS.KWH_TO_J;
  const roundTripEfficiency = material.liftEfficiency * material.generationEfficiency;
  // m = E / (g × h × η)
  const mass = targetEnergyJ / (GRAVITY * height * roundTripEfficiency);
  return mass;
};

/**
 * Generate school analytics data for all materials and school types
 * Shows required mass and height for each school energy demand
 */
export const generateSchoolAnalyticsData = (
  constantMass: number,
  constantHeight: number
) => {
  return SCHOOL_ENERGY_DEMANDS.map(school => {
    const materialResults = Object.values(MATERIALS).map(material => {
      const requiredHeight = calculateHeightForEnergy(school.dailyEnergyKWh, constantMass, material);
      const requiredMass = calculateMassForEnergy(school.dailyEnergyKWh, constantHeight, material);
      const roundTrip = material.liftEfficiency * material.generationEfficiency * 100;

      return {
        material: material.name,
        requiredHeight: Math.round(requiredHeight * 10) / 10,
        requiredMass: Math.round(requiredMass),
        roundTripEfficiency: Math.round(roundTrip * 10) / 10,
        color: material.color,
      };
    });

    return {
      school: school.name,
      dailyEnergyKWh: school.dailyEnergyKWh,
      description: school.description,
      typicalLoad: school.typicalLoad,
      materials: materialResults,
    };
  });
};

/**
 * Generate efficiency comparison data showing per-material breakdown
 */
export const generateEfficiencyBreakdownData = () => {
  return Object.values(MATERIALS).map(material => ({
    material: material.name,
    liftEfficiency: material.liftEfficiency * 100,
    generationEfficiency: material.generationEfficiency * 100,
    roundTripEfficiency: material.liftEfficiency * material.generationEfficiency * 100,
    color: material.color,
  }));
};