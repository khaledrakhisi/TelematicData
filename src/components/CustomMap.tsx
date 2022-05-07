import React, { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import { IMappable } from "../interfaces/IMappable";

import classes from "./CustomMap.module.scss";
import MapContext from "../store/mapContext";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2hhbGVkciIsImEiOiJja3BzN2t1OHMwZHQxMm5vY25tY3Q3NHI5In0.akzVvXBLn643NdB94sZaGg";

interface ICustomMapProps {
  defaultPosition: IMappable;
  zoomLevel: number;
}

export const CustomMap: React.FunctionComponent<ICustomMapProps> = ({
  defaultPosition,
  zoomLevel,
}) => {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(defaultPosition.Location.Longitude);
  const [lat, setLat] = useState(defaultPosition.Location.Latitude);
  const [zoom, setZoom] = useState(zoomLevel);
  const { objects } = useContext(MapContext);

  useEffect(() => {
    if (map.current) {
      return;
    } // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) {
      return;
    } // wait for map to initialize
    map.current.on("move", () => {
      setLng(Number(map.current!.getCenter().lng.toFixed(4)));
      setLat(Number(map.current!.getCenter().lat.toFixed(4)));
      setZoom(Number(map.current!.getZoom().toFixed(2)));
    });
  });

  return (
    <section className={classes.container}>
      <div className={classes.statusBar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className={classes.mapContainer} />
    </section>
  );
};
