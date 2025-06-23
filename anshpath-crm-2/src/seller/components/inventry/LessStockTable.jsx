import './LessStockTable.css';

import React, { useEffect } from 'react';
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

// Import CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LessStockReport = () => {
  useEffect(() => {
    // Initialize DataTable when component mounts
    const table = $('#lessStockTable-LST-041').DataTable({
      dom: '<"top"Bf>rt<"bottom"lip><"clear">',
      buttons: [
        {
          extend: 'colvis',
          text: '<i class="fas fa-eye"></i> Column Visibility',
          className: 'btn btn-colvis-LST-041'
        },
        {
          extend: 'copy',
          text: '<i class="fas fa-copy"></i> Copy',
          className: 'btn btn-copy-LST-041'
        },
        {
          extend: 'csv',
          text: '<i class="fas fa-file-csv"></i> CSV',
          className: 'btn btn-csv-LST-041'
        },
        {
          extend: 'excel',
          text: '<i class="fas fa-file-excel"></i> Excel',
          className: 'btn btn-excel-LST-041'
        },
        {
          extend: 'pdf',
          text: '<i class="fas fa-file-pdf"></i> PDF',
          className: 'btn btn-pdf-LST-041'
        },
        {
          extend: 'print',
          text: '<i class="fas fa-print"></i> Print',
          className: 'btn btn-print-LST-041'
        }
      ],
      pageLength: 10,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      responsive: true,
      language: {
        search: "Search:",
        lengthMenu: "Show _MENU_ entries",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        infoEmpty: "Showing 0 to 0 of 0 entries",
        infoFiltered: "(filtered from _MAX_ total entries)",
        paginate: {
          next: "Next",
          previous: "Previous"
        }
      },
      initComplete: function() {
        $('.dt-buttons').addClass('btn-group-LST-041');
      }
    });

    // Cleanup function to destroy DataTable when component unmounts
    return () => {
      table.destroy();
    };
  }, []);

  // Sample data - in a real app, this would come from an API or props
  const stockData = [
    { id: 1, name: "ENGINE OIL", availableQty: -88, minQty: 0 },
    { id: 2, name: "OIL FILTER", availableQty: -6, minQty: 0 },
    { id: 3, name: "1ST RING GEAR", availableQty: -4, minQty: 0 },
    { id: 4, name: "BREAKPAD 500", availableQty: -3, minQty: 0 },
    { id: 5, name: "FUEL FILTER TATA BS4 (FF145)", availableQty: 0, minQty: 0 },
    { id: 6, name: "Boalt", availableQty: -4, minQty: 0 },
    { id: 7, name: "Scrow", availableQty: 5, minQty: 20 }
  ];

  // Helper function to determine quantity class
  const getQtyClass = (qty) => {
    if (qty < 0) return 'negative-qty-LST-041';
    if (qty === 0) return 'zero-qty-LST-041';
    return '';
  };

  return (
    <div className="container premium-form-container-LST-041">
      <i className="fas fa-boxes floating-icon-LST-041 floating-icon-1-LST-041"></i>
      <i className="fas fa-exclamation-triangle floating-icon-LST-041 floating-icon-2-LST-041"></i>
      
      <div className="premium-form-header-LST-041">
        <h2><i className="fas fa-box-open me-2"></i>Less Stock Report</h2>
        <p className="text-muted">Items with low or negative stock quantities</p>
      </div>
      
      <div className="table-responsive-LST-041">
        <table  id="lessStockTable-LST-041" className="table-LST-041 table-striped-LST-041 table-hover-LST-041" style={{width: '100%', marginTop: '20px', marginBottom: '20px'}}>
          <thead>
            <tr>
              <th style={{textAlign: 'center'}}>SR.</th>
              <th>ITEM NAME</th>
              <th style={{textAlign: 'center'}}>AVAIL QTY</th>
              <th style={{textAlign: 'center'}}>MIN QTY</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item) => (
              <tr key={item.id}>
                <td style={{textAlign: 'center'}}>{item.id}</td>
                <td>{item.name}</td>
                <td className={getQtyClass(item.availableQty)} style={{textAlign: 'center'}}>{item.availableQty}</td>
                <td style={{textAlign: 'center'}}>{item.minQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default LessStockReport;