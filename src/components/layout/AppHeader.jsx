import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Space } from "antd";
import {
  MenuOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <Header className="px-0 flex justify-between items-center h-auto py-3 shadow-sm" style={{ backgroundColor: '#fff' }}>
      <div className="flex items-center justify-between w-full px-3">
        {/* Left: Menu & Logo */}
        <Space size="large">
          <MenuOutlined
            className="text-xl cursor-pointer text-gray-700 hover:text-gray-900 transition-colors"
            onClick={() => {
              // Toggle mobile sidebar logic here
              console.log("Toggle menu");
            }}
            aria-label="Open menu"
          />
          <Link to="/" className="flex items-center">
            {/* Theme-based logos (dark mode support) */}
            {/* <img
              className="h-8 w-auto dark:hidden"
              src="assets/images/logo/logo.png"
              alt="Logo"
            /> */}
            <img
              className="h-8 w-auto hidden dark:block"
              src="assets/images/logo/logo.png"
              alt="Logo white"
            />
          </Link>
        </Space>

        {/* Right: Location & Avatar */}
        <Space size="middle">
          <Space size="small" className="text-gray-600">
            <EnvironmentOutlined className="text-lg" />
            <span className="text-sm whitespace-nowrap">Los Angeles</span>
          </Space>
          <Link to="/account" className="flex items-center">
            <img
              src="assets/images/avatar/avatar.jpg"
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 hover:border-gray-400 transition-colors"
            />
          </Link>
        </Space>
      </div>
    </Header>
  );
};

export default AppHeader;
