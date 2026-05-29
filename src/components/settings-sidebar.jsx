import { AlertCircle, Lock, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useSettingsTitle from '../services/hooks/useSettitngsTitle';

const SettingsSidebar = () => {
    const { settingsTitle } = useSettingsTitle();

    const sidebarItems = [
        {
            id: 1,
            icon: <User size={'17px'} />,
            name: 'Profile',
            abbr: 'Profile',
            url: '/settings/profile'
        },
        {
            id: 2,
            icon: <AlertCircle size={'17px'} />,
            name: 'Notification',
            abbr: 'Notification',
            url: '/settings/notification'
        },
        {
            id: 3,
            icon: <Lock size={'17px'} />,
            name: 'Security Settings',
            abbr: 'Security',
            url: '/settings/security'
        },
    ]

    return (
        <nav className="md:shadow-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex gap-2 md:block overflow-x-scroll scrollbar-none p-1">
            {
                sidebarItems.map((item) => (
                    <NavLink 
                        key={item.id} 
                        to={item.url} 
                        className={`block py-2 md:py-3 px-3 font-[600] rounded-lg ${settingsTitle === item.name ? 'text-white bg-primary transition duration-300 ' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                        <div className={`flex items-center gap-1 md:gap-2`}>
                            {item.icon}
                            <div className="text-xs block md:hidden">{item.abbr}</div>
                            <div className="text-sm hidden md:block">{item.name}</div>
                        </div>
                    </NavLink>
                ))
            }
        </nav>
    );
};

export default SettingsSidebar;
