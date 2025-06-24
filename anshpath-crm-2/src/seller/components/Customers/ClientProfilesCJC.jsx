import React, { useState } from 'react';
import './ClientProfilesCJC.css';
import {
  FaEye, FaEdit, FaTimes, FaCheckCircle, FaTrash, FaPlus,
  FaCog, FaTools, FaClipboardList, FaCommentDots,
  FaCarSide, FaPalette, FaCalendarAlt, FaTachometerAlt,
  FaGasPump, FaCogs, FaIdCard, FaChalkboardTeacher, FaUserTie,
  FaRupeeSign, FaPhone, FaEnvelope, FaMapMarkerAlt, FaShieldAlt
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const statusBadgeClass = {
  'Active': 'status-working-AJC',
  'Inactive': 'status-cancelled-AJC'
};

const generateDummyJobs = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    jobCardNo: `JC-00${i + 1}`,
    vehicleType: ['Car', 'Bike', 'Truck'][i % 3],
    vehicleNo: `MH12XY${1000 + i}`,
    brand: ['Toyota', 'Hyundai', 'Honda'][i % 3],
    model: ['Innova', 'Creta', 'City'][i % 3],
    color: ['White', 'Red', 'Black'][i % 3],
    engineNo: `ENG${100000 + i}`,
    vehicleYear: `20${15 + i % 5}`,
    km: `${12000 + i * 10}`,
    fuel: ['Petrol', 'Diesel', 'CNG'][i % 3],
    transmissionMode: ['Manual', 'Automatic'][i % 2],
    gstin: `29ABCDE1234F${i % 10}Z`,
    vinChassisNo: `VIN${123456 + i}`,
    customerName: ['Asha Sharma', 'Vikram Singh', 'Priya Desai'][i % 3],
    whatsappNo: `98765432${(10 + i).toString().padStart(2, '0')}`,
    email: `user${i}@mail.com`,
    address: `Street ${i + 1}, Area X`,
    insuranceCompany: ['ICICI', 'HDFC', 'SBI'][i % 3],
    insuranceExpiryDate: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
    advanceAmount: '0.00',
    totalServicesAmount: '0.00',
    totalPartsPrice: '0.00',
    totalAmount: '0.00',
    superAdvisor: ['Ravi Kumar', 'Meena Joshi', 'Amit Patel'][i % 3],
    madeBy: ['Admin', 'Operator'][i % 2],
    remark: '',
    services: [
      { id: 1, sr: 1, serviceName: 'Oil Change', price: '500' },
      { id: 2, sr: 2, serviceName: 'Brake Check', price: '700' }
    ],
    parts: [
      {
        id: 1, sr: 1, partDetails: 'Brake Pad', meg: 'Set', qty: '1',
        mrp: '800', rate: '750', disc: '5', gst: '18', hsn: '8708', goDown: 'A1'
      }
    ],
    startDateTime: new Date(Date.now() - i * 3600000).toISOString(),
    createdDate: new Date(Date.now() - i * 7200000).toISOString().split('T')[0], // <-- Added here
    status: i % 2 === 0 ? 'Active' : 'Inactive',
    remarks: '',
    finalSummary: '',
    paymentStatus: '',
    completionDate: '',
    cancelReason: ''
  }));

export default function ClientProfilesCJC() {
  const [clients, setClients] = useState(generateDummyJobs());
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [mode, setMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
const [toDate, setToDate] = useState('');


  const itemsPerPage = 8;

  const serviceTotal = services => services.reduce((a, s) => a + parseFloat(s.price || 0), 0);
  const partsTotal = parts => parts.reduce((acc, p) => {
    const rate = parseFloat(p.rate) || 0;
    const qty = parseFloat(p.qty) || 0;
    const disc = parseFloat(p.disc) || 0;
    const gst = parseFloat(p.gst) || 0;
    const discounted = rate * qty * (1 - disc / 100);
    return acc + discounted * (1 + gst / 100);
  }, 0);

  const filtered = clients.filter(c => {
    const q = search.toLowerCase();
    const matchesSearch =
      c.vehicleNo.toLowerCase().includes(q) ||
      c.customerName.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q);

    const jobDate = new Date(c.startDateTime).toISOString().split('T')[0];
    const matchesFrom = fromDate ? jobDate >= fromDate : true;
    const matchesTo = toDate ? jobDate <= toDate : true;

    return matchesSearch && matchesFrom && matchesTo;
  });   

  const pages = Math.ceil(filtered.length / itemsPerPage);
  const pageClients = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const updateClient = (id, data) => {
    setClients(cs => cs.map(c => c.id === id ? { ...c, ...data } : c));
    setSelectedClient(null);
    setMode(null);
  };

  const deleteClient = id => {
    setClients(cs => cs.filter(c => c.id !== id));
    toast.error('Client deleted');
    setSelectedClient(null);
  };

  const toggleStatus = id => {
    const c = clients.find(x => x.id === id);
    updateClient(id, { status: c.status === 'Active' ? 'Inactive' : 'Active' });
  };

  const handleEditSubmit = () => {
    const sc = selectedClient;
    const svcTotal = serviceTotal(sc.services);
    const prtTotal = partsTotal(sc.parts);
    const total = svcTotal + prtTotal;

    const updatedClient = {
      ...sc,
      totalServicesAmount: svcTotal.toFixed(2),
      totalPartsPrice: prtTotal.toFixed(2),
      totalAmount: total.toFixed(2),
    };

    updateClient(sc.id, updatedClient);
    toast.success('Client updated successfully!');
  };

  const renderPopup = () => {
    if (!selectedClient) return null;
    const isEdit = mode === 'edit';
    const sc = selectedClient;
    const svcTotal = serviceTotal(sc.services);
    const prtTotal = partsTotal(sc.parts);
    const grandTotal = svcTotal + prtTotal;
    const payable = grandTotal - parseFloat(sc.advanceAmount || 0);

  
  // Add Service
  const addService = () => {
    const updated = [...sc.services, { id: Date.now(), sr: sc.services.length + 1, serviceName: '', price: '0.00' }];
    setSelectedClient({ ...sc, services: updated });
  };

  // Add Part
  const addPart = () => {
    const updated = [...sc.parts, {
      id: Date.now(), sr: sc.parts.length + 1, partDetails: '', meg: '', qty: '1',
      mrp: '0', rate: '0', disc: '0', gst: '0', hsn: '', goDown: ''
    }];
    setSelectedClient({ ...sc, parts: updated });
  };
  const deleteService = (idx) => {
    const updated = sc.services.filter((_, i) => i !== idx).map((s, i) => ({ ...s, sr: i + 1 }));
    setSelectedClient({ ...sc, services: updated });
  };

  const deletePart = (idx) => {
    const updated = sc.parts.filter((_, i) => i !== idx).map((p, i) => ({ ...p, sr: i + 1 }));
    setSelectedClient({ ...sc, parts: updated });
  };

  return (
    <div className="popup-overlay-CJC">
      <div className="popup-card-CJC wide">
        <div className="popup-header-CJC">
          <h3><strong>{isEdit ? 'Edit' : 'View'} Client – {sc.vehicleNo}</strong></h3>
          <button onClick={() => setSelectedClient(null)}>×</button>
        </div>

        <div className="popup-body-CJC">
          {/* Vehicle Details */}
          <div className="ajc-field-row-dual">
            <div><label><FaCarSide /> Vehicle Type</label><input value={sc.vehicleType} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, vehicleType: e.target.value })} /></div>
            <div><label><FaIdCard /> Vehicle No</label><input value={sc.vehicleNo} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, vehicleNo: e.target.value })} /></div>
          </div>
          <div className="ajc-field-row-dual">
            <div><label><FaChalkboardTeacher /> Brand</label><input value={sc.brand} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, brand: e.target.value })} /></div>
            <div><label><FaCogs /> Model</label><input value={sc.model} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, model: e.target.value })} /></div>
          </div>
          <div className="ajc-field-row-dual">
            <div><label><FaPalette /> Color</label><input value={sc.color} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, color: e.target.value })} /></div>
            <div><label><FaIdCard /> Engine No</label><input value={sc.engineNo} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, engineNo: e.target.value })} /></div>
          </div>
          <div className="ajc-field-row-dual">
            <div><label><FaCalendarAlt /> Vehicle Year</label><input value={sc.vehicleYear} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, vehicleYear: e.target.value })} /></div>
            <div><label><FaTachometerAlt /> KM</label><input value={sc.km} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, km: e.target.value })} /></div>
          </div>
          <div className="ajc-field-row-dual">
            <div><label><FaGasPump /> Fuel</label><input value={sc.fuel} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, fuel: e.target.value })} /></div>
            <div><label><FaCogs /> Transmission Mode</label><input value={sc.transmissionMode} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, transmissionMode: e.target.value })} /></div>
          </div>
          <div className="ajc-field-row-dual">
            <div><label><FaIdCard /> GSTIN</label><input value={sc.gstin} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, gstin: e.target.value })} /></div>
            <div><label><FaIdCard /> VIN/Chassis No</label><input value={sc.vinChassisNo} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, vinChassisNo: e.target.value })} /></div>
          </div>

          {/* Client Info */}
          <div className="ajc-field-row-dual">
            <div><label><FaUserTie /> Customer Name</label><input value={sc.customerName} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, customerName: e.target.value })} /></div>
            <div><label><FaPhone /> WhatsApp No</label><input value={sc.whatsappNo} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, whatsappNo: e.target.value })} /></div>
          </div>
          <div className="ajc-field-row-dual">
            <div><label><FaEnvelope /> Email</label><input value={sc.email} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, email: e.target.value })} /></div>
            <div><label><FaMapMarkerAlt /> Address</label><input value={sc.address} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, address: e.target.value })} /></div>
          </div>

          {/* Insurance */}
          <div className="ajc-field-row-dual">
            <div><label><FaShieldAlt /> Insurance Company</label><input value={sc.insuranceCompany} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, insuranceCompany: e.target.value })} /></div>
            <div><label><FaCalendarAlt /> Insurance Expiry</label><input value={sc.insuranceExpiryDate} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, insuranceExpiryDate: e.target.value })} /></div>
          </div>

          {/* Metadata */}
          <div className="ajc-field-row-dual">
            <div><label><FaUserTie /> Super Advisor</label><input value={sc.superAdvisor} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, superAdvisor: e.target.value })} /></div>
            <div><label><FaUserTie /> Made By</label><input value={sc.madeBy} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, madeBy: e.target.value })} /></div>
          </div>

          {/* Finance */}
          <div className="ajc-field-row-dual">
            <div><label><FaRupeeSign /> Advance Amount</label><input value={sc.advanceAmount} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, advanceAmount: e.target.value })} /></div>
            <div><label><FaClipboardList /> Total Amount</label><input value={`₹${grandTotal.toFixed(2)}`} disabled /></div>
          </div>
          <div className="ajc-field-row-dual">
            <div>
                <label><FaRupeeSign /> Payable Amount</label>
                <input value={`₹${payable.toFixed(2)}`} disabled />
            </div>
            {!isEdit && (
                <div>
                <label><FaCalendarAlt /> Created Date</label>
                <input value={sc.createdDate} disabled />
                </div>
            )}
            </div>


          {/* Services */}
          <div className="label-action-bar-CJC">
            <label className="label-cjc-field"><FaCog /> Services</label>
            {isEdit && <button className="add-btn-CJC" onClick={addService}><FaPlus /> Add Service</button>}
          </div>
          <div className="table-responsive-CJC">
            <table className="editable-table-CJC">
              <thead><tr><th>Sr</th><th>Service Name</th><th>Price</th>{isEdit && <th>Action</th>}</tr></thead>
              <tbody>
                {sc.services.map((s, idx) => (
                  <tr key={s.id}>
                    <td>{s.sr}</td>
                    <td>{isEdit ? <input value={s.serviceName} onChange={e => {
                      const arr = [...sc.services];
                      arr[idx].serviceName = e.target.value;
                      setSelectedClient({ ...sc, services: arr });
                    }} /> : s.serviceName}</td>
                    <td>{isEdit ? <input type="number" value={s.price} onChange={e => {
                      const arr = [...sc.services];
                      arr[idx].price = e.target.value;
                      setSelectedClient({ ...sc, services: arr });
                    }} /> : `₹${parseFloat(s.price).toFixed(2)}`}</td>
                    {isEdit && <td><button className="delete-btn-CJC-small" onClick={() => deleteService(idx)}><FaTrash /></button></td>}
                  </tr>
                ))}
                <tr><td colSpan={2}><strong>Total</strong></td><td><strong>₹{svcTotal.toFixed(2)}</strong></td>{isEdit && <td></td>}</tr>
              </tbody>
            </table>
          </div>

          {/* Parts */}
          <div className="label-action-bar-CJC">
            <label className="label-cjc-field"><FaTools /> Parts</label>
            {isEdit && <button className="add-btn-CJC" onClick={addPart}><FaPlus /> Add Part</button>}
          </div>
          <div className="table-responsive-CJC">
            <table className="editable-table-CJC">
              <thead><tr><th>Sr</th><th>Part</th><th>Qty</th><th>Rate</th><th>Disc%</th><th>GST%</th><th>Total</th>{isEdit && <th>Action</th>}</tr></thead>
              <tbody>
                {sc.parts.map((p, idx) => {
                  const rowTotal = partsTotal([p]);
                  return (
                    <tr key={p.id}>
                      <td>{p.sr}</td>
                      <td>{isEdit ? <input value={p.partDetails} onChange={e => {
                        const arr = [...sc.parts];
                        arr[idx].partDetails = e.target.value;
                        setSelectedClient({ ...sc, parts: arr });
                      }} /> : p.partDetails}</td>
                      {['qty', 'rate', 'disc', 'gst'].map(field => (
                        <td key={field}>{isEdit ? <input type="number" value={p[field]} onChange={e => {
                          const arr = [...sc.parts];
                          arr[idx][field] = e.target.value;
                          setSelectedClient({ ...sc, parts: arr });
                        }} /> : p[field]}</td>
                      ))}
                      <td>₹{rowTotal.toFixed(2)}</td>
                      {isEdit && <td><button className="delete-btn-CJC-small" onClick={() => deletePart(idx)}><FaTrash /></button></td>}
                    </tr>
                  );
                })}
                <tr><td colSpan={6}><strong>Total</strong></td><td><strong>₹{prtTotal.toFixed(2)}</strong></td>{isEdit && <td></td>}</tr>
              </tbody>
            </table>
          </div>

          {/* Remarks */}
          <div className="ajc-field-row-dual">
            <div><label><FaClipboardList /> Grand Total</label><input value={`₹${grandTotal.toFixed(2)}`} disabled /></div>
            <div><label><FaCommentDots /> Remarks</label><textarea rows={2} value={sc.remark} disabled={!isEdit} onChange={e => setSelectedClient({ ...sc, remark: e.target.value })} /></div>
          </div>
        </div>

        {/* Footer */}
        <div className="popup-footer-CJC">
          {isEdit ? (
            <>
              <button className="save-btn-CJC green" onClick={handleEditSubmit}>Save</button>
              <button className="cancel-btn-CJC red" onClick={() => setSelectedClient(null)}>Cancel</button>
            </>
          ) : (
            <button className="cancel-btn-CJC red" onClick={() => deleteClient(sc.id)}>Delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

 return (
    <div className="job-container-CJC">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="title-CJC">CLIENT PROFILES</h2>
      <div className="filters-container-CJC">
        <div className="filters-left-CJC">
          <input
            className="vehicle-search-CJC"
            type="text"
            placeholder="Search by Vehicle, Client or Status..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="filters-right-CJC">
          <label htmlFor="fromDate">From:</label>
          <input
            type="date"
            id="fromDate"
            className="date-picker-CJC"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
          />
          <label htmlFor="toDate">To:</label>
          <input
            type="date"
            id="toDate"
            className="date-picker-CJC"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
          />
        </div>
      </div>

      <div className="job-grid-CJC">
        {pageClients.map(c => (
          <div key={c.id} className="job-card-CJC">
            <div className="job-header-CJC">
              <div>{c.vehicleNo}</div>
              <div className={`status-badge-CJC ${statusBadgeClass[c.status]}`}>{c.status}</div>
            </div>
            <div className="job-body-CJC">
              <p><strong>Client:</strong> {c.customerName}</p>
              <p><strong>Mobile:</strong> {c.whatsappNo}</p>
              <p><strong>Car:</strong> {c.brand} {c.model}</p>
              <p><strong>Total:</strong> ₹{(
                c.services.reduce((a, s) => a + parseFloat(s.price || 0), 0) +
                c.parts.reduce((acc, p) => {
                    const rate = parseFloat(p.rate) || 0;
                    const qty = parseFloat(p.qty) || 0;
                    const disc = parseFloat(p.disc) || 0;
                    const gst = parseFloat(p.gst) || 0;
                    const discounted = rate * qty * (1 - disc / 100);
                    return acc + discounted * (1 + gst / 100);
                }, 0)
                ).toFixed(2)}</p>


            </div>
            <div className="job-actions-CJC">
              <span className="action-btn-CJC view" onClick={() => { setSelectedClient(c); setMode('view'); }}><FaEye /></span>
              <span className="action-btn-CJC edit" onClick={() => { setSelectedClient(c); setMode('edit'); }}><FaEdit /></span>
              <span className="action-btn-CJC cancel" onClick={() => toggleStatus(c.id)}>
                {c.status === 'Active' ? <FaTimes /> : <FaCheckCircle />}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-CJC">
        {[...Array(pages)].map((_, idx) => (
          <button key={idx} onClick={() => setCurrentPage(idx + 1)} className={currentPage === idx + 1 ? 'active' : ''}>{idx + 1}</button>
        ))}
      </div>
      {renderPopup()}
    </div>
  );
}