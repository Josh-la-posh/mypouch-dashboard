import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SettingsProvider } from '../services/context/SettingsProvider';
import SettingsSidebar from '../components/settings-sidebar';

const SettingsLayout = () => {
  const navigate = useNavigate();

  return (
    <SettingsProvider>
      <div className="h-full overflow-y-scroll scrollbar-none ">
        <div className="md:flex md:h-full">
          <div className={`h-full text-xs font-[500] flex md:flex-col items-center md:items-start justify-between gap-5 md:gap-0 mb-10 md:mg-0 md:border-r-2 border-r-app-bg dark:border-r-[#20263D] md:pr-5`}>
              <button onClick={() => navigate(-1)} className='text-primary dark:text-white ml-3 md:mb-5 flex items-center gap-2 text-xs'><ArrowLeft size={'14px'}/> <span className='hidden md:block'>Go Back</span></button>
              <SettingsSidebar />
              <div className="hidden md:block"></div>
              <div className="hidden md:block"></div>
              <div className="hidden md:block"></div>
          </div>
          <main className={`h-full pt-3 grow`}>
            <div className='h-full overflow-y-scroll scrollbar-none md:pl-5'>
              <Outlet />
            </div>
          </main>

        </div>
      </div>
    </SettingsProvider>
  );
};

export default SettingsLayout;