import React from "react";

import { ReactComponent as WaitIcon } from "../../assets/images/wait.svg";

import classes from "./WaitMark.module.scss";

export const WaitMark = () => {
  return <WaitIcon className={classes.waitIcon} />;
};
