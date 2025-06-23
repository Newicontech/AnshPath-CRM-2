
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import SparePartAdd from '../components/inventry/SparePartAdd';
import LessStockTable from '../components/inventry/LessStockTable';
import AddProducts from '../components/products/AddProducts';
import AddServices from '../components/services/AddServices';
import ServiceHistoryTable from '../components/services/ServiceHistoryTable';
import PurchaseDetails from '../components/inventry/PurchaseDetails';
import ProductList from '../components/products/ProductList';


const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/dashboard" element={<DashboardOverview />} />
    <Route path="/dashboard/overview" element={<DashboardOverview />} />
    <Route path="/inventory/sparePartsAdd" element={<SparePartAdd />} />
    <Route path="/inventory/lessStockTable" element={<LessStockTable />} />
    <Route path="/addProducts" element={<AddProducts />} />
    <Route path="/services/addServices" element={<AddServices />} />    
    <Route path="/services/historyTable" element={<ServiceHistoryTable />} /> 
    <Route path="/inventory/purchaseDetails" element={<PurchaseDetails />} />
    <Route path="/products/productList" element={<ProductList />} />
  </Routes>
);

export default SellerRouting;