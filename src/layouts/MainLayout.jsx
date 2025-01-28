import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { TitleProvider } from "../services/context/TitleProvider";

const MainLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [isSidebarTextVisible, setIsSidebarTextVisible] = useState(false);

    const handleSidebar = (val) => {
        setOpenSidebar(val);
        setIsSidebarTextVisible(val);
    };

    return (
        <TitleProvider>
            <div className="relative">
                <div className={`fixed top-0 left-0 z-50 ${isSidebarTextVisible && openSidebar ? 'md:w-48' : 'w-20'}`}>
                    <Sidebar  handleSidebar={handleSidebar} isSidebarTextVisible={isSidebarTextVisible}/>
                </div>
                <div className={`${isSidebarTextVisible && openSidebar ? 'ml-0 md:ml-48' : 'ml-0 md:ml-20'}`}>
                    <Header className='border-b border-gray-200' setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} setIsSidebarTextVisible={setIsSidebarTextVisible}/>
                    <Navigation />
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </TitleProvider>
    );
  };

export default MainLayout;