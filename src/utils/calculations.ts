import { SimulationRow, FacilityProfile, HeightTradeoff } from '../types/gess';
import {
  G, ETA_GEN, KWH_TO_KJ,
  SCENARIO1_HEIGHT, SCENARIO1_CHARGE_TIME, SCENARIO1_DISCHARGE_TIME, SCENARIO1_MASSES,
  SCENARIO2_MASS, SCENARIO2_CHARGE_TIME, SCENARIO2_DISCHARGE_TIME, SCENARIO2_HEIGHTS,
  SCENARIO3_HEIGHT, SCENARIO3_CHARGE_TIME, SCENARIO3_DEMANDS,
  FACILITY_SPECS, TRADEOFF_HEIGHTS,
} from '../data/materials';

// ─── Core Equations (implemented exactly as specified) ─────────────────

/** Mechanical (gravitational) energy: E_mech = mgh / 1000  (kJ) */
export const calcMechEnergy_kJ = (mass: number, height: number): number =>
  (mass * G * height) / 1000;

/** Electrical energy stored: E_elec = E_mech / 3600  (kWh) */
export const calcElecEnergy_kWh = (mechEnergy_kJ: number): number =>
  mechEnergy_kJ / KWH_TO_KJ;

/** Charging power: P_charge = E_elec / t_charge  (kW) */
export const calcChargePower_kW = (elecEnergy_kWh: number, chargeTime_h: number): number =>
  elecEnergy_kWh / chargeTime_h;

/** Electrical energy output: E_out = E_elec × η_gen  (kWh) */
export const calcEnergyOut_kWh = (elecEnergy_kWh: number): number =>
  elecEnergy_kWh * ETA_GEN;

/** Discharging power: P_discharge = E_out / t_discharge  (kW) */
export const calcDischargePower_kW = (energyOut_kWh: number, dischargeTime_h: number): number =>
  energyOut_kWh / dischargeTime_h;

/** Required mass for a given energy demand: m = E × 3.6×10⁶ / (g × h)  (kg) */
export const calcRequiredMass = (energyDemand_kWh: number, height: number): number =>
  (energyDemand_kWh * 3.6e6) / (G * height);

/**
 * Required mass accounting for generator efficiency (for practical estimation):
 * E_mech = E_demand × 3600 / η_gen   (kJ)
 * m = E_mech × 1000 / (g × h)        (kg)
 */
export const calcRequiredMassFromDemand = (energyDemand_kWh: number, height: number): number => {
  const mechEnergy_kJ = (energyDemand_kWh * KWH_TO_KJ) / ETA_GEN;
  return (mechEnergy_kJ * 1000) / (G * height);
};

/** Volume = mass / density  (m³) */
export const calcVolume = (mass: number, density: number): number =>
  mass / density;

// ─── Scenario Generators ───────────────────────────────────────────────

/** Build a single simulation row */
const buildRow = (mass: number, height: number, chargeTime: number, dischargeTime: number): SimulationRow => {
  const mechEnergy_kJ = calcMechEnergy_kJ(mass, height);
  const elecEnergy_kWh = calcElecEnergy_kWh(mechEnergy_kJ);
  const chargePower_kW = calcChargePower_kW(elecEnergy_kWh, chargeTime);
  const energyOut_kWh = calcEnergyOut_kWh(elecEnergy_kWh);
  const dischargePower_kW = calcDischargePower_kW(energyOut_kWh, dischargeTime);

  return { mass, height, mechEnergy_kJ, elecEnergy_kWh, chargePower_kW, energyOut_kWh, dischargePower_kW };
};

/** Scenario 1: Varying Mass (constant height & time) */
export const generateScenario1 = (): SimulationRow[] =>
  SCENARIO1_MASSES.map(m => buildRow(m, SCENARIO1_HEIGHT, SCENARIO1_CHARGE_TIME, SCENARIO1_DISCHARGE_TIME));

/** Scenario 2: Varying Height (constant mass & time) */
export const generateScenario2 = (): SimulationRow[] =>
  SCENARIO2_HEIGHTS.map(h => buildRow(SCENARIO2_MASS, h, SCENARIO2_CHARGE_TIME, SCENARIO2_DISCHARGE_TIME));

/** Scenario 3: Varying Energy Demand — returns required mass for each demand */
export const generateScenario3 = (): { demand_kWh: number; requiredMass_kg: number; mechEnergy_kJ: number; chargePower_kW: number }[] =>
  SCENARIO3_DEMANDS.map(demand => {
    const requiredMass_kg = calcRequiredMass(demand, SCENARIO3_HEIGHT);
    const mechEnergy_kJ = calcMechEnergy_kJ(requiredMass_kg, SCENARIO3_HEIGHT);
    const chargePower_kW = calcChargePower_kW(demand, SCENARIO3_CHARGE_TIME);
    return { demand_kWh: demand, requiredMass_kg, mechEnergy_kJ, chargePower_kW };
  });

// ─── Practical Estimation ──────────────────────────────────────────────

/** Generate facility profiles with required mass computed */
export const generateFacilityProfiles = (): FacilityProfile[] =>
  FACILITY_SPECS.map(spec => {
    const energy_kWh = spec.power_kW * spec.time_h;
    const requiredMass_kg = calcRequiredMassFromDemand(energy_kWh, spec.height_m);
    const mechEnergy_kJ = (energy_kWh * KWH_TO_KJ) / ETA_GEN;
    return {
      name: spec.name,
      description: spec.description,
      typicalLoads: spec.typicalLoads,
      power_kW: spec.power_kW,
      time_h: spec.time_h,
      energy_kWh,
      height_m: spec.height_m,
      requiredMass_kg: Math.round(requiredMass_kg),
      mechEnergy_kJ: Math.round(mechEnergy_kJ),
    };
  });

/** Height trade-off: school example at different heights */
export const generateHeightTradeoff = (energyDemand_kWh: number = 100): HeightTradeoff[] =>
  TRADEOFF_HEIGHTS.map(height => ({
    height,
    requiredMass: Math.round(calcRequiredMassFromDemand(energyDemand_kWh, height)),
  }));