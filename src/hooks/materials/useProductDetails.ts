import { useQuery } from "@tanstack/react-query";
import { productDetailService } from "../../api/services/productDetail.service";

const PRODUCT_DETAILS_QUERY_KEY = ["productDetails"];

type UseProductDetailsParams = {
  productId?: string;
};

export function useProductDetails(params: UseProductDetailsParams = {}) {
  const { productId } = params;

  const productDetailsQuery = useQuery({
    queryKey: productId
      ? [...PRODUCT_DETAILS_QUERY_KEY, "product", productId]
      : [...PRODUCT_DETAILS_QUERY_KEY, "all"],
    queryFn: () =>
      productId
        ? productDetailService.listByProduct(productId)
        : productDetailService.list(),
    select: (data) =>
      productId
        ? data.filter((detail) => detail.product_id === productId)
        : data,
  });

  return {
    productDetails: productDetailsQuery.data ?? [],
    productDetailsLoading: productDetailsQuery.isLoading,
    productDetailsFetching: productDetailsQuery.isFetching,
    productDetailsError: productDetailsQuery.error,
    refetchProductDetails: productDetailsQuery.refetch,
  };
}
