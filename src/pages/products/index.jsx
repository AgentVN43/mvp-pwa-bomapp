import { useMemo, useState } from "react";
import { Button, List, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import ItemListPage from "../ItemListPage";
import { useProducts } from "../../hooks/materials/useProducts";

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

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return products;
    return products.filter((item) => {
      const name = (item.product_name || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      return name.includes(keyword) || desc.includes(keyword);
    });
  }, [products, search]);

  return (
    <PageContainer title="PRODUCTS" subtitle="Danh sách sản phẩm">
      <ItemListPage
        title="Danh sách sản phẩm"
        onReload={refetchProducts}
        reloading={productsFetching}
        searchValue={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        searchPlaceholder="Tìm theo tên hoặc mô tả..."
        isLoading={productsLoading}
        hasData={products.length > 0}
        isError={Boolean(productsError)}
        error={productsError}
        actions={
          <Button type="default" onClick={() => navigate("/material")}>
            Quản lý nguyên liệu
          </Button>
        }
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
                    <span className="font-semibold">{product.product_name}</span>
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
    </PageContainer>
  );
}
