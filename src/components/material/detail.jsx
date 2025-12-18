import { Button, Card, List, Tag, Typography } from "antd";
import { useMemo } from "react";

import {
  ArrowLeftOutlined,
  PictureOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { Col, Row } from "antd";

const { Title, Text } = Typography;

const toNumber = (value) => {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export default function MaterialDetail({
  material,
  onReload,
  reloading,
  onBack,
}) {
  const unitPrice = useMemo(
    () => toNumber(material?.unit_price),
    [material?.unit_price]
  );
  const waste = useMemo(
    () => toNumber(material?.waste_percentage),
    [material?.waste_percentage]
  );
  const inventorySum = useMemo(
    () => toNumber(material?.number_of_inventory),
    [material?.number_of_inventory]
  );

  // const inventorySum = useMemo(() => {
  //   return (material?.inventories || []).reduce(
  //     (sum, item) => sum + (item.number_of_inventory || 0),
  //     0
  //   );
  // }, [material?.inventories]);

  if (!material) {
    return null;
  }
  console.log(material);

  return (
    // <Card
    //   className="rounded-2xl"
    //   title={
    //     <div className="flex items-center gap-2">
    //       <span className="font-semibold">{material.material_name}</span>
    //       {material.unit && <Tag>{material.unit}</Tag>}
    //     </div>
    //   }
    //   extra={
    //     <div className="flex items-center gap-2">
    //       {onBack && (
    //         <Button onClick={onBack} type="default">
    //           Quay lại
    //         </Button>
    //       )}
    //       {onReload && (
    //         <Button onClick={onReload} loading={reloading} type="primary">
    //           Tải lại
    //         </Button>
    //       )}
    //     </div>
    //   }
    // >
    //   <Descriptions column={1} size="small" bordered>
    //     <Descriptions.Item label="Material ID">
    //       <Text code>{material.material_id}</Text>
    //     </Descriptions.Item>

    //     <Descriptions.Item label="Mô tả">
    //       {material.description || "Chưa có mô tả"}
    //     </Descriptions.Item>

    //     <Descriptions.Item label="Giá/đơn vị">
    //       {unitPrice !== null ? unitPrice.toLocaleString() : "Không rõ"}
    //     </Descriptions.Item>

    //     <Descriptions.Item label="Hao hụt (%)">
    //       {waste !== null ? `${waste}%` : "Không rõ"}
    //     </Descriptions.Item>

    //     <Descriptions.Item label="Tồn kho (tổng)">
    //       <b>{inventorySum}</b>
    //     </Descriptions.Item>

    //     <Descriptions.Item label="BOM lines">
    //       <b>{material.productDetails?.length ?? 0}</b>
    //     </Descriptions.Item>
    //   </Descriptions>

    //   <Divider />

    //   <div className="space-y-3">
    //     <div className="font-semibold">Kho (Inventories)</div>
    //     <List
    //       size="small"
    //       bordered
    //       dataSource={material.inventories || []}
    //       locale={{ emptyText: "Chưa có thông tin kho" }}
    //       renderItem={(item) => (
    //         <List.Item>
    //           <div className="flex w-full items-center justify-between gap-3">
    //             <div className="min-w-0">
    //               <div className="font-medium truncate">
    //                 {item.description || "Kho"}
    //               </div>
    //               <div className="text-xs text-gray-500">
    //                 {item.is_available ? "Available" : "Unavailable"} –{" "}
    //                 <Text code>{item.inventory_id}</Text>
    //               </div>
    //             </div>
    //             <Tag>
    //               <b>{item.number_of_inventory ?? 0}</b>
    //             </Tag>
    //           </div>
    //         </List.Item>
    //       )}
    //     />
    //   </div>
    // </Card>

    <Card
      className="rounded-2xl"
      extra={
        <div className="flex items-center gap-2">
          {onBack && (
            <Button onClick={onBack} type="default">
              Quay lại
            </Button>
          )}
          {onReload && (
            <Button onClick={onReload} loading={reloading} type="primary">
              Tải lại
            </Button>
          )}
        </div>
      }
    >
      {/* Row 1: Hình ảnh (placeholder) */}
      <div className="flex justify-center mb-5">
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-32 h-32 flex items-center justify-center">
          <PictureOutlined className="text-gray-400 text-3xl" />
        </div>
      </div>

      {/* Row 2: Title */}
      <div className="text-center mb-2">
        <Title level={3} className="!mb-1">
          {material.material_name}
        </Title>
      </div>

      {/* Row 6: Mô tả */}
      <div className="mb-5 text-center">
        <Text>{material.description || "Chưa có mô tả"}</Text>
      </div>

      {/* Row 3: Material ID */}
      {/* <div className="text-center mb-5">
        <Text type="secondary" code className="text-sm">
          {material.material_id}
        </Text>
      </div> */}

      {/* Row 1: Giá/đơn vị | Hao hụt */}
      <Row gutter={[16, 16]} className="mb-3">
        <Col span={12}>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Text type="secondary" className="block text-xs mb-1 font-medium">
              Giá/đơn vị
            </Text>
            <Title level={4} className="!mb-0 !text-lg">
              {unitPrice !== null ? unitPrice.toLocaleString() : "--"}/
              {material.unit}
            </Title>
          </div>
        </Col>
        <Col span={12}>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Text type="secondary" className="block text-xs mb-1 font-medium">
              Hao hụt
            </Text>
            <Title level={4} className="!mb-0 !text-lg">
              {waste !== null ? `${waste}%` : "--"}
            </Title>
          </div>
        </Col>
      </Row>

      {/* Row 2: Tồn kho | BOM lines */}
      <Row gutter={[16, 16]} className="mb-5">
        <Col span={12}>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Text type="secondary" className="block text-xs mb-1 font-medium">
              Tồn kho
            </Text>
            <Title level={4} className="!mb-0 !text-lg">
              {inventorySum}
            </Title>
          </div>
        </Col>
        <Col span={12}>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Text type="secondary" className="block text-xs mb-1 font-medium">
              BOM lines
            </Text>
            <Title level={4} className="!mb-0 !text-lg">
              {material.productDetails?.length ?? 0}
            </Title>
          </div>
        </Col>
      </Row>

      {/* Row 7: Kho (Inventories) */}
      <div>
        <Text strong className="block mb-2">
          Kho (Inventories)
        </Text>
        <List
          size="small"
          bordered
          dataSource={material.inventories || []}
          locale={{ emptyText: "Chưa có thông tin kho" }}
          renderItem={(item) => (
            <List.Item>
              <div className="flex w-full items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">
                    {item.description || "Kho"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.is_available ? "Available" : "Unavailable"} –{" "}
                    <Text code>{item.inventory_id}</Text>
                  </div>
                </div>
                <Tag color={item.is_available ? "green" : "red"}>
                  <b>{item.number_of_inventory ?? 0}</b>
                </Tag>
              </div>
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
}
