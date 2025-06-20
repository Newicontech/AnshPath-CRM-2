import React, { useState, useEffect } from "react";
import "./RejectModal.css";

const RejectModal = ({ request, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setReason("");
    setError("");
  }, [request]);

  const handleReject = () => {
    if (!reason.trim()) {
      setError("Rejection reason is required.");
      return;
    }
    onSubmit(request.id, reason.trim());
    setReason("");
  };

  return (
    <div className="reject-modal-overlay-rm">
      <div className="reject-modal-rm">
        <div className="modal-content-rm">
          <div className="modal-header-rm">
            <h5 className="modal-title-rm">Reject Request</h5>
            <button className="close-btn-rm" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body-rm">
            <label htmlFor="rejectionReason" className="form-label-rm">Reason for Rejection</label>
            <textarea
              id="rejectionReason"
              className="textarea-rm"
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter the reason why you're rejecting the request"
            />
            {error && <div className="error-message-rm">{error}</div>}
          </div>
          <div className="modal-footer-rm">
            <button className="btn-cancel-rm" onClick={onClose}>Cancel</button>
            <button className="btn-confirm-rm" onClick={handleReject}>Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
