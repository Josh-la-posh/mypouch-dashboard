import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/unauthenticated/login";
import RequireAuth from "../pages/unauthenticated/RequiredAuth";
import MainLayout from "../layouts/MainLayout";
import Settings from "../pages/authenticated/settings/Settings";
import User from "../pages/authenticated/users/User";
import Admin from "../pages/authenticated/admin/Admin";
import Messages from "../pages/authenticated/messages/Messages";
import UserDetails from "../components/user-details";
import AdminLayout from "../layouts/AdminLayout";
import AdminPendingRequest from "../pages/authenticated/admin/AdminPendingRequest";
import AdminAddAdmin from "../pages/authenticated/admin/AdminAddAdmin";
import AdminSetCurrencies from "../pages/authenticated/admin/AdminSetCurrencies";
import Dashboard from "../pages/authenticated/dashboard/Dashboard";
import AdminSupportiveForm from "../pages/authenticated/admin/AdminSupportiveForm";
import AdminViewSetCurrencies from "../pages/authenticated/admin/AdminViewSetCurrencies";
import AdminManagementLayout from "../layouts/AdminManagementLayout";
import AdminChangePassword from "../pages/authenticated/admin/admin-management/ChangePassword";
import CurrencyExchangeLimit from "../pages/authenticated/admin/admin-management/currency-exchange-limit";
import SuspiciousLoginActivities from "../pages/authenticated/admin/admin-management/SuspiciousLoginAcitivities";
import AllAdminPage from "../pages/authenticated/admin/admin-management/AllAdmin";

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
            <Route path="details/:id" element={<UserDetails />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin">
              <Route path='pending-request' element={<AdminPendingRequest />} />
              <Route path='set-currencies' element={<AdminSetCurrencies />} />
              <Route path='view-currencies' element={<AdminViewSetCurrencies />} />
              <Route path='add-admin' element={<AdminAddAdmin />} />
              <Route path='onboarding-form' element={<AdminSupportiveForm />} />
              <Route path='admin-management' element={<AdminManagementLayout />}>
                <Route path='suspicious-login-activities' element={<SuspiciousLoginActivities />} />
                <Route path='admins/all' element={<AllAdminPage />} />
                <Route path='change-password' element={<AdminChangePassword />} />
                <Route path='currency-exchange-limit' element={<CurrencyExchangeLimit />} />

              </Route>
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
