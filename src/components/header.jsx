import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Bell, LogOut, Menu } from 'lucide-react';
import useTitle from '../services/hooks/useTitle';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { appTitle } = useTitle();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setTimeout(() => {
      localStorage.clear();
      navigate('/login');
    }, 1000)
  }

  return (
    <header className="h-[72px] sticky top-0 z-40 px-3 md:px-4 backdrop-blur bg-white/75 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 flex items-center text-slate-900 dark:text-white">
      <div className='flex-1 md:flex-0 flex items-center justify-start md:justify-center gap-3 w-auto lg:w-[250px]'>
        <div className='w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm p-1.5'><img src="/pouchLogo.svg" alt="Pouch logo" /></div>
        <div className='text-base md:text-lg font-semibold hidden sm:block'>{appTitle ?? ''}</div>
      </div>
      <div className="px-1 sm:px-2 flex-2 md:flex-grow flex justify-between items-center">
        <div className="text-xs text-slate-600 dark:text-slate-300 hidden md:block">{currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}</div>
        <div className="flex gap-5 border-x border-slate-300 dark:border-slate-700 px-4 md:px-8">
          <div className="relative text-slate-600 dark:text-slate-200">
            <Mail size='16px' />
            <div className="absolute top-[-6px] right-[-6px] h-4 min-w-4 px-0.5 text-[10px] leading-none text-white bg-red-600 rounded-full flex justify-center items-center">1</div>
          </div>
          <div className="relative text-slate-600 dark:text-slate-200">
            <Bell size='16px' />
            <div className="absolute top-[-6px] right-[-6px] h-4 min-w-4 px-0.5 text-[10px] leading-none text-white bg-red-600 rounded-full flex justify-center items-center">1</div>
          </div>
        </div>
        <div className="">
          <div className="hidden lg:flex items-center gap-5">
            
            <button onClick={handleLogout} className='flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors'>
              <LogOut size='14px'/>
              <span>Logout</span>
            </button>
          </div>
          {/* Hamburger menu for mobile */}
          <button 
            className="lg:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size='20px' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
