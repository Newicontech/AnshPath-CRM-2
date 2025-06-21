import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./VehicleHistory.css";
import logo from "../../../assets/logo.png"; 
import { FaCar, FaUser, FaClipboardList, FaWrench, FaCogs, FaTimes } from "react-icons/fa";


const sampleData = [
  {
    jobCardId: "MH12AB1234-202506191000",
    vehicleNo: "MH12AB1234",
    customerName: "Ravi Kumar",
    address: "Pune, Maharashtra",
    whatsappNo: "9876543210",
    date:"2025-06-20",
    totalPartsPrice: 1500,
    totalServicesAmount: 2000,
    discount: 300,
    totalAmount: 3200,
    remark: "Changed oil and filter",
    jobDetails: {
      vehicleInfo: {
        vehicleType: "Car",
        brand: "Maruti",
        model: "Swift",
        color: "Red",
        engineNo: "ENG123456",
        year: "2020",
        currentKm: 45000,
        fuelType: "Petrol",
        transmission: "Manual",
        vin: "VIN123456"
      },
      customerInfo: {
        name: "Ravi Kumar",
        whatsapp: "9876543210",
        email: "ravi@example.com",
        address: "Pune, Maharashtra"
      },
      services: [
        { serviceName: "Oil Change", price: 800, technician: "Arun" },
        { serviceName: "Filter Change", price: 1200, technician: "Ajay" }
      ],
      parts: [
        { part: "Engine Oil", quantity: 1, meg: "Castrol", mrp: 1000, rate: 900, discount: 10, gst: 18, hsn: "2710", godown: "A" },
        { part: "Oil Filter", quantity: 1, meg: "Bosch", mrp: 500, rate: 450, discount: 10, gst: 18, hsn: "8421", godown: "B" }
      ],
      financial: {
        totalPartsPrice: 1350,
        totalServicesAmount: 2000,
        advance: 1000,
        discount: 300,
        totalAmount: 3200,
        paymentStatus: "Paid"
      },
      jobInfo: {
        superAdvisor: "Rajeev",
        madeBy: "Admin",
        remark: "Ensure next service after 6 months",
        jobStart: "2025-06-18T09:00",
        jobEnd: "2025-06-18T11:30"
      }
    }
  },
   {
    jobCardId: "MH12XY5678-202506181200",
    vehicleNo: "MH12XY5678",
    customerName: "Anjali Mehta",
    address: "Mumbai, Maharashtra",
    whatsappNo: "9123456789",
     date:"2025-06-20",
    totalPartsPrice: 1800,
    totalServicesAmount: 2500,
    discount: 200,
    totalAmount: 4100,
    remark: "Brake pad replacement",
    jobDetails: {
      vehicleInfo: {
        vehicleType: "Car",
        brand: "Hyundai",
        model: "i20",
        color: "White",
        engineNo: "ENG654321",
        year: "2019",
        currentKm: 60000,
        fuelType: "Diesel",
        transmission: "Automatic",
        vin: "VIN654321"
      },
      customerInfo: {
        name: "Anjali Mehta",
        whatsapp: "9123456789",
        email: "anjali@example.com",
        address: "Mumbai, Maharashtra"
      },
      services: [
        { serviceName: "Brake Service", price: 1500, technician: "Karan" },
        { serviceName: "Wheel Alignment", price: 1000, technician: "Ramesh" }
      ],
      parts: [
        { part: "Brake Pad", quantity: 4, meg: "Bosch", mrp: 500, rate: 450, discount: 10, gst: 18, hsn: "8708", godown: "A" }
      ],
      financial: {
        totalPartsPrice: 1800,
        totalServicesAmount: 2500,
        advance: 2000,
        discount: 200,
        totalAmount: 4100,
        paymentStatus: "Partial"
      },
      jobInfo: {
        superAdvisor: "Sunil",
        madeBy: "Admin",
        remark: "Check brakes after 5k km",
        jobStart: "2025-06-17T14:00",
        jobEnd: "2025-06-17T16:30"
      }
    }
  },
  {
    jobCardId: "MH14CD4321-202506191230",
    vehicleNo: "MH14CD4321",
    customerName: "Nikhil Joshi",
    address: "Nashik, Maharashtra",
    whatsappNo: "9988776655",
     date:"2025-06-20",
    totalPartsPrice: 1000,
    totalServicesAmount: 1500,
    discount: 100,
    totalAmount: 2400,
    remark: "Battery replacement",
    jobDetails: {
      vehicleInfo: {
        vehicleType: "Car",
        brand: "Honda",
        model: "Amaze",
        color: "Blue",
        engineNo: "ENG112233",
        year: "2021",
        currentKm: 30000,
        fuelType: "Petrol",
        transmission: "Manual",
        vin: "VIN112233"
      },
      customerInfo: {
        name: "Nikhil Joshi",
        whatsapp: "9988776655",
        email: "nikhil@example.com",
        address: "Nashik, Maharashtra"
      },
      services: [
        { serviceName: "Battery Check", price: 500, technician: "Amit" },
        { serviceName: "Battery Replacement", price: 1000, technician: "Amit" }
      ],
      parts: [
        { part: "Battery", quantity: 1, meg: "Amaron", mrp: 1100, rate: 1000, discount: 0, gst: 18, hsn: "8507", godown: "C" }
      ],
      financial: {
        totalPartsPrice: 1000,
        totalServicesAmount: 1500,
        advance: 1000,
        discount: 100,
        totalAmount: 2400,
        paymentStatus: "Unpaid"
      },
      jobInfo: {
        superAdvisor: "Mahesh",
        madeBy: "Reception",
        remark: "Battery warranty 2 years",
        jobStart: "2025-06-19T10:00",
        jobEnd: "2025-06-19T12:00"
      }
    }
  },
  {
    jobCardId: "MH13GH7890-202506200930",
    vehicleNo: "MH13GH7890",
    customerName: "Priya Desai",
    address: "Kolhapur, Maharashtra",
    whatsappNo: "9012345678",
     date:"2025-06-20",
    totalPartsPrice: 2200,
    totalServicesAmount: 2800,
    discount: 500,
    totalAmount: 4500,
    remark: "AC repair and gas refill",
    jobDetails: {
      vehicleInfo: {
        vehicleType: "Car",
        brand: "Toyota",
        model: "Innova",
        color: "Silver",
        engineNo: "ENG778899",
        year: "2018",
        currentKm: 85000,
        fuelType: "Diesel",
        transmission: "Manual",
        vin: "VIN778899"
      },
      customerInfo: {
        name: "Priya Desai",
        whatsapp: "9012345678",
        email: "priya@example.com",
        address: "Kolhapur, Maharashtra"
      },
      services: [
        { serviceName: "AC Service", price: 1800, technician: "Sameer" },
        { serviceName: "Gas Refill", price: 1000, technician: "Sameer" }
      ],
      parts: [
        { part: "AC Gas", quantity: 1, meg: "DuPont", mrp: 1500, rate: 1300, discount: 5, gst: 18, hsn: "8415", godown: "D" },
        { part: "AC Filter", quantity: 1, meg: "OEM", mrp: 1000, rate: 900, discount: 10, gst: 18, hsn: "8421", godown: "D" }
      ],
      financial: {
        totalPartsPrice: 2200,
        totalServicesAmount: 2800,
        advance: 3000,
        discount: 500,
        totalAmount: 4500,
        paymentStatus: "Paid"
      },
      jobInfo: {
        superAdvisor: "Nilesh",
        madeBy: "Reception",
        remark: "Recheck AC after 3 months",
        jobStart: "2025-06-20T09:30",
        jobEnd: "2025-06-20T12:00"
      }
    }
  },
  {
    jobCardId: "MH14AB1234-202506200945",
    vehicleNo: "MH14AB1234",
    customerName: "Amit Patil",
    address: "Pune, Maharashtra",
    whatsappNo: "9823456789",
    date: "2025-06-20",
    totalPartsPrice: 1800,
    totalServicesAmount: 2500,
    discount: 300,
    totalAmount: 4000,
    remark: "Brake check and replacement",
    jobDetails: {
      vehicleInfo: {
        vehicleType: "Car",
        brand: "Honda",
        model: "City",
        color: "White",
        engineNo: "ENG123456",
        year: "2019",
        currentKm: 65000,
        fuelType: "Petrol",
        transmission: "Automatic",
        vin: "VIN123456"
      },
      customerInfo: {
        name: "Amit Patil",
        whatsapp: "9823456789",
        email: "amit@example.com",
        address: "Pune, Maharashtra"
      },
      services: [
        { serviceName: "Brake Service", price: 1500, technician: "Arjun" },
        { serviceName: "Wheel Alignment", price: 1000, technician: "Arjun" }
      ],
      parts: [
        { part: "Brake Pad", quantity: 1, meg: "Brembo", mrp: 1000, rate: 900, discount: 10, gst: 18, hsn: "8708", godown: "A" },
        { part: "Wheel Nut", quantity: 4, meg: "OEM", mrp: 200, rate: 180, discount: 5, gst: 18, hsn: "7318", godown: "A" }
      ],
      financial: {
        totalPartsPrice: 1800,
        totalServicesAmount: 2500,
        advance: 2500,
        discount: 300,
        totalAmount: 4000,
        paymentStatus: "Pending"
      },
      jobInfo: {
        superAdvisor: "Kiran",
        madeBy: "Reception",
        remark: "Check brakes again in 1 month",
        jobStart: "2025-06-20T09:45",
        jobEnd: "2025-06-20T11:30"
      }
    }
  },
  {
    jobCardId: "MH12ZX4567-202506201000",
    vehicleNo: "MH12ZX4567",
    customerName: "Sneha Kulkarni",
    address: "Satara, Maharashtra",
    whatsappNo: "9876543210",
    date: "2025-06-20",
    totalPartsPrice: 3000,
    totalServicesAmount: 3200,
    discount: 500,
    totalAmount: 5700,
    remark: "Suspension and oil service",
    jobDetails: {
      vehicleInfo: {
        vehicleType: "Car",
        brand: "Hyundai",
        model: "Creta",
        color: "Black",
        engineNo: "ENG456789",
        year: "2020",
        currentKm: 42000,
        fuelType: "Diesel",
        transmission: "Manual",
        vin: "VIN456789"
      },
      customerInfo: {
        name: "Sneha Kulkarni",
        whatsapp: "9876543210",
        email: "sneha@example.com",
        address: "Satara, Maharashtra"
      },
      services: [
        { serviceName: "Suspension Check", price: 1800, technician: "Ramesh" },
        { serviceName: "Oil Service", price: 1400, technician: "Ramesh" }
      ],
      parts: [
        { part: "Suspension Kit", quantity: 1, meg: "Gabriel", mrp: 2000, rate: 1800, discount: 5, gst: 18, hsn: "8708", godown: "B" },
        { part: "Engine Oil", quantity: 3, meg: "Castrol", mrp: 500, rate: 400, discount: 10, gst: 18, hsn: "2710", godown: "B" }
      ],
      financial: {
        totalPartsPrice: 3000,
        totalServicesAmount: 3200,
        advance: 3000,
        discount: 500,
        totalAmount: 5700,
        paymentStatus: "Paid"
      },
      jobInfo: {
        superAdvisor: "Meena",
        madeBy: "Reception",
        remark: "Next oil service at 55,000km",
        jobStart: "2025-06-20T10:00",
        jobEnd: "2025-06-20T13:00"
      }
    }
  },
  {
  jobCardId: "MH15CD7890-202506201015",
  vehicleNo: "MH15CD7890",
  customerName: "Rajesh Sawant",
  address: "Sangli, Maharashtra",
  whatsappNo: "9898989898",
  date: "2025-06-20",
  totalPartsPrice: 2500,
  totalServicesAmount: 3000,
  discount: 400,
  totalAmount: 5100,
  remark: "Clutch replacement",
  jobDetails: {
    vehicleInfo: {
      vehicleType: "Car",
      brand: "Maruti",
      model: "Swift",
      color: "Red",
      engineNo: "ENG334455",
      year: "2017",
      currentKm: 78000,
      fuelType: "Petrol",
      transmission: "Manual",
      vin: "VIN334455"
    },
    customerInfo: {
      name: "Rajesh Sawant",
      whatsapp: "9898989898",
      email: "rajesh@example.com",
      address: "Sangli, Maharashtra"
    },
    services: [
      { serviceName: "Clutch Replacement", price: 3000, technician: "Anil" }
    ],
    parts: [
      { part: "Clutch Plate", quantity: 1, meg: "OEM", mrp: 2500, rate: 2300, discount: 5, gst: 18, hsn: "8708", godown: "C" }
    ],
    financial: {
      totalPartsPrice: 2500,
      totalServicesAmount: 3000,
      advance: 3000,
      discount: 400,
      totalAmount: 5100,
      paymentStatus: "Pending"
    },
    jobInfo: {
      superAdvisor: "Sonal",
      madeBy: "Reception",
      remark: "Check gear shift after 2 weeks",
      jobStart: "2025-06-20T10:15",
      jobEnd: "2025-06-20T12:45"
    }
  }
},
{
  jobCardId: "MH16EF2345-202506201030",
  vehicleNo: "MH16EF2345",
  customerName: "Deepak Jadhav",
  address: "Nashik, Maharashtra",
  whatsappNo: "9123456780",
  date: "2025-06-20",
  totalPartsPrice: 2000,
  totalServicesAmount: 1500,
  discount: 200,
  totalAmount: 3300,
  remark: "Battery replacement",
  jobDetails: {
    vehicleInfo: {
      vehicleType: "Car",
      brand: "Tata",
      model: "Tiago",
      color: "Blue",
      engineNo: "ENG112233",
      year: "2021",
      currentKm: 23000,
      fuelType: "Petrol",
      transmission: "Automatic",
      vin: "VIN112233"
    },
    customerInfo: {
      name: "Deepak Jadhav",
      whatsapp: "9123456780",
      email: "deepak@example.com",
      address: "Nashik, Maharashtra"
    },
    services: [
      { serviceName: "Battery Installation", price: 1500, technician: "Shubham" }
    ],
    parts: [
      { part: "Battery", quantity: 1, meg: "Amaron", mrp: 2200, rate: 2000, discount: 5, gst: 18, hsn: "8507", godown: "A" }
    ],
    financial: {
      totalPartsPrice: 2000,
      totalServicesAmount: 1500,
      advance: 3300,
      discount: 200,
      totalAmount: 3300,
      paymentStatus: "Paid"
    },
    jobInfo: {
      superAdvisor: "Ajay",
      madeBy: "Reception",
      remark: "Check charging system in 1 month",
      jobStart: "2025-06-20T10:30",
      jobEnd: "2025-06-20T11:30"
    }
  }
},
{
  jobCardId: "MH17GH1234-202506201045",
  vehicleNo: "MH17GH1234",
  customerName: "Meera Naik",
  address: "Solapur, Maharashtra",
  whatsappNo: "9345678901",
  date: "2025-06-20",
  totalPartsPrice: 1200,
  totalServicesAmount: 2500,
  discount: 100,
  totalAmount: 3600,
  remark: "Headlight repair and polish",
  jobDetails: {
    vehicleInfo: {
      vehicleType: "Car",
      brand: "Kia",
      model: "Seltos",
      color: "Grey",
      engineNo: "ENG556677",
      year: "2022",
      currentKm: 15000,
      fuelType: "Petrol",
      transmission: "Manual",
      vin: "VIN556677"
    },
    customerInfo: {
      name: "Meera Naik",
      whatsapp: "9345678901",
      email: "meera@example.com",
      address: "Solapur, Maharashtra"
    },
    services: [
      { serviceName: "Headlight Polish", price: 1000, technician: "Ganesh" },
      { serviceName: "Light Repair", price: 1500, technician: "Ganesh" }
    ],
    parts: [
      { part: "LED Bulb", quantity: 2, meg: "Philips", mrp: 700, rate: 600, discount: 10, gst: 18, hsn: "8512", godown: "D" }
    ],
    financial: {
      totalPartsPrice: 1200,
      totalServicesAmount: 2500,
      advance: 2000,
      discount: 100,
      totalAmount: 3600,
      paymentStatus: "Pending"
    },
    jobInfo: {
      superAdvisor: "Neha",
      madeBy: "Reception",
      remark: "Check for fogging issue",
      jobStart: "2025-06-20T10:45",
      jobEnd: "2025-06-20T12:15"
    }
  }
}
];

const VehicleHistory = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewData, setViewData] = useState(null);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
   const recordsPerPage = 7;
  const [finalAmountFilter, setFinalAmountFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);



  useEffect(() => {
    setData(sampleData);
  }, []);

 const handlePrint = () => {
  // Clone the table so we can remove the Actions column for printing
  const originalTable = document.querySelector(".vh-table").cloneNode(true);

  // Remove the last column from header
  const headerRow = originalTable.querySelector("thead tr");
  if (headerRow) headerRow.removeChild(headerRow.lastElementChild);

  // Remove the last column from all body rows
  originalTable.querySelectorAll("tbody tr").forEach(row => {
    row.removeChild(row.lastElementChild);
  });

  const printWin = window.open("", "", "height=900,width=1200");
  printWin.document.write(`
    <html>
    <head>
      <title>Vehicle History - AnshPath</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          color: #000;
        }
        h1 {
          text-align: center;
          color: #4361ee;
          font-size: 28px;
          margin-bottom: 0;
        }
        h4 {
          text-align: center;
          font-size: 14px;
          color: #333;
          margin-top: 4px;
          margin-bottom: 20px;
        }
        h2 {
          text-align: center;
          color: #000;
          font-size: 20px;
          margin-bottom: 20px;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          font-size: 12px;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid #000;
          padding: 6px;
          text-align: center;
        }
        th {
          background-color: #f0f0f0;
        }
      </style>
    </head>
    <body>
      <h1><strong style="color:#4361ee;">AnshPath</strong></h1>
      <h4>Technologies Private Limited</h4>
      <h2>Vehicle History</h2>
      ${originalTable.outerHTML}
    </body>
    </html>
  `);
  printWin.document.close();
  printWin.focus();
  printWin.print();
};

  const handleExport = () => {
    const exportData = data.map(d => ({
      "Job Card No.": d.jobCardId,
      "Vehicle No.": d.vehicleNo,
      "Customer Name": d.customerName,
      "Contact": d.whatsappNo,
      "Parts Total": d.totalPartsPrice,
      "Service Total": d.totalServicesAmount,
      Discount: d.discount,
      "Final Amount": d.totalAmount,
      Remark: d.remark
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vehicle History");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "Vehicle_History.xlsx");
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const parseMMDDYYYY = (str) => {
  const [mm, dd, yyyy] = str.split('-');
  return new Date(`${yyyy}-${mm}-${dd}`);
};


 const applyFilters = (list) => {
  return list.filter(item => {
    // 🔍 Search filter
    const matchesSearch = search === "" ||
      item.vehicleNo.toLowerCase().includes(search.toLowerCase()) ||
      item.customerName.toLowerCase().includes(search.toLowerCase());

    // 💰 Amount filter
    const matchesAmount = finalAmountFilter === "" ||
      parseFloat(item.finalAmount) >= parseFloat(finalAmountFilter);

    // 📅 Date filter
    const jobDate = new Date(item.jobDetails.jobInfo.jobStart);
    const selectedDate = dateRange.from ? new Date(dateRange.from) : null;

    const isSameDay = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    const dateMatches = selectedDate ? isSameDay(jobDate, selectedDate) : true;

    // ✅ Final check
    return matchesSearch && matchesAmount && dateMatches;
  });
};

  const sortData = (list) => {
    if (!sortField) return list;
    return [...list].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (sortField === "jobDetails.jobInfo.jobStart") {
        valA = new Date(a.jobDetails.jobInfo.jobStart);
        valB = new Date(b.jobDetails.jobInfo.jobStart);
      }
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredData = applyFilters(data);
  const sortedData = sortData(filteredData);
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  return (
    <div className="vh-container">
      <h2 className="vh-title">Vehicle History</h2>

{/* Filter Section */}
<div className="vh-filters-container">
  <div>
    <label>Search</label>
    <input
      type="text"
      placeholder="Vehicle No. / Customer Name"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="vh-search-input"
    />
  </div>
  <div>
    <label>Date</label>
    <input
      type="date"
      value={dateRange.from}
      onChange={(e) => setDateRange({ from: e.target.value, to: e.target.value })}
      className="vh-date-input"
    />
  </div>
  <div>
    <label>Final Amount</label>
    <input
      type="number"
      placeholder="₹"
      value={finalAmountFilter}
      onChange={(e) => setFinalAmountFilter(e.target.value)}
    />
  </div>
</div>

{/* Move this BELOW the filters */}
<div className="vh-toolbar-buttons">
  <Button variant="primary" onClick={handlePrint}>
    <i className="bi bi-printer"></i> Print
  </Button>
  <Button variant="success" onClick={handleExport}>
    <i className="bi bi-file-earmark-excel"></i> Excel
  </Button>
</div>


      <div id="vh-table-container" className="vh-table-container">
        <table className="vh-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("jobDetails.jobInfo.jobStart")}>Job Card No. {sortField === "jobDetails.jobInfo.jobStart" && (sortOrder === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => handleSort("vehicleNo")}>Vehicle No. {sortField === "vehicleNo" && (sortOrder === "asc" ? "↑" : "↓")}</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th onClick={() => handleSort("date")}>Date{sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => handleSort("totalPartsPrice")}>Parts Total {sortField === "totalPartsPrice" && (sortOrder === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => handleSort("totalServicesAmount")}>Service Total {sortField === "totalServicesAmount" && (sortOrder === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => handleSort("discount")}>Discount {sortField === "discount" && (sortOrder === "asc" ? "↑" : "↓")}</th>
              <th onClick={() => handleSort("totalAmount")}>Final Amount {sortField === "totalAmount" && (sortOrder === "asc" ? "↑" : "↓")}</th>
              <th>Remark</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((d, idx) => (
              <tr key={idx}>
                <td>{d.jobCardId}</td>
                <td>{d.vehicleNo}</td>
                <td>{d.customerName}</td>
                <td>{d.address}</td>
                <td>{d.whatsappNo}</td>
                <td>{d.date}</td>
                <td>₹{d.totalPartsPrice}</td>
                <td>₹{d.totalServicesAmount}</td>
                <td>₹{d.discount}</td>
                <td>₹{d.totalAmount}</td>
                <td>{d.remark}</td>
                <td>

                  <button onClick={() => setSelectedItem(d)} className="btn btn-info btn-sm">View</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="vh-pagination d-flex justify-content-center mt-3">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            className={`vh-page-btn ${currentPage === idx + 1 ? "vh-page-active" : ""}`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
     {/* view model */}  


{selectedItem && (
  <div className="vh-custom-modal-overlay">
    <div className="vh-custom-modal">

      {/* Company Branding */}
      <div className="vh-branding-header">
      <div className="vh-modal-header blue-header">
        <h4><FaClipboardList className="vh-icon-white" /> Detailed Job Card View</h4>
        <button className="close-btn" onClick={() => setSelectedItem(null)}><FaTimes /></button>
      </div>

      <div className="vh-modal-body job-details-vh">
        <div className="vh-modal-grid">

          {/* Vehicle Info */}
          <div className="vh-modal-col">
            <h3><FaCar className="vh-icon" /> Vehicle Information</h3>
            <table className="vh-info-table">
              <tbody>
                <tr><td>Type</td><td>{selectedItem.jobDetails.vehicleInfo.vehicleType}</td></tr>
                <tr><td>Vehicle No</td><td>{selectedItem.vehicleNo}</td></tr>
                <tr><td>Brand</td><td>{selectedItem.jobDetails.vehicleInfo.brand}</td></tr>
                <tr><td>Model</td><td>{selectedItem.jobDetails.vehicleInfo.model}</td></tr>
                <tr><td>Color</td><td>{selectedItem.jobDetails.vehicleInfo.color}</td></tr>
                <tr><td>Engine No.</td><td>{selectedItem.jobDetails.vehicleInfo.engineNo}</td></tr>
                <tr><td>Year</td><td>{selectedItem.jobDetails.vehicleInfo.year}</td></tr>
                <tr><td>Current KM</td><td>{selectedItem.jobDetails.vehicleInfo.currentKm}</td></tr>
                <tr><td>Fuel Type</td><td>{selectedItem.jobDetails.vehicleInfo.fuelType}</td></tr>
                <tr><td>Transmission</td><td>{selectedItem.jobDetails.vehicleInfo.transmission}</td></tr>
                <tr><td>VIN</td><td>{selectedItem.jobDetails.vehicleInfo.vin}</td></tr>
              </tbody>
            </table>
          </div>

          {/* Customer Info */}
          <div className="vh-modal-col">
            <h3><FaUser className="vh-icon" /> Customer Information</h3>
            <table className="vh-info-table">
              <tbody>
                <tr><td>Name</td><td>{selectedItem.jobDetails.customerInfo.name}</td></tr>
                <tr><td>WhatsApp</td><td>{selectedItem.jobDetails.customerInfo.whatsapp}</td></tr>
                <tr><td>Email</td><td>{selectedItem.jobDetails.customerInfo.email}</td></tr>
                <tr><td>Address</td><td>{selectedItem.jobDetails.customerInfo.address}</td></tr>
              </tbody>
            </table>

            <h3><FaClipboardList className="vh-icon" /> Job Information</h3>
            <table className="vh-info-table">
              <tbody>
                <tr><td>Super Advisor</td><td>{selectedItem.jobDetails.jobInfo.superAdvisor}</td></tr>
                <tr><td>Made By</td><td>{selectedItem.jobDetails.jobInfo.madeBy}</td></tr>
                <tr><td>Remark</td><td>{selectedItem.jobDetails.jobInfo.remark}</td></tr>
                <tr><td>Job Start</td><td>{selectedItem.jobDetails.jobInfo.jobStart}</td></tr>
                <tr><td>Job End</td><td>{selectedItem.jobDetails.jobInfo.jobEnd}</td></tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Services Table */}
        <h3><FaWrench className="vh-icon" /> Services Performed</h3>
        <table className="vh-subtable">
          <thead>
            <tr>
              <th>Service Name</th><th>Price</th><th>Technician</th>
            </tr>
          </thead>
          <tbody>
            {selectedItem.jobDetails.services.map((s, i) => (
              <tr key={i}>
                <td>{s.serviceName}</td>
                <td>₹{s.price}</td>
                <td>{s.technician}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Parts Table */}
        <h3><FaCogs className="vh-icon" /> Parts Replaced</h3>
        <table className="vh-subtable">
          <thead>
            <tr>
              <th>Part</th><th>MEG</th><th>Qty</th><th>MRP</th><th>Rate</th><th>Discount %</th><th>GST %</th><th>HSN</th><th>Godown</th>
            </tr>
          </thead>
          <tbody>
            {selectedItem.jobDetails.parts.map((p, i) => (
              <tr key={i}>
                <td>{p.part}</td><td>{p.meg}</td><td>{p.quantity}</td><td>₹{p.mrp}</td>
                <td>₹{p.rate}</td><td>{p.discount}%</td><td>{p.gst}%</td><td>{p.hsn}</td><td>{p.godown}</td>
              </tr>
            ))}
          </tbody>
        </table>

       {/* Financials */}
<div className="vh-flex-row">
  <div className="vh-financial">
    <h3><FaClipboardList className="vh-icon" /> Financial Summary</h3>
    <table className="vh-financial-table">
      <tbody>
        <tr>
          <td><strong>Total Parts Price:</strong></td>
          <td>₹{selectedItem.jobDetails.financial.totalPartsPrice}</td>
        </tr>
        <tr>
          <td><strong>Total Services Amount:</strong></td>
          <td>₹{selectedItem.jobDetails.financial.totalServicesAmount}</td>
        </tr>
        <tr>
          <td><strong>Advance:</strong></td>
          <td>₹{selectedItem.jobDetails.financial.advance}</td>
        </tr>
        <tr>
          <td><strong>Discount:</strong></td>
          <td>₹{selectedItem.jobDetails.financial.discount}</td>
        </tr>
        <tr>
          <td><strong>Total Amount:</strong></td>
          <td>₹{selectedItem.jobDetails.financial.totalAmount}</td>
        </tr>
        <tr>
          <td><strong>Payment Status:</strong></td>
          <td>{selectedItem.jobDetails.financial.paymentStatus}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>
 </div>
      <div className="vh-modal-footer">
        <button className="btn btn-secondary" onClick={() => setSelectedItem(null)}>Close</button>
      </div>
    </div>
  </div>
)}

</div>
  );
};

export default VehicleHistory;