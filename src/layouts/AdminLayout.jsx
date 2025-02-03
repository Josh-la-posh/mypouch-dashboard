import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AdminSidebar from '../components/admin-sidebar';

const AdminLayout = ({children}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full max-h-svh relative">
        <div className={`h-full text-xs font-[500] absolute top-30 left-0`}>
            <AdminSidebar />
        </div>
        <main className={`h-full pt-3 overflow-hidden`}>
            <button onClick={() => navigate(-1)} className='text-priColor ml-3 mb-5 flex items-center gap-2 text-xs'><ArrowLeft size={'14px'}/> Go Back</button>
            <div className='ml-52 h-full overflow-y-scroll scrollbar-none'>
                <Outlet />
            </div>
        </main>
    </div>
  );
};

export default AdminLayout;