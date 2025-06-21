
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ProductHistoryTable from '../components/products/ProductHistoryTable';
import NewRequests from '../components/services/NewRequests';
import VehicleHistory from '../components/vehicals/VehicleHistory';
import EstimateDetail from '../components/reports/EstimateDetail';
const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/product-history" element={<ProductHistoryTable />} />
    <Route path="/NewRequests" element={<NewRequests />} />
    <Route path="/VehicleHistory" element={<VehicleHistory />} />
    <Route path="/EstimateDetail" element={<EstimateDetail />} />
  </Routes>
);

export default SellerRouting;