import {
  CreateMaterialPayload,
  Material,
  UpdateMaterialPayload,
  materialService,
} from "../../api/services/material.service";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const MATERIALS_QUERY_KEY = ["materials"];
const detailKey = (id: string | undefined) => [
  ...MATERIALS_QUERY_KEY,
  "detail",
  id ?? "unknown",
];

type UseMaterialsParams = {
  materialId?: string;
};

type UpdateArgs = {
  id: string;
  payload: UpdateMaterialPayload;
};

export function useMaterials(params: UseMaterialsParams = {}) {
  const { materialId } = params;
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: MATERIALS_QUERY_KEY,
    queryFn: () => materialService.list(),
  });

  const detailQuery = useQuery({
    queryKey: detailKey(materialId),
    queryFn: async () => {
      if (!materialId) {
        throw new Error("materialId is required to fetch detail");
      }
      return materialService.detail(materialId);
    },
    enabled: Boolean(materialId),
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateMaterialPayload) =>
      materialService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MATERIALS_QUERY_KEY });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: UpdateArgs) =>
      materialService.update(id, payload),
    onSuccess: (material: Material) => {
      queryClient.invalidateQueries({ queryKey: MATERIALS_QUERY_KEY });
      queryClient.setQueryData(detailKey(material.material_id), material);
    },
  });

  return {
    materials: listQuery.data ?? [],
    materialsLoading: listQuery.isLoading,
    materialsFetching: listQuery.isFetching,
    materialsError: listQuery.error,
    refetchMaterials: listQuery.refetch,
    materialDetail: detailQuery.data,
    materialDetailLoading: detailQuery.isLoading,
    materialDetailFetching: detailQuery.isFetching,
    materialDetailError: detailQuery.error,
    refetchMaterialDetail: detailQuery.refetch,
    createMaterial: createMutation.mutateAsync,
    updateMaterial: updateMutation.mutateAsync,
    creating: createMutation.isPending,
    updating: updateMutation.isPending,
  };
}
