import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import PWAUpdater from "./PWAUpdater";
import DashboardPage from "./pages/DashboardPage";
import ItemListPage from "./pages/ItemListPage";
import BomListPage from "./pages/BomListPage";
import BomDetailPage from "./pages/BomDetailPage";
import "./App.css";
function App() {
  return (
    <>
      {/* <PWAUpdater /> */}
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/items" element={<ItemListPage />} />
          <Route path="/boms" element={<BomListPage />} />
          <Route path="/boms/:bomId" element={<BomDetailPage />} />
          <Route path="/management" element={<BomDetailPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
