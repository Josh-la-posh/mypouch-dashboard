import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminManagementSidebar from '../components/admin-management-sidebar';

const AdminManagementLayout = () => {

  return (
    <div className="w-full h-full max-h-svh relative">
      <div className={`h-full text-xs font-[500] absolute top-10 left-0`}>
          <AdminManagementSidebar />
      </div>
      <main className={`h-full pt-3 overflow-hidden`}>
          <div className='ml-60 h-full overflow-y-scroll scrollbar-none'>
              <Outlet />
          </div>
      </main>
    </div>
  );
};

export default AdminManagementLayout;