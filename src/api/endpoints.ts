export const endpoints = {
  products: {
    list: () => `/products`,
    detail: (id: string) => `/products/${id}`,
    bomFlat: (id: string, qty?: number) =>
      `/products/${id}/bom/flat${qty ? `?qty=${qty}` : ""}`,
  },
  materials: {
    list: () => `/materials`,
    detail: (id: string) => `/materials/${id}`,
  },
  productDetails: {
    list: () => `/product-details`,
    detail: (id: string) => `/product-details/${id}`,
  },
  categories: {
    list: () => `/categories`,
    detail: (id: string) => `/categories/${id}`,
  },
  inventory: {
    list: () => `/inventory`,
    detail: (id: string) => `/inventory/${id}`,
    inventoryByMaterial: (id: string) => `/inventory/material/${id}`,
  },
  order: {
    list: () => `/orders`,
    detail: (id: string) => `/orders/${id}`,
  },
} as const;
