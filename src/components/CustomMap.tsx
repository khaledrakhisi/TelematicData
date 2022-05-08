import React, { useContext, useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { ReactComponent as MarkerIcon } from "../assets/images/marker.svg";
import { IMappable } from "../interfaces/IMappable";
import MapContext from "../store/mapContext";

import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./CustomMap.module.scss";

const accessToken =
  "pk.eyJ1Ijoia2hhbGVkciIsImEiOiJja3BzN2t1OHMwZHQxMm5vY25tY3Q3NHI5In0.akzVvXBLn643NdB94sZaGg";

interface ICustomMapProps {
  defaultPosition: IMappable;
  zoomLevel: number;
}

export const CustomMap: React.FunctionComponent<ICustomMapProps> = ({
  defaultPosition,
  zoomLevel,
}) => {
  const [viewport, setViewPort] = useState({});
  const { objects } = useContext(MapContext);
  const [selectedObject, setSelectedObject] = useState<IMappable | null>(null);

  return (
    <section className={classes.container}>
      {/* <div className={classes.statusBar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
      <ReactMapGL
        initialViewState={{
          latitude: 17.56,
          longitude: -20.35,
          zoom: 3.5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/khaledr/cl2wa8agc00al15omwujaierw"
        mapboxAccessToken={accessToken}
      >
        {objects.map((obj) => (
          <Marker
            key={obj.Location.AltitudeUnits}
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
              {"CAT"}, {"345GEFG6"} |{"  "}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=`}
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
