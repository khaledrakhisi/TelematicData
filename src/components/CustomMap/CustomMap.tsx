import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import { ReactComponent as MarkerIcon } from "../../assets/images/marker.svg";
import { IMappable } from "../../interfaces/IMappable";
import TelematicDataContext from "../../store/telematicDataContext";

import { CustomMapPopup } from "./CustomMapPopup";

import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./CustomMap.module.scss";

const MAP_STYLE = { width: "100%", height: "100%" };
const MAP_CONFIG = {
  maxZoom: 10,
  mapStyle: "mapbox://styles/khaledr/cl2wa8agc00al15omwujaierw",
  mapboxAccessToken:
    "pk.eyJ1Ijoia2hhbGVkciIsImEiOiJja3BzN2t1OHMwZHQxMm5vY25tY3Q3NHI5In0.akzVvXBLn643NdB94sZaGg",
};

interface ICustomMapProps {
  defaultPosition: IMappable;
  zoomLevel: number;
  showStatusPanel: boolean;
}

export const CustomMap: React.FunctionComponent<ICustomMapProps> = ({
  defaultPosition,
  zoomLevel,
  showStatusPanel,
}) => {
  const [viewport, setViewport] = useState({
    latitude: 30.6506679,
    longitude: 48.6886386,
    zoom: 6,
  });
  const { equipments, setSelectEquipment, selectedEquipment } =
    useContext(TelematicDataContext);

  const mapContainerRef = React.useRef(null);
  const mapRef = useRef<any>();

  useEffect(() => {
    if (selectedEquipment && selectedEquipment.telematicData) {
      mapRef.current?.flyTo({
        center: [
          selectedEquipment.telematicData.Location.Longitude,
          selectedEquipment.telematicData.Location.Latitude,
        ],
        duration: 2000,
      });
      // setViewport({
      //   ...viewport,
      //   latitude: selectedObject.Location.Latitude,
      //   longitude: selectedObject.Location.Longitude,
      // });
    }
  }, [selectedEquipment]);

  return (
    <section className={classes.container} ref={mapContainerRef}>
      {showStatusPanel && (
        <div className={classes.statusBar}>
          <p>Longitude: {viewport.longitude.toFixed(3)}</p>
          <p>Latitude: {viewport.latitude.toFixed(3)}</p>
          <p>Zoom: {viewport.zoom.toFixed(2)}</p>
        </div>
      )}
      <ReactMapGL
        ref={mapRef}
        {...MAP_STYLE}
        {...MAP_CONFIG}
        {...viewport}
        onMove={(e) => {
          setViewport(e.viewState);
        }}
      >
        {equipments.map((equ) => {
          if (equ.telematicData)
            return (
              <Marker
                key={equ.telematicData.EquipmentHeader.SerialNumber}
                latitude={equ.telematicData.Location.Latitude}
                longitude={equ.telematicData.Location.Longitude}
              >
                <button
                  className={classes.markerBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectEquipment(equ);
                  }}
                >
                  <MarkerIcon />
                </button>
              </Marker>
            );
          return null;
        })}

        <CustomMapPopup />
      </ReactMapGL>
    </section>
  );
};
