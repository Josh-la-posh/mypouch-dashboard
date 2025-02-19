import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AdminSidebar from '../components/admin-sidebar';
import { SettingsProvider } from '../services/context/SettingsProvider';

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <SettingsProvider>
      <div className="w-full h-full max-h-svh relative">
        <div className={`h-full text-xs font-[500] absolute top-30 left-0`}>
          <AdminSidebar />
        </div>
        <main className={`h-full pt-3 overflow-hidden`}>
          <button onClick={() => navigate(-1)} className='text-priColor dark:text-white ml-3 mb-5 flex items-center gap-2 text-xs'><ArrowLeft size={'14px'}/> Go Back</button>
          <div className='ml-48 h-full overflow-y-scroll scrollbar-none'>
            <Outlet />
          </div>
        </main>
      </div>
    </SettingsProvider>
  );
};

export default AdminLayout;