import React, { useState, useEffect, useMemo } from "react";
import "./StockDetails.css";
import { FaCar, FaCogs, FaMoneyBillAlt, FaBarcode, FaBoxOpen, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

// Dummy data generator util (for example/demo)
const initialDummyParts = [
  {
    id: 1,
    images: ["https://via.placeholder.com/60x40.png?text=SP1"],
    name: "Ignition Coil",
    number: "IC-00123",
    make: "Toyota",
    model: "Corolla",
    category: "Electrical",
    mrp: 1500,
    quantity: 25,
    location: "Aisle 4",
    warranty: 12,
  },
  {
    id: 2,
    images: ["https://via.placeholder.com/60x40.png?text=SP2"],
    name: "Air Filter",
    number: "AF-04567",
    make: "Honda",
    model: "Civic",
    category: "Filters",
    mrp: 800,
    quantity: 40,
    location: "Aisle 2",
    warranty: 6,
  },
  {
    id: 3,
    images: ["https://via.placeholder.com/60x40.png?text=SP3"],
    name: "Oil Filter",
    number: "OF-00321",
    make: "Hyundai",
    model: "i20",
    category: "Filters",
    mrp: 500,
    quantity: 15,
    location: "Aisle 1",
    warranty: 6,
  },
  {
    id: 4,
    images: ["https://via.placeholder.com/60x40.png?text=SP3"],
    name: "Oil Filter",
    number: "OF-00321",
    make: "Hyundai",
    model: "i20",
    category: "Filters",
    mrp: 500,
    quantity: 15,
    location: "Aisle 1",
    warranty: 6,
  },
  {
    id: 5,
    images: ["https://via.placeholder.com/60x40.png?text=SP3"],
    name: "Oil Filter",
    number: "OF-00321",
    make: "Hyundai",
    model: "i20",
    category: "Filters",
    mrp: 500,
    quantity: 15,
    location: "Aisle 1",
    warranty: 6,
  },
  {
    id: 6,
    images: ["https://via.placeholder.com/60x40.png?text=SP3"],
    name: "Oil Filter",
    number: "OF-00321",
    make: "Hyundai",
    model: "i20",
    category: "Filters",
    mrp: 500,
    quantity: 15,
    location: "Aisle 1",
    warranty: 6,
  },
  {
    id: 8,
    images: ["https://via.placeholder.com/60x40.png?text=SP3"],
    name: "Oil Filter",
    number: "OF-00321",
    make: "Hyundai",
    model: "i20",
    category: "Filters",
    mrp: 500,
    quantity: 15,
    location: "Aisle 1",
    warranty: 6,
  }
];


// Utilities for sorting
const sortFunctions = {
  asc: (a, b) => (a > b ? 1 : a < b ? -1 : 0),
  desc: (a, b) => (a < b ? 1 : a > b ? -1 : 0),
};

// Helper: Download CSV file (export Excel alternative)
function downloadCSV(parts) {
  if (!parts.length) return;
  const headers = [
    "Part Name",
    "Part Number",
    "Vehicle Make",
    "Vehicle Model",
    "Category",
    "MRP",
    "Quantity",
    "Location",
    "Warranty (months)",
  ];
  const csvRows = [];
  csvRows.push(headers.join(","));
  parts.forEach((part) => {
    const values = [
      `"${part.name}"`,
      `"${part.number}"`,
      `"${part.make}"`,
      `"${part.model}"`,
      `"${part.category}"`,
      part.mrp,
      part.quantity,
      `"${part.location}"`,
      part.warranty,
    ];
    csvRows.push(values.join(","));
  });
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "spare_parts_export.csv";
  a.click();
  window.URL.revokeObjectURL(url);
}
/****card for shoing out of stock things */

/**************************************************************** */

export default function StockDetails() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCollapsed, setFilterCollapsed] = useState(false);


  const [filters, setFilters] = useState({
    text: "",
    make: "",
    model: "",
    category: "",
    priceRange: [0, 20000],
    quantityRange: [0, 100],
    warrantyRange: [0, 60],
  });

  const [sortBy, setSortBy] = useState({ column: "name", direction: "asc" });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add / update
  const [modalPartData, setModalPartData] = useState(null);

  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const stockSummary = useMemo(() => {
    const totalParts = parts.length;
    const categories = {};
    parts.forEach((p) => {
      categories[p.category] = (categories[p.category] || 0) + p.quantity;
    });
    return { totalParts, categories };
  }, [parts]);

  const outOfStockItems = useMemo(() => {
    return parts.filter((p) => p.quantity <= 10);
  }, [parts]);


  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        setParts(initialDummyParts);
        setLoading(false);
      } catch {
        setError("Failed to load parts data");
        setLoading(false);
      }
    }, 600);
  }, []);

  const filteredParts = useMemo(() => {
    return parts
      .filter((part) => {
        if (
          filters.text &&
          !(
            part.name.toLowerCase().includes(filters.text.toLowerCase()) ||
            part.number.toLowerCase().includes(filters.text.toLowerCase())
          )
        )
          return false;
        if (filters.make && part.make !== filters.make) return false;
        if (filters.model && part.model !== filters.model) return false;
        if (filters.category && part.category !== filters.category) return false;
        if (
          part.mrp < filters.priceRange[0] ||
          part.mrp > filters.priceRange[1]
        )
          return false;
        if (
          part.quantity < filters.quantityRange[0] ||
          part.quantity > filters.quantityRange[1]
        )
          return false;
        if (
          part.warranty < filters.warrantyRange[0] ||
          part.warranty > filters.warrantyRange[1]
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        const col = sortBy.column;
        const dir = sortBy.direction;
        let valA = a[col];
        let valB = b[col];
        if (
          ["name", "number", "make", "model", "category", "location"].includes(
            col
          )
        ) {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }
        if (sortFunctions[dir](valA, valB) > 0) return 1;
        if (sortFunctions[dir](valA, valB) < 0) return -1;
        return 0;
      });
  }, [parts, filters, sortBy]);

  const paginatedParts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredParts.slice(start, start + itemsPerPage);
  }, [filteredParts, currentPage]);

  const uniqueMakes = useMemo(() => {
    const makes = new Set(parts.map((p) => p.make));
    return Array.from(makes).sort();
  }, [parts]);

  const uniqueModels = useMemo(() => {
    const models = new Set(parts.map((p) => p.model));
    return Array.from(models).sort();
  }, [parts]);

  const uniqueCategories = useMemo(() => {
    const cats = new Set(parts.map((p) => p.category));
    return Array.from(cats).sort();
  }, [parts]);

  function onFilterChange(field, val) {
    setCurrentPage(1);
    setFilters((f) => ({ ...f, [field]: val }));
  }

  function onSortClick(col) {
    setCurrentPage(1);
    setSortBy(({ column, direction }) => {
      if (column === col) {
        return {
          column: col,
          direction: direction === "asc" ? "desc" : "asc",
        };
      }
      return { column: col, direction: "asc" };
    });
  }

  function openDeleteConfirm(id) {
    setDeleteConfirm({ open: true, id });
  }

  function deletePartConfirmed() {
    setLoading(true);
    setError(null);
    const idDelete = deleteConfirm.id;
    setTimeout(() => {
      try {
        setParts((ps) => ps.filter((p) => p.id !== idDelete));
        setDeleteConfirm({ open: false, id: null });
        setLoading(false);
      } catch {
        setError("Error deleting part.");
        setLoading(false);
      }
    }, 500);
  }

  function openAddNewPart() {
    setModalMode("add");
    setModalPartData(null);
    setModalOpen(true);
  }

  function openEditPart(part) {
    setModalMode("update");
    setModalPartData(part);
    setModalOpen(true);
  }

  function onModalSave(newData) {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        if (modalMode === "add") {
          newData.id = parts.length ? Math.max(...parts.map((p) => p.id)) + 1 : 1;
          setParts((ps) => [newData, ...ps]);
        } else if (modalMode === "update") {
          setParts((ps) => ps.map((p) => (p.id === newData.id ? newData : p)));
        }
        setModalOpen(false);
        setLoading(false);
      } catch {
        setError("Error saving part.");
        setLoading(false);
      }
    }, 800);
  }
  function onPrint() {
    const printContent = document.getElementById("spare-parts-table");
    if (!printContent) return;

    // Clone table to manipulate for print (so original stays intact)
    const cloneTable = printContent.cloneNode(true);

    // Remove last column (Actions) header from cloned table
    const headerRow = cloneTable.querySelector("thead tr");
    if (headerRow) {
      headerRow.removeChild(headerRow.lastElementChild);
    }

    // Remove last column (Actions) cells in tbody rows
    const rows = cloneTable.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      row.removeChild(row.lastElementChild);
    });

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
    <html>
      <head>
        <title>Print Spare Parts</title>
        <style>
          @page {
            size: landscape;
          }
          body {
            font-family: 'Poppins', sans-serif;
            padding: 20px;
            color: #212529;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #666;
            padding: 8px 10px;
            text-align: center;
          }
          th {
            background-color: #4361ee;
            color: white;
          }
          img {
            max-width: 50px;
            height: auto;
          }
        </style>
      </head>
      <body>
        <h2>Spare Parts Inventory</h2>
        ${cloneTable.outerHTML}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
  const totalPages = Math.ceil(filteredParts.length / itemsPerPage);

  return (

    <div className="spare-parts-inventory-spi-04 container-fluid">
      <div className="page-title-spi-04 d-flex align-items-center mb-3">
        <FaCogs size={24} className="titile-me-2 text-primary" />
        <h2 className="mb-0">Spare Parts</h2>
      </div>
      {/* Stock Summary Cards */}
      <div className="stock-summary-spi-04 row mb-4 justify-content-center gx-3">
        {/* cards */}
        <div className="stock-summary-spi-04" style={{ display: 'flex', gap: '20px' }}>
          <div className="summary-card-spi-04">
            <div className="card-spi-04 card-total-parts shadow-strong">
              <h4>Total Spare Parts</h4>
              <p>{stockSummary.totalParts}</p>
            </div>
          </div>
          <div className="summary-card-spi-04">
            <div className="card-spi-04 card-outofstock-spi-04 shadow-strong">
              <h4>Out of Stock</h4>
              <p>{outOfStockItems.length}</p>
            </div>
          </div>
        </div>
      </div>


      {/**bhai out of stock ke liye  */}



      {/* Main Layout Side-by-Side */}
      <div className="inventory-main-layout-spi-04">
        {/* Filter Panel */}

        <aside className="filters-panel-spi-04">
          <div className="filters-container-spi-04">
            <h5 className="filters-title-spi-04">Filters</h5>

            <div className="filter-group-spi-04">
              <label htmlFor="filterText" className="filter-label-spi-04">
                Search Name / Number
              </label>
              <input
                id="filterText"
                type="search"
                className="form-control filter-input-spi-04"
                placeholder="Text search..."
                value={filters.text}
                onChange={(e) => onFilterChange("text", e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="filter-group-spi-04">
              <label htmlFor="filterMake" className="filter-label-spi-04">
                Vehicle Make
              </label>
              <select
                id="filterMake"
                className="form-select filter-select-spi-04"
                value={filters.make}
                onChange={(e) => onFilterChange("make", e.target.value)}
              >
                <option value="">All</option>
                {uniqueMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group-spi-04">
              <label htmlFor="filterModel" className="filter-label-spi-04">
                Vehicle Model
              </label>
              <select
                id="filterModel"
                className="form-select filter-select-spi-04"
                value={filters.model}
                onChange={(e) => onFilterChange("model", e.target.value)}
              >
                <option value="">All</option>
                {uniqueModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group-spi-04">
              <label htmlFor="filterCategory" className="filter-label-spi-04">
                Category
              </label>
              <select
                id="filterCategory"
                className="form-select filter-select-spi-04"
                value={filters.category}
                onChange={(e) => onFilterChange("category", e.target.value)}
              >
                <option value="">All</option>
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group-spi-04">
              <label className="filter-label-spi-04">
                Price Range (MRP) ₹{filters.priceRange[0]} - ₹
                {filters.priceRange[1]}
              </label>
              <div className="range-inputs-spi-04">
                <input
                  type="number"
                  min="0"
                  max="20000"
                  value={filters.priceRange[0]}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val > filters.priceRange[1]) val = filters.priceRange[1];
                    onFilterChange("priceRange", [val, filters.priceRange[1]]);
                  }}
                  className="form-control filter-input-spi-04"
                  aria-label="Price min"
                />
                <span className="range-separator-spi-04">-</span>
                <input
                  type="number"
                  min="0"
                  max="20000"
                  value={filters.priceRange[1]}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val < filters.priceRange[0]) val = filters.priceRange[0];
                    onFilterChange("priceRange", [filters.priceRange[0], val]);
                  }}
                  className="form-control filter-input-spi-04"
                  aria-label="Price max"
                />
              </div>
            </div>

            <div className="filter-group-spi-04">
              <label className="filter-label-spi-04">
                Quantity {filters.quantityRange[0]} - {filters.quantityRange[1]}
              </label>
              <div className="range-inputs-spi-04">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.quantityRange[0]}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val > filters.quantityRange[1]) val = filters.quantityRange[1];
                    onFilterChange("quantityRange", [val, filters.quantityRange[1]]);
                  }}
                  className="form-control filter-input-spi-04"
                  aria-label="Quantity min"
                />
                <span className="range-separator-spi-04">-</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.quantityRange[1]}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val < filters.quantityRange[0]) val = filters.quantityRange[0];
                    onFilterChange("quantityRange", [filters.quantityRange[0], val]);
                  }}
                  className="form-control filter-input-spi-04"
                  aria-label="Quantity max"
                />
              </div>
            </div>

            <div className="filter-group-spi-04">
              <label className="filter-label-spi-04">
                Warranty (months) {filters.warrantyRange[0]} - {filters.warrantyRange[1]}
              </label>
              <div className="range-inputs-spi-04">
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={filters.warrantyRange[0]}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val > filters.warrantyRange[1]) val = filters.warrantyRange[1];
                    onFilterChange("warrantyRange", [val, filters.warrantyRange[1]]);
                  }}
                  className="form-control filter-input-spi-04"
                  aria-label="Warranty min"
                />
                <span className="range-separator-spi-04">-</span>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={filters.warrantyRange[1]}
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val < filters.warrantyRange[0]) val = filters.warrantyRange[0];
                    onFilterChange("warrantyRange", [filters.warrantyRange[0], val]);
                  }}
                  className="form-control filter-input-spi-04"
                  aria-label="Warranty max"
                />
              </div>
            </div>

            <button
              className="btn-reset-premium-spi-04 btn-premium-spi-04"
              onClick={() =>
                setFilters({
                  text: "",
                  make: "",
                  model: "",
                  category: "",
                  priceRange: [0, 20000],
                  quantityRange: [0, 100],
                  warrantyRange: [0, 60],
                })
              }
              type="button"
              aria-label="Reset all filters"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Table and controls */}
        <section className="table-section-spi-04">
          <div className="table-actions-spi-04 d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <button
              className="btn-add-premium-spi-04 btn-premium-spi-04 me-2"
              onClick={openAddNewPart}
              type="button"
              aria-label="Add new spare part"
            >
              + Add New Part
            </button>

            <div className="actions-right-spi-04 d-flex flex-wrap align-items-center gap-2">
              <button
                className="btn-premium-spi-04 btn-export-spi-04"
                onClick={() => downloadCSV(filteredParts)}
                type="button"
                aria-label="Export spare parts to Excel CSV"
              >
                Export Excel
              </button>
              <button
                className="btn-premium-spi-04 btn-print-spi-04"
                onClick={onPrint}
                type="button"
                aria-label="Print spare parts list"
              >
                Print
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          {loading ? (
            <div
              className="spinner-border text-primary d-block mx-auto my-5"
              role="status"
              aria-label="Loading indicator"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : filteredParts.length === 0 ? (
            <p className="text-center text-muted my-5">No spare parts found.</p>
          ) : (
            <>
              <div className="scrollable-table-container-spi-04 table-responsive">
                <table
                  id="spare-parts-table"
                  className="table table-striped table-hover align-middle"
                >
                  <thead className="table-header-spi-04">
                    <tr style={{ whiteSpace: "nowrap" }}>
                      <th scope="col" style={{ width: "120px" }}>
                        Images
                      </th>
                      <th
                        scope="col"
                        role="button"
                        tabIndex={0}
                        onClick={() => onSortClick("name")}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") onSortClick("name");
                        }}
                        aria-sort={
                          sortBy.column === "name" ? sortBy.direction : "none"
                        }
                        className="sortable-column-spi-04"
                      >
                        Part Name
                        {sortBy.column === "name" && (
                          <span className="sort-arrow-spi-04">
                            {sortBy.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </th>
                      <th
                        scope="col"
                        role="button"
                        tabIndex={0}
                        onClick={() => onSortClick("number")}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") onSortClick("number");
                        }}
                        aria-sort={
                          sortBy.column === "number" ? sortBy.direction : "none"
                        }
                        className="sortable-column-spi-04"
                      >
                        Part Number
                        {sortBy.column === "number" && (
                          <span className="sort-arrow-spi-04">
                            {sortBy.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </th>
                      <th
                        scope="col"
                        role="button"
                        tabIndex={0}
                        onClick={() => onSortClick("make")}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") onSortClick("make");
                        }}
                        aria-sort={
                          sortBy.column === "make" ? sortBy.direction : "none"
                        }
                        className="sortable-column-spi-04"
                      >
                        Vehicle Make
                        {sortBy.column === "make" && (
                          <span className="sort-arrow-spi-04">
                            {sortBy.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </th>
                      <th
                        scope="col"
                        role="button"
                        tabIndex={0}
                        onClick={() => onSortClick("model")}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") onSortClick("model");
                        }}
                        aria-sort={
                          sortBy.column === "model" ? sortBy.direction : "none"
                        }
                        className="sortable-column-spi-04"
                      >
                        Vehicle Model
                        {sortBy.column === "model" && (
                          <span className="sort-arrow-spi-04">
                            {sortBy.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </th>
                      <th
                        scope="col"
                        role="button"
                        tabIndex={0}
                        onClick={() => onSortClick("category")}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") onSortClick("category");
                        }}
                        aria-sort={
                          sortBy.column === "category"
                            ? sortBy.direction
                            : "none"
                        }
                        className="sortable-column-spi-04"
                      >
                        Category
                        {sortBy.column === "category" && (
                          <span className="sort-arrow-spi-04">
                            {sortBy.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </th>
                      <th
                        scope="col"
                        role="button"
                        tabIndex={0}
                        onClick={() => onSortClick("mrp")}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") onSortClick("mrp");
                        }}
                        aria-sort={
                          sortBy.column === "mrp" ? sortBy.direction : "none"
                        }
                        className="sortable-column-spi-04"
                        style={{ minWidth: "90px" }}
                      >
                        MRP (₹)
                        {sortBy.column === "mrp" && (
                          <span className="sort-arrow-spi-04">
                            {sortBy.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </th>
                      <th
                        scope="col"
                        role="button"
                        tabIndex={0}
                        onClick={() => onSortClick("quantity")}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") onSortClick("quantity");
                        }}
                        aria-sort={
                          sortBy.column === "quantity" ? sortBy.direction : "none"
                        }
                        className="sortable-column-spi-04"
                        style={{ minWidth: "60px" }}
                      >
                        Quantity
                        {sortBy.column === "quantity" && (
                          <span className="sort-arrow-spi-04">
                            {sortBy.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </th>
                      <th scope="col" style={{ minWidth: "120px" }}>
                        Location
                      </th>
                      <th
                        scope="col"
                        role="button"
                        tabIndex={0}
                        onClick={() => onSortClick("warranty")}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") onSortClick("warranty");
                        }}
                        aria-sort={
                          sortBy.column === "warranty" ? sortBy.direction : "none"
                        }
                        className="sortable-column-spi-04"
                        style={{ minWidth: "120px" }}
                      >
                        Warranty (months)
                        {sortBy.column === "warranty" && (
                          <span className="sort-arrow-spi-04">
                            {sortBy.direction === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </th>
                      <th scope="col" style={{ minWidth: "110px" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedParts.map((part) => (
                      <tr
                        key={part.id}
                        tabIndex={0}
                        className={part.quantity < 10 ? "low-stock-row-spi-04" : ""}
                      >
                        <td aria-label="Part images" className="multi-image-cell-spi-04">
                          {part.images.map((imgSrc, i) => (
                            <img
                              key={i}
                              src={imgSrc}
                              alt={`Part ${part.name} image ${i + 1}`}
                              className="table-image-spi-04 me-1"
                              loading="lazy"
                            />
                          ))}
                        </td>
                        <td>{part.name}</td>
                        <td>{part.number}</td>
                        <td>{part.make}</td>
                        <td>{part.model}</td>
                        <td>{part.category}</td>
                        <td>₹{part.mrp.toLocaleString()}</td>
                        <td>{part.quantity}</td>
                        <td>{part.location}</td>
                        <td>{part.warranty}</td>
                        <td className="actions-cell-spi-04">
                          <div className="d-flex gap-2 justify-content-center">
                            <button
                              className="btn-save-premium-spi-04 btn-premium-spi-04 btn-sm"
                              onClick={() => openEditPart(part)}
                              type="button"
                              aria-label={`Update part ${part.name}`}
                            >
                              Update
                            </button>
                            <button
                              className="btn-delete-premium-spi-04 btn-premium-spi-04 btn-sm"
                              onClick={() => openDeleteConfirm(part.id)}
                              type="button"
                              aria-label={`Delete part ${part.name}`}
                            >
                              Delete
                            </button>
                          </div>
                        </td>

                      </tr>

                    ))}
                  </tbody>
                </table>
              </div>

              <nav className="pagination-controls-spi-04 mt-3" aria-label="Spare parts pagination">
                <ul className="pagination justify-content-center mb-0">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      aria-label="Previous page"
                      onClick={() => setCurrentPage((p) => (p > 1 ? p - 1 : p))}
                      disabled={currentPage === 1}
                    >
                      &laquo;
                    </button>
                  </li>
                  {[...Array(totalPages).keys()].map((i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <li
                          className={`page-item ${currentPage === page ? "active" : ""}`}
                          key={page}
                        >
                          <button
                            className="page-link"
                            aria-current={currentPage === page ? "page" : undefined}
                            onClick={() => setCurrentPage(page)}
                            type="button"
                          >
                            {page}
                          </button>
                        </li>
                      );
                    }
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <li className="page-item disabled" key={"ellipsis" + page}>
                          <span className="page-link">...</span>
                        </li>
                      );
                    }
                    return null;
                  })}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      aria-label="Next page"
                      onClick={() => setCurrentPage((p) => (p < totalPages ? p + 1 : p))}
                      disabled={currentPage === totalPages}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}

          {modalOpen && (
            <SparePartFormModal
              mode={modalMode}
              initialData={modalPartData}
              onClose={() => setModalOpen(false)}
              onSave={onModalSave}
            />
          )}

          {deleteConfirm.open && (
            <ConfirmDialog
              message="Are you sure you want to delete this spare part?"
              onCancel={() => setDeleteConfirm({ open: false, id: null })}
              onConfirm={deletePartConfirmed}
            />
          )}
        </section>
      </div>
    </div>
  );
}

function SparePartFormModal({ mode, initialData, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    id: initialData?.id ?? null,
    images: initialData?.images ?? [],
    name: initialData?.name ?? "",
    number: initialData?.number ?? "",
    make: initialData?.make ?? "",
    model: initialData?.model ?? "",
    category: initialData?.category ?? "",
    mrp: initialData?.mrp ?? 0,
    quantity: initialData?.quantity ?? 0,
    location: initialData?.location ?? "",
    warranty: initialData?.warranty ?? 0,
  }));

  const [imagePreviews, setImagePreviews] = useState(form.images || []);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  function onInputChange(e) {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setForm((f) => ({ ...f, [name]: val }));
  }

  function onImagesChange(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      setFormError("Only image files (PNG/JPG) are accepted.");
      return;
    }
    const readers = validFiles.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target.result);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((results) => {
      setImagePreviews(results);
      setForm((f) => ({ ...f, images: results }));
      setFormError("");
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim()) return setFormError("Part name is required.");
    if (!form.number.trim()) return setFormError("Part number is required.");
    if (!form.make.trim()) return setFormError("Vehicle make is required.");
    if (!form.model.trim()) return setFormError("Vehicle model is required.");
    if (!form.category.trim()) return setFormError("Category is required.");
    if (form.mrp < 0) return setFormError("MRP cannot be negative.");
    if (form.quantity < 0) return setFormError("Quantity cannot be negative.");
    if (form.warranty < 0) return setFormError("Warranty cannot be negative.");
    if (!form.images || form.images.length === 0)
      return setFormError("At least one part image is required.");

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSave(form);
    }, 900);
  }

  return (
    <div
      className="modal-backdrop-spi-04"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      tabIndex={-1}
      onClick={(e) => {
        if (e.target.classList.contains("modal-backdrop-spi-04")) onClose();
      }}
    >
      <div className="modal-content-spi-04">
        <header className="modal-header-spi-04">
          <h2 id="modalTitle" className="modal-title-spi-04">
            {mode === "add" ? "Add New Part" : "Update Part"}
          </h2>
          <button
            aria-label="Close form"
            className="btn-close-spi-04"
            onClick={onClose}
          >
            &times;
          </button>
        </header>
        <form onSubmit={onSubmit} className="form-spi-04" noValidate>
          <div className="form-group-spi-04">
            <label htmlFor="imagesInput" className="form-label-spi-04">
              Part Images * (You can add multiple)
            </label>
            <input
              id="imagesInput"
              type="file"
              accept="image/*"
              multiple
              onChange={onImagesChange}
              className="form-control form-control-sm"
              aria-describedby="imagesHelp"
            />
            <small id="imagesHelp" className="form-text text-muted">
              JPG, PNG only. Minimum one image required.
            </small>

            <div
              className="multiple-image-preview-container-spi-04 mt-2"
              aria-live="polite"
              aria-label="Image previews"
            >
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="image-preview-spi-04 me-2 mb-2"
                />
              ))}
            </div>
          </div>
          {/* Group 1: Name & Part Number */}
          <div className="row">
            <div className="col-md-6 form-group-spi-04">
              <label htmlFor="nameInput" className="form-label-spi-04">
                <FaBoxOpen className="me-1" /> Part Name *
              </label>
              <input
                id="nameInput"
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={onInputChange}
                autoComplete="off"
                required
              />
            </div>
            <div className="col-md-6 form-group-spi-04">
              <label htmlFor="numberInput" className="form-label-spi-04">
                <FaBarcode className="me-1" /> Part Number *
              </label>
              <input
                id="numberInput"
                type="text"
                name="number"
                className="form-control"
                value={form.number}
                onChange={onInputChange}
                autoComplete="off"
                required
              />
            </div>
          </div>

          {/* Group 2: Make & Model */}
          <div className="row">
            <div className="col-md-6 form-group-spi-04">
              <label htmlFor="makeInput" className="form-label-spi-04">
                <FaCar className="me-1" /> Vehicle Make *
              </label>
              <input
                id="makeInput"
                type="text"
                name="make"
                className="form-control"
                value={form.make}
                onChange={onInputChange}
                autoComplete="off"
                required
              />
            </div>
            <div className="col-md-6 form-group-spi-04">
              <label htmlFor="modelInput" className="form-label-spi-04">
                <FaCar className="me-1" /> Vehicle Model *
              </label>
              <input
                id="modelInput"
                type="text"
                name="model"
                className="form-control"
                value={form.model}
                onChange={onInputChange}
                autoComplete="off"
                required
              />
            </div>
          </div>

          {/* Group 3: Category & MRP */}
          <div className="row">
            <div className="col-md-6 form-group-spi-04">
              <label htmlFor="categoryInput" className="form-label-spi-04">
                <FaCogs className="me-1" /> Category *
              </label>
              <input
                id="categoryInput"
                type="text"
                name="category"
                className="form-control"
                value={form.category}
                onChange={onInputChange}
                autoComplete="off"
                required
              />
            </div>
            <div className="col-md-6 form-group-spi-04">
              <label htmlFor="mrpInput" className="form-label-spi-04">
                <FaRupeeSign className="me-1" /> MRP (₹) *
              </label>
              <input
                id="mrpInput"
                type="number"
                name="mrp"
                className="form-control"
                value={form.mrp}
                min={0}
                onChange={onInputChange}
                required
              />
            </div>
          </div>

          {/* Group 4: Quantity & Warranty */}
          <div className="row">
            <div className="col-md-6 form-group-spi-04">
              <label htmlFor="quantityInput" className="form-label-spi-04">
                Quantity *
              </label>
              <input
                id="quantityInput"
                type="number"
                name="quantity"
                className="form-control"
                value={form.quantity}
                min={0}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="col-md-6 form-group-spi-04">
              <label htmlFor="warrantyInput" className="form-label-spi-04">
                Warranty (months) *
              </label>
              <input
                id="warrantyInput"
                type="number"
                name="warranty"
                className="form-control"
                value={form.warranty}
                min={0}
                onChange={onInputChange}
                required
              />
            </div>
          </div>

          {/* Group 5: Location */}
          <div className="form-group-spi-04">
            <label htmlFor="locationInput" className="form-label-spi-04">
              <FaMapMarkerAlt className="me-1" /> Location
            </label>
            <input
              id="locationInput"
              type="text"
              name="location"
              className="form-control"
              value={form.location}
              onChange={onInputChange}
              autoComplete="off"
            />
          </div>

          {/* Error Display */}
          {formError && (
            <div className="alert alert-danger mt-2" role="alert">
              {formError}
            </div>
          )}

          {/* Footer Buttons */}
          <div className="modal-footer-spi-04">
            <button
              type="button"
              className="btn-cancel-premium-spi-04 btn-premium-spi-04 me-2"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-save-premium-spi-04 btn-premium-spi-04"
              disabled={saving}
              aria-label={mode === "add" ? "Save new part" : "Update part"}
            >
              {saving
                ? mode === "add"
                  ? "Saving..."
                  : "Updating..."
                : mode === "add"
                  ? "Save"
                  : "Update"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

function ConfirmDialog({ message, onCancel, onConfirm }) {
  return (
    <div
      className="modal-backdrop-spi-04"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmDialogTitle"
      tabIndex={-1}
      onClick={(e) => {
        if (e.target.classList.contains("modal-backdrop-spi-04")) onCancel();
      }}
    >
      <div className="modal-content-spi-04 confirm-dialog-spi-04">
        <header className="modal-header-spi-04">
          <h3 id="confirmDialogTitle" className="modal-title-spi-04">
            Confirm Delete
          </h3>
        </header>
        <main className="modal-body-spi-04">
          <p>{message}</p>
        </main>
        <footer className="modal-footer-spi-04">
          <button
            className="btn-reset-premium-spi-04 btn-premium-spi-04 me-2"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="btn-delete-premium-spi-04 btn-premium-spi-04"
            onClick={onConfirm}
            type="button"
            autoFocus
          >
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
}