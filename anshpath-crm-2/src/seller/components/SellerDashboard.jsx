import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import './SellerDashboard.css'; 
import SellerRouting from '../routing/SellerRouting';

const SellerDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({
    'dashboard-HDW-01': true,
    'jobs-HDW-01': false,
    'products-HDW-01': false,
    'services-HDW-01': false,
    'vehicles-HDW-01': false,
    'inventory-HDW-01': false,
    'customers-HDW-01': false,
    'employees-HDW-01': false,
    'suppliers-HDW-01': false,
    'financials-HDW-01': false,
    'reports-HDW-01': false,
    'utilities-HDW-01': false,
    'settings-HDW-01': false,
    'chat-HDW-01': false,
    'table-HDW-01': false
  });

  useEffect(() => {
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme-HDW-01') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }

    // Initialize sidebar state based on screen size
    function handleResize() {
      if (window.innerWidth < 1200) {
        setSidebarCollapsed(false);
        setSidebarOpen(false);
      } else {
        setSidebarCollapsed(false);
        setSidebarOpen(false);
      }
    }

    // Initial setup
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme-HDW-01', newDarkMode ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 1200) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleSubmenu = (menuName) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1200) {
      setSidebarOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setProfileDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={`body-HDW-01 ${darkMode ? 'dark-mode-HDW-01' : ''}`}>
      {/* Header */}
      <header className="header-HDW-01">
        <div className="header-content-HDW-01">
          <div className="d-flex align-items-center">
            <button 
              id="sidebar-toggle-HDW-01" 
              className="icon-button-HDW-01 me-3 menu-icon-animate-HDW-01"
              onClick={toggleSidebar}
            >
              <i className="bi bi-list"></i>
            </button>
            <div className="brand-logo-HDW-01 brand-animate-HDW-01">
              <span className="brand-main-HDW-01">AnshPath</span>
              <span className="brand-sub-HDW-01">Technologies Private Limited</span>
            </div>
          </div>
          
          <div className="header-actions-HDW-01">
            <div className="theme-switch-HDW-01">
              <label className="switch-HDW-01">
                <input 
                  type="checkbox" 
                  id="theme-toggle-HDW-01" 
                  checked={darkMode}
                  onChange={toggleTheme}
                />
                <span className="slider-HDW-01"></span>
              </label>
              <span id="theme-label-HDW-01" className="theme-label-HDW-01">
                {darkMode ? 'Dark' : 'Light'}
              </span>
            </div>
            
            <div>
              <button className="icon-button-HDW-01 pulse-HDW-01" id="notification-button-desktop-HDW-01">
                <i className="bi bi-bell"></i>
                <span className="badge-HDW-01">5</span>
              </button>
            </div>
            
            <div>
              <button className="icon-button-HDW-01" id="message-button-desktop-HDW-01">
                <i className="bi bi-chat-left-text"></i>
                <span className="badge-HDW-01">3</span>
              </button>
            </div>
            
            <div className="profile-dropdown-container-HDW-01">
              <button 
                id="profile-dropdown-btn-HDW-01" 
                className="profile-button-HDW-01"
                onClick={toggleProfileDropdown}
              >
                <div className="profile-avatar-HDW-01">JS</div>
                <span className="profile-name-HDW-01">John Smith</span>
                <i className={`profile-arrow-HDW-01 bi ${profileDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>
              
              <div 
                id="profile-dropdown-HDW-01" 
                className={`dropdown-menu-HDW-01 ${profileDropdownOpen ? 'show-HDW-01' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Link to="#" className="dropdown-item-HDW-01">
                  <i className="bi bi-person"></i> My Profile
                </Link>
                <Link to="#" className="dropdown-item-HDW-01">
                  <i className="bi bi-gear"></i> Account Settings
                </Link>
                <Link to="#" className="dropdown-item-HDW-01">
                  <i className="bi bi-headset"></i> Support
                </Link>
                <div className="dropdown-divider-HDW-01"></div>
                <Link to="#" className="dropdown-item-HDW-01">
                  <i className="bi bi-box-arrow-right"></i> Sign Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Sidebar Overlay */}
      <div 
        id="sidebar-overlay-HDW-01" 
        className={`sidebar-overlay-HDW-01 ${sidebarOpen ? 'show-HDW-01' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      
      {/* Sidebar */}
      <aside 
        id="sidebar-HDW-01" 
        className={`sidebar-HDW-01 ${sidebarOpen ? 'show-HDW-01' : ''} ${sidebarCollapsed ? 'collapsed-HDW-01' : ''}`}
      >
        <nav className="sidebar-nav-HDW-01">
          <div className="menu-section-HDW-01">Main</div>
          <ul className="list-unstyled">
            
            {/* Dashboard */}
            <li className="px-2 py-1">
              <div 
                className={`menu-item-HDW-01 active-HDW-01`} 
                data-menu="dashboard-HDW-01"
                onClick={() => toggleSubmenu('dashboard-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-speedometer2"></i>
                  </div>
                  <span className="menu-text-HDW-01">Dashboard</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['dashboard-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['dashboard-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="dashboard-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/dashboard/overview">Overview</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/dashboard/analytics">Analytics</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/dashboard/reports">Reports</Link>
                </li>
              </ul>
            </li>
            
            <div className="menu-section-HDW-01">Job Cards</div>

            {/* Job Cards */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="jobs-HDW-01"
                onClick={() => toggleSubmenu('jobs-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-clipboard-check"></i>
                  </div>
                  <span className="menu-text-HDW-01">Job Cards</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['jobs-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['jobs-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="jobs-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/job-cards/create">Create Job Card</Link>
                </li>

                {/* <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/job-cards/new">New Job Card</Link>
                </li> */}

                {/* <li className="submenu-item-HDW-01 text-danger" onClick={closeSidebarOnMobile}>
                  <Link to="/job-cards/demandRepairs">Demand Repairs</Link>
                </li>

                <li className="submenu-item-HDW-01 text-danger" onClick={closeSidebarOnMobile}>
                  <Link to="/job-cards/partIssue">Part Issue</Link>
                </li> */}

                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/tables/approvalJobCard">Approval JobCard</Link>
                </li>
                <li className="submenu-item-HDW-01 text-danger" onClick={closeSidebarOnMobile}>
                  <Link to="#">Active JobCard</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/job-cards/history">Job History</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/job-cards/estimate">Quick Estimate</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/job-cards/insurance">Insurance Jobs</Link>
                </li>
              </ul>
            </li>
            
            {/* Products */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="products-HDW-01"
                onClick={() => toggleSubmenu('products-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-box-seam"></i>
                  </div>
                  <span className="menu-text-HDW-01">Products</span>
                  <span className="menu-badge-HDW-01">15</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['products-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['products-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="products-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/addProducts">Add Product</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Product List</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Categories</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">New Orders</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Processing</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Shipped/Delivered</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Returns</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">History</Link>
                </li>
              </ul>
            </li>
            
            {/* Services */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="services-HDW-01"
                onClick={() => toggleSubmenu('services-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-tools"></i>
                  </div>
                  <span className="menu-text-HDW-01">Services</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['services-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['services-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="services-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/services/appointment">Appointment Booking</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Appointment List</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/services/addServices">Add Service</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Service List</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">New Requests</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Scheduled</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/services/historyTable">History</Link>
                </li>
              </ul>
            </li>
            
            {/* Vehicles */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="vehicles-HDW-01"
                onClick={() => toggleSubmenu('vehicles-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-car-front"></i>
                  </div>
                  <span className="menu-text-HDW-01">Vehicles</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['vehicles-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['vehicles-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="vehicles-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/vehicals/registration">Vehicle Registration</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Vehicle Search</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Vehicle History</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Vehicle Reminders</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Insurance Alerts</Link>
                </li>
              </ul>
            </li>
            
            {/* Inventory */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="inventory-HDW-01"
                onClick={() => toggleSubmenu('inventory-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-clipboard-data"></i>
                  </div>
                  <span className="menu-text-HDW-01">Inventory</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['inventory-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['inventory-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="inventory-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/inventory/sparePartsAdd">Stock Add</Link>
                </li>
                
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/inventory/searchStockDetails">Stock Details</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/inventory/purchaseOrders">Purchase Orders</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Purchase Details</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/inventory/purchaseReturns">Purchase Returns</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/inventory/lessStockTable">Low Stock Alerts</Link>
                </li>
               <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Stock Details Report</Link>
                </li>
              </ul>
            </li>
            
            <div className="menu-section-HDW-01">Management</div>
            
            {/* Customers */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="customers-HDW-01"
                onClick={() => toggleSubmenu('customers-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-people"></i>
                  </div>
                  <span className="menu-text-HDW-01">Customers</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['customers-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['customers-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="customers-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Add Customers</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Profiles</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Feedback</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Inactive Clients</Link>
                </li>
              </ul>
            </li>

            
            {/* Employees */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="employees-HDW-01"
                onClick={() => toggleSubmenu('employees-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-person-badge"></i>
                  </div>
                  <span className="menu-text-HDW-01">Employees</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['employees-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['employees-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="employees-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/employees/registration">Employee Registration </Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Team List</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Attendance</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Performance</Link>
                </li>
              </ul>
            </li>

            
            {/* Suppliers */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="suppliers-HDW-01"
                onClick={() => toggleSubmenu('suppliers-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-truck"></i>
                  </div>
                  <span className="menu-text-HDW-01">Suppliers</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['suppliers-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['suppliers-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="suppliers-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/suppliers/supplierRegistrationForm">Add Supplier</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">View Supplier</Link>
                </li>
              </ul>
            </li>

            
            {/* Financials */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="financials-HDW-01"
                onClick={() => toggleSubmenu('financials-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-cash-stack"></i>
                  </div>
                  <span className="menu-text-HDW-01">Financials</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['financials-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['financials-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="financials-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Invoices</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Transactions</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Ledger</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Profit Reports</Link>
                </li>
              </ul>
            </li>
            
            {/* Reports */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="reports-HDW-01"
                onClick={() => toggleSubmenu('reports-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-file-earmark-bar-graph"></i>
                  </div>
                  <span className="menu-text-HDW-01">Reports</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['reports-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['reports-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="reports-HDW-01"
              >
                {/* <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Daily/Monthly Sales</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Spare Parts Usage</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Employee Performance</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Customer Growth</Link>
                </li> */}
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/reports/StockEvaluationForm">Stock Valuation</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Stock</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Less Stock</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Stock Valuation</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Purchase Order</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="/report/saleInvoices">Sales</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="/report/SearchFeedbackDetails">Feedback</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Stock Register</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Purchase Return</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="/reports/estimateDetails">Estimate Details</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Bank</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Customer</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Parts</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Service</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Process</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Supplier</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Employee</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Bank Master</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Accounts</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="/reports/counterInvoices">Counter Invoice</Link></li>
                {/* <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Templates</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Debit Note</Link></li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Credit Note</Link></li> */}
              </ul>   
            </li>


             {/* Utilities */}
              {/* <div className="menu-section-HDW-01">Utilities</div> */}
              <li className="px-2 py-1">
                <div 
                  className="menu-item-HDW-01" 
                  data-menu="utilities-HDW-01"
                  onClick={() => toggleSubmenu('utilities-HDW-01')}
                >
                  <div className="menu-content-HDW-01">
                    <div className="menu-icon-HDW-01">
                      <i className="bi bi-tools"></i>
                    </div>
                    <span className="menu-text-HDW-01">Utilities</span>
                  </div>
                  <i className={`menu-arrow-HDW-01 bi ${openSubmenus['utilities-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                </div>
                <ul 
                  className={`submenu-HDW-01 list-unstyled ${openSubmenus['utilities-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                  data-submenu="utilities-HDW-01"
                >
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Pending</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Amounts Payable</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Bank Statement</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">GST Purchase</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">GST Purchase Details</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">GST Sale</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">GST Sale Details</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">GST HSN Details</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">GST Parts Details</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Tech Details</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">SPARE Details</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">LABOUR Details</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Payment Received</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Customer Ledger</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Supplier Ledger</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="#">Customer Focus</Link></li>
                  <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}><Link to="/utilities/voucherReceived">Voucher Received Details</Link></li>
                </ul>
              </li>

            
            <div className="menu-section-HDW-01">Settings</div>
            
            {/* Shop Settings */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="settings-HDW-01"
                onClick={() => toggleSubmenu('settings-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-gear"></i>
                  </div>
                  <span className="menu-text-HDW-01">Shop Settings</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['settings-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['settings-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="settings-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Profile</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Tax/GST</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">SMS/Email Templates</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">User Roles</Link>
                </li>
              </ul>
            </li>
            
            {/* Chat & Support */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="chat-HDW-01"
                onClick={() => toggleSubmenu('chat-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-chat-dots"></i>
                  </div>
                  <span className="menu-text-HDW-01">Chat & Support</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['chat-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['chat-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="chat-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Customer Chat</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="#">Admin Chat</Link>
                </li>
              </ul>
            </li>


            {/* Tables */}
            <li className="px-2 py-1">
              <div 
                className="menu-item-HDW-01" 
                data-menu="table-HDW-01"
                onClick={() => toggleSubmenu('table-HDW-01')}
              >
                <div className="menu-content-HDW-01">
                  <div className="menu-icon-HDW-01">
                    <i className="bi bi-chat-dots"></i>
                  </div>
                  <span className="menu-text-HDW-01">Table</span>
                </div>
                <i className={`menu-arrow-HDW-01 bi ${openSubmenus['table-HDW-01'] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </div>
              <ul 
                className={`submenu-HDW-01 list-unstyled ${openSubmenus['table-HDW-01'] ? 'submenu-open-HDW-01' : ''}`} 
                data-submenu="table-HDW-01"
              >
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/tables/demandRepair">Demand Repair</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/tables/approvalJobCard">ApprovalJobCardTable</Link>
                </li>
                 <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/tables/partIssueTable">Part Issue</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/tables/deliveryDuesTable">Delivery Dues</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/tables/stockDetailsReportTable">Stock Details Report</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/tables/invoiceTable">Invoice Table</Link>
                </li>                
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/tables/purchaseOrdersTable">Purchase Orders</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/tables/feedbackDetailsTable">Feedback Details</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/tables/customerMasterTable">Customer Details</Link>
                </li>
                <li className="submenu-item-HDW-01" onClick={closeSidebarOnMobile}>
                  <Link to="/tables/gstSalesDetails">GST Sale Details</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`main-content-HDW-01 ${sidebarCollapsed ? 'collapsed-HDW-01' : ''}`}>
        <SellerRouting />
      </main>
      
      {/* Mobile Action Buttons */}
      <div className="mobile-action-buttons-HDW-01">
        <button className="mobile-action-button-HDW-01 pulse-HDW-01" id="notification-button-mobile-HDW-01">
          <i className="bi bi-bell"></i>
          <span className="badge-HDW-01">5</span>
        </button>
        <button className="mobile-action-button-HDW-01" id="message-button-mobile-HDW-01">
          <i className="bi bi-chat-left-text"></i>
          <span className="badge-HDW-01">3</span>
        </button>
        <button 
          className="mobile-action-button-HDW-01" 
          id="mobile-theme-toggle-HDW-01"
          onClick={toggleTheme}
        >
          <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'}`} id="mobile-theme-icon-HDW-01"></i>
        </button>
      </div>
    </div>
  );
};

export default SellerDashboard;