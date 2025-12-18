import React from "react";
import { Avatar, List, Tag, Typography } from "antd";

const { Text } = Typography;

const toNumber = (value) => {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export default function MaterialList({
  materials = [],
  onItemClick,
} = {}) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={materials}
      locale={{ emptyText: "Chưa có vật liệu" }}
      renderItem={(material) => {
        const unitPrice = toNumber(material.unit_price);
        const waste = toNumber(material.waste_percentage);
        const inventorySum = (material.inventories || []).reduce(
          (sum, inventory) => sum + (inventory.number_of_inventory || 0),
          0
        );

        return (
          <List.Item
            className="bg-white rounded-2xl px-4 py-3 mb-3 shadow-sm"
            onClick={() => onItemClick?.(material)}
            style={{ cursor: onItemClick ? "pointer" : "default" }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  size={48}
                  style={{
                    background: "#f3f4f6",
                    color: "#111827",
                    fontWeight: 600,
                  }}
                >
                  {(material.material_name?.[0] || "M").toUpperCase()}
                </Avatar>
              }
              title={
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {material.material_name}
                  </span>
                  {material.unit && <Tag>{material.unit}</Tag>}
                </div>
              }
              description={
                <div className="space-y-2">
                  <Text type="secondary">
                    {material.description || "Chưa có mô tả"}
                  </Text>

                  <div className="flex flex-wrap gap-2 mt-1">
                    <Tag>
                      Giá/đơn vị:{" "}
                      <b>
                        {unitPrice !== null
                          ? unitPrice.toLocaleString()
                          : "Không rõ"}
                      </b>
                    </Tag>

                    <Tag>
                      Hao hụt:{" "}
                      <b>{waste !== null ? `${waste}%` : "Không rõ"}</b>
                    </Tag>

                    <Tag>
                      Tồn kho: <b>{inventorySum}</b>
                    </Tag>

                    <Tag>
                      BOM lines:{" "}
                      <b>{material.productDetails?.length ?? 0}</b>
                    </Tag>
                  </div>
                </div>
              }
            />
          </List.Item>
        );
      }}
    />
  );
}
