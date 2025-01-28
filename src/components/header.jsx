import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './button';
import { AlignJustify } from 'lucide-react';
import useTitle from '../services/hooks/useTitle';


const Header = ({ openSidebar, setOpenSidebar, setIsSidebarTextVisible }) => {
  const navigate = useNavigate();
  const { appTitle } = useTitle();

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
    <header className="bg-white flex justify-between items-center">
      <div className="">
        <button className="" onClick={handleSidebar}>
          <AlignJustify />
        </button>
        <div className='text-lg font-semibold ml-3'>{appTitle ?? ''}</div>
      </div>
      <Button onClick={handleLogout} variant='secondary'>
        Logout
      </Button>
    </header>
  );
};

export default Header;