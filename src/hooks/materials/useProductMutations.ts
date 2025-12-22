import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService, Product } from "../../api/services/product.service";
import { PRODUCTS_QUERY_KEY } from "./useProducts";

type CreateProductPayload = {
  product_name: string;
  product_price?: string | number | null;
  version?: string | null;
  description?: string | null;
};

export function useProductMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: CreateProductPayload) =>
      productService.create(payload as Omit<Product, "product_id">),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });

  return {
    createProduct: createMutation.mutateAsync,
    creatingProduct: createMutation.isPending,
  };
}
