import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productDetailService, ProductDetail } from "../../api/services/productDetail.service";

const PRODUCT_DETAILS_QUERY_KEY = ["productDetails"];

export function useProductDetailMutations(productId?: string) {
  const queryClient = useQueryClient();

  const invalidateProductDetails = () => {
    if (productId) {
      queryClient.invalidateQueries({
        queryKey: [...PRODUCT_DETAILS_QUERY_KEY, "product", productId],
      });
    }
    queryClient.invalidateQueries({ queryKey: [...PRODUCT_DETAILS_QUERY_KEY, "all"] });
  };

  const createMutation = useMutation({
    mutationFn: (payload: Partial<ProductDetail>) =>
      productDetailService.create(payload),
    onSuccess: invalidateProductDetails,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ProductDetail> }) =>
      productDetailService.update(id, payload),
    onSuccess: invalidateProductDetails,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => productDetailService.remove(id),
    onSuccess: invalidateProductDetails,
  });

  return {
    createProductDetail: createMutation.mutateAsync,
    updateProductDetail: updateMutation.mutateAsync,
    deleteProductDetail: deleteMutation.mutateAsync,
    creatingProductDetail: createMutation.isPending,
    updatingProductDetail: updateMutation.isPending,
    deletingProductDetail: deleteMutation.isPending,
  };
}
