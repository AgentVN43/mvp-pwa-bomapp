import { http } from '../http';
import { endpoints } from '../endpoints';

export type Product = {
  product_id: string;
  product_name: string;
  product_price: string | null;
  version?: string | null;
  description?: string | null;
};

export type FlattenedBomLine = {
  material_id: string;
  material_name: string;
  unit: string;
  quantity: number;
};

export const productService = {
  list: () => http.get<Product[]>(endpoints.products.list()),
  detail: (id: string) => http.get<Product>(endpoints.products.detail(id)),
  bomFlat: (id: string, qty = 1) =>
    http.get<FlattenedBomLine[]>(endpoints.products.bomFlat(id, qty)),
};
