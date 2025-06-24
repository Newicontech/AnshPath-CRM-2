import React, { useState, useMemo, useRef } from 'react';
import './ServicesListST.css';
import {
  FaEdit, FaTrash, FaFileExcel, FaPrint,
  FaStopwatch, FaPercent, FaMoneyBill, FaTag, FaCalendar
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';

const initialData = Array.from({ length: 20 }, (_, i) => {
  const price = Math.floor(Math.random() * 2000 + 300);
  const discount = Math.floor(Math.random() * 20);
  const total = price - (price * discount) / 100;
  return {
    id: `SRV-10${i + 1}`,
    name: ['Brake Pad Replacement', 'Oil Change', 'Tire Alignment', 'AC Service', 'Battery Check'][i % 5],
    category: ['Car', 'Bike'][i % 2],
    price,
    discount,
    total,
    duration: `${30 + (i % 3) * 15} mins`,
    status: i % 2 === 0,
    createdOn: `2024-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
  };
});

const ServicesList = () => {
  const [services, setServices] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editedService, setEditedService] = useState(null);
  const pageSizeOptions = [5, 10, 15];
  const [pageSize, setPageSize] = useState(5);
  const tableRef = useRef();

  const sortedFilteredData = useMemo(() => {
    let data = [...services];
    if (searchText) {
      data = data.filter(s =>
        Object.values(s).some(v =>
          String(v).toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
    if (sortConfig.key) {
      if (sortConfig.key === 'srNo') {
        data = sortConfig.direction === 'asc' ? [...data] : [...data].reverse();
      } else {
        data.sort((a, b) => {
          const aVal = a[sortConfig.key];
          const bVal = b[sortConfig.key];
          if (typeof aVal === 'string') {
            return sortConfig.direction === 'asc'
              ? aVal.localeCompare(bVal)
              : bVal.localeCompare(aVal);
          } else {
            return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
          }
        });
      }
    }
    return data;
  }, [services, sortConfig, searchText]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedFilteredData.slice(start, start + pageSize);
  }, [sortedFilteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedFilteredData.length / pageSize);

  const handleSort = (key) => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const handleToggleStatus = (id) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, status: !s.status } : s));
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setEditedService({ ...service });
  };

  const handleDelete = (service) => {
    setDeleteId(service.id);
  };

  const handleEditSave = () => {
    const updated = {
      ...editedService,
      total: editedService.price - (editedService.price * editedService.discount / 100),
    };
    setServices(prev => prev.map(s => s.id === editingId ? updated : s));
    setEditingId(null);
    toast.success('Service updated successfully!');
  };

  const handleDeleteConfirm = () => {
    setServices(prev => prev.filter(s => s.id !== deleteId));
    setDeleteId(null);
    toast.success('Service deleted successfully!');
  };

 const handlePrint = () => {
  const tableClone = tableRef.current.cloneNode(true);
  const rows = tableClone.querySelectorAll('tr');

  rows.forEach(row => {
    if (row.cells.length > 0) {
      row.deleteCell(row.cells.length - 1); // Remove Actions column
    }
  });

  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head>');
  printWindow.document.write('<style>');
  printWindow.document.write(`
    .print-styles-ST body {
      font-family: Arial, sans-serif;
      padding: 20px;
      color: #000;
    }
    .print-styles-ST h1 {
      text-align: center;
      margin-bottom: 5px;
      font-size: 24px;
      color: #2d4ecf;
    }
    .print-styles-ST h2 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 18px;
      color: #444;
    }
    .print-styles-ST table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    .print-styles-ST th, .print-styles-ST td {
      border: 1px solid #999;
      padding: 8px;
      text-align: center;
    }
    .print-styles-ST th {
      background-color: #f0f0f0;
      color: #000;
    }
  `);
  printWindow.document.write('</style></head><body class="print-styles-ST">');
  printWindow.document.write('<h1>Anshpath Technologies Pvt Ltd</h1>');
  printWindow.document.write('<h2>Services List</h2>');
  printWindow.document.write(tableClone.outerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};

  const handleExportExcel = () => {
    const dataToExport = sortedFilteredData.map((item, index) => ({
      'Sr. No': index + 1,
      'Service ID': item.id,
      'Service Name': item.name,
      'Category': item.category,
      'Price (₹)': item.price,
      'Discount (%)': item.discount,
      'Total Price (₹)': (item.total || 0).toFixed(2),
      'Duration': item.duration,
      'Status': item.status ? 'Active' : 'Inactive',
      'Created On': new Date(item.createdOn).toLocaleDateString()
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Services');
    XLSX.writeFile(workbook, 'ServicesList.xlsx');
  };

  return (
    <div className="container service-list-container-ST">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="title-ST">SERVICES LIST</h2>
      <div className="search-row-ST">
        <input
          type="text"
          className="form-control search-input-ST"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="table-responsive">
        <table className="table service-table-ST" ref={tableRef}>
          <thead>
            <tr>
              <th onClick={() => handleSort('srNo')} className="sortable-th-ST">Sr. No</th>
              {['id', 'name', 'category', 'price', 'discount', 'total', 'duration', 'status', 'createdOn'].map((key) => (
                <th key={key} onClick={() => handleSort(key)} className="sortable-th-ST">
                  {{
                    id: 'Service ID', name: 'Service Name', category: 'Category',
                    price: 'Price (₹)', discount: 'Discount (%)',
                    total: 'Total Price (₹)', duration: 'Duration',
                    status: 'Status', createdOn: 'Created On'
                  }[key]}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((service, index) => (
              <tr key={service.id}>
                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>₹{service.price}</td>
                <td>{service.discount}%</td>
                <td>₹{(service.total || 0).toFixed(2)}</td>
                <td>{service.duration}</td>
                <td>
                  <button
                    className={`btn btn-sm ${service.status ? 'btn-success' : 'btn-secondary'}`}
                    onClick={() => handleToggleStatus(service.id)}
                  >
                    {service.status ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td>{new Date(service.createdOn).toLocaleDateString()}</td>
                <td>
                  <button className="edit-icon-btn-ST" onClick={() => handleEdit(service)}><FaEdit /></button>
                  <button className="delete-icon-btn-ST" onClick={() => handleDelete(service)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Row */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="page-size-wrapper-ST">
          <select
            className="form-select page-size-selector-ST"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>{size} page</option>
            ))}
          </select>
        </div>
        <div className="export-buttons-ST">
          <button className="export-btn-ST print-btn-ST" onClick={handlePrint}><FaPrint /> Print</button>
          <button className="export-btn-ST excel-btn-ST" onClick={handleExportExcel}><FaFileExcel /> Excel</button>
        </div>
      </div>

      {/* ✅ Pagination UI */}
      <div className="pagination-container-ST mt-3 d-flex justify-content-center gap-2 flex-wrap">
        <button
          className="page-link"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >&laquo;</button>
        <button
          className="page-link"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >&lsaquo;</button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            className={`page-link ${page === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="page-link"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >&rsaquo;</button>
        <button
          className="page-link"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >&raquo;</button>
      </div>
      

      {/* Edit Modal */}
      {editingId && editedService && (
        <div className="edit-popup-overlay-ST">
          <div className="edit-popup-ST">
            <h3>Edit Service {editedService.id}</h3>
            <div className="edit-scroll-ST">
              <div className="field-row-ST">
                <div className="field-group-ST">
                  <label><FaTag /> Service Name</label>
                  <input value={editedService.name} onChange={(e) => setEditedService({ ...editedService, name: e.target.value })} />
                </div>
                <div className="field-group-ST">
                  <label><FaCalendar /> Category</label>
                  <select value={editedService.category} onChange={(e) => setEditedService({ ...editedService, category: e.target.value })}>
                    <option>Car</option>
                    <option>Bike</option>
                    <option>Truck</option>
                    <option>Electric Vehicle</option>
                  </select>
                </div>
              </div>
              <div className="field-row-ST">
                <div className="field-group-ST">
                  <label><FaMoneyBill /> Price</label>
                  <input type="number" value={editedService.price} onChange={(e) => {
                    const price = Number(e.target.value);
                    setEditedService(prev => ({
                      ...prev,
                      price,
                      total: price - (price * prev.discount / 100)
                    }));
                  }} />
                </div>
                <div className="field-group-ST">
                  <label><FaPercent /> Discount (%)</label>
                  <input type="number" value={editedService.discount} onChange={(e) => {
                    const discount = Number(e.target.value);
                    setEditedService(prev => ({
                      ...prev,
                      discount,
                      total: prev.price - (prev.price * discount / 100)
                    }));
                  }} />
                </div>
              </div>
              <div className="field-row-ST">
                <div className="field-group-ST">
                  <label><FaMoneyBill /> Total Price (₹)</label>
                  <input value={(editedService.total || 0).toFixed(2)} readOnly />
                </div>
                <div className="field-group-ST">
                  <label><FaStopwatch /> Duration</label>
                  <input value={editedService.duration} onChange={(e) => setEditedService({ ...editedService, duration: e.target.value })} />
                </div>
              </div>
              <div className="field-row-ST">
                <div className="field-group-ST">
                  <label><FaCalendar /> Created On</label>
                  <input
                    type="date"
                    value={editedService.createdOn}
                    onChange={(e) =>
                      setEditedService({ ...editedService, createdOn: e.target.value })
                    }
                  />
                </div>
                <div className="field-group-ST">
                  <label><FaTag /> Status</label>
                  <select
                    value={editedService.status ? 'Active' : 'Inactive'}
                    onChange={(e) =>
                      setEditedService({
                        ...editedService,
                        status: e.target.value === 'Active',
                      })
                    }
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

            </div>
            <div className="popup-actions-ST">
              <button className="edit-ST" onClick={handleEditSave}>Save</button>
              <button className="delete-ST" onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="delete-popup-overlay-ST">
          <div className="delete-popup-ST">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this service?</p>
            <div className="popup-actions-ST">
              <button className="delete-ST" onClick={handleDeleteConfirm}>Delete</button>
              <button className="edit-ST" onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
