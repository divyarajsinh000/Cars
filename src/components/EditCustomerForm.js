import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './CustomerForm.css';

function EditCustomerForm({ isLoggedIn, handleLogout }) {
    const { customerId } = useParams();  // Get customerId from the URL
    const [formData, setFormData] = useState({ CustomerName: '', MobileNo: '' });
    const navigate = useNavigate();
    const location = useLocation(); 
console.log('this is customers',customerId);
    // Fetch existing customer data when the page loads
    useEffect(() => {
       
            if (location.state) {
                // If the full customer object is passed via state, use it directly
                setFormData({
                    CustomerName: location.state.CustomerName,
                    MobileNo: location.state.MobileNo,
                });
            } 
             
        }, [customerId, location.state]);
    // Handle form submission to update the customer
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`https://exciting-art-production.up.railway.app/customers/${customerId}`, formData);
            alert('Customer details updated successfully!');
            // setEditingCustomerId(null);  // Close the edit form
            navigate('/customerlist');
            setFormData({ CustomerName: '', MobileNo: '' })
        } catch (error) {
            console.error(error);
            alert('Failed to update customer details.');
        }
    }, [formData]); 

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
                <h2 className="text-white text-center text-2xl font-bold mb-4">Edit Customer</h2>
                <form onSubmit={handleSubmit} className="customer-form">
              <label htmlFor="CustomerName">Customer Name</label>
              <input
                className="input-field"
                type="text"
                placeholder="Enter customer name"
                                value={formData.CustomerName}
                                onChange={(e) => setFormData({ ...formData, CustomerName: e.target.value })}
              />
              <label htmlFor="MobileNo">Mobile Number</label>
              <input
                className="input-field"
                type="text"
                id="MobileNo"
                                placeholder="Enter mobile number"
                                value={formData.MobileNo}
                                onChange={(e) => setFormData({ ...formData, MobileNo: e.target.value })}
              />
              <button className="btn" type="submit" >Submit</button>
              </form>
            
        </main></div>
       </>
    );
}

export default EditCustomerForm;
