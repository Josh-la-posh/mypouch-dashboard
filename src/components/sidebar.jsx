import { LayoutDashboard, LucideToggleLeft, LogOut, Mail, Orbit, Settings, ToggleRightIcon, User, Users } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import useTitle from '../services/hooks/useTitle';
import TextButton from './ui/textButton';
import { useTheme } from '../services/context/ThemeProvider';

const Sidebar = ({ closeSidebar }) => {
    useTitle();
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
        <div className="h-full bg-gradient-to-b from-slate-100 to-blue-50 dark:from-slate-900 dark:to-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white py-6 px-4 text-sm rounded-2xl shadow-sm">
            <div className="h-full flex flex-col justify-between">
                <nav className='my-2 space-y-1.5'>
                    {
                        sidebarItems.map((item) => (
                            <NavLink 
                                key={item.id} 
                                to={item.url} 
                                className={({ isActive }) => `block px-3 py-2.5 rounded-xl transition-all ${isActive ? 'text-white bg-primary shadow-md shadow-blue-200/80' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                onClick={handleNavClick}
                            >
                                <div className='flex items-center gap-3'>
                                    <span
                                        data-tooltip-id={`tooltip-${item.id}`}
                                        className='relative'
                                    >
                                        {item.icon}
                                    </span>
                                    
                                    <div className='text-sm font-medium tracking-wide'>{item.title}</div>
                                </div>
                            </NavLink>
                        ))
                    }
                </nav>
                <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-4">

                    <div className="flex justify-between items-center">
                        <p className='text-xs text-slate-500 dark:text-slate-300'>Dark Mode</p>
                        <TextButton
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light'
                                ? <LucideToggleLeft className='text-slate-500'/>
                                : <ToggleRightIcon  className='text-primary'/>
                            }

                        </TextButton>
                    </div>
                    {/* Logout button for mobile */}
                    <button 
                        onClick={handleLogout} 
                        className='lg:hidden w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl'
                    >
                        <LogOut size='15' />
                        <span className='text-sm font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
