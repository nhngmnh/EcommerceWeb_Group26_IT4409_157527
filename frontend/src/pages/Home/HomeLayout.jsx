import { Outlet } from "react-router-dom";
import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";

const HomeLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white ">
            {/* Header */}
            <HeaderComponent/>
            
            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>
            
            {/* Footer */}
            <FooterComponent />
        </div>
    );
};

export default HomeLayout;