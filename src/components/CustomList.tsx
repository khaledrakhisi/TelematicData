import React, { useContext } from "react";

import TelematicDataContext from "../store/telematicDataContext";

import classes from "./CustomList.module.scss";

export const CustomList: React.FunctionComponent = () => {
  const { objects, selectObject } = useContext(TelematicDataContext);

  return (
    <section className={classes.container}>
      <ul className={classes.customlist}>
        {objects &&
          objects.map((obj) => (
            <li
              key={obj.EquipmentHeader.id}
              className={classes.customlist__item}
              onClick={() => {
                selectObject(obj);
              }}
            >
              {obj.EquipmentHeader.pic && (
                <img src={obj.EquipmentHeader.pic} alt="" />
              )}
              <p>
                {obj.EquipmentHeader.OEMName} - {obj.EquipmentHeader.Model}
              </p>
            </li>
          ))}
      </ul>
    </section>
  );
};
