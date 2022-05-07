import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import classes from "./CustomMap.module.scss";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2hhbGVkciIsImEiOiJja3BzN2t1OHMwZHQxMm5vY25tY3Q3NHI5In0.akzVvXBLn643NdB94sZaGg";

export const CustomMap = () => {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

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
