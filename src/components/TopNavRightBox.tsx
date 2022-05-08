import React from "react";

import ThemeBox from "./ui/ThemeBox";
import LangBox from "./LangBox";
import Profile from "./Profile";

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
