// Updated ShippedDeliveredOrdersTable.jsx with full feature support
import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaSortUp, FaSortDown, FaFileExcel, FaFilter } from 'react-icons/fa';
import './ShippedDeliveredOrdersTable-so04.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderEditForm from './orderEditForm.jsx';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { IoPrintSharp } from "react-icons/io5";
import {
  FaHashtag,
  FaUser,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaBarcode,
  FaSortNumericUp,
  FaRupeeSign,
  FaTruck,
  FaMoneyCheck,
  FaCog,
  FaSearch,

} from 'react-icons/fa';
import { FaShippingFast } from 'react-icons/fa'; // ✅ Works

const initialOrders =[
  {
    id: 'ORD-10001', customerName: 'John Doe', phone: '9876543210', email: 'john@example.com',
    address: '123 Elm Street', product: 'Laptop', sku: 'LP1001', quantity: 1, amount: 70000,
    status: 'Shipped', paymentType: 'COD', paymentStatus: 'Pending', date: '2025-06-17'
  },
  {
    id: 'ORD-10002', customerName: 'Jane Smith', phone: '9123456780', email: 'jane@example.com',
    address: '456 Oak Road', product: 'Smartphone', sku: 'SP2002', quantity: 2, amount: 30000,
    status: 'Out for Delivery', paymentType: 'Paid', paymentStatus: 'Completed', date: '2025-06-18'
  },
  {
    id: 'ORD-10003', customerName: 'Alice Brown', phone: '9012345678', email: 'alice@example.com',
    address: '789 Pine Avenue', product: 'Tablet', sku: 'TB3003', quantity: 1, amount: 20000,
    status: 'Delivered', paymentType: 'Online', paymentStatus: 'Completed', date: '2025-06-15'
  },
  {
    id: 'ORD-10004', customerName: 'Bob White', phone: '9801234567', email: 'bob@example.com',
    address: '321 Birch Lane', product: 'Monitor', sku: 'MN4004', quantity: 1, amount: 15000,
    status: 'Shipped', paymentType: 'COD', paymentStatus: 'Pending', date: '2025-06-16'
  },
  {
    id: 'ORD-10005', customerName: 'Charlie Green', phone: '9654321098', email: 'charlie@example.com',
    address: '654 Maple Street', product: 'Keyboard', sku: 'KB5005', quantity: 3, amount: 4500,
    status: 'Out for Delivery', paymentType: 'Paid', paymentStatus: 'Completed', date: '2025-06-18'
  },
  {
    id: 'ORD-10006', customerName: 'Diana Prince', phone: '9345678901', email: 'diana@example.com',
    address: '987 Willow Way', product: 'Smartwatch', sku: 'SW6006', quantity: 2, amount: 10000,
    status: 'Delivered', paymentType: 'Online', paymentStatus: 'Completed', date: '2025-06-14'
  },
  {
    id: 'ORD-10007', customerName: 'Edward King', phone: '9234567890', email: 'edward@example.com',
    address: '111 Cedar Blvd', product: 'Mouse', sku: 'MS7007', quantity: 4, amount: 3200,
    status: 'Pending', paymentType: 'COD', paymentStatus: 'Pending', date: '2025-06-19'
  },
  {
    id: 'ORD-10008', customerName: 'Fiona Blue', phone: '9182736450', email: 'fiona@example.com',
    address: '222 Ash Court', product: 'Printer', sku: 'PR8008', quantity: 1, amount: 12000,
    status: 'Shipped', paymentType: 'Paid', paymentStatus: 'Completed', date: '2025-06-17'
  },
  {
    id: 'ORD-10009', customerName: 'George Hill', phone: '9023456789', email: 'george@example.com',
    address: '333 Palm Drive', product: 'Router', sku: 'RT9009', quantity: 1, amount: 3000,
    status: 'Delivered', paymentType: 'Online', paymentStatus: 'Completed', date: '2025-06-12'
  },
  {
    id: 'ORD-10010', customerName: 'Hannah Sky', phone: '9876123450', email: 'hannah@example.com',
    address: '444 Cypress Ln', product: 'Headphones', sku: 'HP1010', quantity: 2, amount: 6000,
    status: 'Out for Delivery', paymentType: 'COD', paymentStatus: 'Pending', date: '2025-06-20'
  }
]
;

function ShippedDeliveredOrdersTable() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [modalOrder, setModalOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [darkMode, setDarkMode] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const ordersPerPage = 10;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-HDW-01') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setDarkMode(savedTheme === 'dark');
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key]?.toString().toLowerCase() || '';
    const bVal = b[sortConfig.key]?.toString().toLowerCase() || '';
    return sortConfig.direction === 'asc'
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const filteredOrders = sortedOrders.filter((order) => {
    const searchable = `${order.id} ${order.customerName} ${order.phone} ${order.email} ${order.address} ${order.product} ${order.sku} ${order.paymentType} ${order.paymentStatus} ${order.status}`.toLowerCase();
    const orderDate = new Date(order.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return (
      searchable.includes(search.toLowerCase()) &&
      (statusFilter ? order.status === statusFilter : true) &&
      (!from || orderDate >= from) &&
      (!to || orderDate <= to)
    );
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfLastOrder - ordersPerPage, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleDelete = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  const handleSaveModal = (updatedOrder) => {
    setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
    setModalOrder(null);
  };

  const handleExportToExcel = () => {
    const data = filteredOrders.map(({ id, customerName, phone, email, address, product, sku, quantity, amount, status, paymentType, paymentStatus, date }) => ({
      ID: id, Customer: customerName, Phone: phone, Email: email, Address: address,
      Product: product, SKU: sku, Quantity: quantity, Amount: amount,
      Status: status, PaymentType: paymentType, PaymentStatus: paymentStatus, Date: date
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'Orders.xlsx');
  };

 const handlePrint = () => {
  const tableWrapper = document.querySelector('.sd-table-wrapper-so04').cloneNode(true);

  // Remove Actions column from header
  const headerRow = tableWrapper.querySelector('thead tr');
  if (headerRow) {
    headerRow.removeChild(headerRow.lastElementChild);
  }

  // Remove Actions cell from each row
  const bodyRows = tableWrapper.querySelectorAll('tbody tr');
  bodyRows.forEach(row => {
    row.removeChild(row.lastElementChild);
  });

  // Remove pagination section if present
  const paginationEl = tableWrapper.querySelector('.sd-pagination-so04');
  if (paginationEl) {
    paginationEl.remove();
  }

  const cleanedTableHTML = tableWrapper.innerHTML;

  const printWindow = window.open('', '', 'width=900,height=650');
  printWindow.document.write(`
    <html>
      <head>
        <title>Ansh-Path</title>
        <style>
          @media print {
            @page {
              size: landscape;
            }
          }
          body { font-family: 'Segoe UI', sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #333; padding: 8px; text-align: left; }
          .status-shipped-so04 { color: green; }
          .status-out-for-delivery-so04 { color: orange; }
          .status-delivered-so04 { color: blue; }
          .status-cancelled-so04 { color: red; }
        </style>
      </head>
      <body>
        <h1 style="text-align:center;">Ansh-Path</h1>
        <h1 style="text-align:center;">Shipped/OrderTable</h1>
        <div class="sd-table-wrapper-so04">
          ${cleanedTableHTML}
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};


  const renderSortIcon = (key) => {
    return sortConfig.key === key ? (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) : null;
  };
  return (
    <div className={`shipped-delivered-orders-container-so04 ${darkMode ? 'dark-mode' : ''}`}>
      <div className="sd-header-so04">

        <h3 className="sd-title-so04">
          <FaShippingFast style={{ marginRight: '8px',marginBottom:'8px' }} />
          Shipped / Delivered Orders
        </h3>
          <div className="sd-search-filter-so04">
           <div className="sd-search-wrapper-so04">
  <label className="sd-search-label-so04">Search:</label>
  <div style={{ position: 'relative', width: '100%' }}>
    <FaSearch className="searchicon-s04" />
    <input
      type="text"
      className="form-control sd-search-input-so04"
      placeholder="Search orders..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</div>


            <div className="sd-date-wrapper-so04">
              <label className="sd-date-label-so04">From:</label>
             
              <input type="date" className="form-control sd-date-input-so04" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            
            <div className="sd-date-wrapper-so04">
              <label className="sd-date-label-so04">To:</label>
              <input type="date" className="form-control sd-date-input-so04" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
            <button className="btn btn-primaryexcel-s04" onClick={handleExportToExcel}><FaFileExcel className='excelicon-s04' />
              Export Excel</button>
            <button className="btn btn-secondary-s04" onClick={handlePrint}><IoPrintSharp className='printicon-s04' />Print</button>
            <div className="sd-filter-dropdown-so04">
              <button onClick={() => setShowFilter(!showFilter)}><FaFilter className='filtericons-04' />Status ▾</button>
              {showFilter && (
                <div className="sd-filter-list-so04">
                  {['Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((status) => (
                    <div key={status} className={`sd-filter-item-so04 ${statusFilter === status ? 'active-so04' : ''}`} onClick={() => { setStatusFilter(status); setShowFilter(false); }}>
                      {status}
                    </div>
                  ))}
                  <div className="sd-filter-item-so04" onClick={() => { setStatusFilter(''); setShowFilter(false); }}>Clear Filter</div>
                </div>
              )}
            </div>
          </div>
        
      </div>
      <div className="sd-table-wrapper-so04">
        <table className="sd-table-so04">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}> Order ID {renderSortIcon('id')}</th>
              <th onClick={() => handleSort('customerName')}> Customer {renderSortIcon('customerName')}</th>
              <th onClick={() => handleSort('address')}>Address {renderSortIcon('address')}</th>
              <th onClick={() => handleSort('product')}>Product {renderSortIcon('product')}</th>
              <th onClick={() => handleSort('sku')}> SKU {renderSortIcon('sku')}</th>
              <th onClick={() => handleSort('quantity')}>Qty {renderSortIcon('quantity')}</th>
              <th onClick={() => handleSort('amount')}>Amount {renderSortIcon('amount')}</th>
              <th onClick={() => handleSort('status')}>Status {renderSortIcon('status')}</th>
              <th onClick={() => handleSort('paymentType')}>Payment {renderSortIcon('paymentType')}</th>
              <th onClick={() => handleSort('date')}>Date {renderSortIcon('date')}</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 ? (
              <tr><td colSpan="11" style={{ textAlign: 'center' }}>No orders found.</td></tr>
            ) : (
              currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}<br /><small>{order.phone}</small></td>
                  <td>{order.address}</td>
                  <td>{order.product}</td>
                  <td>{order.sku}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.amount}</td>
                  <td><span className={`status-${order.status.toLowerCase().replace(/\s/g, '-')}-so04`}>{order.status}</span></td>
                  <td>{order.paymentType}</td>
                  <td>{order.date}</td>
                  <td>
                    <button className="sd-action-btn-so04" onClick={() => setModalOrder(order)} title="View / Edit"><FaEdit style={{ fontSize: '20px' }} /></button>
                    <button className="sd-action-btn-so04" style={{ color: 'red' }} onClick={() => handleDelete(order.id)} title="Delete"><FaTrash /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="sd-pagination-so04">
          <button className="sd-pagination-btn-so04" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>◀ Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={`sd-pagination-btn-so04 ${currentPage === i + 1 ? 'active-so04' : ''}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          ))}
          <button className="sd-pagination-btn-so04" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next ▶</button>
        </div>

        {modalOrder && (
          <>
            <div className="modal-backdrop-s04" onClick={() => setModalOrder(null)}></div>
            <div className="sd-modal-so04">
              <div className="sd-modal-header-so04">
                <span className="sd-modal-title-so04">Edit Order: {modalOrder.id}</span>
                <button className="sd-modal-close-btn-so04" onClick={() => setModalOrder(null)}>×</button>
              </div>
              <div className="sd-modal-body-so04">
                <OrderEditForm order={modalOrder} onChange={(field, value) => setModalOrder({ ...modalOrder, [field]: value })} />
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-success-md-s04" onClick={() => handleSaveModal(modalOrder)}>Save</button>
                  <button className="btn btn-secondary-md-s04" onClick={() => setModalOrder(null)}>Cancel</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShippedDeliveredOrdersTable;
