import React, { useContext, useEffect } from "react";

import useFetch from "../hooks/useFetch";
import { IEquipment } from "../interfaces/IEquipment";
import { ITelematicData } from "../interfaces/ITelematicData";
import TelematicDataContext from "../store/telematicDataContext";

import { ExclamationMark } from "./ui/ExclamationMark";

import classes from "./EquipmentListItem.module.scss";

interface IEquipmentProps extends IEquipment {
  onClickHandle: (e: React.MouseEvent, equ: IEquipment) => void;
}
export const EquipmentListItem: React.FunctionComponent<IEquipmentProps> = ({
  Model,
  OEMName,
  SerialNumber,
  pic,
  isNeedAttention,
  onClickHandle,
}) => {
  const { data, status, sendRequest } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/equipments/:${SerialNumber}`
  );
  const { updateEquipment, settings } = useContext(TelematicDataContext);

  useEffect(() => {
    const interval = setInterval(() => {
      sendRequest();
      // clearInterval(interval);
    }, 1e4);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (status === "fetched" && data) {
      // console.log(equipments);

      /**
       *
       * Check the thresholds here
       */

      let itNeedsAttention: boolean = false;
      // 1) Fuel Thresholds
      itNeedsAttention =
        (data as ITelematicData).FuelRemaining.Percent <
        settings!.fuelThreshold;

      // 2) operatedOutOfHours
      const todaysDayofWeek = new Date().getDay();
      itNeedsAttention =
        (data as ITelematicData).CumulativeOperatingHours.Hour > 1 &&
        settings!.operatedOutOfHours.includes(todaysDayofWeek);

      // 3) If Equipment has been stolen (Grand theft auto!)
      // itNeedsAttention =
      //   (data as ITelematicData).Distance.Odometer >
      //   settings!.distanceThreshold;

      updateEquipment(SerialNumber, {
        Model,
        OEMName,
        SerialNumber,
        pic,
        telematicData: data as ITelematicData,
        isNeedAttention: itNeedsAttention,
      });
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
          isNeedAttention,
        });
      }}
    >
      {isNeedAttention && <ExclamationMark />}
      {pic && <img src={pic} alt="" />}
      <p>
        {OEMName} - {Model}
      </p>
    </li>
  );
};
