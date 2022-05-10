import { useContext } from "react";
import { Popup } from "react-map-gl";

import TelematicDataContext from "../../store/telematicDataContext";

import classes from "./CustomMapPopup.module.scss";

export const CustomMapPopup = () => {
  const { selectedEquipment, setSelectEquipment } =
    useContext(TelematicDataContext);
  if (!selectedEquipment || !selectedEquipment.telematicData) {
    return <div></div>;
  }
  return (
    <Popup
      className={classes.popup}
      key={selectedEquipment.telematicData.Location.Altitude}
      latitude={selectedEquipment.telematicData.Location.Latitude}
      longitude={selectedEquipment.telematicData.Location.Longitude}
      anchor="bottom-left"
      onClose={() => {
        setSelectEquipment(null);
      }}
    >
      <div>
        {selectedEquipment.telematicData.EquipmentHeader.OEMName} -{" "}
        {selectedEquipment.telematicData.EquipmentHeader.Model} |{" "}
        <a
          target="_new"
          href="http://en.wikipedia.org/w/index.php?title=Special:Search="
        >
          See details
        </a>
      </div>
      <img src={`${selectedEquipment.pic}`} alt="Equipment" width={50} />
      <p>
        Fuel consumed: {selectedEquipment.telematicData.FuelUsed.FuelConsumed}{" "}
        {selectedEquipment.telematicData.FuelUsed.FuelUnits}
      </p>
      <p>
        Fuel remaining: {selectedEquipment.telematicData.FuelRemaining.Percent}%
      </p>
      <p>
        Travelled: {selectedEquipment.telematicData.Distance.Odometer}{" "}
        {selectedEquipment.telematicData.Distance.OdometerUnits}
      </p>
    </Popup>
  );
};
