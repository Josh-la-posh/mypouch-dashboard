import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { TitleProvider } from "../services/context/TitleProvider";

const MainLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const handleSidebar = (isOpen) => {
        setOpenSidebar(isOpen);
    };
    const sidebarWidth = openSidebar ? "md:w-72 w-48" : "md:w-48 w-20";
    const contentMargin = openSidebar ? "ml-48" : "ml-20";

    return (
        <TitleProvider>
            <div className="h-[screen] overflow-hidden scrollbar-none bg-app-bg dark:bg-[#20263D]">
                <Header
                    className="border-b border-gray-200" 
                    setOpenSidebar={setOpenSidebar} 
                    openSidebar={openSidebar}
                />
                <div className="h-full flex">
                    <div className={`${sidebarWidth} transition-all duration-300 flex justify-center items-center`}>
                        <Sidebar handleSidebar={handleSidebar} isOpen={openSidebar} />
                    </div>
                    <div className='w-full h-full bg-white dark:bg-[#2C2C3E] transition-all duration-300 overflow-y-scroll scrollbar-none rounded-lg p-4'>
                        <main className='w-full h-[90%] overflow-y-scroll scrollbar-none'>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </TitleProvider>
    );
};

export default MainLayout;