import React from "react";

import LangBox from "./LangBox";
import Profile from "./Profile";
import ThemeBox from "./ThemeBox";

import classes from "./TopNavRightBox.module.scss";

function TopNavRightBox() {
  return (
    <div className={classes.topNavBox_right}>
      <div className={classes.wrapper}>
        <LangBox />
        <ThemeBox />
      </div>
      <Profile />
    </div>
  );
}

export default TopNavRightBox;
