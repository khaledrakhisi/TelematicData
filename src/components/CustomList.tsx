import React, { useCallback, useContext, useEffect } from "react";

import useFetch from "../hooks/useFetch";
import { IEquipment } from "../interfaces/IEquipment";
import TelematicDataContext from "../store/telematicDataContext";

import { EquipmentListItem } from "./EquipmentListItem";
import LoadingSpinner from "./LoadingSpinner";

import classes from "./CustomList.module.scss";

export const CustomList: React.FunctionComponent = () => {
  const { sendRequest, data, status } = useFetch();
  const { equipments, setSelectEquipment, setEquipments } =
    useContext(TelematicDataContext);

  const ItemClickHandle = useCallback(
    (e: React.MouseEvent, equ: IEquipment) => {
      setSelectEquipment(equ);
    },
    [setSelectEquipment]
  );

  // Fetch all of the Equipments
  useEffect(() => {
    sendRequest(`${process.env.REACT_APP_BACKEND_URL}/equipments`, "GET");
  }, []);

  // Set the fetched equipments to the context just once
  useEffect(() => {
    if (status === "fetched") {
      setEquipments(data as Array<IEquipment>);
    }
  }, [status]);

  return (
    <section className={classes.container}>
      {status === "fetched" ? (
        <ul className={classes.customlist}>
          {equipments.length > 0
            ? equipments.map((equ) => (
                <EquipmentListItem
                  key={equ.SerialNumber}
                  {...equ}
                  onClickHandle={ItemClickHandle}
                />
              ))
            : "The list is empty, please define at leat one equipment from equipment section."}
        </ul>
      ) : (
        <LoadingSpinner asOverlay />
      )}
    </section>
  );
};
