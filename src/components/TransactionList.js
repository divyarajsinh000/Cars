import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import './TransactionPage.css'; // Add custom styles here
import * as XLSX from 'xlsx'; 
function TransactionList({ isLoggedIn, handleLogout }) {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [filters, setFilters] = useState({ fromDate: '', toDate: '', customerId: '',price:'',vehicleType:'' });
    const [formData, setFormData] = useState({
        TransactionId: '',
        CustomerId: '',
        VehicleNo: '',
        OperationDate: '',
        Price: '',
        VehicleType: '',
    });
    // Fetch transactions on page load
   
    const handleEditTranset = (transaction) => {
        navigate(`/transaction/edit/${transaction.TransactionId}`, { state: transaction });
    };
        // setFormData({
        //     TransactionId: transaction.TransactionId,
        //     CustomerId: transaction.CustomerId,
        //     VehicleNo: transaction.VehicleNo,
        //     Price: transaction.Price,
        //     VehicleType: transaction.VehicleType,
        //     OperationDate: new Date(transaction.OperationDate).toISOString().split('T')[0] // Set the date in YYYY-MM-DD format
        // });
    
    // Handle form submission for editing transaction
  const handleEditTransaction = useCallback(async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`https://exciting-art-production.up.railway.app/transactions/${formData.TransactionId}`, formData);
        alert('Transaction updated successfully!');
        setFormData({
            TransactionId: '',
            CustomerId: '',
            VehicleNo: '',
            Price: '',     
            VehicleType: '' ,      OperationDate: ''
        }); // Reset form data
    } catch (error) {
        console.error(error);
        alert('Failed to update transaction.');
    }
}, [formData]);
const handleDeleteTransaction = useCallback((id) => {
    axios.delete(`https://exciting-art-production.up.railway.app/transactions/${id}`)
        .then(() => {
            setTransactions(transactions.filter(transaction => transaction.TransactionId !== id));
            alert('Transaction deleted successfully');
        })
        .catch((err) => {
            console.error('Error deleting transaction:', err);
            alert('Failed to delete transaction');
        });
},[]);
const exportToExceltransactions = () => {
    const formattedData = transactions.map((transaction) => ({
        TransactionId: transaction.TransactionId,
        VehicleNo: transaction.VehicleNo,
        OperationDate: transaction.OperationDate,
        VehicleType: transaction.VehicleType,
        Price: transaction.Price,
        CustomerName: transaction.Customer?.CustomerName || '', // Flatten CustomerName
        // MobileNo: transaction.Customer?.MobileNo || '' // Include MobileNo if required
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(wb, ws, 'Transaction Report');
    XLSX.writeFile(wb, 'transaction_report.xlsx');
};
const fetchReport = async () => {
    try {
        const res = await axios.get('https://exciting-art-production.up.railway.app/transactions/filter', { params: filters });
        setTransactions(res.data);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch transaction.');
    }
};
const fetchTransaction = async () => {
    setFilters({
        fromDate: '', toDate: '', customerId: '',price:'',vehicleType:''
    })
    try {
        const res = await axios.get('https://exciting-art-production.up.railway.app/transactions');
        setTransactions(res.data);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch transaction.');
    }
};
useEffect(() => {
    axios.get('https://exciting-art-production.up.railway.app/customers')
    .then((res) => {
        setCustomers(res.data);
    })
    .catch((err) => {
        console.error('Error fetching customer data:', err);
    });
    axios.get('https://exciting-art-production.up.railway.app/transactions')
        .then((res) => {
            setTransactions(res.data);
        })
        .catch((err) => {
            console.error('Error fetching transaction data:', err);
        });
}, [handleDeleteTransaction,handleEditTransaction]);
    return (
        <><div class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    {/* <img src="car-icon.png" alt="Car" class="logo-icon"> */}
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
                <div className="transaction-page">

                {/* Transactions Table */}
                <div className="table-container">
                    <h2>Transactions</h2>
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
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                id="price"
                                value={filters.price}
                                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="vehicleType">vehicleType</label>
                            <input
                                type="text"
                                id="vehicleType"
                                value={filters.vehicleType}
                                onChange={(e) => setFilters({ ...filters, vehicleType: e.target.value })}
                                required />
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
                            Filter Data
                        </button>
                        <button className="generate-button" onClick={fetchTransaction}>
                            Reset Filters
                        </button>

                    </div>
                    <Link to="/add-transaction">
                        <button className="dashboard-button">Add Transaction</button>
                    </Link>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Customer Name</th>
                                <th>Vehicle No</th>
                                <th>Price</th>
                                <th>VehicleType</th>
                                <th>Operation Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <tr key={transaction.TransactionId}>
                                        <td>{transaction.TransactionId}</td>
                                        <td>{transaction.Customer && transaction.Customer.CustomerName ? transaction.Customer.CustomerName : 'No Name Available'}</td>

                                        <td>{transaction.VehicleNo}</td>
                                        <td>{transaction.Price}</td>
                                        <td>{transaction.VehicleType}</td>
                                        <td>{new Date(transaction.OperationDate).toLocaleDateString()}</td>
                                        <td>
                                            <button onClick={() => handleEditTranset(transaction)}>Edit</button>
                                            <button onClick={() => handleDeleteTransaction(transaction.TransactionId)}>Delete</button>
                                            <button className="export-button" onClick={exportToExceltransactions}>
                                                Export to Excel
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No transactions available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {formData.TransactionId && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Edit Transaction</h3>
                                <button
                                    onClick={() => setFormData({ TransactionId: "" })}
                                    className="close-btn"
                                >
                                    &times;
                                </button>
                            </div>
                            <form onSubmit={handleEditTransaction}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="CustomerId">Customer Name:</label>
                                        <select
                                            id="CustomerId"
                                            value={formData.CustomerId}
                                            onChange={(e) => setFormData({ ...formData, CustomerId: e.target.value })}
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
                                    <div className="form-group">
                                        <label htmlFor="VehicleNo">Vehicle No:</label>
                                        <input
                                            type="text"
                                            id="VehicleNo"
                                            value={formData.VehicleNo}
                                            onChange={(e) => setFormData({ ...formData, VehicleNo: e.target.value })}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Price">Price:</label>
                                        <input
                                            type="text"
                                            id="Price"
                                            value={formData.Price}
                                            onChange={(e) => setFormData({ ...formData, Price: e.target.value })}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="VehicleType">VehicleType:</label>
                                        <input
                                            type="text"
                                            id="VehicleType"
                                            value={formData.VehicleType}
                                            onChange={(e) => setFormData({ ...formData, VehicleType: e.target.value })}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="OperationDate">Operation Date:</label>
                                        <input
                                            type="date"
                                            id="OperationDate"
                                            value={formData.OperationDate}
                                            onChange={(e) => setFormData({ ...formData, OperationDate: e.target.value })}
                                            required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="save-btn">
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => setFormData({ TransactionId: "" })}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div></main></div></>
    );
}

export default TransactionList;
