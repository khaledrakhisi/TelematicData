import React, { useContext } from "react";

import { equipmentIcons, images } from "../constants/images";
import TelematicDataContext from "../store/telematicDataContext";

import classes from "./CustomList.module.scss";

export const CustomList: React.FunctionComponent = () => {
  const { objects } = useContext(TelematicDataContext);

  return (
    <section className={classes.container}>
      <ul className={classes.customlist}>
        {objects &&
          objects.map((obj) => (
            <li
              key={obj.EquipmentHeader.id}
              className={classes.customlist__item}
            >
              <img src={obj.EquipmentHeader.pic} alt="" />
              <p>
                {obj.EquipmentHeader.OEMName} - {obj.EquipmentHeader.Model}
              </p>
            </li>
          ))}
      </ul>
    </section>
  );
};
