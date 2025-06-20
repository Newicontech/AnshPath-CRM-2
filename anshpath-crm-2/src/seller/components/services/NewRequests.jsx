// ... your imports
import React, { useState } from "react";
import RejectModal from "./RejectModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewRequests.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mockRequests = [
    
{
    id: "REQ12345",
    serviceName: "Engine Oil Change",
    customerName: "Rahul Sharma",
    customerMobile: "9876543210",
    vehicleType: "Car",
    bookingDateTime: "2025-06-19T10:30:00",
    paymentType: "Online",
    requestNote: "Please use synthetic oil only.",
  },
  {
    id: "REQ12346",
    serviceName: "Brake Pad Replacement",
    customerName: "Anita Verma",
    customerMobile: "9123456780",
    vehicleType: "Bike",
    bookingDateTime: "2025-06-19T11:00:00",
    paymentType: "Cash on Delivery",
    requestNote: "",
  },
   {
    id: "REQ12347",
    serviceName: "AC Repair",
    customerName: "Rohit Singh",
    customerMobile: "9988776655",
    vehicleType: "Car",
    bookingDateTime: "2025-06-19T12:15:00",
    paymentType: "Online",
    requestNote: "Check cooling issue"
  },
  {
    id: "REQ12348",
    serviceName: "Battery Replacement",
    customerName: "Sneha Mehta",
    customerMobile: "9871234567",
    vehicleType: "Bike",
    bookingDateTime: "2025-06-19T13:30:00",
    paymentType: "Cash on Delivery",
    requestNote: ""
  },
  {
    id: "REQ12349",
    serviceName: "Tyre Replacement",
    customerName: "Vikas Nair",
    customerMobile: "9812345670",
    vehicleType: "Car",
    bookingDateTime: "2025-06-19T14:45:00",
    paymentType: "Online",
    requestNote: "Front left tyre"
  },
  {
    id: "REQ12350",
    serviceName: "General Service",
    customerName: "Pooja Sharma",
    customerMobile: "9898989898",
    vehicleType: "Scooter",
    bookingDateTime: "2025-06-19T15:00:00",
    paymentType: "Cash on Delivery",
    requestNote: ""
  },
  {
    id: "REQ12351",
    serviceName: "Coolant Top-up",
    customerName: "Amit Desai",
    customerMobile: "9123123123",
    vehicleType: "Car",
    bookingDateTime: "2025-06-19T16:00:00",
    paymentType: "Online",
    requestNote: "Check for leaks"
  },
  {
    id: "REQ12352",
    serviceName: "Clutch Repair",
    customerName: "Neha Kulkarni",
    customerMobile: "9876540000",
    vehicleType: "Bike",
    bookingDateTime: "2025-06-19T17:30:00",
    paymentType: "Cash on Delivery",
    requestNote: ""
  },
  {
    id: "REQ12353",
    serviceName: "Engine Tuning",
    customerName: "Karan Malhotra",
    customerMobile: "9765432198",
    vehicleType: "Car",
    bookingDateTime: "2025-06-19T18:45:00",
    paymentType: "Online",
    requestNote: "Improve fuel efficiency"
  },
  {
    id: "REQ12354",
    serviceName: "Horn Replacement",
    customerName: "Divya Joshi",
    customerMobile: "9000001111",
    vehicleType: "Scooter",
    bookingDateTime: "2025-06-19T19:15:00",
    paymentType: "Cash on Delivery",
    requestNote: ""
  },
   {
    id: "REQ12355",
    serviceName: "Wheel Alignment",
    customerName: "Suresh Yadav",
    customerMobile: "9012345678",
    vehicleType: "Car",
    bookingDateTime: "2025-06-20T09:00:00",
    paymentType: "Online",
    requestNote: ""
  },
  {
    id: "REQ12356",
    serviceName: "Headlight Replacement",
    customerName: "Meena Patil",
    customerMobile: "9123456789",
    vehicleType: "Bike",
    bookingDateTime: "2025-06-20T09:30:00",
    paymentType: "Cash on Delivery",
    requestNote: ""
  },
  {
    id: "REQ12357",
    serviceName: "Interior Cleaning",
    customerName: "Ajay Thakur",
    customerMobile: "9876501234",
    vehicleType: "Car",
    bookingDateTime: "2025-06-20T10:00:00",
    paymentType: "Online",
    requestNote: "Include trunk area"
  },
  {
    id: "REQ12358",
    serviceName: "Windshield Repair",
    customerName: "Kavita Jain",
    customerMobile: "9823456781",
    vehicleType: "Car",
    bookingDateTime: "2025-06-20T10:45:00",
    paymentType: "Cash on Delivery",
    requestNote: "Small crack on left corner"
  },
  {
    id: "REQ12359",
    serviceName: "Brake Fluid Change",
    customerName: "Ramesh Pawar",
    customerMobile: "9934567890",
    vehicleType: "Scooter",
    bookingDateTime: "2025-06-20T11:30:00",
    paymentType: "Online",
    requestNote: ""
  },
  {
    id: "REQ12360",
    serviceName: "Radiator Service",
    customerName: "Anjali Rao",
    customerMobile: "9001112233",
    vehicleType: "Car",
    bookingDateTime: "2025-06-20T12:15:00",
    paymentType: "Cash on Delivery",
    requestNote: "Check for overheating issue"
  },
  {
    id: "REQ12361",
    serviceName: "Horn Fixing",
    customerName: "Vikram Das",
    customerMobile: "9087654321",
    vehicleType: "Bike",
    bookingDateTime: "2025-06-20T12:45:00",
    paymentType: "Online",
    requestNote: ""
  },
  {
    id: "REQ12362",
    serviceName: "Door Dent Repair",
    customerName: "Priya Shah",
    customerMobile: "9090909090",
    vehicleType: "Car",
    bookingDateTime: "2025-06-20T13:30:00",
    paymentType: "Online",
    requestNote: "Rear right door dent"
  },
  {
    id: "REQ12363",
    serviceName: "Fuel Tank Cleaning",
    customerName: "Manoj Kumar",
    customerMobile: "9888777666",
    vehicleType: "Scooter",
    bookingDateTime: "2025-06-20T14:00:00",
    paymentType: "Cash on Delivery",
    requestNote: ""
  },
  {
    id: "REQ12364",
    serviceName: "Wiper Blade Replacement",
    customerName: "Seema Bhatt",
    customerMobile: "9765432187",
    vehicleType: "Car",
    bookingDateTime: "2025-06-20T14:30:00",
    paymentType: "Online",
    requestNote: "Front and rear"
  },
  {
    id: "REQ12365",
    serviceName: "Spark Plug Check",
    customerName: "Deepak Rawat",
    customerMobile: "9876543201",
    vehicleType: "Bike",
    bookingDateTime: "2025-06-20T15:15:00",
    paymentType: "Cash on Delivery",
    requestNote: ""
  },
  {
    id: "REQ12366",
    serviceName: "Exhaust System Repair",
    customerName: "Alka Shinde",
    customerMobile: "9234567899",
    vehicleType: "Car",
    bookingDateTime: "2025-06-20T15:45:00",
    paymentType: "Online",
    requestNote: "Unusual noise issue"
  },
  {
    id: "REQ12367",
    serviceName: "Coolant Flush",
    customerName: "Mohit Sinha",
    customerMobile: "9123454321",
    vehicleType: "Scooter",
    bookingDateTime: "2025-06-20T16:30:00",
    paymentType: "Cash on Delivery",
    requestNote: ""
  },
  {
    id: "REQ12368",
    serviceName: "Oil Filter Replacement",
    customerName: "Nidhi Kapoor",
    customerMobile: "9321456780",
    vehicleType: "Car",
    bookingDateTime: "2025-06-20T17:00:00",
    paymentType: "Online",
    requestNote: ""
  },
  {
    id: "REQ12369",
    serviceName: "Bike Chain Lubrication",
    customerName: "Sanjay Chauhan",
    customerMobile: "9871112233",
    vehicleType: "Bike",
    bookingDateTime: "2025-06-20T17:30:00",
    paymentType: "Cash on Delivery",
    requestNote: ""
  },
  {
    id: "REQ12370",
    serviceName: "Dashboard Diagnostics",
    customerName: "Rekha Shetty",
    customerMobile: "9445566778",
    vehicleType: "Car",
    bookingDateTime: "2025-06-20T18:15:00",
    paymentType: "Online",
    requestNote: "Check engine light on"
  },
  {
    id: "REQ12371",
    serviceName: "Tail Light Replacement",
    customerName: "Arjun Mehra",
    customerMobile: "9567123498",
    vehicleType: "Bike",
    bookingDateTime: "2025-06-20T18:45:00",
    paymentType: "Cash on Delivery",
    requestNote: ""
  },
  {
    id: "REQ12372",
    serviceName: "Body Wash",
    customerName: "Sheetal Patil",
    customerMobile: "9988776655",
    vehicleType: "Car",
    bookingDateTime: "2025-06-20T19:15:00",
    paymentType: "Online",
    requestNote: ""
  },
  {
    id: "REQ12373",
    serviceName: "Suspension Check",
    customerName: "Tushar Joshi",
    customerMobile: "9001234567",
    vehicleType: "Car",
    bookingDateTime: "2025-06-20T20:00:00",
    paymentType: "Cash on Delivery",
    requestNote: "Noise while turning"
  },
  {
    id: "REQ12374",
    serviceName: "Mirror Adjustment",
    customerName: "Gayatri Naik",
    customerMobile: "9345678921",
    vehicleType: "Scooter",
    bookingDateTime: "2025-06-20T20:30:00",
    paymentType: "Online",
    requestNote: ""
  }
];

const PAGE_SIZE = 6;

const NewRequests = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [rejectedRequest, setRejectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scheduledRequests, setScheduledRequests] = useState([]);
  const [filters, setFilters] = useState({
    vehicleType: "All",
    paymentType: "All",
    date: "",
    search: "",
  });

  const totalPages = Math.ceil(requests.length / PAGE_SIZE);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // reset to first page when filter changes
  };

  const handleAccept = async (id) => {
    const acceptedRequest = requests.find((r) => r.id === id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setScheduledRequests((prev) => [...prev, acceptedRequest]);
    toast.success(
      `Request ${acceptedRequest.id} by ${acceptedRequest.customerName} accepted successfully!`,
      { autoClose: 5000, theme: "light" }
    );

    try {
      await fetch("https://api.example.com/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: acceptedRequest.customerMobile,
          message: `Hi ${acceptedRequest.customerName}, your service request ${acceptedRequest.id} for ${acceptedRequest.serviceName} has been scheduled. - AnshPath Team`,
        }),
      });
      toast.success("SMS sent to customer successfully!", { autoClose: 5000 });
    } catch (error) {
      toast.error("Failed to send SMS!", { autoClose: 5000 });
    }

    if ((currentPage - 1) * PAGE_SIZE >= requests.length - 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleReject = (id, reason) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    console.log(`Rejected Request: ${id} | Reason: ${reason}`);
    setRejectedRequest(null);
    if ((currentPage - 1) * PAGE_SIZE >= requests.length - 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

 const handlePrint = () => {
  const printContent = document.getElementById("print-section").innerHTML;
  const printWindow = window.open("", "", "width=1000,height=700");

  printWindow.document.write(`
    <html>
      <head>
        <title>Print - New Requests</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #000;
          }

          .header-title {
            text-align: center;
            margin-bottom: 10px;
          }

          .header-title h2 {
            margin: 0;
            color: #4361ee;
            font-weight: bold;
          }

          .header-title small {
            font-size: 12px;
            display: block;
          }

          .table-print {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            font-size: 13px;
          }

          .table-print th,
          .table-print td {
            border: 1px solid #333;
            padding: 8px;
            text-align: center;
            word-wrap: break-word;
          }

          .table-print th {
            background-color: #f1f1f1;
          }

          .no-print {
            display: none !important;
          }

          @page {
            size: A4 landscape;
            margin: 20mm;
          }
        </style>
      </head>
      <body>
        <div class="header-title">
          <h2>AnshPath</h2>
          <small>Technologies Private Limited</small>
          <h4 style="margin-top: 10px;">New Requests Table</h4>
        </div>
        <table class="table-print">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Service Name</th>
              <th>Customer Name</th>
              <th>Customer Mob.No.</th>
              <th>Vehicle Type</th>
              <th>Booking Date/Time</th>
              <th>Payment Type</th>
              <th>Request Note</th>
            </tr>
          </thead>
          <tbody>
            ${paginatedRequests
              .map(
                (req) => `
              <tr>
                <td>${req.id}</td>
                <td>${req.serviceName}</td>
                <td>${req.customerName}</td>
                <td>${req.customerMobile}</td>
                <td>${req.vehicleType}</td>
                <td>${formatDateTime(req.bookingDateTime)}</td>
                <td>${req.paymentType}</td>
                <td>${req.requestNote || "-"}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};

  const handleExportToExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += [
      "Request ID",
      "Service Name",
      "Customer Name",
      "Customer Mobile",
      "Vehicle Type",
      "Booking Date/Time",
      "Payment Type",
      "Request Note",
    ].join(",") + "\n";

    requests.forEach((req) => {
      csvContent += [
        req.id,
        req.serviceName,
        req.customerName,
        req.customerMobile,
        req.vehicleType,
        formatDateTime(req.bookingDateTime),
        req.paymentType,
        req.requestNote || "-",
      ].join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "new_requests.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDateTime = (dateStr) => {
    const options = { dateStyle: "medium", timeStyle: "short" };
    return new Date(dateStr).toLocaleString(undefined, options);
  };

  const filteredRequests = requests.filter((r) =>
    (filters.vehicleType === "All" || !filters.vehicleType || r.vehicleType === filters.vehicleType) &&
    (filters.paymentType === "All" || !filters.paymentType || r.paymentType === filters.paymentType) &&
    (!filters.date || r.bookingDateTime.startsWith(filters.date)) &&
    (!filters.search ||
      r.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.id.toLowerCase().includes(filters.search.toLowerCase()))
  );

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const renderPagination = () => (
    <nav className="pagination-container-nr mt-3-nr">
      <ul className="pagination justify-content-center">
        {[...Array(Math.ceil(filteredRequests.length / PAGE_SIZE))].map((_, index) => {
          const pageNum = index + 1;
          return (
            <li key={pageNum} className={`page-item ${pageNum === currentPage ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(pageNum)}>
                {pageNum}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <div className="container-nr mt-4-nr">
      <h3 className="title-nr text-center-nr text-primary-nr fw-bold-nr">NEW REQUESTS</h3>

      {/* Filter Row */}
      <div className="filters-container-nr">
  <div>
    <label>Vehicle Type</label>
    <select name="vehicleType" value={filters.vehicleType} onChange={handleFilterChange}>
      <option value="All">All</option>
      <option value="Car">Car</option>
      <option value="Bike">Bike</option>
      <option value="Scooter">Scooter</option>
    </select>
  </div>
  <div>
    <label>Payment Type</label>
    <select name="paymentType" value={filters.paymentType} onChange={handleFilterChange}>
      <option value="All">All</option>
      <option value="Online">Online</option>
      <option value="Cash on Delivery">Cash on Delivery</option>
    </select>
  </div>
  <div>
    <label>Booking Date</label>
    <input
      type="date"
      name="date"
      value={filters.date}
      onChange={handleFilterChange}
    />
  </div>
  <div>
    <label>Search</label>
    <input
      type="text"
      name="search"
      placeholder="Customer Name / Request ID"
      className="search-input-nr"
      value={filters.search}
      onChange={handleFilterChange}
    />
  </div>
</div>


      {filteredRequests.length === 0 ? (
        <div className="alert-nr alert-info-nr text-center-nr">No matching requests found.</div>
      ) : (
        <>
          <div className="d-flex justify-content-start mt-3" style={{ position: "relative", top: "-10px" }}>
            <button className="btn btn-primary me-2 d-flex align-items-center gap-2" onClick={handlePrint}>
              <i className="bi bi-printer"></i>
              <span>Print</span>
            </button>
            <button className="btn btn-success d-flex align-items-center gap-2" onClick={handleExportToExcel}>
              <i className="bi bi-file-earmark-excel"></i>
              <span>Excel</span>
            </button>
          </div>

          <div id="print-section">
            <div className="table-wrapper-nr table-responsive-nr">
              <table className="table-nr table-bordered-nr table-striped-nr align-middle-nr">
                <thead className="table-light-nr">
                  <tr>
                    <th className="th-nr">Request ID</th>
                    <th className="th-nr">Service Name</th>
                    <th className="th-nr">Customer Name</th>
                    <th className="th-nr">Customer Mob.No.</th>
                    <th className="th-nr">Vehicle Type</th>
                    <th className="th-nr">Booking Date/Time</th>
                    <th className="th-nr">Payment Type</th>
                    <th className="th-nr">Request Note</th>
                    <th className="th-nr no-print">Action</th>
                  </tr>
                </thead>
                <tbody className="tbody-nr">
                  {paginatedRequests.map((req) => (
                    <tr key={req.id} className="tr-nr">
                      <td className="td-nr">{req.id}</td>
                      <td className="td-nr">{req.serviceName}</td>
                      <td className="td-nr">{req.customerName}</td>
                      <td className="td-nr">{req.customerMobile}</td>
                      <td className="td-nr">{req.vehicleType}</td>
                      <td className="td-nr">{formatDateTime(req.bookingDateTime)}</td>
                      <td className="td-nr">{req.paymentType}</td>
                      <td className="td-nr">{req.requestNote || "-"}</td>
                      <td className="td-nr">
                        <div className="no-print">
                          <button
                            className="btn-nr btn-accept-nr btn-sm-nr me-2-nr"
                            onClick={() => handleAccept(req.id)}
                          >
                            Accept
                          </button>
                          <button
                            className="btn-nr btn-reject-nr btn-sm-nr"
                            onClick={() => setRejectedRequest(req)}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {renderPagination()}
        </>
      )}
      {rejectedRequest && (
        <RejectModal
          request={rejectedRequest}
          onClose={() => setRejectedRequest(null)}
          onSubmit={handleReject}
        />
      )}
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </div>
  );
};

export default NewRequests;
