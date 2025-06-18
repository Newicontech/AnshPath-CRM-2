
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import SparePartAdd from '../components/inventry/SparePartAdd';
import LessStockTable from '../components/inventry/LessStockTable';
import AddProducts from '../components/products/AddProducts';

const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/dashboard" element={<DashboardOverview />} />
    <Route path="/dashboard/overview" element={<DashboardOverview />} />
    <Route path="/inventory/sparePartsAdd" element={<SparePartAdd />} />
    <Route path="/inventory/lessStockTable" element={<LessStockTable />} />
    <Route path="/addProducts" element={<AddProducts />} />
    
     
    
  </Routes>
);

export default SellerRouting;