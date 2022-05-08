import React, { useState } from "react";

import { ITelematicData } from "../interfaces/ITelematicData";

type TTelematicDataContext = {
  objects: Array<ITelematicData>;
  markerColor: string;
  addObject: (mappableObject: ITelematicData) => void;
  setTelematicData: (tdata: Array<ITelematicData>) => void;
  selectObject: (mappableObject: ITelematicData | null) => void;
  selectedObject: ITelematicData | null;
};

const TelematicDataContext = React.createContext<TTelematicDataContext>({
  objects: [],
  addObject: () => {},
  setTelematicData: () => {},
  selectObject: () => {},
  selectedObject: null,
  markerColor: "#000",
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
  };
  return (
    <TelematicDataContext.Provider value={telematicDataValue}>
      {children}
    </TelematicDataContext.Provider>
  );
};

export default TelematicDataContext;
