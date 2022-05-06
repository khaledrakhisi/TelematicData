import { IMachine } from "./IMachine";

export interface ITelematicData {
  EquipmentHeader: IMachine;
  Location: {
    Latitude: number;
    Longitude: number;
    Altitude: number;
    AltitudeUnits: string[10];
  };
  CumulativeIdleHours: {
    Hour: number;
  };
  CumulativeOperatingHours: {
    Hour: number;
  };
  Distance: {
    OdometerUnits: string[10];
    Odometer: number;
  };
  EngineStatus: {
    Running: boolean;
  };
  FuelUsed: {
    FuelUnits: string[10];
    FuelConsumed: number;
  };
  FuelRemaining: {
    Percent: number;
  };
}
