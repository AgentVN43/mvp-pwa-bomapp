import { Input } from "antd";
import { motion } from "motion/react";
import PageSkeleton from "../components/common/PageSkeleton";
export default function ItemListPage({
  title,
  onReload,
  reloading,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm...",
  isLoading,
  hasData,
  isError,
  error,
  skeletonType = "list",
  actions,
  children,
}) {
  if (isLoading && !hasData) {
    return (
      <div className="p-4">
        <PageSkeleton type={skeletonType} />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold m-0">{title}</h2>
      </div>

      <Input.Search
        placeholder={searchPlaceholder}
        allowClear
        value={searchValue}
        onChange={onSearchChange}
      />

      {isError && (
        <div className="p-3 rounded-lg bg-red-50 text-red-700">
          Lỗi tải dữ liệu: {String(error?.message || error)}
        </div>
      )}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
