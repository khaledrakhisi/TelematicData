import React from "react";

import { ReactComponent as ExclamationIcon } from "../../assets/images/exclamation.svg";

import classes from "./ExclamationMark.module.scss";

export const ExclamationMark = () => {
  return <ExclamationIcon className={classes.exclamationIcon} />;
};
