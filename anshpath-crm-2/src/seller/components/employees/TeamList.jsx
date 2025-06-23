import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-responsive-bs5';
import 'datatables.net-select-bs5';
import 'jszip';
import 'pdfmake';
import 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
import { 
  FaEdit, FaTrash, FaUser, FaPhoneAlt, FaEnvelope, FaCalendarAlt, 
  FaMoneyBillWave, FaIdCard, FaHome, FaUserFriends, FaUniversity, 
  FaCreditCard, FaFileAlt, FaSave, FaUndo, FaTimes 
} from 'react-icons/fa';

// Import CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './TeamList.css';

const isDarkMode = () => document.body.classList.contains('dark-mode-HDW-01');
const TeamList = () => {
  // Expanded employee data for realism
  const initialEmployees = [
    {
      id: 1,
      empName: "John Doe",
      contMobNo: "9876543210",
      joiningDate: "2020-05-15",
      email: "john.doe@example.com",
      dob: "1985-08-20",
      salary: 45000,
      empType: "Full Time",
      empAddress: "123 Main St, City, State",
      contactPerson: "Jane Doe",
      mobNo: "9876543211",
      bank: "State Bank",
      acNo: "1234567890",
      ifsCode: "SBIN0001234",
      panNo: "ABCDE1234F"
    },
    {
      id: 2,
      empName: "Jane Smith",
      contMobNo: "8765432109",
      joiningDate: "2021-02-10",
      email: "jane.smith@example.com",
      dob: "1990-11-25",
      salary: 38000,
      empType: "Part Time",
      empAddress: "456 Oak Ave, City, State",
      contactPerson: "John Smith",
      mobNo: "8765432110",
      bank: "National Bank",
      acNo: "0987654321",
      ifsCode: "NATB0005678",
      panNo: "FGHIJ5678K"
    },
    {
      id: 3,
      empName: "Amit Patel",
      contMobNo: "9123456780",
      joiningDate: "2019-07-01",
      email: "amit.patel@example.com",
      dob: "1988-03-12",
      salary: 52000,
      empType: "Full Time",
      empAddress: "789 Pine Rd, City, State",
      contactPerson: "Rina Patel",
      mobNo: "9123456781",
      bank: "Axis Bank",
      acNo: "1122334455",
      ifsCode: "AXIS0001122",
      panNo: "KLMNO1234P"
    },
    {
      id: 4,
      empName: "Sara Lee",
      contMobNo: "9988776655",
      joiningDate: "2022-01-20",
      email: "sara.lee@example.com",
      dob: "1992-09-30",
      salary: 41000,
      empType: "Contract",
      empAddress: "321 Maple St, City, State",
      contactPerson: "Tom Lee",
      mobNo: "9988776656",
      bank: "ICICI Bank",
      acNo: "5566778899",
      ifsCode: "ICIC0005566",
      panNo: "QRSTU5678V"
    },
    {
      id: 5,
      empName: "Rohit Sharma",
      contMobNo: "9001122334",
      joiningDate: "2018-11-11",
      email: "rohit.sharma@example.com",
      dob: "1987-05-22",
      salary: 60000,
      empType: "Full Time",
      empAddress: "654 Cedar Ave, City, State",
      contactPerson: "Priya Sharma",
      mobNo: "9001122335",
      bank: "HDFC Bank",
      acNo: "6677889900",
      ifsCode: "HDFC0006677",
      panNo: "VWXYZ9876A"
    },
    {
      id: 6,
      empName: "Emily Clark",
      contMobNo: "8899001122",
      joiningDate: "2023-03-05",
      email: "emily.clark@example.com",
      dob: "1995-12-10",
      salary: 35000,
      empType: "Temporary",
      empAddress: "987 Spruce Blvd, City, State",
      contactPerson: "Anna Clark",
      mobNo: "8899001123",
      bank: "Kotak Bank",
      acNo: "3344556677",
      ifsCode: "KKBK0003344",
      panNo: "ABCDE5678F"
    },
    {
      id: 7,
      empName: "Vikram Singh",
      contMobNo: "9011223344",
      joiningDate: "2017-08-18",
      email: "vikram.singh@example.com",
      dob: "1983-04-15",
      salary: 70000,
      empType: "Full Time",
      empAddress: "222 Willow Way, City, State",
      contactPerson: "Sunita Singh",
      mobNo: "9011223345",
      bank: "Punjab Bank",
      acNo: "7788990011",
      ifsCode: "PUNB0007788",
      panNo: "LMNOP4321Q"
    },
    {
      id: 8,
      empName: "Priya Nair",
      contMobNo: "8112233445",
      joiningDate: "2020-10-10",
      email: "priya.nair@example.com",
      dob: "1991-06-18",
      salary: 48000,
      empType: "Part Time",
      empAddress: "333 Palm Dr, City, State",
      contactPerson: "Arun Nair",
      mobNo: "8112233446",
      bank: "SBI",
      acNo: "2233445566",
      ifsCode: "SBIN0002233",
      panNo: "QRSTU1234V"
    },
    {
      id: 9,
      empName: "David Kim",
      contMobNo: "7223344556",
      joiningDate: "2016-04-22",
      email: "david.kim@example.com",
      dob: "1980-02-28",
      salary: 80000,
      empType: "Full Time",
      empAddress: "444 Oak Cir, City, State",
      contactPerson: "Lisa Kim",
      mobNo: "7223344557",
      bank: "Yes Bank",
      acNo: "4455667788",
      ifsCode: "YESB0004455",
      panNo: "ABCDE8765F"
    },
    {
      id: 10,
      empName: "Meera Joshi",
      contMobNo: "6334455667",
      joiningDate: "2021-12-01",
      email: "meera.joshi@example.com",
      dob: "1993-07-09",
      salary: 39000,
      empType: "Contract",
      empAddress: "555 Elm St, City, State",
      contactPerson: "Raj Joshi",
      mobNo: "6334455668",
      bank: "IndusInd Bank",
      acNo: "5566778899",
      ifsCode: "INDB0005566",
      panNo: "FGHIJ1234K"
    }
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [editEmployee, setEditEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    empName: '',
    contMobNo: '',
    joiningDate: '',
    email: '',
    dob: '',
    salary: '',
    empType: '',
    empAddress: '',
    contactPerson: '',
    mobNo: '',
    bank: '',
    acNo: '',
    ifsCode: '',
    panNo: ''
  });

  const darkModeClass = isDarkMode() ? 'dark-mode-HDW-01' : '';

  // Initialize DataTable with enhanced configuration
   useEffect(() => {
    const table = $('#employeeTable-S-E-EL-032').DataTable({
      dom: '<"top"<"d-flex flex-wrap align-items-center justify-content-between gap-2 dataTables-toolbar-S-E-EL-032"Bf>>rt<"bottom"<"d-flex flex-wrap align-items-center justify-content-between"lip>>',
      buttons: [
        {
          extend: 'colvis',
          text: '<i class="fas fa-eye"></i> Column Visibility',
          className: 'btn btn-colvis-S-E-EL-032'
        },
        {
          extend: 'copy',
          text: '<i class="fas fa-copy"></i> Copy',
          className: 'btn btn-copy-S-E-EL-032',
          exportOptions: {
            columns: ':not(:last-child)' // Exclude Actions column
          }
        },
        {
          extend: 'csv',
          text: '<i class="fas fa-file-csv"></i> CSV',
          className: 'btn btn-csv-S-E-EL-032',
          exportOptions: {
            columns: ':not(:last-child)' // Exclude Actions column
          }
        },
        {
          extend: 'excel',
          text: '<i class="fas fa-file-excel"></i> Excel',
          className: 'btn btn-excel-S-E-EL-032',
          exportOptions: {
            columns: ':not(:last-child)' // Exclude Actions column
          }
        },
        {
          extend: 'pdf',
          text: '<i class="fas fa-file-pdf"></i> PDF',
          className: 'btn btn-pdf-S-E-EL-032',
          exportOptions: {
            columns: ':not(:last-child)' // Exclude Actions column
          },
          customize: function (doc) {
            doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
          }
        },
        {
          extend: 'print',
          text: '<i class="fas fa-print"></i> Print',
          className: 'btn btn-print-S-E-EL-032',
          exportOptions: {
            columns: ':not(:last-child)' // Exclude Actions column
          },
          customize: function (win) {
            // Remove all elements that might contain Vite/React branding
            $(win.document.body).find('*').each(function() {
              const $el = $(this);
              // Remove elements with class names containing vite or react
              if ($el.attr('class') && /vite|react/i.test($el.attr('class'))) {
                $el.remove();
              }
              // Remove elements with IDs containing vite or react
              if ($el.attr('id') && /vite|react/i.test($el.attr('id'))) {
                $el.remove();
              }
              // Remove elements containing text with vite or react
              if (/vite|react/i.test($el.text())) {
                $el.remove();
              }
            });

            // Remove any script tags
            $(win.document.body).find('script').remove();

            // Add custom header
            const now = new Date();
            const dateStr = now.toLocaleDateString();
            const timeStr = now.toLocaleTimeString();
            const customHeader = win.document.createElement('div');
            customHeader.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;';
            customHeader.innerHTML = `
              <div style="font-size:1em;color:#23326d;font-weight:500;">Printed on: ${dateStr} at ${timeStr}</div>
              <div style="text-align:center;flex:1;">
                <h2 style="margin:0;color:#23326d;font-size:2em;font-weight:700;">AnshPath</h2>
                <div style="font-size:1.3em;color:#23326d;font-weight:600;">Employee List</div>
              </div>
            `;
            win.document.body.insertBefore(customHeader, win.document.body.firstChild);

            // Ensure table is well structured and full width
            $(win.document.body).find('table').addClass('print-table-S-E-EL-032');
            $(win.document.body).find('table').css({
              width: '100%',
              minWidth: '100%',
              fontSize: '1rem',
              border: '2px solid #23326d',
              borderRadius: '0',
              borderCollapse: 'collapse',
            });
            $(win.document.body).find('th, td').css({
              border: '1px solid #23326d',
              color: '#23326d',
              background: '#fff',
              padding: '8px 12px',
            });
            $(win.document.body).find('th').css({
              background: '#23326d',
              color: '#fff',
            });

            // Remove any remaining empty divs or elements
            $(win.document.body).find('div:empty').remove();
          }
        }
      ],
      pageLength: 10,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      responsive: false, // Disable DataTables responsive column hiding
      scrollX: true,     // Enable horizontal scroll for all columns
      order: [[0, 'asc']], // Default sorting by ID
      pagingType: 'full_numbers',
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search employees...",
        
        lengthMenu: "Show _MENU_ entries",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        infoEmpty: "Showing 0 to 0 of 0 entries",
        infoFiltered: "(filtered from _MAX_ total entries)",
        
        paginate: {
           first: '<i class="fas fa-angle-double-left"></i>',
      previous: '<i class="fas fa-angle-left"></i>',
      next: '<i class="fas fa-angle-right"></i>',
      last: '<i class="fas fa-angle-double-right"></i>'
        }
      },
      initComplete: function() {
        
        // Add custom class to the search input wrapper
    $('.dataTables_filter').addClass('search-container-S-E-EL-032');
    
    // Style the search input
    $('.dataTables_filter input').attr('placeholder', 'Search employees...');
    
    // Ensure the search container takes full width on mobile
    if (window.innerWidth < 768) {
      $('.dataTables_filter').css('width', '100%');
    }
  
        // Style the toolbar container for buttons (left) and search (right)
        const $toolbar = $('.dataTables-toolbar-S-E-EL-032');
        $toolbar.css({
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '18px',
        });
        // Style the buttons group (left)
        $toolbar.find('.dt-buttons').addClass('btn-group-S-E-EL-032');
        $toolbar.find('.dt-buttons').css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'flex-start',
          alignItems: 'center',
          margin: 0,
        });
        $toolbar.find('.btn').css({
          minWidth: '120px',
          fontSize: '1em',
          padding: '10px 18px',
          margin: '0',
          boxShadow: '0 2px 8px rgba(67,97,238,0.08)',
        });
        // Style the search bar (right)
        $toolbar.find('.dataTables_filter').css({
          margin: 0,
          flex: '1 1 320px',
          minWidth: '220px',
          maxWidth: '420px',
          justifyContent: 'flex-end',
          display: 'flex',
        });
        $toolbar.find('.dataTables_filter label').css({
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          margin: 0,
        });
        $toolbar.find('.dataTables_filter input').css({
          width: '100%',
          minWidth: '180px',
          maxWidth: '420px',
          border: '2px solid #4361ee',
          borderRadius: '24px',
          padding: '10px 18px',
          fontSize: '1.08em',
          background: '#f8f9fa',
          color: '#23326d',
          boxShadow: '0 2px 8px rgba(67,97,238,0.08)',
          transition: 'border 0.2s, box-shadow 0.2s',
        });
        $toolbar.find('.dataTables_filter input').on('focus', function() {
          $(this).css({
            border: '2px solid #3f37c9',
            boxShadow: '0 0 0 2px #4cc9f0',
          });
        }).on('blur', function() {
          $(this).css({
            border: '2px solid #4361ee',
            boxShadow: '0 2px 8px rgba(67,97,238,0.08)',
          });
        });
        // Responsive: stack on small screens
        if (window.innerWidth < 600) {
          $toolbar.css({
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: '10px',
          });
          $toolbar.find('.dt-buttons').css({
            width: '100%',
            justifyContent: 'center',
          });
          $toolbar.find('.btn').css({
            width: '100%',
            minWidth: 'unset',
          });
          $toolbar.find('.dataTables_filter').css({
            width: '100%',
            maxWidth: '100%',
            justifyContent: 'center',
          });
        }
      },
      columnDefs: [
        { targets: '_all', orderable: true }, // Make all columns sortable
        { targets: '_all', className: 'dt-center' } // Center align all columns
      ]
    });

    // Add search icon to the search bar
    setTimeout(() => {
     const filterLabel = $('.search-container-S-E-EL-032 .dataTables_filter label');
      if (filterLabel.length && !filterLabel.find('.search-icon-S-E-EL-032').length) {
        filterLabel.prepend(`
          <span class="search-icon-S-E-EL-032">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="2"/>
              <line x1="14.4142" y1="14.7071" x2="18" y2="18.2929" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
        `);
      }
    }, 100);

    return () => {
      table.destroy();
    };
  }, [employees]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setFormData({
      empName: employee.empName,
      contMobNo: employee.contMobNo,
      joiningDate: employee.joiningDate,
      email: employee.email,
      dob: employee.dob,
      salary: employee.salary,
      empType: employee.empType,
      empAddress: employee.empAddress,
      contactPerson: employee.contactPerson,
      mobNo: employee.mobNo,
      bank: employee.bank,
      acNo: employee.acNo,
      ifsCode: employee.ifsCode,
      panNo: employee.panNo
    });
    setIsEditing(true);
  };

  const handleReset = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will reset all form fields!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4361ee',
      cancelButtonColor: '#ef233c',
      confirmButtonText: 'Yes, reset it!',
      background: isDarkMode() ? '#23272f' : '#fff',
      color: isDarkMode() ? '#e0e0e0' : '#212529',
      customClass: {
        popup: isDarkMode() ? 'dark-swal' : '',
        title: isDarkMode() ? 'dark-swal-title' : '',
        content: isDarkMode() ? 'dark-swal-content' : '',
        confirmButton: isDarkMode() ? 'dark-swal-confirm' : '',
        cancelButton: isDarkMode() ? 'dark-swal-cancel' : ''
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({
          empName: '',
          contMobNo: '',
          joiningDate: '',
          email: '',
          dob: '',
          salary: '',
          empType: '',
          empAddress: '',
          contactPerson: '',
          mobNo: '',
          bank: '',
          acNo: '',
          ifsCode: '',
          panNo: ''
        });
        Swal.fire({
          title: 'Reset!',
          text: 'Form has been reset.',
          icon: 'success',
          background: isDarkMode() ? '#23272f' : '#fff',
          color: isDarkMode() ? '#e0e0e0' : '#212529',
          customClass: {
            popup: isDarkMode() ? 'dark-swal' : '',
            title: isDarkMode() ? 'dark-swal-title' : '',
            content: isDarkMode() ? 'dark-swal-content' : '',
            confirmButton: isDarkMode() ? 'dark-swal-confirm' : ''
          }
        });
      }
    });
  };

  // Update the delete confirmation Swal.fire calls to ensure dark mode is applied:
const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this employee!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4361ee',
    cancelButtonColor: '#ef233c',
    confirmButtonText: 'Yes, delete it!',
    background: isDarkMode() ? '#23272f' : '#fff',
    color: isDarkMode() ? '#e0e0e0' : '#212529',
    customClass: {
      popup: isDarkMode() ? 'dark-swal' : '',
      container: isDarkMode() ? 'dark-mode-HDW-01' : '',
      title: isDarkMode() ? 'dark-swal-title' : '',
      content: isDarkMode() ? 'dark-swal-content' : '',
      confirmButton: isDarkMode() ? 'dark-swal-confirm' : '',
      cancelButton: isDarkMode() ? 'dark-swal-cancel' : ''
    }
  }).then((result) => {
    if (result.isConfirmed) {
      setEmployees(employees.filter(emp => emp.id !== id));
      Swal.fire({
        title: 'Deleted!',
        text: 'Employee has been deleted.',
        icon: 'success',
        background: isDarkMode() ? '#23272f' : '#fff',
        color: isDarkMode() ? '#e0e0e0' : '#212529',
        customClass: {
          popup: isDarkMode() ? 'dark-swal' : '',
          container: isDarkMode() ? 'dark-mode-HDW-01' : '',
          title: isDarkMode() ? 'dark-swal-title' : '',
          content: isDarkMode() ? 'dark-swal-content' : '',
          confirmButton: isDarkMode() ? 'dark-swal-confirm' : ''
        }
      });
    }
  });
};

// Update the edit modal to properly apply dark mode:
{isEditing && (
  <div className={`modal-overlay-S-E-EL-032 ${darkModeClass}`}>
    <div className={`modal-content-S-E-EL-032 edit-modal-S-E-EL-032 ${darkModeClass}`} onClick={e => e.stopPropagation()}>
      {/* ... rest of the edit modal code ... */}
    </div>
  </div>
)}

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === editEmployee.id ? { ...emp, ...formData } : emp
      ));
      Swal.fire({
        title: 'Success!',
        text: editEmployee ? 'Employee updated successfully!' : 'Employee added successfully!',
        icon: 'success',
        confirmButtonColor: '#4361ee',
        background: isDarkMode() ? '#23272f' : '#fff',
        color: isDarkMode() ? '#e0e0e0' : '#212529',
        customClass: {
          popup: isDarkMode() ? 'dark-swal' : '',
          title: isDarkMode() ? 'dark-swal-title' : '',
          content: isDarkMode() ? 'dark-swal-content' : '',
          confirmButton: isDarkMode() ? 'dark-swal-confirm' : ''
        }
      });
    } else {
      // Add new employee (though our requirement is just edit/delete)
      const newEmployee = {
        id: employees.length + 1,
        ...formData
      };
      setEmployees([...employees, newEmployee]);
      Swal.fire({
        title: 'Reset!',
        text: 'Form has been reset.',
        icon: 'success',
        background: isDarkMode() ? '#23272f' : '#fff',
        color: isDarkMode() ? '#e0e0e0' : '#212529',
        customClass: {
          popup: isDarkMode() ? 'dark-swal' : '',
          title: isDarkMode() ? 'dark-swal-title' : '',
          content: isDarkMode() ? 'dark-swal-content' : '',
          confirmButton: isDarkMode() ? 'dark-swal-confirm' : ''
        }
      });
    }
    
    setIsEditing(false);
    setEditEmployee(null);
    setFormData({
      empName: '',
      contMobNo: '',
      joiningDate: '',
      email: '',
      dob: '',
      salary: '',
      empType: '',
      empAddress: '',
      contactPerson: '',
      mobNo: '',
      bank: '',
      acNo: '',
      ifsCode: '',
      panNo: ''
    });
  };

  return (
    <div className="container premium-form-container-S-E-EL-032">
      <div className="premium-form-header-S-E-EL-032">
        <h2><FaUser className="me-2" />Employee List</h2>
        <p className="text-muted">Manage your employee records</p>
      </div>
      
     <div className="table-responsive-S-E-EL-032">
  <div className="dataTables-top-container-S-E-EL-032 mb-3"></div>
        <table 
          id="employeeTable-S-E-EL-032" 
    className="table-S-E-EL-032 table-striped-S-E-EL-032 table-hover-S-E-EL-032" 
    style={{width: '100%', marginTop: '0', marginBottom: '20px'}}>
          <thead>
            <tr style={{ background: '#4361ee', color: '#fff' }}>
              <th>ID</th>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Joining Date</th>
              <th>DOB</th>
              <th>Salary</th>
              <th>Employee Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="text-blue-S-E-EL-032">{employee.id}</td>
                <td className="text-blue-S-E-EL-032">{employee.empName}</td>
                <td className="text-blue-S-E-EL-032">{employee.contMobNo}</td>
                <td className="text-blue-S-E-EL-032">{employee.email}</td>
                <td className="text-blue-S-E-EL-032">{employee.joiningDate}</td>
                <td className="text-blue-S-E-EL-032">{employee.dob}</td>
                <td className="text-blue-S-E-EL-032">₹{employee.salary.toLocaleString()}</td>
                <td className="text-blue-S-E-EL-032">{employee.empType}</td>
                <td className="action-icons-S-E-EL-032">
                  <span title="View" className="icon-action-S-E-EL-032 icon-view-S-E-EL-032 me-2" onClick={() => setViewEmployee(employee)}>
                    <i className="fas fa-eye"></i>
                  </span>
                  <span title="Edit" className="icon-action-S-E-EL-032 icon-edit-S-E-EL-032 me-2" onClick={() => handleEdit(employee)}>
                    <FaEdit />
                  </span>
                  <span title="Delete" className="icon-action-S-E-EL-032 icon-delete-S-E-EL-032" onClick={() => handleDelete(employee.id)}>
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced View Employee Modal */}
{viewEmployee && (
  <div className={`modal-overlay-S-E-EL-032 ${darkModeClass}`} onClick={() => setViewEmployee(null)}>
    <div className="modal-content-S-E-EL-032 enhanced-view-modal-S-E-EL-032" onClick={e => e.stopPropagation()}>
      <div className="modal-header-S-E-EL-032">
        <h3><FaUser className="me-2" />Employee Details</h3>
        <button className="close-btn-S-E-EL-032" onClick={() => setViewEmployee(null)}>
          <FaTimes />
        </button>
      </div>
      <div className="employee-details-container-S-E-EL-032">
        {/* Personal Info Section */}
        <div className="detail-section-S-E-EL-032">
          <h4 className="section-title-S-E-EL-032"><FaUser className="me-2" />Personal Information</h4>
          <div className="detail-row-S-E-EL-032">
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Employee Name</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.empName}</div>
            </div>
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Date of Birth</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.dob}</div>
            </div>
          </div>
          <div className="detail-row-S-E-EL-032">
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Employee Type</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.empType}</div>
            </div>
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Joining Date</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.joiningDate}</div>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="detail-section-S-E-EL-032">
          <h4 className="section-title-S-E-EL-032"><FaPhoneAlt className="me-2" />Contact Information</h4>
          <div className="detail-row-S-E-EL-032">
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Mobile Number</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.contMobNo}</div>
            </div>
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Email</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.email}</div>
            </div>
          </div>
        </div>

        {/* Financial Info Section */}
        <div className="detail-section-S-E-EL-032">
          <h4 className="section-title-S-E-EL-032"><FaMoneyBillWave className="me-2" />Financial Information</h4>
          <div className="detail-row-S-E-EL-032">
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Salary</span>
              <div className="detail-value-S-E-EL-032">₹{viewEmployee.salary.toLocaleString()}</div>
            </div>
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Bank Name</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.bank}</div>
            </div>
          </div>
          <div className="detail-row-S-E-EL-032">
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Account Number</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.acNo}</div>
            </div>
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">IFS Code</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.ifsCode}</div>
            </div>
          </div>
          <div className="detail-row-S-E-EL-032">
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">PAN Number</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.panNo}</div>
            </div>
          </div>
        </div>

        {/* Address & Emergency Section */}
        <div className="detail-section-S-E-EL-032">
          <h4 className="section-title-S-E-EL-032"><FaHome className="me-2" />Address & Emergency</h4>
          <div className="detail-row-S-E-EL-032">
            <div className="detail-item-S-E-EL-032 full-width-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Employee Address</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.empAddress}</div>
            </div>
          </div>
          <div className="detail-row-S-E-EL-032">
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Emergency Contact</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.contactPerson}</div>
            </div>
            <div className="detail-item-S-E-EL-032">
              <span className="detail-label-S-E-EL-032">Emergency Mobile</span>
              <div className="detail-value-S-E-EL-032">{viewEmployee.mobNo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

       {/* Enhanced Edit Employee Modal  */}
        {isEditing && (
          <div className={`modal-overlay-S-E-EL-032 ${darkModeClass}`}>
            <div className="modal-content-S-E-EL-032 edit-modal-S-E-EL-032">
          <div className="modal-header-S-E-EL-032">
            <h3><FaUser className="me-2" />{editEmployee ? 'Edit Employee' : 'Add Employee'}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body-S-E-EL-032">
              <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="empName" className="form-label-S-E-EL-032">
                <FaUser className="me-2" />Employee Name
              </label>
              <input
                type="text"
                className="form-control-S-E-EL-032"
                id="empName"
                name="empName"
                value={formData.empName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="contMobNo" className="form-label-S-E-EL-032">
                <FaPhoneAlt className="me-2" /> Contact Mobile No
              </label>
              <input
                type="tel"
                className="form-control-S-E-EL-032"
                id="contMobNo"
                name="contMobNo"
                value={formData.contMobNo}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>
              </div>
              <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="joiningDate" className="form-label-S-E-EL-032">
                <FaCalendarAlt className="me-2" />Joining Date
              </label>
              <input
                type="date"
                className="form-control-S-E-EL-032"
                id="joiningDate"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label-S-E-EL-032">
                <FaEnvelope className="me-2" />Email
              </label>
              <input
                type="email"
                className="form-control-S-E-EL-032"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
              </div>
              <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="dob" className="form-label-S-E-EL-032">
                <FaCalendarAlt className="me-2" />Date of Birth
              </label>
              <input
                type="date"
                className="form-control-S-E-EL-032"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="salary" className="form-label-S-E-EL-032">
                <FaMoneyBillWave className="me-2" />Salary
              </label>
              <input
                type="number"
                className="form-control-S-E-EL-032"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                required
                min="0"
                step="1"
              />
            </div>
              </div>
              <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="empType" className="form-label-S-E-EL-032">
                <FaUser className="me-2" />Employee Type
              </label>
              <select
                className="form-control-S-E-EL-032"
                id="empType"
                name="empType"
                value={formData.empType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="empAddress" className="form-label-S-E-EL-032">
                <FaHome className="me-2" />Employee Address
              </label>
              <textarea
                className="form-control-S-E-EL-032"
                id="empAddress"
                name="empAddress"
                value={formData.empAddress}
                onChange={handleInputChange}
                rows="2"
                required
              ></textarea>
            </div>
              </div>
              <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="contactPerson" className="form-label-S-E-EL-032">
                <FaUserFriends className="me-2" />Emergency Contact
              </label>
              <input
                type="text"
                className="form-control-S-E-EL-032"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="mobNo" className="form-label-S-E-EL-032">
               <FaPhoneAlt className="me-2" /> Emergency Mobile
              </label>
              <input
                type="tel"
                className="form-control-S-E-EL-032"
                id="mobNo"
                name="mobNo"
                value={formData.mobNo}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>
              </div>
              <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="bank" className="form-label-S-E-EL-032">
                <FaUniversity className="me-2" />Bank Name
              </label>
              <input
                type="text"
                className="form-control-S-E-EL-032"
                id="bank"
                name="bank"
                value={formData.bank}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="acNo" className="form-label-S-E-EL-032">
                <FaCreditCard className="me-2" />A/C Number
              </label>
              <input
                type="text"
                className="form-control-S-E-EL-032"
                id="acNo"
                name="acNo"
                value={formData.acNo}
                onChange={handleInputChange}
                required
              />
            </div>
              </div>
              <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="ifsCode" className="form-label-S-E-EL-032">
                <FaFileAlt className="me-2" />IFS Code
              </label>
              <input
                type="text"
                className="form-control-S-E-EL-032"
                id="ifsCode"
                name="ifsCode"
                value={formData.ifsCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="panNo" className="form-label-S-E-EL-032">
                <FaFileAlt className="me-2" />PAN Number
              </label>
              <input
                type="text"
                className="form-control-S-E-EL-032"
                id="panNo"
                name="panNo"
                value={formData.panNo}
                onChange={handleInputChange}
                required
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                title="Please enter a valid PAN number (e.g., ABCDE1234F)"
              />
            </div>
              </div>
            </div>
            <div className="modal-footer-S-E-EL-032 modal-footer-center-S-E-EL-032">
              <button 
            type="button" 
            className="btn btn-reset-S-E-EL-032"
            onClick={handleReset}
              >
            <FaUndo className="me-2" />Reset
              </button>
              <button 
            type="submit" 
            className="btn btn-save-S-E-EL-032 btn-primary"
              >
            <FaSave className="me-2" /> Save
              </button>
              <button 
            type="button" 
            className="btn btn-cancel-S-E-EL-032"
            onClick={() => setIsEditing(false)}
              >
            <FaTimes className="me-2" /> Cancel
              </button>
            </div>
          </form>
            </div>
          </div>
        )}

        {/* Print-only full details table */}
      <div className="print-table-wrapper-S-E-EL-032">
        <table className="table-S-E-EL-032 print-table-S-E-EL-032">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Joining Date</th>
              <th>DOB</th>
              <th>Salary</th>
              <th>Employee Type</th>
              <th>Address</th>
              <th>Emergency Contact</th>
              <th>Emergency Mobile</th>
              <th>Bank Name</th>
              <th>A/C No</th>
              <th>IFS Code</th>
              <th>PAN Number</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.empName}</td>
                <td>{employee.contMobNo}</td>
                <td>{employee.email}</td>
                <td>{employee.joiningDate}</td>
                <td>{employee.dob}</td>
                <td>₹{employee.salary.toLocaleString()}</td>
                <td>{employee.empType}</td>
                <td>{employee.empAddress}</td>
                <td>{employee.contactPerson}</td>
                <td>{employee.mobNo}</td>
                <td>{employee.bank}</td>
                <td>{employee.acNo}</td>
                <td>{employee.ifsCode}</td>
                <td>{employee.panNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamList;