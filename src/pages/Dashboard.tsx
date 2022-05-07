import React, { useContext } from "react";

import { CustomMap } from "../components/CustomMap";
import MapContext, { MapContextProvider } from "../store/mapContext";

function Dashboard() {
  const { addMarker } = useContext(MapContext);
  return (
    <MapContextProvider>
      <section>
        <h2 className="title">Dashboard</h2>
        <CustomMap
          zoomLevel={7}
          defaultPosition={{
            Location: {
              Latitude: 123,
              Altitude: 70,
              Longitude: 435,
              AltitudeUnits: "meter",
            },
          }}
        />
      </section>
    </MapContextProvider>
  );
}

export default Dashboard;
