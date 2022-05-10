import React, { useContext, useEffect } from "react";

import TelematicDataContext from "../store/telematicDataContext";

import { EquipmentListItem } from "./EquipmentListItem";

import classes from "./CustomList.module.scss";

export const CustomList: React.FunctionComponent = () => {
  const { equipments, setSelectEquipment } = useContext(TelematicDataContext);

  return (
    <section className={classes.container}>
      <ul className={classes.customlist}>
        {equipments.length > 0
          ? equipments.map((equ) => (
              <EquipmentListItem
                key={equ.SerialNumber}
                {...equ}
                onClickHandle={() => setSelectEquipment(equ)}
              />
            ))
          : "The list is empty, goto equipment section from left panel and define at leat one equipment."}
      </ul>
    </section>
  );
};
