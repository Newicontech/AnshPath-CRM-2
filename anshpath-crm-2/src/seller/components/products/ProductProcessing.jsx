import React, { useState,useRef } from 'react';
import { FaEdit, FaTrash, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { FaPrint } from 'react-icons/fa';
import './ProcessingOrdersTable.css';
import { FaUser, FaPhone, FaBox, FaBarcode, FaHashtag, FaCalendarAlt, FaLayerGroup, FaMoneyBill, FaReceipt, FaMapMarkerAlt } from 'react-icons/fa';



const stageColorsLight = {
  All: '#343a40',
  Pending: '#6c757d',
  Confirmed: '#007bff',
  Packing: '#fd7e14',
  'Ready to Ship': '#28a745',
  Hold: '#dc3545',
};

const stages = Object.keys(stageColorsLight);
const paymentTypes = ['COD', 'Prepaid'];
const paymentStatuses = ['Pending', 'Paid'];

const initialData = Array.from({ length: 55 }, (_, i) => ({
  id: i + 1,
  orderId: `ORD00${i + 1}`,
  customerName: `Customer ${i + 1}`,
  contact: `12345678${i}`,
  productName: `Product ${i + 1}`,
  sku: `SKU00${i + 1}`,
  quantity: Math.floor(Math.random() * 10) + 1,
  processingDate: `2025-06-${String(10 + (i % 20)).padStart(2, '0')}`,
  OrderStage: stages[(i % (stages.length - 1)) + 1],
  paymentType: i % 2 === 0 ? 'COD' : 'Prepaid',
  paymentStatus: i % 2 === 0 ? 'Pending' : 'Paid',
  address: `123${i} Example Street, City`,
}));

const ProcessingOrdersTable = ({ darkToggle }) => {
  const stageColors = darkToggle ? stageColorsDark : stageColorsLight;
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const printRef = useRef();
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleDeleteConfirm = () => {
    if (deleteCandidate) {
      setData(data.filter(order => order.id !== deleteCandidate.id));
      toast.success('Order deleted!');
      setDeleteCandidate(null);
    }
  };

  const handleEdit = (row) => {
    setEditingId(row.id);
    setEditedRow({ ...row });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedRow(null);
  };

  const handleSave = () => {
    setData(data.map(item => (item.id === editingId ? editedRow : item)));
    toast.success('Order updated!');
    setEditingId(null);
    setEditedRow(null);
  };

  const handleFieldChange = (field, value) => {
    setEditedRow(prev => ({ ...prev, [field]: value }));
  };

  const filteredData = data.filter(order => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = (
      order.customerName +
      order.productName +
      order.orderId +
      order.contact +
      order.address +
      order.sku +
      order.OrderStage +
      order.paymentType +
      order.paymentStatus
    ).toLowerCase().includes(term);
    const matchesStage = stageFilter === 'All' ? true : order.OrderStage === stageFilter;
    const date = new Date(order.processingDate);
    const isAfterStart = startDate ? new Date(startDate) <= date : true;
    const isBeforeEnd = endDate ? new Date(endDate) >= date : true;
    return matchesSearch && matchesStage && isAfterStart && isBeforeEnd;
  });

  const sortedData = [...filteredData].sort((a, b) => {
  if (!sortConfig.key) return 0;
  const valA = a[sortConfig.key];
  const valB = b[sortConfig.key];

  if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
  if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
  return 0;
});

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

const handlePrint = () => {
  const tableClone = printRef.current.cloneNode(true);
  const rows = tableClone.querySelectorAll('tr');
  rows.forEach(row => {
    if (row.cells.length > 0) {
      row.deleteCell(row.cells.length - 1);
    }
  });

  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head>');
  printWindow.document.write('<style>');
  printWindow.document.write(`
    .print-styles-AP01 body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    .print-styles-AP01 h1 {
      text-align: center;
      margin-bottom: 5px;
      font-size: 24px;
      color: #2d4ecf;
    }
    .print-styles-AP01 h2 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 18px;
      color: #444;
    }
    .print-styles-AP01 table {
      width: 100%;
      border-collapse: collapse;
      height: auto;
    }
    .print-styles-AP01 th, .print-styles-AP01 td {
      border: 1px solid #999;
      padding: 8px;
      text-align: left;
    }
    .print-styles-AP01 th {
      background-color: #f0f0f0;
    }
  `);
  printWindow.document.write('</style></head><body class="print-styles-AP01">');
  printWindow.document.write('<h1>AnshPath Technology Private Limited</h1>');
  printWindow.document.write('<h2>Processing Product List</h2>');
  printWindow.document.write(tableClone.outerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'processing-orders.xlsx');
  };

  const handleSort = (key) => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setSortConfig({ key, direction });
};


  return (
    <div className="container-POD">  
    {/* <div className="table-print-section-POD"> */}
      <h2 className="title-POD">PROCESSING ORDERS</h2>
      <div className="stat-cards-POD">
        {stages.map(OrderStage => {
          const count = OrderStage === 'All' ? data.length : data.filter(d => d.OrderStage === OrderStage).length;
          return (
            <div
              key={OrderStage}
              className={`stat-card-POD ${stageFilter === OrderStage ? 'active-POD' : ''}`}
              style={{ backgroundColor: stageColors[OrderStage] }}
              onClick={() => {
                setStageFilter(OrderStage);
                setCurrentPage(1);
              }}
            >
              <h5>{OrderStage}</h5>
              <p>{count}</p>
            </div>
          );
        })}
      </div>

      <div className="filters-row-POD">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input-POD" />
        <div className="date-group-POD">
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div className="date-group-POD">
          <label>End Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
      </div>
      <div ref={printRef}>
      <div className="table-responsive-POD">
        <table className="table-POD">
          <thead>
            <tr>
              {[
                { label: 'ID', key: 'id' },
                { label: 'Order ID', key: 'orderId' },
                { label: 'Customer', key: 'customerName' },
                { label: 'Contact', key: 'contact' },
                { label: 'Product', key: 'productName' },
                { label: 'SKU', key: 'sku' },
                { label: 'Qty', key: 'quantity' },
                { label: 'Date', key: 'processingDate' },
                { label: 'Order Stage', key: 'OrderStage' },
                { label: 'Payment Type', key: 'paymentType' },
                { label: 'Payment Status', key: 'paymentStatus' },
                { label: 'Address', key: 'address' },
                { label: 'Actions', key: null },
              ].map(({ label, key }) => (
                <th
                  key={label}
                  onClick={() => key && handleSort(key)}
                  style={{ cursor: key ? 'pointer' : 'default' }}
                >
                  {label}
                  {key === sortConfig.key && (
                    <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
              ))} 
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>{order.contact}</td>
                <td>{order.productName}</td>
                <td>{order.sku}</td>
                <td>{order.quantity}</td>
                <td>{order.processingDate}</td>
                <td>
                  <span className="stage-badge-POD" style={{
                    backgroundColor: stageColors[order.OrderStage], minWidth: '110px', display: 'inline-block', textAlign: 'center'
                  }}>{order.OrderStage}</span>
                </td>
                <td>{order.paymentType}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.address}</td>
                <td>
                  <button className="edit-POD" onClick={() => handleEdit(order)}><FaEdit /></button>
                  <button className="delete-POD" onClick={() => setDeleteCandidate(order)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      <div className="export-controls-row-POD">
        <div className="page-size-selector-POD">
          <label htmlFor="rowsPerPage"></label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 15, 20].map(size => (
              <option key={size} value={size}>{size}  per page</option>
            ))}
          </select>
        </div>

        <div className="export-buttons-POD">
          <button onClick={handlePrint} className="button-POD"><FaPrint /> Print</button>
          <button onClick={exportToExcel} className="button-POD"><FaFileExcel /> Excel</button>
        </div>
      </div>


      <div className="pagination-POD">
        {/* First */}
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          &laquo;
        </button>

        {/* Previous */}
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          &lsaquo;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page => page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1))
          .map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? 'active-POD' : ''}
            >
              {page}
            </button>
          ))}
        {currentPage + 1 < totalPages - 1 && totalPages > 5 && (
          <button disabled>...</button>
        )}
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          &rsaquo;
        </button>
        <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          &raquo;
        </button>
      </div>


      {editingId && editedRow && (
        <div className="edit-popup-overlay-POD">
          <div className="edit-popup-POD">
            <h3>Edit Order {editedRow.orderId}</h3>
            <div className="edit-scroll-POD">

              {/* Row 1 */}
              <div className="field-row-POD">
                <div className="field-group-POD">
                  <label><FaUser style={{ marginRight: '6px' }} />Customer Name</label>
                  <input value={editedRow.customerName} onChange={e => handleFieldChange('customerName', e.target.value)} />
                </div>
                <div className="field-group-POD">
                  <label><FaPhone style={{ marginRight: '6px' }} />Contact</label>
                  <input value={editedRow.contact} onChange={e => handleFieldChange('contact', e.target.value)} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="field-row-POD">
                <div className="field-group-POD">
                  <label><FaBox style={{ marginRight: '6px' }} />Product Name</label>
                  <input value={editedRow.productName} onChange={e => handleFieldChange('productName', e.target.value)} />
                </div>
                <div className="field-group-POD">
                  <label><FaBarcode style={{ marginRight: '6px' }} />SKU</label>
                  <input value={editedRow.sku} onChange={e => handleFieldChange('sku', e.target.value)} />
                </div>
              </div>

              {/* Row 3 */}
              <div className="field-row-POD">
                <div className="field-group-POD">
                  <label><FaHashtag style={{ marginRight: '6px' }} />Quantity</label>
                  <input type="number" value={editedRow.quantity} onChange={e => handleFieldChange('quantity', e.target.value)} />
                </div>
                <div className="field-group-POD">
                  <label><FaCalendarAlt style={{ marginRight: '6px' }} />Processing Date</label>
                  <input type="date" value={editedRow.processingDate} onChange={e => handleFieldChange('processingDate', e.target.value)} />
                </div>
              </div>

              {/* Row 4 */}
              <div className="field-row-POD">
                <div className="field-group-POD">
                  <label><FaLayerGroup style={{ marginRight: '6px' }} />Order Stage</label>
                  <select value={editedRow.OrderStage} onChange={e => handleFieldChange('OrderStage', e.target.value)}>
                    {stages.filter(s => s !== 'All').map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
                <div className="field-group-POD">
                  <label><FaMoneyBill style={{ marginRight: '6px' }} />Payment Type</label>
                  <select value={editedRow.paymentType} onChange={e => handleFieldChange('paymentType', e.target.value)}>
                    {paymentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5 */}
              <div className="field-row-POD">
                <div className="field-group-POD">
                  <label><FaReceipt style={{ marginRight: '6px' }} />Payment Status</label>
                  <select value={editedRow.paymentStatus} onChange={e => handleFieldChange('paymentStatus', e.target.value)}>
                    {paymentStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="field-group-POD">
                  <label><FaMapMarkerAlt style={{ marginRight: '6px' }} />Address</label>
                  <textarea rows="2" value={editedRow.address} onChange={e => handleFieldChange('address', e.target.value)} />
                </div>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="popup-actions-POD">
              <button className="edit-POD" onClick={handleSave}>Update</button>
              <button className="delete-POD" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}



      {deleteCandidate && (
        <div className="delete-popup-overlay-POD">
          <div className="delete-popup-POD">
            <h3>Confirm Deletion</h3>
            <p><strong>Order ID:</strong> {deleteCandidate.orderId}</p>
            <p><strong>Customer:</strong> {deleteCandidate.customerName}</p>
            <p><strong>Product:</strong> {deleteCandidate.productName}</p>
            <p><strong>Order Stage:</strong> {deleteCandidate.OrderStage}</p>
            <p><strong>Are you sure you want to delete this order?</strong></p>
            <div className="popup-actions-POD">
              <button className="delete-POD" onClick={handleDeleteConfirm}>Delete</button>
              <button className="edit-POD" onClick={() => setDeleteCandidate(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ProcessingOrdersTable;



