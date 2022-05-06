import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

type TTheme = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<TTheme>({
  theme: "",
  toggleTheme: () => {},
});

interface IThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FunctionComponent<
  IThemeContextProviderProps
> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light";
    });
  }

  const themeValue: TTheme = {
    theme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
