import React from "react";
import { useLocalStorage } from "usehooks-ts";

type TLoginContext = {
  isLogin: boolean;
  toggleLogin: () => void;
};

const LoginContext = React.createContext<TLoginContext>({
  isLogin: false,
  toggleLogin: () => {},
});

interface ILoginContextProviderProps {
  children: React.ReactNode;
}

export const LoginContextProvider: React.FunctionComponent<
  ILoginContextProviderProps
> = ({ children }) => {
  const [isLogin, setIsLogin] = useLocalStorage("isLoggedin", false);

  function toggleLogin() {
    setIsLogin((prevState: boolean) => !prevState);
  }

  const loginValue: TLoginContext = {
    isLogin: isLogin,
    toggleLogin: toggleLogin,
  };

  return (
    <LoginContext.Provider value={loginValue}>{children}</LoginContext.Provider>
  );
};

export default LoginContext;
