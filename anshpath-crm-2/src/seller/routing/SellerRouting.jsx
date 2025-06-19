
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ProductHistoryTable from '../components/products/ProductHistoryTable';
const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/product-history" element={<ProductHistoryTable />} />
  </Routes>
);

export default SellerRouting;