import { LayoutDashboard, LucideToggleLeft, LogOut, Mail, Orbit, Settings, ToggleRightIcon, User, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../services/hooks/useTitle';
import TextButton from './ui/textButton';
import { useTheme } from '../services/context/ThemeProvider';

const Sidebar = ({ closeSidebar }) => {
    const { appTitle } = useTitle();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

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

    const handleNavClick = () => {
        // Close sidebar on mobile when a nav item is clicked
        if (closeSidebar) {
            closeSidebar();
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        setTimeout(() => {
            localStorage.clear();
            navigate('/login');
        }, 1000);
    };

    return (
        <div className="h-full bg-app-bg dark:bg-[#20263D] text-primary dark:text-white py-8 px-6 text-xs sm:text-sm lg:text-[16px]">
            <div className="h-full flex flex-col justify-between">
                <nav className='my-2'>
                    {
                        sidebarItems.map((item) => (
                            <Link 
                                key={item.id} 
                                to={item.url} 
                                className={`block px-2 py-3 rounded-sm ${appTitle === item.title ? 'text-white bg-primary' : ''}`}
                                onClick={handleNavClick}
                            >
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
                <div className="">

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
                    {/* Logout button for mobile */}
                    <button 
                        onClick={handleLogout} 
                        className='lg:hidden flex items-center gap-3 px-2 py-3 mt-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-sm'
                    >
                        <LogOut size='15' />
                        <span className='text-xs font-[500]'>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;