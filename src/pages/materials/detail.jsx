import { Alert, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import MaterialDetail from "../../components/material/detail";
import PageContainer from "../../components/layout/PageContainer";
import PageSkeleton from "../../components/common/PageSkeleton";
import { useMaterials } from "../../hooks/materials/useMaterials";

export default function MaterialDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    materialDetail,
    materialDetailLoading,
    materialDetailFetching,
    materialDetailError,
    refetchMaterialDetail,
  } = useMaterials({ materialId: id });

  const showSkeleton = materialDetailLoading && !materialDetail;

  return (
    <PageContainer
      title="MATERIAL DETAIL"
      subtitle={materialDetail?.material_name || "Thông tin nguyên liệu"}
    >
      {showSkeleton && <PageSkeleton type="detail" />}

      {!showSkeleton && materialDetail && (
        <MaterialDetail
          material={materialDetail}
          onReload={() => refetchMaterialDetail()}
          reloading={materialDetailFetching}
          onBack={() => navigate(-1)}
        />
      )}

      {!showSkeleton && !materialDetail && (
        <Alert
          type={materialDetailError ? "error" : "info"}
          message={
            materialDetailError
              ? "Không thể tải vật liệu"
              : "Không tìm thấy vật liệu"
          }
          description={
            materialDetailError
              ? String(materialDetailError?.message || materialDetailError)
              : "Hãy kiểm tra lại đường dẫn hoặc chọn vật liệu khác."
          }
          action={
            materialDetailError && (
              <Button
                size="small"
                type="primary"
                onClick={() => refetchMaterialDetail()}
              >
                Thử lại
              </Button>
            )
          }
        />
      )}
    </PageContainer>
  );
}
