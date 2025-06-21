
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ReturnedProductsTable from '../components/products/ReturnedProductsTable';
import JobCardHistory from '../components/jobCards/JobCardHistory';



const SellerRouting = () => (
  <Routes>
    <Route path="/" element={<DashboardOverview />} />
     <Route path="/returnedProduct" element={<ReturnedProductsTable />} />
   <Route path="/jobCards/jobHistory" element={<JobCardHistory/>} />

  </Routes>
);

export default SellerRouting;