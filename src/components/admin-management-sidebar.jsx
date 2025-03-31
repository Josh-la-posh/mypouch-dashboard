import React from 'react';
import { Link } from 'react-router-dom';
import useSettingsTitle from '../services/hooks/useSettitngsTitle';

const AdminManagementSidebar = () => {
    const { settingsTitle } = useSettingsTitle();

    const sidebarItems = [
        {
            id: 1,
            name: 'Suspicious Login Activities',
            url: '/admin/admin-management/suspicious-login-activities'
        },
        {
            id: 2,
            name: 'Admin Roles and Permissions',
            url: '/admin/admin-management/admins/all'
        },
        // {
        //     id: 3,
        //     name: 'Admin Logins Logs',
        //     url: '/admin/admin-management/admin-logins-logs'
        // },
        {
            id: 4,
            name: 'Change Password',
            url: '/admin/admin-management/change-password'
        },
        // {
        //     id: 5,
        //     name: 'Currency Exchange Limit',
        //     url: '/admin/admin-management/currency-exchange-limit'
        // }
    ]

    return (
        <nav className={`shadow-sm bg-primary/19 dark:bg-background-dark/22 flex-1 overflow-y-auto scrollbar-none z-50 space-y-4 p-4`}>
            {sidebarItems.map((item) => (
                <Link 
                    key={item.id} 
                    to={item.url} 
                    className={`block py-4 px-2 text-sm font-[600] border border-primary-dark dark:border-primary rounded-sm ${settingsTitle === item.name ? 'text-white bg-primary-dark dark:bg-primary transition duration-300 ' : 'bg-white text-primary-dark'}`}>
                    <div>{item.name}</div>
                </Link>
            ))}
        </nav>
    );
};

export default AdminManagementSidebar;