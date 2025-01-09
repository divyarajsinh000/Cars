import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import './CustomerPage.css'; // Add custom styles here
import * as XLSX from 'xlsx'; 
function CustomerList({ isLoggedIn, handleLogout }) {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [editData, setEditData] = useState({ CustomerName: '', MobileNo: '' });
    // Fetch customers on page load
   
 // Handle editing of customer details
//  const handleEdit = (customer) => {
//     setEditingCustomerId(customer.CustomerId);  // Set the customer being edited
//     setEditData({
//         CustomerName: customer.CustomerName,
//         MobileNo: customer.MobileNo,
//     });  // Pre-fill the form with current customer data
// };
const handleEdit = (customer) => {
    // Pass the entire customer object as state when navigating
    navigate(`/customers/edit/${customer.CustomerId}`, { state: customer });
};

    // Handle deleting a customer
   // Handle deleting a customer
   const handleDeleteCustomer = useCallback((id) => {
    axios.delete(`https://exciting-art-production.up.railway.app/customers/${id}`)
        .then(() => {
            setCustomers(customers.filter(customer => customer.CustomerId !== id));
            alert('Customer deleted successfully');
        })
        .catch((err) => {
            console.error('Error deleting customer:', err);
            alert('Failed to delete customer');
        });
},[]);
 // Handle the form submission for editing customer details
 const handleEditSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`https://exciting-art-production.up.railway.app/customers/${editingCustomerId}`, editData);
        alert('Customer details updated successfully!');
        setEditingCustomerId(null);  // Close the edit form
    } catch (error) {
        console.error(error);
        alert('Failed to update customer details.');
    }
}, [editingCustomerId, editData]);  // Add dependencies here
useEffect(() => {
    axios.get('https://exciting-art-production.up.railway.app/customers')
        .then((res) => {
            setCustomers(res.data);
        })
        .catch((err) => {
            console.error('Error fetching customer data:', err);
        });
}, [handleDeleteCustomer,handleEditSubmit]);
const exportToExceltransactions = () => {
    const formattedData = customers.map((transaction) => ({
        CustomerId: transaction.CustomerId,
        CustomerName: transaction.CustomerName || '', // Flatten CustomerName
         MobileNo: transaction.Customer?.MobileNo || ''// Flatten CustomerName
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(wb, ws, 'Customer Report');
    XLSX.writeFile(wb, 'customer.xlsx');
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
    </div>
    
    <div className="main-content">
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
            <div className="table-container">
                <h2>Customers</h2>
                <Link to="/add-customer">
                    <button className="dashboard-button">Add Customer</button>
                </Link>
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Customer Id</th>
                            <th>Customer Name</th>
                            <th>Mobile No</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <tr key={customer.CustomerId}>
                                    <td>{customer.CustomerId}</td>
                                    <td>{customer.CustomerName}</td>
                                    <td>{customer.MobileNo}</td>
                                    <td>
                                        <button onClick={() => handleEdit(customer)}>Edit</button>
                                        <button onClick={() => handleDeleteCustomer(customer.CustomerId)}>Delete</button>
                                        <button className="export-button" onClick={exportToExceltransactions}>
                                            Export to Excel
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No customers available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</>    
    );
}

export default CustomerList;
