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
            <div className="h-screen overflow-hidden scrollbar-none bg-app-bg dark:bg-[#20263D]">
                <Header className="border-b border-gray-200" toggleSidebar={toggleSidebar} />
                <div className="h-[90%] flex relative">
                    {/* Overlay for mobile */}
                    {sidebarOpen && (
                        <div 
                            className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
                            onClick={closeSidebar}
                        />
                    )}
                    {/* Sidebar */}
                    <div className={`
                        fixed lg:relative z-30 lg:z-auto
                        h-full w-48 
                        transform transition-transform duration-300 ease-in-out
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    `}>
                        <Sidebar closeSidebar={closeSidebar} />
                    </div>
                    <div className='grow bg-white dark:bg-[#2C2C3E] transition-all duration-300 rounded-lg p-4 overflow-y-scroll scrollbar-none'>
                        <main className='h-full w-full overflow-y-scroll scrollbar-none '>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </TitleProvider>
    );
};

export default MainLayout;