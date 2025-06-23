import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaCogs, FaBoxOpen, FaCube, FaFileInvoice, FaTags, FaCopyright, 
         FaBarcode, FaTools, FaBox, FaRupeeSign, FaPercentage, 
         FaShoppingCart, FaMoneyBillWave, FaTag, FaMoneyBillAlt, 
         FaBoxes, FaRulerCombined, FaCalendarCheck, FaMapMarkerAlt, 
         FaSave, FaTrashAlt, FaUndo, FaSpinner } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SparePartAdd.css';

const SparePartAdd = () => {
  const [formData, setFormData] = useState({
    invoiceName: '',
    category: '',
    brand: '',
    model: '',
    hsn: '',
    type: 'SPARE',
    partName: '',
    mip: '',
    gst: '',
    purchasePrice: '',
    basicPurPrice: '',
    salePrice: '',
    basicSalePrice: '',
    minQty: '',
    uom: '',
    warranty: '',
    discount: '',
    location: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Auto-calculate prices based on GST
    if (id === 'gst') {
      const gst = parseFloat(value) || 0;
      const purchasePrice = parseFloat(formData.purchasePrice) || 0;
      const salePrice = parseFloat(formData.salePrice) || 0;
      
      const newData = {};
      
      if (purchasePrice > 0) {
        const basicPurPrice = purchasePrice / (1 + (gst / 100));
        newData.basicPurPrice = basicPurPrice.toFixed(2);
      }
      
      if (salePrice > 0) {
        const basicSalePrice = salePrice / (1 + (gst / 100));
        newData.basicSalePrice = basicSalePrice.toFixed(2);
      }
      
      setFormData(prev => ({
        ...prev,
        ...newData
      }));
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Part information saved successfully!',
        icon: 'success',
        confirmButtonColor: '#4361ee'
      });
      setIsSaving(false);
    }, 1500);
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4361ee',
      cancelButtonColor: '#ef233c',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        
        // Simulate API call
        setTimeout(() => {
          Swal.fire(
            'Deleted!',
            'Part information has been deleted.',
            'success'
          );
          setIsDeleting(false);
        }, 1500);
      }
    });
  };

  const handleReset = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will reset all form fields!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4361ee',
      cancelButtonColor: '#ef233c',
      confirmButtonText: 'Yes, reset it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({
          invoiceName: '',
          category: '',
          brand: '',
          model: '',
          hsn: '',
          type: 'SPARE',
          partName: '',
          mip: '',
          gst: '',
          purchasePrice: '',
          basicPurPrice: '',
          salePrice: '',
          basicSalePrice: '',
          minQty: '',
          uom: '',
          warranty: '',
          discount: '',
          location: ''
        });
        Swal.fire(
          'Reset!',
          'Form has been reset.',
          'success'
        );
      }
    });
  };

  return (
    <div className="container premium-form-container-SPIF-013">
      <FaCogs className="floating-icon floating-icon-1-SPIF-013" />
      <FaBoxOpen className="floating-icon floating-icon-2-SPIF-013" />
      
      <div className="premium-form-header-SPIF-013">
        <h2><FaCube className="me-2" />Spare Part Add</h2>
        <p className="text-muted">Enter all part details for inventory management</p>
      </div>
      
      <div className="premium-form-section-SPIF-013">
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="invoiceName" className="premium-form-label-SPIF-013">
              <FaFileInvoice /> Invoice Name
            </label>
            <input 
              type="text" 
              className="form-control premium-form-control-SPIF-013" 
              id="invoiceName" 
              placeholder="Enter invoice name"
              value={formData.invoiceName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="category" className="premium-form-label-SPIF-013">
              <FaTags /> Category
            </label>
            <input 
              type="text" 
              className="form-control premium-form-control-SPIF-013" 
              id="category" 
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="brand" className="premium-form-label-SPIF-013">
              <FaCopyright /> Brand
            </label>
            <input 
              type="text" 
              className="form-control premium-form-control-SPIF-013" 
              id="brand" 
              placeholder="Enter brand name"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="model" className="premium-form-label-SPIF-013">
              <FaCube /> Model
            </label>
            <input 
              type="text" 
              className="form-control premium-form-control-SPIF-013" 
              id="model" 
              placeholder="Enter model number"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="hsn" className="premium-form-label-SPIF-013">
              <FaBarcode /> HSN Code
            </label>
            <input 
              type="text" 
              className="form-control premium-form-control-SPIF-013" 
              id="hsn" 
              placeholder="Enter HSN code"
              value={formData.hsn}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="type" className="premium-form-label-SPIF-013">
              <FaTools /> Type
            </label>
            <select 
              className="form-select premium-form-select-SPIF-013" 
              id="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="SPARE">SPARE</option>
              <option value="LABOUR">LABOUR</option>
            </select>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="partName" className="premium-form-label-SPIF-013">
              <FaBox /> Part Name
            </label>
            <input 
              type="text" 
              className="form-control premium-form-control-SPIF-013" 
              id="partName" 
              placeholder="Enter part name"
              value={formData.partName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="mip" className="premium-form-label-SPIF-013">
              <FaRupeeSign /> MRP
            </label>
            <div className="input-group">
              <span className="input-group-text premium-input-group-text-SPIF-013">₹</span>
              <input 
                type="number" 
                className="form-control premium-form-control-SPIF-013" 
                id="mip" 
                placeholder="0.0" 
                step="0.01" 
                min="0"
                value={formData.mip}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="gst" className="premium-form-label-SPIF-013">
              <FaPercentage /> GST (%)
            </label>
            <div className="input-group">
              <input 
                type="number" 
                className="form-control premium-form-control-SPIF-013" 
                id="gst" 
                placeholder="0.0" 
                step="0.01" 
                min="0" 
                max="100"
                value={formData.gst}
                onChange={handleChange}
              />
              <span className="input-group-text premium-input-group-text-SPIF-013">%</span>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="purchasePrice" className="premium-form-label-SPIF-013">
              <FaShoppingCart /> Purchase Price
            </label>
            <div className="input-group">
              <span className="input-group-text premium-input-group-text-SPIF-013">₹</span>
              <input 
                type="number" 
                className="form-control premium-form-control-SPIF-013" 
                id="purchasePrice" 
                placeholder="0.0" 
                step="0.01" 
                min="0"
                value={formData.purchasePrice}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="basicPurPrice" className="premium-form-label-SPIF-013">
              <FaMoneyBillWave /> Basic Purchase Price
            </label>
            <div className="input-group">
              <span className="input-group-text premium-input-group-text-SPIF-013">₹</span>
              <input 
                type="number" 
                className="form-control premium-form-control-SPIF-013" 
                id="basicPurPrice" 
                placeholder="0.0" 
                step="0.01" 
                min="0"
                value={formData.basicPurPrice}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="salePrice" className="premium-form-label-SPIF-013">
              <FaTag /> Sale Price
            </label>
            <div className="input-group">
              <span className="input-group-text premium-input-group-text-SPIF-013">₹</span>
              <input 
                type="number" 
                className="form-control premium-form-control-SPIF-013" 
                id="salePrice" 
                placeholder="0.0" 
                step="0.01" 
                min="0"
                value={formData.salePrice}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="basicSalePrice" className="premium-form-label-SPIF-013">
              <FaMoneyBillAlt /> Basic Sale Price
            </label>
            <div className="input-group">
              <span className="input-group-text premium-input-group-text-SPIF-013">₹</span>
              <input 
                type="number" 
                className="form-control premium-form-control-SPIF-013" 
                id="basicSalePrice" 
                placeholder="0.0" 
                step="0.01" 
                min="0"
                value={formData.basicSalePrice}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="minQty" className="premium-form-label-SPIF-013">
              <FaBoxes /> Min Qty
            </label>
            <input 
              type="number" 
              className="form-control premium-form-control-SPIF-013" 
              id="minQty" 
              placeholder="0" 
              min="0"
              value={formData.minQty}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="uom" className="premium-form-label-SPIF-013">
              <FaRulerCombined /> UOM
            </label>
            <select 
              className="form-select premium-form-select-SPIF-013" 
              id="uom"
              value={formData.uom}
              onChange={handleChange}
            >
              <option value="" disabled>---UNT---</option>
              <option value="PCS">PCS</option>
              <option value="QTY">QTY</option>
              <option value="SET">SET</option>
              <option value="JOB SRNO">JOB SRNO</option>
              <option value="INCH">INCH</option>
              <option value="MTR">MTR</option>
              <option value="MIL">MIL</option>
              <option value="KG">KG</option>
            </select>
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="warranty" className="premium-form-label-SPIF-013">
              <FaCalendarCheck /> Warranty
            </label>
            <div className="input-group">
              <input 
                type="number" 
                className="form-control premium-form-control-SPIF-013" 
                id="warranty" 
                placeholder="0" 
                min="0"
                value={formData.warranty}
                onChange={handleChange}
              />
              <span className="input-group-text premium-input-group-text-SPIF-013">months</span>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="discount" className="premium-form-label-SPIF-013">
              <FaPercentage /> Discount (%)
            </label>
            <div className="input-group">
              <input 
                type="number" 
                className="form-control premium-form-control-SPIF-013" 
                id="discount" 
                placeholder="Enter discount percentage" 
                step="0.01" 
                min="0" 
                max="100"
                value={formData.discount}
                onChange={handleChange}
              />
              <span className="input-group-text premium-input-group-text-SPIF-013">%</span>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="location" className="premium-form-label-SPIF-013">
              <FaMapMarkerAlt /> Location
            </label>
            <input 
              type="text" 
              className="form-control premium-form-control-SPIF-013" 
              id="location" 
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="d-flex justify-content-center mt-5 btn-group-premium-SPIF-013">
        <button 
          type="button" 
          className="btn btn-save-premium-SPIF-013 btn-premium-SPIF-013 me-3"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <FaSpinner className="fa-spin me-2" /> Saving...
            </>
          ) : (
            <>
              <FaSave className="me-2" /> Save
            </>
          )}
        </button>
        <button 
          type="button" 
          className="btn btn-delete-premium-SPIF-013 btn-premium-SPIF-013 me-3"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <FaSpinner className="fa-spin me-2" /> Deleting...
            </>
          ) : (
            <>
              <FaTrashAlt className="me-2" /> Delete
            </>
          )}
        </button>
        <button 
          type="button" 
          className="btn btn-reset-premium-SPIF-013 btn-premium-SPIF-013"
          onClick={handleReset}
        >
          <FaUndo className="me-2" /> Reset
        </button>
      </div>
    </div>
  );
};

export default SparePartAdd;