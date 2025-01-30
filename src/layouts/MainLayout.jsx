import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { TitleProvider } from "../services/context/TitleProvider";

const MainLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false);

    // Function to toggle sidebar state
    const handleSidebar = (isOpen) => {
        setOpenSidebar(isOpen);
    };

    // Dynamic class names for sidebar and main content
    const sidebarWidth = openSidebar ? "md:w-72 w-48" : "md:w-48 w-20";
    const contentMargin = openSidebar ? "ml-48" : "ml-20";

    return (
        <TitleProvider>
            <div className="h-screen overflow-hidden">
                <Header 
                    className="border-b border-gray-200" 
                    setOpenSidebar={setOpenSidebar} 
                    openSidebar={openSidebar}
                />
                <div className="h-full flex">
                    <div className={`${sidebarWidth} transition-all duration-300 flex justify-center items-center`}>
                        <Sidebar handleSidebar={handleSidebar} isOpen={openSidebar} />
                    </div>
                    <div className={`w-full h-full bg-background-light dark:bg-background-dark transition-all duration-300 overflow-y-scroll rounded-lg p-4`}>
                        <main className={`w-full h-[90%] bg-green-700 overflow-y-scroll`}>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </TitleProvider>
    );
};

export default MainLayout;