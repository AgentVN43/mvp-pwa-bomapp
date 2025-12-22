import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Popconfirm,
  Select,
  Space,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import PageSkeleton from "../../components/common/PageSkeleton";
import { useProducts } from "../../hooks/materials/useProducts";
import { useProductDetails } from "../../hooks/materials/useProductDetails";
import { useProductDetailMutations } from "../../hooks/materials/useProductDetailMutations";
import { useMaterials } from "../../hooks/materials/useMaterials";
import { useCategories } from "../../hooks/categories/useCategories";

const { Text } = Typography;

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);

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
  const {
    createProductDetail,
    updateProductDetail,
    deleteProductDetail,
    creatingProductDetail,
    updatingProductDetail,
    deletingProductDetail,
  } = useProductDetailMutations(id);
  const { materials } = useMaterials();
  const { categories } = useCategories();

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
            productDetailError
              ? "Không thể tải sản phẩm"
              : "Không tìm thấy sản phẩm"
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
            <Space>
              <Button
                onClick={() => refetchProductDetails()}
                loading={productDetailsFetching}
              >
                Tải lại
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setEditingDetail(null);
                  setDrawerOpen(true);
                }}
              >
                Thêm dòng BOM
              </Button>
            </Space>
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
                <Button size="small" onClick={() => refetchProductDetails()}>
                  Thử lại
                </Button>
              }
            />
          ) : (
            <List
              dataSource={productDetails}
              locale={{ emptyText: "Chưa có định mức BOM" }}
              renderItem={(detail) => (
                <List.Item
                  className="flex justify-between"
                  actions={[
                    <Button
                      key="edit"
                      size="small"
                      onClick={() => {
                        setEditingDetail(detail);
                        setDrawerOpen(true);
                      }}
                    >
                      Sửa
                    </Button>,
                    <Popconfirm
                      key="delete"
                      title="Xóa dòng BOM?"
                      okText="Xóa"
                      cancelText="Hủy"
                      okButtonProps={{ loading: deletingProductDetail }}
                      onConfirm={() =>
                        deleteProductDetail(detail.product_detail_id)
                      }
                    >
                      <Button danger size="small">
                        Xóa
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">
                            {detail.material?.material_name ||
                              detail.material_id}
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
                            {detail.material?.unit ||
                              detail.component_item_type}
                          </Text>
                          {detail.category?.category_name && (
                            <div>
                              <Text type="secondary">
                                {detail.category.category_name}
                              </Text>
                            </div>
                          )}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      )}

      {/* {productDetail && (
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
      )} */}
      <ProductDetailFormModal
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditingDetail(null);
        }}
        detail={editingDetail}
        onSubmit={async (values) => {
          if (editingDetail) {
            await updateProductDetail({
              id: editingDetail.product_detail_id,
              payload: { ...values, product_id: id },
            });
          } else {
            await createProductDetail({ ...values, product_id: id });
          }
          setDrawerOpen(false);
          setEditingDetail(null);
        }}
        submitting={
          editingDetail ? updatingProductDetail : creatingProductDetail
        }
        materials={materials}
        categories={categories}
      />
    </PageContainer>
  );
}

function ProductDetailFormModal({
  open,
  onClose,
  detail,
  onSubmit,
  submitting,
  materials,
  categories,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue({
        material_id: detail?.material_id || undefined,
        category_id: detail?.category_id || undefined,
        material_quantity: detail?.material_quantity
          ? Number(detail.material_quantity)
          : 0,
        component_item_type: detail?.component_item_type || "MATERIAL",
      });
    }
  }, [open, detail, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title={detail ? "Chỉnh sửa BOM line" : "Thêm dòng BOM"}
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      confirmLoading={submitting}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="material_id"
          label="Vật liệu"
          rules={[{ required: true, message: "Vui lòng chọn vật liệu" }]}
        >
          <Select
            showSearch
            placeholder="Chọn vật liệu"
            options={materials.map((material) => ({
              value: material.material_id,
              label: material.material_name,
            }))}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item
          name="material_quantity"
          label="Định mức"
          rules={[{ required: true, message: "Vui lòng nhập định mức" }]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>
        <Form.Item name="category_id" label="Nhóm">
          <Select
            allowClear
            placeholder="Chọn nhóm"
            options={categories.map((category) => ({
              value: category.category_id,
              label: category.category_name,
            }))}
          />
        </Form.Item>
        <Form.Item name="component_item_type" label="Loại thành phần">
          <Input placeholder="MATERIAL hoặc SUB-ITEM..." />
        </Form.Item>
      </Form>
    </Modal>
  );
}
