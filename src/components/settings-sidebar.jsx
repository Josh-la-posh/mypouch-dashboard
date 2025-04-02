import { AlertCircle, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
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
        <nav className={`md:shadow-sm bg-white dark:bg-background-dark flex gap-3 md:block overflow-x-scroll scrollbar-none`}>
            {
                sidebarItems.map((item) => (
                    <Link 
                        key={item.id} 
                        to={item.url} 
                        className={`block py-2 md:py-4 px-2 font-[600] ${settingsTitle === item.name ? 'text-primary md:text-white md:bg-primary dark:text-white border-b-2 border-b-primary transition duration-300 ' : 'text-primary'}`}>
                        <div className={`flex items-center gap-1 md:gap-2`}>
                            {item.icon}
                            <div className="text-xs block md:hidden">{item.abbr}</div>
                            <div className="text-sm hidden md:block">{item.name}</div>
                        </div>
                    </Link>
                ))
            }
        </nav>
    );
};

export default SettingsSidebar;