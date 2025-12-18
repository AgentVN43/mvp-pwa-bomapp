import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import PageContainer from "../../components/layout/PageContainer";
import ItemListPage from "../ItemListPage";
import MaterialList from "../../components/material/list";
import MaterialDrawer from "../../components/material/drawer";
import { useMaterials } from "../../hooks/materials/useMaterials";

export default function MaterialsScreen() {
  const navigate = useNavigate();
  const {
    materials,
    materialsLoading,
    materialsFetching,
    materialsError,
    refetchMaterials,
  } = useMaterials();

  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredMaterials = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return materials;

    return materials.filter((material) => {
      const name = (material.material_name || "").toLowerCase();
      const desc = (material.description || "").toLowerCase();
      return name.includes(keyword) || desc.includes(keyword);
    });
  }, [materials, search]);

  return (
    <>
      <MaterialDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSuccess={() => refetchMaterials()}
      />
      <PageContainer
        title="MATERIALS"
        subtitle="Danh sách nguyên liệu"
        extra={
          <Button type="primary" onClick={() => setDrawerOpen(true)}>
            Thêm vật liệu
          </Button>
        }
      >
        <ItemListPage
          onReload={refetchMaterials}
          reloading={materialsFetching}
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          searchPlaceholder="Tìm theo tên hoặc mô tả..."
          isLoading={materialsLoading}
          hasData={materials.length > 0}
          isError={Boolean(materialsError)}
          error={materialsError}
        >
          <MaterialList
            materials={filteredMaterials}
            onItemClick={(material) =>
              navigate(`/material/${material.material_id}`)
            }
          />
        </ItemListPage>
      </PageContainer>
    </>
  );
}
