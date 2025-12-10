import React from "react";
import { useParams } from "react-router-dom";

export default function BomDetailPage() {
  const { bomId } = useParams();
  return (
    <div>
      <h1 className="text-xl font-semibold">BOM Detail: {bomId}</h1>
      {/* Sau này sẽ thêm BOM tree, cost summary... */}
    </div>
  );
}
