import { MaterialDensity, FacilityProfile } from '../types/gess';

// ─── Fixed Constants (Must Be Used) ────────────────────────────────────
export const G = 9.81;            // m/s² — gravitational acceleration
export const ETA_LIFT = 0.90;     // Lift efficiency
export const ETA_GEN = 0.90;      // Generator efficiency
export const ETA_RT = ETA_LIFT * ETA_GEN; // 0.81 round-trip efficiency
export const KWH_TO_KJ = 3600;   // 1 kWh = 3600 kJ

// ─── Scenario 1: Varying Mass Inputs ──────────────────────────────────
export const SCENARIO1_HEIGHT = 100;           // m
export const SCENARIO1_CHARGE_TIME = 1;        // hour
export const SCENARIO1_DISCHARGE_TIME = 1;     // hour
export const SCENARIO1_MASSES = [1000, 2500, 5000, 7500, 10000]; // kg

// ─── Scenario 2: Varying Height Inputs ────────────────────────────────
export const SCENARIO2_MASS = 5000;            // kg
export const SCENARIO2_CHARGE_TIME = 1;        // hour
export const SCENARIO2_DISCHARGE_TIME = 1;     // hour
export const SCENARIO2_HEIGHTS = [20, 50, 100, 150, 200]; // m

// ─── Scenario 3: Varying Energy Demand Inputs ─────────────────────────
export const SCENARIO3_HEIGHT = 100;           // m
export const SCENARIO3_CHARGE_TIME = 1;        // hour
export const SCENARIO3_DEMANDS = [20, 60, 100]; // kWh

// ─── Material Densities (for volume comparison) ───────────────────────
export const MATERIAL_DENSITIES: MaterialDensity[] = [
  { name: 'Water', density: 1000, color: '#3b82f6' },
  { name: 'Sand', density: 1600, color: '#f59e0b' },
  { name: 'Concrete', density: 2400, color: '#6b7280' },
];

// ─── Facility Load Profiles ───────────────────────────────────────────
// These are computed at import time via the calculation functions, but
// the raw specs are defined here.
export const FACILITY_SPECS = [
  {
    name: 'School (Night Operation)',
    description: 'Overnight backup for a secondary school',
    typicalLoads: 'Lighting, security systems, ICT servers',
    power_kW: 10,
    time_h: 10,
    height_m: 100,
  },
  {
    name: 'Small Factory (Day Operation)',
    description: 'Daytime peak shaving for a small factory',
    typicalLoads: 'Motors, compressors, lighting',
    power_kW: 50,
    time_h: 1,
    height_m: 100,
  },
  {
    name: 'Critical Load (Emergency Backup)',
    description: 'Emergency backup for essential systems',
    typicalLoads: 'Emergency lighting, communication equipment',
    power_kW: 5,
    time_h: 6,
    height_m: 100,
  },
];

// ─── Height Trade-off Heights ─────────────────────────────────────────
export const TRADEOFF_HEIGHTS = [100, 200, 300]; // m