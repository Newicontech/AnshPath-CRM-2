
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import SparePartAdd from '../components/inventry/SparePartAdd';
import LessStockTable from '../components/inventry/LessStockTable';
import ProductList from '../components/products/ProductList';

const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/dashboard" element={<DashboardOverview />} />
    <Route path="/dashboard/overview" element={<DashboardOverview />} />
    <Route path="/inventory/sparePartsAdd" element={<SparePartAdd />} />
    <Route path="/inventory/lessStockTable" element={<LessStockTable />} />

    <Route path="/products/productList" element={<ProductList />} />

  </Routes>
);

export default SellerRouting;