// src/components/common/PageSkeleton.jsx
import { Skeleton } from "antd";

export default function PageSkeleton({ type = "table" }) {
  if (type === "detail") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Skeleton active paragraph={{ rows: 1 }} />
        <Skeleton active paragraph={{ rows: 3 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  if (type === "list") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Render 5 list items as default */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
          >
            <Skeleton.Avatar active size="large" />
            <div style={{ flex: 1 }}>
              <Skeleton.Input
                active
                style={{ width: "60%", marginBottom: 8 }}
              />
              <Skeleton active paragraph={{ rows: 1 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // default: table skeleton
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Skeleton.Input active style={{ width: 200 }} />
      <Skeleton active paragraph={{ rows: 6 }} />
    </div>
  );
}
