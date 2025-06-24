import React, { useState, useEffect } from 'react';
import './ReturnedProductsTable.css';
import { FaFileExcel, FaPrint, FaSearch, FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaEye } from 'react-icons/fa';

const ReturnedProductsTable = () => {
  // Sample data with more entries
  const initialData = [
    {
      returnId: 'RET-1023',
      orderId: 'ORD-10056',
      customerName: 'Rahul Sharma',
      phoneEmail: 'rahul.s@example.com | 9876543210',
      productName: 'boAt Rockerz 450 Headphones',
      sku: 'SKU-BOAT450',
      quantity: 1,
      returnRequestDate: '2023-05-15',
      returnReason: 'Product damaged',
      returnComments: 'Right earpiece not working',
      productCondition: 'Damaged',
      refundMethod: 'Original Payment',
      refundStatus: 'Pending',
      returnStatus: 'Requested',
      price: '₹1,299',
      productImage: 'https://rukminim1.flixcart.com/image/612/612/kqse07k0/headphone/j/z/z/rockerz-450-boat-original-imag4q8hkgzszhxg.jpeg'
    },
    {
      returnId: 'RET-1024',
      orderId: 'ORD-10057',
      customerName: 'Priya Patel',
      phoneEmail: 'priya.p@example.com | 8765432109',
      productName: 'Mi Smart Band 5',
      sku: 'SKU-MIBAND5',
      quantity: 1,
      returnRequestDate: '2023-05-12',
      returnReason: 'Color mismatch',
      returnComments: 'Received black instead of blue',
      productCondition: 'Opened',
      refundMethod: 'UPI',
      refundStatus: 'Refunded',
      returnStatus: 'Completed',
      price: '₹2,499',
      productImage: 'https://rukminim1.flixcart.com/image/612/612/kll7bm80/smart-band-tag/m/n/d/mi-smart-band-5-mi-original-imagyzy7hqurdggh.jpeg'
    },
    {
      returnId: 'RET-1025',
      orderId: 'ORD-10058',
      customerName: 'Amit Singh',
      phoneEmail: 'amit.s@example.com | 7654321098',
      productName: 'Nike Revolution 5 Shoes',
      sku: 'SKU-NIKER5',
      quantity: 1,
      returnRequestDate: '2023-05-08',
      returnReason: 'Size issue',
      returnComments: 'Need one size bigger',
      productCondition: 'Unused',
      refundMethod: 'Bank Transfer',
      refundStatus: 'Declined',
      returnStatus: 'Rejected',
      price: '₹2,795',
      productImage: 'https://rukminim1.flixcart.com/image/612/612/k3uhhu80/shoe/z/z/c/6-376744-6-nike-black-smoke-grey-light-bone-original-imafmv3hcrbhkzjg.jpeg'
    },
    {
      returnId: 'RET-1026',
      orderId: 'ORD-10059',
      customerName: 'Neha Gupta',
      phoneEmail: 'neha.g@example.com | 6543210987',
      productName: 'Sony WH-1000XM4 Headphones',
      sku: 'SKU-SONYWHXM4',
      quantity: 1,
      returnRequestDate: '2023-05-10',
      returnReason: 'Not as expected',
      returnComments: 'Sound quality not good',
      productCondition: 'Opened',
      refundMethod: 'Original Payment',
      refundStatus: 'Pending',
      returnStatus: 'Approved',
      price: '₹24,990',
      productImage: 'https://rukminim1.flixcart.com/image/612/612/kq18n0w0/headphone/s/p/d/wh-1000xm4-sony-original-imag4h5h5zq7nzgg.jpeg'
    },
    {
      returnId: 'RET-1027',
      orderId: 'ORD-10060',
      customerName: 'Vikram Joshi',
      phoneEmail: 'vikram.j@example.com | 5432109876',
      productName: 'Samsung Galaxy Watch 4',
      sku: 'SKU-SAMGW4',
      quantity: 1,
      returnRequestDate: '2023-05-05',
      returnReason: 'Defective product',
      returnComments: 'Screen not working properly',
      productCondition: 'Damaged',
      refundMethod: 'UPI',
      refundStatus: 'Refunded',
      returnStatus: 'Completed',
      price: '₹18,999',
      productImage: 'https://rukminim1.flixcart.com/image/612/612/krntoy80/smartwatch/z/c/q/galaxy-watch4-r870-sm-r870nzsainu-samsung-original-imag5b9j5gvz9zjg.jpeg'
    },
    {
      returnId: 'RET-1028',
      orderId: 'ORD-10061',
      customerName: 'Ananya Reddy',
      phoneEmail: 'ananya.r@example.com | 4321098765',
      productName: 'Apple AirPods Pro',
      sku: 'SKU-APPAP',
      quantity: 1,
      returnRequestDate: '2023-05-18',
      returnReason: 'Wrong item received',
      returnComments: 'Received AirPods 2 instead of Pro',
      productCondition: 'Unopened',
      refundMethod: 'Bank Transfer',
      refundStatus: 'Pending',
      returnStatus: 'Requested',
      price: '₹24,900',
      productImage: 'https://rukminim1.flixcart.com/image/612/612/kqjtd3k0/headphone/n/u/a/airpods-pro-mwp22hn-a-apple-original-imag4q5hbgjqvyzz.jpeg'
    },
    {
      returnId: 'RET-1029',
      orderId: 'ORD-10062',
      customerName: 'Rohan Malhotra',
      phoneEmail: 'rohan.m@example.com | 3210987654',
      productName: 'OnePlus 9 Pro',
      sku: 'SKU-OP9PRO',
      quantity: 1,
      returnRequestDate: '2023-05-20',
      returnReason: 'Changed mind',
      returnComments: 'Want to buy different model',
      productCondition: 'Unused',
      refundMethod: 'Original Payment',
      refundStatus: 'Declined',
      returnStatus: 'Rejected',
      price: '₹64,999',
      productImage: 'https://rukminim1.flixcart.com/image/612/612/kljrvrk0/mobile/z/l/q/9-pro-le2121-oneplus-original-imagyny7hzgvqjyz.jpeg'
    }
  ];

  // State management
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedReturnStatus, setUpdatedReturnStatus] = useState('');
  const [updatedRefundStatus, setUpdatedRefundStatus] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  // Filter data based on search term
  useEffect(() => {
    const filtered = data.filter(item => 
      Object.values(item).some(
        val => val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
      case 'Refunded':
        return 'rp-status-completed';
      case 'Requested':
        return 'rp-status-requested';
      case 'Approved':
        return 'rp-status-approved';
      case 'Rejected':
      case 'Declined':
        return 'rp-status-rejected';
      case 'Pending':
        return 'rp-status-pending';
      default:
        return 'rp-status-default';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Open modal with return details
  const openModal = (returnItem) => {
    setSelectedReturn(returnItem);
    setUpdatedReturnStatus(returnItem.returnStatus);
    setUpdatedRefundStatus(returnItem.refundStatus);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReturn(null);
    setInternalNotes('');
  };

  // Update return status
  const handleStatusUpdate = () => {
    const updatedData = data.map(item => 
      item.returnId === selectedReturn.returnId 
        ? { 
            ...item, 
            returnStatus: updatedReturnStatus,
            refundStatus: updatedRefundStatus
          } 
        : item
    );
    setData(updatedData);
    closeModal();
  };

  // Export to Excel function
  const exportToExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Return ID,Order ID,Customer Name,Contact,Product Name,SKU,Qty,Request Date,Reason,Condition,Refund Method,Refund Status,Return Status\n"
      + data.map(item => 
        `"${item.returnId}","${item.orderId}","${item.customerName}","${item.phoneEmail.split(' | ')[0]}","${item.productName}","${item.sku}","${item.quantity}","${formatDate(item.returnRequestDate)}","${item.returnReason}","${item.productCondition}","${item.refundMethod}","${item.refundStatus}","${item.returnStatus}"`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "returned_products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print function
  const printTable = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Return & Refund Requests</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; }
      table { width: 100%; border-collapse: collapse; }
      th { background-color: #4361ee; color: white; padding: 8px; text-align: left; }
      td { padding: 8px; border-bottom: 1px solid #ddd; }
      .rp-status-badge { padding: 4px 10px; border-radius: 12px; font-size: 12px; }
      .rp-status-completed { background-color: #d4edda; color: #155724; }
      .rp-status-requested { background-color: #cce5ff; color: #004085; }
      .rp-status-approved { background-color: #fff3cd; color: #856404; }
      .rp-status-rejected { background-color: #f8d7da; color: #721c24; }
      .rp-status-pending { background-color: #e2e3e5; color: #383d41; }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<h1>Return & Refund Requests</h1>');
    printWindow.document.write('<table>');
    printWindow.document.write('<thead><tr>');
    printWindow.document.write('<th>Return ID</th><th>Order ID</th><th>Customer</th><th>Contact</th>');
    printWindow.document.write('<th>Product</th><th>SKU</th><th>Qty</th><th>Request Date</th>');
    printWindow.document.write('<th>Reason</th><th>Condition</th><th>Refund Method</th>');
    printWindow.document.write('<th>Refund Status</th><th>Return Status</th>');
    printWindow.document.write('</tr></thead><tbody>');
    
    data.forEach(item => {
      printWindow.document.write('<tr>');
      printWindow.document.write(`<td>${item.returnId}</td>`);
      printWindow.document.write(`<td>${item.orderId}</td>`);
      printWindow.document.write(`<td>${item.customerName}</td>`);
      printWindow.document.write(`<td>${item.phoneEmail.split(' | ')[0]}</td>`);
      printWindow.document.write(`<td>${item.productName}</td>`);
      printWindow.document.write(`<td>${item.sku}</td>`);
      printWindow.document.write(`<td>${item.quantity}</td>`);
      printWindow.document.write(`<td>${formatDate(item.returnRequestDate)}</td>`);
      printWindow.document.write(`<td>${item.returnReason}</td>`);
      printWindow.document.write(`<td>${item.productCondition}</td>`);
      printWindow.document.write(`<td>${item.refundMethod}</td>`);
      printWindow.document.write(`<td><span class="rp-status-badge ${getStatusBadgeClass(item.refundStatus)}">${item.refundStatus}</span></td>`);
      printWindow.document.write(`<td><span class="rp-status-badge ${getStatusBadgeClass(item.returnStatus)}">${item.returnStatus}</span></td>`);
      printWindow.document.write('</tr>');
    });
    
    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="rp-container rp-premium-form-container">
      <i className="fas fa-exchange-alt rp-floating-icon rp-floating-icon-1"></i>
      <i className="fas fa-undo rp-floating-icon rp-floating-icon-2"></i>
      
      <div className="rp-premium-form-header">
        <h2><i className="fas fa-undo rp-me-2"></i>Return & Refund Requests</h2>
        <p className="rp-text-muted">Manage customer returns and refunds</p>
      </div>

      {/* Header Controls */}
      <div className="rp-header-controls">
        <div className="rp-search-container">
          <div className="rp-search-icon">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="rp-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="rp-entries-control">
          <span>Show</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="rp-entries-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries</span>
        </div>
      </div>
      
      <div className="rp-table-responsive">
        <table className="rp-table rp-table-striped rp-table-hover">
          <thead>
            <tr>
              <th onClick={() => requestSort('returnId')} className="rp-sortable-header">
                Return ID {sortConfig.key === 'returnId' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th onClick={() => requestSort('orderId')} className="rp-sortable-header">
                Order ID {sortConfig.key === 'orderId' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th onClick={() => requestSort('customerName')} className="rp-sortable-header">
                Customer Name {sortConfig.key === 'customerName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th>Phone/Email</th>
              <th>Product Name</th>
              <th>SKU/Product Code</th>
              <th>Qty</th>
              <th onClick={() => requestSort('returnRequestDate')} className="rp-sortable-header">
                Return Request Date {sortConfig.key === 'returnRequestDate' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th>Return Reason</th>
              <th>Return Comments</th>
              <th>Product Condition</th>
              <th>Refund Method</th>
              <th>Refund Status</th>
              <th>Return Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.returnId}>
                <td>{item.returnId}</td>
                <td>{item.orderId}</td>
                <td>{item.customerName}</td>
                <td>{item.phoneEmail}</td>
                <td>{item.productName}</td>
                <td>{item.sku}</td>
                <td>{item.quantity}</td>
                <td>{formatDate(item.returnRequestDate)}</td>
                <td>{item.returnReason}</td>
                <td>{item.returnComments}</td>
                <td>{item.productCondition}</td>
                <td>{item.refundMethod}</td>
                <td>
                  <span className={`rp-status-badge ${getStatusBadgeClass(item.refundStatus)}`}>
                    {item.refundStatus}
                  </span>
                </td>
                <td>
                  <span className={`rp-status-badge ${getStatusBadgeClass(item.returnStatus)}`}>
                    {item.returnStatus}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => openModal(item)}
                    className="rp-view-button"
                    title="View Details"
                  >
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="rp-table-footer">
        <div className="rp-entries-info">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="rp-export-buttons">
          <button onClick={exportToExcel} className="rp-export-button rp-excel-button">
            <FaFileExcel /> Excel
          </button>
          <button onClick={printTable} className="rp-export-button rp-print-button">
            <FaPrint /> Print
          </button>
        </div>
        <div className="rp-pagination-container">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="rp-pagination-button"
            title="First Page"
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rp-pagination-button"
            title="Previous Page"
          >
            <FaAngleLeft />
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`rp-pagination-button ${currentPage === pageNum ? 'rp-active' : ''}`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rp-pagination-button"
            title="Next Page"
          >
            <FaAngleRight />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="rp-pagination-button"
            title="Last Page"
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>

      {/* Modal for View/Update */}
      {isModalOpen && selectedReturn && (
        <div className="rp-modal-overlay">
          <div className="rp-modal-content">
            <div className="rp-modal-header">
              <div style={{ marginBottom: '15px' }}></div>
              <h2>Return Request Details</h2>
              <button onClick={closeModal} className="rp-close-button">&times;</button>
            </div>
            
            <div className="rp-modal-body">
              <div className="rp-modal-grid">
                {/* Left Column */}
                <div className="rp-modal-column">
                  <div className="rp-section">
                    <h3 style={{ color: '#ffffff', fontWeight: '600' }}>Order Information</h3>
                    <div className="rp-info-grid">
                      <div className="rp-info-item">
                        <span className="rp-info-label">Return ID:</span>
                        <span>{selectedReturn.returnId}</span>
                      </div>
                      <div className="rp-info-item">
                        <span className="rp-info-label">Order ID:</span>
                        <span>{selectedReturn.orderId}</span>
                      </div>
                      <div className="rp-info-item">
                        <span className="rp-info-label">Customer Name:</span>
                        <span>{selectedReturn.customerName}</span>
                      </div>
                      <div className="rp-info-item">
                        <span className="rp-info-label">Email:</span>
                        <span>{selectedReturn.phoneEmail.split(' | ')[0]}</span>
                      </div>
                      <div className="rp-info-item">
                        <span className="rp-info-label">Phone:</span>
                        <span>{selectedReturn.phoneEmail.split(' | ')[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rp-section">
                    <h3 style={{ color: '#ffffff', fontWeight: '600' }}>Return Information</h3>
                    <div className="rp-info-grid">
                      <div className="rp-info-item">
                        <span className="rp-info-label">Request Date:</span>
                        <span>{formatDate(selectedReturn.returnRequestDate)}</span>
                      </div>
                      <div className="rp-info-item">
                        <span className="rp-info-label">Return Reason:</span>
                        <span>{selectedReturn.returnReason}</span>
                      </div>
                      <div className="rp-info-item">
                        <span className="rp-info-label">Customer Comments:</span>
                        <span>{selectedReturn.returnComments}</span>
                      </div>
                      <div className="rp-info-item">
                        <span className="rp-info-label">Product Condition:</span>
                        <span className={`rp-status-badge ${getStatusBadgeClass(selectedReturn.productCondition)}`}>
                          {selectedReturn.productCondition}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="rp-modal-column">
                  <div className="rp-section">
                    <h3 style={{ color: '#ffffff', fontWeight: '600' }}>Product Information</h3>
                    <div className="rp-product-display">
                      <div className="rp-product-image-container">
                        <img 
                          src={selectedReturn.productImage} 
                          alt={selectedReturn.productName} 
                          className="rp-product-image" 
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="rp-product-details">
                        <div className="rp-product-name">{selectedReturn.productName}</div>
                        <div className="rp-product-sku">SKU: {selectedReturn.sku}</div>
                        <div className="rp-product-price">{selectedReturn.price}</div>
                        <div className="rp-product-quantity">Quantity: {selectedReturn.quantity}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rp-section">
                    <h3 style={{ color: '#ffffff', fontWeight: '600' }}>Refund & Return Status</h3>
                    <div className="rp-info-grid">
                      <div className="rp-info-item">
                        <span className="rp-info-label">Refund Method:</span>
                        <span>{selectedReturn.refundMethod}</span>
                      </div>
                      <div className="rp-form-group">
                        <label>Refund Status:</label>
                        <select
                          value={updatedRefundStatus}
                          onChange={(e) => setUpdatedRefundStatus(e.target.value)}
                          className="rp-status-select"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Refunded">Refunded</option>
                          <option value="Declined">Declined</option>
                        </select>
                      </div>
                      <div className="rp-form-group">
                        <label>Return Status:</label>
                        <select
                          value={updatedReturnStatus}
                          onChange={(e) => setUpdatedReturnStatus(e.target.value)}
                          className="rp-status-select"
                        >
                          <option value="Requested">Requested</option>
                          <option value="Approved">Approved</option>
                          <option value="Picked">Picked</option>
                          <option value="Completed">Completed</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rp-section">
                    <h3 style={{ color: '#ffffff', fontWeight: '600' }}>Internal Notes</h3>
                    <div className="rp-form-group">
                      <textarea
                        value={internalNotes}
                        onChange={(e) => setInternalNotes(e.target.value)}
                        className="rp-notes-textarea"
                        placeholder="Add any internal notes or comments..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rp-modal-footer">
              <button onClick={closeModal} className="rp-modal-button cancel">
                Cancel
              </button>
              <button onClick={handleStatusUpdate} className="rp-modal-button save">
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnedProductsTable;