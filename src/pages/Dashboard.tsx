import React, { useContext, useEffect } from "react";

import { CustomList } from "../components/CustomList";
import { CustomMap } from "../components/CustomMap";
import { equipmentIcons } from "../constants/images";
import useFetch from "../hooks/useFetch";
import { ITelematicData } from "../interfaces/ITelematicData";
import TelematicDataContext from "../store/telematicDataContext";

function Dashboard() {
  const { addObject } = useContext(TelematicDataContext);
  const { data, error, status } = useFetch("http://fakeurl");

  useEffect(() => {
    if (status === "fetched" && data) {
      (data as Array<ITelematicData>).forEach((datum) => {
        addObject({
          ...datum,
          EquipmentHeader: {
            ...datum.EquipmentHeader,
            pic: equipmentIcons[Math.floor(Math.random() * 9)],
          },
        });
      });
    }
  }, [status]);

  return (
    <section>
      {status}
      <h2 className="title">Dashboard</h2>
      <CustomList />
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
