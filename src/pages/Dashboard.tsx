import React, { useContext } from "react";

import { mocked_telematicData } from "../apis/data";
import { CustomMap } from "../components/CustomMap";
import Button from "../components/ui/Button";
import TelematicDataContext from "../store/telematicDataContext";

function Dashboard() {
  const { addObject } = useContext(TelematicDataContext);

  return (
    <section>
      <h2 className="title">Dashboard</h2>
      <Button
        onClick={() => {
          addObject(mocked_telematicData[0]);
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
