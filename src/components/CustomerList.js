import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './CustomerPage.css'; // Add custom styles here
import * as XLSX from 'xlsx'; 
function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [editData, setEditData] = useState({ CustomerName: '', MobileNo: '' });
    // Fetch customers on page load
   
 // Handle editing of customer details
 const handleEdit = (customer) => {
    setEditingCustomerId(customer.CustomerId);  // Set the customer being edited
    setEditData({
        CustomerName: customer.CustomerName,
        MobileNo: customer.MobileNo,
    });  // Pre-fill the form with current customer data
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
     const exportToExcelcustomers = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(customers);
        XLSX.utils.book_append_sheet(wb, ws, 'customers');
        XLSX.writeFile(wb, 'customers.xlsx');
    };
    return (
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
                                <button className="export-button" onClick={exportToExcelcustomers}>
        Export to Excel
    </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No customers available</td>
                    </tr>
                )}
            </tbody>
        </table>
        {/* Edit Transaction Modal */}
{editingCustomerId && (
    <div className="modal-overlay">
        <div className="modal-content">
            <div className="modal-header">
                <h3>Edit Customer</h3>
                <button onClick={() => setEditingCustomerId(null)}>&times;</button>
            </div>
            <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="CustomerName">Customer Name</label>
                        <input
                            type="text"
                            id="CustomerName"
                            value={editData.CustomerName}
                            onChange={(e) => setEditData({ ...editData, CustomerName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="MobileNo">Mobile No</label>
                        <input
                            type="text"
                            id="MobileNo"
                            value={editData.MobileNo}
                            onChange={(e) => setEditData({ ...editData, MobileNo: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="save-btn">Save Changes</button>
                    <button type="button" className="cancel-btn" onClick={() => setEditingCustomerId(null)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
)}
    </div>
    );
}

export default CustomerList;
