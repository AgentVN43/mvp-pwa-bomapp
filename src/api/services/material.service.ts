import { http } from "../http";
import { endpoints } from "../endpoints";

export type Material = {
  material_id: string;
  material_name: string;
  description?: string | null;
  unit?: string | null;
  unit_price?: string | number | null;
  waste_percentage?: string | number | null;
  number_of_inventory?: number | null;
  delete_flag?: boolean;
  created_time?: string | null;
  updated_time?: string | null;
};

export type CreateMaterialPayload = {
  material_name: string;
  description?: string | null;
  unit?: string | null;
  unit_price?: number | string | null;
  waste_percentage?: number | string | null;
  number_of_inventory?: number | null;
  created_user?: string | null;
};

export type UpdateMaterialPayload = Partial<CreateMaterialPayload> & {
  updated_user?: string | null;
};

export const materialService = {
  list: () => http.get<Material[]>(endpoints.materials.list()),
  detail: (id: string) => http.get<Material>(endpoints.materials.detail(id)),
  create: (payload: CreateMaterialPayload) =>
    http.post<Material>(endpoints.materials.list(), payload),
  update: (id: string, payload: UpdateMaterialPayload) =>
    http.put<Material>(endpoints.materials.detail(id), payload),
};
