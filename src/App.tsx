import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoadingSpinner from "./components/LoadingSpinner";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import { Machines } from "./pages/Machines";

import "./scss/App.scss";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
// const Customers = React.lazy(() => import("./pages/Customers"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
// const BlankPage = React.lazy(() => import("./pages/BlankPage"));
// const Login = React.lazy(() => import("./pages/Login"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner asOverlay />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/products" element={<Machines />} />
              {/* <Route path="/products/:productId" element={<ProductEdit />} /> */}
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
