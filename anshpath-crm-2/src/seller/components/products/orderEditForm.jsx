import React from 'react';
import {
  FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBox, FaBarcode,
  FaSortNumericUp, FaRupeeSign, FaTruck, FaMoneyCheckAlt,FaPhoneAlt,
} from 'react-icons/fa';
import { BsCalendar2DateFill } from 'react-icons/bs'; // correct import

const iconMap = {
  customerName: <FaUser className="label-icon-so04" />,
  phone: <FaPhoneAlt className="label-icon-so04" />,
  email: <FaEnvelope className="label-icon-so04" />,
  address: <FaMapMarkerAlt className="label-icon-so04" />,
  product: <FaBox className="label-icon-so04" />,
  sku: <FaBarcode className="label-icon-so04" />,
  quantity: <FaSortNumericUp className="label-icon-so04" />,
  amount: <FaRupeeSign className="label-icon-so04" />,
  status: <FaTruck className="label-icon-so04" />,
  paymentType: <FaMoneyCheckAlt className="label-icon-so04" />,
  date: <BsCalendar2DateFill className="label-icon-so04" />  // ✅ lowercase key
};


const OrderEditForm = ({ order, onChange }) => {
  if (!order) return null;

  const keys = Object.keys(order).filter(
    (key) => key !== 'id' && key !== 'paymentStatus'
  );

  return (
    <form className="order-edit-form-so04">
     {keys.map((key) => (
  <div key={key} className="form-group-so04">
    <label className="form-label-so04 text-capitalize">
      {iconMap[key] || null} {key.replace(/([A-Z])/g, ' $1')}
    </label>

    {(key === 'status' || key === 'paymentType') ? (
      <select
        className="form-control-so04"
        value={order[key]}
        onChange={(e) => onChange(key, e.target.value)}
      >
        {key === 'status' && (
          <>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </>
        )}
        {key === 'paymentType' && (
          <>
            <option value="COD">COD</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </>
        )}
      </select>
    ) : (
      <input
        type={key.toLowerCase() === 'date' ? 'date' : 'text'}
        className="form-control-so04"
        value={order[key]}
        onChange={(e) => onChange(key, e.target.value)}
      />
    )}
  </div>
))}

    </form>
  );
};

export default OrderEditForm;
