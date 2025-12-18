// src/components/layout/AppFooter.jsx
import {
  AppstoreOutlined,
  ClusterOutlined,
  HomeOutlined,
  ProductOutlined,
  RestOutlined,
  SettingOutlined,
  StockOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import { NavLink } from "react-router-dom";

const { Footer } = Layout;

const navItems = [
  { path: "/", label: "Home", icon: HomeOutlined },
  { path: "/products", label: "Products", icon: ProductOutlined },
  { path: "/material", label: "Materials", icon: RestOutlined },
];

export default function AppFooter() {
  const makeClassName = (isActive) =>
    ["app-footer__link", isActive ? "is-active" : ""].filter(Boolean).join(" ");

  return (
    <Footer className="app-footer" role="contentinfo">
      <nav className="app-footer__nav" aria-label="Primary navigation">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => makeClassName(isActive)}
            aria-label={label}
            end={path === "/"}
          >
            <Icon className="app-footer__icon" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </Footer>
  );
}
