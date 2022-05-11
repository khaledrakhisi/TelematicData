import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { EWeekDays } from "../interfaces/EWeekDays";
import { IEquipment } from "../interfaces/IEquipment";
import { ITelematicData } from "../interfaces/ITelematicData";
import { ITelematicSettings } from "../interfaces/ITelematicSettings";

type TTelematicDataContext = {
  equipments: Array<IEquipment>;
  markerColor: string;
  updateEquipment: (serialNumber: string, newEqu: IEquipment) => void;
  setEquipments: (equipments: Array<IEquipment>) => void;
  setSelectEquipment: (equipment: IEquipment | null) => void;
  selectedEquipment: IEquipment | null;
  settings: ITelematicSettings | null;
  setSettings: (newSettings: ITelematicSettings) => void;

  // Filter check functions
  filterCheckFuel: (telematicData: ITelematicData) => boolean;
  filterCheckDistance: (telematicData: ITelematicData) => boolean;
  filterCheckOverOperating: (telematicData: ITelematicData) => boolean;
  filterCheckUnderutilization: (telematicData: ITelematicData) => boolean;
};

const TelematicDataContext = React.createContext<TTelematicDataContext>({
  equipments: [],
  updateEquipment: () => {},
  setEquipments: () => {},
  selectedEquipment: null,
  setSelectEquipment: () => {},
  markerColor: "#000",
  settings: null,
  setSettings: () => {},

  filterCheckFuel: () => false,
  filterCheckDistance: () => false,
  filterCheckOverOperating: () => false,
  filterCheckUnderutilization: () => false,
});

interface IMapContextProviderProps {
  children: React.ReactNode;
}

export const TelematicDataContextProvider: React.FunctionComponent<
  IMapContextProviderProps
> = ({ children }) => {
  const [equipments, setEquipments] = useState<Array<IEquipment>>([]);
  const [selectedEquipment, setSelectEquipment] = useState<IEquipment | null>(
    null
  );
  const [markerColor, setMarkerColor] = useState<string>("#000");
  const [settings, setSettings] = useLocalStorage<ITelematicSettings>(
    "settings",
    {
      fuelThreshold: 10,
      operatedOutOfHours: [EWeekDays.saturday, EWeekDays.sunday],
      distanceThreshold: 5, //Kilometer
    }
  );

  function updateEquipment(serialNumber: string, newEqu: IEquipment) {
    const index = equipments.findIndex(
      (equ) => equ.SerialNumber === serialNumber
    );
    if (index === -1) {
      return;
    }

    setEquipments([
      ...equipments.slice(0, index),
      newEqu,
      ...equipments.slice(index + 1),
    ]);
  }

  /**
   *
   * Check the thresholds here
   */

  const filterCheckFuel = (telematicData: ITelematicData) => {
    return telematicData.FuelRemaining.Percent < settings!.fuelThreshold;
  };
  const filterCheckDistance = (telematicData: ITelematicData) => {
    return telematicData.Distance.Odometer > settings!.distanceThreshold;
  };
  const filterCheckOverOperating = (telematicData: ITelematicData) => {
    const todaysDayofWeek = new Date().getDay();
    return (
      telematicData.CumulativeOperatingHours.Hour > 1 &&
      settings!.operatedOutOfHours.includes(todaysDayofWeek)
    );
  };
  const filterCheckUnderutilization = (telematicData: ITelematicData) => {
    const ratio = Math.floor(
      telematicData.CumulativeIdleHours.Hour /
        telematicData.CumulativeOperatingHours.Hour
    );

    return ratio >= 1 && ratio <= 3;
  };

  const telematicDataValue: TTelematicDataContext = {
    equipments,
    updateEquipment,
    setEquipments,
    setSelectEquipment,
    selectedEquipment,
    markerColor,
    settings,
    setSettings,
    filterCheckFuel,
    filterCheckDistance,
    filterCheckOverOperating,
    filterCheckUnderutilization,
  };
  return (
    <TelematicDataContext.Provider value={telematicDataValue}>
      {children}
    </TelematicDataContext.Provider>
  );
};

export default TelematicDataContext;
