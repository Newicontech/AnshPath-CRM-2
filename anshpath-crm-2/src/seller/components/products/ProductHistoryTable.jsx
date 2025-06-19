import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ProductHistoryTable.css";
import car1 from "../../../assets/car1.png";
import EngineOil from "../../../assets/EngineOil.png";
import airfilter from "../../../assets/airfilter.png";
import Coolant from "../../../assets/Coolant.png";
import BrakePads from "../../../assets/BrakePads.png";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProductViewModal from "./ProductViewModal"; 
import EditProductModal from './EditProductModal';

const sampleData = [
  {
    id: 1,
    productName: "Car Tyre A",
    image: car1,
    category: "Tyres",
    brand: "Michelin",
    vehicleCompatibility: "Swift 2018",
    sku: "TYRE-001",
    price: 4500,
    discountPrice: 4000,
    stockQuantity: 25,
    stockStatus: "In Stock",
    addedOn: "2025-06-01",
    lastUpdated: "2025-06-10",
    soldQuantity: 15,
    returnedQuantity: 2,
    productStatus: "Active",
    rating: 4.5,
  },
  {
    id: 2,
    productName: "Engine Oil B",
    image: EngineOil,
    category: "Engine Parts",
    brand: "Castrol",
    vehicleCompatibility: "Baleno 2020",
    sku: "ENG-002",
    price: 1200,
    discountPrice: 1100,
    stockQuantity: 0,
    stockStatus: "Out of Stock",
    addedOn: "2025-05-20",
    lastUpdated: "2025-06-05",
    soldQuantity: 50,
    returnedQuantity: 5,
    productStatus: "Inactive",
    rating: 3.8,
  },
  {
    id: 3,
    productName: "Air Filter C",
    image: airfilter,
    category: "Engine Parts",
    brand: "Bosch",
    vehicleCompatibility: "i20 2019",
    sku: "ENG-003",
    price: 900,
    discountPrice: 800,
    stockQuantity: 80,
    stockStatus: "In Stock",
    addedOn: "2025-04-18",
    lastUpdated: "2025-05-28",
    soldQuantity: 25,
    returnedQuantity: 3,
    productStatus: "Active",
    rating: 4.2,
  },
  {
    id: 4,
    productName: "Coolant X",
    image: Coolant,
    category: "Engine Parts",
    brand: "Shell",
    vehicleCompatibility: "Venue 2022",
    sku: "ENG-004",
    price: 500,
    discountPrice: 450,
    stockQuantity: 100,
    stockStatus: "In Stock",
    addedOn: "2025-04-01",
    lastUpdated: "2025-06-10",
    soldQuantity: 60,
    returnedQuantity: 1,
    productStatus: "Active",
    rating: 4.7,
  },
  {
    id: 5,
    productName: "Brake Pads D",
    image: BrakePads,
    category: "Engine Parts",
    brand: "Brembo",
    vehicleCompatibility: "XUV500 2020",
    sku: "ENG-005",
    price: 2200,
    discountPrice: 2000,
    stockQuantity: 15,
    stockStatus: "Discontinued",
    addedOn: "2025-03-15",
    lastUpdated: "2025-05-10",
    soldQuantity: 30,
    returnedQuantity: 0,
    productStatus: "Deleted",
    rating: 4.0,
  },
  {
  id: 6,
  productName: "Spark Plug E",
  image: "https://via.placeholder.com/50",
  category: "Engine Parts",
  brand: "NGK",
  vehicleCompatibility: "Alto 2017",
  sku: "ENG-006",
  price: 350,
  discountPrice: 320,
  stockQuantity: 60,
  stockStatus: "In Stock",
  addedOn: "2025-06-01",
  lastUpdated: "2025-06-11",
  soldQuantity: 20,
  returnedQuantity: 1,
  productStatus: "Active",
  rating: 4.1,
},
{
  id: 7,
  productName: "Battery F",
  image: "https://via.placeholder.com/50",
  category: "Electrical",
  brand: "Exide",
  vehicleCompatibility: "WagonR 2021",
  sku: "ELE-007",
  price: 4500,
  discountPrice: 4300,
  stockQuantity: 10,
  stockStatus: "In Stock",
  addedOn: "2025-05-28",
  lastUpdated: "2025-06-10",
  soldQuantity: 5,
  returnedQuantity: 0,
  productStatus: "Active",
  rating: 4.6,
},
{
  id: 8,
  productName: "Headlight G",
  image: "https://via.placeholder.com/50",
  category: "Electrical",
  brand: "Philips",
  vehicleCompatibility: "i10 Nios 2023",
  sku: "ELE-008",
  price: 1800,
  discountPrice: 1600,
  stockQuantity: 5,
  stockStatus: "Out of Stock",
  addedOn: "2025-04-20",
  lastUpdated: "2025-06-08",
  soldQuantity: 50,
  returnedQuantity: 4,
  productStatus: "Inactive",
  rating: 3.9,
},
{
  id: 9,
  productName: "Wiper Blade H",
  image: "https://via.placeholder.com/50",
  category: "Accessories",
  brand: "Bosch",
  vehicleCompatibility: "Creta 2021",
  sku: "ACC-009",
  price: 600,
  discountPrice: 550,
  stockQuantity: 100,
  stockStatus: "In Stock",
  addedOn: "2025-03-30",
  lastUpdated: "2025-06-07",
  soldQuantity: 40,
  returnedQuantity: 2,
  productStatus: "Active",
  rating: 4.3,
},
{
  id: 10,
  productName: "Horn I",
  image: "https://via.placeholder.com/50",
  category: "Electrical",
  brand: "Roots",
  vehicleCompatibility: "Ertiga 2019",
  sku: "ELE-010",
  price: 900,
  discountPrice: 850,
  stockQuantity: 20,
  stockStatus: "In Stock",
  addedOn: "2025-02-15",
  lastUpdated: "2025-05-25",
  soldQuantity: 18,
  returnedQuantity: 1,
  productStatus: "Active",
  rating: 4.4,
},
{
  id: 11,
  productName: "Radiator J",
  image: "https://via.placeholder.com/50",
  category: "Cooling System",
  brand: "Behr",
  vehicleCompatibility: "Scorpio 2022",
  sku: "COOL-011",
  price: 7000,
  discountPrice: 6800,
  stockQuantity: 8,
  stockStatus: "In Stock",
  addedOn: "2025-01-20",
  lastUpdated: "2025-06-06",
  soldQuantity: 3,
  returnedQuantity: 0,
  productStatus: "Inactive",
  rating: 4.0,
},
{
  id: 12,
  productName: "Clutch Plate K",
  image: "https://via.placeholder.com/50",
  category: "Transmission",
  brand: "Valeo",
  vehicleCompatibility: "Dzire 2016",
  sku: "TRANS-012",
  price: 3200,
  discountPrice: 3000,
  stockQuantity: 30,
  stockStatus: "In Stock",
  addedOn: "2025-05-01",
  lastUpdated: "2025-06-01",
  soldQuantity: 10,
  returnedQuantity: 0,
  productStatus: "Active",
  rating: 4.2,
},
{
  id: 13,
  productName: "Shock Absorber L",
  image: "https://via.placeholder.com/50",
  category: "Suspension",
  brand: "KYB",
  vehicleCompatibility: "Innova 2015",
  sku: "SUSP-013",
  price: 5400,
  discountPrice: 5000,
  stockQuantity: 12,
  stockStatus: "Discontinued",
  addedOn: "2025-01-01",
  lastUpdated: "2025-05-15",
  soldQuantity: 6,
  returnedQuantity: 0,
  productStatus: "Deleted",
  rating: 3.7,
},

];

const ProductHistoryTable = () => {
  const [products, setProducts] = useState([]);
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    category: "All",
    productStatus: "All",
    stockStatus: "All",
    dateRange: { from: "", to: "" },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);


  useEffect(() => {
    setProducts(sampleData);
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === editModalData.id ? editModalData : prod))
    );
    setEditModalData(null);
  };

  const handleDelete = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, productStatus: "Deleted" } : p))
    );
  };

  const filteredProducts = products
    .filter((p) =>
      (filters.category === "All" || p.category === filters.category) &&
      (filters.productStatus === "All" || p.productStatus === filters.productStatus) &&
      (filters.stockStatus === "All" || p.stockStatus === filters.stockStatus) &&
      (!filters.dateRange.from || new Date(p.addedOn) >= new Date(filters.dateRange.from)) &&
      (!filters.dateRange.to || new Date(p.addedOn) <= new Date(filters.dateRange.to)) &&
      (
        p.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  if (sortConfig.key) {
    filteredProducts.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

const handlePrint = () => {
  const fullTableHTML = `
    <table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Vehicle Compatibility</th>
          <th>SKU</th>
          <th>Price</th>
          <th>Discount Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Rating</th>
          <th>Added On</th>
          <th>Last Updated</th>
          <th>Sold</th>
          <th>Returned</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${products.map((p) => `
          <tr>
            <td>${p.id}</td>
            <td>${p.productName}</td>
            <td>${p.category}</td>
            <td>${p.brand}</td>
            <td>${p.vehicleCompatibility}</td>
            <td>${p.sku}</td>
            <td>₹${p.price}</td>
            <td>₹${p.discountPrice}</td>
            <td>${p.stockQuantity}</td>
            <td>${p.productStatus}</td>
            <td>${p.rating}</td>
            <td>${p.addedOn}</td>
            <td>${p.lastUpdated}</td>
            <td>${p.soldQuantity}</td>
            <td>${p.returnedQuantity}</td>
            <td>${p.productStatus}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  const printWindow = window.open("", "", "height=800,width=1100");
  printWindow.document.write(`
    <html>
      <head>
        <title>Product Table Print</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
            color: #000;
          }

          .print-header {
            text-align: center;
            margin-bottom: 30px;
          }

          .print-header h1 {
            margin: 0;
            font-size: 28px;
            color: rgb(82, 176, 247);
            font-weight: bold;
          }

          .print-header small {
            font-size: 14px;
            color: #555;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
            margin-top: 10px;
          }

          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: center;
          }

          th {
            background-color: #f0f0f0;
          }
        </style>
      </head>
      <body>
        <div class="print-header">
          <h1>AnshPath</h1>
          <small>Technologies Private Limited</small>
        </div>
        ${fullTableHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};


const handleExportToExcel = () => {
  // Use the data you want to export — here we use current paginated visible products
  const exportData = currentProducts.map((p) => ({
    ID: p.id,
    "Product Name": p.productName,
    Category: p.category,
    Brand: p.brand,
    "Vehicle Compatibility": p.vehicleCompatibility,
    SKU: p.sku,
    Price: p.price,
    "Discount Price": p.discountPrice,
    "Stock Quantity": p.stockQuantity,
    "Stock Status": p.stockStatus,
    "Added On": p.addedOn,
    "Last Updated": p.lastUpdated,
    "Sold Quantity": p.soldQuantity,
    "Returned Quantity": p.returnedQuantity,
    "Product Status": p.productStatus,
    Rating: p.rating,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, "Product_History.xlsx");
};
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditModalData((prevData) => ({
        ...prevData,
        image: reader.result, // base64 image string
      }));
    };
    reader.readAsDataURL(file);
  }
};

return (
  <div>
    {/* Title */}
    <h2 className="page-title-ph">PRODUCT HISTORY</h2>

    {/* Filter + Search Bar */}
    <div className="filters-container-ph">
      <div>
        <label>Category:</label>
        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="All">All</option>
          <option value="Tyres">Tyres</option>
          <option value="Coolants">Coolants</option>
          <option value="Engine Oil">Engine Oil</option>
          <option value="Brake Pads">Brake Pads</option>
        </select>
      </div>

      <div>
        <label>Product Status:</label>
        <select onChange={(e) => setFilters({ ...filters, productStatus: e.target.value })}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Deleted">Deleted</option>
        </select>
      </div>

      <div>
        <label>Stock Status:</label>
        <select onChange={(e) => setFilters({ ...filters, stockStatus: e.target.value })}>
          <option value="All">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Discontinued">Discontinued</option>
        </select>
      </div>

      <div>
        <label>Date From:</label>
        <input
          type="date"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              dateRange: { ...prev.dateRange, from: e.target.value },
            }))
          }
        />
      </div>

      <div>
        <label>Date To:</label>
        <input
          type="date"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              dateRange: { ...prev.dateRange, to: e.target.value },
            }))
          }
        />
      </div>

      <div className="search-bar-ph">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Search name, SKU, brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

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

    <div id="printableTable">
      <div className="product-table-scroll-container-ph">
        <table className="product-table-ph">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Image</th>
              <th onClick={() => setSortConfig({ key: "productName", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Product Name {sortConfig.key === "productName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th>Category</th>
              <th>Brand</th>
              <th>Vehicle Compatibility</th>
              <th>SKU / Code</th>
              <th onClick={() => setSortConfig({ key: "price", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Price {sortConfig.key === "price" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => setSortConfig({ key: "discountPrice", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Discount Price {sortConfig.key === "discountPrice" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => setSortConfig({ key: "stockQuantity", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Stock Qty {sortConfig.key === "stockQuantity" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th>Stock Status</th>
              <th onClick={() => setSortConfig({ key: "addedOn", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Added On {sortConfig.key === "addedOn" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => setSortConfig({ key: "lastUpdated", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Last Updated {sortConfig.key === "lastUpdated" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => setSortConfig({ key: "soldQuantity", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Sold {sortConfig.key === "soldQuantity" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => setSortConfig({ key: "returned", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Returned {sortConfig.key === "returned" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th>Status</th>
              <th onClick={() => setSortConfig({ key: "ratings", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Ratings {sortConfig.key === "ratings" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((p) => (
              <tr key={p.id} className={p.productStatus === "Deleted" ? "deleted-ph" : p.stockStatus === "Out of Stock" ? "out-of-stock-ph" : ""}>
                <td>{p.id}</td>
                <td><img src={p.image} alt={p.productName} className="product-img-ph" /></td>
                <td>{p.productName}</td>
                <td>{p.category}</td>
                <td>{p.brand}</td>
                <td>{p.vehicleCompatibility}</td>
                <td>{p.sku}</td>
                <td>₹{p.price}</td>
                <td>₹{p.discountPrice}</td>
                <td>{p.stockQuantity}</td>
                <td>{p.stockStatus}</td>
                <td>{p.addedOn}</td>
                <td>{p.lastUpdated}</td>
                <td>{p.soldQuantity}</td>
                <td>{p.returnedQuantity}</td>
                <td>
                  <span className={`status-ph ${p.productStatus === "Active" ? "active-ph" : p.productStatus === "Inactive" ? "inactive-ph" : "deleted-ph"}`}>
                    {p.productStatus}
                  </span>
                </td>
                <td>{p.rating} ⭐</td>
                <td className="action-buttons-ph">
                  <i className="bi bi-eye-fill icon-ph view-ph" title="View" onClick={() => setViewModalData(p)}></i>
                  <i className="bi bi-pencil-fill icon-ph edit-ph" title="Edit" onClick={() => setEditModalData(p)}></i>
                  <i className="bi bi-trash-fill icon-ph delete-ph" title="Delete" onClick={() => { setProductToDelete(p); setDeleteModalOpen(true); }}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Delete */}
    {deleteModalOpen && productToDelete && (
      <div className="modal-wrapper-ph">
        <div className="modal-content-ph">
          <div className="modal-header-ph">
            <span>Confirm Delete</span>
            <button className="btn-close-ph" onClick={() => setDeleteModalOpen(false)}>
              &times;
            </button>
          </div>
          <div className="modal-body-ph">
            <p className="delete-confirm-text-ph">
              Are you sure you want to delete <strong>{productToDelete.name}</strong> from brand <strong>{productToDelete.brand}</strong>?
            </p>
          </div>
          <div className="modal-footer-ph">
            <button className="btn-cancel-ph" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
            <button className="btn-delete-ph" onClick={() => handleConfirmDelete(productToDelete.id)}>Delete</button>
          </div>
        </div>
      </div>
    )}

    {/* Pagination */}
    <div className="pagination-controls-ph">
      <div className="entries-selector-ph">
        <label>Show&nbsp;</label>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <label>&nbsp;entries</label>
      </div>

      <div className="pagination-buttons-ph">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
        <ProductViewModal
          viewModalData={viewModalData}
          onClose={() => setViewModalData(null)}
        />
        {editModalData && (
          <EditProductModal
            editModalData={editModalData}
            setEditModalData={setEditModalData}
            handleEditChange={handleEditChange}
            handleEditSave={handleEditSave}
            handleImageUpload={handleImageUpload}
          />
        )}
      </div>
    </div>
  </div>
);
}
export default ProductHistoryTable;