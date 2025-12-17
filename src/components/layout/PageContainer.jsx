// src/components/layout/PageContainer.jsx
import { Breadcrumb, Space, Typography } from "antd";
import { motion } from "motion/react";

const { Title, Text } = Typography;

export default function PageContainer({
  title,
  subtitle,
  breadcrumbItems = [],
  extra, // actions phía bên phải (button, filter...)
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      {/* Header của page */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          alignItems: "flex-start",
        }}
      >
        <Space direction="vertical" size={4}>
          {breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}
          <Title level={3} style={{ margin: 0 }}>
            {title}
          </Title>
          {subtitle && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              {subtitle}
            </Text>
          )}
        </Space>

        {extra && <div>{extra}</div>}
      </div>

      {/* Nội dung chính */}
      {children}
    </motion.div>
  );
}
