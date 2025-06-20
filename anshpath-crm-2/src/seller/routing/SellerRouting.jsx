
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import SparePartAdd from '../components/inventry/SparePartAdd';
import LessStockTable from '../components/inventry/LessStockTable';
import ProductList from '../components/products/ProductList';
import ScheduledServices from '../components/scheduled/ScheduledServices';
import NewOrdersTable from '../components/newOrdersTable/NewOrdersTable';


const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/dashboard" element={<DashboardOverview />} />
    <Route path="/dashboard/overview" element={<DashboardOverview />} />
    <Route path="/inventory/sparePartsAdd" element={<SparePartAdd />} />
    <Route path="/inventory/lessStockTable" element={<LessStockTable />} />
    {/* <Route path="/addProducts" element={<AddProducts />} /> */}
    <Route path="/products/productList" element={<ProductList />} />
    <Route path="/newOrders" element={<NewOrdersTable/>}/>
    <Route path="/scheduled/services" element={<ScheduledServices />} />
  </Routes>
);

export default SellerRouting;