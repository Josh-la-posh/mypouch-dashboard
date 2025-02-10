import { Banknote, DatabaseZap, LifeBuoy, Speaker } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSettingsTitle from '../services/hooks/useSettitngsTitle';

const AdminSidebar = () => {
    const { settingsTitle } = useSettingsTitle();

    const sidebarItems = [
        {
            id: 1,
            icon: <Speaker size={'17px'} />,
            name: 'Pending Request',
            url: '/admin/pending-request'
        },
        {
            id: 2,
            icon: <Banknote size={'17px'} />,
            name: 'Set Currencies',
            url: '/admin/set-currencies'
        },
        {
            id: 3,
            icon: <LifeBuoy size={'17px'} />,
            name: 'Add Admin',
            url: '/admin/add-admin'
        },
        {
            id: 4,
            icon: <DatabaseZap size={'17px'} />,
            name: 'Admin Management',
            url: '/admin/admin-management'
        }
    ]

    return (
        <nav className={`shadow-sm bg-white dark:bg-background-dark px-4 py-2 flex-1 overflow-y-auto scrollbar-none z-50`}>
            {
                sidebarItems.map((item) => (
                    <Link 
                        key={item.id} 
                        to={item.url} 
                        className={`block py-4 text-sm font-[600] ${settingsTitle === item.name ? 'text-white bg-primary transition duration-300 ' : 'text-primary'}`}>
                        <div className={`flex items-center gap-2 pl-4`}>
                            {item.icon}
                            <div>{item.name}</div>
                        </div>
                    </Link>
                ))
            }
        </nav>
    );
};

export default AdminSidebar;