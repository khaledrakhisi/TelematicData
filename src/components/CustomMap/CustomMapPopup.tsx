import { useContext } from "react";
import { Popup } from "react-map-gl";

import TelematicDataContext from "../../store/telematicDataContext";

import classes from "./CustomMapPopup.module.scss";

export const CustomMapPopup = () => {
  const {
    selectedEquipment,
    setSelectEquipment,
    filterCheckFuel,
    filterCheckOverOperating,
    filterCheckUnderutilization,
  } = useContext(TelematicDataContext);
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
        Fuel:{" "}
        <span>
          Consumed: {selectedEquipment.telematicData.FuelUsed.FuelConsumed} |{" "}
        </span>
        <span
          style={{
            color: `${
              filterCheckFuel(selectedEquipment.telematicData) ? "red" : "#000"
            }`,
          }}
        >
          Remaining: {selectedEquipment.telematicData.FuelRemaining.Percent}%
        </span>
      </p>
      <p
      // style={{
      //   color: `${
      //     filterCheckDistance(selectedEquipment.telematicData)
      //       ? "red"
      //       : "#000"
      //   }`,
      // }}
      >
        Travelled: {selectedEquipment.telematicData.Distance.Odometer}{" "}
        {selectedEquipment.telematicData.Distance.OdometerUnits}
      </p>
      <p>
        Work:{" "}
        <span
          style={{
            color: `${
              filterCheckOverOperating(selectedEquipment.telematicData)
                ? "red"
                : "#000"
            }`,
          }}
        >
          Operating:
          {selectedEquipment.telematicData.CumulativeOperatingHours.Hour}
        </span>{" "}
        |{" "}
        <span
          style={{
            color: `${
              filterCheckUnderutilization(selectedEquipment.telematicData)
                ? "red"
                : "#000"
            }`,
          }}
        >
          Idle: {selectedEquipment.telematicData.CumulativeIdleHours.Hour}
        </span>
      </p>
      <p>
        Engine:{" "}
        <span
          style={{
            color: `${
              selectedEquipment.telematicData.EngineStatus.Running
                ? "green"
                : "#000"
            }`,
          }}
        >
          {selectedEquipment.telematicData.EngineStatus.Running
            ? "Running"
            : "Off"}
        </span>
      </p>
    </Popup>
  );
};
