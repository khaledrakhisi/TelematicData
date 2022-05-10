import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { equipmentIcons } from "../constants/images";
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
      underutilization: 3,
    }
  );

  function updateEquipment(serialNumber: string, newEqu: IEquipment) {
    const index = equipments.findIndex((x) => x.SerialNumber === serialNumber);
    if (index === -1) {
      return;
    }

    setEquipments([
      ...equipments.slice(0, index),
      newEqu,
      ...equipments.slice(index + 1),
    ]);
  }

  // function addEquipment(equipment: IEquipment) {
  //   setEquipments((prev) => [...prev, equipment]);
  // }

  // function setEquipments(tdata: IEquipment[]) {
  //   setObjects(tdata);
  // }

  // function selectEquipment(equipment: IEquipment | null) {
  //   setSelectedObject(equipment);
  // }

  const telematicDataValue: TTelematicDataContext = {
    equipments,
    updateEquipment,
    setEquipments,
    setSelectEquipment,
    selectedEquipment,
    markerColor,
    settings,
    setSettings,
  };
  return (
    <TelematicDataContext.Provider value={telematicDataValue}>
      {children}
    </TelematicDataContext.Provider>
  );
};

export default TelematicDataContext;
