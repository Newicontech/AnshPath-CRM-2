import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Card, Form, Pagination, InputGroup, Badge, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faPlus, faExclamationTriangle, faBoxes, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import './ProductList.css';

const ProductList = () => {
  // Sample product data with more relevant images
  const initialProducts = [
    {
      id: 1,
      image: '',
      name: 'Premium Engine Oil 5W-30',
      category: 'Engine Parts',
      brand: 'Mobil',
      compatibility: 'Swift 2015-2019, Baleno 2016-2020',
      price: 2500,
      discountPrice: 2200,
      stockStatus: 'In Stock',
      stockCount: 42,
      sku: 'MOBIL-5W30-001',
      warranty: '6 months'
    },
    {
      id: 2,
      image: '',
      name: 'All Season Tyre 185/65 R15',
      category: 'Tyres',
      brand: 'MRF',
      compatibility: 'Swift, i20, Figo, Polo',
      price: 4500,
      discountPrice: 4200,
      stockStatus: 'In Stock',
      stockCount: 15,
      sku: 'MRF-AS-18565',
      warranty: '1 year'
    },
    {
      id: 3,
      image: '',
      name: 'Brake Pad Set',
      category: 'Brakes',
      brand: 'Bosch',
      compatibility: 'Swift Dzire 2012-2018',
      price: 1800,
      discountPrice: 1600,
      stockStatus: 'Out of Stock',
      stockCount: 0,
      sku: 'BOSCH-BP-SWIFT',
      warranty: '1 year'
    },
    {
      id: 4,
      image: '',
      name: 'Shock Absorber',
      category: 'Suspension',
      brand: 'KYB',
      compatibility: 'Hyundai i20 2014-2019',
      price: 3200,
      discountPrice: 2900,
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
      discountPrice: null,
      stockStatus: 'In Stock',
      stockCount: 23,
      sku: 'KN-AF-BALENO',
      warranty: '6 months'
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    compatibility: '',
    price: '',
    discountPrice: '',
    stockStatus: 'In Stock',
    stockCount: '',
    sku: '',
    warranty: '',
    image: ''
  });

  const isDarkMode = document.body.classList.contains('dark-mode-HDW-01');

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
  }, [searchTerm, categoryFilter, statusFilter, products]);

  // Handle update button click
  const handleUpdateClick = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      brand: product.brand,
      compatibility: product.compatibility,
      price: product.price,
      discountPrice: product.discountPrice || '',
      stockStatus: product.stockStatus,
      stockCount: product.stockCount,
      sku: product.sku,
      warranty: product.warranty,
      image: product.image
    });
    setShowUpdateModal(true);
  };

  // Handle delete button click
  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  // Handle add new product button click
  const handleAddClick = () => {
    setFormData({
      name: '',
      category: '',
      brand: '',
      compatibility: '',
      price: '',
      discountPrice: '',
      stockStatus: 'In Stock',
      stockCount: '',
      sku: '',
      warranty: '',
      image: ''
    });
    setShowAddModal(true);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
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
          discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
          stockStatus: parseInt(formData.stockCount) > 0 ? 'In Stock' : 'Out of Stock',
          stockCount: parseInt(formData.stockCount),
          sku: formData.sku,
          warranty: formData.warranty,
          image: formData.image || product.image
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setShowUpdateModal(false);
  };

  // Add new product
  const addNewProduct = () => {
    const newProduct = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      compatibility: formData.compatibility,
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
      stockStatus: parseInt(formData.stockCount) > 0 ? 'In Stock' : 'Out of Stock',
      stockCount: parseInt(formData.stockCount),
      sku: formData.sku,
      warranty: formData.warranty,
      image: formData.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    };

    setProducts([...products, newProduct]);
    setShowAddModal(false);
  };

  // Delete product
  const deleteProduct = () => {
    const updatedProducts = products.filter(product => product.id !== currentProduct.id);
    setProducts(updatedProducts);
    setShowDeleteModal(false);
  };

  return (
    <div className="container-fluid-PL-678">
      <div className="row-PL-678">
        <div className="col-12-PL-678">
          <h1 className="main-title-PL-678">Automobile Product Inventory</h1>
          
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
              <div className="row-PL-678">
                <div className="col-md-6-PL-678">
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
                </div>
                <div className="col-md-6-PL-678">
                  <div className="filter-row-PL-678">
                    <div className="filter-col-PL-678">
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
                      </Form.Select>
                    </div>
                    <div className="filter-col-PL-678">
                      <Form.Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="filter-select-PL-678"
                      >
                        <option value="">All Status</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </Form.Select>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          {/* Product Table */}
          <Card className="product-card-PL-678">
            <Card.Header className="card-header-PL-678">
              <div className="header-content-PL-678">
                <div>
                  <h5 className="header-title-PL-678">Product Inventory</h5>
                  <p className={`header-subtitle-PL-678 mb-0 ${isDarkMode ? 'text-light' : ''}`}>Manage your automobile parts inventory</p>
                </div>
                <Button variant={isDarkMode ? "outline-light" : "light"} size="sm" className="add-btn-PL-678" onClick={handleAddClick}>
                  <FontAwesomeIcon icon={faPlus} className="add-icon-PL-678" /> Add New Product
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="table-card-body-PL-678">
              <div className="table-responsive-PL-678">
                <Table striped hover className="product-table-PL-678">
                  <thead className="table-header-PL-678">
                    <tr>
                      <th className="th-image-PL-678">Image</th>
                      <th className="th-name-PL-678">Product Name</th>
                      <th className="th-category-PL-678">Category</th>
                      <th className="th-brand-PL-678">Brand</th>
                      <th className="th-compatibility-PL-678">Vehicle Compatibility</th>
                      <th className="th-price-PL-678">Price</th>
                      <th className="th-discount-PL-678">Discount Price</th>
                      <th className="th-stock-PL-678">Stock Status</th>
                      <th className="th-sku-PL-678">SKU</th>
                      <th className="th-warranty-PL-678">Warranty</th>
                      <th className="th-actions-PL-678">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-body-PL-678">
                    {filteredProducts.length === 0 ? (
                      <tr className="empty-row-PL-678">
                        <td colSpan="11" className="empty-cell-PL-678">
                          No products found. Try adjusting your search filters.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map(product => (
                        <tr key={product.id} className="product-row-PL-678">
                          <td className="td-image-PL-678">
                            <img src={product.image} alt={product.name} className="product-img-PL-678" />
                          </td>
                          <td className="td-name-PL-678">{product.name}</td>
                          <td className="td-category-PL-678">{product.category}</td>
                          <td className="td-brand-PL-678">{product.brand}</td>
                          <td className="td-compatibility-PL-678">{product.compatibility}</td>
                          <td className="td-price-PL-678">₹{product.price.toLocaleString()}</td>
                          <td className="td-discount-PL-678">
                            {product.discountPrice ? '₹' + product.discountPrice.toLocaleString() : '-'}
                          </td>
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
                          <td className="td-sku-PL-678">{product.sku}</td>
                          <td className="td-warranty-PL-678">{product.warranty}</td>
                          <td className="td-actions-PL-678">
                            <div className="action-btn-container-PL-678">
                              <Button
                                variant={isDarkMode ? "outline-light" : "outline-primary"}
                                size="sm"
                                className="action-btn-PL-678 update-btn-PL-678"
                                onClick={() => handleUpdateClick(product)}
                              >
                                <FontAwesomeIcon icon={faEdit} className="action-icon-PL-678" /> Edit
                              </Button>
                              <Button
                                variant={isDarkMode ? "outline-light" : "outline-danger"}
                                size="sm"
                                className="action-btn-PL-678 delete-btn-PL-678"
                                onClick={() => handleDeleteClick(product)}
                              >
                                <FontAwesomeIcon icon={faTrashAlt} className="action-icon-PL-678" /> Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
              
              {/* Pagination */}
              <Pagination className="pagination-PL-678">
                <Pagination.Prev disabled className="page-item-PL-678" />
                <Pagination.Item active className="page-item-PL-678">1</Pagination.Item>
                <Pagination.Item className="page-item-PL-678">2</Pagination.Item>
                <Pagination.Item className="page-item-PL-678">3</Pagination.Item>
                <Pagination.Next className="page-item-PL-678" />
              </Pagination>
            </Card.Body>
          </Card>
        </div>
      </div>
      
      {/* Update Product Modal */}
      <Modal 
        show={showUpdateModal} 
        onHide={() => setShowUpdateModal(false)} 
        size="lg"
        className="update-modal-PL-678"
      >
        <Modal.Header closeButton className="modal-header-PL-678">
          <Modal.Title className="modal-title-PL-678">Update Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-PL-678">
          <Form className="update-form-PL-678">
            <div className="form-row-PL-678">
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="form-select-PL-678"
                >
                  <option value="">Select Category</option>
                  <option value="Engine Parts">Engine Parts</option>
                  <option value="Tyres">Tyres</option>
                  <option value="Brakes">Brakes</option>
                  <option value="Suspension">Suspension</option>
                </Form.Select>
              </div>
            </div>
            <div className="form-row-PL-678">
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Vehicle Compatibility</Form.Label>
                <Form.Control
                  type="text"
                  name="compatibility"
                  value={formData.compatibility}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
            </div>
            <div className="form-row-PL-678">
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Discount Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  className="form-control-PL-678"
                />
              </div>
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Stock Count</Form.Label>
                <Form.Control
                  type="number"
                  name="stockCount"
                  value={formData.stockCount}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
            </div>
            <div className="form-row-PL-678">
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">SKU</Form.Label>
                <Form.Control
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Warranty</Form.Label>
                <Form.Control
                  type="text"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
            </div>
            <div className="form-group-PL-678">
              <Form.Label className="form-label-PL-678">Product Image</Form.Label>
              <Form.Control 
                type="file" 
                className="file-input-PL-678"
                onChange={handleImageUpload}
              />
              {formData.image && (
                <div className="image-preview-container-PL-678">
                  <img src={formData.image} alt="Preview" className="image-preview-PL-678" />
                </div>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer-PL-678">
          <Button 
            variant="secondary" 
            onClick={() => setShowUpdateModal(false)}
            className="cancel-btn-PL-678"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={saveUpdatedProduct}
            className="save-btn-PL-678"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Add Product Modal */}
      <Modal 
        show={showAddModal} 
        onHide={() => setShowAddModal(false)} 
        size="lg"
        className="add-modal-PL-678"
      >
        <Modal.Header closeButton className="modal-header-PL-678 add-modal-header-PL-678">
          <Modal.Title className="modal-title-PL-678">Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-PL-678">
          <Form className="update-form-PL-678">
            <div className="form-row-PL-678">
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="form-select-PL-678"
                >
                  <option value="">Select Category</option>
                  <option value="Engine Parts">Engine Parts</option>
                  <option value="Tyres">Tyres</option>
                  <option value="Brakes">Brakes</option>
                  <option value="Suspension">Suspension</option>
                </Form.Select>
              </div>
            </div>
            <div className="form-row-PL-678">
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Vehicle Compatibility</Form.Label>
                <Form.Control
                  type="text"
                  name="compatibility"
                  value={formData.compatibility}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
            </div>
            <div className="form-row-PL-678">
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Discount Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  className="form-control-PL-678"
                />
              </div>
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Stock Count</Form.Label>
                <Form.Control
                  type="number"
                  name="stockCount"
                  value={formData.stockCount}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
            </div>
            <div className="form-row-PL-678">
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">SKU</Form.Label>
                <Form.Control
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
              <div className="form-group-PL-678">
                <Form.Label className="form-label-PL-678">Warranty</Form.Label>
                <Form.Control
                  type="text"
                  name="warranty"
                  value={formData.warranty}
                  onChange={handleInputChange}
                  required
                  className="form-control-PL-678"
                />
              </div>
            </div>
            <div className="form-group-PL-678">
              <Form.Label className="form-label-PL-678">Product Image</Form.Label>
              <Form.Control 
                type="file" 
                className="file-input-PL-678"
                onChange={handleImageUpload}
                required
              />
              {formData.image && (
                <div className="image-preview-container-PL-678">
                  <img src={formData.image} alt="Preview" className="image-preview-PL-678" />
                </div>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer-PL-678">
          <Button 
            variant="secondary" 
            onClick={() => setShowAddModal(false)}
            className="cancel-btn-PL-678"
          >
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={addNewProduct}
            className="save-btn-PL-678"
            disabled={!formData.name || !formData.category || !formData.brand || !formData.compatibility || !formData.price || !formData.stockCount || !formData.sku || !formData.warranty}
          >
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)}
        className="delete-modal-PL-678"
      >
        <Modal.Header closeButton className="delete-header-PL-678">
          <Modal.Title className="delete-title-PL-678">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="delete-body-PL-678">
          <div className="delete-content-PL-678">
            <FontAwesomeIcon 
              icon={faExclamationTriangle} 
              className="warning-icon-PL-678" 
            />
            <h5 className="delete-message-PL-678">Are you sure you want to delete this product?</h5>
            <p className="product-name-PL-678">{currentProduct?.name}</p>
            {currentProduct && (
              <img 
                src={currentProduct.image} 
                alt={currentProduct.name} 
                className="delete-img-PL-678" 
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="delete-footer-PL-678">
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteModal(false)}
            className="delete-cancel-btn-PL-678"
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={deleteProduct}
            className="delete-confirm-btn-PL-678"
          >
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;