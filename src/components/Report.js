import { useEffect, useState } from 'react';
import axios from 'axios';
import './Report.css';
import * as XLSX from 'xlsx'; 
function Report({ isLoggedIn, handleLogout }) {
    const [filters, setFilters] = useState({ fromDate: '', toDate: '', customerId: '' });
    const [report, setReport] = useState([]);
    const [customers, setCustomers] = useState([]);

    const fetchReport = async () => {
        try {
            const res = await axios.get('https://exciting-art-production.up.railway.app/transactions/report', { params: filters });
            setReport(res.data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch report.');
        }
    };
    useEffect(() => {
        axios
            .get('https://exciting-art-production.up.railway.app/customers')
            .then((res) => setCustomers(res.data))
            .catch((error) => console.error('Failed to fetch customers:', error));
    }, []);
 // Export the report to Excel
 const exportToExcel = () => {
    const formattedData = report.map((transaction) => ({
        TransactionId: transaction.TransactionId,
        VehicleNo: transaction.VehicleNo,
        OperationDate: transaction.OperationDate,
        VehicleType: transaction.VehicleType,
        Price: transaction.Price,
        CustomerName: transaction.Customer?.CustomerName || '', // Flatten CustomerName
        MobileNo: transaction.Customer?.MobileNo || '' // Include MobileNo if required
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(wb, ws, 'Transaction Report');
    XLSX.writeFile(wb, 'transaction_report.xlsx');
};

    return (
        <><div className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                <span class="logo-text">Auto Mobile</span>
                </div>
            </div>
            <nav class="sidebar-nav">
                
                <a href="/Dashboard" class="sidebar-link">Dashboard</a>
                <a href="/customerlist" class="sidebar-link">Customer</a>
                <a href="/transactionlist" class="sidebar-link">Transaction</a>
                <a href="/report" class="sidebar-link">Reports</a>
            </nav>
        </div><div className="main-content">
                <header className="top-nav">
                    <h1 className="page-title">VIP AUTOMATED VEHICLE FITNESS TESTING CENTER</h1>
                    <div className="user-info">
         
          
                {isLoggedIn && (
                <button className="user-details" onClick={handleLogout}>
              
  
            Logout
                </button>
            )}
        
            </div>
                </header>

                <main className="dashboard-content">
                    {/* <div className="report-container"> */}
                        <h2>Transaction Report</h2>
                        <div className="filters">
                            <div className="form-group">
                                <label htmlFor="fromDate">From Date</label>
                                <input
                                    type="date"
                                    id="fromDate"
                                    value={filters.fromDate}
                                    onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="toDate">To Date</label>
                                <input
                                    type="date"
                                    id="toDate"
                                    value={filters.toDate}
                                    onChange={(e) => setFilters({ ...filters, toDate: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="CustomerId">Select Customer</label>
                                <select
                                    id="CustomerId"
                                    value={filters.customerId}
                                    onChange={(e) => setFilters({ ...filters, customerId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Customer</option>
                                    {customers.map((customer) => (
                                        <option key={customer.CustomerId} value={customer.CustomerId}>
                                            {customer.CustomerName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button className="generate-button" onClick={fetchReport}>
                                Generate Report
                            </button>
                            <button className="export-button" onClick={exportToExcel}>
                                Export to Excel
                            </button>
                        </div>

                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Vehicle Type</th>
                                    <th>Vehicle No</th>
                                    <th>Operation Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {report.length > 0 ? (
                                    report.map((entry) => (
                                        <tr key={entry.TransactionId}>
                                        <td>{entry.Customer && entry.Customer.CustomerName ? entry.Customer.CustomerName : 'No Name Available'}</td>

                                            <td>{entry.VehicleType}</td>
                                            <td>{entry.VehicleNo}</td>
                                            <td>{new Date(entry.OperationDate).toLocaleDateString()}</td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="no-data">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* Edit Customer Form */}

                   </main></div></>
    );
}

export default Report;
