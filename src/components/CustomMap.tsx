import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSize } from "react-hook-size";
import ReactMapGL, { Marker, NavigationControl, Popup } from "react-map-gl";
import { maxBy, minBy } from "lodash";
import WebMercatorViewport from "viewport-mercator-project";

import { ReactComponent as MarkerIcon } from "../assets/images/marker.svg";
import { IMappable } from "../interfaces/IMappable";
import { ITelematicData } from "../interfaces/ITelematicData";
import TelematicDataContext from "../store/telematicDataContext";

import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./CustomMap.module.scss";

const MAP_STYLE = { width: "100%", height: "100%" };
const MAP_CONFIG = {
  maxZoom: 3.5,
  mapStyle: "mapbox://styles/khaledr/cl2wa8agc00al15omwujaierw",
  mapboxAccessToken:
    "pk.eyJ1Ijoia2hhbGVkciIsImEiOiJja3BzN2t1OHMwZHQxMm5vY25tY3Q3NHI5In0.akzVvXBLn643NdB94sZaGg",
};

const getMinOrMax = (
  markers: ITelematicData[],
  minOrMax: "max" | "min",
  latOrLng: "Latitude" | "Longitude"
) => {
  if (minOrMax === "max") {
    return (maxBy(markers, (value) => value.Location[latOrLng]) as any)[
      latOrLng
    ];
  }
  return (minBy(markers, (value) => value.Location[latOrLng]) as any)[latOrLng];
};

const getBounds = (markers: ITelematicData[]) => {
  const maxLat = getMinOrMax(markers, "max", "Latitude");
  const minLat = getMinOrMax(markers, "min", "Latitude");
  const maxLng = getMinOrMax(markers, "max", "Longitude");
  const minLng = getMinOrMax(markers, "min", "Longitude");

  const southWest = [minLng, minLat];
  const northEast = [maxLng, maxLat];
  return [southWest, northEast];
};

interface ICustomMapProps {
  defaultPosition: IMappable;
  zoomLevel: number;
}

export const CustomMap: React.FunctionComponent<ICustomMapProps> = ({
  defaultPosition,
  zoomLevel,
}) => {
  const [viewport, setViewport] = useState({
    latitude: 30.6506679,
    longitude: 48.6886386,
    zoom: 3.5,
  });
  const { objects } = useContext(TelematicDataContext);
  const [selectedObject, setSelectedObject] = useState<ITelematicData | null>(
    null
  );
  const mapContainerRef = React.useRef(null);
  const mapRef = React.useRef(null);

  const { width, height } = useSize(mapContainerRef);

  // useEffect(() => {
  //   if (width && height && objects && objects.length > 0) {
  //     const MARKERS_BOUNDS = getBounds(objects);
  //     setViewport((viewport) => {
  //       const NEXT_VIEWPORT = new WebMercatorViewport({
  //         ...(viewport as WebMercatorViewport),
  //         width,
  //         height,
  //       }).fitBounds(MARKERS_BOUNDS as [[number, number], [number, number]], {
  //         padding: 100,
  //       });
  //       return NEXT_VIEWPORT;
  //     });
  //   }
  // }, [width, height, objects]);

  useEffect(() => {
    if (objects && objects.length) {
      setViewport({
        ...viewport,
        latitude: objects[objects.length - 1].Location.Latitude,
        longitude: objects[objects.length - 1].Location.Longitude,
      });
    }
  }, [objects]);

  return (
    <section className={classes.container} ref={mapContainerRef}>
      {/* <div className={classes.statusBar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
      <ReactMapGL
        ref={mapRef}
        {...MAP_STYLE}
        {...MAP_CONFIG}
        {...viewport}
        onMove={(e) => {
          setViewport(e.viewState);
        }}
      >
        {objects.map((obj) => (
          <Marker
            key={obj.EquipmentHeader.id}
            latitude={obj.Location.Latitude}
            longitude={obj.Location.Longitude}
          >
            <button
              className={classes.markerBtn}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedObject(obj);
              }}
            >
              {/* <img src={images.markerIcon} alt="Machine Icon" /> */}
              <MarkerIcon />
            </button>
          </Marker>
        ))}

        {selectedObject && (
          <Popup
            key={selectedObject.Location.Altitude}
            latitude={selectedObject.Location.Latitude}
            longitude={selectedObject.Location.Longitude}
            anchor="bottom-left"
            onClose={() => {
              setSelectedObject(null);
            }}
          >
            <div>
              {selectedObject.EquipmentHeader.OEMName},
              {selectedObject.EquipmentHeader.Model} |{"  "}
              <a
                target="_new"
                href="http://en.wikipedia.org/w/index.php?title=Special:Search="
              >
                See details
              </a>
            </div>
            <img width="100%" src={""} alt="Machine" />
          </Popup>
        )}
      </ReactMapGL>
    </section>
  );
};
