import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoadingSpinner from "./components/LoadingSpinner";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import "./scss/App.scss";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const EquipmentPage = React.lazy(() => import("./pages/EquipmentPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner asOverlay />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/equipments" element={<EquipmentPage />} />
              {/* <Route path="/equipments/:equipmentId" element={<Machine />} /> */}
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
