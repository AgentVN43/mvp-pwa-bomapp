// src/components/common/ItemDetailPage.jsx
import React from "react";
import { Button } from "antd";
import PageSkeleton from "../components/common/PageSkeleton";

export default function ItemDetailPage({
  title,
  subtitle,
  onBack,
  onReload,
  reloading,
  isLoading,
  hasData,
  isError,
  error,
  skeletonType = "detail",
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
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold m-0">{title}</h2>
          {subtitle ? (
            <div className="mt-1 text-sm text-gray-500">{subtitle}</div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {actions}
          {onReload ? (
            <Button onClick={onReload} loading={reloading}>
              Tải lại
            </Button>
          ) : null}
          {onBack ? <Button onClick={onBack}>Quay lại</Button> : null}
        </div>
      </div>

      {isError && (
        <div className="p-3 rounded-lg bg-red-50 text-red-700">
          Lỗi tải dữ liệu: {String(error?.message || error)}
        </div>
      )}

      {children}
    </div>
  );
}
