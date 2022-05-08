import React from "react";
import ReactDOM from "react-dom/client";

import { LoginContextProvider } from "./store/loginContext";
import { MapContextProvider } from "./store/mapContext";
import { SidebarContextProvider } from "./store/sidebarContext";
import { ThemeContextProvider } from "./store/themeContext";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <ThemeContextProvider>
        <SidebarContextProvider>
          <MapContextProvider>
            <App />
          </MapContextProvider>
        </SidebarContextProvider>
      </ThemeContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
