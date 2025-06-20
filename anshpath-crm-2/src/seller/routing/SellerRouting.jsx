
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ProductHistoryTable from '../components/products/ProductHistoryTable';
import NewRequests from '../components/services/NewRequests';
const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/product-history" element={<ProductHistoryTable />} />
    <Route path="/NewRequests" element={<NewRequests />} />
  </Routes>
);

export default SellerRouting;