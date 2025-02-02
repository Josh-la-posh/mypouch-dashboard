import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/authenticated/Dashboard";
import Login from "../pages/unauthenticated/login";
import RequireAuth from "../pages/unauthenticated/RequiredAuth";
import MainLayout from "../layouts/MainLayout";
import Settings from "../pages/authenticated/Settings";
import User from "../pages/authenticated/user";
import Admin from "../pages/authenticated/Admin";
import Messages from "../pages/authenticated/Messages";
import UserDetails from "../components/user-details";

const RouteSystem = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<Login />} />

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user">
            <Route path="" element={<User />} />
            <Route path="details" element={<UserDetails />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouteSystem;
