import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { EWeekDays } from "../interfaces/EWeekDays";
import { ITelematicData } from "../interfaces/ITelematicData";
import { ITelematicSettings } from "../interfaces/ITelematicSettings";

type TTelematicDataContext = {
  objects: Array<ITelematicData>;
  markerColor: string;
  addObject: (mappableObject: ITelematicData) => void;
  setTelematicData: (tdata: Array<ITelematicData>) => void;
  selectObject: (mappableObject: ITelematicData | null) => void;
  selectedObject: ITelematicData | null;
  settings: ITelematicSettings | null;
  setSettings: (newSettings: ITelematicSettings) => void;
};

const TelematicDataContext = React.createContext<TTelematicDataContext>({
  objects: [],
  addObject: () => {},
  setTelematicData: () => {},
  selectedObject: null,
  selectObject: () => {},
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
  const [objects, setObjects] = useState<ITelematicData[]>([]);
  const [selectedObject, setSelectedObject] = useState<ITelematicData | null>(
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

  function addObject(mappableObject: ITelematicData) {
    setObjects((prev) => [...prev, mappableObject]);
  }

  function setTelematicData(tdata: ITelematicData[]) {
    setObjects(tdata);
  }

  function selectObject(mappableObject: ITelematicData | null) {
    setSelectedObject(mappableObject);
  }

  const telematicDataValue: TTelematicDataContext = {
    objects,
    addObject,
    setTelematicData,
    selectObject,
    selectedObject,
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
