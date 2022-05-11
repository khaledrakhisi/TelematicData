import ThemeBox from "./ui/ThemeBox";
import Profile from "./Profile";

import classes from "./TopNavRightBox.module.scss";

function TopNavRightBox() {
  return (
    <div className={classes.topNavBox_right}>
      <div className={classes.wrapper}>
        <ThemeBox />
      </div>
      <Profile />
    </div>
  );
}

export default TopNavRightBox;
