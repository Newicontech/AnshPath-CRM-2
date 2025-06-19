import React from "react";
import './EditProductModal.css'; // Make sure this has your light/dark styles

const isDarkMode = document.body.classList.contains('dark-mode-HDW-01');

const EditProductModal = ({
  editModalData,
  setEditModalData,
  handleEditChange,
  handleEditSave,
  handleImageUpload
}) => {
  if (!editModalData) return null;

  return (
    <div className={`modal-wrapper-ed ${isDarkMode ? 'dark-mode-HDW-01' : ''}`}>
      <div className="modal-content-ed">
        <div className="modal-header-ed">
          <span>Edit Product</span>
          <button className="btn-close-ed" onClick={() => setEditModalData(null)}>
            &times;
          </button>
        </div>

        <div className="modal-body-ed">
      <div className="text-center-ed image-wrapper-ed">
  <img
    src={editModalData.image}
    alt="Product"
    className="img-fluid-ed"
    style={{ maxHeight: "200px", objectFit: "contain" }}
  />
  <div className="mt-2-ed">
    {/* <label>Change Image</label> */}
    <input
      type="file"
      name="image"
      onChange={handleImageUpload}
      className="form-control-ed"
    />
  </div>
</div>


          <div className="row-ed">
            {[
              { name: 'productName', label: 'Product Name', type: 'text' },
              { name: 'category', label: 'Category', type: 'text' },
              { name: 'brand', label: 'Brand', type: 'text' },
              { name: 'sku', label: 'SKU', type: 'text' },
              { name: 'price', label: 'Price', type: 'number' },
              { name: 'discountPrice', label: 'Discount Price', type: 'number' },
              { name: 'stockQuantity', label: 'Stock Quantity', type: 'number' },
              { name: 'rating', label: 'Rating', type: 'number', step: '0.1', min: '0', max: '5' }
            ].map(({ name, label, ...rest }) => (
              <div className="col-6 mb-2-ed" key={name}>
                <label>{label}</label>
                <input
                  className="form-control-ed"
                  name={name}
                  value={editModalData[name]}
                  onChange={handleEditChange}
                  {...rest}
                />
              </div>
            ))}

            <div className="col-6 mb-2-ed">
              <label>Status</label>
              <select
                className="form-control-ed"
                name="productStatus"
                value={editModalData.productStatus}
                onChange={handleEditChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Deleted">Deleted</option>
              </select>
            </div>

            <div className="col-6 mb-2-ed">
              <label>Added On</label>
              <input
                className="form-control-ed"
                type="text"
                name="addedOn"
                value={editModalData.addedOn}
                disabled
              />
            </div>

            <div className="col-6 mb-2-ed">
              <label>Last Updated</label>
              <input
                className="form-control-ed"
                type="text"
                name="lastUpdated"
                value={editModalData.lastUpdated}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="modal-footer-ed">
          <button className="btn-cancel-ed" onClick={() => setEditModalData(null)}>Cancel</button>
          <button className="btn-save-ed" onClick={handleEditSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
