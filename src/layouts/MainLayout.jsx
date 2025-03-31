import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { TitleProvider } from "../services/context/TitleProvider";

const MainLayout = () => {
    return (
        <TitleProvider>
            <div className="h-screen overflow-hidden scrollbar-none bg-app-bg dark:bg-[#20263D]">
                <Header className="border-b border-gray-200"/>
                <div className="h-[90%] flex">
                    <div className={`w-48 transition-all duration-300`}>
                        <Sidebar />
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