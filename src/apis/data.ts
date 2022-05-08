export const mocked_telematicData = [
  {
    EquipmentHeader: {
      id: 1000,
      OEMName: "CAT",
      Model: "M315F",
      SerialNumber: "ABC123456",
      SnapshotTime: new Date("2021-06-26T10:00:00Z"),
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
  {
    EquipmentHeader: {
      id: 1100,
      OEMName: "Kubota",
      Model: "U27-4",
      SerialNumber: "XYZ123456",
      SnapshotTime: new Date("2022-04-12T07:00:00Z"),
    },
    Location: {
      Latitude: 10.52,
      Longitude: 12.405,
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
