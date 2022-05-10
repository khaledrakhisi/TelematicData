import { IEquipment } from "./IEquipment";
import { IMappable } from "./IMappable";

export interface ITelematicData extends IMappable {
  EquipmentHeader: IEquipment;
  // Location: IMappable;
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
