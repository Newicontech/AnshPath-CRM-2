
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ProductProcessing from '../components/products/ProductProcessing'; 

const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/processing" element={<ProductProcessing />} />
    
  </Routes>
);

export default SellerRouting;