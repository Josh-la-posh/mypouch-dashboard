import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/authenticated/Dashboard";
import Login from "../pages/unauthenticated/login";
import RequireAuth from "../pages/unauthenticated/RequiredAuth";
import MainLayout from "../layouts/MainLayout";

const RouteSystem = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<Login />} />

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouteSystem;
