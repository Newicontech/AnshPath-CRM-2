// ProductList.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Card, Form, Pagination, InputGroup, Badge, ProgressBar, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faPlus, faExclamationTriangle, faBoxes, faBoxOpen, faImage, faTag, faCar, faMoneyBillWave, faBox, faShieldAlt, faBarcode, faInfoCircle, faTimes, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  // Sample product data with more relevant images
  const initialProducts = [
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS6cGfNCZKooFqAGlkppvmQ38hAWRGmFDYp4vjZqIAOObqmzdYDz71hmkOYBvG3KBsjyua8y4c7p5HlpmIfjkfGeBbbVTfycYJh2MUwiq2htbBECiv82Yvh1Q',
      name: 'Premium Engine Oil 5W-30',
      category: 'Engine Parts',
      brand: 'Mobil',
      compatibility: 'Swift 2015-2019, Baleno 2016-2020',
      price: 2500,
      discountPercentage: 12,
      stockStatus: 'In Stock',
      stockCount: 42,
      sku: 'MOBIL-5W30-001',
      warranty: '6 months'
    },
    {
      id: 2,
      image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ1SpttEScIzVi3xIpHmMbA22oatId0qjNJyKPyKkONqRNm2QB1KD65FtboSeGoTX8omBNmpAjiPXysf2-sGSuvVn4BD0c-8jl2i0ExqLEfGnq8g3oKBxfmtQ',
      name: 'All Season Tyre 185/65 R15',
      category: 'Tyres',
      brand: 'MRF',
      compatibility: 'Swift, i20, Figo, Polo',
      price: 4500,
      discountPercentage: 7,
      stockStatus: 'In Stock',
      stockCount: 15,
      sku: 'MRF-AS-18565',
      warranty: '1 year'
    },
    {
      id: 3,
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTrTrwyjPVuavJH8UFLT1smd65i226XFhE0YMy1gXo0GRIZLqnq7Ahfj8EdGF60TU-Ayg8kMKncngiZZOj1bRx3897kBD7_NYPduVbaSoTMIdSzQTsCNy6JZw',
      name: 'Brake Pad Set',
      category: 'Brakes',
      brand: 'Bosch',
      compatibility: 'Swift Dzire 2012-2018',
      price: 1800,
      discountPercentage: 11,
      stockStatus: 'Out of Stock',
      stockCount: 0,
      sku: 'BOSCH-BP-SWIFT',
      warranty: '1 year'
    },
    {
      id: 4,
      image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTZt2a8Xn5dfZ4IRnMy6EiGp9CTB-doXcjoRyuYZCOuTpM0YUnsyU6b61QYSuWQK4Dlrh5rfshceTe-fHPLR9x7UoHGb25_YH0cFD_PklMr_rUPWjtNCG71IYY',
      name: 'Shock Absorber',
      category: 'Suspension',
      brand: 'KYB',
      compatibility: 'Hyundai i20 2014-2019',
      price: 3200,
      discountPercentage: 9,
      stockStatus: 'In Stock',
      stockCount: 8,
      sku: 'KYB-SA-I20',
      warranty: '18 months'
    },
    {
      id: 5,
      image: 'https://m.media-amazon.com/images/I/71TWOm5JxOL.jpg',
      name: 'Air Filter',
      category: 'Engine Parts',
      brand: 'K&N',
      compatibility: 'Maruti Suzuki Baleno',
      price: 1500,
      discountPercentage: 0,
      stockStatus: 'In Stock',
      stockCount: 23,
      sku: 'KN-AF-BALENO',
      warranty: '6 months'
    },
    {
      id: 6,
      image: 'https://5.imimg.com/data5/SELLER/Default/2021/12/OV/UB/IO/3033603/car-air-filter.jpg',
      name: 'Cabin Air Filter',
      category: 'Engine Parts',
      brand: 'Bosch',
      compatibility: 'Hyundai Creta, Kia Seltos',
      price: 1200,
      discountPercentage: 8,
      stockStatus: 'In Stock',
      stockCount: 17,
      sku: 'BOSCH-CAF-001',
      warranty: '6 months'
    },
    {
      id: 7,
      image: 'https://m.media-amazon.com/images/I/61tI4YJPq3L._SL1500_.jpg',
      name: 'Spark Plug Set',
      category: 'Engine Parts',
      brand: 'NGK',
      compatibility: 'Honda City 2014-2021',
      price: 2800,
      discountPercentage: 11,
      stockStatus: 'In Stock',
      stockCount: 12,
      sku: 'NGK-SP-HCITY',
      warranty: '1 year'
    },
    {
      id: 8,
      image: 'https://m.media-amazon.com/images/I/61Jt5X9R5BL._SL1500_.jpg',
      name: 'Car Battery',
      category: 'Electrical',
      brand: 'Exide',
      compatibility: 'Maruti Suzuki Swift, Baleno',
      price: 6500,
      discountPercentage: 5,
      stockStatus: 'In Stock',
      stockCount: 5,
      sku: 'EXIDE-BAT-MS',
      warranty: '2 years'
    }
  ];

  // State management
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    compatibility: '',
    price: '',
    discountPercentage: 0,
    stockStatus: 'In Stock',
    stockCount: '',
    sku: '',
    warranty: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  useEffect(() => {
    const checkDarkMode = () => {
      const darkModeEnabled = document.body.classList.contains('dark-mode-HDW-01');
      setIsDarkMode(darkModeEnabled);
    };

    // Initial check
    checkDarkMode();

    // Observe body class changes for dark mode
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Calculate stock statistics
  const totalStock = products.reduce((sum, product) => sum + product.stockCount, 0);
  const inStockCount = products.filter(product => product.stockStatus === 'In Stock').length;
  const outOfStockCount = products.filter(product => product.stockStatus === 'Out of Stock').length;
  const lowStockCount = products.filter(product => product.stockStatus === 'In Stock' && product.stockCount < 10).length;

  // Filter products whenever search or filters change
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
      const matchesStatus = statusFilter === '' || product.stockStatus === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, categoryFilter, statusFilter, products]);

  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedProducts = () => {
    const sortableProducts = [...filteredProducts];
    if (sortConfig.key) {
      sortableProducts.sort((a, b) => {
        // Handle numeric fields differently
        const numericFields = ['price', 'discountPercentage', 'stockCount'];
        if (numericFields.includes(sortConfig.key)) {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        } else {
          // Handle string fields
          if (a[sortConfig.key]?.toLowerCase() < b[sortConfig.key]?.toLowerCase()) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key]?.toLowerCase() > b[sortConfig.key]?.toLowerCase()) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableProducts;
  };

  // Get sort icon for a column
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FontAwesomeIcon icon={faSort} />;
    }
    return sortConfig.direction === 'ascending' ? 
      <FontAwesomeIcon icon={faSortUp} /> : 
      <FontAwesomeIcon icon={faSortDown} />;
  };

  // Pagination logic
  const sortedProducts = getSortedProducts();
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;  
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handle update button click
  const handleUpdateClick = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      brand: product.brand,
      compatibility: product.compatibility,
      price: product.price,
      discountPercentage: product.discountPercentage || 0,
      stockStatus: product.stockStatus,
      stockCount: product.stockCount,
      sku: product.sku,
      warranty: product.warranty,
      image: product.image
    });
    setImagePreview(product.image);
    setShowUpdateModal(true);
  };

  // Handle delete button click
  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  // Handle add new product button click
  const handleAddClick = () => {
    navigate('/addProduct');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  // Save updated product
  const saveUpdatedProduct = () => {
    const updatedProducts = products.map(product => {
      if (product.id === currentProduct.id) {
        return {
          ...product,
          name: formData.name,
          category: formData.category,
          brand: formData.brand,
          compatibility: formData.compatibility,
          price: parseFloat(formData.price),
          discountPercentage: parseFloat(formData.discountPercentage) || 0,
          stockStatus: parseInt(formData.stockCount) > 0 ? 'In Stock' : 'Out of Stock',
          stockCount: parseInt(formData.stockCount),
          sku: formData.sku,
          warranty: formData.warranty,
          image: imagePreview || product.image
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setShowUpdateModal(false);
    setImagePreview(null);
  };

  // Delete product
  const deleteProduct = () => {
    const updatedProducts = products.filter(product => product.id !== currentProduct.id);
    setProducts(updatedProducts);
    setShowDeleteModal(false);
    // Reset pagination if needed
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Always show these columns for all screen sizes
  const visibleColumns = [
    'image',
    'name',
    'category',
    'brand',
    'price',
    'discountPercentage',
    'stockStatus',
    'actions'
  ];

  // Render table header based on visible columns
  const renderTableHeader = () => {
    const headers = {
      image: {
        label: 'Image',
        className: 'th-image-PL-678',
        sortable: false
      },
      name: {
        label: 'Product Name',
        className: 'th-name-PL-678',
        sortable: true,
        key: 'name'
      },
      category: {
        label: 'Category',
        className: 'th-category-PL-678',
        sortable: true,
        key: 'category'
      },
      brand: {
        label: 'Brand',
        className: 'th-brand-PL-678',
        sortable: true,
        key: 'brand'
      },
      price: {
        label: 'Price',
        className: 'th-price-PL-678',
        sortable: true,
        key: 'price'
      },
      discountPercentage: {
        label: 'Discount %',
        className: 'th-discount-PL-678',
        sortable: true,
        key: 'discountPercentage'
      },
      stockStatus: {
        label: 'Stock Status',
        className: 'th-stock-PL-678',
        sortable: false
      },
      actions: {
        label: 'Actions',
        className: 'th-actions-PL-678',
        sortable: false
      }
    };

    return visibleColumns.map(column => {
      const header = headers[column];
      if (!header) return null;
      
      return (
        <th 
          key={column}
          className={header.className}
          onClick={header.sortable ? () => requestSort(header.key) : undefined}
          style={{ cursor: header.sortable ? 'pointer' : 'default' }}
        >
          <div className="d-flex align-items-center gap-2">
            {header.label}
            {header.sortable && getSortIcon(header.key)}
          </div>
        </th>
      );
    });
  };

  // Render table cell based on visible columns
  const renderTableCell = (product, column) => {
    switch (column) {
      case 'image':
        return (
          <td className="td-image-PL-678">
            <img src={product.image} alt={product.name} className="product-img-PL-678" />
          </td>
        );
      case 'name':
        return <td className="td-name-PL-678">{product.name}</td>;
      case 'category':
        return <td className="td-category-PL-678">{product.category}</td>;
      case 'brand':
        return <td className="td-brand-PL-678">{product.brand}</td>;
      case 'price':
        return <td className="td-price-PL-678">₹{typeof product.price === 'number' ? product.price.toLocaleString() : '-'}</td>;
      case 'discountPercentage':
        return (
          <td className="td-discount-PL-678">
            {product.discountPercentage > 0 ? `${product.discountPercentage}%` : '-'}
          </td>
        );
      case 'stockStatus':
        return (
          <td className="td-stock-PL-678">
            <div className="d-flex flex-column">
              <Badge 
                bg={product.stockStatus === 'In Stock' ? 
                    (product.stockCount < 10 ? 'warning' : 'success') : 'danger'} 
                className="stock-badge-PL-678 mb-1"
              >
                {product.stockStatus}
              </Badge>
              <div className="d-flex align-items-center">
                <small className={`me-2 ${isDarkMode ? 'text-light' : ''}`}>{product.stockCount} units</small>
                <ProgressBar 
                  now={product.stockCount} 
                  max={100}
                  variant={
                    product.stockStatus === 'Out of Stock' ? 'danger' : 
                    (product.stockCount < 10 ? 'warning' : 'success')
                  }
                  style={{ height: '5px', width: '60px' }}
                />
              </div>
            </div>
          </td>
        );
      case 'actions':
        return (
          <td className="td-actions-PL-678">
            <div className="action-btn-container-PL-678">
              <Button
                variant="link"
                size="sm"
                className={`action-btn-PL-678 update-btn-PL-678 p-0 ${isDarkMode ? 'text-light' : 'text-primary'}`}
                onClick={() => handleUpdateClick(product)}
                title="Edit"
              >
                <FontAwesomeIcon icon={faEdit} className="action-icon-PL-678" />
              </Button>
              <Button
                variant="link"
                size="sm"
                className={`action-btn-PL-678 delete-btn-PL-678 p-0 ${isDarkMode ? 'text-light' : 'text-danger'}`}
                onClick={() => handleDeleteClick(product)}
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="action-icon-PL-678" />
              </Button>
            </div>
          </td>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`container-fluid-PL-678${isDarkMode ? ' dark-mode-HDW-01' : ''}`}>
      <div className="row-PL-678">
        <div className="col-12-PL-678">
          <h1 className="main-title-PL-678">Product List</h1>
          
          {/* Stock Summary Cards */}
          <div className="d-flex flex-wrap mb-4 gap-3">
            <Card className={`flex-fill shadow-sm ${isDarkMode ? 'bg-dark' : ''}`} style={{ minWidth: '200px' }}>
              <Card.Body className="d-flex align-items-center">
                <div className={`me-3 p-3 rounded ${isDarkMode ? 'bg-primary bg-opacity-25' : 'bg-primary bg-opacity-10'}`}>
                  <FontAwesomeIcon icon={faBoxes} className="text-primary" size="2x" />
                </div>
                <div>
                  <h6 className={`mb-1 ${isDarkMode ? 'text-light' : ''}`}>Total Stock</h6>
                  <h3 className={`mb-0 ${isDarkMode ? 'text-light' : ''}`}>{totalStock}</h3>
                  <small className={`${isDarkMode ? 'text-light' : 'text-muted'}`}>Items in inventory</small>
                </div>
              </Card.Body>
            </Card>
            
            <Card className={`flex-fill shadow-sm ${isDarkMode ? 'bg-dark' : ''}`} style={{ minWidth: '200px' }}>
              <Card.Body className="d-flex align-items-center">
                <div className={`me-3 p-3 rounded ${isDarkMode ? 'bg-success bg-opacity-25' : 'bg-success bg-opacity-10'}`}>
                  <FontAwesomeIcon icon={faBoxes} className="text-success" size="2x" />
                </div>
                <div>
                  <h6 className={`mb-1 ${isDarkMode ? 'text-light' : ''}`}>In Stock</h6>
                  <h3 className={`mb-0 ${isDarkMode ? 'text-light' : ''}`}>{inStockCount}</h3>
                  <small className={`${isDarkMode ? 'text-light' : 'text-muted'}`}>Available products</small>
                </div>
              </Card.Body>
            </Card>
            
            <Card className={`flex-fill shadow-sm ${isDarkMode ? 'bg-dark' : ''}`} style={{ minWidth: '200px' }}>
              <Card.Body className="d-flex align-items-center">
                <div className={`me-3 p-3 rounded ${isDarkMode ? 'bg-warning bg-opacity-25' : 'bg-warning bg-opacity-10'}`}>
                  <FontAwesomeIcon icon={faBoxes} className="text-warning" size="2x" />
                </div>
                <div>
                  <h6 className={`mb-1 ${isDarkMode ? 'text-light' : ''}`}>Low Stock</h6>
                  <h3 className={`mb-0 ${isDarkMode ? 'text-light' : ''}`}>{lowStockCount}</h3>
                  <small className={`${isDarkMode ? 'text-light' : 'text-muted'}`}>Items below 10</small>
                </div>
              </Card.Body>
            </Card>
            
            <Card className={`flex-fill shadow-sm ${isDarkMode ? 'bg-dark' : ''}`} style={{ minWidth: '200px' }}>
              <Card.Body className="d-flex align-items-center">
                <div className={`me-3 p-3 rounded ${isDarkMode ? 'bg-danger bg-opacity-25' : 'bg-danger bg-opacity-10'}`}>
                  <FontAwesomeIcon icon={faBoxOpen} className="text-danger" size="2x" />
                </div>
                <div>
                  <h6 className={`mb-1 ${isDarkMode ? 'text-light' : ''}`}>Out of Stock</h6>
                  <h3 className={`mb-0 ${isDarkMode ? 'text-light' : ''}`}>{outOfStockCount}</h3>
                  <small className={`${isDarkMode ? 'text-light' : 'text-muted'}`}>Unavailable products</small>
                </div>
              </Card.Body>
            </Card>
          </div>
          
          {/* Search and Filter Section */}
          <Card className="search-card-PL-678">
            <Card.Body className="card-body-PL-678">
              <Row className="g-3">
                <Col md={6} sm={12}>
                  <InputGroup className="search-group-PL-678">
                    <Form.Control
                      type="text"
                      placeholder="Search by name, brand, category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input-PL-678"
                    />
                    <Button variant="primary" className="search-btn-PL-678">
                      <FontAwesomeIcon icon={faSearch} className="search-icon-PL-678" /> Search
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={3} sm={6}>
                  <Form.Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="filter-select-PL-678"
                  >
                    <option value="">All Categories</option>
                    <option value="Engine Parts">Engine Parts</option>
                    <option value="Tyres">Tyres</option>
                    <option value="Brakes">Brakes</option>
                    <option value="Suspension">Suspension</option>
                    <option value="Electrical">Electrical</option>
                  </Form.Select>
                </Col>
                <Col md={3} sm={6}>
                  <Form.Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select-PL-678"
                  >
                    <option value="">All Status</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </Form.Select>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          {/* Product Table */}
          <Card className="product-card-PL-678">
            <Card.Body className="table-card-body-PL-678">
              <div className="table-responsive-PL-678">
                <Table striped hover className="product-table-PL-678">
                  <thead className="table-header-PL-678">
                    <tr>
                      {renderTableHeader()}
                    </tr>
                  </thead>
                  <tbody className="table-body-PL-678">
                    {currentItems.length === 0 ? (
                      <tr className="empty-row-PL-678">
                        <td colSpan={visibleColumns.length} className="empty-cell-PL-678">
                          No products found. Try adjusting your search filters.
                        </td>
                      </tr>
                    ) : currentItems.map(product => (
                      <tr key={product.id} className="product-row-PL-678">
                        {visibleColumns.map(column => (
                          <React.Fragment key={column}>
                            {renderTableCell(product, column)}
                          </React.Fragment>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      
      {/* Enhanced Pagination */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-2">
        <div className={`${isDarkMode ? 'text-light' : 'text-muted'}`}>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedProducts.length)} of {sortedProducts.length} products
        </div>
        <Pagination className="pagination-PL-678 mb-0">
          <Pagination.Prev 
            className="page-item-PL-678"
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item 
              key={i + 1} 
              active={i + 1 === currentPage}
              onClick={() => paginate(i + 1)}
              className="page-item-PL-678"
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            className="page-item-PL-678"
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
        <div className={`d-flex align-items-center ${isDarkMode ? 'text-light' : 'text-muted'}`}>
          Items per page: 
          <Form.Select 
            size="sm" 
            className={`d-inline-block w-auto ms-2 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Form.Select>
        </div>
      </div>
      
{/* Enhanced Update Product Modal */}
<Modal 
  show={showUpdateModal} 
  onHide={() => {
    setShowUpdateModal(false);
    setImagePreview(null);
  }} 
  size="lg"
  centered
  className={`update-modal-PL-678${isDarkMode ? ' dark-mode-HDW-01' : ''}`}
  contentClassName={isDarkMode ? 'bg-dark' : ''}
  container={document.querySelector('.body-HDW-01')}
>
  <Modal.Header 
    closeButton 
    className={`modal-header-PL-678 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
    style={{
      background: isDarkMode 
        ? 'linear-gradient(135deg, #23243a, #2c3e50)' 
        : 'linear-gradient(135deg, #3498db, #4a34ee)',
      borderBottom: 'none'
    }}
  >
    <Modal.Title className="modal-title-PL-678">
      <FontAwesomeIcon icon={faEdit} className="me-2" />
      Update Product Details
    </Modal.Title>
  </Modal.Header>
  
  <Modal.Body className={`modal-body-PL-678 ${isDarkMode ? 'bg-dark text-light' : ''}`}>
    <Row>
      {/* Image Upload Section (left column) */}
      <Col md={4} className="d-flex flex-column align-items-center justify-content-center mb-3 mb-md-0">
        <div className="image-upload-section w-100 d-flex flex-column align-items-center justify-content-center">
          <div className="image-preview-container mb-2 w-100 d-flex justify-content-center align-items-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="image-preview-PL-678"
              />
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center w-100" style={{minHeight: 100}}>
                <FontAwesomeIcon 
                  icon={faImage} 
                  size="2x" 
                  className={`${isDarkMode ? 'text-light' : 'text-muted'} mb-2`}
                />
                <small className={`${isDarkMode ? 'text-light' : 'text-muted'}`}>No Image Selected</small>
              </div>
            )}
          </div>
          <div className="w-100 d-flex flex-column align-items-center gap-2">
            <input
              id="update-image-input"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
              accept="image/*"
            />
            <Button
              variant={isDarkMode ? (imagePreview ? 'danger' : 'outline-light') : (imagePreview ? 'danger' : 'outline-primary')}
              className="upload-image-btn-PL-678 w-100"
              onClick={() => {
                if (imagePreview) {
                  removeImage();
                } else {
                  document.getElementById('update-image-input').click();
                }
              }}
              style={{ fontWeight: 500, borderRadius: 8, minHeight: 40 }}
            >
              <FontAwesomeIcon icon={imagePreview ? faTimes : faImage} className="me-2" />
              {imagePreview ? 'Remove Image' : 'Upload Image'}
            </Button>
            <div className={`file-info-text text-center ${isDarkMode ? 'text-light' : 'text-muted'}`}
              style={{ fontSize: '0.85rem' }}>
              <FontAwesomeIcon icon={faInfoCircle} className="me-1" /> JPG, PNG or GIF (Max 2MB)
            </div>
          </div>
        </div>
      </Col>
      
      {/* Right Column - Form Fields */}
      <Col md={8}>
        <Form>
          <Row className="g-3">
            {/* Product Name */}
            <Col md={12}>
              <Form.Group controlId="formProductName">
                <Form.Label className={`form-label-PL-678 fw-semibold ${isDarkMode ? 'text-light' : ''}`}>
                  <FontAwesomeIcon icon={faTag} className="me-2" />
                  Product Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`form-control-PL-678 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  placeholder="Enter product name"
                />
              </Form.Group>
            </Col>

            {/* Category and Brand */}
            <Col md={6}>
              <Form.Group controlId="formCategory">
                <Form.Label className={`form-label-PL-678 fw-semibold ${isDarkMode ? 'text-light' : ''}`}>
                  <FontAwesomeIcon icon={faBox} className="me-2" />
                  Category <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className={`form-select-PL-678 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                >
                  <option value="">Select Category</option>
                  <option value="Engine Parts">Engine Parts</option>
                  <option value="Tyres">Tyres</option>
                  <option value="Brakes">Brakes</option>
                  <option value="Suspension">Suspension</option>
                  <option value="Electrical">Electrical</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="formBrand">
                <Form.Label className={`form-label-PL-678 fw-semibold ${isDarkMode ? 'text-light' : ''}`}>
                  <FontAwesomeIcon icon={faBarcode} className="me-2" />
                  Brand <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className={`form-control-PL-678 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  placeholder="Enter brand name"
                />
              </Form.Group>
            </Col>
            
            {/* Compatibility and SKU */}
            <Col md={6}>
              <Form.Group controlId="formCompatibility">
                <Form.Label className={`form-label-PL-678 fw-semibold ${isDarkMode ? 'text-light' : ''}`}>
                  <FontAwesomeIcon icon={faCar} className="me-2" />
                  Vehicle <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="compatibility"
                  value={formData.compatibility}
                  onChange={handleInputChange}
                  required
                  className={`form-control-PL-678 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  placeholder="Enter compatible vehicles"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="formSKU">
                <Form.Label className={`form-label-PL-678 fw-semibold ${isDarkMode ? 'text-light' : ''}`}>
                  <FontAwesomeIcon icon={faBarcode} className="me-2" />
                  SKU <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  required
                  className={`form-control-PL-678 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  placeholder="Enter SKU"
                />
              </Form.Group>
            </Col>
            
            {/* Price and Discount */}
            <Col md={6}>
              <Form.Group controlId="formPrice">
                <Form.Label className={`form-label-PL-678 fw-semibold ${isDarkMode ? 'text-light' : ''}`}>
                  <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                  Price (₹) <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className={`form-control-PL-678 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDiscountPercentage">
                <Form.Label className={`form-label-PL-678 fw-semibold ${isDarkMode ? 'text-light' : ''}`}>
                  % Discount
                </Form.Label>
                <Form.Control
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={(e) => {
                    const percentage = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      discountPercentage: percentage
                    }));
                  }}
                  className={`form-control-PL-678 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  placeholder="Enter discount %"
                  min="0"
                  max="100"
                  step="1"
                />
                {formData.discountPercentage > 100 && (
                  <Form.Text className="text-danger">
                    Discount percentage cannot exceed 100%
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            
            {/* Stock and Warranty */}
            <Col md={6}>
              <Form.Group controlId="formStockCount">
                <Form.Label className={`form-label-PL-678 fw-semibold ${isDarkMode ? 'text-light' : ''}`}>
                  <FontAwesomeIcon icon={faBoxes} className="me-2" />
                  Stock Count <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="stockCount"
                  value={formData.stockCount}
                  onChange={handleInputChange}
                  required
                  className={`form-control-PL-678 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  placeholder="Enter stock count"
                  min="0"
                />
                <small className={`${isDarkMode ? 'text-light' : 'text-muted'}`}>
                  Current stock: {formData.stockCount || 0} units
                </small>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="formWarranty">
                <Form.Label className={`form-label-PL-678 fw-semibold ${isDarkMode ? 'text-light' : ''}`}>
                  <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                  Warranty <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleInputChange}
                  required
                  className={`form-control-PL-678 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  placeholder="Enter warranty period"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </Modal.Body>
  <Modal.Footer 
    className={`modal-footer-PL-678 d-flex justify-content-center ${isDarkMode ? 'bg-dark border-secondary' : ''}`}
    style={{ borderTop: 'none' }}
  >
    <div className="d-flex gap-3">
      <Button 
        variant="danger"
        onClick={() => {
          setShowUpdateModal(false);
          setImagePreview(null);
        }}
        className="cancel-btn-PL-678"
      >
        Cancel
      </Button>
      <Button 
        variant="success"
        onClick={saveUpdatedProduct}
        className="save-btn-PL-678"
        disabled={formData.discountPercentage > 100}
      >
        Save Changes
      </Button>
    </div>
  </Modal.Footer>
</Modal>

{/* Delete Confirmation Modal */}
<Modal 
  show={showDeleteModal} 
  onHide={() => setShowDeleteModal(false)}
  centered
  className={`delete-modal-PL-678${isDarkMode ? ' dark-mode-HDW-01' : ''}`}
  contentClassName={isDarkMode ? 'bg-dark' : ''}
  container={document.querySelector('.body-HDW-01')}
>
  <Modal.Header 
    closeButton 
    className={`delete-header-PL-678 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}
    style={{
      background: isDarkMode 
        ? 'linear-gradient(135deg, #a71d31, #8a1628)' 
        : 'linear-gradient(135deg, #dc3545, #c82333)',
      borderBottom: 'none'
    }}
  >
    <Modal.Title className="delete-title-PL-678">
      <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
      Confirm Deletion
    </Modal.Title>
  </Modal.Header>
  <Modal.Body className={`delete-body-PL-678 ${isDarkMode ? 'bg-dark text-light' : ''}`}>
    <div className="delete-content-PL-678 text-center">
      <FontAwesomeIcon 
        icon={faExclamationTriangle} 
        size="3x" 
        className={`warning-icon-PL-678 mb-3 ${isDarkMode ? 'text-danger' : ''}`}
      />
      <h5 className={`delete-message-PL-678 ${isDarkMode ? 'text-light' : ''}`}>
        Are you sure you want to delete this product?
      </h5>
      <p className={`product-name-PL-678 fw-bold ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
        {currentProduct?.name}
      </p>
      {currentProduct && (
        <img 
          src={currentProduct.image} 
          alt={currentProduct.name} 
          className="delete-img-PL-678 img-fluid rounded" 
        />
      )}
    </div>
  </Modal.Body>
  <Modal.Footer className={`delete-footer-PL-678 d-flex justify-content-center ${isDarkMode ? 'bg-dark border-secondary' : ''}`}>
    <div className="d-flex gap-3">
      <Button 
        variant={isDarkMode ? 'outline-light' : 'secondary'}
        onClick={() => setShowDeleteModal(false)}
        className="delete-cancel-btn-PL-678 px-4"
      >
        Cancel
      </Button>
      <Button 
        variant="danger"
        onClick={deleteProduct}
        className="delete-confirm-btn-PL-678 px-4"
      >
        Yes, Delete
      </Button>
    </div>
  </Modal.Footer>
</Modal>
    </div>
  );
};

export default ProductList;