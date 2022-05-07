import React, { useState } from "react";

import { IMappable } from "../interfaces/IMappable";

type TMap = {
  objects: Array<IMappable>;
  markerColor: string;
  addMarker: (mappableObject: IMappable) => void;
};

const MapContext = React.createContext<TMap>({
  objects: [],
  addMarker: () => {},
  markerColor: "#000",
});

interface IMapContextProviderProps {
  children: React.ReactNode;
}

export const MapContextProvider: React.FunctionComponent<
  IMapContextProviderProps
> = ({ children }) => {
  const [objects, setObjects] = useState<IMappable[]>([]);
  const [markerColor, setMarkerColor] = useState<string>("#000");

  function addMarker(mappableObject: IMappable) {
    setObjects((prev) => [...prev, mappableObject]);
  }

  const mapValue: TMap = {
    objects,
    addMarker,
    markerColor,
  };
  return <MapContext.Provider value={mapValue}>{children}</MapContext.Provider>;
};

export default MapContext;
