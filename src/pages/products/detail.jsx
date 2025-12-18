import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Descriptions,
  InputNumber,
  List,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import PageSkeleton from "../../components/common/PageSkeleton";
import { useProducts } from "../../hooks/materials/useProducts";
import { useProductDetails } from "../../hooks/materials/useProductDetails";

const { Text } = Typography;

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const {
    productDetail,
    productDetailLoading,
    productDetailFetching,
    productDetailError,
    refetchProductDetail,
    productBomLines,
    productBomLoading,
    productBomError,
    refetchProductBom,
  } = useProducts({ productId: id, bomQuantity: quantity });
  const {
    productDetails,
    productDetailsLoading,
    productDetailsFetching,
    productDetailsError,
    refetchProductDetails,
  } = useProductDetails({ productId: id });

  const showSkeleton = productDetailLoading && !productDetail;

  return (
    <PageContainer
      title="PRODUCT DETAIL"
      subtitle={productDetail?.product_name || "Thông tin sản phẩm"}
      extra={
        <Button onClick={() => navigate(-1)} type="default">
          Quay lại
        </Button>
      }
    >
      {showSkeleton && <PageSkeleton type="detail" />}

      {!showSkeleton && productDetail && (
        <Card
          className="rounded-2xl"
          title={productDetail.product_name}
          extra={
            <Button
              onClick={() => refetchProductDetail()}
              loading={productDetailFetching}
            >
              Tải lại
            </Button>
          }
        >
          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item label="Product ID">
              <Text code>{productDetail.product_id}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Phiên bản">
              {productDetail.version || "Chưa xác định"}
            </Descriptions.Item>
            <Descriptions.Item label="Giá bán">
              {productDetail.product_price
                ? Number(productDetail.product_price).toLocaleString()
                : "Chưa có"}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {productDetail.description || "Chưa có mô tả"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      {!showSkeleton && !productDetail && (
        <Alert
          type={productDetailError ? "error" : "info"}
          message={
            productDetailError ? "Không thể tải sản phẩm" : "Không tìm thấy sản phẩm"
          }
          description={
            productDetailError
              ? String(productDetailError?.message || productDetailError)
              : "Hãy kiểm tra lại đường dẫn hoặc chọn sản phẩm khác."
          }
        />
      )}

      {productDetail && (
        <Card
          className="rounded-2xl"
          title="Định mức BOM (chuẩn)"
          extra={
            <Button
              onClick={() => refetchProductDetails()}
              loading={productDetailsFetching}
            >
              Tải lại
            </Button>
          }
        >
          {productDetailsLoading && !productDetails.length ? (
            <PageSkeleton type="list" />
          ) : productDetailsError ? (
            <Alert
              type="error"
              message="Không thể tải danh sách BOM"
              description={String(
                productDetailsError?.message || productDetailsError
              )}
              action={
                <Button
                  size="small"
                  onClick={() => refetchProductDetails()}
                >
                  Thử lại
                </Button>
              }
            />
          ) : (
            <List
              dataSource={productDetails}
              locale={{ emptyText: "Chưa có định mức BOM" }}
              renderItem={(detail) => (
                <List.Item className="flex justify-between">
                  <div>
                    <div className="font-semibold">
                      {detail.material?.material_name || detail.material_id}
                    </div>
                    <Text type="secondary">
                      {detail.material?.description ||
                        detail.category?.category_name ||
                        detail.component_item_type}
                    </Text>
                  </div>
                  <div className="text-right">
                    <Text strong>
                      {Number(detail.material_quantity).toLocaleString()}{" "}
                      {detail.material?.unit || detail.component_item_type}
                    </Text>
                    {detail.category?.category_name && (
                      <div>
                        <Text type="secondary">
                          {detail.category.category_name}
                        </Text>
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          )}
        </Card>
      )}

      {productDetail && (
        <Card
          className="rounded-2xl"
          title="Định mức BOM"
          extra={
            <InputNumber
              min={1}
              value={quantity}
              onChange={(value) => setQuantity(value || 1)}
            />
          }
        >
          {productBomLoading && !productBomLines.length ? (
            <PageSkeleton type="list" />
          ) : productBomError ? (
            <Alert
              type="error"
              message="Không thể tải BOM"
              description={String(productBomError?.message || productBomError)}
              action={
                <Button size="small" onClick={() => refetchProductBom()}>
                  Thử lại
                </Button>
              }
            />
          ) : (
            <List
              dataSource={productBomLines}
              locale={{ emptyText: "Chưa có dữ liệu BOM" }}
              renderItem={(line) => (
                <List.Item className="flex justify-between">
                  <div>
                    <div className="font-semibold">{line.material_name}</div>
                    <Text type="secondary">{line.material_id}</Text>
                  </div>
                  <div>
                    <Text strong>
                      {line.quantity} {line.unit}
                    </Text>
                  </div>
                </List.Item>
              )}
            />
          )}
        </Card>
      )}
    </PageContainer>
  );
}
