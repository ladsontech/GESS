import { GESSParameters, EnergyResults, ComparisonData } from '../types/gess';
import { GRAVITY, MATERIALS, CONVERSIONS } from '../data/materials';

/**
 * Core GESS energy calculations based on gravitational potential energy
 * Formula: Ep = mgh (Joules)
 * 
 * Sources:
 * - "Fundamentals of Physics" - Halliday, Resnick, Walker (10th Edition)
 * - "Energy Storage Technologies" - IEEE Power & Energy Society, 2020
 */

export const calculateGESSResults = (params: GESSParameters): EnergyResults => {
  const { material, loadMass, height, systemEfficiency, cycles } = params;
  
  // Basic potential energy calculation: Ep = mgh
  const potentialEnergy = loadMass * GRAVITY * height;
  
  // Material-specific efficiency calculation
  const materialEfficiency = (material.efficiency.min + material.efficiency.max) / 2;
  const systemEfficiencyDecimal = systemEfficiency / 100;
  const combinedEfficiency = materialEfficiency * systemEfficiencyDecimal;
  
  // Initial recovered energy
  const initialRecoveredEnergy = potentialEnergy * combinedEfficiency;
  
  // Degradation model based on material properties and cycle count
  const degradationRate = material.efficiencyLoss;
  const totalDegradation = Math.min(0.5, degradationRate * cycles / material.lifespanCycles);
  const averageEfficiency = combinedEfficiency * (1 - totalDegradation / 2);
  
  // Final recovered energy accounting for degradation
  const recoveredEnergy = potentialEnergy * averageEfficiency;
  
  // Power loss calculation
  const powerLoss = potentialEnergy - recoveredEnergy;
  
  // Volume calculations
  const volumeRequired = loadMass / material.density;
  
  // Energy density calculation (kWh/m³)
  const energyDensityJoules = recoveredEnergy / volumeRequired;
  const energyDensity = energyDensityJoules * CONVERSIONS.J_TO_KWH;
  
  // Round-trip efficiency
  const roundTripEfficiency = (recoveredEnergy / potentialEnergy) * 100;
  
  // Effective lifespan considering load factor
  const loadFactor = Math.min(2, loadMass / 5000);
  const effectiveLifespan = material.lifespanCycles / loadFactor;
  
  // Cost effectiveness metric (energy per unit cost per unit volume)
  const costEffectiveness = (energyDensity * effectiveLifespan) / (material.relativeCost * volumeRequired);
  
  return {
    potentialEnergy,
    recoveredEnergy,
    powerLoss,
    totalLifespan: Math.floor(effectiveLifespan),
    volumeRequired,
    costEffectiveness,
    energyDensity,
    roundTripEfficiency,
    selfDischargeRate: material.selfDischargeRate,
    degradationRate: totalDegradation * 100,
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