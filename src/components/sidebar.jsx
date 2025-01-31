import { House, LayoutDashboard, Mail, Settings, User, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../services/hooks/useTitle';

const Sidebar = ({handleSidebar, isOpen}) => {
    const { appTitle } = useTitle();

    const sidebarItems = [
        {
            id: 1,
            icon: <LayoutDashboard size={isOpen ? '18' : '22'} />,
            title: 'Dashboard',
            url: '/',
            openSidebar: false
        },
        {
            id: 2,
            icon: <User size={isOpen ? '18' : '22'} />,
            title: 'User',
            url: '/user',
            openSidebar: false
        },
        {
            id: 3,
            icon: <Users size={isOpen ? '18' : '22'} />,
            title: 'Admin',
            url: '/admin',
            openSidebar: false
        },
        {
            id: 4,
            icon: <Mail size={isOpen ? '18' : '22'} />,
            title: 'Messages',
            url: '/messages',
            openSidebar: false
        },
        {
            id: 5,
            icon: <Settings size={isOpen ? '18' : '22'} />,
            title: 'Settings',
            url: '/settings',
            openSidebar: false
        },
    ];

    return (
        <div className="bg-primary-dark text-white py-8 px-6 text-[12px] sm:text-[14px] lg:text-[16px]">
            <nav className='my-2'>
                {
                    sidebarItems.map((item) => (
                        <Link key={item.id} to={item.url} onClick={() => handleSidebar(item.openSidebar)} className={`block py-4 ${appTitle === item.title ? 'text-priColor' : ''}`}>
                            <div className={`flex items-center ${isOpen ? '' : 'justify-center'} gap-5`}>
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