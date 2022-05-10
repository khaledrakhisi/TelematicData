import React, { useContext, useEffect } from "react";

import useFetch from "../hooks/useFetch";
import { IEquipment } from "../interfaces/IEquipment";
import { ITelematicData } from "../interfaces/ITelematicData";
import TelematicDataContext from "../store/telematicDataContext";

import classes from "./EquipmentListItem.module.scss";

interface IEquipmentProps extends IEquipment {
  onClickHandle: (e: React.MouseEvent) => void;
}
export const EquipmentListItem: React.FunctionComponent<IEquipmentProps> = ({
  Model,
  OEMName,
  SerialNumber,
  pic,
  onClickHandle,
}) => {
  const { data, error, status, sendRequest } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/:${SerialNumber}`
  );
  const { setEquipments, updateEquipment } = useContext(TelematicDataContext);

  useEffect(() => {
    const interval = setInterval(() => {
      sendRequest();
    }, 5e3);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (status === "fetched" && data) {
      updateEquipment(SerialNumber, {
        Model,
        OEMName,
        SerialNumber,
        pic,
        telematicData: data as ITelematicData,
      });
    }
  }, [status]);

  return (
    <li
      key={SerialNumber}
      className={classes.equipment_listitem}
      onClick={(e) => {
        onClickHandle(e);
      }}
    >
      {pic && <img src={pic} alt="" />}
      <p>
        {OEMName} - {Model}
      </p>
    </li>
  );
};
