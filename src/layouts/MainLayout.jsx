import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { TitleProvider } from "../services/context/TitleProvider";

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <TitleProvider>
            <div className="h-screen overflow-hidden scrollbar-none bg-app-bg dark:bg-slate-950">
                <Header className="border-b border-gray-200" toggleSidebar={toggleSidebar} />
                <div className="h-[calc(100%-72px)] flex relative px-3 pb-3 md:px-4 md:pb-4">
                    {/* Overlay for mobile */}
                    {sidebarOpen && (
                        <div 
                            className="fixed inset-0 bg-black/45 backdrop-blur-[1px] z-20 lg:hidden" 
                            onClick={closeSidebar}
                        />
                    )}
                    {/* Sidebar */}
                    <div className={`
                        fixed lg:relative z-30 lg:z-auto
                        h-[calc(100%-90px)] lg:h-full w-[260px] lg:w-[250px]
                        transform transition-transform duration-300 ease-in-out
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    `}>
                        <Sidebar closeSidebar={closeSidebar} />
                    </div>
                    <div className='grow lg:ml-3 bg-white/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 transition-all duration-300 rounded-2xl p-3 md:p-5 overflow-y-scroll scrollbar-none shadow-sm'>
                        <main className='h-full w-full overflow-y-scroll scrollbar-none'>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </TitleProvider>
    );
};

export default MainLayout;
