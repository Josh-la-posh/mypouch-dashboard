import { Banknote, DatabaseZap, Speaker, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useSettingsTitle from '../services/hooks/useSettitngsTitle';

const AdminSidebar = () => {
    const { settingsTitle } = useSettingsTitle();

    const sidebarItems = [
        {
            id: 1,
            icon: <Speaker size={'17px'} />,
            name: 'Admin Requests',
            abbr: 'Request',
            url: '/admin/pending-request'
        },
        {
            id: 2,
            icon: <Banknote size={'17px'} />,
            name: 'Currency Management',
            abbr: 'Currency',
            url: '/admin/currency'
        },
        {
            id: 3,
            icon: <DatabaseZap size={'17px'} />,
            name: 'Admin Management',
            abbr: 'Admin',
            url: '/admin/management'
        },
        {
            id: 4,
            icon: <Wallet size={'17px'} />,
            name: 'Pouch Wallet',
            abbr: 'Wallet',
            url: '/admin/pouch-wallet'
        }
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

export default AdminSidebar;
