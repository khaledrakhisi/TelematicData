import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { images } from "../constants/images";
import LoginContext from "../store/loginContext";

import classes from "./Login.module.scss";

function LoginBox() {
  const loginCtx = useContext(LoginContext);
  const userNameRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();

  let isValid = true;
  function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    isValid = userNameRef.current?.value === "admin";
    if (userNameRef.current) {
      // console.log(userNameRef.current, isValid);
      if (isValid) {
        loginCtx.toggleLogin();
        navigate("/");
      } else {
        userNameRef.current.focus();
        errorMessageRef.current?.setAttribute(
          "style",
          "display: inline-block;opacity: 1"
        );
      }
    }
  }

  return (
    <section className={`${classes.container}`}>
      <div className={classes.loginBox}>
        <div className={classes.logo}>
          <img src={images.logo.default} alt="flexcavo" />
        </div>
        <h2 className={classes.title}>{""}</h2>
        <form onSubmit={loginHandler}>
          <Input
            ref={userNameRef}
            type={"text"}
            id={"userName"}
            placeholder={"admin"}
            label="User name"
          />
          <span ref={errorMessageRef} className={classes.errorMessage}>
            {"the username is 'admin'"}
          </span>
          <Input
            type={"password"}
            id={"password"}
            value={"admin"}
            readonly={true}
            label="Password"
          />
          <Button type="submit">{"Login"}</Button>
          <Link className={classes.forgat_pass} to="/">
            {"Forgot your password ?"}
          </Link>
          <div className={classes.checkbox}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">{"Remember me"}</label>
          </div>
        </form>
      </div>

      <div className={classes.keyPic} data-testid="keypic">
        <img src={images.dashboard} alt="illustrator key" />
      </div>
    </section>
  );
}

export default LoginBox;
