import React, { useState, useEffect } from "react";
import "./EstimateDetail.css";
import { FaEye, FaEdit, FaTrash, FaPrint, FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const dummyData = [
  {
    id: 1,
    invDate: "2025-06-21",
    invNo: "INV001",
    custName: "Ravi Patel",
    contactNo: "9876543210",
    vehicle: "Car - MH12AB1234",
    products: "Oil, Filter",
    basic: 1200,
    gst: 216,
    amount: 1416,
    type: "Repair",
    remark: "Urgent",
    jobNo: "JB001"
  },
  {
    id: 2,
    invDate: "2025-06-20",
    invNo: "INV002",
    custName: "Sneha Desai",
    contactNo: "9867452301",
    vehicle: "Scooter - MH13XY9876",
    products: "Service Kit",
    basic: 800,
    gst: 144,
    amount: 944,
    type: "Service",
    remark: "Regular",
    jobNo: "JB002"
  },
  {
    id: 3,
    invDate: "2025-06-19",
    invNo: "INV003",
    custName: "Kiran More",
    contactNo: "9856123478",
    vehicle: "Bike - MH14KL4567",
    products: "Chain, Brake",
    basic: 500,
    gst: 90,
    amount: 590,
    type: "Repair",
    remark: "Noise issue",
    jobNo: "JB003"
  },
   {
    id: 4,
    invDate: "2025-06-18",
    invNo: "INV004",
    custName: "Ravi Shinde",
    contactNo: "9876543210",
    vehicle: "Car - MH12AB1234",
    products: "Oil Filter, Engine Oil",
    basic: 1200,
    gst: 216,
    amount: 1416,
    type: "Service",
    remark: "Regular servicing",
    jobNo: "JB004"
  },
  {
    id: 5,
    invDate: "2025-06-17",
    invNo: "INV005",
    custName: "Sneha Patil",
    contactNo: "9023456789",
    vehicle: "Scooter - MH13CD7890",
    products: "Brake Pads",
    basic: 800,
    gst: 144,
    amount: 944,
    type: "Repair",
    remark: "Brake replacement",
    jobNo: "JB005"
  },
  {
    id: 6,
    invDate: "2025-06-16",
    invNo: "INV006",
    custName: "Vikas Jadhav",
    contactNo: "9123456789",
    vehicle: "Bike - MH14XY1234",
    products: "Tyre",
    basic: 2500,
    gst: 450,
    amount: 2950,
    type: "Replacement",
    remark: "Rear tyre worn out",
    jobNo: "JB006"
  },
  {
    id: 7,
    invDate: "2025-06-15",
    invNo: "INV007",
    custName: "Nikita Deshmukh",
    contactNo: "9988776655",
    vehicle: "Car - MH15LM4567",
    products: "Battery",
    basic: 3500,
    gst: 630,
    amount: 4130,
    type: "Replacement",
    remark: "Battery drained",
    jobNo: "JB007"
  },
  {
    id: 8,
    invDate: "2025-06-14",
    invNo: "INV008",
    custName: "Ajay Pawar",
    contactNo: "9765432189",
    vehicle: "Scooter - MH12PQ9876",
    products: "Spark Plug",
    basic: 300,
    gst: 54,
    amount: 354,
    type: "Repair",
    remark: "Starting issue",
    jobNo: "JB008"
  },
  {
    id: 9,
    invDate: "2025-06-13",
    invNo: "INV009",
    custName: "Komal Rane",
    contactNo: "9867543210",
    vehicle: "Bike - MH14WE7654",
    products: "Chain Set",
    basic: 900,
    gst: 162,
    amount: 1062,
    type: "Replacement",
    remark: "Chain skipping",
    jobNo: "JB009"
  },
  {
    id: 10,
    invDate: "2025-06-12",
    invNo: "INV010",
    custName: "Suresh Koli",
    contactNo: "9834567890",
    vehicle: "Car - MH12MN1234",
    products: "AC Gas, Belt",
    basic: 2200,
    gst: 396,
    amount: 2596,
    type: "Repair",
    remark: "AC not cooling",
    jobNo: "JB010"
  },
  {
    id: 11,
    invDate: "2025-06-11",
    invNo: "INV011",
    custName: "Pooja Salunkhe",
    contactNo: "9812345670",
    vehicle: "Scooter - MH13YZ7890",
    products: "Rearview Mirror",
    basic: 400,
    gst: 72,
    amount: 472,
    type: "Replacement",
    remark: "Mirror broken",
    jobNo: "JB011"
  },
  {
    id: 12,
    invDate: "2025-06-10",
    invNo: "INV012",
    custName: "Rajesh Thorat",
    contactNo: "9901122334",
    vehicle: "Bike - MH14GH4567",
    products: "Horn",
    basic: 600,
    gst: 108,
    amount: 708,
    type: "Repair",
    remark: "Horn not working",
    jobNo: "JB012"
  },
  {
    id: 13,
    invDate: "2025-06-09",
    invNo: "INV013",
    custName: "Meena Dhumal",
    contactNo: "9876076543",
    vehicle: "Car - MH12OP4321",
    products: "Wipers",
    basic: 750,
    gst: 135,
    amount: 885,
    type: "Replacement",
    remark: "Wipers not effective",
    jobNo: "JB013"
  },
  {
    id: 14,
    invDate: "2025-06-08",
    invNo: "INV014",
    custName: "Ganesh More",
    contactNo: "9945678901",
    vehicle: "Bike - MH13JK7890",
    products: "Indicator, Bulb",
    basic: 350,
    gst: 63,
    amount: 413,
    type: "Repair",
    remark: "Right indicator dead",
    jobNo: "JB014"
  },
  {
    id: 15,
    invDate: "2025-06-07",
    invNo: "INV015",
    custName: "Anjali Kadam",
    contactNo: "9823456712",
    vehicle: "Scooter - MH14QR6543",
    products: "Seat Cover",
    basic: 650,
    gst: 117,
    amount: 767,
    type: "Accessory",
    remark: "Old seat torn",
    jobNo: "JB015"
  }
];

const EstimateDetail = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(dummyData);
  const [filteredData, setFilteredData] = useState(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewItem, setViewItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
   const recordsPerPage = 5;

 

  const [editItem, setEditItem] = useState({
  customerName: "Rahul Sharma",
  estimateNo: "EST-001",
  address: "Pune, MH",
  date: "2025-06-21",
  vehicleNo: "MH12DE1234",
  brand: "Maruti",
  items: [
    { name: "Oil Filter", qty: 1, hsn: "8421", rate: 150 },
    { name: "Labour Charge", qty: 1, hsn: "9987", rate: 500 },
  ],
  subTotal: 650,
  gst: 117,
  total: 767,
});


  useEffect(() => {
    const lower = search.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.custName.toLowerCase().includes(lower) ||
        item.vehicle.toLowerCase().includes(lower) ||
        item.invNo.toLowerCase().includes(lower)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [search, data]);
  
const handleDelete = (id) => {
  // call your delete API or logic here
  console.log("Deleting invoice with ID:", id);

  // Close the modal afterward
  setDeleteItem(null);
};

  const exportToExcel = () => {
  const exportData = filteredData.map((row, index) => ({
    "S.N": index + 1,
    "Invoice Date": row.invDate,
    "Invoice No": row.invNo,
    "Customer Name": row.custName,
    "Contact No": row.contactNo,
    "Vehicle Details": row.vehicle,
    "Products": row.products,
    "Basic Amount": row.basic,
    "GST": row.gst,
    "Total Amount": row.amount,
    "Type": row.type,
    "Remark": row.remark,
    "Job No": row.jobNo,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Estimate Details");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(dataBlob, `Estimate_Details_${new Date().toISOString().slice(0, 10)}.xlsx`);
};
const handlePrint = () => {
  const printContents = document.getElementById("print-section").innerHTML;
  const newWindow = window.open("", "", "width=900,height=650");

  newWindow.document.write(`
    <html>
      <head>
        <title>Print Invoice</title>
        <style>
          @media print {
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              font-family: Arial, sans-serif;
              color: #000;
              margin: 0;
              padding: 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            .invoice-header-ed h2 {
              margin: 0;
              padding: 0;
            }
            .text-right-ed {
              text-align: right;
            }
            .signature-ed {
              display: flex;
              justify-content: space-between;
              margin-top: 40px;
              padding-top: 20px;
            }
            .print-close-btns {
              display: none;
            }
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${printContents}
      </body>
    </html>
  `);
  newWindow.document.close();
};



  const printTable = () => {
    const printContent = document.getElementById("print-area-ed").cloneNode(true);
    const actionCols = printContent.querySelectorAll(".action-col-ed");
    actionCols.forEach((col) => col.remove());

    const win = window.open("", "Print-Window");
    win.document.open();
    win.document.write(`
      <html>
        <head>
          <title>Estimate Table</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; }
            h2 { color: #007bff; text-align: center; margin: 0; }
            h4 { text-align: center; margin: 0 0 20px 0; font-weight: normal; }
          </style>
        </head>
        <body>
          <h2>Anshpath</h2>
          <h4>Technologies Private Limited</h4>
          <h3 style="text-align:center; color:#007bff">Estimate Detail Table</h3>
          ${printContent.innerHTML}
        </body>
      </html>`);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 500);
  };
  

  const pageCount = Math.ceil(filteredData.length / recordsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="container-ed estimate-detail-ed">
     <div className="table-toolbar-ed">
  <div className="d-flex justify-content-between align-items-center button-row-ed">
    <div className="d-flex gap-2">
      <button className="btn-ed btn-primary-ed" onClick={printTable}>
        <FaPrint className="me-1" /> Print
      </button>
      <button className="btn-ed btn-success-ed" onClick={exportToExcel}>
        <FaFileExcel className="me-1" /> Excel
      </button>
    </div>
    <div className="text-end-ed">
      NET AMT: ₹{filteredData.reduce((sum, row) => sum + row.amount, 0)}
    </div>
  </div>

  <div className="filter-bar-ed mt-3">
    <label htmlFor="search-ed" className="form-label-ed">Search:</label>
    <input
      id="search-ed"
      className="form-control-ed search-box-ed"
      placeholder="Customer, Vehicle, or Invoice No"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</div>


      
        <h3 className="table-title-ed">Estimate Detail Table</h3>
        <div id="print-area-ed">
        <table className="table-ed table-bordered-ed table-striped-ed">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Inv. Date</th>
              <th>Inv. No</th>
              <th>Cust. Name</th>
              <th>Cont. No</th>
              <th>Veh. Det</th>
              <th>Prods</th>
              <th>Basic</th>
              <th>GST</th>
              <th>Amt</th>
              <th>Type</th>
              <th>Remark</th>
              <th>Job No</th>
              <th className="action-col-ed">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={row.id}>
                <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                <td>{row.invDate}</td>
                <td>{row.invNo}</td>
                <td>{row.custName}</td>
                <td>{row.contactNo}</td>
                <td>{row.vehicle}</td>
                <td>{row.products}</td>
                <td>₹{row.basic}</td>
                <td>₹{row.gst}</td>
                <td>₹{row.amount}</td>
                <td>{row.type}</td>
                <td>{row.remark}</td>
                <td>{row.jobNo}</td>
       <td className="action-col-ed d-flex justify-content-center align-items-center gap-3">
                <FaEye
                    title="View"
                    className="icon-action-ed view-icon-ed"
                    onClick={() => setViewItem(row)}
                />
                <FaEdit
                    title="Edit"
                    className="icon-action-ed edit-icon-ed"
                    onClick={() => setEditItem(row)}
                />
               <FaTrash
  title="Delete"
  className="icon-action-ed delete-icon-ed"
  onClick={() => setDeleteItem(row)}  // Pass full row
/>
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="pagination-container-ed">
        <ul className="pagination-ed justify-content-center">
          {[...Array(pageCount)].map((_, i) => (
            <li key={i} className={`page-item-ed ${currentPage === i + 1 ? "active" : ""}`}>
              <button className="page-link-ed" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* View Modal */}
  {viewItem && (
  <div className="modal-ed-overlay">
    <div className="modal-ed">
      <div id="print-section" className="invoice-ed">
        <div className="invoice-header-ed">
          <div>
            <h2>AnshPath</h2>
            <small>Technologies Private Limited</small>
          </div>
          <div className="invoice-header-icon-ed">🚗</div>
        </div>

        <table className="invoice-table-ed">
          <tbody>
            <tr>
              <td colSpan="2"><strong>Bill To:</strong><br />{viewItem.customerName}<br />Pune, Maharashtra</td>
              <td colSpan="2"><strong>Estimate Details:</strong><br />Estimate No: {viewItem.estimateNo || 'N/A'}<br />Date: {viewItem.date || '21-06-2025'}</td>
            </tr>
            <tr>
              <td colSpan="2"><strong>Vehicle Details:</strong><br />Reg No: {viewItem.vehicleNo}<br />Brand: {viewItem.brand || 'N/A'}<br />Model: {viewItem.model || 'N/A'}</td>
              <td colSpan="2"><strong>Consignee Details:</strong><br />{viewItem.customerName}<br />Contact: {viewItem.contact || 'N/A'}<br />Email: -</td>
            </tr>
          </tbody>
        </table>

        <table className="invoice-table-ed" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Part / Labour Details</th>
              <th>Qty</th>
              <th>HSN</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Air Filter</td>
              <td>1</td>
              <td>8421</td>
              <td>1500.00</td>
              <td>1500.00</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Labour Charges</td>
              <td>1</td>
              <td>9987</td>
              <td>2500.00</td>
              <td>2500.00</td>
            </tr>
          </tbody>
        </table>

        <table className="invoice-summary-ed">
          <tbody>
            <tr>
              <td className="text-right-ed" colSpan="5">Sub Total:</td>
              <td>₹4000.00</td>
            </tr>
            <tr>
              <td className="text-right-ed" colSpan="5">GST:</td>
              <td>₹0.00</td>
            </tr>
            <tr>
              <td className="text-right-ed" colSpan="5"><strong>Grand Total:</strong></td>
              <td><strong>₹4000.00</strong></td>
            </tr>
          </tbody>
        </table>

        <div className="signature-ed">
          <div>Receiver's Signature</div>
          <div>Authorized Signature</div>
        </div>

        <div className="print-close-btns">
          <button className="btn-ed btn-primary-ed" onClick={handlePrint}>Print</button>
          <button className="btn-ed btn-secondary-ed" onClick={() => setViewItem(null)}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Edit Modal */}
{editItem && (
  <div className="modal-ed-overlay">
    <div className="modal-ed invoice-ed">
      
      {/* Header */}
      <div className="invoice-header-ed">
        <div>
          <h2>AnshPath</h2>
          <small>Technologies Private Limited</small>
        </div>
        <div className="invoice-header-icon-ed">🚗</div>
      </div>

      {/* Side-by-Side Info Section */}
      <div className="form-section-wrapper-ed">
        {/* Left Side */}
        <div className="form-section-ed">
          <label>Customer Name</label>
          <input
            type="text"
            className="form-control-ed"
            value={editItem.customerName || ''}
            onChange={(e) => setEditItem({ ...editItem, customerName: e.target.value })}
          />

          <label>Estimate No</label>
          <input
            type="text"
            className="form-control-ed"
            value={editItem.estimateNo || ''}
            onChange={(e) => setEditItem({ ...editItem, estimateNo: e.target.value })}
          />

          <label>Brand</label>
          <input
            type="text"
            className="form-control-ed"
            value={editItem.brand || ''}
            onChange={(e) => setEditItem({ ...editItem, brand: e.target.value })}
          />
        </div>

        {/* Right Side */}
        <div className="form-section-ed">
          <label>Address</label>
          <input
            type="text"
            className="form-control-ed"
            value={editItem.address || ''}
            onChange={(e) => setEditItem({ ...editItem, address: e.target.value })}
          />

          <label>Date</label>
          <input
            type="date"
            className="form-control-ed"
            value={editItem.date || ''}
            onChange={(e) => setEditItem({ ...editItem, date: e.target.value })}
          />

          <label>Vehicle No</label>
          <input
            type="text"
            className="form-control-ed"
            value={editItem.vehicleNo || ''}
            onChange={(e) => setEditItem({ ...editItem, vehicleNo: e.target.value })}
          />
        </div>
      </div>

      {/* Items Section */}
     <h5 style={{ marginTop: '20px' }}>Estimate Items</h5>
<div className="item-row-ed">
  {editItem.items?.map((item, index) => (
    <div key={index} className="item-block-ed">
      <strong>Item {index + 1}</strong>

      <input
        type="text"
        className="form-control-ed"
        placeholder="Item Name"
        value={item.name || ''}
        onChange={(e) => {
          const items = [...editItem.items];
          items[index].name = e.target.value;
          setEditItem({ ...editItem, items });
        }}
      />

      <input
        type="number"
        className="form-control-ed"
        placeholder="Quantity"
        value={item.qty || ''}
        onChange={(e) => {
          const items = [...editItem.items];
          items[index].qty = Number(e.target.value);
          setEditItem({ ...editItem, items });
        }}
      />

      <input
        type="text"
        className="form-control-ed"
        placeholder="HSN Code"
        value={item.hsn || ''}
        onChange={(e) => {
          const items = [...editItem.items];
          items[index].hsn = e.target.value;
          setEditItem({ ...editItem, items });
        }}
      />

      <input
        type="number"
        className="form-control-ed"
        placeholder="Rate"
        value={item.rate || ''}
        onChange={(e) => {
          const items = [...editItem.items];
          items[index].rate = Number(e.target.value);
          setEditItem({ ...editItem, items });
        }}
      />

      <div>Total: ₹{(item.qty * item.rate).toFixed(2)}</div>
    </div>
  ))}
</div>

      {/* Totals */}
      <div className="form-section-ed" style={{ marginTop: '20px' }}>
        <label>Sub Total</label>
        <input
          type="number"
          className="form-control-ed"
          value={editItem.subTotal || ''}
          onChange={(e) => setEditItem({ ...editItem, subTotal: Number(e.target.value) })}
        />

        <label>GST</label>
        <input
          type="number"
          className="form-control-ed"
          value={editItem.gst || ''}
          onChange={(e) => setEditItem({ ...editItem, gst: Number(e.target.value) })}
        />

        <label>Grand Total</label>
        <input
          type="number"
          className="form-control-ed"
          value={editItem.total || ''}
          onChange={(e) => setEditItem({ ...editItem, total: Number(e.target.value) })}
        />
      </div>

      {/* Action Buttons */}
<div className="action-buttons-ed">
  <button className="btn-ed btn-success-ed">Save</button>
  <button
    className="btn-ed btn-secondary-ed"
    onClick={() => setEditItem(null)}
  >
    Cancel
  </button>
</div>
    </div>
  </div>
)}

{/*DEETE */}
{deleteItem && (
  <div className="modal-ed-overlay">
    <div className="modal-ed" style={{ maxWidth: '400px', textAlign: 'center' }}>
      <h4 style={{ marginBottom: '15px', color: 'var(--error-color-ed)' }}>
        Are you sure?
      </h4>
      <p>
        You are about to delete <strong>Invoice {deleteItem.invNo}</strong><br />
        for <strong>{deleteItem.custName}</strong>.
      </p>
      <div className="print-close-btns">
        <button
          className="btn-ed btn-danger-ed"
          onClick={() => handleDelete(deleteItem.id)}
        >
          Delete
        </button>
        <button
          className="btn-ed btn-primary-ed"
          onClick={() => setDeleteItem(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}




    </div>
  );
};

export default EstimateDetail;
