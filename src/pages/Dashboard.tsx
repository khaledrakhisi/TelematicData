import React, { useContext } from "react";

import { mocked_telematicData } from "../apis/data";
import { CustomList } from "../components/CustomList";
import { CustomMap } from "../components/CustomMap";
import Button from "../components/ui/Button";
import { equipmentIcons } from "../constants/images";
import TelematicDataContext from "../store/telematicDataContext";

function Dashboard() {
  const { addObject } = useContext(TelematicDataContext);

  return (
    <section>
      <h2 className="title">Dashboard</h2>
      <Button
        onClick={() => {
          addObject({
            ...mocked_telematicData[0],
            EquipmentHeader: {
              ...mocked_telematicData[0].EquipmentHeader,
              pic: equipmentIcons[Math.floor(Math.random() * 5)],
            },
          });
        }}
      >
        Add marker
      </Button>
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
