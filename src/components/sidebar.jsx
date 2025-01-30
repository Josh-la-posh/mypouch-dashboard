import { House, LayoutDashboard } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../services/hooks/useTitle';

const Sidebar = ({handleSidebar, isOpen}) => {
    const { appTitle } = useTitle();

    const sidebarItems = [
        {
            id: 1,
            icon: <House size={isOpen ? '18' : '22'} />,
            title: 'Home',
            url: '/',
            openSidebar: false
        },
        {
            id: 2,
            icon: <LayoutDashboard size={isOpen ? '18' : '22'} />,
            title: 'Dashboard',
            url: '/dashboard',
            openSidebar: false
        },
    ]

  return (
    <div className=" bg-black text-white py-8 px-6 text-[12px] sm:text-[14px] lg:text-[16px]">
        <nav className='flex-1 my-2'>
            {
                sidebarItems.map((item) => (
                    <Link key={item.id} to={item.url} onClick={() => handleSidebar(item.openSidebar)} className={`block py-4 ${appTitle === item.title ? 'text-priColor' : ''}`}>
                        <div className={`flex items-center ${isOpen ? '' : 'justify-center'} gap-2`}>
                            <button
                                data-tooltip-id={`tooltip-${item.id}`}
                                type='button'
                                className='relative'
                            >
                                {item.icon}
                            </button>
                            
                            <div className={`${isOpen ? 'block' : 'hidden'} text-sm font-[500]`}>{item.title}</div>
                        </div>
                    </Link>
                ))
            }
        </nav>
    </div>
  );
};

export default Sidebar;