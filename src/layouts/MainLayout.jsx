import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation";

const MainLayout = () => {
    return (
        <>
            <Navigation />
            <main>
                <Outlet />
            </main>
        </>
    );
  };

export default MainLayout;