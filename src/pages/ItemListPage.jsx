// src/pages/ItemListPage.jsx
import { Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageContainer from "../components/layout/PageContainer";

export default function ItemListPage() {
  return (
    <PageContainer
      title="Items"
      subtitle="Danh sách nguyên liệu & thành phẩm cho BOM"
      breadcrumbItems={[
        { title: "Dashboard", href: "/" },
        { title: "Items" },
      ]}
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          New Item
        </Button>
      }
    >
      <Table
        size="small"
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "SKU", dataIndex: "sku" },
          { title: "Type", dataIndex: "type" },
        ]}
        dataSource={[]}
        pagination={false}
      />
    </PageContainer>
  );
}
