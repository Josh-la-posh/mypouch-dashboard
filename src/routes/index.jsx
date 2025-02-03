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
import AdminLayout from "../layouts/AdminLayout";
import AdminPendingRequest from "../pages/authenticated/AdminPendingRequest";
import AdminManagement from "../pages/authenticated/AdminManagement";
import AdminAddAdmin from "../pages/authenticated/AdminAddAdmin";
import AdminSetCurrencies from "../pages/authenticated/AdminSetCurrencies";

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
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin">
              <Route path='pending-request' element={<AdminPendingRequest />} />
              <Route path='set-currencies' element={<AdminSetCurrencies />} />
              <Route path='add-admin' element={<AdminAddAdmin />} />
              <Route path='admin-management' element={<AdminManagement />} />
            </Route>
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
