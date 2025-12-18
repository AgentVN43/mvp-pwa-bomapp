import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, InputNumber, Space } from "antd";
import { useMaterials } from "../../hooks/materials/useMaterials";

const initialValues = {
  material_name: "",
  description: "",
  unit: "",
  unit_price: null,
  waste_percentage: null,
  number_of_inventory: null,
};

export default function MaterialDrawer({
  open,
  onClose,
  mode = "create",
  material,
  onSuccess,
}) {
  const [form] = Form.useForm();
  const isEdit = mode === "edit";

  const { createMaterial, updateMaterial, creating, updating } =
    useMaterials({ materialId: material?.material_id });

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue(material ?? initialValues);
    }
  }, [open, material, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (isEdit && material?.material_id) {
        await updateMaterial({
          id: material.material_id,
          payload: values,
        });
      } else {
        await createMaterial(values);
      }
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("MaterialDrawer submit error:", error);
    }
  };

  return (
    <Drawer
      title={isEdit ? "Chỉnh sửa vật liệu" : "Thêm vật liệu mới"}
      open={open}
      onClose={onClose}
      destroyOnClose
      width={420}
      extra={
        <Space>
          <Button onClick={onClose}>Đóng</Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={isEdit ? updating : creating}
          >
            {isEdit ? "Lưu" : "Tạo mới"}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" form={form} initialValues={initialValues}>
        <Form.Item
          name="material_name"
          label="Tên vật liệu"
          rules={[{ required: true, message: "Vui lòng nhập tên vật liệu" }]}
        >
          <Input placeholder="Ví dụ: Thép tấm 3mm" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={3} placeholder="Ghi chú khác nếu có..." />
        </Form.Item>

        <Form.Item name="unit" label="Đơn vị tính">
          <Input placeholder="Ví dụ: tấm, kg..." />
        </Form.Item>

        <Form.Item name="unit_price" label="Giá/đơn vị">
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Ví dụ: 150000"
          />
        </Form.Item>

        <Form.Item name="waste_percentage" label="Hao hụt (%)">
          <InputNumber
            min={0}
            max={100}
            style={{ width: "100%" }}
            placeholder="Ví dụ: 5"
          />
        </Form.Item>

        <Form.Item name="number_of_inventory" label="Tồn kho">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
