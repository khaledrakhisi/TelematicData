import { equipmentIcons } from "../constants/images";

export const mocked_equipments = [
  {
    OEMName: "CAT",
    Model: "M315F",
    pic: equipmentIcons[0],
    telematicData: null,
    SerialNumber: "ABC123456",
  },
  {
    OEMName: "Kubota",
    Model: "U27-4",
    pic: equipmentIcons[1],
    telematicData: null,
    SerialNumber: "XYZ123456",
  },
];

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
      Latitude: 44.405,
      Longitude: 22.52,
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
      id: 1200,
      OEMName: "Wacker Neuson",
      Model: "WL32",
      SerialNumber: "MBC123456",
      SnapshotTime: new Date("2022-04-12T07:00:00Z"),
    },
    Location: {
      Latitude: 56.52,
      Longitude: 10.405,
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
