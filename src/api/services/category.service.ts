import { http } from "../http";
import { endpoints } from "../endpoints";

export type Category = {
  category_id: string;
  category_name: string;
  type?: string | null;
  description?: string | null;
  created_time?: string | null;
  updated_time?: string | null;
  created_user?: string | null;
  updated_user?: string | null;
  delete_flag?: boolean;
};

export const categoryService = {
  list: () => http.get<Category[]>(endpoints.categories.list()),
  detail: (id: string) => http.get<Category>(endpoints.categories.detail(id)),
};
