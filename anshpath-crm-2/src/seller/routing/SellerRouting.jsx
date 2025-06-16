
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';

const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    
  </Routes>
);

export default SellerRouting;