import { Outlet } from "react-router-dom";
import React from "react";

import HeaderComponent from "../../components/HeaderComponent";
import { Flex } from "antd";
import FooterComponent from "../../components/FooterComponent";

const HomeLayout = () => {
    return (
        <Flex className="flex flex-col min-h-screen bg-gray-100" style={{ width: "100vw" }}>
            {/* Header */}
            <HeaderComponent />
            {/* Main Content */}

            <Outlet />

            
            {/* Footer */}
            <FooterComponent />
        </Flex>
    );
};

export default HomeLayout;
