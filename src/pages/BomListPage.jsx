// ví dụ trong 1 page
import { useState, useEffect } from "react";
import PageContainer from "../components/layout/PageContainer";
import PageSkeleton from "../components/common/PageSkeleton";

export default function BomListPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // giả lập fetch
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageContainer
      title="BOMs"
      subtitle="Tổng hợp Bill of Materials"
      breadcrumbItems={[{ title: "Dashboard", href: "/" }, { title: "BOMs" }]}
    >
      {loading ? (
        <PageSkeleton type="table" />
      ) : (
        <div>/* Table BOM thật sẽ để ở đây */</div>
      )}
    </PageContainer>
  );
}
