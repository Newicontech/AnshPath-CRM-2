
import React, { useState } from 'react';
import './ActiveJobCardsAJC.css';
import {
  FaUser,
  FaCar,
  FaUserTie,
  FaMobileAlt ,
  FaTachometerAlt,
  FaCheckCircle,
  FaCalendarAlt,
  FaMoneyBill,
  FaStickyNote,
  FaCog,
  FaTools,
  FaTrash,
  FaWrench,
  FaEye,
  FaEdit,
  FaTimes,
  FaInfo,
  FaCommentDots,
  FaCalendarCheck,
  FaRupeeSign ,
  FaClipboardList ,
} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const statusBadgeClass = {
  'Working': 'status-working-AJC',
  'Under Inspection': 'status-inspection-AJC',
  'Waiting for Parts': 'status-parts-AJC',
  'Completed': 'status-completed-AJC',
  'Cancelled': 'status-cancelled-AJC'
};
const statuses = Object.keys(statusBadgeClass);
const availableSupervisors = ['Ravi Kumar', 'Meena Joshi', 'Amit Patel'];

const generateDummyJobs = () =>
  Array.from({ length: 20 }, (_, i) => {
    const servicesAmount = 2000 + i * 50;
    const partsCost = 1000 + i * 40;
    return {
      id: i + 1,
      jobCardNo: `JC-00${i + 1}`,
      vehicleNumber: `MH12XY${1000 + i}`,
      vehicleDetails: {
        type: ['Car', 'Bike', 'Truck'][i % 3],
        brand: ['Toyota', 'Hyundai', 'Honda'][i % 3],
        model: ['Innova', 'Creta', 'City'][i % 3]
      },
      customerName: ['Asha Sharma', 'Vikram Singh', 'Priya Desai'][i % 3],
      mobileNumber: `98765432${(10 + i).toString().padStart(2, '0')}`,
      supervisor: ['Ravi Kumar', 'Meena Joshi', 'Amit Patel'][i % 3],
      startDateTime: new Date(Date.now() - i * 3600000).toISOString(),
      status: statuses[i % statuses.length],
      kmReading: `${12000 + i * 10}`,
      totalServicesAmount: `${servicesAmount}`,
      totalPartsCost: `${partsCost}`,
      total: `${servicesAmount + partsCost}`,
      services: [
        { id: 1, sr: 1, serviceName: 'Oil Change', price: 500 },
        { id: 2, sr: 2, serviceName: 'Brake Check', price: 700 }
      ],
      parts: [
        {
          id: 1,
          sr: 1,
          partDetails: 'Brake Pad',
          meg: 'Set',
          qty: 1,
          mrp: 800,
          rate: 750,
          disc: 5,
          gst: 18,
          hsn: '8708',
          goDown: 'A1'
        }
      ],
      remarks: '',
      finalSummary: '',
      paymentStatus: '',
      completionDate: '',
      cancelReason: ''
    };
  });

export default function ActiveJobCards() {
  const [jobs, setJobs] = useState(generateDummyJobs());
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [mode, setMode] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredJobs = jobs.filter(job => {
    const keyword = search.toLowerCase();
    return (
      job.jobCardNo.toLowerCase().includes(keyword) ||
      job.vehicleNumber.toLowerCase().includes(keyword) ||
      job.customerName.toLowerCase().includes(keyword) ||
      job.status.toLowerCase().includes(keyword)
    );
  });

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const updateJob = (id, updates) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, ...updates } : j));
    setSelectedJob(null);
    setMode(null);
  };

  const handleCancelSubmit = () => {
    if (cancelReason.trim()) {
      updateJob(selectedJob.id, { status: 'Cancelled', cancelReason });
      setCancelReason('');
      toast.info("Job card cancelled.");
      } else {
        toast.warn("Please provide a cancellation reason.");
  
    }
  };

  const handleEditSubmit = () => {
    updateJob(selectedJob.id, selectedJob);
    toast.success("Job card updated successfully!");
  };

const calculateServiceTotal = (services) =>
  services.reduce((acc, s) => acc + (parseFloat(s.price) || 0), 0);

const calculatePartsTotal = (parts) =>
  parts.reduce((acc, p) => {
    const rate = parseFloat(p.rate) || 0;
    const qty = parseFloat(p.qty) || 0;
    const disc = parseFloat(p.disc) || 0;
    const gst = parseFloat(p.gst) || 0;
    const discounted = rate * qty * (1 - disc / 100);
    const withGst = discounted * (1 + gst / 100);
    return acc + withGst;
  }, 0);

const handleAddPart = () => {
  const newParts = [...selectedJob.parts, {
    id: Date.now(),
    sr: selectedJob.parts.length + 1,
    partDetails: '',
    meg: '',
    qty: 1,
    mrp: 0,
    rate: 0,
    disc: 0,
    gst: 18,
    hsn: '',
    goDown: ''
  }];
  setSelectedJob({ ...selectedJob, parts: newParts });
};

const handleDeletePart = (index) => {
  const newParts = [...selectedJob.parts];
  newParts.splice(index, 1);
  setSelectedJob({ ...selectedJob, parts: newParts });
};

const renderEditMode = () => {
  const serviceTotal = calculateServiceTotal(selectedJob.services);
  const partTotal = calculatePartsTotal(selectedJob.parts);
  const totalAmount = serviceTotal + partTotal;

  const handleAddService = () => {
    const newServices = [...selectedJob.services, {
      id: Date.now(),
      sr: selectedJob.services.length + 1,
      serviceName: '',
      price: 0
    }];
    setSelectedJob({ ...selectedJob, services: newServices });
  };

  const handleDeleteService = (index) => {
    const newServices = [...selectedJob.services];
    newServices.splice(index, 1);
    setSelectedJob({ ...selectedJob, services: newServices });
  };

// === React Component ===
return (
  <div className="popup-overlay-AJC">
    <div className="popup-card-AJC wide">
      <div className="popup-header-AJC">
        <h3>Edit Job Card - {selectedJob.jobCardNo}</h3>
        <button onClick={() => setSelectedJob(null)}>×</button>
      </div>

      <div className="popup-body-AJC">
        {/* === Customer + Vehicle === */}
        <div className="ajc-field-row-dual">
          <div>
            <label className="label-ajc-field"><FaUser /> Customer Name</label>
            <input value={selectedJob.customerName} onChange={e => setSelectedJob({ ...selectedJob, customerName: e.target.value })} />
          </div>
          <div>
            <label className="label-ajc-field"><FaCar /> Vehicle Number</label>
            <input value={selectedJob.vehicleNumber} onChange={e => setSelectedJob({ ...selectedJob, vehicleNumber: e.target.value })} />
          </div>
        </div>

        {/* === Supervisor + Mobile === */}
        <div className="ajc-field-row-dual">
          <div>
            <label className="label-ajc-field"><FaUserTie /> Supervisor</label>
            <input value={selectedJob.supervisor} onChange={e => setSelectedJob({ ...selectedJob, supervisor: e.target.value })} />
          </div>
          <div>
            <label className="label-ajc-field"><FaMobileAlt /> Mobile Number</label>
            <input value={selectedJob.mobileNumber || ''} onChange={e => setSelectedJob({ ...selectedJob, mobileNumber: e.target.value })} />
          </div>
        </div>

        {/* === Status + KM === */}
        <div className="ajc-field-row-dual">
          <div>
            <label className="label-ajc-field"><FaInfo /> Status</label>
            <select value={selectedJob.status} onChange={e => setSelectedJob({ ...selectedJob, status: e.target.value })}>
              {statuses.map(status => <option key={status}>{status}</option>)}
            </select>
          </div>
          <div>
            <label className="label-ajc-field"><FaTachometerAlt /> KM Reading</label>
            <input type="number" value={selectedJob.kmReading} onChange={e => setSelectedJob({ ...selectedJob, kmReading: e.target.value })} />
          </div>
        </div>

        {/* === Final Summary + Payment + Date (only if status === Completed) === */}
        {selectedJob.status === 'Completed' && (
          <>
            <div className="ajc-field-row-dual">
              <div>
                <label className="label-ajc-field"><FaCalendarCheck /> Completion Date</label>
                <input type="date" value={selectedJob.completionDate?.split('T')[0] || ''} onChange={e => setSelectedJob({ ...selectedJob, completionDate: e.target.value })} />
              </div>
              <div>
                <label className="label-ajc-field"><FaRupeeSign /> Payment Status</label>
                <select value={selectedJob.paymentStatus || ''} onChange={e => setSelectedJob({ ...selectedJob, paymentStatus: e.target.value })}>
                  <option value="">Select</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
            </div>
            <div className="ajc-field-row-single">
              <div>
                <label className="label-ajc-field"><FaClipboardList /> Final Service Summary</label>
                <textarea rows={2} value={selectedJob.finalSummary || ''} onChange={e => setSelectedJob({ ...selectedJob, finalSummary: e.target.value })} />
              </div>
            </div>
          </>
        )}

        {/* === Services Table === */}
        <label className="label-ajc-field"><FaCog /> Services <button className="add-part-btn-AJC" onClick={handleAddService}>+ Add Service</button></label>
        <div className="table-responsive-AJC">
          <table className="editable-table-AJC">
            <thead>
              <tr><th>Sr</th><th>Service Name</th><th>Price</th><th>Delete</th></tr>
            </thead>
            <tbody>
              {selectedJob.services.map((s, idx) => (
                <tr key={s.id}>
                  <td>{s.sr}</td>
                  <td><input value={s.serviceName} onChange={e => {
                    const newServices = [...selectedJob.services];
                    newServices[idx].serviceName = e.target.value;
                    setSelectedJob({ ...selectedJob, services: newServices });
                  }} /></td>
                  <td><input type="number" value={s.price} onChange={e => {
                    const newServices = [...selectedJob.services];
                    newServices[idx].price = e.target.value;
                    setSelectedJob({ ...selectedJob, services: newServices });
                  }} /></td>
                  <td><button className="delete-btn-red-AJC" onClick={() => handleDeleteService(idx)}><FaTrash /></button></td>
                </tr>
              ))}
              <tr className="table-footer">
                <td colSpan={2}><strong>Total</strong></td>
                <td><strong>{serviceTotal.toFixed(2)}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* === Parts Table === */}
        <label className="label-ajc-field"><FaTools /> Parts <button className="add-part-btn-AJC" onClick={handleAddPart}>+ Add Part</button></label>
        <div className="table-responsive-AJC">
          <table className="editable-table-AJC">
            <thead>
              <tr><th>Sr</th><th>Part</th><th>Qty</th><th>MRP</th><th>Rate</th><th>Disc%</th><th>GST%</th><th>Delete</th></tr>
            </thead>
            <tbody>
              {selectedJob.parts.map((p, idx) => (
                <tr key={p.id}>
                  <td>{p.sr}</td>
                  <td><input value={p.partDetails} onChange={e => {
                    const newParts = [...selectedJob.parts];
                    newParts[idx].partDetails = e.target.value;
                    setSelectedJob({ ...selectedJob, parts: newParts });
                  }} /></td>
                  <td><input type="number" value={p.qty} onChange={e => {
                    const newParts = [...selectedJob.parts];
                    newParts[idx].qty = e.target.value;
                    setSelectedJob({ ...selectedJob, parts: newParts });
                  }} /></td>
                  <td><input type="number" value={p.mrp} onChange={e => {
                    const newParts = [...selectedJob.parts];
                    newParts[idx].mrp = e.target.value;
                    setSelectedJob({ ...selectedJob, parts: newParts });
                  }} /></td>
                  <td><input type="number" value={p.rate} onChange={e => {
                    const newParts = [...selectedJob.parts];
                    newParts[idx].rate = e.target.value;
                    setSelectedJob({ ...selectedJob, parts: newParts });
                  }} /></td>
                  <td><input type="number" value={p.disc} onChange={e => {
                    const newParts = [...selectedJob.parts];
                    newParts[idx].disc = e.target.value;
                    setSelectedJob({ ...selectedJob, parts: newParts });
                  }} /></td>
                  <td><input type="number" value={p.gst} onChange={e => {
                    const newParts = [...selectedJob.parts];
                    newParts[idx].gst = e.target.value;
                    setSelectedJob({ ...selectedJob, parts: newParts });
                  }} /></td>
                  <td><button className="delete-btn-red-AJC" onClick={() => handleDeletePart(idx)}><FaTrash /></button></td>
                </tr>
              ))}
              <tr className="table-footer">
                <td colSpan={6}><strong>Total</strong></td>
                <td><strong>{partTotal.toFixed(2)}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* === Grand Total + Remarks === */}
        <div className="edit-job-card-AJC__totals-remarks-row">
          <div>
            <label className="label-ajc-field"><FaWrench /> Grand Total</label>
            <input value={totalAmount.toFixed(2)} readOnly />
          </div>
          <div>
            <label className="label-ajc-field"><FaCommentDots /> Remarks</label>
            <textarea rows={2} value={selectedJob.remarks} onChange={e => setSelectedJob({ ...selectedJob, remarks: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="popup-footer-AJC">
        <button className="save-btn" onClick={handleEditSubmit}>Save</button>
        <button className="cancel-btn" onClick={() => setSelectedJob(null)}>Cancel</button>
      </div>
    </div>
  </div>
);
}
const renderViewMode = () => (
  <div className="view-job-card-AJC__overlay">
    <div className="view-job-card-AJC__card">
      <div className="view-job-card-AJC__header">
        <h3>View Job Card - {selectedJob.jobCardNo}</h3>
        <button onClick={() => setSelectedJob(null)}>×</button>
      </div>
      <div className="view-job-card-AJC__body">
        <div className="view-job-card-AJC__grid">
          <div><strong>Job No:</strong> {selectedJob.jobCardNo}</div>
          <div><strong>Status:</strong> {selectedJob.status}</div>
          <div><strong>Customer:</strong> {selectedJob.customerName}</div>
          <div><strong>Mobile No.:</strong> {selectedJob.mobileNumber}</div>
          <div><strong>Supervisor:</strong> {selectedJob.supervisor}</div>
          <div><strong>Vehicle:</strong> {`${selectedJob.vehicleDetails.type} ${selectedJob.vehicleDetails.brand} ${selectedJob.vehicleDetails.model}`}</div>
          <div><strong>Vehicle No:</strong> {selectedJob.vehicleNumber}</div>
          <div><strong>KM Reading:</strong> {selectedJob.kmReading}</div>
          <div><strong>Start Date:</strong> {new Date(selectedJob.startDateTime).toLocaleString()}</div>
          <div><strong>Remarks:</strong> {selectedJob.remarks || '-'}</div>
        </div>

        {/* === Services Table (View Mode) === */}
        <div className="view-job-card-AJC__section">
          <strong>Services</strong>
          <div className="table-responsive-AJC">
            <table className="editable-table-AJC">
              <thead>
                <tr><th>Sr</th><th>Service Name</th><th>Price</th></tr>
              </thead>
              <tbody>
                {selectedJob.services.map((s, idx) => (
                  <tr key={s.id}>
                    <td>{s.sr}</td>
                    <td>{s.serviceName}</td>
                    <td>₹{parseFloat(s.price).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="table-footer">
                  <td colSpan={2}><strong>Total</strong></td>
                  <td><strong>₹{calculateServiceTotal(selectedJob.services).toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* === Parts Table (View Mode) === */}
        <div className="view-job-card-AJC__section">
          <strong>Parts</strong>
          <div className="table-responsive-AJC">
            <table className="editable-table-AJC">
              <thead>
                <tr>
                  <th>Sr</th><th>Part</th><th>Qty</th><th>MRP</th><th>Rate</th><th>Disc%</th><th>GST%</th>
                </tr>
              </thead>
              <tbody>
                {selectedJob.parts.map((p, idx) => (
                  <tr key={p.id}>
                    <td>{p.sr}</td>
                    <td>{p.partDetails}</td>
                    <td>{p.qty}</td>
                    <td>₹{p.mrp}</td>
                    <td>₹{p.rate}</td>
                    <td>{p.disc}%</td>
                    <td>{p.gst}%</td>
                  </tr>
                ))}
                <tr className="table-footer">
                  <td colSpan={6}><strong>Total</strong></td>
                  <td><strong>₹{calculatePartsTotal(selectedJob.parts).toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {(selectedJob.status === 'Completed' || selectedJob.status === 'Cancelled') && (
          <div className="view-job-card-AJC__grid">
            {selectedJob.status === 'Completed' && selectedJob.finalSummary && (
              <div><strong>Final Summary:</strong> {selectedJob.finalSummary}</div>
            )}
            {selectedJob.status === 'Completed' && selectedJob.paymentStatus && (
              <div><strong>Payment Status:</strong> {selectedJob.paymentStatus}</div>
            )}
            {selectedJob.status === 'Completed' && selectedJob.completionDate && (
              <div><strong>Completion Date:</strong> {new Date(selectedJob.completionDate).toLocaleDateString()}</div>
            )}
            {selectedJob.status === 'Cancelled' && selectedJob.cancelReason && (
              <div><strong>Cancellation Reason:</strong> {selectedJob.cancelReason}</div>
            )}
          </div>
        )}
        <div className="view-job-card-AJC__totals">
          <p><strong>Total Cost:</strong> ₹{(calculateServiceTotal(selectedJob.services) + calculatePartsTotal(selectedJob.parts)).toFixed(2)}</p>
        </div>


      </div>
    </div>
  </div>
);

  const renderCancelMode = () => (
    <div className="popup-overlay-AJC">
      <div className="popup-card-AJC">
        <div className="popup-header-AJC">
          <h3>Cancel Job Card - {selectedJob.jobCardNo}</h3>
          <button onClick={() => { setSelectedJob(null); setCancelReason(''); }}>×</button>
        </div>
        <div className="popup-body-AJC">
          <label>Reason for Cancellation</label>
          <input
            type="text"
            className="cancel-input-AJC"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Enter reason here..."
          />
          <button className="submit-btn-AJC center-btn-AJC" onClick={handleCancelSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );

 
  return (
    <div className="job-container-AJC">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="title-AJC">Active Job Cards</h2>
      <input
        className="search-input-AJC"
        type="text"
        placeholder="Search by Job No, Vehicle, Customer or Status..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="job-grid-AJC">
        {paginatedJobs.map(job => (
          <div className="job-card-AJC" key={job.id}>
            <div className="job-header-AJC">
              <div>{job.vehicleNumber}</div>
              <div className={`status-badge-AJC ${statusBadgeClass[job.status]}`}>{job.status}</div>
            </div>
            <div className="job-body-AJC">
              <p><strong>Vehicle:</strong> {job.vehicleDetails.type} {job.vehicleDetails.brand} {job.vehicleDetails.model}</p>
              <p><strong>Customer:</strong> {job.customerName}</p>
              <p><strong>Supervisor:</strong> {job.supervisor}</p>
              <p><strong>Start:</strong> {new Date(job.startDateTime).toLocaleString()}</p>
            </div>
           <div className="job-actions-AJC" onClick={(e) => e.stopPropagation()}>
              <span className="action-btn-AJC view" onClick={() => { setSelectedJob(job); setMode('view'); }} title="View">
                <FaEye />
              </span>
              <span className="action-btn-AJC edit" onClick={() => { setSelectedJob(job); setMode('edit'); }} title="Edit">
                <FaEdit />
              </span>
              <span className="action-btn-AJC cancel" onClick={() => { setSelectedJob(job); setMode('cancel'); }} title="Cancel">
                <FaTimes />
              </span>
            </div>  

          </div>
        ))}
      </div>
      <div className="pagination-AJC">
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>{i + 1}</button>
        ))}
      </div>
      {selectedJob && mode === 'view' && renderViewMode()}
      {selectedJob && mode === 'edit' && renderEditMode()}
      {selectedJob && mode === 'cancel' && renderCancelMode()}
    </div>
  );
}