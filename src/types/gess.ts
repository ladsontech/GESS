// ─── Simulation Row (used in all 3 scenarios) ─────────────────────────
export interface SimulationRow {
  mass: number;          // kg
  height: number;        // m
  mechEnergy_kJ: number; // Mechanical energy (kJ)
  elecEnergy_kWh: number;// Electrical energy stored (kWh)
  chargePower_kW: number;// Charging power (kW)
  energyOut_kWh: number; // Electrical energy recovered (kWh)
  dischargePower_kW: number; // Discharging power (kW)
}

// ─── Facility Load Profile ─────────────────────────────────────────────
export interface FacilityProfile {
  name: string;
  description: string;
  typicalLoads: string;
  power_kW: number;
  time_h: number;
  energy_kWh: number;
  height_m: number;
  requiredMass_kg: number;
  mechEnergy_kJ: number;
}

// ─── Material Density (for volume comparison) ──────────────────────────
export interface MaterialDensity {
  name: string;
  density: number; // kg/m³
  color: string;
}

// ─── Height Trade-off Entry ────────────────────────────────────────────
export interface HeightTradeoff {
  height: number;     // m
  requiredMass: number; // kg
}