import React from "react";
import "./ProductViewModel.css";

const ProductViewModal = ({ viewModalData, onClose }) => {
  if (!viewModalData) return null;

  return (
    <div className="modal-wrapper-vs">
      <div className="modal-content-vs">
        <div className="modal-header-vs">
          <span>Product Details</span>
          <button className="btn-close-vs" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body-vs">
          <div className="text-center-vs">
            <img
              src={viewModalData.image}
              alt={viewModalData.productName}
              className="img-fluid mb-3"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
            <h5 className="mb-3">{viewModalData.productName}</h5>

            <div className="row text-start-vs">
              <div className="col-6 mb-2"><strong>Category:</strong> {viewModalData.category}</div>
              <div className="col-6 mb-2"><strong>Brand:</strong> {viewModalData.brand}</div>
              <div className="col-6 mb-2"><strong>SKU:</strong> {viewModalData.sku}</div>
              <div className="col-6 mb-2"><strong>Stock:</strong> {viewModalData.stockQuantity}</div>
              <div className="col-6 mb-2"><strong>Price:</strong> ₹{viewModalData.price}</div>
              <div className="col-6 mb-2"><strong>Discount:</strong> ₹{viewModalData.discountPrice}</div>
              <div className="col-6 mb-2"><strong>Status:</strong> {viewModalData.productStatus}</div>
              <div className="col-6 mb-2"><strong>Rating:</strong> {viewModalData.rating} ⭐</div>
              <div className="col-6 mb-2"><strong>Added On:</strong> {viewModalData.addedOn}</div>
              <div className="col-6 mb-2"><strong>Last Updated:</strong> {viewModalData.lastUpdated}</div>
            </div>
          </div>
        </div>

        <div className="modal-footer-vs">
          <button className="btn-cancel-vs" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
