import { Routes, Route } from "react-router-dom";
import Login from "../pages/unauthenticated/login";
import RequireAuth from "../pages/unauthenticated/RequiredAuth";
import MainLayout from "../layouts/MainLayout";
import User from "../pages/authenticated/users/User";
import Messages from "../pages/authenticated/messages/Messages";
import UserDetails from "../components/user-details";
import AdminLayout from "../layouts/AdminLayout";
import AdminPendingRequest from "../pages/authenticated/admin/AdminPendingRequest";
import AdminAddAdmin from "../pages/authenticated/admin/admin-management/AdminAddAdmin";
import Dashboard from "../pages/authenticated/dashboard/Dashboard";
import CurrencyExchangeLimit from "../pages/authenticated/admin/currency-management/currency-exchange-limit";
import AllAdminPage from "../pages/authenticated/admin/admin-management/AllAdmin";
import SettingsLayout from "../layouts/SettingsLayout";
import TransactionFeeManagement from "../pages/authenticated/admin/currency-management/TransactionFeeManagement";
import AdminSetCurrencies from "../pages/authenticated/admin/currency-management/AdminSetCurrencies";
import AdminViewSetCurrencies from "../pages/authenticated/admin/currency-management/AdminViewSetCurrencies";
import AdminCurrency from "../pages/authenticated/admin/currency-management/AdminCurrencies";
import Transactions from "../pages/authenticated/transactions/Transactions";
import PouchWallet from "../pages/authenticated/admin/pouch-wallet/PouchWallet";
import AdminSupportiveForm from "../pages/authenticated/admin/admin-management/AdminSupportiveForm";
import PouchFundingSuccess from "../pages/authenticated/admin/pouch-wallet/SuccessPage";
import Profile from "../pages/authenticated/settings/Profile";
import NotificationSettings from "../pages/authenticated/settings/notification";
import SecuritySettings from "../pages/authenticated/settings/security/SecuritySettings";
import ChangePassword from "../pages/authenticated/settings/security/ChangePassword";
import AuditLog from "../pages/authenticated/settings/security/AuditLogs";

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
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin">
              <Route path='pending-request' element={<AdminPendingRequest />} />
              <Route path='currency' element={<AdminCurrency />} />
              <Route path='currency/set-currencies' element={<AdminSetCurrencies />} />
              <Route path='currency/view-currencies' element={<AdminViewSetCurrencies />} />
              <Route path='currency/exchange-limit' element={<CurrencyExchangeLimit />} />
              <Route path='currency/commission-rate' element={<TransactionFeeManagement />} />
              <Route path='add-admin' element={<AdminAddAdmin />} />
              <Route path='all' element={<AllAdminPage />} />
              <Route path='pouch-wallet' element={<PouchWallet />} />
              {/* <Route path='admin-management' element={<AdminManagementLayout />}>
                <Route path='suspicious-login-activities' element={<SuspiciousLoginActivities />} />                
                </Route> */}
            </Route>
          </Route>
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<SettingsLayout />}>
            <Route path="/settings">
            <Route path='profile' element={<Profile />} />
            <Route path='security' element={<SecuritySettings />} />
            <Route path='security/audit-logs' element={<AuditLog />} />
              <Route path='security/change-password' element={<ChangePassword />} />
              <Route path='notification' element={<NotificationSettings />} />
            </Route>
          </Route>
        </Route>
      </Route>
      
      <Route path="/" element={<MainLayout />}>
        <Route path="/admin" element={<AdminLayout />}>
              <Route path='/admin/onboarding-form' element={<AdminSupportiveForm />} />
          <Route path='/admin/pouch-funding-success' element={<PouchFundingSuccess />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouteSystem;
