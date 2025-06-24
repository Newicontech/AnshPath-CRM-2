// JobCardHistory.jsx
import React, { useState, useEffect } from 'react';
import './JobCardHistory.css';
import { FaFileExcel, FaPrint, FaSearch, FaFilter, FaEye, FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const JobCardHistory = () => {
    // Sample data with more entries
    const initialData = [
        {
            jobCardId: 'MH12AB1234-001',
            vehicleNo: 'MH12AB1234',
            customerName: 'Rahul Sharma',
            finalAmount: 12500,
            status: 'Completed',
            dateClosed: '2023-05-15T10:30:00',
            feedback: 'Excellent service!',
            vehicleType: 'Sedan',
            brand: 'Hyundai',
            model: 'Verna',
            color: 'White',
            engineNo: 'ENG123456789',
            vehicleYear: 2019,
            km: 45000,
            fuel: 'Petrol',
            transmissionMode: 'Automatic',
            gstin: '22AAAAA0000A1Z5',
            vinChassisNo: 'VIN12345678901234',
            whatsappNo: '9876543210',
            email: 'rahul.s@example.com',
            address: '123, Main Street, Mumbai',
            insuranceCompany: 'ICICI Lombard',
            insuranceExpiryDate: '2024-06-30',
            advanceAmount: 5000,
            totalAmount: 12500,
            superAdvisor: 'Rajesh Kumar',
            madeBy: 'Vendor Admin',
            remark: 'Regular service with wheel alignment',
            totalServicesAmount: 8500,
            totalPartsPrice: 4000,
            services: [
                { id: 1, sr: 1, serviceName: 'Engine Oil Change', price: 3500 },
                { id: 2, sr: 2, serviceName: 'AC Service', price: 2000 },
                { id: 3, sr: 3, serviceName: 'Wheel Alignment', price: 3000 }
            ],
            parts: [
                { id: 1, sr: 1, partDetails: 'Air Filter', meg: 'MEG001', qty: 1, mrp: 1200, rate: 1000, disc: 10, gst: 18, hsn: '87089900', goDown: 'Main Store' },
                { id: 2, sr: 2, partDetails: 'Oil Filter', meg: 'MEG002', qty: 1, mrp: 800, rate: 700, disc: 5, gst: 18, hsn: '87089900', goDown: 'Main Store' },
                { id: 3, sr: 3, partDetails: 'Brake Pads', meg: 'MEG003', qty: 1, mrp: 2500, rate: 2300, disc: 8, gst: 18, hsn: '87089900', goDown: 'Main Store' }
            ]
        },
        {
            jobCardId: 'MH01CD5678-002',
            vehicleNo: 'MH01CD5678',
            customerName: 'Priya Patel',
            finalAmount: 8500,
            status: 'Cancelled',
            dateClosed: '2023-05-12T14:15:00',
            feedback: '',
            vehicleType: 'Hatchback',
            brand: 'Maruti',
            model: 'Swift',
            color: 'Red',
            engineNo: 'ENG987654321',
            vehicleYear: 2020,
            km: 32000,
            fuel: 'Petrol',
            transmissionMode: 'Manual',
            gstin: '33BBBBB0000B2Z6',
            vinChassisNo: 'VIN98765432109876',
            whatsappNo: '8765432109',
            email: 'priya.p@example.com',
            address: '456, Oak Avenue, Pune',
            insuranceCompany: 'Bajaj Allianz',
            insuranceExpiryDate: '2023-12-31',
            advanceAmount: 3000,
            totalAmount: 8500,
            superAdvisor: 'Sanjay Verma',
            madeBy: 'Vendor Admin',
            remark: 'Customer cancelled due to personal reasons',
            totalServicesAmount: 6000,
            totalPartsPrice: 2500,
            services: [
                { id: 1, sr: 1, serviceName: 'General Service', price: 2500 },
                { id: 2, sr: 2, serviceName: 'Brake Inspection', price: 1500 },
                { id: 3, sr: 3, serviceName: 'Battery Checkup', price: 2000 }
            ],
            parts: [
                { id: 1, sr: 1, partDetails: 'Wiper Blades', meg: 'MEG004', qty: 1, mrp: 800, rate: 700, disc: 5, gst: 18, hsn: '87089900', goDown: 'Main Store' },
                { id: 2, sr: 2, partDetails: 'Air Freshener', meg: 'MEG005', qty: 1, mrp: 200, rate: 150, disc: 0, gst: 18, hsn: '33074100', goDown: 'Main Store' },
                { id: 3, sr: 3, partDetails: 'Car Cover', meg: 'MEG006', qty: 1, mrp: 1500, rate: 1400, disc: 7, gst: 18, hsn: '63079090', goDown: 'Main Store' }
            ]
        },
        {
            jobCardId: 'DL8CAB1234-003',
            vehicleNo: 'DL8CAB1234',
            customerName: 'Amit Singh',
            finalAmount: 18000,
            status: 'Completed',
            dateClosed: '2023-05-08T16:45:00',
            feedback: 'Good work but took longer than expected',
            vehicleType: 'SUV',
            brand: 'Toyota',
            model: 'Fortuner',
            color: 'Black',
            engineNo: 'ENG567891234',
            vehicleYear: 2018,
            km: 75000,
            fuel: 'Diesel',
            transmissionMode: 'Automatic',
            gstin: '11CCCCC0000C3Z7',
            vinChassisNo: 'VIN56789123456789',
            whatsappNo: '7654321098',
            email: 'amit.s@example.com',
            address: '789, Palm Road, Delhi',
            insuranceCompany: 'HDFC Ergo',
            insuranceExpiryDate: '2023-11-15',
            advanceAmount: 8000,
            totalAmount: 18000,
            superAdvisor: 'Vikram Joshi',
            madeBy: 'Vendor Admin',
            remark: 'Major service with AC repair',
            totalServicesAmount: 12000,
            totalPartsPrice: 6000,
            services: [
                { id: 1, sr: 1, serviceName: 'Major Service', price: 6000 },
                { id: 2, sr: 2, serviceName: 'AC Gas Refill', price: 3500 },
                { id: 3, sr: 3, serviceName: 'Transmission Check', price: 2500 }
            ],
            parts: [
                { id: 1, sr: 1, partDetails: 'AC Filter', meg: 'MEG007', qty: 1, mrp: 1500, rate: 1300, disc: 10, gst: 18, hsn: '84159090', goDown: 'Main Store' },
                { id: 2, sr: 2, partDetails: 'Engine Oil', meg: 'MEG008', qty: 1, mrp: 3500, rate: 3200, disc: 8, gst: 18, hsn: '27101980', goDown: 'Main Store' },
                { id: 3, sr: 3, partDetails: 'Oil Additive', meg: 'MEG009', qty: 1, mrp: 1200, rate: 1000, disc: 5, gst: 18, hsn: '34031900', goDown: 'Main Store' }
            ]
        },
        {
            jobCardId: 'KA03EF9012-004',
            vehicleNo: 'KA03EF9012',
            customerName: 'Neha Gupta',
            finalAmount: 9500,
            status: 'Rejected',
            dateClosed: '2023-05-10T11:20:00',
            feedback: '',
            vehicleType: 'Sedan',
            brand: 'Honda',
            model: 'City',
            color: 'Silver',
            engineNo: 'ENG345678912',
            vehicleYear: 2021,
            km: 28000,
            fuel: 'Petrol',
            transmissionMode: 'Manual',
            gstin: '44DDDDD0000D4Z8',
            vinChassisNo: 'VIN34567891234567',
            whatsappNo: '6543210987',
            email: 'neha.g@example.com',
            address: '321, Maple Street, Bangalore',
            insuranceCompany: 'Tata AIG',
            insuranceExpiryDate: '2024-03-20',
            advanceAmount: 4000,
            totalAmount: 9500,
            superAdvisor: 'Rahul Desai',
            madeBy: 'Vendor Admin',
            remark: 'Rejected due to non-availability of parts',
            totalServicesAmount: 6500,
            totalPartsPrice: 3000,
            services: [
                { id: 1, sr: 1, serviceName: 'General Service', price: 3000 },
                { id: 2, sr: 2, serviceName: 'AC Cleaning', price: 2000 },
                { id: 3, sr: 3, serviceName: 'Interior Cleaning', price: 1500 }
            ],
            parts: [
                { id: 1, sr: 1, partDetails: 'Cabin Filter', meg: 'MEG010', qty: 1, mrp: 1200, rate: 1000, disc: 10, gst: 18, hsn: '87089900', goDown: 'Main Store' },
                { id: 2, sr: 2, partDetails: 'Wheel Caps', meg: 'MEG011', qty: 4, mrp: 600, rate: 500, disc: 5, gst: 18, hsn: '87089900', goDown: 'Main Store' }
            ]
        },
        {
            jobCardId: 'TN09GH3456-005',
            vehicleNo: 'TN09GH3456',
            customerName: 'Vikram Joshi',
            finalAmount: 22000,
            status: 'Completed',
            dateClosed: '2023-05-05T09:15:00',
            feedback: 'Very professional service',
            vehicleType: 'SUV',
            brand: 'Mahindra',
            model: 'Scorpio',
            color: 'Grey',
            engineNo: 'ENG789123456',
            vehicleYear: 2017,
            km: 90000,
            fuel: 'Diesel',
            transmissionMode: 'Manual',
            gstin: '55EEEEE0000E5Z9',
            vinChassisNo: 'VIN78912345678912',
            whatsappNo: '5432109876',
            email: 'vikram.j@example.com',
            address: '654, Pine Road, Chennai',
            insuranceCompany: 'New India Assurance',
            insuranceExpiryDate: '2023-09-10',
            advanceAmount: 10000,
            totalAmount: 22000,
            superAdvisor: 'Anil Kapoor',
            madeBy: 'Vendor Admin',
            remark: 'Complete overhaul with suspension work',
            totalServicesAmount: 15000,
            totalPartsPrice: 7000,
            services: [
                { id: 1, sr: 1, serviceName: 'Complete Overhaul', price: 8000 },
                { id: 2, sr: 2, serviceName: 'Suspension Repair', price: 4000 },
                { id: 3, sr: 3, serviceName: 'Brake Overhaul', price: 3000 }
            ],
            parts: [
                { id: 1, sr: 1, partDetails: 'Shock Absorbers', meg: 'MEG012', qty: 2, mrp: 2500, rate: 2200, disc: 10, gst: 18, hsn: '87088000', goDown: 'Main Store' },
                { id: 2, sr: 2, partDetails: 'Brake Discs', meg: 'MEG013', qty: 2, mrp: 2000, rate: 1800, disc: 8, gst: 18, hsn: '87083090', goDown: 'Main Store' }
            ]
        },
        {
            jobCardId: 'GJ05IJ6789-006',
            vehicleNo: 'GJ05IJ6789',
            customerName: 'Ananya Reddy',
            finalAmount: 7500,
            status: 'Completed',
            dateClosed: '2023-05-18T13:30:00',
            feedback: 'Quick and efficient service',
            vehicleType: 'Hatchback',
            brand: 'Tata',
            model: 'Altroz',
            color: 'Blue',
            engineNo: 'ENG912345678',
            vehicleYear: 2022,
            km: 15000,
            fuel: 'Petrol',
            transmissionMode: 'Manual',
            gstin: '66FFFFF0000F6Z0',
            vinChassisNo: 'VIN91234567891234',
            whatsappNo: '4321098765',
            email: 'ananya.r@example.com',
            address: '987, Cedar Lane, Ahmedabad',
            insuranceCompany: 'Reliance General',
            insuranceExpiryDate: '2024-05-05',
            advanceAmount: 3000,
            totalAmount: 7500,
            superAdvisor: 'Sunil Gavaskar',
            madeBy: 'Vendor Admin',
            remark: 'First free service with minor repairs',
            totalServicesAmount: 5000,
            totalPartsPrice: 2500,
            services: [
                { id: 1, sr: 1, serviceName: 'First Free Service', price: 0 },
                { id: 2, sr: 2, serviceName: 'Tyre Rotation', price: 500 },
                { id: 3, sr: 3, serviceName: 'Software Update', price: 4500 }
            ],
            parts: [
                { id: 1, sr: 1, partDetails: 'Wheel Nuts', meg: 'MEG014', qty: 4, mrp: 800, rate: 700, disc: 5, gst: 18, hsn: '73181500', goDown: 'Main Store' },
                { id: 2, sr: 2, partDetails: 'Coolant', meg: 'MEG015', qty: 1, mrp: 1800, rate: 1600, disc: 10, gst: 18, hsn: '38200090', goDown: 'Main Store' }
            ]
        },
        {
            jobCardId: 'UP16KL1234-007',
            vehicleNo: 'UP16KL1234',
            customerName: 'Rohan Malhotra',
            finalAmount: 30000,
            status: 'Completed',
            dateClosed: '2023-05-20T17:00:00',
            feedback: 'Expensive but worth it',
            vehicleType: 'Luxury',
            brand: 'Mercedes',
            model: 'C-Class',
            color: 'Black',
            engineNo: 'ENG123789456',
            vehicleYear: 2020,
            km: 35000,
            fuel: 'Petrol',
            transmissionMode: 'Automatic',
            gstin: '77GGGGG0000G7Z1',
            vinChassisNo: 'VIN12378945612378',
            whatsappNo: '3210987654',
            email: 'rohan.m@example.com',
            address: '159, Oak Street, Noida',
            insuranceCompany: 'Royal Sundaram',
            insuranceExpiryDate: '2024-02-28',
            advanceAmount: 15000,
            totalAmount: 30000,
            superAdvisor: 'Arjun Kapoor',
            madeBy: 'Vendor Admin',
            remark: 'Premium service with detailing',
            totalServicesAmount: 20000,
            totalPartsPrice: 10000,
            services: [
                { id: 1, sr: 1, serviceName: 'Premium Service', price: 12000 },
                { id: 2, sr: 2, serviceName: 'Paint Protection', price: 5000 },
                { id: 3, sr: 3, serviceName: 'Interior Detailing', price: 3000 }
            ],
            parts: [
                { id: 1, sr: 1, partDetails: 'Air Filter', meg: 'MEG016', qty: 1, mrp: 3500, rate: 3000, disc: 10, gst: 18, hsn: '87089900', goDown: 'Main Store' },
                { id: 2, sr: 2, partDetails: 'Cabin Filter', meg: 'MEG017', qty: 1, mrp: 2500, rate: 2200, disc: 8, gst: 18, hsn: '87089900', goDown: 'Main Store' },
                { id: 3, sr: 3, partDetails: 'Engine Additive', meg: 'MEG018', qty: 1, mrp: 4500, rate: 4000, disc: 10, gst: 18, hsn: '34031900', goDown: 'Main Store' }
            ]
        }
    ];

    // State management
    const [data, setData] = useState(initialData);
    const [filteredData, setFilteredData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [selectedJobCard, setSelectedJobCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        dateFrom: '',
        dateTo: '',
        vehicleNo: '',
        customerName: '',
        status: '',
        superAdvisor: ''
    });

    // Filter data based on search term and filters
    useEffect(() => {
        let filtered = [...data];

        // Apply search term filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                Object.values(item).some(
                    val => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        // Apply other filters
        if (filters.dateFrom) {
            filtered = filtered.filter(item => new Date(item.dateClosed) >= new Date(filters.dateFrom));
        }

        if (filters.dateTo) {
            const toDate = new Date(filters.dateTo);
            toDate.setHours(23, 59, 59, 999);
            filtered = filtered.filter(item => new Date(item.dateClosed) <= toDate);
        }

        if (filters.vehicleNo) {
            filtered = filtered.filter(item =>
                item.vehicleNo.toLowerCase().includes(filters.vehicleNo.toLowerCase())
            );
        }

        if (filters.customerName) {
            filtered = filtered.filter(item =>
                item.customerName.toLowerCase().includes(filters.customerName.toLowerCase())
            );
        }

        if (filters.status) {
            filtered = filtered.filter(item => item.status === filters.status);
        }

        if (filters.superAdvisor) {
            filtered = filtered.filter(item =>
                item.superAdvisor.toLowerCase().includes(filters.superAdvisor.toLowerCase())
            );
        }

        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, data, filters]);

    // Sorting functionality
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedData = [...filteredData].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setFilteredData(sortedData);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Status badge styling
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Completed':
                return 'jch-status-completed';
            case 'Cancelled':
                return 'jch-status-cancelled';
            case 'Rejected':
                return 'jch-status-rejected';
            default:
                return 'jch-status-default';
        }
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Open modal with job card details
    const openModal = (jobCard) => {
        setSelectedJobCard(jobCard);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJobCard(null);
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({
            dateFrom: '',
            dateTo: '',
            vehicleNo: '',
            customerName: '',
            status: '',
            superAdvisor: ''
        });
        setSearchTerm('');
    };

    // Apply filters
    const applyFilters = () => {
        setShowFilters(false);
    };

    // Export to Excel function
    const exportToExcel = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Job Card ID,Vehicle No,Customer Name,Final Amount,Status,Date Closed,Super Advisor\n"
            + filteredData.map(item =>
                `"${item.jobCardId}","${item.vehicleNo}","${item.customerName}","${formatCurrency(item.finalAmount).replace('₹', 'Rs. ')}","${item.status}","${formatDate(item.dateClosed)}","${item.superAdvisor}"`
            ).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "job_card_history.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Print function
    const printTable = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Job Card History</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
      @page { size: landscape; }
      body { font-family: Arial, sans-serif; }
      table { width: 100%; border-collapse: collapse; }
      th { background-color: #4361ee; color: white; padding: 8px; text-align: left; }
      td { padding: 8px; border-bottom: 1px solid #ddd; }
      .jch-status-badge { padding: 4px 10px; border-radius: 12px; font-size: 12px; }
      .jch-status-completed { background-color: #d4edda; color: #155724; }
      .jch-status-cancelled { background-color: #fff3cd; color: #856404; }
      .jch-status-rejected { background-color: #f8d7da; color: #721c24; }
      .summary-card { background: #f8f9fa; border-radius: 8px; padding: 15px; margin-bottom: 20px; }
      .summary-title { font-weight: bold; margin-bottom: 10px; }
      .summary-item { display: flex; justify-content: space-between; margin-bottom: 5px; }
    `);
        printWindow.document.write('</style></head><body>');
        printWindow.document.write('<h1>Job Card History</h1>');

        // Add summary
        printWindow.document.write('<div class="summary-card">');
        printWindow.document.write('<div class="summary-title">Summary</div>');
        

        const completedJobs = filteredData.filter(item => item.status === 'Completed').length;
        const cancelledJobs = filteredData.filter(item => item.status === 'Cancelled').length;
        const rejectedJobs = filteredData.filter(item => item.status === 'Rejected').length;
        const totalRevenue = filteredData
            .filter(item => item.status === 'Completed')
            .reduce((sum, item) => sum + item.finalAmount, 0);

        // printWindow.document.write(`<div class="summary-item"><span>Total Job Cards:</span><span>${filteredData.length}</span></div>`);
        // printWindow.document.write(`<div class="summary-item"><span>Completed:</span><span>${completedJobs}</span></div>`);
        // printWindow.document.write(`<div class="summary-item"><span>Cancelled:</span><span>${cancelledJobs}</span></div>`);
        // printWindow.document.write(`<div class="summary-item"><span>Rejected:</span><span>${rejectedJobs}</span></div>`);
        // printWindow.document.write(`<div class="summary-item"><span>Total Revenue:</span><span>${formatCurrency(totalRevenue)}</span></div>`);
        // printWindow.document.write('</div>');
        printWindow.document.write('<table class="summary-table" style="margin-top:8px; margin-bottom:16px; border-collapse:collapse;">');
        printWindow.document.write('<tbody>');
        printWindow.document.write(`<tr><td style="padding:4px 12px;">Total Job Cards:</td><td style="padding:4px 12px;">${filteredData.length}</td></tr>`);
        printWindow.document.write(`<tr><td style="padding:4px 12px;">Completed:</td><td style="padding:4px 12px;">${completedJobs}</td></tr>`);
        printWindow.document.write(`<tr><td style="padding:4px 12px;">Cancelled:</td><td style="padding:4px 12px;">${cancelledJobs}</td></tr>`);
        printWindow.document.write(`<tr><td style="padding:4px 12px;">Rejected:</td><td style="padding:4px 12px;">${rejectedJobs}</td></tr>`);
        printWindow.document.write(`<tr><td style="padding:4px 12px;">Total Revenue:</td><td style="padding:4px 12px;">${formatCurrency(totalRevenue)}</td></tr>`);
        printWindow.document.write('</tbody></table>');
        printWindow.document.write('</div>');

        printWindow.document.write('<table>');
        printWindow.document.write('<thead><tr>');
        printWindow.document.write('<th>Job Card ID</th><th>Vehicle No</th><th>Customer</th>');
        printWindow.document.write('<th>Final Amount</th><th>Status</th><th>Date Closed</th><th>Super Advisor</th>');
        printWindow.document.write('</tr></thead><tbody>');

        filteredData.forEach(item => {
            printWindow.document.write('<tr>');
            printWindow.document.write(`<td>${item.jobCardId}</td>`);
            printWindow.document.write(`<td>${item.vehicleNo}</td>`);
            printWindow.document.write(`<td>${item.customerName}</td>`);
            printWindow.document.write(`<td>${formatCurrency(item.finalAmount)}</td>`);
            printWindow.document.write(`<td><span class="jch-status-badge ${getStatusBadgeClass(item.status)}">${item.status}</span></td>`);
            printWindow.document.write(`<td>${formatDate(item.dateClosed)}</td>`);
            printWindow.document.write(`<td>${item.superAdvisor}</td>`);
            printWindow.document.write('</tr>');
        });

        printWindow.document.write('</tbody></table>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    // Calculate summary statistics
    const completedJobs = filteredData.filter(item => item.status === 'Completed').length;
    const cancelledJobs = filteredData.filter(item => item.status === 'Cancelled').length;
    const rejectedJobs = filteredData.filter(item => item.status === 'Rejected').length;
    const totalRevenue = filteredData
        .filter(item => item.status === 'Completed')
        .reduce((sum, item) => sum + item.finalAmount, 0);

    return (
        <div className="jch-container jch-premium-form-container">
            <i className="fas fa-history jch-floating-icon jch-floating-icon-1"></i>
            <i className="fas fa-car jch-floating-icon jch-floating-icon-2"></i>

            <div className="jch-premium-form-header">
                <h2><i className="fas fa-history jch-me-2"></i>Job Card History</h2>
                <p className="jch-text-muted">Archive of completed, cancelled and rejected job cards</p>
            </div>

            {/* Summary Cards */}
            <div className="jch-summary-cards">
                <div className="jch-summary-card">
                    <div className="jch-summary-title">Total Job Cards</div>
                    <div className="jch-summary-value">{filteredData.length}</div>
                </div>
                <div className="jch-summary-card">
                    <div className="jch-summary-title">Completed</div>
                    <div className="jch-summary-value">{completedJobs}</div>
                </div>
                <div className="jch-summary-card">
                    <div className="jch-summary-title">Cancelled</div>
                    <div className="jch-summary-value">{cancelledJobs}</div>
                </div>
                <div className="jch-summary-card">
                    <div className="jch-summary-title">Rejected</div>
                    <div className="jch-summary-value">{rejectedJobs}</div>
                </div>
                <div className="jch-summary-card">
                    <div className="jch-summary-title">Total Revenue</div>
                    <div className="jch-summary-value">{formatCurrency(totalRevenue)}</div>
                </div>
            </div>

            {/* Header Controls */}
            <div className="jch-header-controls">
                <div className="jch-search-container">
                    <div className="jch-search-icon">
                        <FaSearch />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="jch-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="jch-filter-button"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <FaFilter /> Filters
                    </button>
                </div>
                <div className="jch-entries-control">
                    <span>Show</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="jch-entries-select"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span>entries</span>
                </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="jch-filters-panel">
                    <div className="jch-filter-row">
                        <div className="jch-filter-group">
                            <label>Date From</label>
                            <input
                                type="date"
                                value={filters.dateFrom}
                                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                            />
                        </div>
                        <div className="jch-filter-group">
                            <label>Date To</label>
                            <input
                                type="date"
                                value={filters.dateTo}
                                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                            />
                        </div>
                        <div className="jch-filter-group">
                            <label>Vehicle No</label>
                            <input
                                type="text"
                                placeholder="Vehicle number"
                                value={filters.vehicleNo}
                                onChange={(e) => setFilters({ ...filters, vehicleNo: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="jch-filter-row">
                        <div className="jch-filter-group">
                            <label>Customer Name</label>
                            <input
                                type="text"
                                placeholder="Customer name"
                                value={filters.customerName}
                                onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
                            />
                        </div>
                        <div className="jch-filter-group">
                            <label>Status</label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            >
                                <option value="">All Status</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="jch-filter-group">
                            <label>Super Advisor</label>
                            <input
                                type="text"
                                placeholder="Super advisor"
                                value={filters.superAdvisor}
                                onChange={(e) => setFilters({ ...filters, superAdvisor: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="jch-filter-actions">
                        <button className="jch-filter-reset" onClick={resetFilters}>
                            Reset
                        </button>
                        <button className="jch-filter-apply" onClick={applyFilters}>
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}

            <div className="jch-table-responsive">
                <table className="jch-table jch-table-striped jch-table-hover">
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('jobCardId')} className="jch-sortable-header">
                                Job Card ID {sortConfig.key === 'jobCardId' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => requestSort('vehicleNo')} className="jch-sortable-header">
                                Vehicle No {sortConfig.key === 'vehicleNo' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => requestSort('customerName')} className="jch-sortable-header">
                                Customer Name {sortConfig.key === 'customerName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => requestSort('finalAmount')} className="jch-sortable-header">
                                Final Amount {sortConfig.key === 'finalAmount' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => requestSort('status')} className="jch-sortable-header">
                                Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => requestSort('dateClosed')} className="jch-sortable-header">
                                Date Closed {sortConfig.key === 'dateClosed' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => requestSort('superAdvisor')} className="jch-sortable-header">
                                Super Advisor {sortConfig.key === 'superAdvisor' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.jobCardId}>
                                <td>{item.jobCardId}</td>
                                <td>{item.vehicleNo}</td>
                                <td>{item.customerName}</td>
                                <td>{formatCurrency(item.finalAmount)}</td>
                                <td>
                                    <span className={`jch-status-badge ${getStatusBadgeClass(item.status)}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>{formatDate(item.dateClosed)}</td>
                                <td>{item.superAdvisor}</td>
                                <td>
                                    <button
                                        onClick={() => openModal(item)}
                                        className="jch-view-button"
                                        title="View Details"
                                    >
                                        <FaEye /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table Footer */}
            <div className="jch-table-footer">
                <div className="jch-entries-info">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
                </div>
                <div className="jch-export-buttons">
                    <button onClick={exportToExcel} className="jch-export-button jch-excel-button">
                        <FaFileExcel /> Excel
                    </button>
                    <button onClick={printTable} className="jch-export-button jch-print-button">
                        <FaPrint /> Print
                    </button>
                </div>
                <div className="jch-pagination-container">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="jch-pagination-button"
                        title="First Page"
                    >
                        <FaAngleDoubleLeft />
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="jch-pagination-button"
                        title="Previous Page"
                    >
                        <FaAngleLeft />
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`jch-pagination-button ${currentPage === pageNum ? 'jch-active' : ''}`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="jch-pagination-button"
                        title="Next Page"
                    >
                        <FaAngleRight />
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="jch-pagination-button"
                        title="Last Page"
                    >
                        <FaAngleDoubleRight />
                    </button>
                </div>
            </div>

            {/* Modal for View Details */}
            {isModalOpen && selectedJobCard && (
                <div className="jch-modal-overlay">
                    <div className="jch-modal-content">
                        <div className="jch-modal-header">
                            <div style={{ marginBottom: '15px' }}></div>
                            <h2>Job Card Details - {selectedJobCard.jobCardId}</h2>
                            <button onClick={closeModal} className="jch-close-button">&times;</button>
                        </div>

                        <div className="jch-modal-body">
                            <div className="jch-modal-grid">
                                {/* Left Column */}
                                <div className="jch-modal-column">
                                    <div className="jch-section">
                                        <h3 style={{ color: '#ffffff', fontWeight: '600' }}>Vehicle Information</h3>
                                        <div className="jch-info-grid">
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Vehicle No:</span>
                                                <span>{selectedJobCard.vehicleNo}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Vehicle Type:</span>
                                                <span>{selectedJobCard.vehicleType}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Brand/Model:</span>
                                                <span>{selectedJobCard.brand} {selectedJobCard.model}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Color:</span>
                                                <span>{selectedJobCard.color}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Engine No:</span>
                                                <span>{selectedJobCard.engineNo}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">VIN/Chassis No:</span>
                                                <span>{selectedJobCard.vinChassisNo}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Year:</span>
                                                <span>{selectedJobCard.vehicleYear}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">KM Reading:</span>
                                                <span>{selectedJobCard.km}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Fuel Type:</span>
                                                <span>{selectedJobCard.fuel}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Transmission:</span>
                                                <span>{selectedJobCard.transmissionMode}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="jch-section">
                                        <h3 style={{ color: '#ffffff', fontWeight: '600' }}>Customer Information</h3>
                                        <div className="jch-info-grid">
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Customer Name:</span>
                                                <span>{selectedJobCard.customerName}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">WhatsApp No:</span>
                                                <span>{selectedJobCard.whatsappNo}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Email:</span>
                                                <span>{selectedJobCard.email}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Address:</span>
                                                <span>{selectedJobCard.address}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Insurance Company:</span>
                                                <span>{selectedJobCard.insuranceCompany}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Insurance Expiry:</span>
                                                <span>{selectedJobCard.insuranceExpiryDate}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">GSTIN:</span>
                                                <span>{selectedJobCard.gstin}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="jch-modal-column">
                                    <div className="jch-section">
                                        <h3 style={{ color: '#ffffff', fontWeight: '600' }}>Job Information</h3>
                                        <div className="jch-info-grid">
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Status:</span>
                                                <span className={`jch-status-badge ${getStatusBadgeClass(selectedJobCard.status)}`}>
                                                    {selectedJobCard.status}
                                                </span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Date Closed:</span>
                                                <span>{formatDate(selectedJobCard.dateClosed)}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Super Advisor:</span>
                                                <span>{selectedJobCard.superAdvisor}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Created By:</span>
                                                <span>{selectedJobCard.madeBy}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Advance Amount:</span>
                                                <span>{formatCurrency(selectedJobCard.advanceAmount)}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Final Amount:</span>
                                                <span>{formatCurrency(selectedJobCard.finalAmount)}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Remarks:</span>
                                                <span>{selectedJobCard.remark}</span>
                                            </div>
                                            <div className="jch-info-item">
                                                <span className="jch-info-label">Customer Feedback:</span>
                                                <span>{selectedJobCard.feedback || 'No feedback provided'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="jch-section">
                                        <h3 style={{ color: '#ffffff', fontWeight: '600' }}>Services</h3>
                                        <div className="jch-services-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Service Name</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedJobCard.services.map(service => (
                                                        <tr key={service.id}>
                                                            <td>{service.sr}</td>
                                                            <td>{service.serviceName}</td>
                                                            <td>{formatCurrency(service.price)}</td>
                                                        </tr>
                                                    ))}
                                                    <tr className="jch-total-row">
                                                        <td colSpan="2">Total Services Amount</td>
                                                        <td>{formatCurrency(selectedJobCard.totalServicesAmount)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="jch-section">
                                        <h3 style={{ color: '#ffffff', fontWeight: '600' }}>Parts</h3>
                                        <div className="jch-parts-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Part Details</th>
                                                        <th>MEG</th>
                                                        <th>Qty</th>
                                                        <th>MRP</th>
                                                        <th>Rate</th>
                                                        <th>Disc %</th>
                                                        <th>GST %</th>
                                                        <th>HSN</th>
                                                        <th>Go Down</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedJobCard.parts.map(part => (
                                                        <tr key={part.id}>
                                                            <td>{part.sr}</td>
                                                            <td>{part.partDetails}</td>
                                                            <td>{part.meg}</td>
                                                            <td>{part.qty}</td>
                                                            <td>{formatCurrency(part.mrp)}</td>
                                                            <td>{formatCurrency(part.rate)}</td>
                                                            <td>{part.disc}%</td>
                                                            <td>{part.gst}%</td>
                                                            <td>{part.hsn}</td>
                                                            <td>{part.goDown}</td>
                                                        </tr>
                                                    ))}
                                                    <tr className="jch-total-row">
                                                        <td colSpan="9">Total Parts Price</td>
                                                        <td>{formatCurrency(selectedJobCard.totalPartsPrice)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="jch-modal-footer">
                            <button onClick={closeModal} className="jch-modal-button cancel">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobCardHistory;