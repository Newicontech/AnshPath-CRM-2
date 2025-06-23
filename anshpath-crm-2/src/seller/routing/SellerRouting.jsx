
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import SparePartAdd from '../components/inventry/SparePartAdd';
import LessStockTable from '../components/inventry/LessStockTable';
import ProductList from '../components/products/ProductList';
import LessStockReport from '../components/inventry/LessStockTable';
import AddProducts from '../components/products/AddProducts';
import TeamList from '../components/employees/TeamList';
const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/dashboard" element={<DashboardOverview />} />
    <Route path="/inventory/sparePartsAdd" element={<SparePartAdd />} />
    <Route path="/inventory/lessStockTable" element={<LessStockTable />} />
    <Route path="/addProducts" element={<AddProducts />} />
    <Route path="/addProducts" element={<AddProducts />} />
    <Route path="/products/productList" element={<ProductList />} />
    <Route path="/employee/teamList" element={<TeamList />} />

  </Routes>
);

export default SellerRouting;