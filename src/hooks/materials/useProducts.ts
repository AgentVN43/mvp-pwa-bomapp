import { useQuery } from "@tanstack/react-query";
import {
  FlattenedBomLine,
  Product,
  productService,
} from "../../api/services/product.service";

const PRODUCTS_QUERY_KEY = ["products"];
const productDetailKey = (id?: string) => [
  ...PRODUCTS_QUERY_KEY,
  "detail",
  id ?? "unknown",
];
const bomKey = (id?: string, quantity = 1) => [
  ...PRODUCTS_QUERY_KEY,
  "bomFlat",
  id ?? "unknown",
  quantity,
];

type UseProductsParams = {
  productId?: string;
  bomQuantity?: number;
};

export function useProducts(params: UseProductsParams = {}) {
  const { productId, bomQuantity = 1 } = params;

  const listQuery = useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: () => productService.list(),
  });

  const detailQuery = useQuery({
    queryKey: productDetailKey(productId),
    queryFn: async () => {
      if (!productId) throw new Error("productId is required for detail");
      return productService.detail(productId);
    },
    enabled: Boolean(productId),
  });

  const bomQuery = useQuery({
    queryKey: bomKey(productId, bomQuantity),
    queryFn: async () => {
      if (!productId) throw new Error("productId is required for BOM");
      return productService.bomFlat(productId, bomQuantity);
    },
    enabled: Boolean(productId),
  });

  return {
    products: listQuery.data ?? ([] as Product[]),
    productsLoading: listQuery.isLoading,
    productsFetching: listQuery.isFetching,
    productsError: listQuery.error,
    refetchProducts: listQuery.refetch,
    productDetail: detailQuery.data,
    productDetailLoading: detailQuery.isLoading,
    productDetailFetching: detailQuery.isFetching,
    productDetailError: detailQuery.error,
    refetchProductDetail: detailQuery.refetch,
    productBomLines: bomQuery.data ?? ([] as FlattenedBomLine[]),
    productBomLoading: bomQuery.isLoading,
    productBomFetching: bomQuery.isFetching,
    productBomError: bomQuery.error,
    refetchProductBom: bomQuery.refetch,
  };
}
