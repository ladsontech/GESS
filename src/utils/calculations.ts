import { GESSParameters, EnergyResults } from '../types/gess';
import { GRAVITY, MATERIALS } from '../data/materials';

export const calculateGESSResults = (params: GESSParameters): EnergyResults => {
  const { material, loadMass, height, systemEfficiency, cycles } = params;
  
  // Basic potential energy calculation: Ep = mgh
  const potentialEnergy = loadMass * GRAVITY * height;
  
  // Account for system efficiency
  const initialRecoveredEnergy = potentialEnergy * (systemEfficiency / 100);
  
  // Calculate energy loss over cycles due to material wear
  const efficiencyDecayRate = material.efficiencyLoss;
  const averageEfficiency = 1 - (efficiencyDecayRate * cycles) / 2;
  const recoveredEnergy = initialRecoveredEnergy * Math.max(0.1, averageEfficiency);
  
  // Power loss calculation (simplified model)
  const powerLoss = potentialEnergy - recoveredEnergy;
  
  // Calculate required volume based on material density
  const volumeRequired = loadMass / material.density;
  
  // Effective lifespan considering load and material properties
  const loadFactor = Math.min(2, loadMass / 5000); // Normalized load factor
  const effectiveLifespan = material.lifespanCycles / loadFactor;
  
  // Cost effectiveness metric (higher is better)
  const costEffectiveness = (recoveredEnergy * effectiveLifespan) / (volumeRequired * loadMass);
  
  return {
    potentialEnergy,
    recoveredEnergy,
    powerLoss,
    totalLifespan: Math.floor(effectiveLifespan),
    volumeRequired,
    costEffectiveness,
  };
};

export const generateComparisonData = (
  loadMass: number,
  height: number,
  systemEfficiency: number,
  cycles: number
) => {
  return Object.values(MATERIALS).map((material: any) => {
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
      efficiency: (results.recoveredEnergy / results.potentialEnergy) * 100,
      lifespan: results.totalLifespan,
      volume: results.volumeRequired,
      costEffectiveness: results.costEffectiveness,
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
  const heights = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  
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

export const findOptimalMaterial = (
  loadMass: number,
  height: number,
  systemEfficiency: number,
  cycles: number,
  priority: 'efficiency' | 'lifespan' | 'cost'
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
    default:
      optimalMaterial = comparisonData[0];
  }
  
  return optimalMaterial;
};