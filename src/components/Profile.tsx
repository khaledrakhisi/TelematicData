import { ReactComponent as AvatarICon } from "../assets/images/avatar.svg";

import classes from "./Profile.module.scss";

function Profile() {
  return (
    <div className={classes.profile}>
      <div className={classes.profile__avatar}>
        <AvatarICon />
      </div>
      <div className={classes.profile__info}>
        <p className={classes.profile__userName}>{"admin"}</p>
      </div>
    </div>
  );
}

export default Profile;
