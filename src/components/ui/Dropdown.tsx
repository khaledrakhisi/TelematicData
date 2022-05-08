import React from "react";

import classes from "./Dropdown.module.scss";

type TOptionItem = {
  label: string;
  value: string;
};

interface IDropdown {
  dropdownData: TOptionItem[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Dropdown: React.FC<IDropdown> = (props) => {
  //   const selectRef = useRef<HTMLSelectElement | null>(null);

  return (
    <div className={` subTitle ${classes.form__control}`}>
      <label htmlFor="category">{"category"}</label>
      <select
        name="category"
        className={classes.select}
        id="category"
        onChange={props.onChange}
      >
        {props.dropdownData.map((item, index) => (
          <option key={`${item.label + index}`} value={item.value}>
            {`${item.label}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
