import { useMemo, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Space,
  Tag,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import ItemListPage from "../ItemListPage";
import { useProducts } from "../../hooks/materials/useProducts";
import { useProductMutations } from "../../hooks/materials/useProductMutations";

const { Text } = Typography;

export default function ProductsPage() {
  const navigate = useNavigate();
  const {
    products,
    productsLoading,
    productsFetching,
    productsError,
    refetchProducts,
  } = useProducts();
  const { createProduct, creatingProduct } = useProductMutations();
  const [form] = Form.useForm();

  const [search, setSearch] = useState("");
  const [productModalOpen, setProductModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return products;
    return products.filter((item) => {
      const name = (item.product_name || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      return name.includes(keyword) || desc.includes(keyword);
    });
  }, [products, search]);

  const handleCreateProduct = async () => {
    try {
      const values = await form.validateFields();
      await createProduct({
        product_name: values.product_name,
        product_price: values.product_price
          ? String(values.product_price)
          : null,
        version: values.version || null,
        description: values.description || null,
      });
      form.resetFields();
      setProductModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer
      title="Danh sách sản phẩm"
      subtitle="Danh sách sản phẩm"
      extra={
        <Space>
          <Button type="primary" onClick={() => setProductModalOpen(true)}>
            Thêm sản phẩm
          </Button>
        </Space>
      }
    >
      <ItemListPage
        onReload={refetchProducts}
        reloading={productsFetching}
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        searchPlaceholder="Tìm theo tên hoặc mô tả..."
        isLoading={productsLoading}
        hasData={products.length > 0}
        isError={Boolean(productsError)}
        error={productsError}
      >
        <List
          itemLayout="vertical"
          dataSource={filteredProducts}
          locale={{ emptyText: "Chưa có sản phẩm" }}
          renderItem={(product) => (
            <List.Item
              className="bg-white rounded-2xl px-4 py-3 mb-3 shadow-sm"
              onClick={() => navigate(`/products/${product.product_id}`)}
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta
                title={
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {product.product_name}
                    </span>
                    {product.version && <Tag>{product.version}</Tag>}
                  </div>
                }
                description={
                  <Text type="secondary">
                    {product.description || "Chưa có mô tả"}
                  </Text>
                }
              />
              <div>
                <Text strong>
                  Giá:{" "}
                  {product.product_price
                    ? Number(product.product_price).toLocaleString()
                    : "Chưa xác định"}
                </Text>
              </div>
            </List.Item>
          )}
        />
      </ItemListPage>

      <Modal
        title="Thêm sản phẩm"
        open={productModalOpen}
        onCancel={() => setProductModalOpen(false)}
        onOk={handleCreateProduct}
        confirmLoading={creatingProduct}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="product_name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder="Ví dụ: Bún bò Huế đặc biệt" />
          </Form.Item>
          <Form.Item name="product_price" label="Giá bán">
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item name="version" label="Phiên bản">
            <Input placeholder="Ví dụ: 1.0" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} placeholder="Thông tin mô tả..." />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
