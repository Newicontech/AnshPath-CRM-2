import React, { useState, useEffect } from 'react';
import './ScheduledServices.css';
import { FaSearch, FaPrint, FaFileCsv, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPlay, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



const ScheduledServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  

  const itemsPerPage = 4;

useEffect(() => {
  const dummyData = Array.from({ length: 15 }, (_, i) => ({
    id: `BK-${1000 + i}`,
    customerName: `Customer ${i + 1}`,
    email: `customer${i + 1}@mail.com`,
    vehicleNumber: 'MH-12-XY-0001',
    contact: `987654321${i}`,
    serviceName: 'Car Spa',
    vehicleDetails: 'Sedan - White',
    serviceDateTime: new Date().toLocaleString(),
    location: 'Mumbai, India',
    status: 'Scheduled',
    actionMessage: '',
    startTimestamp: null,
    completedTimestamp: null,
    cancelledTimestamp: null
  }));

  setServices(dummyData);
  setFilteredServices(dummyData);
}, []);






  const applyFilters = (term, start, end) => {
    let filtered = services.filter(service =>
      service.id.toLowerCase().includes(term.toLowerCase()) ||
      service.customerName.toLowerCase().includes(term.toLowerCase()) ||
      service.status.toLowerCase().includes(term.toLowerCase())
    );
    if (start && end) {
      const startObj = new Date(start);
      const endObj = new Date(end);
      filtered = filtered.filter(service => {
        const date = new Date(service.serviceDateTime);
        return date >= startObj && date <= endObj;
      });
    }
    setFilteredServices(filtered);
    setCurrentPage(1);
  };

  const handleSearch = e => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, startDate, endDate);
  };

const handleStart = (id) => {
  const now = new Date().toISOString();
  const updated = services.map(service =>
    service.id === id
      ? {
          ...service,
          status: 'In Progress',
          startTimestamp: now,
          completedTimestamp: null,
          cancelledTimestamp: null,
          actionMessage: 'Scheduled started',
        }
      : service
  );
  setServices(updated);
  setFilteredServices(updated);

  toast.success('Service marked as In Progress', {
    toastId: `start-${id}`,
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
  });
};




const handleComplete = (id) => {
  const now = new Date().toISOString();
  const updated = services.map(service =>
    service.id === id
      ? {
          ...service,
          status: 'Completed',
          completedTimestamp: now,
          actionMessage: 'Scheduled completed',
        }
      : service
  );
  setServices(updated);
  setFilteredServices(updated);

  toast.success('Service marked as Completed', {
    toastId: `complete-${id}`,
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
  });
};




const confirmCancel = () => {
  const now = new Date().toISOString();
  const updated = services.map(service =>
    service.id === selectedServiceId
      ? {
          ...service,
          status: 'Cancelled',
          cancelledTimestamp: now,
          actionMessage: 'Scheduled cancelled',
        }
      : service
  );
  setServices(updated);
  setFilteredServices(updated);

  toast.error('Service Cancelled', {
    toastId: `cancel-${selectedServiceId}`,
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
  });

  setCancelReason('');
  setShowCancelModal(false);
};



const handleCancel = (id) => {
  setSelectedServiceId(id);
  setShowCancelModal(true); 
};





  const handleExportCSV = () => {
    if (!filteredServices.length) return;
    const csvContent = filteredServices.map(s => (
      `"${s.id}","${s.customerName}","${s.contact}","${s.serviceName}","${s.vehicleDetails}","${s.serviceDateTime}","${s.location}","${s.status}"`
    ));
    const csv = ['"Booking ID","Customer","Contact","Service","Vehicle","DateTime","Location","Status"', ...csvContent].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'scheduled_services.csv';
    link.click();
  };


const handleExportPDF = async () => {
  const input = document.getElementById('pdf-table-section');
  if (!input) return;

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

  cloned.querySelectorAll('th:last-child, td:last-child').forEach(el => el.remove());

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
  const headerHeight = 170;
  const tableHeight = canvas.height;
  const pdfHeight = headerHeight + tableHeight + 60;

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [pdfWidth, pdfHeight]
  });

  pdf.setFillColor(bgColor);
  pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

  const todayDate = new Date().toLocaleDateString('en-GB');

  const scaleFactor = pdfWidth / 2500;
  const orgFontSize = Math.min(70, 65 * scaleFactor);
  const smallFontSize = Math.min( 35,30 * scaleFactor);
  const reportFontSize = Math.min(55, 49 * scaleFactor);
  const dateFontSize = 50;

  const centerX = pdfWidth / 2;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(orgFontSize);
  pdf.setTextColor(primaryColor);
  pdf.text('AnshPath', centerX, 50, { align: 'center' });

  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(smallFontSize);
  pdf.setTextColor(textColor);
  pdf.text('Technologies Private Limited', centerX, 85, { align: 'center' });

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(reportFontSize);
  pdf.setTextColor(textColor);
  pdf.text('Scheduled Services Report', pdfWidth / 2, 135, { align: 'center' });

  pdf.addImage(imgData, 'PNG', 0, headerHeight, canvas.width, canvas.height);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(dateFontSize);
  pdf.setTextColor('#000000');
  const dateText = `Date: ${todayDate}`;
  const dateWidth = pdf.getTextWidth(dateText);
  pdf.text(dateText, pdfWidth - dateWidth - 40, pdfHeight - 20);

  pdf.save('scheduled_services_report.pdf');
};


  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'primary';
      case 'In Progress': return 'warning';
      case 'Completed': return 'success';
      case 'Cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const paginatedData = filteredServices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  return (
    <div className="container-fluid scheduled-container-SST">
      <ToastContainer />
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body-SST">
          <div className="d-flex justify-content-center align-items-center text-center mb-4 title-heading-SST">
            <h4 className="mt-3 mb-3" style={{ fontSize: '40px' }}>Scheduled Services</h4>
          </div>

          {/* Filters */}
          <div className="d-flex flex-column flex-md-row gap-4 mb-4">
            <div className="d-flex flex-column flex-grow-1">
              <label className="custom-label-SST">Search</label>
              <div className="input-group custom-input-group-SST">
                <span className="input-group-text custom-icon-SST"><FaSearch /></span>
                <input
                  type="text"
                  className="form-control custom-input-SST"
                  placeholder="Search by Booking ID or Status"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="d-flex flex-column">
              <label className="custom-label-SST">Start Date</label>
              <input type="date" className="form-control custom-input-SST" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="d-flex flex-column">
              <label className="custom-label-SST">End Date</label>
              <input type="date" className="form-control custom-input-SST" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            <button className="btn btn-primary filter-button-SST align-self-center" onClick={() => applyFilters(searchTerm, startDate, endDate)}>Filter</button>
          </div>

          {/* Table */}
          <div id="pdf-table-section" className="table-responsive custom-scroll">
            <table className="table table-bordered align-middle scheduled-table-SST">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Vehicle No</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Vehicle</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th className="action-column">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr><td colSpan="8" className="text-center">No scheduled bookings found.</td></tr>
                ) : (
                  paginatedData.map(service => (
                    <tr key={service.id}>
                      <td>{service.id}</td>
                      <td>{service.vehicleNumber || 'MH-12-XY-0001'}</td>
                      <td className="customer-cell-SST">
                      <strong className="customer-name-SST">{service.customerName}</strong>
                      <div className="customer-contact-wrapper mt-1">
                        <div className="email-line-SST">
                          <FaEnvelope className="icon-SST me-2 text-primary" />
                          <span className="text-SST">{service.email}</span>
                        </div>
                        <div className="phone-line-SST">
                          <FaPhoneAlt className="icon-SST me-2 text-success" />
                          <span className="text-SST">{service.contact || '0000000000'}</span>
                        </div>
                      </div>
                    </td>
                      <td>{service.serviceName}</td>
                      <td>{service.vehicleDetails}</td>
                      <td>{service.serviceDateTime}</td>
                      <td><FaMapMarkerAlt className="me-2 text-danger" />{service.location}</td>
                      <td>
                          <div className="d-flex flex-column align-items-center">
                            <span className={`badge bg-${getStatusColor(service.status)} fs-6 mb-1`}>
                              {service.status}
                            </span>

                            {service.status === 'In Progress' && service.startTimestamp && (
                              <div className="text-muted small">Scheduled Started at: {new Date(service.startTimestamp).toLocaleString()}</div>
                            )}
                            {service.status === 'Completed' && service.completedTimestamp && (
                              <div className="text-muted small">Scheduled Completed at: {new Date(service.completedTimestamp).toLocaleString()}</div>
                            )}
                            {service.status === 'Cancelled' && service.cancelledTimestamp && (
                              <div className="text-muted small">Scheduled Cancelled at: {new Date(service.cancelledTimestamp).toLocaleString()}</div>
                            )}
                          </div>
                        </td>

                    <td className="action-column">
                      <div className="d-flex gap-2 flex-column justify-content-center align-items-center">

                        {/* Show status message if actionMessage is set */}
                        {service.actionMessage && (
                          <div className={`alert alert-${getStatusColor(service.status)} py-1 px-3 text-center fw-semibold mb-1`}>
                            {service.actionMessage}
                          </div>
                        )}

                        {/* Scheduled: Show Start button only */}
                        {service.status === 'Scheduled' && !service.actionMessage && (
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleStart(service.id)}>
                            <FaPlay className="me-1" /> Start
                          </button>
                        )}

                        {/* In Progress: Show Complete + Cancel */}
                        {service.status === 'In Progress' && (
                          <>
                            <button className="btn btn-sm btn-outline-success" onClick={() => handleComplete(service.id)}>
                              <FaCheckCircle className="me-1" /> Complete
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleCancel(service.id)}>
                              <FaTimesCircle className="me-1" /> Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination + Export */}
          <div className="table-bottom-controls-SST">
                      <div className="custom-pagination-wrapper">
                        <button
                          className="custom-pagination-btn-SST"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          ◀ Prev
                        </button>
          
                        <button className="custom-pagination-btn-SST active-SST">
                          {currentPage}
                        </button>
          
                        {totalPages > 1 && (
                          <button
                            className={`custom-pagination-btn-SST ${currentPage === totalPages ? 'active' : ''}`}
                            onClick={() => setCurrentPage(totalPages)}
                          >
                            {totalPages}
                          </button>
                        )}
          
                        <button
                          className="btn-outline-primary custom-pagination-btn-SST"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Next ▶
                        </button>
                      </div>
                      <div className="export-button-group-SST">
                        <div className="export-button-box-SST">
                          <button className="custom-export-btn-SST pdf-btn-SST" onClick={handleExportPDF}>
                            <FaPrint className="me-2" />
                            PDF
                          </button>
                          <button className="custom-export-btn-SST csv-btn-SST" onClick={handleExportCSV}>
                            <FaFileCsv className="me-2" />
                            EXCEL
                          </button>
                        </div>
                      </div>
                    </div>

          {/* Cancel Modal */}
          {showCancelModal && (
  <>
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cancel Booking</h5>
            <button type="button" className="btn-close" onClick={() => setShowCancelModal(false)}></button>
          </div>
          <div className="modal-body">
            <label>Optional Reason:</label>
            <textarea
              className="form-control"
              rows="3"
              value={cancelReason}
              onChange={e => setCancelReason(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={confirmCancel}>
              Confirm Cancel
            </button>
            <button className="btn btn-secondary" onClick={() => setShowCancelModal(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop fade show"></div>
  </>
)}

        </div>
      </div>
    </div>
  );
};

export default ScheduledServices;
