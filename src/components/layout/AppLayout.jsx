// src/components/layout/AppLayout.jsx
import {
  ClusterOutlined,
  DashboardOutlined,
  SettingOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import { Layout, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const menuItems = [
  { key: "/", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "/items", icon: <UnorderedListOutlined />, label: "Items" },
  { key: "/boms", icon: <ClusterOutlined />, label: "BOMs" },
  { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
];

export default function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            height: 64,
            margin: 16,
            display: "flex",
            alignItems: "center",
            color: "white",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          <AppstoreOutlined style={{ marginRight: 8 }} />
          BOM PWA
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={[getSelectedKey(location.pathname)]}
          onClick={(e) => navigate(e.key)}
        />
      </Sider> */}

      <Layout>
        <AppHeader />
        <Content style={{ margin: "16px", padding: 16, background: "#fff" }}>
          {children}
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
}

function getSelectedKey(pathname) {
  if (pathname.startsWith("/items")) return "/items";
  if (pathname.startsWith("/boms")) return "/boms";
  if (pathname.startsWith("/settings")) return "/settings";
  return "/";
}
