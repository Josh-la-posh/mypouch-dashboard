import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Bell, LogOut } from 'lucide-react';
import useTitle from '../services/hooks/useTitle';

const Header = () => {
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
    <header className="flex items-center text-black dark:text-white">
      <div className='flex items-center justify-center gap-4 w-48'>
        <div className='w-12 h-12 text-primary font-[700]'><img src="/pouchLogo.svg" alt="Logo" /></div>
        {/* <button className="" onClick={handleSidebar}>
          <AlignJustify size='16px' />
        </button> */}
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