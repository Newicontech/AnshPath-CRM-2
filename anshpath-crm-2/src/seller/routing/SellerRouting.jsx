
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ReturnedProductsTable from '../components/products/ReturnedProductsTable';
import JobCardHistory from '../components/jobCards/JobCardHistory';
import ProductHistoryTable from '../components/products/ProductHistoryTable';
import NewRequests from '../components/services/NewRequests';
import VehicleHistory from '../components/vehicals/VehicleHistory';
import EstimateDetail from '../components/reports/EstimateDetail';
import ProductProcessing from '../components/products/ProductProcessing'; 
import ServiceLists from '../components/services/ServicesList'; 
import ActiveJobCard from '../components/jobCards/ActiveJobCards'; 
import CLientJobCard from '../components/Customers/ClientProfilesCJC'; 
import SparePartAdd from '../components/inventry/SparePartAdd';
import LessStockTable from '../components/inventry/LessStockTable';
import AddProducts from '../components/products/AddProducts';
import AddServices from '../components/services/AddServices';
import ServiceHistoryTable from '../components/services/ServiceHistoryTable';
import PurchaseDetails from '../components/inventry/PurchaseDetails';
import ProductList from '../components/products/ProductList';
import ScheduledServices from '../components/services/ScheduledServices';
import NewOrdersTable from '../components/products/NewOrdersTable';
import StockDetails from '../components/inventry/StockDetails';
import ShippedDeliveredOrdersTable from '../components/products/ShippedDeliveredOrdersTable';

const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
    <Route path="/returnedProduct" element={<ReturnedProductsTable />} />
    <Route path="/jobCards/jobHistory" element={<JobCardHistory/>} />
    <Route path="/products/processing" element={<ProductProcessing />} />
    <Route path="/ServiceList" element={<ServiceLists />} />
    <Route path="/active-job-Cards" element={<ActiveJobCard />} />
    <Route path="/customers/ClientProfiles" element={<CLientJobCard />} />
    <Route path="/dashboard" element={<DashboardOverview />} />
    <Route path="/dashboard/overview" element={<DashboardOverview />} />
    <Route path="/inventory/sparePartsAdd" element={<SparePartAdd />} />
    <Route path="/inventory/lessStockTable" element={<LessStockTable />} />
    <Route path="/inventory/searchStockDetails" element={< StockDetails/>} />
    <Route path="/products/productList" element={<ProductList />} />
    <Route path="/products/newOrders" element={<NewOrdersTable/>}/>
    <Route path="/services/scheduled" element={<ScheduledServices />} />
    <Route path="/addProducts" element={<AddProducts />} />
    <Route path="/services/addServices" element={<AddServices />} />    
    <Route path="/services/historyTable" element={<ServiceHistoryTable />} /> 
    <Route path="/inventory/purchaseDetails" element={<PurchaseDetails />} />
    <Route path="/products/productList" element={<ProductList />} />
    <Route path="/products/shippedDeliveredOrders" element={<ShippedDeliveredOrdersTable />} />
    <Route path="/product-history" element={<ProductHistoryTable />} />
    <Route path="/NewRequests" element={<NewRequests />} />
    <Route path="/VehicleHistory" element={<VehicleHistory />} />
    <Route path="/EstimateDetail" element={<EstimateDetail />} />
  </Routes>
);

export default SellerRouting;