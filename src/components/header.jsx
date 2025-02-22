import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlignJustify, Mail, Bell, LogOut } from 'lucide-react';
import useTitle from '../services/hooks/useTitle';
import { useTheme } from '../services/context/ThemeProvider';

const Header = ({ openSidebar, setOpenSidebar, setIsSidebarTextVisible }) => {
  const sidebarWidth = openSidebar ? "md:w-72 w-48" : "md:w-48 w-20";
  const navigate = useNavigate();
  const { appTitle } = useTitle();
  const { theme, toggleTheme } = useTheme();
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

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
    setIsSidebarTextVisible(!openSidebar)
  }

  return (
    <header className="h-12 flex items-center text-black dark:text-white">
      <div className={`flex items-center justify-center gap-4 ${sidebarWidth}`}>
        <div className='w-12 h-12 text-primary font-[700]'><img src="/pouchLogo.svg" alt="Logo" /></div>
        <button className="" onClick={handleSidebar}>
          <AlignJustify size='16px' />
        </button>
        <div className='text-lg font-semibold ml-3'>{appTitle ?? ''}</div>
      </div>
      <div className="px-3 flex-grow flex justify-between items-center">
        <div className="text-xs">{currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}</div>
        <div className="flex gap-6 border-x border-[#664c89] px-12">
          <div className="relative">
            <Mail size='15px' />
            <div className="absolute top-[-5px] right-[-5px] h-3 w-3 text-[7px] text-white bg-red-700 rounded-full flex justify-center items-center">1</div>
          </div>
          <div className="relative">
            <Bell size='15px' />
            <div className="absolute top-[-5px] right-[-5px] h-3 w-3 text-[7px] text-white bg-red-700 rounded-full flex justify-center items-center">1</div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button 
            onClick={toggleTheme} 
            className="p-2 bg-primary dark:bg-primary-dark text-white rounded-md transition-all"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <button onClick={handleLogout} className='flex items-center gap-2 text-sm'>
            <LogOut size='14px'/>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;