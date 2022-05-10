import { useContext } from "react";
import { Popup } from "react-map-gl";

import TelematicDataContext from "../../store/telematicDataContext";

import classes from "./CustomMapPopup.module.scss";

export const CustomMapPopup = () => {
  const { selectedEquipment, setSelectEquipment, filterCheckFuel } =
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
      <h3>
        {selectedEquipment.telematicData.EquipmentHeader.OEMName} -{" "}
        {selectedEquipment.telematicData.EquipmentHeader.Model}
      </h3>
      <img src={`${selectedEquipment.pic}`} alt="Equipment" />
      <p>
        Fuel consumed: {selectedEquipment.telematicData.FuelUsed.FuelConsumed}{" "}
        {selectedEquipment.telematicData.FuelUsed.FuelUnits}
      </p>
      <p
        style={{
          color: `${
            filterCheckFuel(selectedEquipment.telematicData) ? "red" : "#000"
          }`,
        }}
      >
        Fuel remaining: {selectedEquipment.telematicData.FuelRemaining.Percent}%
      </p>
      <p>
        Travelled: {selectedEquipment.telematicData.Distance.Odometer}{" "}
        {selectedEquipment.telematicData.Distance.OdometerUnits}
      </p>
    </Popup>
  );
};
