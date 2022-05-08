import React, { useContext, useEffect } from "react";

import { CustomMap } from "../components/CustomMap";
import Button from "../components/ui/Button";
import MapContext, { MapContextProvider } from "../store/mapContext";

function Dashboard() {
  const { addMarker } = useContext(MapContext);

  return (
    <section>
      <h2 className="title">Dashboard</h2>
      <Button
        onClick={() => {
          addMarker({
            Location: {
              Latitude: 17.56,
              Longitude: -20.35,
              Altitude: 70,
              AltitudeUnits: "meter",
            },
          });
        }}
      >
        Add marker
      </Button>
      <CustomMap
        zoomLevel={7}
        defaultPosition={{
          Location: {
            Latitude: 0,
            Altitude: 0,
            Longitude: 0,
            AltitudeUnits: "meter",
          },
        }}
      />
    </section>
  );
}

export default Dashboard;
