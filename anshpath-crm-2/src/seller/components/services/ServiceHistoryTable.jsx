import './ServiceHistoryTable.css';
import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
// import 'datatables.net-responsive-bs5';
import 'datatables.net-select-bs5';
import 'jszip';
import 'pdfmake';
import 'pdfmake/build/vfs_fonts';

// Import CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SERVICE_DATA = [
  {
    id: 'BK-1001',
    customer: 'John Smith',
    service: ['Premium Car Wash', 'Engine Check'],
    bookingDate: '2023-05-15 10:00',
    vehicleNo: 'MH12AB1234',
    serviceParts: ['Oil Filter', 'Engine Oil'],
    status: 'Completed',
    rejectionReason: '',
    rating: 4,
    revenue: 45.0,
    vehicleType: 'Car'
  },
  {
    id: 'BK-1002',
    customer: 'Sarah Johnson',
    service: ['Oil Change'],
    bookingDate: '2023-05-16 14:30',
    vehicleNo: 'MH12CD5678',
    serviceParts: ['Oil Filter', 'Engine Oil'],
    status: 'Rejected',
    rejectionReason: 'No available slots',
    rating: null,
    revenue: 0,
    vehicleType: 'SUV'
  },
  {
    id: 'BK-1003',
    customer: 'Mike Brown',
    service: ['Tire Rotation'],
    bookingDate: '2023-05-17 09:15',
    vehicleNo: 'MH12EF9012',
    serviceParts: ['Tire Balancing', 'Tire Rotation'],
    status: 'Cancelled',
    rejectionReason: 'Customer cancelled',
    rating: null,
    revenue: 0,
    vehicleType: 'Truck'
  },
  {
    id: 'BK-1004',
    customer: 'Emily Davis',
    service: ['Full Service'],
    bookingDate: '2023-05-18 11:45',
    vehicleNo: 'MH12GH3456',
    serviceParts: ['Oil Filter', 'Engine Oil', 'Air Filter'],
    status: 'Completed',
    rejectionReason: '',
    rating: 5,
    revenue: 120.0,
    vehicleType: 'Car'
  },
  {
    id: 'BK-1005',
    customer: 'David Wilson',
    service: ['Brake Inspection', 'Brake Replacement'],
    bookingDate: '2023-05-19 16:00',
    vehicleNo: 'MH12IJ7890',
    serviceParts: ['Brake Pads', 'Brake Oil'],
    status: 'Accepted',
    rejectionReason: '',
    rating: null,
    revenue: 0,
    vehicleType: 'Bike'
  },
  {
    id: 'BK-1006',
    customer: 'Lisa Miller',
    service: ['AC Service'],
    bookingDate: '2023-05-20 13:30',
    vehicleNo: 'MH12KL1234',
    serviceParts: ['AC Gas', 'AC Filter'],
    status: 'Completed',
    rejectionReason: '',
    rating: 3,
    revenue: 85.0,
    vehicleType: 'Car'
  },
  {
    id: 'BK-1007',
    customer: 'Robert Taylor',
    service:[ 'Battery Replacement'],
    bookingDate: '2023-05-21 10:45',
    vehicleNo: 'MH12MN5678',
    serviceParts: ['Battery'],
    status: 'Rejected',
    rejectionReason: 'Part not available',
    rating: null,
    revenue: 0,
    vehicleType: 'Scooter'
  }
];

const VEHICLE_TYPES = [
  'All',
  'Car',
  'SUV',
  'Truck',
  'Bike',
  'Scooter'
];

const STATUS_TYPES = [
  'All',
  'Completed',
  'Accepted',
  'Rejected',
  'Cancelled'
];

const DATE_RANGES = [
  { value: 'all', label: 'All' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' }
];

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'status-completed-SHT';
    case 'rejected':
      return 'status-rejected-SHT';
    case 'cancelled':
      return 'status-cancelled-SHT';
    case 'accepted':
      return 'status-accepted-SHT';
    default:
      return '';
  }
}

function renderRating(rating) {
  if (!rating) return 'N/A';
  return (
    `<span class="rating-stars-SHT">` +
    [1, 2, 3, 4, 5].map((star) =>
      `<i class="fas fa-star${star <= rating ? ' filled' : ''}"></i>`
    ).join('') +
    `</span>`
  );
}

const columns = [
  { title: "Booking ID", data: "id" },
  { title: "Customer Name", data: "customer" },
  { title: "Vehicle Type", data: "vehicleType" },
  { title: "Vehicle No", data: "vehicleNo" },
  { title: "Service", data: "service" ,
     render: function (data) {
      if (!data || !data.length) return 'N/A';
      return `<ol style="padding-left:18px;margin:0;">${data.map(part => `<li>${part}</li>`).join('')}</ol>`;
    }
  },
  {
    title: "Service Parts",
    data: "serviceParts",
    render: function (data) {
      if (!data || !data.length) return 'N/A';
      return `<ol style="padding-left:18px;margin:0;">${data.map(part => `<li>${part}</li>`).join('')}</ol>`;
    }
  },
  { title: "Booking Date & Time", data: "bookingDate" },
  {
    title: "Status",
    data: "status",
    render: function (data, type, row) {
      return `<span class="${getStatusClass(data)}">${data}</span>`;
    }
  },
  {
    title: "Rejection Reason",
    data: null,
    render: function (data, type, row) {
      if ((row.status === 'Rejected' || row.status === 'Cancelled') && row.rejectionReason)
        return row.rejectionReason;
      return 'N/A';
    }
  },
  {
    title: "Feedback/Rating",
    data: null,
    render: function (data, type, row) {
      if (row.status === 'Completed')
        return renderRating(row.rating);
      return 'N/A';
    }
  },
  {
    title: "Revenue",
    data: null,
    render: function (data, type, row) {
      if (row.status === 'Completed' && row.revenue)
        return `₹${row.revenue.toFixed(2)}`;
      return 'N/A';
    }
  }
];

const ServiceHistoryTable = () => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    status: 'All',
    vehicleType: 'All',
    search: ''
  });
  const tableRef = useRef(null);
  const dtInstance = useRef(null);

  // Filtering logic
  const filteredData = SERVICE_DATA.filter((row) => {
    if (filters.status !== 'All' && row.status !== filters.status) return false;
    if (filters.vehicleType !== 'All' && row.vehicleType !== filters.vehicleType) return false;
    if (
      filters.search &&
      !(
        row.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        row.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
        row.service.join(' ').toLowerCase().includes(filters.search.toLowerCase())
      )
    )
      return false;
    return true;
  });

  // DataTable integration
  useEffect(() => {
    if (dtInstance.current) {
      dtInstance.current.clear();
      dtInstance.current.rows.add(filteredData);
      dtInstance.current.draw();
      return;
    }
    dtInstance.current = $(tableRef.current).DataTable({
      dom: '<"top"B>rt<"bottom"lip><"clear">',
      data: filteredData,
      columns: columns,
      pageLength: 10,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      // responsive: true,
      scrollX: true,
      buttons: [
        {
          extend: 'colvis',
          text: '<i class="fas fa-eye"></i> Column Visibility',
          className: 'btn btn-colvis-SHT btn-SHT'
        },
        {
          extend: 'copy',
          text: '<i class="fas fa-copy"></i> Copy',
          className: 'btn btn-copy-SHT btn-SHT'
        },
        {
          extend: 'csv',
          text: '<i class="fas fa-file-csv"></i> CSV',
          className: 'btn btn-csv-SHT btn-SHT'
        },
        {
          extend: 'excel',
          text: '<i class="fas fa-file-excel"></i> Excel',
          className: 'btn btn-excel-SHT btn-SHT',
        },
        {
          extend: 'pdf',
          text: '<i class="fas fa-file-pdf"></i> PDF',
          className: 'btn btn-pdf-SHT btn-SHT',
          orientation: 'landscape',
          title: '',
          customize: function (doc) {
            const now = new Date();
            const dateStr = now.toLocaleDateString();
            const timeStr = now.toLocaleTimeString();
            doc.content.splice(0, 0,
              {
                text: 'Anshpath Pvt Ltd',
                fontSize: 16,
                alignment: 'center',
                margin: [0, 0, 0, 4],
                bold: true,
                color: '#4361ee'
              },
              {
                text: 'Service History Table',
                fontSize: 14,
                alignment: 'center',
                margin: [0, 0, 0, 8],
                bold: true
              },
              {
                text: `Date: ${dateStr}   Time: ${timeStr}`,
                fontSize: 10,
                alignment: 'left',
                margin: [0, 0, 0, 12],
                color: '#888'
              }
            );
          }
        },
        {
          extend: 'print',
          text: '<i class="fas fa-print"></i> Print',
          className: 'btn btn-print-SHT btn-SHT',
          title: '',
          customize: function (win) {
            const css = '@page { size: landscape; }';
            const head = win.document.head || win.document.getElementsByTagName('head')[0];
            const style = win.document.createElement('style');
            style.type = 'text/css';
            style.media = 'print';
            if (style.styleSheet) {
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(win.document.createTextNode(css));
            }
            head.appendChild(style);

            //  Insert custom header
            const printHeader = `
      <div style="text-align:center; margin-bottom: 8px;">
        <div style="font-size:20px; font-weight:bold; color:#4361ee;">Anshpath Pvt Ltd</div>
        <div style="font-size:15px; font-weight:bold; margin-top:2px;">Service History Table</div>
      </div>
    `;
            // Insert at the top of the body
            $(win.document.body).prepend(printHeader);
          }
        }
      ],
      language: {
        lengthMenu: "Show _MENU_ entries",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        infoEmpty: "Showing 0 to 0 of 0 entries",
        infoFiltered: "(filtered from _MAX_ total entries)",
        paginate: {
          next: "Next",
          previous: "Previous"
        }
      },
      initComplete: function () {
        $('.dt-buttons').addClass('btn-group-SHT');
        $('.dataTables_paginate').addClass('dataTables_paginate-SHT');
        $('.paginate_button').addClass('paginate_button-SHT');
        $('.dt-button-collection').addClass('dt-button-collection-SHT');
        $('.dt-button').addClass('dt-button-SHT');
      }
    });
    return () => {
      if (dtInstance.current) {
        dtInstance.current.destroy();
        dtInstance.current = null;
      }
    };
    // eslint-disable-next-line
  }, []);

  // Update table data on filter change
  useEffect(() => {
    if (dtInstance.current) {
      dtInstance.current.clear();
      dtInstance.current.rows.add(filteredData);
      dtInstance.current.draw();
    }
  }, [filteredData]);

  return (
    <div className="container premium-form-container-SHT">
      <i className="fas fa-history floating-icon-SHT floating-icon-1-SHT"></i>
      <i className="fas fa-clipboard-list floating-icon-SHT floating-icon-2-SHT"></i>

      <div className="premium-form-header-SHT">
        <h2>
          <i className="fas fa-clock-rotate-left me-2"></i>
          Service History
        </h2>
        <p className="text-muted">Track all your past service records and analytics</p>
      </div>

      {/* Filters */}
      <div className="filters-container-SHT mb-4">
        <div className="row g-2">
          <div className="col-md-3 col-12">
            <label className="form-label">Date Range</label>
            <select
              name="dateRange"
              className="form-select filter-select-SHT"
              value={filters.dateRange}
              onChange={e => setFilters(f => ({ ...f, dateRange: e.target.value }))}
            >
              {DATE_RANGES.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 col-12">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select filter-select-SHT"
              value={filters.status}
              onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
            >
              {STATUS_TYPES.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 col-12">
            <label className="form-label">Vehicle Type</label>
            <select
              name="vehicleType"
              className="form-select filter-select-SHT"
              value={filters.vehicleType}
              onChange={e => setFilters(f => ({ ...f, vehicleType: e.target.value }))}
            >
              {VEHICLE_TYPES.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 col-12">
            <label className="form-label">Search</label>
            <input
              type="text"
              className="form-control filter-select-SHT"
              placeholder="Booking ID, Customer, Service"
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive-SHT">
        <table
          ref={tableRef}
          id="serviceHistoryTable-SHT"
          className="table-SHT table-striped-SHT table-hover-SHT"
          style={{ width: '100%', minWidth: 900 }}
        >
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer Name</th>
              <th>Vehicle Type</th>
              <th>Vehicle No</th>
              <th>Service</th>
              <th>Service Parts</th>
              <th>Booking Date & Time</th>
              <th>Status</th>
              <th>Rejection Reason</th>
              <th>Feedback/Rating</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {/* DataTables will render tbody */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceHistoryTable;