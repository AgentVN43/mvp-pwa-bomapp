import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../../api/services/category.service";

const CATEGORIES_QUERY_KEY = ["categories"];

export function useCategories() {
  const categoriesQuery = useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: () => categoryService.list(),
  });

  return {
    categories: categoriesQuery.data ?? [],
    categoriesLoading: categoriesQuery.isLoading,
    categoriesFetching: categoriesQuery.isFetching,
    categoriesError: categoriesQuery.error,
    refetchCategories: categoriesQuery.refetch,
  };
}
