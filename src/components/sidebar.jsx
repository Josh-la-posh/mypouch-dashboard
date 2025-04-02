import { LayoutDashboard, LucideToggleLeft, Mail, Orbit, Settings, ToggleRightIcon, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import useTitle from '../services/hooks/useTitle';
import TextButton from './ui/textButton';
import { useTheme } from '../services/context/ThemeProvider';

const Sidebar = () => {
    const { appTitle } = useTitle();
    const { theme, toggleTheme } = useTheme();

    const sidebarItems = [
        {
            id: 1,
            icon: <LayoutDashboard size='15' />,
            title: 'Dashboard',
            url: '/',
        },
        {
            id: 2,
            icon: <Users size='15' />,
            title: 'Users',
            url: '/user',
        },
        {
            id: 3,
            icon: <User size='15' />,
            title: 'Admin',
            url: '/admin/pending-request',
        },
        {
            id: 4,
            icon: <Orbit size='13' />,
            title: 'Transactions',
            url: '/transactions',
        },
        {
            id: 5,
            icon: <Mail size='13' />,
            title: 'Messages',
            url: '/messages',
        },
        {
            id: 6,
            icon: <Settings size='15' />,
            title: 'Settings',
            url: '/settings/profile',
        },
    ];

    return (
        <div className="h-full bg-app-bg dark:bg-[#20263D] text-primary dark:text-white py-8 px-6 text-xs sm:text-sm lg:text-[16px]">
            <div className="h-full flex flex-col justify-between">
                <nav className='my-2'>
                    {
                        sidebarItems.map((item) => (
                            <Link key={item.id} to={item.url} className={`block px-2 py-3 rounded-sm ${appTitle === item.title ? 'text-white bg-primary' : ''}`}>
                                <div className='flex items-center gap-3'>
                                    <button
                                        data-tooltip-id={`tooltip-${item.id}`}
                                        type='button'
                                        className='relative'
                                    >
                                        {item.icon}
                                    </button>
                                    
                                    <div className='text-xs mg:text-sm font-[500]'>{item.title}</div>
                                </div>
                            </Link>
                        ))
                    }
                </nav>
                <div className="flex justify-between items-center">
                    <p className='text-[9px]'>Dark Mode</p>
                    <TextButton
                        onClick={toggleTheme}
                    >
                        {theme === 'light'
                            ? <LucideToggleLeft className='text-gray-500'/>
                            : <ToggleRightIcon  className='text-primary'/>
                        }

                    </TextButton>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;