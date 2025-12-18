import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import BomDetailPage from "./pages/BomDetailPage";
import BomListPage from "./pages/BomListPage";
import DashboardPage from "./pages/DashboardPage";
import ItemListPage from "./pages/ItemListPage";
import MaterialsScreen from "./pages/materials";
import MaterialDetailScreen from "./pages/materials/detail";
import ProductScreen from "./pages/products";
import ProductDetailScreen from "./pages/products/detail";
function App() {
  return (
    <>
      {/* <PWAUpdater /> */}
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />

          <Route path="/material" element={<MaterialsScreen />} />
          <Route path="/material/:id" element={<MaterialDetailScreen />} />

          <Route path="/products" element={<ProductScreen />} />
          <Route path="/products/:id" element={<ProductDetailScreen />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
