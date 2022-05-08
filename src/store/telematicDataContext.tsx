import React, { useState } from "react";

import { ITelematicData } from "../interfaces/ITelematicData";

type TTelematicDataContext = {
  objects: Array<ITelematicData>;
  markerColor: string;
  addObject: (mappableObject: ITelematicData) => void;
};

const TelematicDataContext = React.createContext<TTelematicDataContext>({
  objects: [],
  addObject: () => {},
  markerColor: "#000",
});

interface IMapContextProviderProps {
  children: React.ReactNode;
}

export const TelematicDataContextProvider: React.FunctionComponent<
  IMapContextProviderProps
> = ({ children }) => {
  const [objects, setObjects] = useState<ITelematicData[]>([]);
  const [markerColor, setMarkerColor] = useState<string>("#000");

  function addObject(mappableObject: ITelematicData) {
    setObjects((prev) => [...prev, mappableObject]);
  }

  const mapValue: TTelematicDataContext = {
    objects,
    addObject,
    markerColor,
  };
  return (
    <TelematicDataContext.Provider value={mapValue}>
      {children}
    </TelematicDataContext.Provider>
  );
};

export default TelematicDataContext;
