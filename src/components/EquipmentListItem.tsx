import React, { useContext, useEffect } from "react";

import useFetch from "../hooks/useFetch";
import { useTimer } from "../hooks/useTimer";
import { IEquipment } from "../interfaces/IEquipment";
import { ITelematicData } from "../interfaces/ITelematicData";
import TelematicDataContext from "../store/telematicDataContext";

import { ExclamationMark } from "./ui/ExclamationMark";
import { WaitMark } from "./ui/WaitMark";

import classes from "./EquipmentListItem.module.scss";

interface IEquipmentProps extends IEquipment {
  onClickHandle: (e: React.MouseEvent, equ: IEquipment) => void;
}
export const EquipmentListItem: React.FunctionComponent<IEquipmentProps> = ({
  Model,
  OEMName,
  SerialNumber,
  pic,
  telematicData,
  onClickHandle,
}) => {
  const { data, status, sendRequest } = useFetch();
  const { updateEquipment, checkAllFilters, settings } =
    useContext(TelematicDataContext);

  useTimer(() => {
    sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/equipments/:${SerialNumber}`,
      "GET"
    );
  }, settings!.fetchTimerInterval);

  useEffect(() => {
    if (status === "fetched" && data) {
      updateEquipment(SerialNumber, data as ITelematicData);
    }
  }, [status]);

  return (
    <li
      key={SerialNumber}
      className={classes.equipment_listitem}
      onClick={(e) => {
        onClickHandle(e, {
          Model,
          OEMName,
          SerialNumber,
          pic,
          telematicData: data as ITelematicData,
        });
      }}
    >
      {data && checkAllFilters(data as ITelematicData) && <ExclamationMark />}
      {status === "loading" && <WaitMark />}
      {pic && <img src={pic} alt="" />}
      <p>
        {OEMName} - {Model}
      </p>
    </li>
  );
};
