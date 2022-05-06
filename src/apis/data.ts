import { ITelematicData } from "../interfaces/ITelematicData";

export const mocked_telematicData: Array<ITelematicData> = [
  {
    EquipmentHeader: {
      id: 1234,
      OEMName: "CAT",
      Model: "M315F",
      SerialNumber: "ABC123456",
      SnapshotTime: new Date("2021-06-26T10:00:00Z"),
      pic: "",
    },
    Location: {
      Latitude: 52.52,
      Longitude: 13.405,
      Altitude: 70,
      AltitudeUnits: "metre",
    },
    CumulativeIdleHours: {
      Hour: 1060,
    },
    CumulativeOperatingHours: {
      Hour: 3469.4,
    },
    Distance: {
      OdometerUnits: "kilometre",
      Odometer: 2702.4,
    },
    EngineStatus: {
      Running: false,
    },
    FuelUsed: {
      FuelUnits: "litre",
      FuelConsumed: 24096,
    },
    FuelRemaining: {
      Percent: 39,
    },
  },
];
