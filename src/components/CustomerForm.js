import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomerForm.css';

function CustomerForm({ isLoggedIn, handleLogout }) {
    const [formData, setFormData] = useState({ CustomerName: '', MobileNo: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://exciting-art-production.up.railway.app/customers', formData);
            alert('Customer added successfully!');
            setFormData({ CustomerName: '', MobileNo: '' }); // Reset form
            navigate('/customerlist');
        } catch (error) {
            console.error(error);
            alert('Failed to add customer.');
        }
    };

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
        
            
            {/* <div className="card"> */}
            <form onSubmit={handleSubmit} className="customer-form">
              <h2 className="text-white text-center text-2xl font-bold mb-4">Add Customer</h2>
              <label htmlFor="CustomerName" >Customer Name</label>
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
            {/* </div> */}
            </form>
           
      
          
          </main>
        </div>
        </>

    );
}

export default CustomerForm;
