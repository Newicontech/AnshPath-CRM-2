
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ProductProcessing from '../components/products/ProductProcessing'; 
import ServiceLists from '../components/services/ServicesList'; 

const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/processing" element={<ProductProcessing />} />
    <Route path="/ServiceList" element={<ServiceLists />} />
    
  </Routes>
);

export default SellerRouting;