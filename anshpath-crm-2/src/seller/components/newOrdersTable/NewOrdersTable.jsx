
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash, FaBoxOpen, FaPrint , FaFileCsv, FaSearch, FaClipboardList, FaMoneyCheckAlt, FaTruck, FaSave, FaTimes  } from 'react-icons/fa';
import './NewOrdersTable.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

const NewOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });


      const renderSortableHeader = (label, key) => {
        const isActive = sortConfig.key === key;
        const direction = sortConfig.direction;

        return (
          <th
            onClick={() => handleSort(key)}
            style={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}
          >
            {label}
            {isActive && (
              <span className="ms-1">
                {direction === 'asc' ? '▲' : '▼'}
              </span>
            )}
          </th>
        );
      };


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    const dummyOrders = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      orderId: `ORD-${10000 + i}`,
      customerName: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: '9876543210',
      shippingAddress: '123 Street, Mumbai, 400001, Maharashtra',
      productName: 'Wireless Headphones',
      sku: `PROD-${101 + i}`,
      quantity: Math.floor(Math.random() * 5 + 1),
      orderDate: new Date().toISOString(),
      paymentType: 'Online',
      paymentStatus: ['Paid', 'Pending', 'COD'][i % 3],
      totalPrice: 2500 + i * 100,
      orderStatus: ['Ordered', 'Shipped', 'Delivered'][i % 3],
      trackingId: '',
    }));

    setOrders(dummyOrders);
    setFilteredOrders(dummyOrders);
  };

  const isRecent = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    return (now - date) / (1000 * 60 * 60) <= 24;
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, startDate, endDate);
  };

  const applyFilters = (term, start, end) => {
    let filtered = orders.filter(order =>
      order.orderId.toLowerCase().includes(term) ||
      order.customerName.toLowerCase().includes(term) ||
      order.orderStatus.toLowerCase().includes(term)
    );

    if (start && end) {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDateObj && orderDate <= endDateObj;
      });
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); 
  };

  const handleDateChange = (type, value) => {
    const updatedStart = type === 'start' ? value : startDate;
    const updatedEnd = type === 'end' ? value : endDate;

    setStartDate(updatedStart);
    setEndDate(updatedEnd);
    applyFilters(searchTerm, updatedStart, updatedEnd);
  };


const TOAST_ID = 'order-update-toast';

const handleUpdate = () => {
  try {
    console.log('handleUpdate called');

    const updatedOrders = orders.map(order =>
      order.id === selectedOrder.id ? selectedOrder : order
    );

    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    setShowModal(false);

    const toastOptions = {
      toastId: TOAST_ID,
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    };

 
    if (toast.isActive(TOAST_ID)) {
      toast.update(TOAST_ID, {
        render: 'Order Updated Successfully',
        type: toast.TYPE.SUCCESS,
        ...toastOptions,
      });
    } else {
      toast.success('Order Updated Successfully', toastOptions);
    }
  } catch (error) {
    console.error('Error in handleUpdate:', error);
  }
};


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      const newOrders = orders.filter(order => order.id !== id);
      setOrders(newOrders);
      setFilteredOrders(newOrders);
    }
  };

  const getBadgeClass = (status, type) => {
    const map = {
      order: {
        Ordered: 'primary',
        Shipped: 'warning',
        'Out for Delivery': 'info',
        Delivered: 'success',
        Cancelled: 'danger',
      },
      payment: {
        Paid: 'success',
        Pending: 'secondary',
        Failed: 'danger',
        COD: 'dark',
      }
    };
    return `badge bg-${map[type][status] || 'secondary'}`;
  };

const handleExportPDF = async () => {
  const input = document.getElementById('orders-table-wrapper');
  if (!input) return;


  const isDarkMode = document.body.classList.contains('dark-mode-HDW-01');

 
  const getCSSVar = (name) =>
    getComputedStyle(document.body).getPropertyValue(name).trim();

  const bgColor = getCSSVar('--bg-light-not');
  const textColor = getCSSVar('--text-color-not');
  const primaryColor = getCSSVar('--primary-color-not');
  const mutedBgColor = getCSSVar('--bg-muted-not');
  const borderColor = getCSSVar('--border-color-not');

 
  const cloned = input.cloneNode(true);
  cloned.style.width = input.scrollWidth + 'px';
  cloned.style.position = 'absolute';
  cloned.style.left = '-9999px';
  cloned.style.top = '0';
  cloned.style.zIndex = '-1';


  cloned.querySelectorAll('.action-column, td:last-child, th:last-child').forEach(el => el.remove());

  cloned.style.backgroundColor = bgColor;
  cloned.style.color = textColor;

  cloned.querySelectorAll('th').forEach(th => {
    th.style.backgroundColor = primaryColor;
    th.style.color = '#ffffff';
    th.style.border = `1px solid ${borderColor}`;
  });

  cloned.querySelectorAll('td').forEach(td => {
    td.style.backgroundColor = mutedBgColor;
    td.style.color = textColor;
    td.style.border = `1px solid ${borderColor}`;
  });

  cloned.querySelectorAll('.badge').forEach(badge => {
    badge.style.backgroundColor ||= '#444';
    badge.style.color = '#fff';
  });
  document.body.appendChild(cloned);

  const canvas = await html2canvas(cloned, {
    scale: 2,
    useCORS: true,
    scrollX: 0,
    scrollY: 0,
    width: cloned.scrollWidth,
    windowWidth: cloned.scrollWidth
  });

 
  document.body.removeChild(cloned);

  const imgData = canvas.toDataURL('image/png');
  const pdfWidth = canvas.width;
  const headerHeight = 150;
  const pdfHeight = canvas.height + headerHeight + 60;

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [pdfWidth, pdfHeight]
  });

  
  pdf.setFillColor(bgColor);
  pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

  const todayDate = new Date().toLocaleDateString('en-GB');

  const scaleFactor = pdfWidth / 2500;
  const titleFontSize = Math.min(74, 68 * scaleFactor);
  const subtitleFontSize = Math.min(46, 42 * scaleFactor);
  const rightFontSize = Math.min(54, 48 * scaleFactor);
  const footerFontSize = 50;
  const titlePadding = 20;
  const subtitlePadding = 40;
  const rightPadding = 100;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(titleFontSize);
  pdf.setTextColor(primaryColor);
  pdf.text('AnshPath', 60, 50 + titlePadding);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(subtitleFontSize);
  pdf.setTextColor(textColor);
  pdf.text('Technologies Private Limited', 40, 80 + subtitlePadding);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(rightFontSize);
  const rightTitle = 'Scheduled Services Report';
  const rightTitleWidth = pdf.getTextWidth(rightTitle);
  pdf.text(rightTitle, pdfWidth - rightTitleWidth - 40, rightPadding);


  const renderedHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, headerHeight, pdfWidth, renderedHeight);

  pdf.setFontSize(footerFontSize);
  pdf.setTextColor('black');
  const dateText = `Date: ${todayDate}`;
  const dateWidth = pdf.getTextWidth(dateText);
  pdf.text(dateText, pdfWidth - dateWidth - 40, pdfHeight - 20);


  pdf.save('scheduled_services_report.pdf');
};










const handleExportCSV = () => {
  if (sortedOrders.length === 0) return;

  const rows = sortedOrders.map(order => ({
    'Order ID': order.orderId,
    'Customer': order.customerName,
    'Email': order.email,
    'Phone': order.phone,
    'Address': order.shippingAddress,
    'Product': order.productName,
    'SKU': order.sku,
    'Qty': order.quantity,
    'Date': new Date(order.orderDate).toLocaleString(),
    'Payment Type': order.paymentType,
    'Payment Status': order.paymentStatus,
    'Total': `₹${order.totalPrice}`,
    'Status': order.orderStatus
  }));

  const csv = [
    Object.keys(rows[0]).join(','), 
    ...rows.map(row =>
      Object.values(row)
        .map(val => `"${String(val).replace(/"/g, '""')}"`)
        .join(',')
    )
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'new_orders_report.csv';
  link.click();
};



  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

   const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
        }
        setSortConfig({ key, direction });
      };

      const getSortedData = (data) => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
          const aVal = a[sortConfig.key];
          const bVal = b[sortConfig.key];

          const isNumeric = typeof aVal === 'number' && typeof bVal === 'number';

          if (isNumeric) {
            return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
          } else {
            return sortConfig.direction === 'asc'
              ? String(aVal).localeCompare(String(bVal))
              : String(bVal).localeCompare(String(aVal));
          }
        });
      };

      const sortedOrders = getSortedData(paginatedOrders);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
      <div className="container-fluid new-orders-container" style={{padding:'0%'}}>
      <ToastContainer />
      <div className="card shadow-sm border-0 rounded-5">
        <div className="card-body-NOT">
         <div className="d-flex flex-column justify-content-center align-items-center text-center mb-4 title-heading-NOT">
            <h4 className="mt-3 mb-3" style={{ fontSize: '40px'}}>
              <FaBoxOpen className="text-primary me-2" /> New Orders
            </h4>
          </div>

            <div className="d-flex flex-column flex-md-row gap-4 mb-3 custom-input-wrapper">
                  <div className="d-flex flex-column flex-grow-1">
                    <label className="custom-label-NOT">Search</label>
                    <div className="input-group custom-input-group-NOT">
                      <span className="input-group-text custom-icon-NOT">
                        <FaSearch />
                      </span>
                      <input
                        type="text"
                        className="form-control custom-input-NOT"
                        placeholder="Search by Order ID, Customer, Status"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
            </div>
            <div className="d-flex flex-column">
              <label className="custom-label-NOT">Start Date</label>
              <input
                type="date"
                className="form-control custom-input-NOT"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column">
              <label className="custom-label-NOT">End Date</label>
              <input
                type="date"
                className="form-control custom-input-NOT"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
       
            <button
                className="btn btn-primary filter-button-NOT"
                onClick={() => applyFilters(searchTerm, startDate, endDate)}
                  >
                  Filter
                  </button>
          </div>
      
          <div className="table-responsive custom-scroll">
            <div id="orders-table-wrapper">
              <table className="table table-bordered align-middle orders-table-NOT">
                <thead className="table-dark">
                  <tr>
                    {renderSortableHeader('Order ID', 'orderId')}
                    {renderSortableHeader('Customer', 'customerName')}
                    {renderSortableHeader('Email', 'email')}
                    {renderSortableHeader('Phone', 'phone')}
                    {renderSortableHeader('Address', 'shippingAddress')}
                    {renderSortableHeader('Product', 'productName')}
                    {renderSortableHeader('SKU', 'sku')}
                    {renderSortableHeader('Qty', 'quantity')}
                    {renderSortableHeader('Date', 'orderDate')}
                    {renderSortableHeader('Payment Type', 'paymentType')}
                    {renderSortableHeader('Payment', 'paymentStatus')}
                    {renderSortableHeader('Total', 'totalPrice')}
                    {renderSortableHeader('Status', 'orderStatus')}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map(order => (
                    <tr key={order.id} className={isRecent(order.orderDate) ? 'table-warning' : ''}>
                      <td>{order.orderId}</td>
                      <td>{order.customerName}</td>
                      <td>{order.email}</td>
                      <td>{order.phone}</td>
                      <td>{order.shippingAddress}</td>
                      <td>{order.productName}</td>
                      <td>{order.sku}</td>
                      <td>{order.quantity}</td>
                      <td>{new Date(order.orderDate).toLocaleString()}</td>
                      <td>{order.paymentType}</td>
                      <td>
                        <span
                          className={getBadgeClass(order.paymentStatus, 'payment')}
                          style={{ fontSize: '19px' }}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>₹{order.totalPrice}</td>
                      <td>
                        <span
                          className={getBadgeClass(order.orderStatus, 'order')}
                          style={{ fontSize: '19px' }}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td>
                        <div className="mobile-action-icons-NOT d-flex d-md-none">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              title="Edit"
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowModal(true);
                              }}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              title="Delete"
                              onClick={() => handleDelete(order.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>

                          <div className="btn-group d-none d-md-flex edit-button" style={{gap:'13px'}}>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              title="Edit"
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowModal(true);
                              }}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              title="Delete"
                              onClick={() => handleDelete(order.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="table-bottom-controls-NOT">
            <div className="custom-pagination-wrapper">
              <button
                className="custom-pagination-btn-NOT"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ◀ Prev
              </button>

              <button className="custom-pagination-btn-NOT active-NOT">
                {currentPage}
              </button>

              {totalPages > 1 && (
                <button
                  className={`custom-pagination-btn-NOT ${currentPage === totalPages ? 'active' : ''}`}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              )}

              <button
                className="btn-outline-primary custom-pagination-btn-NOT"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next ▶
              </button>
            </div>
            <div className="export-button-group-NOT">
              <div className="export-button-box-NOT">
                <button className="custom-export-btn-NOT pdf-btn-NOT" onClick={handleExportPDF}>
                  <FaPrint className="me-2" />
                  PRINT
                </button>
                <button className="custom-export-btn-NOT csv-btn-NOT" onClick={handleExportCSV}>
                  <FaFileCsv className="me-2" />
                  EXCEL
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      {showModal && selectedOrder && (
        <>
          <div className="modal show fade d-block" tabIndex="1">
              <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content custom-modal-square-NOT">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      <FaEdit className="me-2 text-primary" style={{ fontSize: '25px' }}/> Update Order - {selectedOrder.orderId}
                    </h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>

                  <div className="modal-body-NOT row g-3 ">
                    
                      <div className="row-md-6">
                        <label className="form-label d-flex align-items-center">
                          <FaClipboardList className="me-2 text-primary" style={{ fontSize: '23px'}} />
                          <span className="fw-semibold">Order Status</span>
                        </label>
                        <select
                          className="form-select-NOT form-select-sm"
                          value={selectedOrder.orderStatus}
                          onChange={e => setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value })}
                        >
                          {['Ordered', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map(status => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </div>

                      <div className="row-md-6">
                        <label className="form-label d-flex align-items-center">
                          <FaMoneyCheckAlt className="me-2 text-primary" style={{ fontSize: '23px' }} />
                          <span className="fw-semibold">Payment Status</span>
                        </label>
                        <select
                          className="form-select-NOT form-select-sm form-select-2-NOT"
                          value={selectedOrder.paymentStatus}
                          onChange={e => setSelectedOrder({ ...selectedOrder, paymentStatus: e.target.value })}
                        >
                          {['Paid', 'Pending', 'Failed', 'COD'].map(status => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </div>

                      {/* Tracking ID / Comments */}
                      <div className="row-md-8 Tracking-Id-Comments">
                        <label className="form-label d-flex align-items-center">
                          <FaTruck className="me-2 text-primary" style={{ fontSize: '23px' }} />
                          <span className="fw-semibold">Remark / Comments</span>
                        </label>
                        <input
                          type="text"
                          className="form-control-NOT form-control-sm tracking-box-NOT"
                          value={selectedOrder.trackingId}
                          onChange={e => setSelectedOrder({ ...selectedOrder, trackingId: e.target.value })}
                        />
                      </div>

                  </div>

                  <div className="modal-footer justify-content-center">
                    <button className="btn btn-success" onClick={handleUpdate}>
                      <FaSave className="me-1" /> Save
                    </button>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      <FaTimes className="me-1" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default NewOrdersTable;

