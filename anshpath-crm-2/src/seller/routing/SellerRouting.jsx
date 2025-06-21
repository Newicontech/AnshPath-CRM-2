
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ProductProcessing from '../components/products/ProductProcessing'; 
import ServiceLists from '../components/services/ServicesList'; 
import ActiveJobCard from '../components/jobCards/ActiveJobCards'; 

const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/processing" element={<ProductProcessing />} />
    <Route path="/ServiceList" element={<ServiceLists />} />
    <Route path="/active-job-Cards" element={<ActiveJobCard />} />
    
  </Routes>
);

export default SellerRouting;