import { http } from "../http";
import { endpoints } from "../endpoints";
import { Material } from "./material.service";
import { Product } from "./product.service";

export type ProductDetailCategory = {
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

export type ProductDetail = {
  product_detail_id: string;
  product_id: string;
  material_id: string;
  component_item_type: string;
  material_quantity: string | number;
  total_price?: string | number | null;
  category_id?: string | null;
  created_time?: string | null;
  updated_time?: string | null;
  created_user?: string | null;
  updated_user?: string | null;
  delete_flag?: boolean;
  product?: Product;
  material?: Material;
  category?: ProductDetailCategory | null;
};

export const productDetailService = {
  list: () => http.get<ProductDetail[]>(endpoints.productDetails.list()),
  listByProduct: (productId: string) =>
    http.get<ProductDetail[]>(
      `${endpoints.productDetails.list()}?productId=${productId}`
    ),
  detail: (id: string) => http.get<ProductDetail>(endpoints.productDetails.detail(id)),
};
