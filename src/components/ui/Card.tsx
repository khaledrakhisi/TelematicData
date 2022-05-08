import React from "react";

import classes from "./Card.module.scss";

interface ICardProps {
  children: React.ReactNode;
}

const Card: React.FunctionComponent<ICardProps> = ({ children }) => {
  return <div className={classes.card}>{children}</div>;
};

export default Card;
